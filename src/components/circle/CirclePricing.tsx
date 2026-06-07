"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";

const standardFeatures = [
  "Weekly AI Signal",
  "Monthly Catchup Call",
  "The Content Library",
  "The Network",
  "Deals in AI",
  "Member-Only Events",
];

const earlyBirdExtras = [
  "Priority access and offers",
  "Your rate stays locked forever",
  "A personalised gift from us",
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
      className="relative flex h-full flex-col overflow-hidden p-9"
      style={{
        background: highlighted ? "var(--surface-dark-2)" : "#ffffff",
        border: `1.5px solid ${highlighted ? "var(--surface-dark-hover)" : "var(--border)"}`,
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
        opacity: highlighted ? 0.82 : 1,
      }}
    >
      {ribbon && (
        <div
          className="absolute font-bold uppercase"
          style={{
            top: 28,
            right: -36,
            width: 160,
            textAlign: "center",
            transform: "rotate(45deg)",
            background: "var(--fg-3)",
            color: "var(--fg-on-dark)",
            fontSize: "0.62rem",
            letterSpacing: "0.1em",
            padding: "6px 0",
            zIndex: 1,
          }}
        >
          {ribbon}
        </div>
      )}

      <span
        className="font-bold uppercase"
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.12em",
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
      <div className="mt-2 mb-6" style={{ fontSize: "var(--text-small)", color: highlighted ? "var(--fg-muted-dark)" : "var(--fg-3)" }}>
        {sub}
      </div>

      <div className="mb-5 h-px" style={{ background: highlighted ? "rgba(255,255,255,0.08)" : "var(--border)" }} />

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
        <div className="mt-5">
          <div className="mb-3.5 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <p className="mb-2.5 font-bold uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.06em", color: "var(--fg-3)" }}>
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

      <div className="mt-auto pt-7">
        {highlighted ? (
          <span
            className="block cursor-not-allowed rounded-full py-3.5 text-center font-bold"
            style={{ background: "var(--surface-dark-hover)", color: "var(--fg-muted-dark)", fontSize: "0.95rem" }}
          >
            {cta}
          </span>
        ) : (
          <BrandButton href={href} tone="emerald" full className="rounded-full!">
            {cta}
          </BrandButton>
        )}
      </div>
    </motion.div>
  );
}

export default function CirclePricing() {
  return (
    <section id="pricing" className="bg-surface-muted" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="chip">Pricing</span>
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
            ribbon="Sold out"
            price="₹199"
            sub={
              <>
                <span className="block font-bold" style={{ color: "var(--fg-muted-dark)" }}>
                  gives you access until July 15
                </span>
                <span className="block">then ₹199/month · your rate stays locked</span>
              </>
            }
            cta="Early Bird Closed"
            highlighted
            index={1}
          />
        </div>

        <p className="mt-5 text-fg-3" style={{ fontSize: "var(--text-small)" }}>
          Early Bird spots are limited. Once they are gone, the standard rate
          is all that remains.
        </p>
      </div>
    </section>
  );
}
