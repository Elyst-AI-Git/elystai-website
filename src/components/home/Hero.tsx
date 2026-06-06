"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarkDither from "@/components/site/MarkDither";
import { EncryptedText } from "@/components/ui/encrypted-text";

export default function Hero() {
  return (
    <section
      className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[3fr_2fr]"
      style={{
        padding: "clamp(40px, 5vw, 72px) var(--section-px)",
      }}
    >
      {/* Left — copy */}
      <div>
        <h1
          className="text-fg"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <EncryptedText text="AI that runs" />
          <br />
          <EncryptedText text="your business" revealDelayMs={42} />
          <br />
          <EncryptedText text="Programs that" revealDelayMs={38} />
          <br />
          <EncryptedText text="make you grow" revealDelayMs={44} />
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
    </section>
  );
}
