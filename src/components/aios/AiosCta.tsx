"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Direction B — solid emerald band, the page's brightest, most saturated
 * moment (the opposite pole to the dark aios-problem section: the page
 * travels from dark chaos to bright resolution). One headline, one
 * reassurance line, one action — resolves the hero's single "Book a call"
 * CTA as a clean bookend. The global footer follows immediately.
 *
 * OPEN DECISION (NOTES.md): the scheduler tool (Cal.com recommended) isn't
 * locked yet, so per the explicit fallback instruction, this ships as a
 * single .btn-onlight button → /contact. The marked slot below is exactly
 * where an inline embed drops in once the tool is chosen — swapping it in
 * later requires no layout change.
 */

export default function AiosCta() {
  return (
    <section style={{ background: "var(--elyst-emerald)" }}>
      <div
        className="mx-auto max-w-5xl"
        style={{ padding: "var(--section-py) var(--section-px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center"
        >
          <h2
            style={{ fontSize: "var(--text-h2)", color: "var(--fg-on-dark)", lineHeight: 1.15 }}
          >
            See AIOS running in your business.
          </h2>
          <p
            style={{
              fontSize: "var(--text-body)",
              color: "var(--fg-on-dark)",
              opacity: 0.8,
              maxWidth: "32ch",
            }}
          >
            A short call. We&rsquo;ll show you exactly how it&rsquo;d work for
            your team — no obligation.
          </p>

          <Link
            href="/contact"
            className="btn btn-onlight mt-2 inline-flex items-center gap-2"
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </Link>

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
