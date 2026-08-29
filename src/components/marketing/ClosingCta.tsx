"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import BookingButton from "@/components/marketing/BookingButton";
import MarkDither from "@/components/site/MarkDither";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { SectionMark } from "@/components/ui/section-mark";
import { BrandButton } from "@/components/ui/brand-button";
import type { BookingIntent } from "@/lib/booking";

function CtaAction({
  intent,
  href,
  buttonLabel,
  variant,
}: {
  intent: BookingIntent;
  href: string;
  buttonLabel: string;
  variant: "metal" | "solid";
}) {
  const content = (
    <>
      <span>{buttonLabel}</span>
      <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
    </>
  );

  if (intent === "training") {
    return (
      <BookingButton intent={intent} variant={variant} tone="green" full>
        {content}
      </BookingButton>
    );
  }

  return (
    <BrandButton href={href} variant={variant} tone="green" full>
      {content}
    </BrandButton>
  );
}

function LightweightDither({ hovered }: { hovered: boolean }) {
  return <div aria-hidden className="cta-lightweight-dither absolute inset-0" data-hovered={hovered} />;
}

export default function ClosingCta({
  heading = "Change how your team uses AI at work.",
  sub = "Bring tasks that take too long and we will tell you if AI is the answer.",
  buttonLabel = "See how we work",
  intent = "identify",
  href = "/services",
}: {
  heading?: ReactNode;
  sub?: ReactNode;
  buttonLabel?: string;
  intent?: BookingIntent;
  href?: string;
}) {
  const [shaderHovered, setShaderHovered] = useState(false);

  return (
    <section
      className="relative overflow-hidden bg-surface-dark"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />
      <div aria-hidden className="pointer-events-none absolute left-[var(--section-px)] right-[var(--section-px)] top-0 border-t border-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark tone="dark">Start with one workflow</SectionMark>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            {heading}
          </h2>
          {sub ? (
            <p className="mx-auto mt-4 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
              {sub}
            </p>
          ) : null}
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <article className="group relative flex min-h-[18rem] flex-col overflow-hidden border border-white/15 bg-[#101612] p-6 sm:p-7">
            <div className="pointer-events-none absolute inset-0 opacity-45 transition-opacity duration-500 group-hover:opacity-70">
              <MarkDither colorFront="#00df82" colorBack="#101612" pixelSize={5} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface-dark)] via-[var(--surface-dark)]/55 to-transparent" />
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              <span className="font-mono text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                [ 01 / MARK FIELD ]
              </span>
              <h3 className="mt-5 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-card)" }}>
                The landing-page dither.
              </h3>
              <p className="mt-3 text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                The existing Elyst mark effect carries the CTA in the background.
              </p>
              <div className="mt-auto pt-8">
                <CtaAction intent={intent} href={href} buttonLabel={buttonLabel} variant="solid" />
              </div>
            </div>
          </article>

          <article className="group relative flex min-h-[18rem] flex-col overflow-hidden border border-emerald/35 bg-[var(--surface-dark)] p-6 transition-colors duration-500 hover:border-green/65 sm:p-7">
            <CanvasRevealEffect
              colors={[[0, 223, 130], [3, 98, 76], [255, 255, 255]]}
              containerClassName="absolute inset-0"
              dotSize={2}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--surface-dark)]/30 via-transparent to-[var(--surface-dark)]/90" />
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              <span className="font-mono text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                [ 02 / STATIC CARD ]
              </span>
              <h3 className="mt-5 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-card)" }}>
                The card field.
              </h3>
              <p className="mt-3 text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                The same static dot treatment used by the experimental cards.
              </p>
              <div className="mt-auto pt-8">
                <CtaAction intent={intent} href={href} buttonLabel={buttonLabel} variant="metal" />
              </div>
            </div>
          </article>

          <article
            className="group relative flex min-h-[18rem] flex-col overflow-hidden border border-white/15 bg-[var(--surface-dark-2)] p-6 sm:p-7"
            onMouseEnter={() => setShaderHovered(true)}
            onMouseLeave={() => setShaderHovered(false)}
          >
            <LightweightDither hovered={shaderHovered} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface-dark)]/95 via-[var(--surface-dark)]/55 to-transparent" />
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              <span className="font-mono text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                [ 03 / LIGHT SHADER ]
              </span>
              <h3 className="mt-5 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-card)" }}>
                The lightweight shader.
              </h3>
              <p className="mt-3 text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                A lower-cost warp field that only accelerates on desktop hover.
              </p>
              <div className="mt-auto pt-8">
                <CtaAction intent={intent} href={href} buttonLabel={buttonLabel} variant="solid" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
