"use client";

import { useState } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * The page's single biggest AEO/GEO citation asset (NOTES.md). The FAQPage
 * JSON-LD below mirrors the visible copy exactly, word for word. base-ui's
 * Accordion.Panel keeps its children mounted in the DOM (height-animated only),
 * so every answer is present in the rendered HTML even before interaction.
 *
 * Items marked [confirm] echo NOTES.md's bracketed facts — conservative
 * wording that Nihal must verify is literally true before launch.
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

// Slight alternating tilt per row — straightens to 0 when that row is open.
// Kept gentle so a tilted card's corner never overlaps the question below it.
const ROTATIONS = [-1.7, 1.4, -1.2, 1.5, -1.3, 1.1];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function AiosFaq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      {/* FAQPage schema — mirrors the visible Q&A copy exactly */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark tone="dark">FAQ</SectionMark>
          <h2 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            Questions teams ask before they start.
          </h2>
        </div>

        <Accordion
          value={open ? [open] : []}
          onValueChange={(value) => setOpen((value as string[])[0] ?? null)}
          className="mt-14 gap-2.5"
        >
          {faqs.map((f, i) => {
            const isOpen = open === f.q;
            return (
              <motion.div
                key={f.q}
                animate={{ rotate: isOpen ? 0 : ROTATIONS[i % ROTATIONS.length] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
                style={{ zIndex: isOpen ? 10 : faqs.length - i }}
              >
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
              </motion.div>
            );
          })}
        </Accordion>

        <p className="mt-12 text-center text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
          Still have a question? Ask us on the call.
        </p>
      </div>
    </section>
  );
}
