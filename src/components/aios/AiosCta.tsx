"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * Direction B — solid emerald band, the page's brightest, most saturated
 * moment (the opposite pole to the dark aios-problem section: the page
 * travels from dark chaos to bright resolution). One headline, one
 * reassurance line, one action — resolves the hero's single "Book a call"
 * CTA as a clean bookend. The global footer follows immediately.
 *
 * The interactive Boxes grid (same effect as the home Proof section) sits
 * behind the copy; the content layer is pointer-transparent so hovering the
 * card lights up the grid, while the button itself re-enables pointer events.
 *
 * OPEN DECISION (NOTES.md): the scheduler tool (Cal.com recommended) isn't
 * locked yet, so this ships as a single button → /contact. The marked slot
 * below is exactly where an inline embed drops in once the tool is chosen.
 */

export default function AiosCta() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Interactive boxes grid — same effect as the home Proof section, tuned
          for a white surface: dark-green grid lines + dark-green hover fills. */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        style={{
          maskImage: "radial-gradient(ellipse at center, white, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, white, transparent 80%)",
        }}
      >
        <div className="relative h-[44rem] w-[72rem] shrink-0">
          <Boxes
            lineColor="rgba(3,98,76,0.14)"
            plusColor="rgba(3,98,76,0.18)"
            colors={["#03624C", "#024A39", "#04855F", "#02402F", "#013A2C"]}
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, var(--bg) 86%)" }}
      />

      <div
        className="relative z-10 mx-auto max-w-5xl"
        style={{ padding: "var(--section-py) var(--section-px)" }}
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
            See AIOS running in your business.
          </h2>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--fg-2)",
              maxWidth: "32ch",
            }}
          >
            A short call. We&rsquo;ll show you exactly how it&rsquo;d work for
            your team — no obligation.
          </p>

          <div className="pointer-events-auto mt-2">
            <BrandButton href="/contact" tone="green">
              Book a call
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
          </div>

          {/*
            [Scheduler embed slot — drop the chosen tool's inline widget
            here once locked (Cal.com recommended). Replaces the button
            above; keep the headline + reassurance copy as-is.]
          */}
        </motion.div>
      </div>
    </section>
  );
}
