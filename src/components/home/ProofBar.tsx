"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedEffects } from "@/lib/use-reduced-effects";

type Item = {
  value: number;
  suffix?: string;
  label: string;
  mockup: () => React.ReactElement;
};

const avatarColors = ["#03624c", "#00df82", "#2ec866", "#1c725e", "#c2d3cb"];

/** Mini "businesses" mockup — avatar roster over a small upward bar chart. */
function ClientsMockup() {
  const bars = [38, 52, 47, 68, 84];
  return (
    <div className="w-[150px] rotate-[-3deg] rounded-xl bg-white p-3 shadow-2xl">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-[#9a9a9a]">Businesses</span>
        <span className="rounded-md bg-[#e8f8ef] px-1.5 py-0.5 text-[0.58rem] font-semibold text-[#03624c]">active</span>
      </div>
      <div className="flex items-center -space-x-2.5">
        {avatarColors.map((c, i) => (
          <span key={i} className="h-6 w-6 rounded-full border-2 border-white" style={{ background: c }} />
        ))}
      </div>
      <div className="mt-2.5 flex h-7 items-end gap-1">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-[2px]"
            style={{ height: `${h}%`, background: i === bars.length - 1 ? "#00df82" : "#cde8db" }}
          />
        ))}
      </div>
    </div>
  );
}

/** Mini calendar mockup — recurring live sessions highlighted. */
function SessionsMockup() {
  const days = [1, 2, 3, 4, 5, 6, 7];
  const live = [2, 5];
  return (
    <div className="w-[150px] rotate-[2deg] rounded-xl bg-white p-3 shadow-2xl">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-[#9a9a9a]">Sessions</span>
        <span className="flex items-center gap-1 rounded-md bg-[#fdecea] px-1.5 py-0.5 text-[0.58rem] font-semibold text-[#c4422e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e0392b]" />live
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => (
          <span
            key={d}
            className={`flex h-5 w-5 items-center justify-center rounded-[5px] text-[0.55rem] font-semibold ${
              live.includes(d) ? "bg-[#00df82] text-[#06140e]" : "bg-[#f1f3f1] text-[#9a9a9a]"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-2.5 text-[0.64rem] font-semibold text-[#3a3a3a]">Delivered every week</div>
    </div>
  );
}

/** Mini certificate mockup — seal, name lines, "completed" tag. */
function CohortsMockup() {
  return (
    <div className="w-[150px] rotate-[-2deg] rounded-xl bg-white p-3 shadow-2xl">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[0.6rem] font-semibold uppercase tracking-wide text-[#9a9a9a]">Cohort</span>
        <span className="rounded-md bg-[#e8f8ef] px-1.5 py-0.5 text-[0.58rem] font-semibold text-[#03624c]">graduated</span>
      </div>
      <div className="flex items-center gap-2.5 rounded-lg bg-[#f6f8f6] p-2">
        <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0 text-[#03624c]" fill="none">
          <path d="M16 4 4 10l12 6 12-6-12-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 13.5v5c0 1.4 3.1 3.5 7 3.5s7-2.1 7-3.5v-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <div className="flex-1 space-y-1">
          <span className="block h-1.5 w-full rounded-full bg-[#d5e3dc]" />
          <span className="block h-1.5 w-2/3 rounded-full bg-[#e6ece9]" />
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-1 text-[0.64rem] font-semibold text-[#3a3a3a]">
        <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-[#00c973]" fill="currentColor">
          <path d="M13.5 4.5 6 12 2.5 8.5l1-1L6 10l6.5-6.5z" />
        </svg>
        Certified &amp; ready
      </div>
    </div>
  );
}

const items: Item[] = [
  { value: 10, suffix: "+", label: "Businesses Worked With", mockup: ClientsMockup },
  { value: 50, suffix: "+", label: "Sessions Delivered", mockup: SessionsMockup },
  { value: 5, suffix: "+", label: "Cohorts Completed", mockup: CohortsMockup },
];

function CountUp({
  target,
  suffix = "",
  active,
  reduced,
}: {
  target: number;
  suffix?: string;
  active: boolean;
  reduced: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
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
  }, [active, target, reduced]);

  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export default function ProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedEffects = useReducedEffects();
  const [active, setActive] = useState(reducedEffects);

  useEffect(() => {
    if (reducedEffects) {
      setActive(true);
      return;
    }
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
  }, [reducedEffects]);

  const panel = (
    <div
      ref={ref}
      className="rounded-md"
      style={{
        background: "linear-gradient(135deg, var(--surface-dark-2) 0%, var(--surface-dark) 100%)",
      }}
    >
      <div className="grid grid-cols-1 gap-y-12 px-8 py-12 sm:px-12 md:grid-cols-3 md:gap-x-4 md:py-16">
        {items.map((item, i) => {
          const Mockup = item.mockup;
          return (
            <div
              key={item.label}
              className={`flex items-center justify-center gap-5 md:px-5 ${
                i > 0 ? "md:border-l md:border-[rgba(255,255,255,0.1)]" : ""
              }`}
            >
              <div className="shrink-0">
                <Mockup />
              </div>
              <div className="flex flex-col text-left">
                <span
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                    color: "var(--elyst-green)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.045em",
                  }}
                >
                  <CountUp target={item.value} suffix={item.suffix} active={active} reduced={reducedEffects} />
                </span>
                <span
                  className="mt-2 font-medium"
                  style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.12rem)", color: "#ffffff" }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="bg-bg" style={{ padding: "clamp(44px, 6vw, 80px) clamp(16px, 3vw, 40px)" }}>
      <div className="mx-auto max-w-7xl">
        {reducedEffects ? (
          panel
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {panel}
          </motion.div>
        )}
      </div>
    </section>
  );
}
