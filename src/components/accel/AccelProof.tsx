"use client";

import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { SectionMark } from "./SectionMark";

/**
 * Accelerator proof — the receipts, now as a pure testimonial area (the
 * count-up stat row was removed). Real voices from the past programs (AI
 * Yathra) and the community stand in for a Flagship that's still coming.
 *
 * Attributions are role/context-based (no invented named individuals or fake
 * faces) to keep the same honesty discipline as the rest of the site.
 */

export default function AccelProof() {
  return (
    <section
      style={{
        padding: "var(--section-py) 0",
        background: "var(--surface-muted)",
      }}
    >
      <div className="mx-auto mb-4 max-w-2xl px-[var(--section-px)] text-center">
        <SectionMark>Already delivered</SectionMark>
        <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
          Hear it from the people themselves.
        </h2>
        <p
          className="mx-auto mt-4 max-w-prose text-fg-2"
          style={{ fontSize: "var(--text-body)" }}
        >
          Not a forced 5 star review, it&rsquo;s what they actually felt.
        </p>
      </div>

      <StaggerTestimonials />
    </section>
  );
}
