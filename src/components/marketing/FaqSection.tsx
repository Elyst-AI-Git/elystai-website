import { ChevronDownIcon } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";

export type Faq = { q: string; a: string };

export default function FaqSection({
  faqs,
  heading,
}: {
  faqs: Faq[];
  heading: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section
      className="relative overflow-hidden bg-surface-dark"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark tone="dark">FAQ</SectionMark>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            {heading}
          </h2>
        </header>

        <div className="mx-auto mt-12 border-y border-white/10">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-white/10 last:border-b-0 open:bg-white/[0.025]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-6 text-left text-fg-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green sm:px-7 [&::-webkit-details-marker]:hidden">
                <span
                  className="font-display font-bold group-open:text-green"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {faq.q}
                </span>
                <ChevronDownIcon
                  aria-hidden
                  className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p
                className="max-w-3xl px-5 pb-6 text-fg-muted-dark sm:px-7"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
