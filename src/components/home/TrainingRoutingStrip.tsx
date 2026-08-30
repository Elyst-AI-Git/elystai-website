import { BrandButton } from "@/components/ui/brand-button";

export default function TrainingRoutingStrip() {
  return (
    <section
      className="bg-surface-accent-soft"
      aria-labelledby="training-routing-heading"
      style={{ padding: "0" }}
    >
      <div className="mx-auto grid max-w-7xl gap-7 border-x border-emerald/15 px-[var(--section-px)] py-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10 sm:py-10">
        <div>
          <h2
            id="training-routing-heading"
            className="font-display font-semibold text-fg"
            style={{ fontSize: "var(--text-h3)", lineHeight: 1.15 }}
          >
            Need to train the team on AI first?
          </h2>
          <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.4 }}>
            We run practical AI sessions for teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:justify-end">
          <span className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-body)" }}>
            3,000+ people trained so far.
          </span>
          <BrandButton
            href="/training"
            variant="solid"
            tone="emerald"
            className="min-h-12! px-6! text-[length:var(--text-small)]"
          >
            Explore training →
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
