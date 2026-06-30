"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";

/**
 * The Shift — a vertical sequence of outcome lines that pre-load dim, then
 * light up green one at a time as the "active" line, settling to full white
 * once passed. Runs once when the section scrolls into view; stops after the
 * last line (no loop). Only `prefers-reduced-motion` skips the stagger — unlike
 * the rest of the site, this also runs on touch/mobile: it's a cheap
 * setInterval + colour transition, not a heavy canvas/WebGL loop, so there's
 * no perf reason to gate it behind `useReducedEffects`'s touch check.
 */

const lines: string[] = [
  "Finally understand what AI actually does",
  "Get the right answer on the first try",
  "Reach for the right tool every time",
  "Make images, video and voice yourself",
  "Keep an AI that already knows your work",
  "Hand whole tasks to agents",
  "Watch the repetitive work run itself",
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
  // Deferred to an effect (not a lazy useState initializer) so the server
  // render and the client's first render both start `reduced=false` — same
  // hydration-safe pattern as useIsTouch/useReducedEffects elsewhere in the
  // codebase, which read matchMedia after mount for the same reason.
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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
    <section
      className="relative overflow-hidden"
      style={{ padding: "var(--section-py) var(--section-px)", background: "#c2edcb" }}
    >
      {/* Creative texture on the pastel-green field — a soft dot grid plus two
          drifting radial blooms, so the section reads as a living surface
          rather than a flat colour slab. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(3,98,76,0.16) 1.3px, transparent 1.3px)",
          backgroundSize: "20px 20px",
          WebkitMaskImage: "radial-gradient(circle, black 35%, transparent 70%)",
          maskImage: "radial-gradient(circle, black 35%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 32% at 14% 18%, rgba(0,223,130,0.28), transparent 70%), radial-gradient(34% 30% at 88% 82%, rgba(3,98,76,0.22), transparent 70%)",
          filter: "blur(36px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>The shift</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            What changes in two weeks?
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
