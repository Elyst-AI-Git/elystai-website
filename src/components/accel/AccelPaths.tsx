"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionMark } from "./SectionMark";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Accelerator paths — two program cards sitting on a narrow pastel-green band.
 * Each white card carries the program name as a full-bleed highlight bar with a
 * thinner "by Elyst AI" bar beneath; hovering lifts the card and reveals a one-
 * line briefing of what the program is.
 */

type Program = {
  name: string;
  href: string;
  blurb: string;
  titleBg: string;
  titleColor: string;
  ribbon?: string;
};

const programs: Program[] = [
  {
    name: "AI for Work",
    href: "/ai-for-work",
    blurb: "A 2 week live program to make AI your everyday working assistant. Prompts, automations and agents that save you hours every week, taught live by the team that builds AI for real businesses.",
    titleBg: "var(--elyst-emerald)",
    titleColor: "#eafff2",
    ribbon: "Open now",
  },
  {
    name: "The Circle",
    href: "/circle",
    blurb: "An always-on community that keeps you sharp on everything AI, with a new question every day and people moving at your pace, not following the noise.",
    titleBg: "#103b30",
    titleColor: "#eafff2",
  },
];

function ProgramCard({ program, index, isTouch }: { program: Program; index: number; isTouch: boolean }) {
  const card = (
    <div
      className="group relative h-full overflow-hidden rounded-md bg-white shadow-[0_14px_36px_-18px_rgba(3,98,76,0.45)] transition-transform duration-300 ease-out hover:-translate-y-1.5"
    >
      {/* Title bar — full bleed, edge to edge */}
      <div
        className="relative flex w-full flex-wrap items-center justify-between gap-3 px-7 py-7 text-left font-display font-bold"
        style={{ background: program.titleBg, color: program.titleColor, fontSize: "clamp(2.2rem, 3.8vw, 3.1rem)", lineHeight: 1.05 }}
      >
        <span>{program.name}</span>
        {/* Edge ribbon — white, vertically centered with the title, never overlapping it */}
        {program.ribbon && (
          <span
            className="shrink-0 rounded-md px-4 py-1.5 font-bold uppercase tracking-wide"
            style={{ background: "#ffffff", color: "var(--elyst-emerald)", fontSize: "var(--text-small)", boxShadow: "0 4px 12px rgba(0,0,0,0.18)" }}
          >
            {program.ribbon}
          </span>
        )}
      </div>

      {/* Briefing — always visible */}
      <div className="px-7 py-6">
        <p
          style={{ color: "#0A0F0C", fontSize: "calc(var(--text-body) + 2px)", lineHeight: 1.6 }}
        >
          {program.blurb}
        </p>
      </div>
    </div>
  );

  const wrapped = (
    <Link href={program.href} className="block h-full">
      {card}
    </Link>
  );

  if (isTouch) return <div className="h-full">{wrapped}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      {wrapped}
    </motion.div>
  );
}

export default function AccelPaths() {
  const isTouch = useIsTouch();
  return (
    <section id="paths" className="relative scroll-mt-28 bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Programs</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            The perfect place to be AI native.
          </h2>
        </div>

        {/* Wide pastel-green band behind the two cards only */}
        <div className="mt-12 rounded-md p-8 sm:p-16" style={{ background: "#c2edcb" }}>
          <div className="grid items-start gap-6 sm:grid-cols-2">
            {programs.map((p, i) => (
              <ProgramCard key={p.href} program={p} index={i} isTouch={isTouch} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
