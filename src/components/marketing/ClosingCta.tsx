"use client";

import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import BookingButton from "@/components/marketing/BookingButton";
import { BrandButton } from "@/components/ui/brand-button";
import type { BookingIntent } from "@/lib/booking";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const CTA_BUTTON_CLASS =
  "min-h-[40px]! bg-[#eef0ee]! px-5! text-[length:calc(var(--text-small)+1px)]! text-[#0a0a0a]! hover:bg-[#e3e6e2]!";

function CtaButton({
  intent,
  href,
  buttonLabel,
}: {
  intent: BookingIntent;
  href: string;
  buttonLabel: string;
}) {
  const content = <span>{buttonLabel}</span>;

  if (intent === "training") {
    return (
      <BookingButton intent={intent} variant="metal" tone="light" className={CTA_BUTTON_CLASS}>
        {content}
      </BookingButton>
    );
  }

  return (
    <BrandButton href={href} variant="metal" tone="light" className={CTA_BUTTON_CLASS}>
      {content}
    </BrandButton>
  );
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
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div
        className="relative z-10 mx-auto w-full max-w-7xl overflow-hidden rounded-md border border-emerald/15"
        onMouseEnter={() => isDesktop && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex min-h-[450px] flex-col items-center justify-center overflow-hidden bg-[var(--surface-dark-2)] shadow-sm duration-500 md:min-h-[450px]">
          {isDesktop ? (
            <Suspense fallback={<div className="absolute inset-0 bg-white/[0.03]" />}>
              <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen">
                <Dithering
                  colorBack="#00000000"
                  colorFront="#00DF82"
                  shape="warp"
                  type="4x4"
                  speed={isHovered ? 0.6 : 0.2}
                  className="size-full"
                  minPixelRatio={1}
                />
              </div>
            </Suspense>
          ) : null}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--surface-dark-2)]/35" />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
            <h2 className="mb-6 font-display font-medium leading-[1.05] tracking-[-0.044em] text-fg-on-dark" style={{ fontSize: "var(--text-cta)" }}>
              {heading}
            </h2>

            {sub ? (
              <p className="mb-9 max-w-2xl text-lg leading-relaxed text-fg-on-dark md:text-xl">
                {sub}
              </p>
            ) : null}

            <CtaButton intent={intent} href={href} buttonLabel={buttonLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
