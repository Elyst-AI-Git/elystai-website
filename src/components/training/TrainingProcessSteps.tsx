"use client";

import { useEffect, useState } from "react";

export type TrainingStep = {
  label: string;
  description: string;
};

const AUTO_ADVANCE_MS = 6800;

export default function TrainingProcessSteps({ steps }: { steps: readonly TrainingStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeStep = steps[activeIndex] ?? steps[0];

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % steps.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, steps.length]);

  return (
    <div
      className="overflow-hidden rounded-md border border-emerald/35 bg-surface-light shadow-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <ol role="tablist" aria-label="How we build your session">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={step.label} className="relative border-b border-emerald/20 last:border-b-0">
              {isActive ? (
                <span
                  aria-hidden
                  className="training-input-progress absolute bottom-0 left-0 top-0 z-10 w-1 bg-emerald"
                  style={{ animation: `training-input-progress ${AUTO_ADVANCE_MS}ms linear` }}
                />
              ) : null}
              <button
                id={`training-process-${step.label.toLowerCase()}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="training-process-panel"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={[
                  "group relative grid w-full grid-cols-[2.6rem_minmax(0,1fr)] gap-x-3 text-left outline-none transition-[padding,background-color] duration-300 motion-reduce:transition-none sm:grid-cols-[3.6rem_minmax(0,1fr)] sm:gap-x-5",
                  isActive ? "bg-emerald/[0.055] px-5 pb-6 pt-7 sm:px-8 sm:pb-7 sm:pt-9" : "px-5 pb-1 pt-6 sm:px-8 sm:pb-1 sm:pt-8",
                  "focus-visible:bg-emerald/[0.08]",
                ].join(" ")}
              >
                <span
                  className={[
                    "pt-1 font-display font-bold",
                    isActive ? "text-emerald" : "text-fg-3 group-hover:text-emerald",
                  ].join(" ")}
                  style={{ fontSize: "calc(var(--text-label) + 2px)", letterSpacing: "var(--tracking-label)" }}
                >
                  0{index + 1}
                </span>
                <span className="min-w-0">
                  <span className={isActive ? "block overflow-visible" : "block h-[2.9rem] overflow-hidden sm:h-[3.4rem]"}>
                    <span
                      className={[
                        "block translate-y-[0.08em] font-display font-semibold leading-[0.68] tracking-[var(--tracking-display)] transition-colors duration-300 motion-reduce:transition-none",
                        isActive ? "text-fg" : "text-fg-3 group-hover:text-fg",
                      ].join(" ")}
                      style={{ fontSize: "clamp(3.2rem, 6.8vw, 6.5rem)" }}
                    >
                      {step.label}
                    </span>
                  </span>
                  {isActive ? (
                    <span
                      className="mt-5 block max-w-[40rem] text-fg-2 transition-opacity duration-200 motion-reduce:transition-none"
                      style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}
                    >
                      {step.description}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div id="training-process-panel" role="tabpanel" aria-labelledby={`training-process-${activeStep.label.toLowerCase()}`} className="sr-only">
        {activeStep.description}
      </div>
    </div>
  );
}
