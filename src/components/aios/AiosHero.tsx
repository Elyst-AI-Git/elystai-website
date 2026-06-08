"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";
import { renderCanvas } from "@/components/ui/canvas";

/** Decorative L-bracket that frames a corner of the hero. */
function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-8 w-8 border-fg-on-dark/25";
  const map: Record<typeof position, string> = {
    tl: "left-5 top-5 border-l-2 border-t-2 md:left-8 md:top-8",
    tr: "right-5 top-5 border-r-2 border-t-2 md:right-8 md:top-8",
    bl: "bottom-5 left-5 border-b-2 border-l-2 md:bottom-8 md:left-8",
    br: "bottom-5 right-5 border-b-2 border-r-2 md:bottom-8 md:right-8",
  };
  return <span aria-hidden className={`${base} ${map[position]}`} />;
}

export default function AiosHero() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--surface-dark)",
        padding: "clamp(72px, 11vw, 132px) var(--section-px)",
      }}
    >
      {/* Cursor-reactive flowing-line canvas — brand-green trail */}
      <canvas
        id="canvas"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="chip">AIOS for Business</span>

        <h1
          className="mt-6 text-fg-on-dark"
          style={{ fontSize: "var(--text-h1)", lineHeight: 1.12 }}
        >
          It&rsquo;s time to work
          <br />
          the AI way
        </h1>

        <p
          className="mt-5 max-w-xl"
          style={{ fontSize: "var(--text-body)", color: "rgba(255,255,255,0.72)" }}
        >
          Built for teams of 5–50 with no technical staff, across India and the
          GCC. Message it like a colleague — it answers, drafts, and acts.
        </p>

        {/* Availability indicator */}
        <div
          className="mt-7 flex items-center gap-2 font-semibold"
          style={{ fontSize: "var(--text-small)", color: "var(--elyst-green)" }}
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
          className="mt-4"
          style={{ fontSize: "var(--text-small)", color: "rgba(255,255,255,0.5)" }}
        >
          Your team learns nothing new — it already lives in WhatsApp.
        </p>
      </div>
    </section>
  );
}
