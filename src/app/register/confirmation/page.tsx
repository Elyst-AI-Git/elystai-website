"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { BrandButton } from "@/components/ui/brand-button";
import { Card } from "@/components/ui/card";
import { SectionMark } from "@/components/ui/section-mark";
import { useRouter } from "next/navigation";
import { logClientEvent } from "@/lib/log-client";

// How long to keep polling for the enrollment to flip to 'active' before
// concluding the user doesn't belong here. The Razorpay webhook that does
// that flip runs async, after the client-side success callback already
// redirected here (via onboarding) — a fast user can otherwise land on this
// page before the webhook lands, and requiring 'active' on the very first
// check would incorrectly bounce a real buyer back to /register.
const ACTIVE_POLL_ATTEMPTS = 5;
const ACTIVE_POLL_INTERVAL_MS = 1500;

type PageState = "checking" | "pending" | "confirmed";

export default function ConfirmationPage() {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [pageState, setPageState] = useState<PageState>("checking");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/register");
        return;
      }

      // Session alone only proves who's asking — also require an enrollment
      // row before showing anything, so a logged-in user who never checked
      // out can't reach this page just by typing the URL.
      const { data: anyEnrollment } = await supabase
        .schema("app")
        .from("enrollments")
        .select("id, status")
        .eq("profile_id", session.user.id)
        .limit(1)
        .maybeSingle();

      if (!anyEnrollment) {
        router.push("/register");
        return;
      }

      for (let attempt = 0; attempt < ACTIVE_POLL_ATTEMPTS; attempt += 1) {
        const { data: activeEnrollment } = await supabase
          .schema("app")
          .from("enrollments")
          .select("id")
          .eq("profile_id", session.user.id)
          .eq("status", "active")
          .limit(1)
          .maybeSingle();

        if (cancelled) return;

        if (activeEnrollment) {
          setPageState("confirmed");
          logClientEvent("confirmation_confirmed");
          return;
        }

        if (attempt < ACTIVE_POLL_ATTEMPTS - 1) {
          await new Promise((resolve) => setTimeout(resolve, ACTIVE_POLL_INTERVAL_MS));
        }
      }

      // Enrollment exists but never went active within the poll window —
      // most likely the webhook is still catching up. Tell the user to wait
      // rather than bouncing them back to a page that says "register".
      if (!cancelled) {
        setPageState("pending");
        logClientEvent("confirmation_pending");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [supabase, router]);

  if (pageState === "checking") {
    return (
      <main id="main" className="flex-1 pt-32 pb-24 bg-bg flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
          <p className="text-fg-3 font-semibold text-small">Loading details...</p>
        </div>
      </main>
    );
  }

  if (pageState === "pending") {
    return (
      <main id="main" className="flex-1 pt-32 pb-24 bg-bg flex items-center justify-center min-h-[70vh]">
        <div className="mx-auto max-w-md px-4 text-center">
          <h1 className="text-fg font-display font-bold leading-none tracking-display mb-3" style={{ fontSize: "var(--text-h2)" }}>
            Confirming your payment
          </h1>
          <p className="text-fg-2 text-[15px] mb-6">
            This is taking a little longer than usual. Your payment is being confirmed — refresh this page in a minute, or reach out if it doesn&apos;t update soon.
          </p>
          <BrandButton href="/" variant="outline">
            Return Home
          </BrandButton>
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
            <SectionMark>Welcome Aboard</SectionMark>
          </div>
          <h1 className="text-fg font-display font-bold leading-none tracking-display mb-3" style={{ fontSize: "var(--text-h2)" }}>
            Registration Confirmed
          </h1>
          <p className="text-fg-2 text-[15px] max-w-md mx-auto">
            Your seat in the cohort has been reserved. Here is what happens next.
          </p>
        </div>

        {/* Card Component */}
        <Card className="p-8 bg-[#c2edcb] rounded-card shadow-card text-center flex flex-col items-center">
          {/* Success Check Icon (Square with 6px border radius) */}
          <div className="h-16 w-16 bg-white/60 border border-emerald/10 rounded-md flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-[#03624c] fill-current" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>

          <h2 className="text-fg font-display font-bold text-[22px] mb-4">
            You are officially enrolled!
          </h2>

          <div className="text-[16px] text-fg-2 max-w-sm mb-8 text-center leading-relaxed font-medium">
            Our team will reach out via WhatsApp soon.
          </div>

          {/* Action CTAs */}
          <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
            <BrandButton href="/" variant="outline" className="flex-1 bg-white!">
              Return Home
            </BrandButton>
            <BrandButton href="/training" variant="metal" tone="green" className="flex-1">
              Explore Training
            </BrandButton>
          </div>
        </Card>
      </div>
    </main>
  );
}
