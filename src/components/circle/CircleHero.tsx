"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";

/**
 * Dark cold-open, mirroring the reference site's "Section 1: Hero (black)",
 * but resolved through this repo's tokens: `--surface-dark` (not a raw
 * `#060d09`) for the panel, `--elyst-green-mid` (`#2ec866`, an exact brand
 * match) for the accent line and dot-grid glow.
 */
export default function CircleHero() {
  return (
    <>
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden bg-surface-dark text-center"
        style={{ minHeight: "69vh", padding: "100px 24px 76px" }}
      >
        {/* Grid-background effect (Aceternity), recoloured to the brand green-mid line + radial fade mask */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(46,200,102,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(46,200,102,0.14) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
        />
        {/* Radial glow behind headline */}
        <div
          className="pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 700,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(46,200,102,0.16) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, var(--surface-dark) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto w-full max-w-[900px]"
        >
          <h1 style={{ lineHeight: 1.0 }}>
            <span className="sr-only">The Elyst AI Circle — </span>
            <span
              className="font-display block font-semibold text-fg-muted-dark"
              style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)" }}
            >
              The people in this circle
            </span>
            <span
              className="font-display mt-1 block font-black tracking-tight text-fg-on-dark"
              style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)", letterSpacing: "-0.03em" }}
            >
              are already
            </span>
            <span
              className="font-display block font-black tracking-tight text-green-mid"
              style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)", letterSpacing: "-0.03em" }}
            >
              ahead of you.
            </span>
          </h1>
          <div className="mt-8 flex flex-col items-center gap-3">
            <BrandButton href="https://nas.io/elystaicircle" tone="green" className="rounded-full!">
              Join them
            </BrandButton>
          </div>
        </motion.div>
      </section>

      {/* Intro split, the turn from dark cold-open into the page proper */}
      <section
        id="what-you-join"
        className="bg-bg"
        style={{ padding: "clamp(72px, 9vw, 120px) var(--section-px)" }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.85 }}>
              At some point, you noticed people around you getting more out of
              AI than you. Not because they&rsquo;re smarter, but because
              they&rsquo;re closer to how it&rsquo;s actually being used. In
              the right rooms, with the right people, applying things you
              haven&rsquo;t seen yet.
            </p>
            <p className="mt-5 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.8 }}>
              That gap doesn&rsquo;t close by following more people on
              LinkedIn.
              <br />
              It closes by being in the right circle.
            </p>
            <p className="mt-5 font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.8 }}>
              This is that circle, Elyst AI Circle.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Image
              src="/images/circle/circle-logo.png"
              alt="Elyst AI Circle"
              width={360}
              height={360}
              className="h-auto w-full max-w-[360px]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
