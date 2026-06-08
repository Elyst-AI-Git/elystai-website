"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { BackgroundLines } from "@/components/ui/background-lines";

/**
 * Accelerator hero — the warm tonal pole opposite the AIOS hero.
 *
 * Centred, generous whitespace, a soft WITHIN-EMERALD gradient wash, and the
 * Aceternity animated background-lines (recoloured to brand greens) drifting
 * behind the copy. One kinetic element of its own: a single cycling word that
 * names the transformation. The community (Circle) carries the primary action
 * since the Flagship has no waitlist.
 */

const CYCLE = ["capable", "fluent", "confident", "competitive"];

function CyclingWord() {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % CYCLE.length), 2000);
    return () => clearInterval(id);
  }, []);

  // Reserve width for the longest word so the line never reflows.
  return (
    <span
      className="relative inline-grid align-baseline"
      style={{ color: "var(--elyst-green)" }}
    >
      <span aria-hidden className="invisible col-start-1 row-start-1">
        competitive
      </span>
      {reduce ? (
        <span className="col-start-1 row-start-1 text-left">{CYCLE[0]}</span>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.span
            key={i}
            initial={{ opacity: 0, y: "0.4em" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-0.4em" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="col-start-1 row-start-1 whitespace-nowrap text-left"
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
        paddingTop: "clamp(32px, 5vw, 72px)",
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
          <span className="chip" style={{ background: "var(--green-tint-15)" }}>
            Learn AI · The Accelerator
          </span>

          <h1
            className="mt-7 text-fg"
            style={{ fontSize: "clamp(2.4rem, 5.4vw, 4.6rem)", lineHeight: 1.1 }}
          >
            <span className="block">Stay genuinely</span>
            <span className="flex items-baseline justify-center gap-[0.28em] whitespace-nowrap">
              <CyclingWord /> with AI.
            </span>
          </h1>

          <p
            className="mx-auto mt-7 max-w-xl text-fg-2"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
          >
            For working professionals across India &amp; the GCC who want to stay
            ahead as AI reshapes their field — taught live, bilingually in
            Malayalam &amp; English, and backed by a community that keeps you
            sharp.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <BrandButton href="/circle" tone="green">
              Join the community
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
            <a
              href="#paths"
              className="inline-flex items-center gap-1.5 text-small font-semibold text-emerald underline-offset-4 hover:underline"
            >
              See what&rsquo;s coming
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-8 text-small text-fg-3">
            Backed by a 34+ member community.
          </p>
        </div>
      </BackgroundLines>
    </section>
  );
}
