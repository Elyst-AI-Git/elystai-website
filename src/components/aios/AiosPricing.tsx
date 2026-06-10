"use client";

import * as React from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import {
  IconSetup,
  IconRetainer,
  IconTraining,
  IconTile,
  type IconProps,
} from "@/components/ui/icons";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Pricing WITHOUT numbers (Direction B). Signals premium/custom, sets the
 * "book a call for a tailored quote" expectation, and qualifies out
 * tyre-kickers via an honest for-you/not-for-you split. NO figures anywhere
 * — the entire strategy is custom-quote (NOTES.md is explicit on this).
 */

const structure: {
  Icon: (props: IconProps) => React.ReactElement;
  label: string;
  line: string;
}[] = [
  {
    Icon: IconSetup,
    label: "One-time setup",
    line: "Discovery, configuration and deployment. Built around your business.",
  },
  {
    Icon: IconRetainer,
    label: "Retainer",
    line: "Ongoing support, scaled to the modules you actually use.",
  },
  {
    Icon: IconTraining,
    label: "Training",
    line: "We train your team to be AI native at work.",
  },
];

function StructureCard({ item, index }: { item: (typeof structure)[number]; index: number }) {
  const { Icon, label, line } = item;
  const isTouch = useIsTouch();
  const content = (
    <>
      {/* Dotted hover overlay — desktop only, never fires on touch */}
      {!isTouch && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,98,76,0.12)_1px,transparent_1px)] bg-[length:5px_5px]" />
        </div>
      )}
      <IconTile tone="darkgreen" className="relative z-10">
        <Icon size={21} variant="line" />
      </IconTile>
      <h3 className="relative z-10 font-bold text-fg" style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)" }}>
        {label}
      </h3>
      <p className="relative z-10 text-fg-2" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.15rem)", lineHeight: 1.5 }}>
        {line}
      </p>
    </>
  );
  if (isTouch) {
    return <div className="group relative card flex flex-col gap-3 p-6 overflow-hidden">{content}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="group relative card flex flex-col gap-3 p-6 overflow-hidden"
    >
      {content}
    </motion.div>
  );
}

export default function AiosPricing() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Pricing</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Priced just for your business.
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            AIOS is configured for you, so the price is too.
          </p>
        </div>

        {/* Part 1 — cost structure (shape, not a price table) */}
        <div className="mt-14">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {structure.map((item, i) => (
              <StructureCard key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Single CTA — the section's one action */}
        <div className="mt-12 flex justify-center">
          <BrandButton href="https://cal.com/elyst-ai/30min" tone="emerald">
            Get a tailored quote
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
