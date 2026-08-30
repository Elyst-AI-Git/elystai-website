"use client";

import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import { Check } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";

// Removed "Deals in AI" and "Member-Only Events" per user request
const standardFeatures = [
  "Weekly AI Signal",
  "Monthly Catchup Call",
  "The Content Library",
  "The Network",
];

// Removed "A personalised gift from us" per user request
const earlyBirdExtras = [
  "Priority access and offers",
  "Your rate stays locked forever",
];

function PriceCard({
  name,
  ribbon,
  price,
  sub,
  cta,
  href,
  highlighted,
  index,
}: {
  name: string;
  ribbon?: string;
  price: string;
  sub: React.ReactNode;
  cta: string;
  href?: string;
  highlighted?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="relative flex h-full flex-col overflow-hidden p-7"
      style={{
        background: highlighted ? "var(--surface-dark-2)" : "#ffffff",
        border: `1.5px solid ${highlighted ? "var(--surface-dark-hover)" : "var(--border)"}`,
        borderRadius: "var(--radius-md, 0.375rem)",
        boxShadow: "var(--shadow-card)",
        opacity: highlighted ? 0.85 : 1,
      }}
    >
      {/* Sold-out ribbon, horizontal, right-side, white bg, dark-green text */}
      {ribbon && (
        <div
          className="absolute top-5 right-0 flex items-center font-bold uppercase"
          style={{
            background: "#ffffff",
            color: "var(--elyst-emerald)",
            fontSize: "var(--text-micro)",
            letterSpacing: "0.04782969em",
            padding: "6px 14px 6px 10px",
            borderRadius: "4px 0 0 4px",
            boxShadow: "-2px 2px 6px rgba(0,0,0,0.18)",
            zIndex: 1,
            borderLeft: "2px solid var(--elyst-emerald)",
          }}
        >
          {ribbon}
        </div>
      )}

      <span
        className="font-bold uppercase"
        style={{
          fontSize: "var(--text-micro)",
          letterSpacing: "0.057395628em",
          color: highlighted ? "var(--fg-muted-dark)" : "var(--elyst-emerald)",
        }}
      >
        {name}
      </span>
      <span
        className="font-display mt-2.5 font-bold"
        style={{
          fontSize: "clamp(2.2rem, 5vw, 3rem)",
          lineHeight: 1,
          color: highlighted ? "var(--fg-on-dark)" : "var(--fg)",
        }}
      >
        {price}
      </span>
      <div className="mt-2 mb-5" style={{ fontSize: "var(--text-small)", color: highlighted ? "var(--fg-muted-dark)" : "var(--fg-3)" }}>
        {sub}
      </div>

      <div className="mb-4 h-px" style={{ background: highlighted ? "rgba(255,255,255,0.08)" : "var(--border)" }} />

      <ul className="flex flex-col gap-3">
        {standardFeatures.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: highlighted ? "rgba(255,255,255,0.5)" : "var(--elyst-green-mid)" }}
            />
            <span style={{ fontSize: "var(--text-small)", color: highlighted ? "rgba(255,255,255,0.8)" : "var(--fg-2)" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {highlighted && (
        <div className="mt-4">
          <div className="mb-3 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <p className="mb-2 font-bold uppercase" style={{ fontSize: "var(--text-micro)", letterSpacing: "0.028697814em", color: "var(--fg-3)" }}>
            Plus, exclusively:
          </p>
          <ul className="flex flex-col gap-2.5">
            {earlyBirdExtras.map((f) => (
              <li key={f} className="flex items-start gap-2.5 font-bold text-fg-on-dark" style={{ fontSize: "var(--text-small)" }}>
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-6">
        {highlighted ? (
          <span
            className="block cursor-not-allowed rounded-md py-3.5 text-center font-bold"
            style={{ background: "var(--surface-dark-hover)", color: "var(--fg-muted-dark)", fontSize: "var(--text-small)" }}
          >
            {cta}
          </span>
        ) : (
          <BrandButton href={href} tone="emerald" full>
            {cta}
          </BrandButton>
        )}
      </div>
    </motion.div>
  );
}

export default function CirclePricing() {
  return (
    <section id="pricing" className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SectionMark>Pricing</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
            Simple, transparent pricing.
          </h2>
          <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            One membership. Everything included. No hidden charges.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PriceCard
            name="Standard"
            price="₹299/month"
            sub="per month · cancel anytime"
            cta="Get Started"
            href="https://nas.io/elystaicircle"
            index={0}
          />
          <PriceCard
            name="Early Bird"
            ribbon="Sold Out"
            price="₹199"
            sub="one-time payment"
            cta="Early Bird Closed"
            highlighted
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
