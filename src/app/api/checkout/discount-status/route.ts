import { NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";
import { computeCheckoutQuote, segmentFromJoin } from "@/lib/pricing";

// Returns both membership AND the authoritative prices (in paise) so the
// client renders the exact number the order route will charge — display and
// charge share one pricing function (@/lib/pricing), which is the Issue-3 fix.
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const supabaseAdmin = createAdminSupabaseClient();

    // Resolve the same open/upcoming batch the order route will use, so the
    // displayed base price matches what gets charged.
    const { data: course } = await supabaseAdmin
      .schema("app")
      .from("courses")
      .select("id")
      .eq("slug", "ai-for-work")
      .single();

    const { data: batch } = course
      ? await supabaseAdmin
          .schema("app")
          .from("batches")
          .select("base_price_amount")
          .eq("course_id", course.id)
          .in("status", ["upcoming", "open"])
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      : { data: null };

    const basePriceAmount = batch?.base_price_amount ?? null;

    if (!user || !user.email) {
      return NextResponse.json(
        { isCircleMember: false, amount: basePriceAmount, originalAmount: basePriceAmount },
        { status: 200 }
      );
    }

    const { data: segmentMember, error: segmentMemberError } = await supabaseAdmin
      .from("discount_segment_members")
      .select("segment_id, discount_segments:segment_id (id, name, kind, value, active)")
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    if (segmentMemberError) {
      console.error("Discount check segment query error:", segmentMemberError);
      return NextResponse.json(
        { error: "Failed to verify discount eligibility" },
        { status: 500 }
      );
    }

    const segment = segmentMember ? segmentFromJoin(segmentMember.discount_segments) : null;

    // No batch price available yet — fall back to membership-only.
    if (basePriceAmount == null) {
      const isMember = !!(segment && segment.active && segment.name.toLowerCase() === "circle");
      return NextResponse.json({ isCircleMember: isMember, amount: null, originalAmount: null }, { status: 200 });
    }

    const quote = computeCheckoutQuote(basePriceAmount, segment);
    return NextResponse.json(
      {
        isCircleMember: quote.discountApplied,
        amount: quote.amount, // paise — what the order will actually charge
        originalAmount: quote.basePriceAmount, // paise — pre-discount
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Discount check API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
