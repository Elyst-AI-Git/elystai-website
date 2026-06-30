"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionMark } from "./SectionMark";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Why learn with Elyst — a row of pastel cards (in the spirit of the reference's
 * "Online store / Website / Email marketing" stack). Each card shows only its
 * headline at rest; hovering lifts the card and reveals the supporting line.
 */

type Reason = { title: string; body: string; bg: string };

const reasons: Reason[] = [
  {
    title: "Taught by people who build it",
    body: "Our AI agency builds AI systems. You learn what actually works there, not what sounds good for a course.",
    bg: "#eaf8ef",
  },
  {
    title: "Not your typical AI course",
    body: "Others flex how many AI tools they cover. We cover what helps you become AI native.",
    bg: "#d7f0df",
  },
  {
    title: "Backed by an AI Community",
    body: "Learning doesn't stop when the session ends. The Circle keeps you sharp between them.",
    bg: "#c2edcb",
  },
  {
    title: "We do just one domain - AI",
    body: "We don't run hundreds of courses across domains. We do one domain, that's AI.",
    bg: "#a9e2ba",
  },
];

function ReasonCard({ r, alwaysExpanded }: { r: Reason; alwaysExpanded: boolean }) {
  return (
    <div
      tabIndex={0}
      className="group relative flex flex-col items-center justify-center self-start rounded-md p-7 text-center transition-all duration-300 ease-out hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--elyst-emerald)]"
      style={{
        background: r.bg,
        border: "1px solid rgba(3,98,76,0.16)",
        boxShadow: "0 4px 0 rgba(3,98,76,0.18), 0 18px 40px -16px rgba(3,98,76,0.45), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {/* Faint texture — same dotted-grain language as the rest of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md opacity-[0.35] transition-opacity duration-300 group-hover:opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(3,98,76,0.35) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <h3
        className="relative z-10 flex min-h-[5.2em] flex-col items-center justify-center gap-1.5 font-display font-bold text-[var(--elyst-emerald)]"
        style={{ fontSize: "clamp(1.7rem, 2.3vw, 1.95rem)", lineHeight: 1.2 }}
      >
        <span>{r.title}</span>
        <span aria-hidden className="rotate-90 transition-transform duration-300 group-hover:translate-y-1 group-focus-visible:translate-y-1">›</span>
      </h3>

      {/* Body — collapsed at rest, revealed on hover/focus, and always shown
          on touch devices where hover never fires. self-start above keeps
          this card's own height change from stretching its siblings. */}
      <div
        className={`relative z-10 grid transition-all duration-300 ease-out ${
          alwaysExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-4" style={{ fontSize: "calc(var(--text-body) + 1px)", lineHeight: 1.6, color: "#0A0F0C" }}>
            {r.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AccelWhy() {
  const isTouch = useIsTouch();
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Why Elyst AI</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Learning that doesn&rsquo;t feel like a lecture
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            Taught by people who build real AI systems
          </p>
        </div>

        <div className="mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) =>
            isTouch ? (
              <div key={r.title}>
                <ReasonCard r={r} alwaysExpanded />
              </div>
            ) : (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                <ReasonCard r={r} alwaysExpanded={false} />
              </motion.div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
