"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ProcessSymbol } from "@/components/marketing/ProcessSymbols";
import { SectionMark } from "@/components/ui/section-mark";

type ProcessId = "identify" | "build" | "handover";

type ProcessGroup = {
  title: string;
  items: string[];
};

type ProcessStep = {
  id: ProcessId;
  number: string;
  title: string;
  lead: string;
  closing: string;
  groups: ProcessGroup[];
};

const processSteps: ProcessStep[] = [
  {
    id: "identify",
    number: "1",
    title: "Identify",
    lead: "We understand how your team operates, find where AI can help, and share that with you before we start building.",
    closing: "Not every audit ends in a build. Sometimes the answer is a process fix — and we'll say so.",
    groups: [
      {
        title: "What we look at",
        items: [
          "How the team works now",
          "Where AI can help",
          "What data exists and how clean it is",
          "What it costs in time and errors",
          "What you have already tried",
        ],
      },
      {
        title: "What you get",
        items: [
          "A map of the workflow today",
          "The one opportunity worth doing first",
          "Risks and data readiness",
          "A success measure and a next step",
        ],
      },
    ],
  },
  {
    id: "build",
    number: "2",
    title: "Build",
    lead: "We build the chosen system around the tools you already run.",
    closing: "You will know what's in scope, what isn't, and what each phase costs before we start.",
    groups: [
      {
        title: "What we do",
        items: [
          "Scoping and architecture",
          "Prototype and testing on real work",
          "Integration with tools you already use",
          "Human review and exception paths",
          "Deployment and documentation",
        ],
      },
      {
        title: "Every proposal defines",
        items: [
          "Scope and exclusions",
          "Milestones, by phase",
          "How success is measured",
          "A phased payment schedule",
        ],
      },
    ],
  },
  {
    id: "handover",
    number: "3",
    title: "Handover",
    lead: "We train your team, document it, and step back.",
    closing: "We build it so you don't need us. We can stick around if the system needs maintenance.",
    groups: [
      {
        title: "What you get",
        items: [
          "Training for the people who use it",
          "A runbook and a named owner",
          "Known limits and an escalation path",
        ],
      },
      {
        title: "What that means",
        items: [
          "You are not locked in",
          "Your team can run it without us",
          "Support continues only if you want it",
        ],
      },
    ],
  },
];

function isProcessId(value: string): value is ProcessId {
  return value === "identify" || value === "build" || value === "handover";
}

function ProcessDetails({ step, surface }: { step: ProcessStep; surface: "dark" | "light" }) {
  const isLight = surface === "light";

  return (
    <div className="flex min-w-0 flex-col justify-center">
      <p
        className={`max-w-3xl font-semibold ${isLight ? "text-fg" : "text-fg-on-dark/90"}`}
        style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}
      >
        {step.lead}
      </p>

      <div className={`mt-11 grid gap-10 ${step.groups.length > 1 ? "sm:grid-cols-2" : "max-w-2xl"}`}>
        {step.groups.map((group) => (
          <div key={group.title}>
            <h3
              className={`font-display font-semibold uppercase ${isLight ? "text-emerald" : "text-green"}`}
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
            >
              {group.title}
            </h3>
            <ul className={`mt-3 list-none divide-y p-0 ${isLight ? "divide-border border-t border-border" : "divide-white/10 border-t border-white/10"}`}>
              {group.items.map((item) => (
                <li
                  key={item}
                  className={`py-3 ${isLight ? "text-fg" : "text-fg-on-dark/75"}`}
                  style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p
        className={`mt-11 border-t pt-5 text-center font-display font-semibold ${isLight ? "border-emerald/25 text-emerald" : "border-green/25 text-green"}`}
        style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}
      >
        {step.closing}
      </p>
    </div>
  );
}

function ProcessPanel({ step, surface = "dark" }: { step: ProcessStep; surface?: "dark" | "light" }) {
  return (
    <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.56fr_1.44fr] lg:items-center lg:gap-8 lg:px-8 lg:py-12">
      <ProcessSymbol id={step.id} size="large" surface={surface} />
      <ProcessDetails step={step} surface={surface} />
    </div>
  );
}

export default function ServicesProcess() {
  const [activeId, setActiveId] = useState<ProcessId>("identify");
  const activeStep = processSteps.find((step) => step.id === activeId) ?? processSteps[0];

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!isProcessId(hash)) return;

      setActiveId(hash);

      if (window.matchMedia("(max-width: 767px)").matches) {
        window.requestAnimationFrame(() => {
          document.getElementById(`mobile-process-${hash}`)?.scrollIntoView({ block: "start" });
        });
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const selectStep = (id: ProcessId) => {
    setActiveId(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <section id="our-process" className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <SectionMark tone="dark">Our process</SectionMark>
          <h2 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
            What actually happens in the process.
          </h2>
        </div>

        <div className="mt-12 hidden sm:mt-14 md:block" role="tablist" aria-label="Our process">
          <div className="mx-auto flex w-fit max-w-full items-start justify-center gap-4 sm:gap-8 lg:gap-10">
            {processSteps.map((step) => {
              const isActive = step.id === activeId;

              return (
                <button
                  key={step.id}
                  id={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="process-panel"
                  onClick={() => selectStep(step.id)}
                  className={isActive ? "group relative flex shrink-0 flex-col items-center justify-start gap-0 px-0 py-1 text-center text-fg-on-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green sm:gap-0.5 sm:px-1" : "group relative flex shrink-0 flex-col items-center justify-start gap-0 px-0 py-1 text-center text-fg-muted-dark transition-colors hover:text-fg-on-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green sm:gap-0.5 sm:px-1"}
                >
                  <span
                    className={isActive ? "inline-flex items-baseline justify-center gap-1 whitespace-nowrap font-display font-extrabold" : "inline-flex items-baseline justify-center gap-1 whitespace-nowrap font-display"}
                    style={{ fontSize: "var(--text-process-tab)", lineHeight: 1 }}
                  >
                    <span>{step.number}.</span>
                    <span className={isActive ? "hero-accent-word" : "transition-colors group-hover:text-fg-on-dark"}>
                      {step.title}
                    </span>
                  </span>
                  <span aria-hidden className={isActive ? "text-green opacity-100" : "text-green opacity-0"}>
                    <ChevronUp className="-mt-0.5 size-5 sm:size-6" strokeWidth={1.8} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="process-panel"
          role="tabpanel"
          aria-labelledby={activeStep.id}
          tabIndex={0}
          className="mt-5 hidden overflow-hidden rounded-md border border-border bg-surface-card outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-green sm:mt-6 md:block"
        >
          <ProcessPanel step={activeStep} surface="light" />
        </div>

        <div className="mt-10 space-y-10 md:hidden">
          {processSteps.map((step) => (
            <article key={step.id} id={`mobile-process-${step.id}`} className="scroll-mt-24">
              <h3 className="mobile-process-heading mb-4 font-display font-semibold text-fg-on-dark">
                {step.number}. {step.title}
              </h3>
              <div className="overflow-hidden rounded-md border border-border bg-surface-card">
                <ProcessPanel step={step} surface="light" />
              </div>
            </article>
          ))}
        </div>

        <noscript>
          <div className="mt-6 grid gap-4">
            {processSteps.map((step) => (
              <article key={step.id} className="overflow-hidden rounded-md border border-border bg-surface-card p-5 sm:p-8">
                <div className="mb-6 flex items-baseline gap-2 font-display text-fg">
                  <span style={{ fontSize: "var(--text-label)" }}>{step.number}.</span>
                  <h3 style={{ fontSize: "var(--text-h3)" }}>{step.title}</h3>
                </div>
                <ProcessPanel step={step} surface="light" />
              </article>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}
