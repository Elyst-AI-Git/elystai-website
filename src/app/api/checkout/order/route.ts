import { NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";
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
    } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
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

    // If a payment is already 'created' (pending) for this enrollment, reuse
    // that Razorpay order instead of minting a new one on every click/retry.
    if (existingEnrollment) {
      const { data: existingPayment } = await supabaseAdmin
        .schema("app")
        .from("payments")
        .select("razorpay_order_id, amount, currency, status")
        .eq("enrollment_id", existingEnrollment.id)
        .eq("status", "created")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingPayment?.razorpay_order_id) {
        // Still update the profile fields (phone/city/country) on retry.
        await supabaseAdmin
          .from("profiles")
          .update({ phone, city: city || null, country: country || null })
          .eq("id", user.id);

        return NextResponse.json({
          orderId: existingPayment.razorpay_order_id,
          amount: existingPayment.amount,
          currency: existingPayment.currency,
          keyId: process.env.RAZORPAY_KEY_ID,
        });
      }
    }

    // 5. Look up discount segment membership (Circle segment - case-insensitive)
    const { data: segmentMember, error: segmentMemberError } = await supabaseAdmin
      .from("discount_segment_members")
      .select("segment_id, discount_segments:segment_id (id, name, kind, value, active)")
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    let discountApplied = false;
    let discountAmount = 0; // in paise
    let segmentId: string | null = null;

    if (segmentMember && !segmentMemberError) {
      const rawSegment = segmentMember.discount_segments;
      const segment = (Array.isArray(rawSegment) ? rawSegment[0] : rawSegment) as { id: string; name: string; kind: string; value: number; active: boolean } | null;
      if (segment && segment.active && segment.name.toLowerCase() === "circle") {
        discountApplied = true;
        segmentId = segment.id;
        if (segment.kind === "percent") {
          const percent = Number(segment.value);
          const rawDiscount = batch.base_price_amount * (percent / 100);
          const finalAmountRupees = Math.round((batch.base_price_amount - rawDiscount) / 100);
          const finalAmountPaise = finalAmountRupees * 100;
          discountAmount = batch.base_price_amount - finalAmountPaise;
        } else if (segment.kind === "fixed") {
          const discountVal = Number(segment.value); // value in paise
          const finalAmountRupees = Math.round((batch.base_price_amount - discountVal) / 100);
          const finalAmountPaise = finalAmountRupees * 100;
          discountAmount = batch.base_price_amount - finalAmountPaise;
        }
      }
    }

    const computedAmount = batch.base_price_amount - discountAmount;

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
