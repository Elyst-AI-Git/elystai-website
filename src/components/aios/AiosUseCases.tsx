"use client";

import { useState } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { motion } from "framer-motion";
import { BrandButton } from "@/components/ui/brand-button";
import { IconBriefing, IconDocument, IconTile } from "@/components/ui/icons";

/**
 * Tabbed industry switcher (Direction A). HARD SEO REQUIREMENT (NOTES.md):
 * all four panels must exist in the server-rendered initial HTML — Next.js
 * SSRs client components too, so every <IndustryPanel> below is always
 * present in the markup; only a CSS class (block/hidden) + aria-hidden
 * toggles visibility. Crawlers see all four; visitors see one at a time.
 */

type Industry = {
  id: string;
  tab: string;
  pain: string;
  flow: string;
  outcome: { type: "document" | "briefing"; label: string; sub: string };
  ctaLabel: string;
};

const industries: Industry[] = [
  {
    id: "real-estate",
    tab: "Real estate",
    pain: "Clients ask which units are available, then someone drafts the agreement by hand — every single time.",
    flow: "Ask AIOS which units are free this week — it answers straight from your listings, then drafts the tenancy agreement on request.",
    outcome: {
      type: "document",
      label: "tenancy-agreement-unit-12b.pdf",
      sub: "Sent to Leasing · 11:04",
    },
    ctaLabel: "Talk to us about your listings",
  },
  {
    id: "staffing",
    tab: "Staffing agencies",
    pain: "Offer letters and candidate documents are made by hand — slowly, and a little differently each time.",
    flow: "Message AIOS the candidate's details — it drafts the offer letter, formatted and consistent, ready to send.",
    outcome: {
      type: "document",
      label: "offer-letter-priya-nair.pdf",
      sub: "Sent to HR · 09:18",
    },
    ctaLabel: "Talk to us about your placements",
  },
  {
    id: "education",
    tab: "Education businesses",
    pain: "The same questions from parents every week, and certificates that still get typed up by hand each term.",
    flow: "AIOS answers fee and admission questions from your own records, and issues the certificate the moment it's asked for.",
    outcome: {
      type: "document",
      label: "transfer-certificate-aisha-k.pdf",
      sub: "Sent to Admin office · 14:30",
    },
    ctaLabel: "Talk to us about your institution",
  },
  {
    id: "logistics",
    tab: "Logistics SMEs",
    pain: "Constant \"where is it\" questions, and mornings that start without anyone knowing the day's plan.",
    flow: "AIOS answers shipment-status questions straight from your ops data, and sends each team its task briefing before the day starts.",
    outcome: {
      type: "briefing",
      label: "Morning briefing · Dispatch team",
      sub: "Sent automatically · 07:00",
    },
    ctaLabel: "Talk to us about your operations",
  },
];

function OutcomeChip({ outcome }: { outcome: Industry["outcome"] }) {
  const Icon = outcome.type === "briefing" ? IconBriefing : IconDocument;
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <IconTile tone="darkgreen" size={36}>
        <Icon size={18} variant="line" />
      </IconTile>
      <div>
        <p className="font-semibold text-fg" style={{ fontSize: "var(--text-body)" }}>
          {outcome.label}
        </p>
        <p className="text-fg-3" style={{ fontSize: "var(--text-eyebrow)" }}>
          {outcome.sub}
        </p>
      </div>
    </div>
  );
}

function IndustryPanel({ industry, active }: { industry: Industry; active: boolean }) {
  return (
    <motion.div
      id={`use-case-${industry.id}`}
      role="tabpanel"
      aria-hidden={!active}
      className={active ? "block" : "hidden"}
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:items-center sm:gap-12">
        {/* Copy — pain + flow */}
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.5 }}>
            {industry.pain}
          </p>
          <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
            {industry.flow}
          </p>
        </div>

        {/* Mockup — chat snippet + the resulting outcome */}
        <div
          className="flex flex-col gap-4 p-6"
          style={{
            background: "var(--surface-muted)",
            borderRadius: "var(--radius-card)",
          }}
        >
          {/* User message — right */}
          <div className="flex justify-end">
            <div
              className="max-w-[88%] px-3.5 py-2.5 shadow-sm"
              style={{
                background: "#DCF8C6",
                borderRadius: "12px 12px 4px 12px",
                fontSize: "var(--text-body)",
                border: "1px solid rgba(0,0,0,0.06)",
                color: "#111",
              }}
            >
              {industry.flow.split("—")[0].trim()}
            </div>
          </div>
          {/* AIOS reply — left */}
          <OutcomeChip outcome={industry.outcome} />
        </div>
      </div>

      <div className="mt-10 flex justify-center sm:justify-start">
        <BrandButton href="https://cal.com/elyst-ai/30min" variant="outline" tone="emerald">
          {industry.ctaLabel}
        </BrandButton>
      </div>
    </motion.div>
  );
}

export default function AiosUseCases() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Built for your industry</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Set up for how your business actually runs.
          </h2>
        </div>

        {/* Desktop — tab strip */}
        <div
          role="tablist"
          aria-label="Industries"
          className="mt-12 hidden items-center justify-center gap-2 sm:flex"
        >
          {industries.map((ind, i) => {
            const isActive = i === active;
            return (
              <button
                key={ind.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`use-case-${ind.id}`}
                onClick={() => setActive(i)}
                className="relative px-4 py-2 font-medium transition-colors"
                style={{
                  fontSize: "var(--text-body)",
                  color: isActive ? "var(--elyst-emerald)" : "var(--fg-3)",
                }}
              >
                {ind.tab}
                {isActive && (
                  <motion.span
                    layoutId="use-case-tab-underline"
                    className="absolute right-3 bottom-0 left-3 h-[2px] rounded-full"
                    style={{ background: "var(--elyst-emerald)" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile — stacked accordion-style triggers (all panels remain in DOM) */}
        <div className="mt-10 flex flex-col gap-2 sm:hidden">
          {industries.map((ind, i) => (
            <button
              key={ind.id}
              aria-selected={i === active}
              aria-controls={`use-case-${ind.id}`}
              onClick={() => setActive(i)}
              className="flex items-center justify-center px-4 py-3 text-center font-medium"
              style={{
                fontSize: "var(--text-body)",
                borderRadius: "var(--radius-card)",
                background: i === active ? "var(--green-tint-07)" : "var(--surface-muted)",
                color: i === active ? "var(--elyst-emerald)" : "var(--fg-2)",
              }}
            >
              {ind.tab}
            </button>
          ))}
        </div>

        {/* Display — all four panels server-rendered; only the active one is visible */}
        <div className="mt-10 sm:mt-14">
          {industries.map((ind, i) => (
            <IndustryPanel key={ind.id} industry={ind} active={i === active} />
          ))}
        </div>
      </div>
    </section>
  );
}
