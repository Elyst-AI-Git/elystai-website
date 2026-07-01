import { NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    // 1. Authenticate user session
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ isCircleMember: false }, { status: 200 });
    }

    // 2. Query Supabase discount_segment_members table via admin client
    const supabaseAdmin = createAdminSupabaseClient();
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

    if (segmentMember) {
      const rawSegment = segmentMember.discount_segments;
      const segment = (Array.isArray(rawSegment) ? rawSegment[0] : rawSegment) as {
        id: string;
        name: string;
        kind: string;
        value: number;
        active: boolean;
      } | null;

      if (segment && segment.active && segment.name.toLowerCase() === "circle") {
        return NextResponse.json({ isCircleMember: true }, { status: 200 });
      }
    }

    return NextResponse.json({ isCircleMember: false }, { status: 200 });
  } catch (error: unknown) {
    console.error("Discount check API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
