import { SectionMark } from "@/components/ui/section-mark";
import { TRANSFORMATION_STEPS } from "@/lib/site-content";

/** One short line per step, kept to a single line at desktop width. */
const SHORT_LINES = [
  "We understand how the business runs today.",
  "Scope and likely cost before any work begins.",
  "You get a map of how work moves now.",
  "Where an AI system can do the manual work.",
  "You choose what to build, we build that.",
  "Your team excels with the AI system built.",
];

export default function StepsTimeline() {
  return (
    <section id="our-process" aria-labelledby="process-heading" className="scroll-mt-24 bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <SectionMark>The process</SectionMark>
          <h2 id="process-heading" className="mt-6 text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}>
            A 6 step process to results
          </h2>
        </header>

        <ol className="relative mt-14">
          {TRANSFORMATION_STEPS.map((step, index) => (
            <li key={step.n} className="relative grid grid-cols-[3.1rem_minmax(0,1fr)] gap-x-5 pb-10 last:pb-0 md:grid-cols-[4.1rem_minmax(0,1fr)] md:gap-x-8">
              {/* Connector: runs from this circle down to the next one, so the line never goes past the first or last circle. */}
              {index < TRANSFORMATION_STEPS.length - 1 ? (
                <span aria-hidden className="absolute bottom-0 left-[1.55rem] top-[3.1rem] w-px bg-emerald/25 md:left-[2.05rem] md:top-[4.1rem]" />
              ) : null}
              <span className="relative z-10 flex size-[3.1rem] items-center justify-center rounded-full border-2 border-emerald bg-bg font-display text-small font-bold text-emerald md:size-[4.1rem]">
                {step.n}
              </span>
              <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-8">
                <div>
                  <h3 className="flex min-h-[3.1rem] items-center font-display font-semibold text-fg md:min-h-[4.1rem]" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                    {SHORT_LINES[index]}
                  </p>
                </div>
                <div className="rounded-md border-2 border-emerald/25 bg-surface-accent-soft px-5 py-4 shadow-card">
                  <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                    What you get
                  </p>
                  <p className="mt-1.5 font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.3 }}>
                    {step.get}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
