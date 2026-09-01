import { SectionMark } from "@/components/ui/section-mark";
import ProofStageMarker from "@/components/marketing/ProofStageMarker";

function ResponseTimeDiagram() {
  return (
    <div className="mt-8 ml-auto grid max-w-[18rem] gap-4 sm:ml-0 sm:max-w-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <div aria-hidden className="flex h-32 items-end gap-1 border-b border-emerald/30 pb-0">
        {[100, 92, 82, 73, 64, 56, 48, 40, 33, 27, 22, 18, 14].map((height, index) => (
          <span
            key={height}
            className="w-full max-w-3 bg-emerald"
            style={{ height: `${height}%`, opacity: 0.35 + index / 26 }}
          />
        ))}
      </div>
      <p className="font-display text-right text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.35 }}>
        <span className="block font-display font-semibold text-emerald" style={{ fontSize: "var(--text-lead)" }}>3 hours → 30 seconds</span>
        Average first response
      </p>
    </div>
  );
}

function ConversionDiagram() {
  return (
    <div className="mt-8 mr-auto grid max-w-[18rem] gap-4 sm:mr-0 sm:max-w-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <div aria-hidden className="flex h-32 items-end gap-1 border-b border-emerald/30 pb-0">
        {[25, 31, 29, 37, 42, 46, 53, 57, 63, 68, 74, 82, 88].map((height, index) => (
          <span key={height} className="w-full max-w-3 bg-emerald" style={{ height: `${height}%`, opacity: 0.35 + index / 26 }} />
        ))}
      </div>
      <p className="font-display text-left text-fg-2 sm:text-right" style={{ fontSize: "var(--text-small)", lineHeight: 1.35 }}>
        <span className="block font-display font-semibold text-emerald" style={{ fontSize: "var(--text-lead)" }}>+40%</span>
        Conversion within 60 days
      </p>
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
                An EdTech team receives leads from ads, forms, WhatsApp. Enquiries arrived in multiple languages and covered a wide range of questions. Counsellors sorted them by hand, response depended on who saw the enquiry first and follow-up was very difficult.
              </p>
            </article>

            <article className="flex flex-col justify-start lg:col-span-2 lg:col-start-1 lg:row-start-2 p-2 sm:p-6 lg:p-8 lg:pt-0">
              <ProofStageMarker activeIndex={1} label="Our Solution" />
              <h3
                className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 4.25rem)", lineHeight: 1.02 }}
              >
                We built an AI Sales agent that takes a lead queue from enquiry to a qualified conversation.
              </h3>
              <p className="mt-7 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                We built a custom AI agent for the inbound WhatsApp channel. It responds in multiple languages, answers the lead&apos;s actual question first, and gathers the information a sales person needs before taking over.
              </p>
            </article>

            <article className="flex flex-col justify-start lg:col-span-2 lg:col-start-3 lg:row-start-3 p-2 sm:p-6 lg:p-8 lg:pt-10">
              <ProofStageMarker activeIndex={2} label="The Results" />
              <ResponseTimeDiagram />
              <ConversionDiagram />
            </article>

            <article className="flex flex-col justify-center lg:col-span-2 lg:col-start-1 lg:row-start-4 p-2 sm:p-6 lg:p-8 lg:pt-10">
              <ProofStageMarker activeIndex={3} label="Client Feedback" />
              <blockquote
                className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
                style={{ fontSize: "clamp(1.55rem, 2.6vw, 2.7rem)", lineHeight: 1.08 }}
              >
                “This system changed how the team works, the AI handles so much of the process now and the team now focuses more on their core work.”
                <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
                  Marketing Lead, EdTech team.
                </cite>
              </blockquote>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
