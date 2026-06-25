"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import { VALUE_STACK } from "./config";

/**
 * What you get — a grid of narrow, slightly-tilted cards (same fun, tactile
 * language as the AI-for-Juniors stat tiles). No checkmarks; the extra space
 * lets the copy breathe. Each card untilts on hover.
 */

const rotations = [-3, 2, -1, 3, -2, 1, -3, 2, -1];
const tones = ["card", "green", "dark", "tint", "darkAlt", "card", "tint", "dark", "green"] as const;

const toneStyles: Record<string, { bg: string; titleColor: string; borderColor: string }> = {
  card: { bg: "#ffffff", titleColor: "#000000", borderColor: "var(--elyst-emerald)" },
  green: { bg: "var(--elyst-green)", titleColor: "#000000", borderColor: "#06140e" },
  dark: { bg: "var(--elyst-emerald)", titleColor: "#ffffff", borderColor: "#06140e" },
  tint: { bg: "var(--green-tint-15)", titleColor: "#000000", borderColor: "var(--elyst-emerald)" },
  darkAlt: { bg: "var(--elyst-emerald-light)", titleColor: "#ffffff", borderColor: "#06140e" },
};

function ValueTile({ title, rotate, tone, index }: { title: string; rotate: number; tone: keyof typeof toneStyles; index: number }) {
  const [hovered, setHovered] = useState(false);
  const t = toneStyles[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: (index % 3) * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ rotate: hovered ? 0 : rotate }}
      className="flex items-center rounded-xl border-[3px] px-6 py-7"
      style={{ background: t.bg, borderColor: t.borderColor }}
    >
      <span className="font-display font-bold" style={{ fontSize: "calc(var(--text-h3) - 2px)", lineHeight: 1.25, color: t.titleColor }}>
        {title}
      </span>
    </motion.div>
  );
}

export default function ValueStack() {
  return (
    <section className="bg-surface-muted" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>What you get</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Everything in the box.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_STACK.map((title, i) => (
            <ValueTile key={title} title={title} rotate={rotations[i % rotations.length]} tone={tones[i % tones.length]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
