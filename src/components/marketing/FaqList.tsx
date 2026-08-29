import type { ReactNode } from "react";
import { MarketingSection, SectionTitle } from "@/components/marketing/MarketingPrimitives";

export type Faq = { question: string; answer: ReactNode };

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <MarketingSection tone="muted">
      <SectionTitle>FAQ</SectionTitle>
      <div className="mt-10 divide-y divide-border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-fg marker:hidden [&::-webkit-details-marker]:hidden" style={{ fontSize: "var(--text-h3)" }}>
              <span>{faq.question}</span>
              <span aria-hidden className="select-none text-emerald transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-4 max-w-3xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </MarketingSection>
  );
}
