"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

const ENROLL_URL = "https://forms.gle/PWZteGnuDJYDm84Y7";

export default function AiJuniorCta() {
  return (
    <section className="relative overflow-hidden bg-emerald" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(4,133,95,0.55)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/5 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(0,100,123,0.35)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
      >
        <h2 className="font-display font-bold leading-tight text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
          The <span style={{ color: "var(--elyst-green)" }}>best investment</span> this summer
        </h2>
        <p className="text-fg-muted-dark" style={{ fontSize: "var(--text-body)" }}>
          5 Days · 90 Mins/Day · Live + 1 Month Recorded Access
        </p>

        <p className="font-display font-bold" style={{ fontSize: "clamp(2.75rem, 7vw, 4rem)", color: "var(--elyst-green)", lineHeight: 1 }}>
          ₹999
        </p>

        <BrandButton href={ENROLL_URL} tone="green" className="rounded-full!">
          Register Now →
        </BrandButton>

        <span
          className="mt-2 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-bold uppercase tracking-wider text-green"
          style={{ background: "rgba(0,223,130,0.12)", border: "1px solid rgba(0,223,130,0.28)", fontSize: "0.7rem" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "var(--elyst-green)" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--elyst-green)" }} />
          </span>
          Batch Filling Fast · Only Limited Seats Per Batch
        </span>
      </motion.div>
    </section>
  );
}
