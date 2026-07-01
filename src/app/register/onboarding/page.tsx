"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { BrandButton } from "@/components/ui/brand-button";
import { Card } from "@/components/ui/card";
import { SectionMark } from "@/components/ui/section-mark";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const [loadingSession, setLoadingSession] = useState(true);

  // Form fields
  const [audienceType, setAudienceType] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [seniority, setSeniority] = useState("");
  const [aiExperience, setAiExperience] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [goalOther, setGoalOther] = useState("");
  const [heardAboutUs, setHeardAboutUs] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        // Redirect to register if not authenticated
        router.push("/register");
        return;
      }

      // Session alone only proves who's asking. The API (POST /api/onboarding)
      // already rejects a submit with no enrollment row, but that only surfaces
      // as an error AFTER the user fills out the whole survey. Check here too,
      // so someone who never started checkout is redirected before seeing the
      // form at all. Deliberately checking for ANY enrollment, not "active" —
      // the webhook that activates it runs async after Razorpay's client-side
      // success callback, and a fast user can land here before it completes.
      const { data: enrollment } = await supabase
        .schema("app")
        .from("enrollments")
        .select("id")
        .eq("profile_id", session.user.id)
        .limit(1)
        .maybeSingle();

      if (!enrollment) {
        router.push("/register");
        return;
      }

      setLoadingSession(false);
    });
  }, [supabase, router]);

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setSubmitError("");

    const nextErrors: Record<string, string> = {};
    if (!audienceType) nextErrors.audienceType = "Please select an option.";
    if (!role.trim()) nextErrors.role = "Role / title is required.";
    if (!industry.trim()) nextErrors.industry = "Industry is required.";
    if (!seniority) nextErrors.seniority = "Please select a seniority level.";
    if (!aiExperience) nextErrors.aiExperience = "Please select your AI experience.";
    if (!primaryGoal) nextErrors.primaryGoal = "Please select your primary goal.";
    if (primaryGoal === "other" && !goalOther.trim()) nextErrors.goalOther = "Please specify your goal.";
    if (!heardAboutUs) nextErrors.heardAboutUs = "Please select an option.";


    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }
    setFieldErrors({});
    setSubmitLoading(true);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audience_type: audienceType || null,
          role: role || null,
          industry: industry || null,
          seniority: seniority || null,
          ai_experience: aiExperience || null,
          primary_goal: primaryGoal || null,
          goal_other: primaryGoal === "other" ? goalOther : null,
          heard_about_us: heardAboutUs || null,
          linkedin_url: linkedinUrl || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit survey.");
      }

      // On successful submission, redirect to confirmation page
      router.push("/register/confirmation");
    } catch (err: unknown) {
      const error = err as Error;
      setSubmitError(error.message || "An unexpected error occurred.");
      setSubmitLoading(false);
    }
  };

  const inputStyle = "w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-[16px] text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg/35";
  const selectStyle = "w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-[16px] text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg/35 pr-10 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%234b5563%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-[size:20px_20px] bg-no-repeat";

  if (loadingSession) {
    return (
      <main id="main" className="flex-1 pt-32 pb-24 bg-bg flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
          <p className="text-fg-3 font-semibold text-small">Loading survey...</p>
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="flex-1 pt-32 pb-24 bg-bg">
      <div className="mx-auto max-w-xl px-4">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-2">
            <SectionMark>Payment Confirmed</SectionMark>
          </div>
          <h1 className="text-fg font-display font-bold leading-none tracking-display mb-3" style={{ fontSize: "var(--text-h2)" }}>
            Welcome to the Cohort
          </h1>
          <p className="text-fg-2 text-[15px] max-w-md mx-auto">
            Help us tailor the live sessions and resources to your experience and goals.
          </p>
        </div>

        <Card className="p-8 bg-[#c2edcb] rounded-card shadow-card">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-muted">
            <h2 className="text-fg font-display font-bold text-[22px]">
              Onboarding Survey
            </h2>
          </div>

          {submitError && (
            <div className="mb-5 p-4 rounded bg-destructive/10 border border-destructive/20 text-destructive text-label font-medium leading-relaxed">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Audience Type Dropdown */}
            <div>
              <label htmlFor="audienceType" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                Which best describes you? <span className="text-destructive font-normal">*</span>
              </label>
              <select
                id="audienceType"
                required
                value={audienceType}
                onChange={(e) => setAudienceType(e.target.value)}
                className={selectStyle}
              >
                <option value="">Select an option</option>
                <option value="professional">Working Professional</option>
                <option value="business_owner">Business Owner / Founder</option>
                <option value="freelancer">Freelancer</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="student">Student</option>
              </select>
              {fieldErrors.audienceType && (
                <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.audienceType}</p>
              )}
            </div>

            {/* Role & Industry in 2-column grid on desktop */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="role" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Your Role / Title <span className="text-destructive font-normal">*</span>
                </label>
                <input
                  id="role"
                  type="text"
                  required
                  placeholder="e.g. Marketing Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={inputStyle}
                />
                {fieldErrors.role && (
                  <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.role}</p>
                )}
              </div>

              <div>
                <label htmlFor="industry" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Industry <span className="text-destructive font-normal">*</span>
                </label>
                <input
                  id="industry"
                  type="text"
                  required
                  placeholder="e.g. Healthcare, Retail"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className={inputStyle}
                />
                {fieldErrors.industry && (
                  <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.industry}</p>
                )}
              </div>
            </div>

            {/* Seniority Field */}
            <div>
              <label htmlFor="seniority" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                Seniority Level <span className="text-destructive font-normal">*</span>
              </label>
              <select
                id="seniority"
                required
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className={selectStyle}
              >
                <option value="">Select seniority level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior</option>
                <option value="director">Director / VP</option>
                <option value="c_level">C-Level / Founder</option>
              </select>
              {fieldErrors.seniority && (
                <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.seniority}</p>
              )}
            </div>

            {/* AI Experience */}
            <div>
              <label htmlFor="aiExperience" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                Current AI Experience <span className="text-destructive font-normal">*</span>
              </label>
              <select
                id="aiExperience"
                required
                value={aiExperience}
                onChange={(e) => setAiExperience(e.target.value)}
                className={selectStyle}
              >
                <option value="">Select experience level</option>
                <option value="none">I have never used AI tools before</option>
                <option value="dabbled">I use ChatGPT or Claude occasionally</option>
                <option value="regular">I use AI daily in my work and life</option>
              </select>
              {fieldErrors.aiExperience && (
                <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.aiExperience}</p>
              )}
            </div>

            {/* Primary Goal Dropdown */}
            <div>
              <label htmlFor="primaryGoal" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                What is your primary goal for this program? <span className="text-destructive font-normal">*</span>
              </label>
              <select
                id="primaryGoal"
                required
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className={selectStyle}
              >
                <option value="">Select your main goal</option>
                <option value="automate">Automate repetitive daily tasks</option>
                <option value="prompting">Learn to prompt AI effectively</option>
                <option value="agents">Build AI systems/agents for my business</option>
                <option value="productivity">Improve my daily productivity at work</option>
                <option value="other">Other</option>
              </select>
              {fieldErrors.primaryGoal && (
                <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.primaryGoal}</p>
              )}
            </div>

            {/* Goal Other Field (Conditional) */}
            {primaryGoal === "other" && (
              <div className="transition-all duration-300">
                <label htmlFor="goalOther" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Please specify your goal <span className="text-destructive font-normal">*</span>
                </label>
                <textarea
                  id="goalOther"
                  rows={3}
                  required
                  placeholder="Tell us what you want to achieve..."
                  value={goalOther}
                  onChange={(e) => setGoalOther(e.target.value)}
                  className={`${inputStyle} resize-none`}
                />
                {fieldErrors.goalOther && (
                  <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.goalOther}</p>
                )}
              </div>
            )}

            {/* Heard About Us */}
            <div>
              <label htmlFor="heardAboutUs" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                How did you hear about Elyst AI? <span className="text-destructive font-normal">*</span>
              </label>
              <select
                id="heardAboutUs"
                required
                value={heardAboutUs}
                onChange={(e) => setHeardAboutUs(e.target.value)}
                className={selectStyle}
              >
                <option value="">Select an option</option>
                <option value="friend">via a friend</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="circle">Elyst AI circle</option>
                <option value="other">other</option>
              </select>
              {fieldErrors.heardAboutUs && (
                <p className="mt-1 text-[13px] text-destructive font-medium">{fieldErrors.heardAboutUs}</p>
              )}
            </div>

            {/* LinkedIn URL */}
            <div>
              <label htmlFor="linkedinUrl" className="block text-[13px] font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                LinkedIn Profile URL <span className="text-fg-3 font-normal">(Optional)</span>
              </label>
              <input
                id="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className={inputStyle}
              />
            </div>

            {/* Action buttons */}
            <div className="pt-4">
              <BrandButton variant="solid" tone="green" className="w-full" onClick={handleSubmit} disabled={submitLoading} full>
                {submitLoading ? "Submitting..." : "Submit & Complete"}
              </BrandButton>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
