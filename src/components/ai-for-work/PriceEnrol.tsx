"use client";

import type { ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import { BrandButton } from "@/components/ui/brand-button";
import {
  PRICE,
  ORIGINAL_PRICE,
  CIRCLE_PRICE,
  START_DATE,
  VALUE_STACK,
} from "./config";

/**
 * Price & Enrol — a dark-green ticket card on the page's plain white
 * background, finished with a grainy hard-paper texture (feTurbulence noise,
 * not a gradient). Edge ribbons carry the cohort start date and the
 * Circle-member price; a perforated tear separates the price from the
 * included list below.
 */

const included = VALUE_STACK.slice(0, 4);

/** Metallic ribbon chip — identical treatment to the How It Works
    "4 to 5 hours a week" time-commitment strip. */
function MetalChip({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-4 py-1.5 font-bold ${className ?? ""}`}
      style={{
        background: "#ffffff",
        color: "#0A0F0C",
        borderTop: "1px solid rgba(255,255,255,0.95)",
        borderBottom: "1px solid rgba(3,98,76,0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 2px 6px rgba(3,98,76,0.12)",
        fontSize: "var(--text-small)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Grainy hard-paper texture — feTurbulence noise, not a gradient. */
function GrainTexture() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
      }}
    />
  );
}

/** The ticket "tear" — a dashed perforation with punched-out circles on each
    edge, in the page's white background so they read as cut-outs. */
function Perforation() {
  return (
    <div className="relative h-0">
      <span aria-hidden className="absolute -left-3.5 -top-3.5 h-7 w-7 rounded-full bg-white" />
      <span aria-hidden className="absolute -right-3.5 -top-3.5 h-7 w-7 rounded-full bg-white" />
      <div className="absolute left-5 right-5 top-0 border-t-2" style={{ borderColor: "rgba(255,255,255,0.25)", borderStyle: "dashed" }} />
    </div>
  );
}

export default function PriceEnrol() {
  return (
    <section id="enrol" className="scroll-mt-24 bg-white" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <SectionMark>Pricing</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            One price.
            <br />
            <span className="whitespace-nowrap">Everything included.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mt-12 overflow-hidden rounded-[28px]"
          style={{ background: "var(--elyst-emerald)", boxShadow: "0 30px 80px -28px rgba(3,98,76,0.45)" }}
        >
          <GrainTexture />

          {/* Top stub — edge ribbons + price */}
          <div className="relative overflow-hidden px-8 pt-9 pb-12 text-center">
            {/* Edge ribbons — top-left cohort start, top-right Circle price */}
            <MetalChip className="absolute left-0 top-6 z-10 rounded-l-none">Starts {START_DATE}</MetalChip>
            <MetalChip className="absolute right-0 top-6 z-10 rounded-r-none">{CIRCLE_PRICE} for Circle members</MetalChip>

            <div className="relative z-[5] mt-16">
              <div className="flex items-end justify-center gap-2.5">
                <span
                  className="font-display font-bold text-fg-on-dark"
                  style={{ fontSize: "calc(var(--text-hero) - 4px)", lineHeight: 1, letterSpacing: "-0.0236em" }}
                >
                  {PRICE}
                </span>
                <span
                  className="font-display font-semibold line-through"
                  style={{ fontSize: "var(--text-h3)", lineHeight: 1.3, color: "rgba(240,250,248,0.5)" }}
                >
                  {ORIGINAL_PRICE}
                </span>
              </div>
              <p className="mt-3 font-semibold" style={{ fontSize: "var(--text-small)", color: "var(--elyst-green)" }}>
                Save 40% &mdash; Exclusive for Batch 1
              </p>
            </div>
          </div>

          <Perforation />

          {/* Bottom stub — included list + CTA */}
          <div className="relative px-8 pt-10 pb-8">
            <ul className="flex flex-col gap-3.5">
              {included.map((item) => (
                <li
                  key={item}
                  className="border-b pb-3.5 text-fg-on-dark last:border-0 last:pb-0"
                  style={{ borderColor: "rgba(255,255,255,0.14)", fontSize: "var(--text-small)" }}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3">
              <BrandButton href="/register" tone="green" full>
                Join now
              </BrandButton>
              <BrandButton href="https://wa.me/919633288931" variant="outline" tone="emerald" className="border-white! bg-transparent! text-white! hover:bg-white/10!" full>
                Enquire first
              </BrandButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
