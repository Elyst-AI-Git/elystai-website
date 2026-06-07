"use client";

import { motion } from "framer-motion";
import { CanvasText } from "@/components/ui/canvas-text";
import { ShaderAnimation } from "@/components/ui/shader-lines";

/**
 * "AI way" canvas-text accent — fill is the brand emerald (#03624C); the
 * scribble lines use the Elyst AI Circle program's signature teal-green
 * (#428979, the `surface` tone for the Circle card on the home Accelerator
 * teaser) so the accent threads back into the wider Elyst palette.
 */
const AI_WAY_COLORS = [
  "rgba(66, 137, 121, 1)",
  "rgba(66, 137, 121, 0.7)",
  "rgba(66, 137, 121, 0.4)",
];

export default function AiosHero() {
  return (
    <section className="relative overflow-hidden bg-surface-dark" style={{ minHeight: "min(680px, 86vh)" }}>
      {/* Animated shader-lines backdrop, recoloured to the brand palette */}
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(14,33,26,0) 0%, rgba(14,33,26,0.55) 100%)",
        }}
      />

      <div
        className="relative mx-auto flex max-w-6xl items-center justify-center px-[var(--section-px)] text-center"
        style={{ minHeight: "min(680px, 86vh)" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl text-fg-on-dark"
          style={{ fontSize: "var(--text-h1)", lineHeight: 1.12 }}
        >
          It&rsquo;s time to work
          <br />
          the{" "}
          <CanvasText
            text="AI way"
            backgroundClassName="bg-emerald"
            colors={AI_WAY_COLORS}
            lineGap={4}
            animationDuration={16}
            curveIntensity={6}
          />
        </motion.h1>
      </div>
    </section>
  );
}
