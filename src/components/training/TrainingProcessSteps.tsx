"use client";

import { useEffect, useState } from "react";

export type TrainingStep = {
  label: string;
  description: readonly [string, string];
};

const AUTO_ADVANCE_MS = 7200;

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
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <ol role="tablist" aria-label="How we build your session" className="border-y border-white/15">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;

          return (
            <li key={step.label} className="relative border-b border-white/15 last:border-b-0">
              {isActive ? (
                <span
                  aria-hidden
                  className="training-input-progress absolute bottom-0 left-0 top-0 z-10 w-1 bg-green"
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
                className={`group block w-full text-left outline-none transition-[padding,background-color] duration-300 motion-reduce:transition-none ${
                  isActive ? "bg-white/[0.045] px-5 py-8 sm:px-7 sm:py-9" : "px-5 py-6 sm:px-7 sm:py-7"
                } focus-visible:bg-white/[0.08]`}
              >
                <span
                  className={`inline-flex items-baseline gap-3 font-display font-bold uppercase ${
                    isActive ? "text-green" : "text-fg-muted-dark group-hover:text-green"
                  }`}
                  style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
                >
                  <span>0{index + 1}</span>
                </span>
                <span
                  className={`mt-4 block font-display font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                    isActive ? "text-fg-on-dark" : "text-fg-muted-dark group-hover:text-fg-on-dark"
                  }`}
                  style={{ fontSize: "var(--text-card)", lineHeight: 1.05 }}
                >
                  {step.label}
                </span>
                {isActive ? (
                  <p
                    className="mt-5 max-w-xl text-fg-muted-dark transition-opacity duration-200 motion-reduce:transition-none"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}
                  >
                    <span className="block">{step.description[0]}</span>
                    <span className="block">{step.description[1]}</span>
                  </p>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>
      <div id="training-process-panel" role="tabpanel" aria-labelledby={`training-process-${activeStep.label.toLowerCase()}`} className="sr-only">
        {activeStep.description.join(" ")}
      </div>
    </div>
  );
}
