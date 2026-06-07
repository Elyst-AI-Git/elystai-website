"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, GraduationCap, Settings2, X, Zap } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * Pricing WITHOUT numbers (Direction B). Signals premium/custom, sets the
 * "book a call for a tailored quote" expectation, and qualifies out
 * tyre-kickers via an honest for-you/not-for-you split. NO figures anywhere
 * — the entire strategy is custom-quote (NOTES.md is explicit on this).
 */

const structure = [
  {
    Icon: Zap,
    label: "One-time setup",
    line: "Discovery, configuration, and deployment — built around your business.",
  },
  {
    Icon: Settings2,
    label: "Monthly retainer",
    line: "Ongoing running and support, scaled to the modules you actually use.",
  },
  {
    Icon: GraduationCap,
    label: "Optional training add-on",
    line: "AI-tools training for your team — NotebookLM, Claude Projects.",
  },
];

const forYou = [
  "A team of 5–50, with no technical staff on hand.",
  "Drowning in manual documents, queries, and daily coordination.",
  "Ready to commit to a configured service, not a free trial.",
];

const notForYou = [
  "Looking for a free, self-serve tool to poke at.",
  "After a one-off ChatGPT licence, not an operations system.",
  "Not ready to change how the team works day to day.",
];

function StructureCard({ item, index }: { item: (typeof structure)[number]; index: number }) {
  const { Icon, label, line } = item;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="card flex flex-col gap-3 p-6"
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: "var(--green-tint-07)" }}
      >
        <Icon className="h-[18px] w-[18px] text-emerald" />
      </span>
      <h3 className="font-semibold text-fg" style={{ fontSize: "1.05rem" }}>
        {label}
      </h3>
      <p className="text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
        {line}
      </p>
    </motion.div>
  );
}

function QualifierColumn({
  title,
  items,
  tinted,
}: {
  title: string;
  items: string[];
  tinted: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-4 p-7"
      style={{
        background: tinted ? "var(--green-tint-07)" : "var(--surface-muted)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <h3
        className="font-semibold"
        style={{ fontSize: "1.05rem", color: tinted ? "var(--elyst-emerald)" : "var(--fg-3)" }}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            {tinted ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-fg-3" />
            )}
            <span
              style={{
                fontSize: "var(--text-small)",
                lineHeight: 1.5,
                color: tinted ? "var(--fg)" : "var(--fg-3)",
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AiosPricing() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Pricing</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Priced to your business, not off a shelf.
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            AIOS is a configured service — every engagement is quoted to your
            workflows and the modules you run.
          </p>
        </div>

        {/* Part 1 — cost structure (shape, not a price table) */}
        <div className="mt-14">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {structure.map((item, i) => (
              <StructureCard key={item.label} item={item} index={i} />
            ))}
          </div>
          <p className="mt-6 text-center text-fg-3" style={{ fontSize: "var(--text-small)" }}>
            Configured to your business — every quote is tailored.
          </p>
        </div>

        {/* Part 2 — for you / not for you */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <QualifierColumn title="AIOS is for you if…" items={forYou} tinted />
          <QualifierColumn title="AIOS is not for you if…" items={notForYou} tinted={false} />
        </div>

        {/* Single CTA — the section's one action */}
        <div className="mt-12 flex justify-center">
          <BrandButton href="/contact" tone="emerald">
            Get a tailored quote — Book a call
            <ArrowRight className="h-4 w-4" />
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
