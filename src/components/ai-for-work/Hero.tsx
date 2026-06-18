"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import { BrandButton } from "@/components/ui/brand-button";
import { useIsTouch } from "@/lib/use-touch";
import { PRICE } from "./config";

/**
 * AI for Work hero — the 5-second hook. The reference artwork (aurora rays
 * converging on a glowing doorway) sits as a dimmed full-bleed background with a
 * layered scrim over it so the copy stays legible. The quick-facts row is a set
 * of funky 3D tiles that sit slightly misaligned and straighten on hover
 * (desktop only); on touch they stack one per line, flat.
 */

type Fact = { label: string; rotate: number; tone: keyof typeof toneStyles };

// Five quick facts, each its own tile. Alternating tilt + cycling tones so the
// row reads as a playful collage rather than a flat list.
const facts: Fact[] = [
  { label: "2 weeks", rotate: -4, tone: "green" },
  { label: "7 live sessions", rotate: 3, tone: "light" },
  { label: "100% online", rotate: -2.5, tone: "emerald" },
  { label: "Activity-based", rotate: 3.5, tone: "light" },
  { label: "Certificate", rotate: -3, tone: "green" },
];

const toneStyles = {
  // 3D look = a chunky hard offset shadow in a darker shade of the same hue,
  // plus a top highlight + bottom inner shade for a moulded, tactile face.
  green: {
    bg: "linear-gradient(180deg, #2bf29a 0%, #00df82 60%, #00c172 100%)",
    color: "#053d2e",
    shadow: "#016b46",
  },
  light: {
    bg: "linear-gradient(180deg, #ffffff 0%, #eef4f1 100%)",
    color: "var(--elyst-emerald)",
    shadow: "#9fb8ad",
  },
  emerald: {
    bg: "linear-gradient(180deg, #04855f 0%, #03624c 100%)",
    color: "#9bffd5",
    shadow: "#01130d",
  },
} as const;

function FactTile({ fact, isTouch }: { fact: Fact; isTouch: boolean }) {
  const [hovered, setHovered] = useState(false);
  const t = toneStyles[fact.tone];
  const depth = 5; // px of 3D extrusion

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        rotate: isTouch ? 0 : hovered ? 0 : fact.rotate,
        y: hovered && !isTouch ? -3 : 0,
      }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      className="cursor-default select-none rounded-xl font-display font-bold"
      style={{
        background: t.bg,
        color: t.color,
        fontSize: "var(--text-small)",
        padding: "0.6rem 1.05rem",
        // Hard offset shadow = the extruded 3D side; soft glow underneath grounds it.
        boxShadow: `0 ${depth}px 0 ${t.shadow}, 0 ${depth + 6}px 14px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.5)`,
      }}
    >
      {fact.label}
    </motion.div>
  );
}

export default function Hero() {
  const isTouch = useIsTouch();

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "var(--surface-dark)" }}
    >
      {/* Full-bleed reference artwork — dimmed for text contrast. */}
      <Image
        src="/images/waitlist-hero.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ opacity: 0.32 }}
      />

      {/* Legibility scrim — pools darkness behind the centred copy. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(2,8,6,0.72) 0%, rgba(2,8,6,0.4) 55%, transparent 100%), linear-gradient(to bottom, rgba(2,8,6,0.55) 0%, rgba(2,8,6,0.25) 45%, rgba(2,8,6,0.6) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 pt-28 pb-16 text-center"
      >
        <SectionMark tone="dark">A program by Elyst AI</SectionMark>

        <h1
          className="font-display font-bold text-white"
          style={{ fontSize: "var(--text-hero)", lineHeight: 1.05, textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
        >
          Put AI to work in your daily work.
        </h1>

        <p
          className="max-w-xl text-white/90"
          style={{ fontSize: "var(--text-body)", textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
        >
          A 2-week live program for practitioners and founders who want to
          actually use AI — no tech background needed.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <BrandButton href="#enrol" tone="green">
            Join AI for Work — {PRICE}
          </BrandButton>
          <BrandButton href="#curriculum" variant="outline">
            See more
          </BrandButton>
        </div>

        {/* Quick facts — funky 3D tiles, misaligned on desktop, stacked on touch. */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          {facts.map((f) => (
            <FactTile key={f.label} fact={f} isTouch={isTouch} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
