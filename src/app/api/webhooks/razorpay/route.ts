import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // 1. Verify signature on RAW body
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventId = payload.id;
    const eventType = payload.event;

    if (!eventId) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    const supabaseAdmin = createAdminSupabaseClient();

    // 2. Deduplicate using app.webhook_events
    const { error: insertEventError } = await supabaseAdmin
      .schema("app")
      .from("webhook_events")
      .insert({
        event_id: eventId,
        event_type: eventType,
        payload: payload,
        status: "received",
      });

    if (insertEventError) {
      // If code is 23505 (unique_violation), this event was already processed.
      // Acknowledge receipt to prevent further retries.
      if (insertEventError.code === "23505") {
        return NextResponse.json({ status: "duplicate" }, { status: 200 });
      }
      return NextResponse.json(
        { error: `Failed to record event: ${insertEventError.message}` },
        { status: 500 }
      );
    }

    // 3. Process events
    if (eventType === "order.paid" || eventType === "payment.captured") {
      let razorpayOrderId: string | undefined;
      let razorpayPaymentId: string | undefined;

      if (eventType === "order.paid") {
        razorpayOrderId = payload.payload?.order?.entity?.id;
        razorpayPaymentId = payload.payload?.payment?.entity?.id;
      } else if (eventType === "payment.captured") {
        razorpayOrderId = payload.payload?.payment?.entity?.order_id;
        razorpayPaymentId = payload.payload?.payment?.entity?.id;
      }

      if (!razorpayOrderId) {
        await supabaseAdmin
          .schema("app")
          .from("webhook_events")
          .update({ status: "failed" })
          .eq("event_id", eventId);
        return NextResponse.json(
          { error: "Missing Razorpay order ID in payload" },
          { status: 400 }
        );
      }

      // Fetch current payment status
      const { data: payment, error: paymentFetchError } = await supabaseAdmin
        .schema("app")
        .from("payments")
        .select("id, status, enrollment_id")
        .eq("razorpay_order_id", razorpayOrderId)
        .maybeSingle();

      if (paymentFetchError || !payment) {
        await supabaseAdmin
          .schema("app")
          .from("webhook_events")
          .update({ status: "failed" })
          .eq("event_id", eventId);
        return NextResponse.json(
          { error: `Payment record not found for order ID: ${razorpayOrderId}` },
          { status: 404 }
        );
      }

      // Out-of-order tolerance: check if payment is already marked 'paid'
      if (payment.status !== "paid") {
        // Update payment row to 'paid'
        const { error: paymentUpdateError } = await supabaseAdmin
          .schema("app")
          .from("payments")
          .update({
            status: "paid",
            razorpay_payment_id: razorpayPaymentId || null,
            paid_at: new Date().toISOString(),
          })
          .eq("id", payment.id);

        if (paymentUpdateError) {
          await supabaseAdmin
            .schema("app")
            .from("webhook_events")
            .update({ status: "failed" })
            .eq("event_id", eventId);
          return NextResponse.json(
            { error: `Failed to update payment: ${paymentUpdateError.message}` },
            { status: 500 }
          );
        }

        // Update enrollment row to 'active'
        const { error: enrollmentUpdateError } = await supabaseAdmin
          .schema("app")
          .from("enrollments")
          .update({
            status: "active",
          })
          .eq("id", payment.enrollment_id);

        if (enrollmentUpdateError) {
          console.error("Failed to activate enrollment:", enrollmentUpdateError);
        }
      }
    } else if (eventType === "payment.failed") {
      const razorpayOrderId = payload.payload?.payment?.entity?.order_id;
      if (razorpayOrderId) {
        const { data: payment, error: paymentFetchError } = await supabaseAdmin
          .schema("app")
          .from("payments")
          .select("id, status")
          .eq("razorpay_order_id", razorpayOrderId)
          .maybeSingle();

        if (payment && !paymentFetchError) {
          // Out-of-order check: only mark failed if it hasn't been set to paid
          if (payment.status !== "paid") {
            await supabaseAdmin
              .schema("app")
              .from("payments")
              .update({
                status: "failed",
              })
              .eq("id", payment.id);
          }
        }
      }
    }

    // 4. Mark webhook event as processed
    await supabaseAdmin
      .schema("app")
      .from("webhook_events")
      .update({
        status: "processed",
        processed_at: new Date().toISOString(),
      })
      .eq("event_id", eventId);

    return NextResponse.json({ status: "ok" }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Webhook processing error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
