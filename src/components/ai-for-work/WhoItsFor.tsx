"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionMark } from "@/components/ui/section-mark";
import { Briefcase, Rocket, GraduationCap } from "lucide-react";
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
    title: "Practitioners",
    body: "Professionals who want AI woven into their everyday work — faster output, less busywork.",
  },
  {
    icon: Rocket,
    title: "Founders",
    body: "Business owners bringing AI into their teams and operations to do more with less.",
  },
  {
    icon: GraduationCap,
    title: "Educators & coaches",
    body: "People who want to use AI in their teaching, training and the way they guide others.",
  },
];

// Branch timing: trunk → cross-bar → the three drops, each picking up where the
// previous left off, so it reads as one continuous drawing motion.
const TRUNK = { duration: 0.4, ease: "easeOut" as const };
const CROSS = { duration: 0.5, delay: 0.4, ease: "easeInOut" as const };
const DROP = { duration: 0.4, delay: 0.9, ease: "easeOut" as const };
const CARDS_DELAY = 1.2;

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

        {/* Branch connector — draws from the heading down into each card. */}
        {!isTouch && (
          <div className="relative mt-6 hidden h-16 md:block" aria-hidden>
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              stroke="var(--elyst-emerald)"
              strokeWidth={1.5}
            >
              {/* Trunk down from the heading */}
              <motion.path
                d="M50,0 V40"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={TRUNK}
              />
              {/* Cross-bar spanning the three card centres */}
              <motion.path
                d="M16.667,40 H83.333"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={CROSS}
              />
              {/* Three drops into the cards */}
              {[16.667, 50, 83.333].map((x) => (
                <motion.path
                  key={x}
                  d={`M${x},40 V100`}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={DROP}
                />
              ))}
            </svg>
          </div>
        )}

        <div className={`grid gap-6 md:grid-cols-3 ${isTouch ? "mt-14" : "mt-0"}`}>
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
