import WorkCard from "@/components/work/WorkCard";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";
import { NUMBERS } from "@/lib/site-content";
import { WORK_CASES } from "@/lib/work-content";

/** Shared by AI Transformation and AI Kickstart: the numbers, then the case cards. */
export default function ProofBlock({ headingId = "proof-heading" }: { headingId?: string }) {
  return (
    <section className="bg-surface-accent-soft" aria-labelledby={headingId} style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark>Proof</SectionMark>
          <h2 id={headingId} className="mt-6 text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}>
            Real teams. Real sessions.
          </h2>
        </header>

        <dl className="mx-auto mt-12 grid max-w-5xl overflow-hidden rounded-md border border-emerald/20 bg-surface-light shadow-card sm:grid-cols-3 sm:divide-x sm:divide-emerald/15">
          {NUMBERS.map((item) => (
            <div key={item.label} className="border-b border-emerald/15 px-6 py-5 text-center last:border-b-0 sm:border-b-0 sm:py-7">
              <dd className="font-display font-semibold text-emerald" style={{ fontSize: "clamp(2.6rem, 4.6vw, 3.8rem)", lineHeight: 1, letterSpacing: "var(--tracking-stat)" }}>
                {item.value}
              </dd>
              <dt className="mt-2 font-display font-bold uppercase text-fg-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                {item.label}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mt-24 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {WORK_CASES.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <BrandButton href="/work" variant="metal" tone="emerald" className="shrink-0">
            See our works
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
