import { BrandButton } from "@/components/ui/brand-button";
import ProofStageMarker from "@/components/marketing/ProofStageMarker";
import { SectionMark } from "@/components/ui/section-mark";

export default function HomeProofSection() {
  return (
    <section
      id="proof-in-practice"
      className="relative overflow-hidden bg-surface-accent-soft"
      aria-labelledby="proof-in-practice-heading"
      style={{ padding: "clamp(48px, 6vw, 72px) var(--section-px) var(--section-py)" }}
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
        <div className="relative grid gap-12 lg:grid-cols-4 lg:grid-rows-[minmax(16rem,0.65fr)_minmax(19rem,0.8fr)_minmax(16rem,0.6fr)] lg:gap-0">
          <header className="flex flex-col justify-start p-2 sm:p-6 lg:col-span-2 lg:row-start-1 lg:p-8">
            <SectionMark>Proof</SectionMark>
            <h2
              id="proof-in-practice-heading"
              className="mt-6 max-w-3xl text-balance text-fg"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}
            >
              One lead process, made visible.
            </h2>
          </header>

          <article className="flex flex-col justify-start p-2 sm:p-6 lg:col-span-2 lg:col-start-3 lg:row-start-2 lg:p-8 lg:pt-10">
            <ProofStageMarker activeIndex={0} total={2} label="Our solution" />
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

          <article className="flex flex-col justify-start p-2 sm:p-6 lg:col-span-2 lg:col-start-1 lg:row-start-3 lg:p-8 lg:pt-10">
            <ProofStageMarker activeIndex={1} total={2} label="Client feedback" />
            <blockquote
              className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}
            >
              “The team can now see what needs attention and what was already handled, without chasing it across four places.”
              <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
                Operations lead, EdTech team · sample testimonial
              </cite>
            </blockquote>
            <div className="mt-7 flex justify-center">
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
