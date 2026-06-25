"use client";

import { useState } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * AIOS FAQ — on the Elyst system: a dark-surface section with clean, sharp
 * white cards (squared by the page's .aios-sharp rule), an emerald accent rail
 * that lights up on the open row, and brand type/tokens throughout. No tilt —
 * the AIOS page's language is sharp and straight.
 *
 * The FAQPage JSON-LD mirrors the visible copy word-for-word — the page's
 * biggest AEO/GEO citation asset.
 */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "Do we need any technical skills?",
    a: "No. If your team can send a WhatsApp message, they can use AIOS. There's nothing to set up on your side.",
  },
  {
    q: "What if our team only uses WhatsApp?",
    a: "That's exactly where AIOS lives. No new app or logins needed.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "ChatGPT knows the internet. AIOS knows your business, your documents, your prices, your process, and can act inside it. It answers your questions and does your work.",
  },
  {
    q: "Where does our data live, and is it secure?",
    a: "Your data stays yours. It's access-controlled and used only to run your AIOS, never shared.",
  },
  {
    q: "How long does setup take?",
    a: "Timeline depends on how much you want it to do. Usually taking a few weeks at most.",
  },
  {
    q: "What does it cost?",
    a: "A one-time setup plus a retainer scaled to what you run. Book a call for a tailored quote.",
  },
  {
    q: "Does it work for a remote team?",
    a: "Yes. AIOS runs wherever your team has WhatsApp or Telegram. Location doesn't matter.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiosFaq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          {/* Left — stamp-style label + heading. Stays in normal flow (no
              sticky-follow) so it holds its place as the list scrolls. */}
          <div className="md:self-start">
            <SectionMark tone="dark">FAQ</SectionMark>
            <h2 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
              Questions teams ask before they start.
            </h2>
            <p className="mt-12 text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
              Still have a question? Ask us on the call.
            </p>
          </div>

          {/* Right — all rows inside one tinted panel, divided by hairlines */}
          <div
            className="rounded-[var(--radius-card)] px-2"
            style={{ background: "var(--surface-dark-2)" }}
          >
            <Accordion
              value={open ? [open] : []}
              onValueChange={(value) => setOpen((value as string[])[0] ?? null)}
              className="flex flex-col"
            >
              {faqs.map((f) => {
                const isOpen = open === f.q;
                return (
                  <AccordionItem
                    key={f.q}
                    value={f.q}
                    className="relative overflow-hidden px-5 transition-colors not-last:border-b"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <AccordionTrigger className="!border-0 py-5">
                      <span
                        className="font-display font-bold"
                        style={{
                          fontSize: "var(--text-body)",
                          color: isOpen ? "var(--elyst-green)" : "var(--fg-on-dark)",
                        }}
                      >
                        {f.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p
                        className="text-fg-muted-dark"
                        style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
                      >
                        {f.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
