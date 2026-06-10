"use client";

import { useEffect } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { BrandButton } from "@/components/ui/brand-button";
import { renderCanvas } from "@/components/ui/canvas";
import { useIsTouch } from "@/lib/use-touch";

/** Decorative L-bracket that frames a corner of the centered content box. */
function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-6 w-6 border-fg-3/40";
  const map: Record<typeof position, string> = {
    tl: "left-2 top-2 border-l-2 border-t-2 md:left-4 md:top-4",
    tr: "right-2 top-2 border-r-2 border-t-2 md:right-4 md:top-4",
    bl: "bottom-2 left-2 border-b-2 border-l-2 md:bottom-4 md:left-4",
    br: "bottom-2 right-2 border-b-2 border-r-2 md:bottom-4 md:right-4",
  };
  return <span aria-hidden className={`${base} ${map[position]}`} />;
}

export default function AiosHero() {
  // The flowing-line canvas is a continuous RAF loop with mousemove-reactive
  // trails. On phones there's no cursor to react to and the loop just burns
  // CPU forever, so we skip mounting it entirely on touch devices and show a
  // static background instead.
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;
    renderCanvas();
  }, [isTouch]);

  return (
    <section
      className="relative overflow-hidden bg-bg"
      style={{
        paddingTop: "clamp(48px, 5vw, 80px)",
        paddingBottom: "clamp(80px, 8.5vw, 150px)",
        paddingLeft: "var(--section-px)",
        paddingRight: "var(--section-px)",
        minHeight: "clamp(0px, 92svh, 100vh)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Cursor-reactive flowing-line canvas — deep-emerald trail on white.
          Desktop only; phones get a plain background (see isTouch above). */}
      {!isTouch && (
        <canvas
          id="canvas"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}

      <div className="relative z-10 mx-auto flex w-fit max-w-4xl flex-col items-center px-4 py-8 text-center sm:px-12 md:px-16 md:py-10">
        {/* Corner brackets framed close to the centered content */}
        <Corner position="tl" />
        <Corner position="tr" />
        <Corner position="bl" />
        <Corner position="br" />

        <SectionMark>AIOS for Business</SectionMark>

        <h1
          className="mt-6 text-fg"
          style={{ fontSize: "clamp(3.2rem, 6vw, 5.1rem)", lineHeight: 1.08 }}
        >
          <span className="block">It&rsquo;s time to work,</span>
          <span className="block">
            the <span style={{ color: "#03624c" }}>AI way</span>
          </span>
        </h1>

        <div className="mt-10">
          <BrandButton href="https://cal.com/elyst-ai/30min" tone="green">
            Book a call
          </BrandButton>
        </div>

        <p
          className="mt-4 text-fg-3"
          style={{ fontSize: "var(--text-small)" }}
        >
          The AI employee that already knows your whole business.
        </p>
      </div>
    </section>
  );
}
