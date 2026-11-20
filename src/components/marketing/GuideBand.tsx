import { BrandButton } from "@/components/ui/brand-button";
import GuideCover from "@/components/marketing/GuideCover";

/** Most visitors are not ready to talk. The guide keeps them in touch. */
export default function GuideBand() {
  return (
    <section className="relative overflow-hidden bg-surface-accent-soft" aria-labelledby="guide-band-heading">
      <div className="mx-auto grid max-w-7xl gap-10 px-[var(--section-px)] py-12 sm:py-14 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-14">
        <div className="mx-auto w-40 sm:w-44 lg:mx-0 lg:ml-10 lg:mr-6">
          <GuideCover />
        </div>
        <div className="text-center lg:text-left">
          <h2 id="guide-band-heading" className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.12 }}>
            Not ready to talk yet?
          </h2>
          <p className="mt-3 max-w-2xl text-fg-2 lg:max-w-xl" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
            Read how AI Transformation works, in 10 pages.
          </p>
        </div>
        <div className="justify-self-center lg:justify-self-end">
          <BrandButton href="/downloads/elyst-ai-transformation-guide.pdf" download="elyst-ai-transformation-guide.pdf" variant="metal" tone="emerald" className="min-h-12! px-6! text-[length:var(--text-small)]">
            Get the guide
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
