"use client";

import { useEffect, useRef, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";

type Item =
  | { kind: "count"; value: number; prefix?: string; suffix?: string; label: string }
  | { kind: "text"; value: string; label: string };

const items: Item[] = [
  { kind: "count", value: 10, suffix: "+", label: "Businesses Worked With" },
  { kind: "count", value: 50, suffix: "+", label: "Sessions Delivered" },
  { kind: "count", value: 5, suffix: "+", label: "Cohorts Completed" },
];

function CountUp({
  target,
  prefix = "",
  suffix = "",
  active,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      raf = requestAnimationFrame(() => setN(target));
      return () => cancelAnimationFrame(raf);
    }
    const duration = 1200;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <>
      {prefix}
      {n}
      {suffix}
    </>
  );
}

export default function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative mt-10 overflow-hidden bg-surface-dark md:mt-16">
      <div
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        style={{
          maskImage: "radial-gradient(ellipse at center, white, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, white, transparent 80%)",
        }}
      >
        <div className="relative h-[44rem] w-[72rem] shrink-0">
          <Boxes />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, var(--surface-dark) 88%)" }}
      />

      <div
        ref={ref}
        className="pointer-events-none relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-x-4 gap-y-12 px-[var(--section-px)] py-16 md:grid-cols-3 md:gap-0"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col items-center text-center transition-opacity duration-700 md:px-6 ${
              i > 0 ? "md:border-l md:border-[rgba(255,255,255,0.1)]" : ""
            } ${active ? "opacity-100" : "opacity-0"}`}
          >
            <span
              className="font-display font-bold"
              style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", color: "#00df82", lineHeight: 1.05 }}
            >
              {item.kind === "count" ? (
                <CountUp
                  target={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  active={active}
                />
              ) : (
                item.value
              )}
            </span>
            <span
              className="mt-3 font-medium"
              style={{ fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)", color: "#ffffff" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
