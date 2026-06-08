"use client";

import { ArrowRight, Sparkles, Users, Check } from "lucide-react";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

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
      className="scroll-mt-28"
      style={{
        padding: "var(--section-py) var(--section-px)",
        background: "var(--surface-muted)",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip" style={{ background: "var(--green-tint-15)" }}>
            The program + the community
          </span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            The deep program for professionals — and the community around it.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Tier 1 — Flagship (anchor, NO CTA) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col overflow-hidden p-8 sm:p-10 lg:col-span-2"
            style={{
              borderRadius: "var(--radius-xl, 24px)",
              background:
                "linear-gradient(135deg, var(--green-tint-15), var(--emerald-tint-10))",
              border: "1px solid var(--green-tint-15)",
              boxShadow: "var(--shadow-card)",
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
                style={{ background: "var(--bg)" }}
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
          </motion.div>

          {/* Tier 2 — Circle (primary action) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col p-8"
            style={{
              borderRadius: "var(--radius-xl, 24px)",
              background: "var(--bg)",
              border: "1px solid var(--green-tint-15)",
              boxShadow: "var(--shadow-card)",
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
                <ArrowRight className="h-4 w-4" />
              </BrandButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
