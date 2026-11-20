"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Quote = { text: string; by: string; role?: string };

const INTERVAL_MS = 7000;

/**
 * One wide testimonial card at a time, with previous / next buttons, dots, and
 * an automatic change every few seconds. It pauses while the pointer or focus is
 * on it, and does not auto-advance for people who prefer reduced motion. Every
 * quote stays in the page's HTML; the others are only hidden visually.
 */
export default function TestimonialCarousel({ quotes }: { quotes: readonly Quote[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // A visible pause button, for touch users and anyone who wants to read in peace.
  const [stopped, setStopped] = useState(false);
  const count = quotes.length;
  const many = count > 1;

  useEffect(() => {
    if (!many || paused || stopped) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, stopped, many, count]);

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="grid" aria-live={many && !stopped ? "off" : "polite"}>
        {quotes.map((quote, i) => {
          const active = i === index;
          return (
            <blockquote
              key={quote.text}
              aria-hidden={!active}
              className="col-start-1 row-start-1 flex flex-col justify-center rounded-md border border-green/30 bg-white/[0.04] px-7 py-9 transition-opacity duration-500 motion-reduce:transition-none sm:px-12 sm:py-12"
              style={{ opacity: active ? 1 : 0, visibility: active ? "visible" : "hidden" }}
            >
              <p className="font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-h3)", lineHeight: 1.25 }}>
                “{quote.text}”
              </p>
              <cite className="mt-6 block not-italic text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
                <strong className="font-semibold text-green">{quote.by}</strong>
                {quote.role ? <span>, {quote.role}</span> : null}
              </cite>
            </blockquote>
          );
        })}
      </div>

      {many ? (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="group" aria-label="Choose a testimonial">
            {quotes.map((quote, i) => (
              <button
                key={quote.text}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1} of ${count}`}
                aria-current={i === index}
                className="group flex h-8 items-center justify-center px-1"
              >
                <span className={`block h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-green" : "w-2.5 bg-white/30 group-hover:bg-white/60"}`} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setStopped((value) => !value)} aria-label={stopped ? "Play testimonials" : "Pause testimonials"} className="flex size-11 items-center justify-center rounded-full border border-white/25 text-fg-on-dark transition-colors hover:border-green hover:text-green">
              {stopped ? <Play className="size-4" strokeWidth={2.2} /> : <Pause className="size-4" strokeWidth={2.2} />}
            </button>
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial" className="flex size-11 items-center justify-center rounded-full border border-white/25 text-fg-on-dark transition-colors hover:border-green hover:text-green">
              <ChevronLeft className="size-5" strokeWidth={2.2} />
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial" className="flex size-11 items-center justify-center rounded-full border border-white/25 text-fg-on-dark transition-colors hover:border-green hover:text-green">
              <ChevronRight className="size-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
