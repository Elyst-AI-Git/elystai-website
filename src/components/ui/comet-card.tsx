"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsTouch } from "@/lib/use-touch";

/**
 * A card that tilts toward the pointer and shows a glare. Pointer movement
 * only writes four CSS variables; the tilt, lift and glare are CSS. Touch
 * devices get a plain card.
 */
export const CometCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const isTouch = useIsTouch();

  const set = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", String(x));
    el.style.setProperty("--my", String(y));
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || frame.current) return;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      set((clientX - rect.left) / rect.width - 0.5, (clientY - rect.top) / rect.height - 0.5);
    });
  };

  const onLeave = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    set(0, 0);
  };

  if (isTouch) {
    return (
      <div className={cn("perspective-distant transform-3d", className)}>
        <div className="relative rounded-2xl">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("perspective-distant transform-3d", className)}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="comet-card relative rounded-2xl">
        {children}
        <div aria-hidden className="comet-card__glare pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay" />
      </div>
    </div>
  );
};
