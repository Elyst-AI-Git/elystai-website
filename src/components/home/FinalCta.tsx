"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Panel = {
  headline: string;
  description: string;
  href: string;
  fill: string;
  textOnFill: string;
};

const panels: Panel[] = [
  {
    headline: "Book a call",
    description:
      "Get an AI employee that runs inside your business.",
    href: "https://cal.com/elyst-ai/30min",
    fill: "var(--elyst-emerald)",
    textOnFill: "var(--fg-on-dark)",
  },
  {
    headline: "Explore programs",
    description:
      "Join a program that makes you AI native.",
    href: "/learn",
    fill: "var(--elyst-green)",
    textOnFill: "var(--elyst-ink)",
  },
];

function CtaPanel({
  panel,
  hovered,
  dim,
  onHover,
}: {
  panel: Panel;
  hovered: boolean;
  dim: boolean;
  onHover: (v: boolean) => void;
}) {
  const text = hovered ? panel.textOnFill : "var(--fg)";

  return (
    <motion.div
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      initial={false}
      animate={{ backgroundColor: hovered ? panel.fill : "var(--bg)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
      style={{ opacity: dim ? 0.6 : 1 }}
    >
      <Link
        href={panel.href}
        className="flex min-h-[30vh] flex-col justify-between p-8 max-md:min-h-[22vh] md:p-12"
      >
        <div className="flex items-start justify-between gap-6">
          <h3
            className="font-display font-bold leading-[1.05]"
            style={{ fontSize: "var(--text-h1)", color: text }}
          >
            {panel.headline}
          </h3>
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border transition-colors"
            style={{
              borderColor: hovered ? text : "var(--border)",
              color: text,
            }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <p
          className="whitespace-nowrap"
          style={{ color: text, fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)" }}
        >
          {panel.description}
        </p>
      </Link>
    </motion.div>
  );
}

export default function FinalCta() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-[var(--section-px)] pt-[var(--section-py)] text-center">
        <h2 className="text-fg" style={{ fontSize: "var(--text-h2)" }}>
          Two doors. Pick yours.
        </h2>
      </div>

      <div className="mt-12 grid border-y border-border md:grid-cols-2 md:divide-x md:divide-border max-md:divide-y max-md:divide-border">
        {panels.map((p, i) => (
          <CtaPanel
            key={p.href}
            panel={p}
            hovered={hovered === i}
            dim={hovered !== null && hovered !== i}
            onHover={(v) => setHovered(v ? i : null)}
          />
        ))}
      </div>
    </section>
  );
}
