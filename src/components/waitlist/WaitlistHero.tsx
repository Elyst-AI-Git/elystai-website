"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import WaitlistForm from "./WaitlistForm";

/**
 * "AI at Work" waitlist hero. The reference artwork (aurora rays converging on
 * a glowing doorway, a figure walking toward it) is used directly as a
 * full-bleed background image starting at the very top of the page, behind the
 * floating nav. The image is dimmed and a layered scrim sits over it so the
 * copy and form stay highly legible; the form sits low-centre, on the
 * threshold of the doorway glow. The section fills the viewport so the footer
 * follows immediately with no empty gap.
 */
export default function WaitlistHero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "var(--surface-dark)" }}
    >
      {/* This page is dark top-to-bottom. The global footer fades from --bg
          (white) into --surface-dark to transition off white page content;
          here we point --bg at the dark surface so that transition becomes
          dark→dark and the hero flows smoothly into the footer with no white
          band. Scoped to this page — removed automatically on navigation. */}
      <style>{`body{--bg:var(--surface-dark)}`}</style>

      {/* Full-bleed reference artwork — dimmed for text contrast */}
      <Image
        src="/images/waitlist-hero.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ opacity: 0.5 }}
      />

      {/* Legibility scrim — darkens the frame and adds a soft pool behind the
          centred copy so the heading/subhead read cleanly over the aurora. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(2,8,6,0.7) 0%, rgba(2,8,6,0.35) 55%, transparent 100%), linear-gradient(to bottom, rgba(2,8,6,0.65) 0%, rgba(2,8,6,0.3) 40%, transparent 75%)",
        }}
      />

      {/* Bottom fade — dissolves the textured artwork into the solid
          --surface-dark used by the footer so the two meet with no seam. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--surface-dark) 88%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 pt-28 pb-16 text-center"
      >
        <SectionMark tone="dark">Coming soon</SectionMark>

        <h1
          className="font-display font-bold text-white"
          style={{
            fontSize: "clamp(4.025rem, 10.35vw, 7.475rem)",
            lineHeight: 1.05,
            textShadow: "0 2px 24px rgba(0,0,0,0.55)",
          }}
        >
          AI for Work
        </h1>

        <p
          className="max-w-lg text-white/90"
          style={{
            fontSize: "var(--text-body)",
            textShadow: "0 1px 12px rgba(0,0,0,0.7)",
          }}
        >
          The deep-dive program for professionals who want to put AI to work in
          their day-to-day. Join the waitlist and we&rsquo;ll be in touch the
          moment the doors open.
        </p>

        <div className="mt-4 w-full">
          <WaitlistForm />
        </div>
      </motion.div>
    </section>
  );
}
