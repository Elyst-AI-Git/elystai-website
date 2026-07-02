import { NextResponse } from "next/server";
import { createServerSupabaseClient, createAdminSupabaseClient } from "@/lib/supabase/server";
import { logEvent, normalizeCorrelationId } from "@/lib/logging";

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

    const supabaseAdmin = createAdminSupabaseClient();

    // 1b. Onboarding follows checkout, not the other way round — require that
    // the user has at least started enrolling before accepting the write (the
    // session check above only proves who the user is, not that they reached
    // checkout). Deliberately not requiring status === "active" here: the
    // webhook that activates the enrollment runs async after Razorpay's
    // client-side success callback, and a fast user can land on this page
    // before it completes — requiring "active" would 403 a legitimate buyer
    // mid-race. Any enrollment row at all rules out onboarding spam from
    // someone who never touched checkout.
    const { data: anyEnrollment } = await supabaseAdmin
      .schema("app")
      .from("enrollments")
      .select("id")
      .eq("profile_id", user.id)
      .limit(1)
      .maybeSingle();

    if (!anyEnrollment) {
      return NextResponse.json(
        { error: "No enrollment found for this account" },
        { status: 403 }
      );
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
      correlationId: rawCorrelationId,
    } = body;

    const correlationId = normalizeCorrelationId(rawCorrelationId);

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
      console.error("Failed to save onboarding:", error);
      return NextResponse.json(
        { error: "Failed to save onboarding details" },
        { status: 500 }
      );
    }

    await logEvent({
      event: "onboarding.saved",
      source: "server",
      correlationId,
      profileId: user.id,
      httpStatus: 200,
      payload: { audienceType: audience_type || null, primaryGoal: primary_goal || null, heardAboutUs: heard_about_us || null },
    });

    return NextResponse.json({ status: "ok", data }, { status: 200 });
  } catch (error: unknown) {
    console.error("Onboarding API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
