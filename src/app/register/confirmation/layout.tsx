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

export default function ConfirmationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
