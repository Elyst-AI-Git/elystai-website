"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionMark } from "@/components/ui/section-mark";
import { Briefcase, Rocket } from "lucide-react";
import { useIsTouch } from "@/lib/use-touch";

/**
 * "Who it's for" — three audience cards so each visitor can see themselves in
 * the program. As the section scrolls in, a connector "branches" out of the
 * heading: a trunk drops, splits across the row, and runs down into each card,
 * which then grows into place — so the cards read as branches off the heading.
 */

const audiences = [
  {
    icon: Briefcase,
    title: "Get Ahead at Work",
    body: "For professionals aiming for an edge in their career.",
  },
  {
    icon: Rocket,
    title: "Grow Your Business",
    body: "For founders using AI to save time and money.",
  },
];

// One smooth curved branch per card, fanning from a single node below the
// heading. The x positions match the two card centres (1/4, 3/4).
const BRANCH_X = [25, 75];
const CARDS_DELAY = 1.0;

export default function WhoItsFor() {
  const isTouch = useIsTouch();
  // The branch is a desktop flourish (the cards sit in one row). On touch the
  // cards stack, so we skip the SVG and just fade the cards in.

  return (
    <section style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Who it&rsquo;s for</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Built for people who do the work.
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            A practical, high-value choice if you&rsquo;d rather use AI than read
            about it.
          </p>
        </div>

        {/* Branch connector — smooth curves fanning from a node below the
            heading down into each card, drawing in as the section scrolls in. */}
        {!isTouch && (
          <div className="relative mx-auto mt-6 hidden h-20 max-w-5xl md:block" aria-hidden>
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              stroke="var(--elyst-emerald)"
              strokeWidth={1.6}
              strokeLinecap="round"
            >
              {BRANCH_X.map((x, i) => (
                <motion.path
                  key={x}
                  // One smooth, continuous branch per card. Control points share
                  // y=50 so the curve descends monotonically (no wiggle/kink):
                  // it leaves the node vertically and settles vertically into
                  // the card — the classic smooth node-tree connector.
                  d={`M50,0 C50,50 ${x},50 ${x},100`}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: "easeInOut" }}
                  style={{ opacity: 0.85 }}
                />
              ))}
            </svg>
            {/* Origin node where the branches meet the heading */}
            <motion.span
              className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "var(--elyst-emerald)" }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        )}

        <div className={`grid gap-6 md:grid-cols-2 ${isTouch ? "mt-14" : "mt-0"}`}>
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 22, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: isTouch ? i * 0.08 : CARDS_DELAY + i * 0.12,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "top center" }}
            >
              <Card className="h-full rounded-[20px] bg-white p-8 shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/8 text-emerald">
                  <a.icon className="h-6 w-6" />
                </span>
                <h3
                  className="mt-5 font-display font-bold text-fg"
                  style={{ fontSize: "var(--text-h3)" }}
                >
                  {a.title}
                </h3>
                <p
                  className="mt-2 text-fg-2"
                  style={{ fontSize: "var(--text-small)", lineHeight: 1.6 }}
                >
                  {a.body}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
