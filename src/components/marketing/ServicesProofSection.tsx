import { SectionMark } from "@/components/ui/section-mark";

const proofStages = [
  {
    number: "01",
    label: "The challenge",
    title: "Lead qualification is spread across every channel.",
    body: "Leads arrive from ads, forms, WhatsApp, and referrals. Counsellors sort them by hand; response depends on who sees the enquiry first, and follow-up disappears into personal inboxes.",
  },
  {
    number: "02",
    label: "Our solution",
    title: "We mapped enquiry → qualify → follow up, then built one briefed lead queue.",
    body: "Course interest, timing, location, and intent are captured before a counsellor calls. The team sees the next action, while a human remains in the loop before any response leaves.",
  },
  {
    number: "03",
    label: "The results",
    title: "The workflow becomes visible before anyone has to chase it.",
    body: "Every enquiry arrives with the context the counsellor needs. Follow-up continues on a defined path, and the team can see which leads need a human next.",
  },
] as const;

function StageMarker({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4 font-display text-fg-muted-dark">
      <span aria-hidden className="flex items-center gap-1.5">
        {[0, 1, 2, 3].map((dot) => (
          <span key={dot} className={`size-1.5 rounded-full ${dot === 0 ? "bg-fg-on-dark" : "bg-fg-muted-dark/70"}`} />
        ))}
      </span>
      <span className="text-[0.8rem] font-semibold uppercase tracking-[var(--tracking-label)]">
        {number} · {label}
      </span>
    </div>
  );
}

function ResultsSignal() {
  return (
    <div aria-hidden className="mt-8 flex h-24 items-end gap-1.5 border-b border-white/10 pb-0 sm:max-w-md">
      {[22, 26, 28, 32, 36, 41, 48, 55, 63, 72, 82, 94].map((height, index) => (
        <span
          key={height}
          className="w-full max-w-3 bg-fg-on-dark/70"
          style={{ height: `${height}%`, opacity: 0.35 + index / 24 }}
        />
      ))}
    </div>
  );
}

export default function ServicesProofSection() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden bg-surface-dark"
      aria-labelledby="services-proof-heading"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark tone="dark">Proof · illustrative sample</SectionMark>
          <h2 id="services-proof-heading" className="mx-auto mt-6 max-w-4xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>
            An EdTech lead workflow, made visible.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
            A sample of the kind of challenge, build, and outcome we would document together. This is not client work.
          </p>
        </header>

        <div className="mt-14 border-y border-white/10">
          {proofStages.map((stage, index) => (
            <article key={stage.number} className="grid min-h-[22rem] border-b border-white/10 last:border-b-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
              <div className="flex flex-col justify-between gap-12 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
                <StageMarker number={stage.number} label={stage.label} />
                <p className="max-w-xs font-display text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                  EdTech lead qualification
                  <span className="block text-fg-muted-dark/60">Illustrative sample · not measured client work</span>
                </p>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
                <h3
                  className={`max-w-4xl font-display font-semibold tracking-[var(--tracking-display)] text-fg-on-dark ${index === 1 ? "text-[clamp(2rem,4vw,4.2rem)]" : "text-[clamp(1.7rem,3vw,3.25rem)]"}`}
                  style={{ lineHeight: 1.05 }}
                >
                  {stage.title}
                </h3>
                <p className="mt-7 max-w-3xl text-fg-muted-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
                  {stage.body}
                </p>
                {index === 2 ? <ResultsSignal /> : null}
              </div>
            </article>
          ))}

          <article className="grid min-h-[18rem] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <div className="flex flex-col justify-end gap-4 border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex size-14 items-center justify-center border border-white/20 font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-fg-on-dark">
                ED
              </div>
              <div>
                <p className="font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-body)" }}>
                  Client feedback
                </p>
                <p className="mt-1 text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
                  Feedback slot · approval pending
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <StageMarker number="04" label="Client feedback" />
              <blockquote className="mt-7 max-w-4xl font-display font-semibold tracking-[var(--tracking-display)] text-fg-on-dark" style={{ fontSize: "clamp(1.7rem, 3vw, 3.25rem)", lineHeight: 1.05 }}>
                Approved client feedback will replace this sample once the implementation is ready to publish.
              </blockquote>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
