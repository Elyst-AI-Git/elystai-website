"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * Accelerator final CTA — the warm conversion close. A within-emerald band
 * (NOT dark — the whole Accelerator page is light). The community (Circle) is
 * the only live action, so it's the sole CTA; the Flagship is named as coming,
 * with no button. Global footer follows.
 */

export default function AccelCta() {
  return (
    <section style={{ padding: "var(--section-py) var(--section-px)" }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl overflow-hidden text-center"
        style={{
          borderRadius: "var(--radius-xl, 24px)",
          padding: "clamp(48px, 7vw, 96px) clamp(24px, 5vw, 72px)",
          background:
            "radial-gradient(ellipse 70% 90% at 50% 0%, var(--elyst-emerald-light, #04855F), transparent 70%), linear-gradient(135deg, var(--elyst-emerald), #024A39)",
        }}
      >
        <h2
          className="mx-auto max-w-2xl"
          style={{ fontSize: "var(--text-h1)", color: "var(--fg-on-dark)", lineHeight: 1.15 }}
        >
          Stay ahead of AI. Start with us.
        </h2>
        <p
          className="mx-auto mt-5 max-w-xl"
          style={{ fontSize: "var(--text-body)", color: "color-mix(in srgb, var(--fg-on-dark) 82%, transparent)" }}
        >
          Join the community today — it&rsquo;s where the learning lives now, and
          where members hear first when the Flagship opens.
        </p>

        <div className="mt-9 flex justify-center">
          <BrandButton href="/circle" tone="green">
            Join the community
            <ArrowRight className="h-4 w-4" />
          </BrandButton>
        </div>

        <p
          className="mt-7 text-small"
          style={{ color: "color-mix(in srgb, var(--fg-on-dark) 68%, transparent)" }}
        >
          Flagship program launching late June 2026.
        </p>
      </motion.div>
    </section>
  );
}
