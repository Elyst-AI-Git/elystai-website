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
    label: "Your role",
    detail: "We start with the people who will use the session.",
  },
  {
    number: "02",
    label: "Your tools",
    detail: "We work inside the tools your team already runs.",
  },
  {
    number: "03",
    label: "Your real work",
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
      aria-label="Every session starts with your role, your tools, and your real work"
      className={`relative w-full overflow-hidden ${className}`}
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
        className="overflow-hidden border-y border-white/15"
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
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                  event.preventDefault();
                  const nextIndex = (index + 1) % sessionInputs.length;
                  moveTo(nextIndex);
                  document.getElementById(`training-input-${sessionInputs[nextIndex].number}`)?.focus();
                }
                if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  const nextIndex = (index - 1 + sessionInputs.length) % sessionInputs.length;
                  moveTo(nextIndex);
                  document.getElementById(`training-input-${sessionInputs[nextIndex].number}`)?.focus();
                }
              }}
              className={`group relative grid w-full grid-cols-[3.2rem_minmax(0,1fr)] gap-x-4 border-b border-white/15 text-left last:border-b-0 outline-none transition-[padding,background-color] duration-300 motion-reduce:transition-none ${
                isActive ? "bg-white/[0.045] px-4 py-7 sm:px-6 sm:py-8" : "px-4 py-5 sm:px-6 sm:py-6"
              } focus-visible:bg-white/[0.08]`}
            >
              {isActive ? (
                <span
                  aria-hidden
                  className="training-input-progress absolute bottom-0 left-0 top-0 w-1 bg-green"
                  style={{ animation: `training-input-progress ${AUTO_ADVANCE_MS}ms linear` }}
                />
              ) : null}
              <span
                aria-hidden
                className={`font-display font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                  isActive ? "text-green" : "text-fg-muted-dark group-hover:text-green"
                }`}
                style={{ fontSize: "calc(var(--text-small) + 2px)", lineHeight: 1.1, letterSpacing: "var(--tracking-stat)" }}
              >
                {input.number}
              </span>
              <span className="min-w-0">
                <span className="block h-[2.9rem] overflow-hidden sm:h-[4rem]">
                  <span
                    className={`block translate-y-[0.08em] whitespace-nowrap font-display font-semibold leading-[0.76] tracking-[var(--tracking-display)] transition-colors duration-300 motion-reduce:transition-none ${
                      isActive ? "text-fg-on-dark" : "text-fg-muted-dark group-hover:text-fg-on-dark"
                    }`}
                    style={{
                      fontSize:
                        input.label.length > 10
                          ? "clamp(1.8rem, 3.4vw, 3.5rem)"
                          : "clamp(2.2rem, 4.1vw, 4.2rem)",
                    }}
                  >
                    {input.label}
                  </span>
                </span>
                {isActive ? (
                  <span
                    className="mt-3 block max-w-sm font-sans font-normal text-fg-muted-dark transition-opacity duration-200 motion-reduce:transition-none"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}
                  >
                    {input.detail}
                  </span>
                ) : null}
              </span>
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
