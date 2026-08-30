"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ProcessSymbol, type ProcessSymbolId } from "@/components/marketing/ProcessSymbols";
import { SectionMark } from "@/components/ui/section-mark";

type HomepageProcessStep = {
  number: string;
  label: string;
  headline: string;
  description: string;
  href: string;
  symbol: ProcessSymbolId;
};

const homepageProcess: HomepageProcessStep[] = [
  {
    number: "01",
    label: "Identify",
    headline: "Find the one area worth doing first.",
    description: "We understand the workflow, the friction, and the cost before anything gets built.",
    href: "/services#identify",
    symbol: "identify",
  },
  {
    number: "02",
    label: "Build",
    headline: "Build around the tools your team already runs.",
    description: "We build the smallest useful system, with human review where it matters.",
    href: "/services#build",
    symbol: "build",
  },
  {
    number: "03",
    label: "Handover",
    headline: "Leave with a system your team can own.",
    description: "We train your team, document the limits, and hand the system over.",
    href: "/services#handover",
    symbol: "handover",
  },
];

const AUTO_ADVANCE_MS = 7200;

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = homepageProcess[activeIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % homepageProcess.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section
      id="how-we-work"
      className="scroll-mt-24 bg-surface-dark"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark tone="dark">The operating model</SectionMark>
          <h2 className="mt-6 text-center text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            <span className="block">First, we map it.</span>
            <span className="block">Then we prove it.</span>
            <span className="block">Then you own it.</span>
          </h2>
        </header>

        <div
          className="relative mt-14 overflow-hidden border border-white/15 bg-white sm:mt-16"
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div role="tablist" aria-label="The operating model" className="bg-white text-fg">
              {homepageProcess.map((step, index) => {
                const isActive = index === activeIndex;

                return (
                  <div key={step.label} className="relative border-b border-border last:border-b-0">
                    {isActive ? (
                      <span
                        aria-hidden
                        className="operating-model-progress absolute bottom-0 left-0 top-0 z-10 w-1 bg-emerald"
                        style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
                      />
                    ) : null}
                    <button
                      id={`operating-model-${step.label.toLowerCase()}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="operating-model-panel"
                      onClick={() => setActiveIndex(index)}
                      className={`group relative block w-full text-left outline-none transition-colors focus-visible:bg-surface-light ${
                        isActive ? "px-7 py-8 sm:px-10 sm:py-10" : "px-7 py-7 sm:px-10 sm:py-8"
                      }`}
                    >
                      <span
                        className={`inline-flex items-baseline gap-3 font-display font-bold uppercase ${
                          isActive ? "text-emerald" : "text-fg-3 group-hover:text-emerald"
                        }`}
                        style={{ fontSize: "0.9rem", letterSpacing: "0.162em" }}
                      >
                        <span>{step.number}</span>
                        <span>{step.label}</span>
                      </span>
                      <h3
                        className={`mt-4 max-w-xl font-display font-semibold transition-colors ${
                          isActive ? "text-fg" : "text-fg-3 group-hover:text-fg"
                        }`}
                        style={{ fontSize: "var(--text-card)", lineHeight: 1.12 }}
                      >
                        {step.headline}
                      </h3>
                      {isActive ? (
                        <p
                          className="mt-5 max-w-xl text-fg-2"
                          style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}
                        >
                          {step.description}
                        </p>
                      ) : null}
                    </button>
                    {isActive ? (
                      <div className="-mt-3 px-7 pb-8 sm:px-10 sm:pb-10">
                        <Link
                          href={step.href}
                          className="group/link inline-flex items-center gap-2 font-display font-semibold text-emerald outline-none transition-colors hover:text-emerald-light focus-visible:text-emerald-light"
                          style={{ fontSize: "var(--text-small)" }}
                        >
                          View {step.label}
                          <ArrowUpRight
                            className="size-4 transition-transform duration-150 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transition-none"
                            strokeWidth={2}
                            aria-hidden
                          />
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div
              id="operating-model-panel"
              role="tabpanel"
              aria-labelledby={`operating-model-${activeStep.label.toLowerCase()}`}
              className="relative flex min-h-[24rem] items-center justify-center border-t border-border bg-white px-8 py-10 sm:min-h-[30rem] sm:px-12 sm:py-12 lg:min-h-full lg:border-l lg:border-t-0"
            >
              <div className="relative flex aspect-square w-full max-w-[34rem] items-center justify-center overflow-hidden border border-emerald/35 bg-surface-dark-2 p-4 sm:p-8">
                <div aria-hidden className="pointer-events-none absolute inset-4 border border-white/10 sm:inset-7" />
                <div className="relative z-10 flex w-full items-center justify-center">
                  <ProcessSymbol key={activeStep.symbol} id={activeStep.symbol} size="large" surface="dark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
