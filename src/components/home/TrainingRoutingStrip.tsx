import { BrandButton } from "@/components/ui/brand-button";

export default function TrainingRoutingStrip() {
  return (
    <section
      className="bg-surface-accent-soft"
      aria-labelledby="training-routing-heading"
      style={{ padding: "0" }}
    >
      <div className="mx-auto grid max-w-7xl gap-7 px-[var(--section-px)] py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10 sm:py-12">
        <div>
          <h2
            id="training-routing-heading"
            className="font-display font-semibold text-fg"
            style={{ fontSize: "var(--text-card)", lineHeight: 1.15 }}
          >
            Need to train the team on AI first?
          </h2>
          <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.4 }}>
            We run practical AI sessions for teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:justify-end">
          <span className="relative inline-flex rotate-[-1deg] items-center gap-3 border-2 border-emerald bg-surface-light px-4 py-3 text-emerald shadow-card before:absolute before:-left-1 before:-top-1 before:size-2 before:rounded-full before:bg-emerald after:absolute after:-bottom-1 after:-right-1 after:size-2 after:rounded-full after:bg-emerald">
            <span className="font-display font-semibold leading-none" style={{ fontSize: "var(--text-card)", letterSpacing: "var(--tracking-stat)" }}>
              3,000+
            </span>
            <span className="max-w-[8ch] text-left font-display text-label font-bold uppercase leading-[1.05] tracking-[var(--tracking-label)]">
              people trained<br />so far.
            </span>
          </span>
          <BrandButton
            href="/training"
            variant="metal"
            tone="emerald"
            className="min-h-12! px-6! text-[length:var(--text-small)]"
          >
            Explore training
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
