"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { BrandButton } from "@/components/ui/brand-button";
import { Card } from "@/components/ui/card";
import { SectionMark } from "@/components/ui/section-mark";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Redirect to register if not authenticated
        router.push("/register");
      }
      setLoadingSession(false);
    });
  }, [supabase, router]);

  if (loadingSession) {
    return (
      <main id="main" className="flex-1 pt-32 pb-24 bg-bg flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
          <p className="text-fg-3 font-semibold text-small">Loading details...</p>
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
            <BrandButton href="/learn" variant="metal" tone="green" className="flex-1">
              Explore Accelerator
            </BrandButton>
          </div>
        </Card>
      </div>
    </main>
  );
}
