"use client";

import { useEffect } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { renderCanvas } from "@/components/ui/canvas";

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
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-bg"
      style={{
        // Tight to the navbar up top; the extra white space lives below the
        // content instead, so the section stays tall without a big top gap.
        paddingTop: "clamp(30px, 5vw, 80px)",
        paddingBottom: "clamp(60px, 8.5vw, 150px)",
        paddingLeft: "var(--section-px)",
        paddingRight: "var(--section-px)",
      }}
    >
      {/* Cursor-reactive flowing-line canvas — deep-emerald trail on white */}
      <canvas
        id="canvas"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto flex w-fit max-w-4xl flex-col items-center px-12 py-8 text-center md:px-16 md:py-10">
        {/* Corner brackets framed close to the centered content */}
        <Corner position="tl" />
        <Corner position="tr" />
        <Corner position="bl" />
        <Corner position="br" />

        <span className="chip">AIOS for Business</span>

        <h1
          className="mt-6 text-fg"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5.1rem)", lineHeight: 1.08 }}
        >
          <span className="block whitespace-nowrap">It&rsquo;s time to work,</span>
          <span className="block whitespace-nowrap">
            the <span style={{ color: "#00df82" }}>AI way</span>
          </span>
        </h1>

        <div className="mt-10">
          <BrandButton href="/contact" tone="green">
            Book a call
          </BrandButton>
        </div>

        <p
          className="mt-4 text-fg-3"
          style={{ fontSize: "var(--text-small)" }}
        >
          Your team learns nothing new — it already lives in WhatsApp.
        </p>
      </div>
    </section>
  );
}
