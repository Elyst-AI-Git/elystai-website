import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";
import { VisualCard } from "@/components/ui/visual-card";
import { ProcessSymbol, type ProcessSymbolId } from "@/components/marketing/ProcessSymbols";

export type ProcessStep = {
  label: string;
  description: string;
  href?: string;
};

export const processSteps: ProcessStep[] = [
  {
    label: "Identify",
    href: "/services#identify",
    description: "We understand how your team works now and find the one thing worth fixing first.",
  },
  {
    label: "Build",
    href: "/services#build",
    description: "We build AI systems that work around the tools and the process you already have.",
  },
  {
    label: "Handover",
    href: "/services#handover",
    description: "We train your team, document it, and step back. You own it or we keep improving it.",
  },
];

export function ProcessSteps({ steps = processSteps }: { steps?: ProcessStep[] }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {steps.map((step, index) => {
        const offset = index === 1 ? "sm:ml-8" : index === 2 ? "sm:ml-16" : "";
        const className = `block rounded-md border border-border bg-white p-5 sm:p-6 ${offset} ${step.href ? "transition-colors hover:bg-surface-muted" : ""}`;
        const content = (
          <div className="grid grid-cols-[3.5rem_1fr] gap-4 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
            <span
              className="font-display font-semibold text-emerald"
              style={{ fontSize: "var(--text-process-number)", lineHeight: 0.82, letterSpacing: "var(--tracking-stat)" }}
              aria-hidden
            >
              {index + 1}
            </span>
            <div>
              <h3 className="font-display text-fg" style={{ fontSize: "var(--text-h3)" }}>
                {step.label}
              </h3>
              <p className="mt-2 max-w-xl text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.55 }}>
                {step.description}
              </p>
            </div>
          </div>
        );

        return step.href ? (
          <Link key={step.label} href={step.href} className={className}>
            {content}
          </Link>
        ) : (
          <div key={step.label} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

type HomepageProcessStep = {
  number: string;
  label: string;
  headline: string;
  description: string;
  href: string;
  symbol: ProcessSymbolId;
};

const homepageProcess: HomepageProcessStep[] = [
  {
    number: "01",
    label: "Identify",
    headline: "Find the one area worth doing first.",
    description: "We understand the workflow, the friction, and the cost before anything gets built.",
    href: "/services#identify",
    symbol: "identify",
  },
  {
    number: "02",
    label: "Build",
    headline: "Build around the tools your team already runs.",
    description: "We build the smallest useful system, with human review where it matters.",
    href: "/services#build",
    symbol: "build",
  },
  {
    number: "03",
    label: "Handover",
    headline: "Leave with a system your team can own.",
    description: "We train your team, document the limits, and hand the system over.",
    href: "/services#handover",
    symbol: "handover",
  },
];

export default function ProcessSection() {
  return (
    <section id="how-we-work" className="scroll-mt-24 bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-7xl">
        <SectionMark tone="dark">Services</SectionMark>
        <h2 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
          How we work with you.
        </h2>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
          {homepageProcess.map((step) => (
            <VisualCard key={step.href} decorated={false} className="h-full shadow-none hover:shadow-none">
              <Link
                href={step.href}
                className="group/link flex h-full min-h-[34rem] flex-col p-6 outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-inset sm:p-8"
              >
                <div className="flex items-center gap-3 text-fg-2">
                  <span className="font-display font-semibold" style={{ fontSize: "var(--text-body)", lineHeight: 1 }}>
                    {step.number}
                  </span>
                  <span className="font-display font-semibold" style={{ fontSize: "var(--text-body)", lineHeight: 1 }}>
                    {step.label}
                  </span>
                </div>

                <div className="flex h-56 shrink-0 items-center justify-center">
                  <ProcessSymbol id={step.symbol} size="large" />
                </div>

                <h3 className="homepage-process-card-title mt-4 min-h-[4.4rem] max-w-sm font-display font-semibold text-fg" style={{ lineHeight: 1.08, letterSpacing: "var(--tracking-display)" }}>
                  {step.headline}
                </h3>
                <p className="mt-5 min-h-[5.3rem] max-w-sm text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                  {step.description}
                </p>
                <span className="mt-0 inline-flex w-fit items-center gap-2 pt-4 font-display font-semibold text-fg-2 group-hover/link:underline group-focus-visible/link:underline" style={{ fontSize: "var(--text-body)" }}>
                  View {step.label}
                  <ArrowUpRight className="size-5 transition-transform duration-150 ease-out group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transition-none" strokeWidth={2} aria-hidden />
                </span>
              </Link>
            </VisualCard>
          ))}
        </div>
      </div>
    </section>
  );
}
