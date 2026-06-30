import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/register/onboarding",
    title: "Onboarding Survey",
    description: "Tell us about your goals so we can tailor your AI for Work cohort sessions.",
  }),
  robots: { index: false, follow: false },
};

// Auth-gated, client-rendered page — see register/page.tsx for why this must
// not be statically prerendered at build time.
export const dynamic = "force-dynamic";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
