import { SectionMark } from "@/components/ui/section-mark";
import ProofStageMarker from "@/components/marketing/ProofStageMarker";

function ResultsDiagram() {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,0.7fr)] sm:items-end">
      <div aria-hidden className="flex h-36 items-end gap-1 border-b border-emerald/30 pb-0">
        {[20, 24, 26, 30, 34, 39, 44, 50, 58, 67, 78, 92, 100].map((height, index) => (
          <span
            key={height}
            className="w-full max-w-3 bg-emerald"
            style={{ height: `${height}%`, opacity: 0.35 + index / 26 }}
          />
        ))}
      </div>
      <div className="grid gap-5 font-display text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.35 }}>
        <p>
          <span className="mb-2 block h-px w-10 bg-emerald" />
          Context captured at intake.
        </p>
        <p>
          <span className="mb-2 block h-px w-10 bg-emerald/60" />
          The next action is visible.
        </p>
        <p>
          <span className="mb-2 block h-px w-10 bg-emerald/35" />
          Follow-up has a defined path.
        </p>
      </div>
    </div>
  );
}

export default function ServicesProofSection() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden bg-surface-accent-soft"
      aria-labelledby="services-proof-heading"
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
        <div className="relative">
          <div className="relative grid gap-16 lg:grid-cols-4 lg:grid-rows-[minmax(17rem,0.75fr)_minmax(18rem,0.85fr)_minmax(23rem,1fr)_minmax(17rem,0.7fr)] lg:gap-0">
            <header className="lg:col-span-2 lg:row-start-1 flex flex-col justify-center p-2 sm:p-6 lg:p-8">
              <SectionMark>Proof</SectionMark>
              <h2
                id="services-proof-heading"
                className="mt-6 max-w-3xl text-fg"
                style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", lineHeight: 0.95 }}
              >
                Case Study
              </h2>
            </header>

            <article className="flex flex-col justify-end lg:col-span-2 lg:col-start-3 lg:row-start-1 p-2 sm:p-6 lg:p-8">
              <ProofStageMarker activeIndex={0} label="The Challenge" />
              <p
                className="mt-5 max-w-2xl font-display text-fg"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.55rem)", lineHeight: 1.2 }}
              >
                An EdTech team receives leads from ads, forms, WhatsApp, and referrals. Counsellors sort them by hand, response depends on who sees the enquiry first, and follow-up disappears into personal inboxes.
              </p>
            </article>

            <article className="flex flex-col justify-start lg:col-span-2 lg:col-start-1 lg:row-start-2 p-2 sm:p-6 lg:p-8 lg:pt-0">
              <ProofStageMarker activeIndex={1} label="Our Solution" />
              <h3
                className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 4.25rem)", lineHeight: 1.02 }}
              >
                We built one lead queue from enquiry to qualified conversation.
              </h3>
              <p className="mt-7 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                Course interest, timing, location, and intent are captured before a counsellor calls. The team sees the next action, while a human remains in the loop before any response leaves.
              </p>
            </article>

            <article className="flex flex-col justify-start lg:col-span-2 lg:col-start-3 lg:row-start-3 p-2 sm:p-6 lg:p-8 lg:pt-10">
              <ProofStageMarker activeIndex={2} label="The Results" />
              <ResultsDiagram />
            </article>

            <article className="flex flex-col justify-center lg:col-span-2 lg:col-start-1 lg:row-start-4 p-2 sm:p-6 lg:p-8 lg:pt-10">
              <ProofStageMarker activeIndex={3} label="Client Feedback" />
              <blockquote
                className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
                style={{ fontSize: "clamp(1.55rem, 2.6vw, 2.7rem)", lineHeight: 1.08 }}
              >
                “The team can finally see the next action without chasing a lead across personal inboxes.”
                <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
                  EdTech operations lead · sample testimonial
                </cite>
              </blockquote>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
