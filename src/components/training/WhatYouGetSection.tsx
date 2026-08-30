import { SectionMark } from "@/components/ui/section-mark";

const outcomes = [
  {
    eyebrow: "CLARITY",
    title: "A realistic view of what AI can and cannot do.",
    body: "The team leaves with useful expectations, not a collection of impressive demos.",
  },
  {
    eyebrow: "HABITS",
    title: "Better habits with the tools you already pay for.",
    body: "Small changes fit into the work people already recognise and repeat.",
  },
  {
    eyebrow: "PRACTICE",
    title: "Role-specific workflows practised in the room.",
    body: "Exercises are shaped around the tasks that matter to each group.",
  },
  {
    eyebrow: "NEXT STEP",
    title: "A clear next step after the session.",
    body: "The room knows what to try next, and what needs a deeper look first.",
  },
] as const;

function SessionEye() {
  return (
    <div className="flex min-h-72 items-center justify-center px-6 py-10 lg:min-h-[33rem]" role="img" aria-label="A focused signal moving through a training session">
      <svg viewBox="0 0 320 260" className="h-auto w-full max-w-[22rem] text-fg-muted-dark" fill="none" aria-hidden>
        <g opacity="0.55" stroke="currentColor" strokeWidth="1">
          <ellipse cx="160" cy="130" rx="132" ry="82" />
          <ellipse cx="160" cy="130" rx="104" ry="64" />
          <ellipse cx="160" cy="130" rx="76" ry="46" />
          <ellipse cx="160" cy="130" rx="48" ry="29" />
          <path d="M28 130h264M160 48v164" />
        </g>
        <path d="M36 130c34-37 72-56 124-56s90 19 124 56c-34 37-72 56-124 56S70 167 36 130Z" stroke="var(--elyst-green)" strokeWidth="2" opacity="0.8" />
        <circle cx="160" cy="130" r="24" fill="var(--elyst-green)" opacity="0.95" />
        <circle cx="160" cy="130" r="8" fill="var(--surface-dark)" />
        <path d="M160 26v18M160 216v18M56 130H38M282 130h-18" stroke="var(--elyst-green)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function WhatYouGetSection() {
  return (
    <section className="relative overflow-hidden bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <SectionMark tone="dark">What you get</SectionMark>
          <h2 className="mt-6 max-w-4xl text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
            What your team walks out with.
          </h2>
        </header>

        <div className="mt-12 grid border-y border-white/10 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:mt-16">
          <SessionEye />
          <ol className="grid border-t border-white/10 sm:grid-cols-2 lg:border-l lg:border-t-0">
            {outcomes.map((outcome, index) => (
              <li
                key={outcome.eyebrow}
                className={`flex min-h-64 flex-col justify-center border-b border-white/10 p-7 sm:p-9 lg:min-h-72 ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } ${index > 1 ? "sm:border-b-0" : ""}`}
              >
                <span className="font-display font-bold text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  {outcome.eyebrow}
                </span>
                <h3 className="mt-5 max-w-[22ch] font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
                  {outcome.title}
                </h3>
                <p className="mt-5 max-w-[34ch] text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                  {outcome.body}
                </p>
                <span aria-hidden className="mt-7 font-display text-fg-muted-dark/40" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-stat)" }}>
                  0{index + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
