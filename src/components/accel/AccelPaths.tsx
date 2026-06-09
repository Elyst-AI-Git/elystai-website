"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { IconProgram, IconCircle, IconTile } from "@/components/ui/icons";
import { SectionMark } from "./SectionMark";

/**
 * Accelerator paths — the core section. One anchor offering (the Flagship,
 * presented as a restrained teaser with NO CTA) plus the community (Circle),
 * which carries the page's primary action since there's no waitlist.
 *
 * Card layout: big title top-left, icon top-right, body text bottom.
 */

export default function AccelPaths() {
  return (
    <section
      id="paths"
      className="relative scroll-mt-28 overflow-hidden"
      style={{
        padding: "var(--section-py) var(--section-px)",
        background:
          "linear-gradient(165deg, color-mix(in srgb, var(--surface-dark) 78%, var(--elyst-emerald) 22%), var(--surface-dark) 55%, color-mix(in srgb, var(--surface-dark) 88%, black 12%))",
      }}
    >
      {/* Heavy film grain */}
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
          <SectionMark tone="dark">Programs</SectionMark>
          <h2 className="mt-6" style={{ fontSize: "var(--text-h2)", color: "var(--fg-on-dark)" }}>
            The perfect place to be AI native.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Card 1 — AI Programs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full"
          >
            <Card
              variant="gradient"
              className="group relative flex h-full flex-col justify-between overflow-hidden p-8 sm:p-10"
              style={{
                borderRadius: "var(--radius-xl, 24px)",
                background: "var(--card)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 24px 60px -20px rgba(2, 20, 14, 0.55)",
                minHeight: "260px",
              }}
            >
              {/* Dotted hover overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,98,76,0.12)_1px,transparent_1px)] bg-[length:5px_5px]" />
              </div>

              {/* Top row: big title left, icon right */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <h3
                  className="font-display font-bold leading-tight text-fg"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.1 }}
                >
                  AI Programs
                </h3>
                <IconTile tone="darkgreen" className="mt-1 shrink-0">
                  <IconProgram size={22} variant="duotone" />
                </IconTile>
              </div>

              {/* Body bottom */}
              <p
                className="relative z-10 mt-6 text-fg-2"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
              >
                A program for professionals to make AI your working assistant.
              </p>
            </Card>
          </motion.div>

          {/* Card 2 — The Circle */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="h-full"
          >
            <Card
              variant="gradient"
              className="group relative flex h-full flex-col justify-between overflow-hidden p-8"
              style={{
                borderRadius: "var(--radius-xl, 24px)",
                background: "var(--card)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 24px 60px -20px rgba(2, 20, 14, 0.55)",
                minHeight: "260px",
              }}
            >
              {/* Dotted hover overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,98,76,0.12)_1px,transparent_1px)] bg-[length:5px_5px]" />
              </div>

              {/* Top row: big title left, icon right */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <h3
                  className="font-display font-bold leading-tight text-fg"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.1 }}
                >
                  The Circle.
                </h3>
                <IconTile tone="darkgreen" className="mt-1 shrink-0">
                  <IconCircle size={22} variant="duotone" />
                </IconTile>
              </div>

              {/* Body bottom */}
              <p
                className="relative z-10 mt-6 text-fg-2"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
              >
                A space that keeps you sharp on everything you must know around AI.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
