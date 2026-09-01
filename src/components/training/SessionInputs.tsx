"use client";

import { useEffect, useState } from "react";

type SessionInput = {
  number: string;
  label: string;
  detail: string;
};

const sessionInputs: SessionInput[] = [
  {
    number: "01",
    label: "Your Role",
    detail: "We start with the people who will use the session.",
  },
  {
    number: "02",
    label: "Your Tools",
    detail: "We work inside the tools your team already runs.",
  },
  {
    number: "03",
    label: "Your Work",
    detail: "We practise on the tasks that matter in the room.",
  },
];

const AUTO_ADVANCE_MS = 2800;

export default function SessionInputs({ className = "" }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeInput = sessionInputs[activeIndex];

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % sessionInputs.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const moveTo = (index: number) => {
    setActiveIndex((index + sessionInputs.length) % sessionInputs.length);
  };

  return (
    <aside
      aria-label="Every session starts with your role, your tools, and your work"
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center gap-4 pb-5">
        <span
          className="font-display font-bold uppercase text-green"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
        >
          Every session starts with
        </span>
        <span aria-hidden className="h-px flex-1 bg-white/20" />
      </div>

      <div
        role="tablist"
        aria-label="The inputs for each training session"
        className="flex min-h-[24rem] flex-col gap-3 md:h-[25rem] md:flex-row"
      >
        {sessionInputs.map((input, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={input.label}
              id={`training-input-${input.number}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="training-input-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => moveTo(index)}
              onFocus={() => moveTo(index)}
              onMouseEnter={() => moveTo(index)}
              onKeyDown={(event) => {
                if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;

                event.preventDefault();
                const nextIndex = event.key === "ArrowDown" || event.key === "ArrowRight"
                  ? (index + 1) % sessionInputs.length
                  : (index - 1 + sessionInputs.length) % sessionInputs.length;
                moveTo(nextIndex);
                document.getElementById(`training-input-${sessionInputs[nextIndex].number}`)?.focus();
              }}
              className={`group relative min-w-0 overflow-hidden rounded-md border-2 bg-white text-left outline-none transition-[flex,border-color,box-shadow] duration-500 motion-reduce:transition-none md:min-h-0 ${
                isActive
                  ? "min-h-56 flex-1 border-green shadow-[0_14px_34px_rgba(0,0,0,0.16)]"
                  : "min-h-16 flex-[0_0_4.5rem] border-white/20 hover:border-green/65"
              } focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-dark)]`}
            >
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 top-0 w-1 origin-top bg-emerald"
                  style={{ animation: `training-input-progress ${AUTO_ADVANCE_MS}ms linear` }}
                />
              ) : null}
              <span
                className={`absolute font-display font-bold ${isActive ? "left-5 top-5 text-emerald" : "left-5 top-1/2 -translate-y-1/2 text-fg-3 md:top-5 md:translate-y-0"}`}
                style={{ fontSize: "calc(var(--text-small) + 2px)", lineHeight: 1, letterSpacing: "var(--tracking-stat)" }}
              >
                {input.number}
              </span>

              {isActive ? (
                <span className="absolute inset-x-6 bottom-6 flex flex-col items-start">
                  <span className="max-w-[18ch] font-sans text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.4 }}>
                    {input.detail}
                  </span>
                  <span className="mt-4 font-display font-semibold tracking-[var(--tracking-display)] text-fg" style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", lineHeight: 0.95 }}>
                    {input.label}
                  </span>
                </span>
              ) : (
                <span className="absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap font-display font-semibold tracking-[var(--tracking-display)] text-fg md:bottom-24 md:left-1/2 md:top-auto md:-translate-x-1/2 md:translate-y-0 md:rotate-90" style={{ fontSize: "clamp(1.25rem, 2vw, 1.8rem)", lineHeight: 1 }}>
                  {input.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div id="training-input-panel" role="tabpanel" aria-labelledby={`training-input-${activeInput.number}`} className="sr-only">
        {activeInput.detail}
      </div>
    </aside>
  );
}
