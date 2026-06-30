"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SectionMark } from "./SectionMark";
import { AnimatePresence, motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Accelerator hero — a large rounded card (not full-bleed) sitting just below
 * the nav, set on the light-green halftone background. Copy is centred on
 * top of the card; six brand-recoloured icon chips hang off threads past the
 * card's bottom edge, the trust signal for what the Accelerator actually
 * teaches (AI tools, workflows, the brain behind it all).
 */

const CYCLE = ["confident", "relevant", "competitive", "irreplaceable"];

function CyclingWord() {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);
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
      style={{ color: "var(--elyst-emerald)" }}
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

type Charm = { src: string; alt: string; len: number; rotate: number; pos: string; size: number };

const charms: Charm[] = [
  { src: "/accel-hero/chatgpt.png", alt: "AI tools", len: 34, rotate: -6, pos: "left-[25%]", size: 44 },
  { src: "/accel-hero/brain.png", alt: "Sharper thinking", len: 50, rotate: 4, pos: "left-[35%]", size: 52 },
  { src: "/accel-hero/workflow.png", alt: "Automated workflows", len: 26, rotate: -3, pos: "left-[45%]", size: 46 },
  { src: "/accel-hero/soundwave.png", alt: "Voice & audio AI", len: 44, rotate: 5, pos: "left-[55%]", size: 46 },
  { src: "/accel-hero/sparkle.png", alt: "Generative AI", len: 30, rotate: -4, pos: "left-[65%]", size: 44 },
  { src: "/accel-hero/stars.png", alt: "5-star outcomes", len: 52, rotate: 6, pos: "left-[75%]", size: 50 },
];

function HangingCharms() {
  const isTouch = useIsTouch();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-full z-20 hidden h-0 sm:block"
    >
      {charms.map((c, i) => (
        <motion.div
          key={c.alt}
          className={`absolute ${c.pos} -translate-x-1/2`}
          style={{ top: 0 }}
          initial={isTouch ? false : { opacity: 0, y: -16 }}
          whileInView={isTouch ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.08 * i }}
        >
          {/* Thread */}
          <span
            className="mx-auto block w-px"
            style={{ height: c.len, background: "rgba(3,98,76,0.28)" }}
          />
          {/* Charm chip */}
          <span
            className="-mt-px flex items-center justify-center rounded-md bg-white p-2.5 shadow-card"
            style={{ transform: `rotate(${c.rotate}deg)`, width: c.size + 20, height: c.size + 20 }}
          >
            <Image src={c.src} alt={c.alt} width={c.size} height={c.size} className="h-full w-full object-contain" />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function AccelHero() {
  return (
    <section
      className="relative"
      style={{
        paddingTop: "clamp(14px, 2vw, 28px)",
        paddingBottom: "clamp(120px, 13vw, 190px)",
        paddingLeft: "clamp(10px, 2.4vw, 28px)",
        paddingRight: "clamp(10px, 2.4vw, 28px)",
        background: "var(--bg)",
      }}
    >
      <div className="relative mx-auto max-w-[1480px]">
      <div
        className="relative overflow-hidden rounded-md"
        style={{ boxShadow: "0 24px 64px rgba(3,98,76,0.18), 0 4px 16px rgba(3,98,76,0.1)" }}
      >
        <Image
          src="/accel-hero/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 flex min-h-[30rem] flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[36rem] md:min-h-[40rem]">
          <SectionMark>The Accelerator</SectionMark>

          <h1
            className="mt-7 text-fg"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", lineHeight: 1.1 }}
          >
            <span className="relative inline-block align-baseline sm:whitespace-nowrap">
              <span aria-hidden className="invisible hidden sm:inline-block sm:whitespace-nowrap">
                Stay confident
              </span>
              <span className="flex flex-wrap items-baseline justify-center sm:absolute sm:inset-y-0 sm:left-0 sm:flex-nowrap sm:whitespace-nowrap">
                <span>Stay&nbsp;</span>
                <CyclingWord />
              </span>
            </span>
            <span className="block">With AI.</span>
          </h1>

          <p
            className="mx-auto mt-7 max-w-xl text-fg"
            style={{ fontSize: "calc(var(--text-body) + 2px)", lineHeight: 1.6 }}
          >
            Programs for people who want to use AI in their work,
            <br />
            not just hear about it.
          </p>

          <div className="mt-8">
            <BrandButton href="/circle" tone="emerald">
              Join the Circle
            </BrandButton>
          </div>
        </div>
      </div>

      <HangingCharms />
      </div>
    </section>
  );
}
