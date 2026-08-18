"use client";

import MarkDither from "@/components/site/MarkDither";
import { BrandButton } from "@/components/ui/brand-button";
import TrackedBookingButton from "@/components/marketing/TrackedBookingButton";
import { CometCard } from "@/components/ui/comet-card";

export default function Hero() {
  return (
    <section style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[3fr_2fr]">
        {/* Left — copy */}
        <div>
          <h1 className="text-fg" style={{ fontSize: "clamp(2.6rem, 5.7vw, 5.25rem)", lineHeight: 1.08 }}>
            Don&apos;t just use AI, we <span className="hero-accent-word">change</span> how your team work with it.
          </h1>

          <p
            className="mt-5 max-w-2xl text-fg-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            We audit how your company work, identify ways which AI can elevate
            the business, build the right AI system, and train your team to run
            it.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TrackedBookingButton intent="audit" tone="green">
              Book an audit call
            </TrackedBookingButton>
            <BrandButton href="#how-we-work" variant="outline">
              See how we work
            </BrandButton>
          </div>
        </div>

        {/* Right — mark-forming dither (desktop) */}
        <CometCard className="hidden self-stretch md:block">
          <div
            className="overflow-hidden rounded-card"
            style={{ background: "#F5F8F6", height: "480px" }}
          >
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" />
          </div>
        </CometCard>

        {/* Mobile band */}
        <CometCard className="md:hidden">
          <div
            className="h-[211px] overflow-hidden rounded-card"
            style={{ background: "#F5F8F6" }}
          >
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" pixelSize={4} />
          </div>
        </CometCard>
      </div>
    </section>
  );
}
