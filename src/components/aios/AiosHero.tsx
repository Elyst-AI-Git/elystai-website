"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
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
      style={{ padding: "clamp(80px, 12vw, 150px) var(--section-px)" }}
    >
      {/* Cursor-reactive flowing-line canvas — deep-emerald trail on white */}
      <canvas
        id="canvas"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto flex w-fit max-w-2xl flex-col items-center px-10 py-8 text-center md:px-14 md:py-10">
        {/* Corner brackets framed close to the centered content */}
        <Corner position="tl" />
        <Corner position="tr" />
        <Corner position="bl" />
        <Corner position="br" />

        <span className="chip">AIOS for Business</span>

        <h1
          className="mt-6 text-fg"
          style={{ fontSize: "clamp(3.3rem, 6.8vw, 5.7rem)", lineHeight: 1.08 }}
        >
          It&rsquo;s time to work
          <br />
          the AI way
        </h1>

        {/* Availability indicator */}
        <div
          className="mt-8 flex items-center gap-2 font-semibold"
          style={{ fontSize: "var(--text-small)", color: "var(--elyst-emerald)" }}
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background: "var(--elyst-green)",
              boxShadow: "0 0 10px 1px var(--elyst-green)",
            }}
          />
          Available Now
        </div>

        <div className="mt-8">
          <BrandButton href="/contact" tone="green">
            Book a call
            <ArrowRight className="h-4 w-4" />
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
