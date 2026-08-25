import { ChevronDownIcon } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";
import JsonLd from "@/components/seo/JsonLd";

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
    <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <JsonLd data={jsonLd} />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <div className="md:self-start">
          <SectionMark tone="dark">FAQ</SectionMark>
          <h2 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            {heading}
          </h2>
        </div>

        <div className="overflow-hidden rounded-md bg-surface-dark-2 px-2">
          {faqs.map((faq, index) => (
            <details
              key={faq.q}
              className="group px-5 open:bg-white/[0.025]"
              style={{ borderTop: index === 0 ? undefined : "1px solid rgb(255 255 255 / 8%)" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-fg-on-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green [&::-webkit-details-marker]:hidden">
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
                className="max-w-2xl pb-5 text-fg-muted-dark"
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
