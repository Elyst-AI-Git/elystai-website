import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/register",
    title: "AI for Work",
    description: "Reserve your seat in the 2-week live program AI for Work by Elyst AI.",
  }),
  title: { absolute: "AI for Work by Elyst AI" },
  robots: { index: false, follow: true },
};

// This page is auth-gated and constructs a Supabase client client-side on
// render — there's nothing useful to statically prerender, and forcing a
// build-time render here means a missing env var at BUILD time (rather than
// at request time) takes the whole deployment down. Always render on request.
export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <main id="main" className="flex-1 pt-32 pb-24 bg-bg flex items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
            <p className="text-fg-3 font-semibold text-small">Loading checkout...</p>
          </div>
        </main>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
