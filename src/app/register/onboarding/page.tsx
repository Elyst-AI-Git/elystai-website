"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { BrandButton } from "@/components/ui/brand-button";
import { Card } from "@/components/ui/card";
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Redirect to register if not authenticated
        router.push("/register");
      }
      setLoadingSession(false);
    });
  }, [supabase, router]);

  const handleSkip = () => {
    // Redirect cleanly to accelerator home page
    router.push("/learn");
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setSubmitError("");
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

      // On successful submission, redirect to accelerator page
      router.push("/learn");
    } catch (err: unknown) {
      const error = err as Error;
      setSubmitError(error.message || "An unexpected error occurred.");
      setSubmitLoading(false);
    }
  };

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
        <div className="text-center mb-8">
          <span className="inline-block text-micro font-bold uppercase tracking-wider text-emerald mb-2 px-3 py-1 rounded-full bg-emerald/5 border border-emerald/10">
            Payment Confirmed
          </span>
          <h1 className="text-fg font-display font-bold leading-none tracking-display mb-3" style={{ fontSize: "var(--text-h2)" }}>
            Welcome to the Cohort
          </h1>
          <p className="text-fg-2 text-small max-w-md mx-auto">
            Help us tailor the live sessions and resources to your experience and goals.
          </p>
        </div>

        <Card className="p-8 bg-white rounded-card shadow-card">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-muted">
            <h2 className="text-fg font-display font-bold text-h3">
              Onboarding Survey
            </h2>
            <button
              type="button"
              onClick={handleSkip}
              className="text-micro font-bold uppercase tracking-wider text-fg-3 hover:text-fg transition hover:underline"
            >
              Skip Survey &rarr;
            </button>
          </div>

          {submitError && (
            <div className="mb-5 p-4 rounded bg-destructive/10 border border-destructive/20 text-destructive text-label font-medium leading-relaxed">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Audience Type Dropdown */}
            <div>
              <label htmlFor="audienceType" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                Which best describes you?
              </label>
              <select
                id="audienceType"
                value={audienceType}
                onChange={(e) => setAudienceType(e.target.value)}
                className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
              >
                <option value="">Select an option</option>
                <option value="professional">Working Professional</option>
                <option value="business_owner">Business Owner / Founder</option>
                <option value="freelancer">Freelancer</option>
                <option value="job_seeker">Job Seeker</option>
                <option value="student">Student</option>
              </select>
            </div>

            {/* Role & Industry in 2-column grid on desktop */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="role" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Your Role / Title
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Marketing Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Industry
                </label>
                <input
                  id="industry"
                  type="text"
                  placeholder="e.g. Healthcare, Retail"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
                />
              </div>
            </div>

            {/* Seniority Field */}
            <div>
              <label htmlFor="seniority" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                Seniority Level <span className="text-fg-3 font-normal">(Optional)</span>
              </label>
              <input
                id="seniority"
                type="text"
                placeholder="e.g. Junior, Senior, Director, C-Level"
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
              />
            </div>

            {/* AI Experience */}
            <div>
              <label htmlFor="aiExperience" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                Current AI Experience
              </label>
              <select
                id="aiExperience"
                value={aiExperience}
                onChange={(e) => setAiExperience(e.target.value)}
                className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
              >
                <option value="">Select experience level</option>
                <option value="none">None (Absolute beginner)</option>
                <option value="dabbled">Dabbled (Used ChatGPT/Claude occasionally)</option>
                <option value="regular">Regular (Use AI daily in my workflow)</option>
              </select>
            </div>

            {/* Primary Goal Dropdown */}
            <div>
              <label htmlFor="primaryGoal" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                What is your primary goal for this program?
              </label>
              <select
                id="primaryGoal"
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
              >
                <option value="">Select your main goal</option>
                <option value="automate">Automate repetitive daily tasks</option>
                <option value="prompting">Learn to prompt AI effectively</option>
                <option value="agents">Build AI systems/agents for my business</option>
                <option value="productivity">Improve my daily productivity at work</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Goal Other Field (Conditional) */}
            {primaryGoal === "other" && (
              <div className="transition-all duration-300">
                <label htmlFor="goalOther" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                  Please specify your goal
                </label>
                <textarea
                  id="goalOther"
                  rows={3}
                  placeholder="Tell us what you want to achieve..."
                  value={goalOther}
                  onChange={(e) => setGoalOther(e.target.value)}
                  className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3 resize-none"
                />
              </div>
            )}

            {/* Heard About Us */}
            <div>
              <label htmlFor="heardAboutUs" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                How did you hear about Elyst AI?
              </label>
              <input
                id="heardAboutUs"
                type="text"
                placeholder="e.g. LinkedIn, Friend, Instagram"
                value={heardAboutUs}
                onChange={(e) => setHeardAboutUs(e.target.value)}
                className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
              />
            </div>

            {/* LinkedIn URL */}
            <div>
              <label htmlFor="linkedinUrl" className="block text-micro font-bold uppercase tracking-wider text-fg-2 mb-1.5">
                LinkedIn Profile URL <span className="text-fg-3 font-normal">(Optional)</span>
              </label>
              <input
                id="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full rounded-md border border-muted bg-[#FDFEFC] px-4 py-2.5 text-small text-fg focus:outline-none focus:ring-1 focus:ring-emerald placeholder:text-fg-3"
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleSkip}
                disabled={submitLoading}
                className="flex-1 min-h-[48px] font-bold border border-muted text-fg-2 rounded-md hover:bg-surface-muted transition disabled:opacity-50 text-[15px]"
              >
                Skip survey
              </button>
              <BrandButton variant="solid" tone="green" className="flex-1" onClick={handleSubmit} disabled={submitLoading} full>
                {submitLoading ? "Submitting..." : "Submit & Complete"}
              </BrandButton>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
