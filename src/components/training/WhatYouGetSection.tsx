import { SectionMark } from "@/components/ui/section-mark";

const outcomes = [
  {
    eyebrow: "Clarity",
    title: "A realistic view of what AI can and cannot do.",
    body: "The team leaves with useful expectations, not a collection of impressive demos.",
  },
  {
    eyebrow: "Habits",
    title: "Better habits with the tools you already pay for.",
    body: "Small changes fit into the work people already recognise and repeat.",
  },
  {
    eyebrow: "Practice",
    title: "Role-specific workflows practised in the room.",
    body: "Exercises are shaped around the tasks that matter to each group.",
  },
  {
    eyebrow: "Next step",
    title: "A clear next step after the session.",
    body: "The room knows what to try next, and what needs a deeper look first.",
  },
] as const;

export default function WhatYouGetSection() {
  return (
    <section className="bg-surface-card" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionMark>What you get</SectionMark>
          <h2 className="mt-6 max-w-xl text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
            What your team walks out with.
          </h2>
        </div>

        <ol className="grid gap-4">
          {outcomes.map((outcome, index) => (
            <li key={outcome.eyebrow} style={{ "--services-fit-rotation": `${[-1.8, 2.2, -2.4, 1.8][index]}deg` } as React.CSSProperties} className="services-fit-strip grid grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-5 rounded-md border-2 border-emerald/20 bg-surface-accent-soft p-6 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-7 sm:p-8">
              <span className="flex size-[3.25rem] items-center justify-center rounded-full bg-emerald font-display text-small font-bold text-fg-on-dark sm:size-16">
                0{index + 1}
              </span>
              <div>
                <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  {outcome.eyebrow}
                </p>
                <h3 className="mt-2 font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.1 }}>
                  {outcome.title}
                </h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
