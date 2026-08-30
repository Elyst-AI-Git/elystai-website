import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/register",
    title: "Enrollment Closed — AI for Work",
    description: "Batch 1 of AI for Work by Elyst AI is now closed. Batch 2 is coming soon.",
  }),
  title: { absolute: "Enrollment Closed — AI for Work by Elyst AI" },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <main id="main" className="flex-1 flex items-center justify-center min-h-[80vh]" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="text-center flex flex-col items-center gap-6 max-w-md">
        <span
          className="inline-block rounded-full px-4 py-1.5 font-bold uppercase"
          style={{ background: "var(--surface-muted)", color: "var(--fg-3)", fontSize: "var(--text-label)", letterSpacing: "0.04374em" }}
        >
          Enrollment Closed
        </span>
        <h1 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
          Batch 1 is full.
          <br />
          Batch 2 is coming soon.
        </h1>
        <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>
          We have closed registrations for this cohort. The next batch will open in a few weeks — stay tuned.
        </p>
        <Link
          href="/training"
          className="inline-block font-bold rounded-full px-6 py-3"
          style={{ background: "var(--elyst-emerald)", color: "#fff", fontSize: "var(--text-body)" }}
        >
          Explore Training
        </Link>
      </div>
    </main>
  );
}
