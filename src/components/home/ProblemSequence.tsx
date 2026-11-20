"use client";

import { useEffect, useRef, useState } from "react";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import ProblemCards from "@/components/home/ProblemCards";

const problemLines = [
  "Most businesses have tried AI.",
  "Very few have it doing real work.",
];

const ARC = "M30 160 A130 130 0 0 1 290 160";
const BURST = Array.from({ length: 16 }, (_, i) => {
  const a = (-100 + (i / 15) * 200) * (Math.PI / 180);
  const r = 26 + (i % 4) * 9;
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r, delay: (i % 6) * 0.18, size: 4 + (i % 3) * 2 };
});

/**
 * "What you get out of AI". The needle follows the scroll; at the right end
 * the meter supercharges (glow, brighter arc, pixels bursting off the end).
 */
function Gauge() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0.1);
  const [charged, setCharged] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const next = Math.min(1, Math.max(0.08, (vh * 0.95 - rect.top) / (vh * 0.62)));
      setP(next);
      setCharged((c) => (c ? next > 0.94 : next >= 0.985));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const angle = -90 + p * 180;
  const status = charged ? "Supercharged" : p > 0.5 ? "Real work" : "Barely used";

  return (
    <figure
      ref={ref}
      className={["gauge relative mx-auto w-full max-w-[26rem]", charged ? "gauge--charged" : ""].join(" ")}
    >
      <div className="mb-1 text-center font-display font-bold uppercase text-fg-3" style={{ fontSize: "calc(var(--text-label) * 1.3)", letterSpacing: "var(--tracking-label)" }}>
        What you get out of AI
        <span className={`block ${charged ? "text-emerald" : "text-fg-3"}`} style={{ fontSize: "var(--text-micro)" }}>{status}</span>
      </div>
      <svg viewBox="-50 -10 420 232" className="w-full overflow-visible" role="img" aria-label="A meter of what you get out of AI. As you scroll the needle moves from a normal user to a user with an AI system, then the meter supercharges.">
        <defs>
          <linearGradient id="gauge-charged" x1="30" y1="0" x2="290" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#03624c" />
            <stop offset="0.6" stopColor="#00df82" />
            <stop offset="1" stopColor="#b8ffe2" />
          </linearGradient>
        </defs>
        <path d={ARC} fill="none" strokeWidth="18" strokeLinecap="round" className="stroke-fg-3/20" />
        <path
          d={ARC}
          fill="none"
          strokeWidth="18"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - p}
          stroke={charged ? "url(#gauge-charged)" : "var(--elyst-emerald)"}
          className="gauge-arc"
        />
        {charged ? (
          <g className="gauge-burst" aria-hidden>
            {BURST.map((b, i) => (
              <rect
                key={i}
                x={290 - b.size / 2}
                y={160 - b.size / 2}
                width={b.size}
                height={b.size}
                rx="1"
                fill={i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#00df82" : "#7dffc4"}
                style={{ "--dx": `${b.dx}px`, "--dy": `${b.dy}px`, animationDelay: `${b.delay}s` } as React.CSSProperties}
              />
            ))}
          </g>
        ) : null}
        <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "160px 160px", transition: "transform 0.12s linear" }}>
          <line x1="160" y1="160" x2="160" y2="52" strokeWidth="5" strokeLinecap="round" className="stroke-fg" />
          <circle cx="160" cy="160" r="11" className="fill-fg" />
        </g>
        <text x="30" y="204" textAnchor="middle" className="fill-fg-3 font-display" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em" }}>
          NORMAL USER
        </text>
        <text x="290" y="204" textAnchor="middle" className="fill-emerald font-display" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em" }}>
          USER WITH AN AI SYSTEM
        </text>
      </svg>
    </figure>
  );
}

export default function ProblemSequence({
  lines = problemLines,
  linesOnly = false,
  label = "The gap between owning AI and using it",
}: {
  lines?: readonly string[];
  linesOnly?: boolean;
  label?: string;
}) {
  return (
    <section
      aria-label={label}
      className="bg-bg"
      style={{
        // Lines-only: the next section's own top padding gives the gap below.
        padding: `clamp(96px, 11vw, 160px) var(--section-px) ${linesOnly ? "0" : "clamp(96px, 12vw, 180px)"}`,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="problem-sequence-gradient flex flex-col items-center text-center">
          {lines.map((line) => (
            <TextGradientScroll
              key={line}
              text={line}
              className="problem-sequence-line w-full font-display font-semibold leading-[1.15] tracking-[var(--tracking-display)]"
            />
          ))}
        </div>

        {linesOnly ? null : (
          <>
            <div className="mt-48 sm:mt-64">
              <Gauge />
            </div>

            <div className="mt-28 sm:mt-40">
              <ProblemCards />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
