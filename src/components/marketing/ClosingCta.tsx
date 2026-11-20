"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { isLowPerfDevice } from "@/lib/performance";
import ContactCta from "@/components/marketing/ContactCta";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const CTA_BUTTON_CLASS =
  "min-h-[40px]! bg-[#eef0ee]! px-5! text-[length:calc(var(--text-small)+1px)]! text-[#0a0a0a]! hover:bg-[#e3e6e2]!";

export default function ClosingCta({
  heading = "Let's change the way your team works in the AI era",
  sub = null,
}: {
  heading?: ReactNode;
  sub?: ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);
  // The WebGL shader is decoration: only wide screens with a mouse and a
  // capable device get it, and only once the card is about to be seen.
  const [isDesktop, setIsDesktop] = useState(false);
  const [nearView, setNearView] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const update = () => setIsDesktop(media.matches && !isLowPerfDevice());
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !isDesktop) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setNearView(true);
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <section
      className="relative w-full overflow-hidden bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div
        ref={cardRef}
        className="relative z-10 mx-auto w-full max-w-7xl overflow-hidden rounded-md border border-emerald/15"
        onMouseEnter={() => isDesktop && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex min-h-[450px] flex-col items-center justify-center overflow-hidden bg-[var(--surface-dark-2)] shadow-sm duration-500 md:min-h-[450px]">
          <CanvasRevealEffect
            colors={[[0, 223, 130], [3, 98, 76], [255, 255, 255]]}
            containerClassName="pointer-events-none absolute inset-0 !bg-transparent opacity-45 [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_74%)] [@media(min-width:1024px)_and_(hover:hover)]:hidden"
            dotSize={2}
            showGradient={false}
          />
          {isDesktop && nearView ? (
            <Suspense fallback={<div className="pointer-events-none absolute inset-0 bg-white/[0.03]" />}>
              <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen">
                <Dithering
                  colorBack="#00000000"
                  colorFront="#00DF82"
                  shape="warp"
                  type="4x4"
                  speed={!onScreen ? 0 : isHovered ? 0.6 : 0.2}
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

            <ContactCta variant="metal" tone="light" className={CTA_BUTTON_CLASS} />
          </div>
        </div>
      </div>
    </section>
  );
}
