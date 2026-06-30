import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/register/confirmation",
    title: "Registration Confirmed",
    description: "You're enrolled in the AI for Work cohort. Here's what happens next.",
  }),
  robots: { index: false, follow: false },
};

// Auth-gated, client-rendered page — see register/page.tsx for why this must
// not be statically prerendered at build time.
export const dynamic = "force-dynamic";

export default function ConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
