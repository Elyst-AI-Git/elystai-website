"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { AI_SYSTEM_DEFINITION } from "@/lib/site-content";

/** One simple picture of a team's day, before and after an AI system. */

const GROUPS = [
  { kind: "repeat", cells: 5 },
  { kind: "matters", cells: 4 },
] as const;

/** Pixel mark inside the switch thumb: an empty ring when off, a spark when on. */
function PixelMark({ on }: { on: boolean }) {
  const ring = ["01110", "10001", "10001", "10001", "01110"];
  const spark = ["00100", "01110", "11111", "01110", "00100"];
  const grid = on ? spark : ring;
  return (
    <svg viewBox="0 0 5 5" aria-hidden className="size-8">
      {grid.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "1" ? (
            <rect key={`${x}-${y}`} x={x + 0.08} y={y + 0.08} width="0.84" height="0.84" rx="0.12" fill={on ? "var(--elyst-emerald)" : "#8a918d"} />
          ) : null
        )
      )}
    </svg>
  );
}

export default function SystemActuallyIs() {
  const [on, setOn] = useState(false);

  return (
    <section
      id="why-it-matters"
      aria-labelledby="what-ai-system-heading"
      className="relative overflow-hidden bg-surface-accent-soft"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2 lg:max-w-[30rem] lg:justify-self-end">
          <SectionMark>Why it matters</SectionMark>
          <h2 id="what-ai-system-heading" className="mt-6 text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>
            {AI_SYSTEM_DEFINITION.heading}
          </h2>
          <p className="mt-6 text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
            {AI_SYSTEM_DEFINITION.body}
          </p>

          <div className="mt-10 flex items-center gap-4 sm:gap-6">
            <span className={["font-display font-bold uppercase transition-colors", on ? "text-fg-3" : "text-fg"].join(" ")} style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              Without
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-label="Show the team's day with an AI system"
              onClick={() => setOn((v) => !v)}
              className="relative h-[3.6rem] w-[7.2rem] shrink-0 rounded-full border border-black/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.12)] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-4"
              style={{ background: on ? "linear-gradient(180deg,#dff3e8,#eaf6ef)" : "linear-gradient(180deg,#dcdedb,#ebece9)" }}
            >
              <span
                className="absolute top-[0.4rem] flex h-[2.8rem] w-[3.7rem] items-center justify-center rounded-full border border-white bg-gradient-to-b from-white to-[#ecefec] transition-all duration-500 ease-[cubic-bezier(.3,1.3,.5,1)]"
                style={{
                  left: on ? "calc(100% - 3.7rem - 0.4rem)" : "0.4rem",
                  boxShadow: on
                    ? "0 8px 22px rgba(0,223,130,0.45), 0 0 0 2px rgba(0,223,130,0.55)"
                    : "0 4px 10px rgba(0,0,0,0.18)",
                }}
              >
                <PixelMark on={on} />
              </span>
            </button>
            <span className={["font-display font-bold uppercase transition-colors", on ? "text-emerald" : "text-fg-3"].join(" ")} style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              With an AI system
            </span>
          </div>
        </div>

        <div className="lg:order-1">
          <div className="w-full rounded-card border border-emerald/20 p-5 shadow-card sm:p-7" style={{ background: "#F5F8F6" }}>
              <div className="flex items-baseline justify-between font-display font-bold uppercase" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                <span className="text-emerald">Your team&apos;s day</span>
                <span className="text-fg-3">9:00 to 18:00</span>
              </div>
  
              <div className="mt-6 flex gap-2" aria-hidden>
                {GROUPS.map((group) => {
                  const repeat = group.kind === "repeat";
                  const grow = repeat ? (on ? 1.5 : 5) : on ? 8.5 : 4;
                  return (
                    <div key={group.kind} className="@container min-w-0 transition-[flex-grow] duration-700 ease-out" style={{ flexGrow: grow, flexBasis: 0 }}>
                      <div className={["mb-2 flex items-center gap-1.5 overflow-hidden whitespace-nowrap font-display font-bold", repeat ? (on ? "text-emerald" : "text-fg-3") : "text-emerald"].join(" ")} style={{ fontSize: "var(--text-label)" }}>
                        {repeat && on ? (
                          <>
                            {/* Full label only when the column is wide enough for it; otherwise "AI". */}
                            <span className="hidden @[6.5rem]:inline">Done by AI</span>
                            <span className="@[6.5rem]:hidden">AI</span>
                            <ArrowRight className="size-4" strokeWidth={2.4} />
                          </>
                        ) : (
                          <span>{repeat ? "Repeat work" : "Work that matters"}</span>
                        )}
                      </div>
                      <div className="h-px w-full" style={{ background: repeat && !on ? "#b9c0bc" : "var(--elyst-emerald)" }} />
                      <div className="mt-2 flex h-16 gap-1 sm:h-20">
                        {Array.from({ length: group.cells }, (_, i) => (
                          <span
                            key={i}
                            className="min-w-0 flex-1 rounded-md transition-colors duration-700"
                            style={{
                              background: repeat
                                ? on
                                  ? "var(--elyst-green)"
                                  : "repeating-linear-gradient(135deg,#cfd4d1 0 6px,#dde1de 6px 12px)"
                                : "var(--elyst-emerald)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
  
              <p className="mt-5 font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }} aria-live="polite">
                {on ? "The AI system does the repeat work. A person checks it." : "The same jobs, again and again, by hand."}
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}
