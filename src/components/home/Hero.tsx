"use client";

import Link from "next/link";
import MarkDither from "@/components/site/MarkDither";
import TrackedCta from "@/components/marketing/TrackedCta";
import { BrandButton } from "@/components/ui/brand-button";
import { CometCard } from "@/components/ui/comet-card";
import { SectionMark } from "@/components/ui/section-mark";

export default function Hero() {
  return (
    <section style={{ padding: "clamp(40px, 5vw, 72px) var(--section-px)" }}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[3fr_2fr]">
        <div>
          <SectionMark>Practical AI implementation for growing teams</SectionMark>
          <h1 className="mt-6 text-fg" style={{ fontSize: "var(--text-hero)", lineHeight: 1.08 }}>
            Fix one costly workflow with AI. Leave with a system your team owns.
          </h1>
          <p className="mt-5 max-w-md text-fg-2 md:max-w-none" style={{ fontSize: "calc(var(--text-body) + 2px)", lineHeight: 1.5 }}>
            We map the work, decide what is worth changing, build the smallest useful system, and train your team to run it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TrackedCta label="Book an audit call" intent="audit" tone="green" />
            <span className="hidden md:inline-flex">
              <BrandButton href="/services" variant="outline">
                <span style={{ fontSize: "calc(var(--text-small) + 2px)" }}>See how we work</span>
              </BrandButton>
            </span>
            <Link href="/services" className="inline-flex min-h-12 items-center px-1 font-semibold text-emerald underline decoration-emerald/35 underline-offset-4 hover:text-emerald-light md:hidden">
              See how we work →
            </Link>
          </div>
        </div>

        <CometCard className="hidden self-stretch md:block">
          <div className="relative overflow-hidden rounded-card" style={{ background: "#F5F8F6", height: "480px" }} aria-label="A workflow moves from messy input through a human review gate to an owned result.">
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" />
            <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-lg border border-emerald/15 bg-white/90 p-4 shadow-card backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-emerald">Workflow trace</span>
                <span className="rounded-full bg-green/20 px-2 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-emerald">owner: your team</span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-1.5 text-center font-mono text-[0.59rem] uppercase tracking-[0.06em] text-fg-3">
                <span className="rounded bg-surface-muted px-1.5 py-2">input</span><span className="rounded bg-surface-muted px-1.5 py-2">prepare</span><span className="rounded bg-green/20 px-1.5 py-2 text-emerald">review</span><span className="rounded bg-surface-muted px-1.5 py-2">record</span>
              </div>
            </div>
          </div>
        </CometCard>

        <CometCard className="md:hidden">
          <div className="relative h-[260px] overflow-hidden rounded-card" style={{ background: "#F5F8F6" }} aria-label="A workflow moves from messy input through a human review gate to an owned result.">
            <MarkDither colorFront="#03624C" colorBack="#F5F8F6" pixelSize={4} />
            <div className="pointer-events-none absolute inset-x-3 bottom-3 rounded-lg border border-emerald/15 bg-white/90 p-3 shadow-card">
              <div className="flex items-center justify-between gap-2"><span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-emerald">Workflow trace</span><span className="font-mono text-[0.56rem] uppercase text-emerald">owner: your team</span></div>
              <div className="mt-3 grid grid-cols-4 gap-1 text-center font-mono text-[0.52rem] uppercase text-fg-3"><span className="rounded bg-surface-muted px-1 py-1.5">input</span><span className="rounded bg-surface-muted px-1 py-1.5">prepare</span><span className="rounded bg-green/20 px-1 py-1.5 text-emerald">review</span><span className="rounded bg-surface-muted px-1 py-1.5">record</span></div>
            </div>
          </div>
        </CometCard>
      </div>
    </section>
  );
}
