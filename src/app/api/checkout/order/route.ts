import { NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";
import { logEvent, normalizeCorrelationId } from "@/lib/logging";
import { computeCheckoutQuote, segmentFromJoin } from "@/lib/pricing";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    // 1. Authenticate user session
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request body
    const body = await request.json();
    const {
      phone,
      city,
      country,
      utm_source,
      utm_medium,
      utm_campaign,
      referrer,
      courseSlug,
      correlationId: rawCorrelationId,
    } = body;

    const correlationId = normalizeCorrelationId(rawCorrelationId);

    await logEvent({
      event: "order.create.request",
      source: "server",
      correlationId,
      profileId: user.id,
      payload: { courseSlug: courseSlug || "ai-for-work", hasPhone: !!phone, city: city || null, country: country || null },
    });

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (!city || !String(city).trim()) {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }
    if (!country || !String(country).trim()) {
      return NextResponse.json({ error: "Country is required" }, { status: 400 });
    }

    const supabaseAdmin = createAdminSupabaseClient();
    const targetSlug = courseSlug || "ai-for-work";

    // 3. Find the course
    const { data: course, error: courseError } = await supabaseAdmin
      .schema("app")
      .from("courses")
      .select("id")
      .eq("slug", targetSlug)
      .single();

    if (courseError || !course) {
      return NextResponse.json({ error: `Course '${targetSlug}' not found` }, { status: 404 });
    }

    // 4. Find open or upcoming batch for the course
    const { data: batch, error: batchError } = await supabaseAdmin
      .schema("app")
      .from("batches")
      .select("id, base_price_amount, currency")
      .eq("course_id", course.id)
      .in("status", ["upcoming", "open"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (batchError || !batch) {
      return NextResponse.json(
        { error: "No active cohort found for registration" },
        { status: 404 }
      );
    }

    // 4b. If the user is already enrolled, don't create a duplicate order.
    const { data: existingEnrollment } = await supabaseAdmin
      .schema("app")
      .from("enrollments")
      .select("id, status")
      .eq("profile_id", user.id)
      .eq("batch_id", batch.id)
      .maybeSingle();

    if (existingEnrollment?.status === "active") {
      return NextResponse.json(
        { error: "You are already enrolled in this batch" },
        { status: 409 }
      );
    }

    // 5. Look up discount segment membership (Circle segment - case-insensitive)
    // MUST run before any order reuse so the reuse check compares against the
    // price for the user's CURRENT membership, not whatever it was when an old
    // order was minted (this is the Issue-3 fix).
    const { data: segmentMember, error: segmentMemberError } = await supabaseAdmin
      .from("discount_segment_members")
      .select("segment_id, discount_segments:segment_id (id, name, kind, value, active)")
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    // Fail closed: a real query error here must not silently fall through to
    // full price — that overcharges a legitimate Circle member with no error
    // trail. .maybeSingle() only sets `error` for an actual failure (zero
    // rows is `data: null, error: null`), so this never blocks non-members.
    if (segmentMemberError) {
      return NextResponse.json(
        { error: "Failed to verify discount eligibility, please try again" },
        { status: 500 }
      );
    }

    const quote = computeCheckoutQuote(
      batch.base_price_amount,
      segmentMember ? segmentFromJoin(segmentMember.discount_segments) : null
    );
    const { amount: computedAmount, discountAmount, discountApplied, segmentId } = quote;

    // If a payment is already 'created' (pending) for this enrollment, reuse
    // that Razorpay order — but ONLY if its amount still matches the price for
    // the user's current membership. If membership changed since the order was
    // minted (e.g. they joined the Circle after a full-price order), the old
    // amount is stale: supersede it (mark 'failed') and fall through to mint a
    // fresh order at the correct price. This is the Issue-3 fix — the amount we
    // hand back can never disagree with what the page shows for their status.
    if (existingEnrollment) {
      const { data: existingPayment } = await supabaseAdmin
        .schema("app")
        .from("payments")
        .select("id, razorpay_order_id, amount, currency, status")
        .eq("enrollment_id", existingEnrollment.id)
        .eq("status", "created")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingPayment?.razorpay_order_id) {
        // Always refresh profile fields (phone/city/country) on retry.
        await supabaseAdmin
          .from("profiles")
          .update({ phone, city: city || null, country: country || null })
          .eq("id", user.id);

        if (existingPayment.amount === computedAmount) {
          await logEvent({
            event: "order.create.response",
            source: "server",
            correlationId,
            profileId: user.id,
            orderId: existingPayment.razorpay_order_id,
            httpStatus: 200,
            payload: { reusedOrder: true, amount: existingPayment.amount, currency: existingPayment.currency },
          });

          return NextResponse.json({
            orderId: existingPayment.razorpay_order_id,
            amount: existingPayment.amount,
            currency: existingPayment.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
          });
        }

        // Stale price — supersede the old order so the one-open-per-enrollment
        // constraint (migration 0006) doesn't block the fresh insert below.
        await supabaseAdmin
          .schema("app")
          .from("payments")
          .update({ status: "failed" })
          .eq("id", existingPayment.id);

        await logEvent({
          event: "order.supersede",
          source: "server",
          correlationId,
          profileId: user.id,
          orderId: existingPayment.razorpay_order_id,
          payload: { reason: "stale_amount", oldAmount: existingPayment.amount, newAmount: computedAmount },
        });
      }
    }

    // 6. Update user's profile with checkout info (Moment 1)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        phone,
        city: city || null,
        country: country || null,
      })
      .eq("id", user.id);

    if (profileError) {
      return NextResponse.json(
        { error: `Failed to update profile: ${profileError.message}` },
        { status: 500 }
      );
    }

    // 7. Upsert enrollment row (status: 'pending')
    const { data: enrollment, error: enrollmentError } = await supabaseAdmin
      .schema("app")
      .from("enrollments")
      .upsert(
        {
          profile_id: user.id,
          batch_id: batch.id,
          status: "pending",
          discount_segment_id: segmentId,
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          referrer: referrer || null,
        },
        {
          onConflict: "profile_id,batch_id",
        }
      )
      .select()
      .single();

    if (enrollmentError || !enrollment) {
      return NextResponse.json(
        { error: `Failed to upsert enrollment: ${enrollmentError?.message || "unknown"}` },
        { status: 500 }
      );
    }

    // 8. Create Razorpay Order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: computedAmount, // in paise
      currency: "INR",
      receipt: enrollment.id,
      // Stitch the journey id into the order so the webhook (which only sees
      // Razorpay's payload) can recover the correlation_id and continue the trace.
      notes: correlationId ? { correlation_id: correlationId } : undefined,
    });

    await logEvent({
      event: "order.create.response",
      source: "server",
      correlationId,
      profileId: user.id,
      orderId: order.id,
      httpStatus: 200,
      payload: {
        reusedOrder: false,
        amount: computedAmount,
        currency: "INR",
        discountApplied,
        discountAmount,
        basePriceAmount: batch.base_price_amount,
      },
    });

    // 9. Record payment row (status: 'created')
    const { error: paymentError } = await supabaseAdmin
      .schema("app")
      .from("payments")
      .insert({
        enrollment_id: enrollment.id,
        razorpay_order_id: order.id,
        amount: computedAmount,
        currency: "INR",
        status: "created",
        discount_applied: discountApplied,
        discount_amount: discountAmount,
      });

    if (paymentError) {
      // 23505 = unique_violation on payments_one_open_per_enrollment (see
      // migration 0006): a concurrent request (double-click, two tabs) won
      // the race and already inserted a 'created' payment for this
      // enrollment first. We already created a now-orphaned Razorpay order
      // above — fetch the winner's row and hand its order back instead of
      // erroring, so the user still gets a single, working checkout.
      if (paymentError.code === "23505") {
        const { data: winningPayment } = await supabaseAdmin
          .schema("app")
          .from("payments")
          .select("razorpay_order_id, amount, currency")
          .eq("enrollment_id", enrollment.id)
          .eq("status", "created")
          .maybeSingle();

        if (winningPayment?.razorpay_order_id) {
          return NextResponse.json({
            orderId: winningPayment.razorpay_order_id,
            amount: winningPayment.amount,
            currency: winningPayment.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
          });
        }
      }
      return NextResponse.json(
        { error: `Failed to record payment row: ${paymentError.message}` },
        { status: 500 }
      );
    }

    // 10. Return checkout parameters to client
    return NextResponse.json({
      orderId: order.id,
      amount: computedAmount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Checkout order error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
