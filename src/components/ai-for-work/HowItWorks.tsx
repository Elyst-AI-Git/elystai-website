"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * How It Works — two week-cards laid out on a diagonal: Week 1 sits high and
 * to the left, Week 2 sits lower and to the right, overlapping just enough to
 * read as a sequence rather than two cards side by side. Each card's copy
 * hugs the screen edge nearest it; the mockup sits toward the centre.
 */

type Week = { label: string; title: string; sessions: string[] };

const weeks: Week[] = [
  {
    label: "Week 1",
    title: "Foundations",
    sessions: [
      "Understand what AI really is, no jargon",
      "Prompting and context that actually works",
      "Build your own everyday AI toolkit",
    ],
  },
  {
    label: "Week 2",
    title: "Automation & Agents",
    sessions: [
      "Make visuals, video and voice with AI",
      "Set up a personal AI that knows your work",
      "Put AI agents and automations to work",
    ],
  },
];

/** Mini "prompt → answer" mockup — Week 1's toolkit coming together. */
function ToolkitMockup() {
  return (
    <div className="w-[180px] rotate-[-2deg] rounded-xl bg-white p-3.5 shadow-2xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[0.62rem] font-semibold uppercase tracking-wide text-[#9a9a9a]">Your prompt</span>
      </div>
      <p className="rounded-lg bg-[#f1f3f1] px-2.5 py-2 text-[0.68rem] text-[#3a3a3a]">
        Summarise this client thread.
      </p>
      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#e8f8ef] px-2.5 py-2 text-[0.68rem] font-medium text-[#03624c]">
        <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="currentColor">
          <path d="M13.5 4.5 6 12 2.5 8.5l1-1L6 10l6.5-6.5z" />
        </svg>
        Done in 8 seconds
      </div>
    </div>
  );
}

/** Mini automation-queue mockup — Week 2's agents at work. */
function AgentsMockup() {
  const tasks = ["Draft the report", "Update the tracker", "Send the recap"];
  return (
    <div className="w-[180px] rotate-[2deg] rounded-xl bg-white p-3.5 shadow-2xl">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[0.62rem] font-semibold uppercase tracking-wide text-[#9a9a9a]">Agent queue</span>
        <span className="rounded-md bg-[#e8f8ef] px-1.5 py-0.5 text-[0.58rem] font-semibold text-[#03624c]">running</span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {tasks.map((t, i) => (
          <li key={t} className="flex items-center gap-1.5 text-[0.66rem] text-[#3a3a3a]">
            <svg viewBox="0 0 16 16" className={`h-3 w-3 shrink-0 ${i < 2 ? "text-[#00c973]" : "text-[#cfcfcf]"}`} fill="currentColor">
              <path d="M13.5 4.5 6 12 2.5 8.5l1-1L6 10l6.5-6.5z" />
            </svg>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

const CARD_BG = "var(--bg) url('/ai-for-work/howitworks-card-bg.jpg') center / cover no-repeat";

const weekVisuals = [
  {
    Mockup: ToolkitMockup,
    fill: CARD_BG,
    align: "left" as const,
  },
  {
    Mockup: AgentsMockup,
    fill: CARD_BG,
    align: "right" as const,
  },
];

function WeekCard({
  week,
  index,
  Mockup,
  fill,
  align,
  className,
  style,
}: {
  week: Week;
  index: number;
  Mockup: () => React.ReactElement;
  fill: string;
  align: "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}) {
  const textAlign = align === "left" ? "text-left items-start" : "text-right items-end md:order-2";
  const mockupOrder = align === "left" ? "md:order-2" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      className={className}
      style={style}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-md p-9 sm:p-10"
        style={{
          background: fill,
          border: "3px solid var(--elyst-emerald)",
          boxShadow: "0 18px 40px -16px rgba(3,98,76,0.4), 0 4px 12px rgba(3,98,76,0.12)",
        }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className={`flex flex-col ${textAlign}`}>
            <span className="eyebrow text-[var(--elyst-emerald)]" style={{ fontSize: "calc(var(--text-label) + 2px)" }}>
              {week.label}
            </span>
            <h3 className="mt-2 font-display font-bold text-fg" style={{ fontSize: "calc(var(--text-h3) + 2px)" }}>
              {week.title}
            </h3>
            <ul className={`mt-5 flex flex-col gap-3 ${align === "right" ? "items-end" : "items-start"}`}>
              {week.sessions.map((s) => (
                <li key={s} className={`flex gap-3 text-fg-2 ${align === "right" ? "flex-row-reverse" : ""}`} style={{ fontSize: "calc(var(--text-small) + 2px)", lineHeight: 1.5 }}>
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--elyst-emerald)" }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className={`flex shrink-0 justify-center ${mockupOrder}`}>
            <Mockup />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "var(--section-py) var(--section-px)", background: "#c2edcb" }}>
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>How it works</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Two weeks, two clear steps.
          </h2>
        </div>

        {/* Diagonal offset track — Week 1 high/left, Week 2 lower/right,
            overlapping just enough to read as a sequence. Stacks plainly
            below md. */}
        <div className="mt-14 flex flex-col gap-8 md:relative md:block md:h-[700px] md:gap-0 lg:h-[600px]">
          <WeekCard
            week={weeks[0]}
            index={0}
            Mockup={weekVisuals[0].Mockup}
            fill={weekVisuals[0].fill}
            align={weekVisuals[0].align}
            className="md:absolute md:left-0 md:top-0 md:w-[60%]"
          />
          <WeekCard
            week={weeks[1]}
            index={1}
            Mockup={weekVisuals[1].Mockup}
            fill={weekVisuals[1].fill}
            align={weekVisuals[1].align}
            className="md:absolute md:right-0 md:top-[170px] md:w-[60%] lg:top-[150px]"
          />
        </div>

        {/* Time commitment — the objection-killer, as a metallic ribbon strip
            (the same treatment as the Accelerator programs ribbon). */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mt-6 flex w-fit items-center gap-2.5 rounded-md px-5 py-2.5"
          style={{
            background: "linear-gradient(180deg, #f8faf9 0%, #dde4e0 55%, #ebefed 100%)",
            borderTop: "1px solid rgba(255,255,255,0.95)",
            borderBottom: "1px solid rgba(3,98,76,0.18)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 2px 8px rgba(3,98,76,0.12)",
          }}
        >
          <Clock className="h-5 w-5 shrink-0 text-[var(--elyst-emerald)]" />
          <p style={{ fontSize: "var(--text-small)", color: "#0A0F0C" }}>
            About <span className="font-bold">4 to 5 hours a week.</span> Live, plus a little practice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
