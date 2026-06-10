"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Footer starfield is decorative and lives below the fold on every page, yet
 * its two canvas/SVG animation loops ran from first paint site-wide — a
 * meaningful chunk of main-thread work for something nobody sees until they
 * scroll. This gate mounts the animations only once the footer is near the
 * viewport, and skips them entirely when the user prefers reduced motion.
 *
 * On touch devices we go further: render a single static starfield (one
 * canvas paint, no RAF loop) and skip the shooting-stars layer entirely —
 * neither is worth a permanent animation loop on a phone.
 */
export default function FooterStarfield() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
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
  }, [prefersReducedMotion]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden>
      {active && isTouch && (
        <StarsBackground
          className="absolute inset-0"
          starDensity={0.00055}
          staticField
        />
      )}
      {active && !isTouch && (
        <>
          <StarsBackground
            className="absolute inset-0"
            starDensity={0.00055}
            allStarsTwinkle
            twinkleProbability={0.85}
            minTwinkleSpeed={0.4}
            maxTwinkleSpeed={1.2}
          />
          <ShootingStars
            className="absolute inset-0"
            starColor="#00df82"
            trailColor="#03624c"
            starWidth={28}
            starHeight={2.5}
            minSpeed={18}
            maxSpeed={42}
            minDelay={500}
            maxDelay={2200}
          />
        </>
      )}
    </div>
  );
}
