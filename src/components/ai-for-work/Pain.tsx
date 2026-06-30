"use client";

import { motion } from "framer-motion";
import { Square } from "lucide-react";
import { useReducedEffects } from "@/lib/use-reduced-effects";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * The Pain section — a narrow horizontal strip, not a full section. One cutting
 * line on the left (the bite picked out in bright green), and a compact "your
 * week" task list on the right: the repetitive work every professional still
 * does by hand (emails, reports, decks) with the hours stacking up. It lands
 * the "still doing the same work, just slower" feeling in one glance.
 */

const tasks = [
  { label: "Dig through the research", hrs: "1h" },
  { label: "Write the weekly report", hrs: "1h" },
  { label: "Rework the deck", hrs: "1h" },
];

/** Compact "your week" checklist — everything still done manually. */
function WeekMockup() {
  return (
    <div className="w-full max-w-[340px] rotate-[-2deg] rounded-xl bg-white p-4 shadow-2xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-[#9a9a9a]">
          Your week
        </span>
        <span className="rounded-md bg-[#fdecea] px-2 py-0.5 text-[0.68rem] font-semibold text-[#c4422e]">
          Time-consuming
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {tasks.map((t) => (
          <li key={t.label} className="flex items-center gap-2.5">
            <Square className="h-4 w-4 shrink-0 text-[#cfcfcf]" />
            <span className="flex-1 text-[0.92rem] text-[#3a3a3a]">{t.label}</span>
            <span className="text-[0.78rem] font-semibold text-[#9a9a9a]">{t.hrs}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Pain() {
  const reduced = useReducedEffects();

  const panel = (
    <div
      className="relative overflow-hidden rounded-[var(--radius-card)]"
      style={{
        background:
          "linear-gradient(135deg, var(--surface-dark-2) 0%, var(--surface-dark) 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 px-7 py-9 sm:px-10 md:flex-row md:items-center md:justify-between md:gap-12 md:px-14 md:py-10">
        <div className="md:flex-1">
          <SectionMark tone="dark">Sound familiar?</SectionMark>
          <p
            className="mt-4 font-display font-bold"
            style={{ fontSize: "calc(var(--text-h2) - 9px)", lineHeight: 1.2, color: "rgba(255,255,255,0.92)" }}
          >
            You have tried AI.
            <br />
            But the research, reports and decks{" "}
            <span style={{ color: "var(--elyst-green)" }}>still eat your week.</span>
          </p>
        </div>

        <div className="flex w-full justify-center md:w-auto md:shrink-0">
          <WeekMockup />
        </div>
      </div>
    </div>
  );

  return (
    <section
      style={{
        padding: "clamp(44px, 6vw, 80px) clamp(16px, 3vw, 40px)",
        background: "var(--bg) url('/accel-hero/hero-bg.jpg') center / cover no-repeat",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {reduced ? (
          panel
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {panel}
          </motion.div>
        )}
      </div>
    </section>
  );
}
