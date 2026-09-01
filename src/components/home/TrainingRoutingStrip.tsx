import type { ReactNode } from "react";
import { BrandButton } from "@/components/ui/brand-button";

type TrainingRoutingStripProps = {
  heading?: ReactNode;
  body?: ReactNode;
  stickerValue?: string;
  stickerLabel?: ReactNode;
  href?: string;
  linkLabel?: string;
  headingId?: string;
};

export default function TrainingRoutingStrip({
  heading = "Need to train the team on AI first?",
  body = "We run practical AI sessions for teams.",
  stickerValue = "3,000+",
  stickerLabel = (
    <>
      people trained
      <br />
      so far.
    </>
  ),
  href = "/training",
  linkLabel = "Explore training",
  headingId = "training-routing-heading",
}: TrainingRoutingStripProps = {}) {
  return (
    <section
      className="bg-surface-accent-soft"
      aria-labelledby={headingId}
      style={{ padding: "0" }}
    >
      <div className="mx-auto grid max-w-7xl gap-7 px-[var(--section-px)] py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10 sm:py-12">
        <div className="text-center sm:text-left">
          <h2
            id={headingId}
            className="font-display font-semibold text-fg"
            style={{ fontSize: "var(--text-card)", lineHeight: 1.15 }}
          >
            {heading}
          </h2>
          <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.4 }}>
            {body}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-end">
          <span className="relative inline-flex rotate-[-1deg] items-center gap-3 border-2 border-emerald bg-surface-light px-4 py-3 text-emerald shadow-card before:absolute before:-left-1 before:-top-1 before:size-2 before:rounded-full before:bg-emerald after:absolute after:-bottom-1 after:-right-1 after:size-2 after:rounded-full after:bg-emerald">
            <span className="font-display font-semibold leading-none" style={{ fontSize: "var(--text-card)", letterSpacing: "var(--tracking-stat)" }}>
              {stickerValue}
            </span>
            <span className="max-w-[8ch] text-left font-display text-label font-bold uppercase leading-[1.05] tracking-[var(--tracking-label)]">
              {stickerLabel}
            </span>
          </span>
          <BrandButton
            href={href}
            variant="metal"
            tone="emerald"
            className="min-h-12! px-6! text-[length:var(--text-small)]"
          >
            {linkLabel}
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
