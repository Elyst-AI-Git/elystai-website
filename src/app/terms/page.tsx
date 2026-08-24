import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({
    path: "/terms",
    title: "Terms",
    description: "Terms of service information for Elyst AI.",
  }),
  title: { absolute: "Terms | Elyst AI" },
};

export default function TermsPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section style={{ padding: "clamp(72px, 10vw, 140px) var(--section-px)" }}>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-fg" style={{ fontSize: "var(--text-h1)" }}>
            Terms
          </h1>
          <p className="mt-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.7 }}>
            This page is being updated. For questions about our services, contact us at{" "}
            <a className="text-emerald underline" href="mailto:info@elystai.com">
              info@elystai.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
