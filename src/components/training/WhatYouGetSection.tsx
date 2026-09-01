import Image from "next/image";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
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
    <figure className="relative aspect-[9/16] min-h-0 overflow-hidden bg-surface-muted lg:aspect-auto lg:min-h-[42rem]">
      <Image
        src="/images/training/arvind-session.webp"
        alt="A team training session in action"
        fill
        sizes="(min-width: 1024px) 30vw, 100vw"
        className="object-cover"
      />
    </figure>
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

        <div className="mt-12 overflow-hidden rounded-md border-2 border-emerald/20 bg-surface-accent-soft sm:mt-14 lg:mt-16 lg:grid lg:grid-cols-[minmax(16rem,0.45fr)_minmax(0,1.55fr)] lg:items-stretch">
          <SessionPhoto />
          <ol className="grid bg-surface-accent-soft sm:grid-cols-2 lg:border-l-2 lg:border-emerald/20">
            {outcomes.map((outcome, index) => (
              <li
                key={outcome.eyebrow}
                className={[
                  "group relative flex min-h-64 flex-col justify-center overflow-hidden border-t border-emerald/15 bg-surface-accent-soft p-7 sm:p-9 lg:min-h-[21rem] lg:border-t-0",
                  index % 2 === 0 ? "sm:border-r sm:border-emerald/15" : "",
                  index > 1 ? "sm:border-t sm:border-emerald/15" : "",
                ].join(" ")}
              >
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-36 opacity-45 [mask-image:linear-gradient(to_top,black_0%,black_48%,transparent_100%)]">
                  <CanvasRevealEffect
                    colors={[[0, 223, 130], [3, 98, 76], [255, 255, 255]]}
                    containerClassName="absolute inset-0 !bg-transparent"
                    dotSize={2}
                    showGradient={false}
                  />
                </div>
                <div className="relative z-10">
                  <span className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                    {outcome.eyebrow}
                  </span>
                  <h3 className="mt-5 max-w-[22ch] font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
                    {outcome.title}
                  </h3>
                  <p className="mt-5 max-w-[34ch] text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                    {outcome.body}
                  </p>
                  <span aria-hidden className="mt-7 block font-display font-bold text-fg-3" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                    0{index + 1}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
