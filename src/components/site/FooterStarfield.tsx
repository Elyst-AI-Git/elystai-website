"use client";

import { useEffect, useRef, useState } from "react";
import { StarsBackground } from "@/components/ui/stars-background";

/**
 * Footer starfield is purely decorative and lives below the fold on every page.
 * It renders a single static star canvas (one paint, no animation loop and no
 * shooting-stars layer) — mounted only once the footer is near the viewport so
 * the canvas paint happens lazily rather than on first paint site-wide.
 */
export default function FooterStarfield() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {active && (
        <StarsBackground className="absolute inset-0" starDensity={0.00055} />
      )}
    </div>
  );
}
