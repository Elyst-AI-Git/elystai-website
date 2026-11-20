"use client";

import { BrandButton } from "@/components/ui/brand-button";
import { useEffect, useRef, useState } from "react";
import { STEP_ICONS } from "@/components/home/step-icons";
import { SectionMark } from "@/components/ui/section-mark";
import { TRANSFORMATION_STEPS } from "@/lib/site-content";

const N = TRANSFORMATION_STEPS.length;

/**
 * Six steps on a line. The section pins while you scroll: the line draws from
 * step 1 to step 6 and each step lights up (with one soft pulse) as the line
 * reaches it. Once it reaches 6 the page scrolls on. Reduced motion: all lit.
 */
export default function SixSteps() {
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const frame = requestAnimationFrame(() => {
        setReduce(true);
        setReached(N);
      });
      return () => cancelAnimationFrame(frame);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const raw = range > 0 ? -rect.top / (range * 0.9) : 1;
      const p = Math.min(1, Math.max(0, raw));
      listRef.current?.style.setProperty("--p", p.toFixed(4));
      // step i (0-based) is reached when the line passes its position.
      const count = Math.min(N, Math.floor(p * (N - 1) + 1e-6) + 1);
      setReached(p <= 0 ? 0 : count);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-24 bg-surface-dark"
    >
      <div ref={trackRef} style={{ height: reduce ? "auto" : "300svh" }}>
        <div
          className={reduce ? "" : "sticky top-0 flex h-svh flex-col justify-center"}
          style={{ padding: reduce ? "var(--section-py) var(--section-px)" : "5.5rem var(--section-px) 1.5rem" }}
        >
          <div className="mx-auto w-full max-w-7xl">
            <header className="mx-auto max-w-4xl text-center">
              <SectionMark tone="dark">How AI Transformation works</SectionMark>
              <h2 id="how-it-works-heading" className="mt-4 text-center text-fg-on-dark sm:mt-6" style={{ fontSize: "clamp(1.9rem, 4.08vw, 3.24rem)" }}>
                <span className="block">Six clear steps.</span>
              </h2>
            </header>

            <ol
              ref={listRef}
              className="relative mt-8 grid gap-4 sm:mt-12 lg:mt-16 lg:grid-cols-6 lg:gap-8"
              style={{ ["--p" as string]: reduce ? 1 : 0 }}
            >
              <span aria-hidden className="absolute bottom-6 left-[1.2rem] top-6 w-0.5 rounded bg-white/15 lg:bottom-auto lg:left-[8.33%] lg:right-[8.33%] lg:top-[1.55rem] lg:h-0.5 lg:w-auto" />
              <span
                aria-hidden
                className="six-line absolute bottom-6 left-[1.2rem] top-6 w-0.5 rounded bg-green lg:bottom-auto lg:left-[8.33%] lg:right-[8.33%] lg:top-[1.55rem] lg:h-0.5 lg:w-auto"
              />
              {TRANSFORMATION_STEPS.map((step, index) => {
                const Icon = STEP_ICONS[index];
                const on = index < reached;
                return (
                  <li key={step.n} className="relative grid grid-cols-[2.5rem_1fr] items-center gap-4 lg:block lg:text-center">
                    <span
                      className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 font-display text-small font-bold transition-colors duration-300 lg:mx-auto lg:size-[3.1rem] ${
                        on ? "border-green bg-green text-[#06140e]" : "border-white/25 bg-surface-dark text-fg-muted-dark"
                      }`}
                    >
                      {step.n}
                      {index === N - 1 && reached >= N && !reduce ? (
                        <span aria-hidden className="six-done pointer-events-none absolute inset-0">
                          <i className="six-ring" />
                          {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
                            <i key={k} className="six-px" style={{ ["--a" as string]: `${k * 45}deg`, animationDelay: `${(k % 4) * 0.12}s` }} />
                          ))}
                        </span>
                      ) : null}
                    </span>
                    <div className="lg:mt-6">
                      <Icon aria-hidden className={`mb-3 hidden size-6 transition-colors duration-300 lg:mx-auto lg:block ${on ? "text-green" : "text-fg-muted-dark"}`} strokeWidth={1.7} />
                      <h3 className={`font-display font-semibold transition-colors duration-300 ${on ? "text-fg-on-dark" : "text-fg-muted-dark"}`} style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>
                        {step.title}
                      </h3>
                      <p className="mt-2 hidden text-fg-muted-dark sm:block" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                        {step.line}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 text-center sm:mt-12">
              <BrandButton href="/transformation" variant="metal" tone="light">
                See the full process
              </BrandButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
