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
    q: "I'm not technical, can I still do this?",
    a: "Yes, that's exactly who this is for. You don't need any coding or tech background. We start from zero and keep everything in plain language. If you can use WhatsApp and email, you can do this.",
  },
  {
    q: "What if I miss a session?",
    a: "No problem. Every live session is recorded and shared with you, so you can catch up anytime. And if anything is unclear, you can bring your doubts to the next live Q&A or ask in the community.",
  },
  {
    q: "How much time per week?",
    a: "Plan for about 4 to 5 hours a week. That includes the live sessions plus a little practice time, so you actually use what you learn instead of just watching.",
  },
  {
    q: "Is it live or recorded?",
    a: "Both. The classes are taught live so you can ask questions and learn in real time, and you also get the recordings to keep and revisit whenever you want.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes. You'll receive a certificate once you complete the course, something you can add to your CV or LinkedIn to show you've got real, practical AI skills.",
  },
  {
    q: "Is this only for people in India?",
    a: "Not at all. The sessions are online and open to anyone, anywhere. The price is in rupees, but you can join from any country and the recordings work in every timezone.",
  },
  {
    q: "What tools will I need, and are any of them paid?",
    a: "You can do the whole course on free tools. We'll show you the best free options first, and where a paid tool is worth it, we'll be upfront so you can decide. All you really need is a laptop and an internet connection.",
  },
  {
    q: "What happens after the course ends?",
    a: "You keep the recordings and resources for life, get 3 months in the Elyst AI Circle community, and a month of follow-up support to help everything stick. You won't be left on your own once the two weeks are up.",
  },
  {
    q: "How do I pay and join?",
    a: "Just click the join button on this page and complete the payment. You'll get a confirmation with all the details on how to access your sessions. If you get stuck, reach out and we'll help you get in.",
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
