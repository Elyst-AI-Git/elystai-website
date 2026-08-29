"use client";

import { ArrowRight } from "lucide-react";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import BookingButton from "@/components/marketing/BookingButton";
import { BrandButton } from "@/components/ui/brand-button";
import type { BookingIntent } from "@/lib/booking";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const CTA_BUTTON_CLASS =
  "group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full! bg-green! px-12! text-base! font-medium! text-ink! transition-all! duration-300! hover:bg-green-mid! hover:scale-105! active:scale-95! hover:ring-4! hover:ring-green/20!";

function CtaButton({
  intent,
  href,
  buttonLabel,
}: {
  intent: BookingIntent;
  href: string;
  buttonLabel: string;
}) {
  const content = (
    <>
      <span className="relative z-10">{buttonLabel}</span>
      <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );

  if (intent === "training") {
    return (
      <BookingButton intent={intent} variant="solid" tone="green" className={CTA_BUTTON_CLASS}>
        {content}
      </BookingButton>
    );
  }

  return (
    <BrandButton href={href} variant="solid" tone="green" className={CTA_BUTTON_CLASS}>
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
    <section className="w-full bg-surface-dark py-12 flex justify-center items-center px-4 md:px-6">
      <div
        className="w-full max-w-7xl relative"
        onMouseEnter={() => isDesktop && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[48px] border border-white/10 bg-[var(--surface-dark-2)] shadow-sm min-h-[600px] md:min-h-[600px] flex flex-col items-center justify-center duration-500">
          {isDesktop ? (
            <Suspense fallback={<div className="absolute inset-0 bg-white/[0.03]" />}>
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
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

          <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-green/25 bg-green/5 px-4 py-1.5 text-[length:var(--text-small)] font-medium text-green backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green opacity-75 md:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              One workflow at a time
            </div>

            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-fg-on-dark mb-8 leading-[1.05]">
              {heading}
            </h2>

            {sub ? (
              <p className="text-fg-muted-dark text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
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
