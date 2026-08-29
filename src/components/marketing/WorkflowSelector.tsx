"use client";

import { useState } from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { ArtifactFrame, type EvidenceStatus, WorkflowTrace, type WorkflowTraceStep } from "@/components/marketing/WorkflowVisuals";

export type WorkflowExample = {
  id: string;
  label: string;
  title: string;
  context: string;
  input: string[];
  preparation: string[];
  humanDecision: string;
  recordedOutcome: string;
  owner: string;
  safeVersion: string;
  status: EvidenceStatus;
  trace?: WorkflowTraceStep[];
};

function traceFor(example: WorkflowExample): WorkflowTraceStep[] {
  return example.trace ?? [
    { label: "Input", title: example.input[0] ?? "Source material", detail: example.context, status: "comes in", tone: "neutral" },
    { label: "AI prepares", title: example.preparation[0] ?? "Structured first pass", detail: example.preparation.slice(1).join(" · ") || "A bounded draft or summary", status: "prepares", tone: "dark" },
    { label: "Human decides", title: example.humanDecision, detail: "A named person reviews the source and decides what happens next.", status: "approval gate", tone: "green" },
    { label: "Recorded", title: example.recordedOutcome, detail: "The useful result returns to the agreed system of record.", status: "write-back", tone: "neutral" },
    { label: "Owner", title: example.owner, detail: "The team owns the next action, limits, and exception path.", status: "owned", tone: "green" },
  ];
}
export default function WorkflowSelector({
  examples,
  eyebrow = "Choose a workflow",
  title = "Where does work keep leaking?",
  description = "These are examples to adapt, not packaged products. The audit starts with your workflow.",
  defaultIndex = 0,
  compact = false,
}: {
  examples: WorkflowExample[];
  eyebrow?: string;
  title?: string;
  description?: string;
  defaultIndex?: number;
  compact?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(Math.min(defaultIndex, Math.max(0, examples.length - 1)));
  const active = examples[activeIndex];

  if (!active) return null;

  return (
    <section className="bg-bg px-[var(--section-px)] py-[var(--section-py)]">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionMark>{eyebrow}</SectionMark>
          <h2 className="mt-6 font-display font-bold text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.1 }}>{title}</h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}>{description}</p>
        </div>

        <div role="tablist" aria-label={eyebrow} className="mt-9 flex flex-wrap gap-2 border-b border-border pb-3">
          {examples.map((example, index) => {
            const selected = activeIndex === index;
            return (
              <button
                key={example.id}
                type="button"
                role="tab"
                id={`${example.id}-tab`}
                aria-selected={selected}
                aria-controls={`${example.id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    setActiveIndex((index + 1) % examples.length);
                  }
                  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    event.preventDefault();
                    setActiveIndex((index - 1 + examples.length) % examples.length);
                  }
                }}
                className={`min-h-11 rounded-full border px-4 py-2 text-left font-semibold transition-colors ${selected ? "border-emerald bg-emerald text-fg-on-dark" : "border-border bg-white text-fg-2 hover:border-emerald/45 hover:text-emerald"}`}
                style={{ fontSize: "var(--text-label)" }}
              >
                {example.label}
              </button>
            );
          })}
        </div>

        <div id={`${active.id}-panel`} role="tabpanel" aria-labelledby={`${active.id}-tab`} className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <ArtifactFrame
            status={active.status}
            label={compact ? "session exercise" : "representative workflow"}
            title={active.title}
            footer={<span>{active.safeVersion}</span>}
          >
            <p className="text-fg-2">{active.context}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-emerald">What comes in</p>
                <ul className="mt-3 space-y-2">
                  {active.input.map((item) => <li key={item} className="flex gap-2"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />{item}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-emerald">What leaves the room</p>
                <ul className="mt-3 space-y-2">
                  {active.preparation.map((item) => <li key={item} className="flex gap-2"><span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-green" />{item}</li>)}
                </ul>
              </div>
            </div>
          </ArtifactFrame>
          <WorkflowTrace steps={traceFor(active)} label={compact ? "session replay" : "workflow replay"} />
        </div>
      </div>
    </section>
  );
}
