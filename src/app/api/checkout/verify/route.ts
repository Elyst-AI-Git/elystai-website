import { NextResponse } from "next/server";
import crypto from "crypto";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";
import { logEvent, normalizeCorrelationId } from "@/lib/logging";
import { claimAndSendConfirmation } from "@/lib/email";

// Synchronous payment verification on return from Razorpay (Issue 4 fix).
//
// Razorpay's client-side success handler gives us razorpay_order_id,
// razorpay_payment_id and razorpay_signature. We verify that signature
// server-side (HMAC of "order_id|payment_id" with the key secret) and, if
// valid, mark the payment paid + enrollment active RIGHT NOW — no waiting on
// the async webhook. The webhook remains the durable backstop and this route
// is idempotent with it (guarded on payment.status), so whichever lands first
// wins and the other is a no-op.
export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const razorpayOrderId = typeof body.razorpay_order_id === "string" ? body.razorpay_order_id : "";
    const razorpayPaymentId = typeof body.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
    const razorpaySignature = typeof body.razorpay_signature === "string" ? body.razorpay_signature : "";
    const correlationId = normalizeCorrelationId(body.correlationId);

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing payment parameters" }, { status: 400 });
    }

    // 1. Verify the checkout signature (order_id|payment_id, HMAC-SHA256, key secret).
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    let valid = false;
    try {
      const a = Buffer.from(expected, "hex");
      const b = Buffer.from(razorpaySignature, "hex");
      valid = a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      valid = false;
    }

    if (!valid) {
      await logEvent({
        event: "verify.invalid_signature",
        source: "server",
        correlationId,
        profileId: user.id,
        orderId: razorpayOrderId,
        httpStatus: 400,
      });
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const admin = createAdminSupabaseClient();

    // 2. Load the payment and its enrollment, and confirm ownership — a valid
    // signature proves Razorpay processed the payment, but we still bind it to
    // THIS user's enrollment so one user can't confirm another's order.
    const { data: payment } = await admin
      .schema("app")
      .from("payments")
      .select("id, status, enrollment_id, amount, currency, enrollments:enrollment_id (profile_id, status)")
      .eq("razorpay_order_id", razorpayOrderId)
      .maybeSingle();

    const enrollmentJoin = payment
      ? (Array.isArray(payment.enrollments) ? payment.enrollments[0] : payment.enrollments) as
          | { profile_id: string; status: string }
          | null
      : null;

    if (!payment || !enrollmentJoin || enrollmentJoin.profile_id !== user.id) {
      await logEvent({
        event: "verify.not_found",
        source: "server",
        correlationId,
        profileId: user.id,
        orderId: razorpayOrderId,
        httpStatus: 404,
      });
      return NextResponse.json({ error: "Payment not found for this account" }, { status: 404 });
    }

    // 3. Idempotent activation. If the webhook already flipped it to paid, skip
    // straight to the confirmed response.
    if (payment.status !== "paid") {
      await admin
        .schema("app")
        .from("payments")
        .update({ status: "paid", razorpay_payment_id: razorpayPaymentId, paid_at: new Date().toISOString() })
        .eq("id", payment.id);

      await admin
        .schema("app")
        .from("enrollments")
        .update({ status: "active" })
        .eq("id", payment.enrollment_id);

      await logEvent({
        event: "verify.activated",
        source: "server",
        correlationId,
        profileId: user.id,
        orderId: razorpayOrderId,
        httpStatus: 200,
        payload: { enrollmentId: payment.enrollment_id, amount: payment.amount },
      });
    }

    // 4. Fire the confirmation email (single-fire; no-op if webhook already sent it).
    await claimAndSendConfirmation(admin, {
      enrollmentId: payment.enrollment_id,
      email: user.email ?? null,
      amountPaise: payment.amount,
      correlationId,
      orderId: razorpayOrderId,
    });

    return NextResponse.json({ status: "active" }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Verify error:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
