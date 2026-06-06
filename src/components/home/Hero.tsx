"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MarkDither from "@/components/site/MarkDither";
import { EncryptedText } from "@/components/ui/encrypted-text";

export default function Hero() {
  return (
    <section
      className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      {/* Left — copy */}
      <div className="flex flex-col justify-center">
        <span className="chip">Kozhikode · Kerala · India &amp; GCC</span>
        <h1
          className="mt-6 text-fg"
          style={{ fontSize: "var(--text-hero)" }}
        >
          <EncryptedText text="AI that runs your business." />
          <br />
          <EncryptedText
            text="Programs that grow your people."
            revealDelayMs={40}
          />
        </h1>
        <p
          className="mt-5 max-w-prose text-fg-2"
          style={{ fontSize: "var(--text-body)" }}
        >
          We deploy AI into how businesses run — and teach people to use it.
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

        <p className="mt-5 text-small text-fg-3">
          Configured and deployed for your business. Nothing to install.
        </p>
      </div>

      {/* Right — mark-forming dither (desktop) — pulled up */}
      <div
        className="hidden overflow-hidden rounded-card md:block md:-mt-16 md:h-[560px]"
        style={{ background: "#F5F8F6" }}
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
