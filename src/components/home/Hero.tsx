"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarkDither from "@/components/site/MarkDither";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Hero() {
  return (
    <section style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[3fr_2fr]">
        {/* Left — copy */}
        <div>
          <h1 className="text-fg" style={{ fontSize: "var(--text-hero)", lineHeight: 1.08 }}>
            <span className="block">AI that</span>
            {/* TextHoverEffect for "runs" — brand emerald draw-in + cursor gradient */}
            <span
              className="block"
              style={{ height: "calc(var(--text-hero) * 1.18)", width: "100%" }}
            >
              <TextHoverEffect text="runs" duration={0.3} />
            </span>
            <span className="block" style={{ marginTop: "calc(var(--text-hero) * -0.05)" }}>
              your business
            </span>
            {/* Extra breathing room between the two phrases */}
            <span className="block" style={{ height: "clamp(8px, 1.2vw, 18px)" }} />
            <span className="block">Programs that</span>
            <span className="block">make you grow</span>
          </h1>

          <p
            className="mt-5 max-w-md text-fg-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            We setup AI into your businesses and teach you how to use it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/aios" className="btn btn-primary btn-pill">
              See AIOS
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/learn" className="btn btn-ghost btn-pill">
              Explore programs
            </Link>
          </div>
        </div>

        {/* Right — mark-forming dither (desktop) */}
        <div
          className="hidden self-stretch overflow-hidden rounded-card md:block"
          style={{ background: "#F5F8F6", minHeight: "400px" }}
        >
          <MarkDither colorFront="#03624C" colorBack="#F5F8F6" />
        </div>

        {/* Mobile band */}
        <div
          className="h-44 overflow-hidden rounded-card md:hidden"
          style={{ background: "#F5F8F6" }}
        >
          <MarkDither colorFront="#03624C" colorBack="#F5F8F6" pixelSize={4} />
        </div>
      </div>
    </section>
  );
}
