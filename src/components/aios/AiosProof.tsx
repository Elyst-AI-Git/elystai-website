"use client";

import { useRef, useState } from "react";
import { Building2, MapPin, Sparkles } from "lucide-react";
import DitherShader from "@/components/ui/dither-shader";

/**
 * Direction A — founder-led, dithering portrait. Deliberate callback to
 * `home-founders` (same Bayer-dither + cursor-reveal mechanic), but
 * Nihal-only — single card, AIOS-register, not the Home two-up grid.
 *
 * HONESTY CONSTRAINT (BLUEPRINT §13 / NOTES.md): AIOS social proof is thin
 * until the Dubai pilot is public. No invented testimonials, logos, or
 * metrics — only what's true today: the founder, the registered LLP, the
 * build-per-client philosophy, and a clearly-marked slot for the pilot
 * outcome the moment it's live. No quote card — there's nothing real to
 * put in it yet, and an empty honest section beats a fabricated one.
 */

const REVEAL_RADIUS = 130;

function NihalPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const mask = pos
    ? `radial-gradient(circle ${REVEAL_RADIUS}px at ${pos.x}px ${pos.y}px, #000 0%, #000 55%, transparent 78%)`
    : undefined;

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos(null)}
      className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-square"
      style={{ borderRadius: "var(--radius-xl)" }}
    >
      {/* Dithered base — always visible, the "signal noise" treatment */}
      <div className="absolute inset-0">
        <DitherShader
          src="/images/founders/nihal.jpg"
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="#03624C"
          secondaryColor="#F5F8F6"
          gridSize={5}
          brightness={0.05}
          contrast={1.15}
          objectFit="cover"
          className="h-full w-full"
        />
      </div>
      {/* Real photo — revealed under the cursor (desktop) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/founders/nihal.jpg"
        alt="Nihal Anas"
        className="absolute inset-0 hidden h-full w-full object-cover object-top transition-opacity duration-200 md:block"
        style={{ opacity: pos ? 1 : 0, WebkitMaskImage: mask, maskImage: mask }}
      />
      {/* Mobile — real photo shown plainly (no hover available) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/founders/nihal.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-top md:hidden"
      />
    </div>
  );
}

export default function AiosProof() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Behind AIOS</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Built and run by the person you&rsquo;ll work with.
          </h2>
        </div>

        <div className="card mx-auto mt-14 grid max-w-3xl grid-cols-1 overflow-hidden sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <NihalPortrait />

          <div className="flex flex-col justify-center gap-3 p-8 sm:p-10">
            <h3 className="font-display text-fg" style={{ fontSize: "var(--text-h3)" }}>
              Nihal Anas
            </h3>
            <span className="chip w-fit" style={{ fontSize: "0.72rem" }}>
              Chief AI Officer · AIOS
            </span>
            <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.6 }}>
              AIOS is configured per client and supported directly by the team
              that built it — not handed off to a faceless support queue. If
              you book a call, you&rsquo;re talking to the person who builds and
              runs it.
            </p>

            {/* Honest signal strip — real signals only, no fabricated metrics */}
            <div className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
              <div className="flex items-center gap-2.5 text-fg-3" style={{ fontSize: "var(--text-small)" }}>
                <Building2 className="h-4 w-4 shrink-0 text-emerald" />
                Elyst AI LLP · registered company
              </div>
              <div className="flex items-center gap-2.5 text-fg-3" style={{ fontSize: "var(--text-small)" }}>
                <MapPin className="h-4 w-4 shrink-0 text-emerald" />
                Kozhikode, Kerala — building for India and the GCC
              </div>
              <div
                className="flex items-center gap-2.5"
                style={{ fontSize: "var(--text-small)", color: "var(--fg-3)" }}
              >
                <Sparkles className="h-4 w-4 shrink-0 text-emerald" />
                <span className="italic">[Dubai pilot outcome — add when live]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
