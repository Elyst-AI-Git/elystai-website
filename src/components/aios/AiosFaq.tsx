"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Shared FAQ — on the Elyst system: a dark-surface section with clean cards,
 * a navbar-matched radius, an emerald accent rail that lights up on the open
 * row, and brand type/tokens throughout.
 *
 * The FAQPage JSON-LD mirrors the visible copy word-for-word — the page's
 * biggest AEO/GEO citation asset.
 */

export type Faq = { q: string; a: string };

const defaultFaqs: Faq[] = [
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

export default function AiosFaq({
  faqs = defaultFaqs,
  heading = "Questions teams ask before they start.",
  variant = "default",
}: {
  faqs?: Faq[];
  heading?: string;
  variant?: "default" | "tilted";
}) {
  const [open, setOpen] = useState<string | null>(null);
  const isTouch = useIsTouch();
  const reducedMotion = useReducedMotion();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  if (variant === "tilted") {
    const flatCards = isTouch || reducedMotion === true;

    return (
      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mx-auto max-w-3xl">
          <div className="mx-auto max-w-2xl text-center">
            <SectionMark>FAQ</SectionMark>
            <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
              {heading}
            </h2>
          </div>

          <Accordion
            value={open ? [open] : []}
            onValueChange={(value) => setOpen((value as string[])[0] ?? null)}
            className="mt-14 gap-2.5"
          >
            {faqs.map((f, i) => {
              const isOpen = open === f.q;
              const item = (
                <AccordionItem
                  value={f.q}
                  className="overflow-hidden rounded-[20px] border bg-white px-6 shadow-sm transition-[border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none"
                  style={{
                    borderColor: isOpen ? "var(--elyst-green)" : "var(--border)",
                    boxShadow: isOpen ? "var(--shadow-glow)" : "var(--shadow-card)",
                  }}
                >
                  <AccordionTrigger className="!border-0 py-5 [&>svg[data-slot=accordion-trigger-icon]]:hidden">
                    <span className="font-display font-bold text-fg" style={{ fontSize: "var(--text-body)" }}>
                      {f.q}
                    </span>
                    <ChevronDownIcon
                      aria-hidden
                      className="ml-4 size-5 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180 motion-reduce:transition-none"
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>
                      {f.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              );

              if (flatCards) {
                return (
                  <div key={f.q} className="relative" style={{ zIndex: isOpen ? 10 : faqs.length - i }}>
                    {item}
                  </div>
                );
              }

              return (
                <motion.div
                  key={f.q}
                  animate={{ rotate: isOpen ? 0 : [-1.7, 1.4, -1.2, 1.5, -1.3, 1.1][i % 6] }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative"
                  style={{ zIndex: isOpen ? 10 : faqs.length - i }}
                >
                  {item}
                </motion.div>
              );
            })}
          </Accordion>

          <noscript>
            <div className="mt-6 grid gap-3">
              {faqs.map((f) => (
                <article key={f.q} className="rounded-[20px] border border-border bg-white p-6 shadow-card">
                  <h3 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-body)" }}>
                    {f.q}
                  </h3>
                  <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>
                    {f.a}
                  </p>
                </article>
              ))}
            </div>
          </noscript>
        </div>
      </section>
    );
  }

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
              {heading}
            </h2>
          </div>

          {/* Right — all rows inside one tinted panel, divided by hairlines */}
          <div
            className="aios-faq-panel rounded-md px-2"
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
