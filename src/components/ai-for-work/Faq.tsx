"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useIsTouch } from "@/lib/use-touch";
import { PRICE } from "./config";

/**
 * FAQ — kills the doubts that stop people enrolling. The FAQPage JSON-LD below
 * mirrors the visible copy exactly (word for word) for AEO/GEO citation, the
 * same pattern as AiosFaq. base-ui's Accordion keeps panels mounted, so every
 * answer is in the rendered HTML even before interaction.
 */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "I'm not technical — can I still do this?",
    a: "Yes. AI for Work is built for beginners. No coding, no tech background — if you can use everyday apps, you can do this.",
  },
  {
    q: "What if I miss a session?",
    a: "Every session is recorded and yours to keep, so you can catch up any time.",
  },
  {
    q: "How much time per week?",
    a: "It's a focused 2-week sprint — 7 live sessions plus short activities between them.",
  },
  {
    q: "Is it live or recorded?",
    a: "Live. The sessions are taught live so you can ask questions, and you keep the recordings afterwards.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes — you receive a certificate on completion.",
  },
  {
    q: "How do I pay and join?",
    a: `Enrolment is a one-time ${PRICE}. Pay securely online via the enrol button, or send us an enquiry first and we'll help.`,
  },
];

// Slight alternating tilt per row — straightens to 0 when that row is open.
const ROTATIONS = [-1.7, 1.4, -1.2, 1.5, -1.3, 1.1];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  const [open, setOpen] = useState<string | null>(null);
  // The per-row tilt-to-straighten animation re-runs on every open/close.
  // On touch, render every row flat/static — only the accordion's own
  // height-collapse (its core function) remains.
  const isTouch = useIsTouch();

  return (
    <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      {/* This dark FAQ is the last section before the global footer. The footer
          fades from --bg (white) into --surface-dark over its top 160px — against
          a dark section that reads as an ugly white band. Repointing --bg to the
          dark surface on the footer makes that fade dark→dark, so the FAQ flows
          straight into the footer. Scoped here; reverts on navigation. */}
      <style>{`footer > div { --bg: var(--surface-dark); }`}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark tone="dark">FAQ</SectionMark>
          <h2 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            Questions before you join.
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
                className="overflow-hidden rounded-[20px] border bg-white px-6 shadow-sm transition-colors"
                style={{ borderColor: isOpen ? "var(--elyst-green)" : "var(--border)" }}
              >
                <AccordionTrigger className="!border-0 py-5">
                  <span className="font-display font-bold text-fg" style={{ fontSize: "var(--text-body)" }}>
                    {f.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-fg-2" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.15rem)", lineHeight: 1.65 }}>
                    {f.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            );
            if (isTouch) {
              return (
                <div key={f.q} className="relative" style={{ zIndex: isOpen ? 10 : faqs.length - i }}>
                  {item}
                </div>
              );
            }
            return (
              <motion.div
                key={f.q}
                animate={{ rotate: isOpen ? 0 : ROTATIONS[i % ROTATIONS.length] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
                style={{ zIndex: isOpen ? 10 : faqs.length - i }}
              >
                {item}
              </motion.div>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
