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
        <div className="relative grid gap-12 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto] lg:gap-0">
          <header className="flex flex-col justify-start p-2 sm:p-6 lg:col-span-2 lg:row-start-1 lg:p-8 lg:pb-0">
            <SectionMark>Proof</SectionMark>
            <h2
              id="proof-in-practice-heading"
              className="mt-6 max-w-3xl text-balance text-fg"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}
            >
              From a WhatsApp message to a qualified handover.
            </h2>
          </header>

          <article className="flex flex-col justify-start p-2 sm:p-6 lg:col-span-2 lg:col-start-3 lg:row-start-2 lg:p-8 lg:pt-0">
            <ProofStageMarker activeIndex={0} total={2} label="Our solution" />
            <p
              className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
              style={{ fontSize: "var(--text-card)", lineHeight: 1.05 }}
            >
              A multilingual AI sales agent that handles the whole lead qualification process by itself 24/7.
            </p>
            <p className="mt-7 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              The average first response fell from around <span className="font-display font-semibold text-emerald">three hours</span> to under <span className="font-display font-semibold text-emerald">30 seconds</span>. The company reported conversions increased by around <span className="font-display font-semibold text-emerald">40%</span> within the first <span className="font-display font-semibold text-emerald">60 days</span>.
            </p>
          </article>

          <article className="flex flex-col justify-start p-2 sm:p-6 lg:col-span-2 lg:col-start-1 lg:row-start-3 lg:p-8 lg:pt-10">
            <ProofStageMarker activeIndex={1} total={2} label="Client feedback" />
            <blockquote
              className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}
            >
              “The team can now see what needs attention and what was already handled, without chasing it across four places.”
              <span className="mt-5 block font-sans text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                This system changed how the team works, the AI handles so much of the process now and the team now focuses more on their core work.
              </span>
              <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
                Marketing Lead, EdTech team.
              </cite>
            </blockquote>
          </article>
        </div>

        <div className="mt-10 flex justify-center lg:mt-8">
          <BrandButton href="/services#proof" variant="metal" tone="emerald" className="shrink-0">
            See the full case study
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
