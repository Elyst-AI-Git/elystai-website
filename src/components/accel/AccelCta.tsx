"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * Accelerator final CTA — mirrors the AIOS page's closing band (interactive
 * Boxes grid behind a single, centred action) so both arms resolve their
 * hero's promise the same way. Where AIOS sits on a bright-white surface,
 * this one carries the warm pole's signature: a light-green contrast wash,
 * with deep-emerald grid lines/fills so the interactive grid still pops
 * against it. The community (Circle) is the only live action; the Flagship
 * is named as coming, with no button. Global footer follows immediately.
 */

export default function AccelCta() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, var(--green-tint-15), var(--bg))",
      }}
    >
      {/* Interactive boxes grid — same effect as the AIOS close, retuned for
          a light-green surface: deep-emerald grid lines + bright-green hover fills. */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        style={{
          maskImage: "radial-gradient(ellipse at center, white, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, white, transparent 80%)",
        }}
      >
        <div className="relative h-[44rem] w-[72rem] shrink-0">
          <Boxes
            lineColor="rgba(3,98,76,0.16)"
            plusColor="rgba(3,98,76,0.22)"
            colors={["#00DF82", "#2EC866", "#04855F", "#03624C", "#7CEFC0"]}
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--green-tint-15) 86%)",
        }}
      />

      <div
        className="pointer-events-none relative z-10 mx-auto max-w-5xl"
        style={{
          paddingTop: "var(--section-py)",
          paddingBottom: "calc(var(--section-py) * 0.64)",
          paddingLeft: "var(--section-px)",
          paddingRight: "var(--section-px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none mx-auto flex max-w-xl flex-col items-center gap-5 text-center"
        >
          <h2
            style={{ fontSize: "var(--text-h2)", color: "var(--fg)", lineHeight: 1.15 }}
          >
            Stay ahead of AI. Start with us.
          </h2>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--fg-2)",
              maxWidth: "32ch",
            }}
          >
            Join the community today — it&rsquo;s where the learning lives now,
            and where members hear first when the Flagship opens.
          </p>

          <div className="pointer-events-auto mt-2">
            <BrandButton href="/circle" tone="green">
              Join the community
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
          </div>

          <p className="mt-1 text-small text-fg-3">
            Flagship program launching late June 2026.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
