"use client";

import { Sparkles, Users, Check } from "lucide-react";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { Card } from "@/components/ui/card";
import { SectionMark } from "./SectionMark";

/**
 * Accelerator paths — the core section. One anchor offering (the Flagship,
 * presented as a restrained teaser with NO CTA) plus the community (Circle),
 * which carries the page's primary action since there's no waitlist.
 */

const flagshipTaste = [
  "Use AI confidently in your actual work — not just occasionally.",
  "Go from watching to building, with people who ship real AI.",
  "Stay competitive as your field changes around you.",
];

const circlePoints = [
  "Curated AI updates, peers, and weekly value — in WhatsApp.",
  "First to know the moment the Flagship opens.",
];

export default function AccelPaths() {
  return (
    <section
      id="paths"
      className="relative scroll-mt-28 overflow-hidden"
      style={{
        padding: "var(--section-py) var(--section-px)",
        // Deep, deliberate dark-green surface — a single per-section departure
        // from the light base (DESIGN.md's "legacy dark, used sparingly"),
        // tuned so the cards below can read as bright paper set on a dark desk.
        background:
          "linear-gradient(165deg, color-mix(in srgb, var(--surface-dark) 78%, var(--elyst-emerald) 22%), var(--surface-dark) 55%, color-mix(in srgb, var(--surface-dark) 88%, black 12%))",
      }}
    >
      {/* Heavy film grain — ONE large, non-tiling noise image stretched to
          cover the whole section (no `repeat`, so no seams/grid-lines between
          tiles — the artefact the repeating SVG patterns produced before).
          Two fractalNoise passes (fine grain + coarse mottling) are combined
          inside a single filter via feBlend, so it still reads as rough/worn,
          just as one continuous surface. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='fine'/%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='2' result='coarse'/%3E%3CfeColorMatrix in='coarse' type='saturate' values='0' result='coarseGray'/%3E%3CfeBlend in='fine' in2='coarseGray' mode='overlay'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: 0.5,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark tone="dark">The program + the community</SectionMark>
          <h2 className="mt-6" style={{ fontSize: "var(--text-h2)", color: "var(--fg-on-dark)" }}>
            The deep program for professionals — and the community around it.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Tier 1 — Flagship (anchor, NO CTA) — gradient-frame card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <Card
              variant="gradient"
              className="flex flex-col p-8 sm:p-10"
              style={{
                borderRadius: "var(--radius-xl, 24px)",
                background: "var(--card)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 24px 60px -20px rgba(2, 20, 14, 0.55)",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "var(--green-tint-15)" }}
                >
                  <Sparkles className="h-5 w-5 text-emerald" />
                </span>
                <span
                  className="rounded-pill px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-emerald"
                  style={{ background: "var(--green-tint-15)" }}
                >
                  Coming soon · launching late June 2026
                </span>
              </div>

              <h3
                className="mt-6 text-fg"
                style={{ fontSize: "var(--text-h3)", lineHeight: 1.2 }}
              >
                The Flagship GenAI program for professionals.
              </h3>
              <p
                className="mt-3 max-w-md text-fg-2"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
              >
                A live, in-depth program to make GenAI a daily working tool — not a
                novelty. Built for professionals who want to keep pace with their
                field.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {flagshipTaste.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                    <span className="text-small text-fg-2">{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-small text-fg-3">
                Full details land on its own page closer to launch.
              </p>
            </Card>
          </motion.div>

          {/* Tier 2 — Circle (primary action) — gradient-frame card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <Card
              variant="gradient"
              className="flex h-full flex-col p-8"
              style={{
                borderRadius: "var(--radius-xl, 24px)",
                background: "var(--card)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 24px 60px -20px rgba(2, 20, 14, 0.55)",
              }}
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "var(--green-tint-15)" }}
              >
                <Users className="h-5 w-5 text-emerald" />
              </span>

              <h3
                className="mt-6 text-fg"
                style={{ fontSize: "var(--text-h3)", lineHeight: 1.2 }}
              >
                The Circle
              </h3>
              <p className="mt-2 text-small font-semibold text-emerald">
                Active today
              </p>
              <p
                className="mt-3 text-fg-2"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
              >
                The community that keeps you sharp right now.
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-3">
                {circlePoints.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald" />
                    <span className="text-small text-fg-2">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <BrandButton href="/circle" tone="green" full>
                  Join the community
                </BrandButton>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
