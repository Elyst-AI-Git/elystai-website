"use client";

import { useEffect, useState } from "react";
import { SectionMark } from "./SectionMark";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Accelerator hero — the warm tonal pole opposite the AIOS hero.
 *
 * Centred, generous whitespace, a soft WITHIN-EMERALD gradient wash, and the
 * Aceternity animated background-lines (recoloured to brand greens) drifting
 * behind the copy. One kinetic element of its own: a single cycling word that
 * names the transformation. The community (Circle) carries the primary action
 * since the Flagship has no waitlist.
 */

const CYCLE = ["confident", "relevant", "competitive", "irreplaceable"];

function CyclingWord() {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);
  // The word swap fires every 2s forever via setInterval — a permanent
  // background timer + re-render. Touch devices get the static first word,
  // same as prefers-reduced-motion.
  const isTouch = useIsTouch();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches || isTouch) return;
    const id = setInterval(() => setI((n) => (n + 1) % CYCLE.length), 2000);
    return () => clearInterval(id);
  }, [isTouch]);

  return (
    <span
      className="relative inline-block whitespace-nowrap align-baseline"
      style={{ color: "var(--elyst-green)" }}
    >
      {reduce || isTouch ? (
        <span>{CYCLE[0]}</span>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.span
            key={i}
            initial={{ opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-0.4em" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block whitespace-nowrap"
          >
            {CYCLE[i]}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}

export default function AccelHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(26px, 4vw, 58px)",
        paddingBottom: "clamp(40px, 6vw, 96px)",
        paddingLeft: "var(--section-px)",
        paddingRight: "var(--section-px)",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, var(--green-tint-07), transparent 70%), linear-gradient(to bottom, var(--bg), color-mix(in srgb, var(--bg) 88%, var(--emerald-tint-10)))",
      }}
    >
      <BackgroundLines
        className="relative flex items-center justify-center !h-auto md:!h-auto min-h-[34rem] bg-transparent md:min-h-[40rem]"
        svgOptions={{ duration: 12 }}
      >
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <SectionMark>The Accelerator</SectionMark>

          <h1
            className="mt-7 text-fg"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            <span className="relative inline-block whitespace-nowrap align-baseline">
              {/* Invisible sizer: fixes the box to the width of "Stay confident"
                  (our median reference word), so the line centres exactly as it
                  would when showing "confident" — regardless of which word is
                  currently live. */}
              <span aria-hidden className="invisible">
                Stay confident
              </span>
              {/* The real content overlays the box, anchored to its left edge —
                  "Stay" never moves; only the word to its right grows/shrinks
                  (and may overflow the box on longer words like "irreplaceable"). */}
              <span className="absolute inset-y-0 left-0 flex items-baseline whitespace-nowrap">
                <span>Stay&nbsp;</span>
                <CyclingWord />
              </span>
            </span>
            <span className="block">With AI.</span>
          </h1>

          <p
            className="mx-auto mt-7 max-w-xl text-fg-2"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
          >
            Programs for people who want to use AI in their work,
            <br />
            not just hear about it.
          </p>
        </div>
      </BackgroundLines>
    </section>
  );
}
