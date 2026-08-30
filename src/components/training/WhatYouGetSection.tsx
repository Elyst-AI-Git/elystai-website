import Image from "next/image";
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

function SessionPhoto() {
  return (
    <div className="flex items-start justify-center px-2 py-2 sm:px-4 sm:py-4 lg:justify-start" role="img" aria-label="A team training session in action">
      <div className="w-full max-w-[16rem] rounded-card border-2 border-emerald/20 bg-surface-muted p-3 shadow-card sm:max-w-[18rem]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-emerald/5">
          <Image
            src="/images/training/arvind-session.webp"
            alt="A team training session in action"
            fill
            sizes="(min-width: 1024px) 18rem, 70vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function WhatYouGetSection() {
  return (
    <section className="relative overflow-hidden bg-surface-card" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <SectionMark>What you get</SectionMark>
          <h2 className="mt-6 max-w-4xl text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
            What your team walks out with.
          </h2>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(15rem,0.42fr)_minmax(0,1.58fr)] lg:mt-16 lg:gap-14">
          <SessionPhoto />
          <ol className="grid border-y border-emerald/15 sm:grid-cols-2 lg:border-l">
            {outcomes.map((outcome, index) => (
              <li
                key={outcome.eyebrow}
                className={`flex min-h-64 flex-col justify-center border-b border-emerald/15 p-7 sm:p-9 lg:min-h-72 ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } ${index > 1 ? "sm:border-b-0" : ""}`}
              >
                <span className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  {outcome.eyebrow}
                </span>
                <h3 className="mt-5 max-w-[22ch] font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
                  {outcome.title}
                </h3>
                <p className="mt-5 max-w-[34ch] text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                  {outcome.body}
                </p>
                <span aria-hidden className="mt-7 font-display text-fg-3" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-stat)" }}>
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
