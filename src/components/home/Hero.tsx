"use client";

import { ArrowRight } from "lucide-react";
import MarkDither from "@/components/site/MarkDither";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { BrandButton } from "@/components/ui/brand-button";
import { CometCard } from "@/components/ui/comet-card";

export default function Hero() {
  return (
    <section style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[3fr_2fr]">
        {/* Left — copy */}
        <div>
          <h1 className="text-fg" style={{ fontSize: "var(--text-hero)", lineHeight: 1.08 }}>
            <span className="block">
              AI that <span className="runs-word">runs</span>
            </span>
            <span className="block" style={{ marginTop: "calc(var(--text-hero) * -0.27)" }}>
              your business
            </span>
            {/* Extra breathing room between the two phrases */}
            <span className="block" style={{ height: "clamp(8px, 1.2vw, 18px)" }} />
            <span className="block">AI programs that</span>
            <span className="block" style={{ marginTop: "calc(var(--text-hero) * -0.27)" }}>
              make you{" "}
              <PointerHighlight
                containerClassName="inline-block align-baseline"
                rectangleClassName="border-[4px] !border-[#00df82] translate-y-[15px]"
                pointerClassName="text-[#00df82]"
              >
                <span className="relative z-10 block py-0 pl-1 pr-2.5 leading-[1.15]">grow</span>
              </PointerHighlight>
            </span>
          </h1>

          <p
            className="mt-5 max-w-md text-fg-2 md:max-w-none md:whitespace-nowrap"
            style={{ fontSize: "var(--text-body)" }}
          >
            We setup AI into your businesses and teach you how to use it.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BrandButton href="/aios" tone="green">
              See AIOS
              <ArrowRight className="h-4 w-4" />
            </BrandButton>
            <BrandButton href="/learn" variant="outline">
              Explore programs
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
