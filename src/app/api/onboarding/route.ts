import { NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    // 1. Authenticate user session
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request body
    const body = await request.json();
    const {
      audience_type,
      role,
      industry,
      seniority,
      ai_experience,
      primary_goal,
      goal_other,
      heard_about_us,
      linkedin_url,
    } = body;

    const supabaseAdmin = createAdminSupabaseClient();

    // 3. Upsert onboarding data for the user profile
    const { data, error } = await supabaseAdmin
      .schema("app")
      .from("onboarding")
      .upsert({
        profile_id: user.id,
        audience_type: audience_type || null,
        role: role || null,
        industry: industry || null,
        seniority: seniority || null,
        ai_experience: ai_experience || null,
        primary_goal: primary_goal || null,
        goal_other: goal_other || null,
        heard_about_us: heard_about_us || null,
        linkedin_url: linkedin_url || null,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: `Failed to save onboarding: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: "ok", data }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Onboarding API error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
