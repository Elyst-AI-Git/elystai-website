"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import { useReducedEffects } from "@/lib/use-reduced-effects";

/**
 * The Shift — a vertical sequence of outcome lines that pre-load dim, then
 * light up green one at a time as the "active" line, settling to full white
 * once passed. Runs once when the section scrolls into view; stops after the
 * last line (no loop).
 */

const lines: string[] = [
  "Exactly what you need, first try",
  "A toolkit built for your actual work",
  "Images, video and voice you make yourself",
  "A personal AI that already knows your work",
  "Agents that finish the job for you",
  "Work that runs itself on autopilot",
];

const STEP_DURATION = 1200;

function StepRow({ text, status }: { text: string; status: "done" | "active" | "pending" }) {
  const color = status === "pending" ? "rgba(240,250,248,0.32)" : status === "active" ? "var(--elyst-green)" : "var(--fg-on-dark)";
  return (
    <motion.div
      className="flex items-center gap-4 py-3.5"
      animate={{ color }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ color }}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: status === "pending" ? "rgba(240,250,248,0.32)" : "var(--elyst-green)" }}
      />
      <span className="font-display font-bold" style={{ fontSize: "calc(var(--text-body) + 2px)" }}>
        {text}
      </span>
    </motion.div>
  );
}

export default function Transformation() {
  const reduced = useReducedEffects();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (reduced || !inView) return;
    setActiveIndex(0);
    const id = setInterval(() => {
      setActiveIndex((i) => {
        if (i >= lines.length - 1) {
          clearInterval(id);
          return i;
        }
        return i + 1;
      });
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, [inView, reduced]);

  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>The shift</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            From stuck to fluent, in two weeks.
          </h2>
        </div>

        <div
          ref={containerRef}
          className="mt-12 rounded-md border-2 px-6 py-2 sm:px-8"
          style={{ borderColor: "var(--elyst-emerald)", background: "var(--surface-dark)" }}
        >
          {lines.map((text, i) => (
            <StepRow
              key={text}
              text={text}
              status={reduced ? "done" : i < activeIndex ? "done" : i === activeIndex ? "active" : "pending"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
