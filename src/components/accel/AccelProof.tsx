"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Accelerator proof — the receipts. Since the Flagship is still coming, this
 * proves Elyst already delivers AI learning at scale: a count-up stat row from
 * the PAST programs (AI Yathra, AI Junior) + community, then real voices.
 *
 * AI Junior / AI Yathra appear ONLY as proof of track record — never as
 * offerings (no enrolment, no links).
 */

const stats = [
  { value: 80, suffix: "+", label: "AI Yathra 2.0 participants", sub: "3-day GenAI program · Dec 2025" },
  { value: 2, suffix: "", label: "AI Junior batches delivered", sub: "Bilingual program · Apr–May 2026" },
  { value: 34, suffix: "+", label: "Community members & growing", sub: "The Circle backs the journey" },
];

const testimonials = [
  {
    quote:
      "AI Yathra finally made GenAI click for me — practical, in my own language, and taught by people who clearly build this stuff.",
    name: "Participant, AI Yathra 2.0",
    context: "Working professional, Kerala",
  },
  {
    quote:
      "The community keeps me current without the noise. I get the updates that matter and people to actually talk through them with.",
    name: "Circle member",
    context: "Backed-by community",
  },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    const duration = 1400;
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
      {n}
      {suffix}
    </>
  );
}

export default function AccelProof() {
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
    <section
      style={{
        padding: "var(--section-py) var(--section-px)",
        background: "var(--surface-muted)",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip" style={{ background: "var(--green-tint-15)" }}>
            Already delivered
          </span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            We&rsquo;ve already taught this — to real people.
          </h2>
        </div>

        {/* Stat row */}
        <div
          ref={ref}
          className="mt-12 grid gap-5 sm:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="card-tint flex flex-col items-center p-8 text-center"
            >
              <span
                className="font-display font-bold"
                style={{ fontSize: "clamp(2.8rem, 5vw, 4rem)", color: "var(--elyst-green)", lineHeight: 1.05 }}
              >
                <CountUp target={s.value} suffix={s.suffix} active={active} />
              </span>
              <p className="mt-3 text-small font-semibold text-fg">{s.label}</p>
              <p className="mt-1 text-[0.85rem] text-fg-3">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col p-8"
              style={{
                borderRadius: "var(--radius-xl, 24px)",
                background: "var(--bg)",
                border: "1px solid var(--green-tint-15)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <blockquote
                className="flex-1 text-fg"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-small font-bold text-fg">{t.name}</p>
                <p className="text-[0.85rem] text-fg-3">{t.context}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
