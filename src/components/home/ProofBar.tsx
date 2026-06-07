"use client";

import { useEffect, useRef, useState } from "react";

type Item =
  | { kind: "count"; value: number; prefix?: string; suffix?: string; label: string }
  | { kind: "text"; value: string; label: string };

const items: Item[] = [
  { kind: "count", value: 34, suffix: "+", label: "Circle members" },
  { kind: "count", value: 2, label: "AI Junior batches run" },
  { kind: "count", value: 80, suffix: "+", label: "AI Yathra community members" },
  { kind: "text", value: "Kerala's first", label: "AI graduates" },
  { kind: "text", value: "Registered LLP", label: "Kozhikode, Kerala" },
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
    <section className="bg-surface-muted mt-10 md:mt-16">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-[var(--section-px)] py-10 md:grid-cols-5 md:gap-0"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex flex-col items-center text-center transition-opacity duration-700 md:px-6 ${
              i > 0 ? "md:border-l md:border-border" : ""
            } ${active ? "opacity-100" : "opacity-0"}`}
          >
            <span
              className="font-display font-bold text-emerald"
              style={{ fontSize: "var(--text-h3)" }}
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
            <span className="mt-1 text-small text-fg-3">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
