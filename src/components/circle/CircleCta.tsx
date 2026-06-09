"use client";

import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * Closing dark band, mirrors the reference's near-black panel with a
 * dot-grid + radial glow, resolved through `--surface-dark` and the brand
 * `--elyst-green-mid` accent rather than raw hex.
 */
export default function CircleCta() {
  return (
    <section className="bg-bg" style={{ padding: "0 var(--section-px) clamp(64px, 8vw, 100px)" }}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl overflow-hidden text-center"
        style={{
          background: "var(--surface-dark)",
          borderRadius: "28px",
          padding: "clamp(48px, 7vw, 80px) clamp(24px, 5vw, 72px)",
          boxShadow: "0 0 80px rgba(46,200,102,0.12)",
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 600, height: 300, background: "radial-gradient(ellipse, rgba(46,200,102,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ backgroundImage: "radial-gradient(circle, rgba(46,200,102,0.14) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        <div className="relative z-10">
          <h2
            className="font-display mx-auto max-w-[700px] font-bold text-fg-on-dark"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", lineHeight: 1.2 }}
          >
            Everyone in this circle is{" "}
            <span className="text-green-mid">moving.</span> The only question
            is whether you are <span className="text-green-mid">in it</span> or
            watching from outside.
          </h2>
          <div className="mt-9 flex justify-center">
            <BrandButton href="https://nas.io/elystaicircle" tone="green" className="rounded-full!">
              Apply Now →
            </BrandButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
