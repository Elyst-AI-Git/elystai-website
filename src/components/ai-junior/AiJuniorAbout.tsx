"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { IconTile } from "@/components/ui/icons";

const stats = [
  { value: "5 Days", label: "Live Challenge", rotate: -3, tone: "card" },
  { value: "90 Mins", label: "Per Day", rotate: 2, tone: "green" },
  { value: "Grade 5–10", label: "Grade Level", rotate: -1, tone: "dark" },
  { value: "1", label: "Certificate", rotate: 3, tone: "tint" },
  { value: "10–11.30 IST", label: "Morning Batch", rotate: -2, tone: "darkAlt" },
  { value: "7–8.30 IST", label: "Evening Batch", rotate: 2, tone: "card" },
];

type Stat = (typeof stats)[number];
type Tone = { bg: string; valueColor: string; labelColor: string };

const toneStyles: Record<string, Tone> = {
  card: { bg: "#ffffff", valueColor: "var(--elyst-emerald)", labelColor: "var(--fg-2)" },
  green: { bg: "var(--elyst-green)", valueColor: "var(--elyst-emerald)", labelColor: "rgba(3,98,76,0.7)" },
  dark: { bg: "var(--elyst-emerald)", valueColor: "var(--elyst-green)", labelColor: "rgba(255,255,255,0.8)" },
  tint: { bg: "var(--green-tint-15)", valueColor: "var(--elyst-emerald)", labelColor: "var(--fg-2)" },
  darkAlt: { bg: "var(--elyst-emerald-light)", valueColor: "var(--elyst-green)", labelColor: "rgba(255,255,255,0.8)" },
};

function StatTile({ stat, tone }: { stat: Stat; tone: Tone }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ rotate: hovered ? 0 : stat.rotate }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="cursor-default rounded-lg p-7 shadow-sm"
      style={{ background: tone.bg }}
    >
      <h3 className="font-display font-bold" style={{ fontSize: "1.85rem", color: tone.valueColor }}>
        {stat.value}
      </h3>
      <p className="font-medium" style={{ fontSize: "var(--text-small)", color: tone.labelColor }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function AiJuniorAbout() {
  return (
    <section id="about" className="relative overflow-hidden bg-surface-muted" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-14 md:flex-row md:items-center">
          {/* Stat tile collage */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 flex-1 md:order-1"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => {
                const t = toneStyles[s.tone];
                return <StatTile key={s.value} stat={s} tone={t} />;
              })}
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="order-1 flex-1 md:order-2"
          >
            <h2 className="font-display font-bold leading-tight text-fg" style={{ fontSize: "var(--text-h2)" }}>
              What is <span style={{ color: "var(--elyst-emerald-light)" }}>AI for Juniors?</span>
            </h2>
            <p className="mt-5 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.7 }}>
              Most kids use AI to cheat on homework. We teach them{" "}
              <span className="font-bold italic" style={{ color: "var(--elyst-emerald)" }}>to create</span>{" "}
              with it. Over 5 live sessions, your child learns to prompt,
              design, and build the skills that actually matter.
            </p>
            <div className="mt-6 flex items-center gap-4 rounded-xl bg-white p-4">
              <IconTile tone="darkgreen" size={48}>
                <GraduationCap className="h-5 w-5" />
              </IconTile>
              <div>
                <p className="font-display font-bold text-fg" style={{ fontSize: "var(--text-small)" }}>
                  No technical knowledge needed, we start from scratch
                </p>
                <p className="text-fg-3" style={{ fontSize: "0.82rem" }}>Grades 5–10</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
