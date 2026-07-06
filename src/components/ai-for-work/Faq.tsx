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

/**
 * FAQ — kills the doubts that stop people enrolling. The FAQPage JSON-LD below
 * mirrors the visible copy exactly (word for word) for AEO/GEO citation, the
 * same pattern as AiosFaq. base-ui's Accordion keeps panels mounted, so every
 * answer is in the rendered HTML even before interaction.
 */

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "I'm not technical, can I still join?",
    a: "Yes, that's exactly who this is for. You don't need any coding or tech background. We start from zero and keep everything in plain language.",
  },
  {
    q: "What if I miss a session?",
    a: "Every session is recorded and uploaded to your learning portal the same day. Watch anytime, and bring your questions to the next live Q&A.",
  },
  {
    q: "How much time do I have to spend per week?",
    a: "Plan for about 4 to 5 hours a week. That includes the live sessions plus a little practice time, so you actually use what you learn instead of just watching.",
  },
  {
    q: "Is it live or recorded?",
    a: "Both. The classes are taught live so you can ask questions and learn in real time, you also get a curated collection of recordings to go one level deeper and revisit whenever you want.",
  },
  {
    q: "Do I need paid AI tools?",
    a: "No. Everything in the program can be done on free versions. We'll tell you exactly which paid upgrades are worth it for your job and which are not.",
  },
  {
    q: "Is this useful for my specific job?",
    a: "Yes. The skills like prompting, choosing tools, automating repeat work — apply to marketing, HR, sales, teaching, founding, operations. In sessions you work on your tasks, not generic examples.",
  },
  {
    q: "How is this different from YouTube tutorials?",
    a: "Primarily three things: it's live, it's structured (7 areas in the right order, not random videos), and it's taught by a team that builds AI systems for real businesses, you learn what works, not what trends.",
  },
  {
    q: "What do I walk away with?",
    a: "The ability to hand real work to AI confidently, a resource vault of prompts and skills, a certificate, 3 months of Circle access, and 1 month of follow-up support.",
  },
  {
    q: "What happens after it ends?",
    a: "You keep the portal and vault, get 1 month of follow-up support, and 3 months in the Circle so your learning doesn't stop when sessions do.",
  },
];

// Slight alternating tilt per row — straightens to 0 when that row is open.
const ROTATIONS = [-1.7, 1.4, -1.2, 1.5, -1.3, 1.1, -1.5, 1.3, -1.1];

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
    <section style={{ padding: "var(--section-py) var(--section-px)", background: "#c2edcb" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>FAQ</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Answers you might need
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
                  <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>
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
