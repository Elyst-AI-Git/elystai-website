"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "What grade levels is this for?",
    a: "AI for Juniors is designed for students in Grades 5–10. The sessions are simple enough for younger kids to follow and challenging enough to keep older students engaged.",
  },
  {
    q: "Does my child need any technical background?",
    a: "None at all. We start from scratch, no coding, no prior AI experience required. We focus on prompt engineering: teaching kids to communicate with AI in plain language.",
  },
  {
    q: "What will they actually build?",
    a: "Over 5 live sessions, your child will create AI-generated images and videos, design posters, write effective prompts, and even build a simple website, all using AI tools.",
  },
  {
    q: "Are the sessions live or recorded?",
    a: "The sessions are live and interactive, so your child can ask questions and get real-time guidance. Every registration also includes 1 month of recorded access to revisit any session.",
  },
  {
    q: "How much time will this take per day?",
    a: "Just 90 minutes a day for 5 days. We've designed the program to deliver real, visible progress without overwhelming your child's schedule.",
  },
  {
    q: "What if my child misses a session?",
    a: "No problem, every session is recorded and available for a full month after the program, so your child can catch up at their own pace.",
  },
];

// Slight alternating tilt per row, straightens to 0 when that row is open.
// Kept gentle so a tilted card's corner never overlaps the question below it.
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

export default function AiJuniorFaq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Got Questions?</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
            Everything you need to <span style={{ color: "var(--elyst-emerald)" }}>know.</span>
          </h2>
          <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            If it&rsquo;s not here, just reach out.
          </p>
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
                    <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}>
                      {f.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>

        <p className="mt-12 text-center text-fg-2" style={{ fontSize: "var(--text-small)" }}>
          Still have a question?{" "}
          <a href="tel:+919633288931" className="font-semibold underline" style={{ color: "var(--elyst-emerald)" }}>
            +91-9633288931
          </a>
        </p>
      </div>
    </section>
  );
}
