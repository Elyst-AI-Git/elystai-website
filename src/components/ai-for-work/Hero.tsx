"use client";

import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * AI for Work hero — airy and optimistic: a soft cloudy sky (built from layered
 * radial gradients, lightly brand-green tinted), one big promise with an emerald
 * italic accent, a single prominent action, and six funky 3D fact-tiles
 * floating around the copy.
 *
 * Large screens float the tiles around the column; below lg (no room to clear
 * the centred copy) the tiles collapse into a tidy wrapped row beneath the CTA.
 */

type Tone = "emerald" | "light";

const toneStyles: Record<Tone, { bg: string; color: string; shadow: string }> = {
  light: {
    bg: "linear-gradient(180deg, #ffffff 0%, #eef4f1 100%)",
    color: "var(--elyst-emerald)",
    shadow: "#c2d3cb",
  },
  emerald: {
    bg: "linear-gradient(180deg, var(--elyst-emerald-light) 0%, var(--elyst-emerald) 100%)",
    color: "#ffffff",
    shadow: "#013024",
  },
};

type Fact = { label: string; tone: Tone; rotate: number; pos: string };

// Six facts, floated around the copy on lg (laptop occupies the top-right).
const facts: Fact[] = [
  { label: "2 Weeks", tone: "emerald", rotate: -7, pos: "left-[14%] top-[22%]" },
  { label: "Live Classes", tone: "light", rotate: 5, pos: "left-[10%] top-[50%]" },
  { label: "Work Faster", tone: "light", rotate: 6, pos: "left-[14%] top-[78%]" },
  { label: "Live Q&A", tone: "light", rotate: -4, pos: "right-[14%] top-[22%]" },
  { label: "Free Recordings", tone: "light", rotate: 4, pos: "right-[10%] top-[50%]" },
  { label: "Certificate", tone: "emerald", rotate: -6, pos: "right-[14%] top-[78%]" },
];

function Tile({ label, tone, rotate }: { label: string; tone: Tone; rotate: number }) {
  const t = toneStyles[tone];
  const depth = 5;
  return (
    <span
      className="inline-block select-none rounded-md font-display font-bold"
      style={{
        background: t.bg,
        color: t.color,
        fontSize: "var(--text-small)",
        padding: "0.55rem 1rem",
        transform: `rotate(${rotate}deg)`,
        boxShadow: `0 ${depth}px 0 ${t.shadow}, 0 ${depth + 5}px 13px rgba(3,98,76,0.18), inset 0 1px 0 rgba(255,255,255,0.6)`,
      }}
    >
      {label}
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden"
      style={{
        padding: "clamp(120px, 16vh, 200px) var(--section-px) clamp(60px, 9vh, 110px)",
        background: "linear-gradient(to bottom, #e3eef0 0%, #eef5f2 38%, var(--bg) 100%)",
      }}
    >
      {/* Soft cloud puffs — white radial blobs, lightly brand-tinted. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(42% 60% at 20% 20%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%), radial-gradient(30% 44% at 33% 15%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%), radial-gradient(46% 64% at 80% 15%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 72%), radial-gradient(30% 44% at 64% 22%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%), radial-gradient(52% 55% at 48% 90%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 75%), radial-gradient(36% 50% at 90% 82%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0) 72%)",
        }}
      />
      {/* Faint green warmth so the sky still reads brand, not stock-blue. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 40% at 16% 30%, rgba(0,223,130,0.10) 0%, transparent 62%), radial-gradient(ellipse 48% 42% at 86% 76%, rgba(3,98,76,0.08) 0%, transparent 64%)",
        }}
      />

      {/* Floating fact tiles — lg+ only, framing the copy where there's room. */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        {facts.map((f, i) => (
          <motion.div
            key={f.label}
            className={`absolute ${f.pos}`}
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.35 + i * 0.08 }}
          >
            <Tile label={f.label} tone={f.tone} rotate={f.rotate} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
      >
        <SectionMark>AI for Work</SectionMark>

        <h1 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-hero)", lineHeight: 1.04 }}>
          Start working at the
          <br />
          <span style={{ color: "var(--elyst-emerald)", fontStyle: "italic" }}>
            speed of AI.
          </span>
        </h1>

        <p className="max-w-xl text-fg-2" style={{ fontSize: "calc(var(--text-body) + 2px)" }}>
          In two weeks you will use AI with real confidence in your everyday work.
        </p>

        <div className="mt-3 flex flex-col items-center gap-3">
          <BrandButton href="#enrol" tone="green">
            Join now
          </BrandButton>
        </div>

        {/* Below lg: the floating tiles collapse into a tidy wrapped row here. */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:hidden">
          {facts.map((f) => (
            <Tile key={f.label} label={f.label} tone={f.tone} rotate={0} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
