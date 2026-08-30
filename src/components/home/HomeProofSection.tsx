import { BrandButton } from "@/components/ui/brand-button";
import ProofStageMarker from "@/components/marketing/ProofStageMarker";
import { SectionMark } from "@/components/ui/section-mark";

export default function HomeProofSection() {
  return (
    <section
      id="proof-in-practice"
      className="relative overflow-hidden bg-surface-accent-soft"
      aria-labelledby="proof-in-practice-heading"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] mx-auto hidden max-w-7xl grid-cols-4 lg:grid"
      >
        {[0, 1, 2, 3].map((line) => (
          <span key={line} className="border-l border-emerald/15 last:border-r" />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative grid gap-12 lg:grid-cols-4 lg:grid-rows-[minmax(21rem,1fr)_minmax(19rem,0.88fr)] lg:gap-0">
          <header className="flex flex-col justify-center p-2 sm:p-6 lg:col-span-2 lg:row-start-1 lg:p-8">
            <SectionMark>Proof</SectionMark>
            <h2
              id="proof-in-practice-heading"
              className="mt-6 max-w-3xl text-balance text-fg"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}
            >
              One lead process, made visible.
            </h2>
          </header>

          <article className="flex flex-col justify-center p-2 sm:p-6 lg:col-span-2 lg:col-start-3 lg:row-start-1 lg:p-8">
            <ProofStageMarker activeIndex={1} label="Our solution" />
            <p
              className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
              style={{ fontSize: "var(--text-card)", lineHeight: 1.05 }}
            >
              We built one lead queue from enquiry to qualified conversation.
            </p>
            <p className="mt-7 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              <span className="font-display font-semibold text-emerald">4</span> lead sources — ads, forms, WhatsApp, and referrals — are brought into one view. Every enquiry moves through <span className="font-display font-semibold text-emerald">1</span> shared queue, with <span className="font-display font-semibold text-emerald">1</span> human approval point before a response leaves.
            </p>
          </article>

          <div className="flex items-center p-2 sm:p-6 lg:col-start-2 lg:row-start-2 lg:p-8">
            <div>
              <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-small)" }}>
                EdTech lead qualification
              </p>
              <p className="mt-1 text-fg-2" style={{ fontSize: "var(--text-label)" }}>
                Sample case study · approval pending
              </p>
            </div>
          </div>

          <article className="flex flex-col justify-center p-2 sm:p-6 lg:col-span-2 lg:col-start-3 lg:row-start-2 lg:p-8">
            <ProofStageMarker activeIndex={3} label="Client feedback" />
            <blockquote
              className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}
            >
              “Approved client feedback will replace this sample once the implementation is ready to publish.”
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <p className="max-w-xl text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
                The full case study will carry the complete implementation story and approved evidence.
              </p>
              <BrandButton href="/services#proof" variant="metal" tone="emerald" className="shrink-0">
                See the full case study
              </BrandButton>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
