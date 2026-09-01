"use client";

import {
  BarChart3,
  ChevronsLeftRight,
  ClipboardCheck,
  Clock3,
  DollarSign,
  FileText,
  ListChecks,
  MessageSquare,
  Send,
  Sparkles,
  UserCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { SectionMark } from "@/components/ui/section-mark";

type StateId = "tool" | "system";

type WorkflowStep = {
  n: string;
  title: string;
  body: string;
};

type WorkflowState = {
  steps: readonly WorkflowStep[];
  closing: string;
};

type Sector = {
  id: string;
  label: string;
  workflowLabel: string;
  states: Record<StateId, WorkflowState>;
};

const systemComparisonData: { sectors: readonly Sector[] } = {
  sectors: [
    {
      id: "real-estate",
      label: "Real Estate",
      workflowLabel: "THE WORKFLOW — A property enquiry comes in",
      states: {
        tool: {
          steps: [
            { n: "01", title: "Enquiry", body: "A lead gets your reply when you see it, which could mean the difference between landing and losing that lead." },
            { n: "02", title: "Qualify", body: "The human takes time to find out budget, area, and timeline. Some get called. Some do not." },
            { n: "03", title: "Respond", body: "The human has to understand which leads are worth handling and prepare for them before reaching out." },
            { n: "04", title: "Follow up", body: "Follow-up happens rarely when an agent remembers and the conversation history stays scattered." },
          ],
          closing: "The tool made writing the reply faster. It didn't change who gets replied to.",
        },
        system: {
          steps: [
            { n: "01", title: "Enquiry", body: "The AI agent handles any enquiry 24/7, the lead gets exactly what they were looking for in their language too." },
            { n: "02", title: "Qualify", body: "Budget, area, timeline and intent are all captured before a human takes over for further steps." },
            { n: "03", title: "Respond", body: "The human already has all the information they need from the AI agent and knows who to be in touch with." },
            { n: "04", title: "Follow up", body: "Follow-ups are sequenced and logged by the AI agent and a human steps in when a reply needs one." },
          ],
          closing: "Your agents spend the day on the five leads worth a call, not the fifty that aren't.",
        },
      },
    },
    {
      id: "trade-logistics",
      label: "Trade & Logistics",
      workflowLabel: "THE WORKFLOW — A customer asks for a quote",
      states: {
        tool: {
          steps: [
            { n: "01", title: "Request", body: "An RFQ arrives as an email, a PDF, or a photo of a list on WhatsApp." },
            { n: "02", title: "Price", body: "Someone digs through old quotes and supplier sheets to find what you charged last time." },
            { n: "03", title: "Build", body: "The quote gets rebuilt in Excel. Two people quoting the same item quote it differently." },
            { n: "04", title: "Send & chase", body: "Sent a day or two later. Chased only if anyone remembers about it." },
          ],
          closing: "AI helped write the covering email. The two days were never the email.",
        },
        system: {
          steps: [
            { n: "01", title: "Request", body: "The RFQ is read on arrival, whatever format it came in, and its line items are pulled out." },
            { n: "02", title: "Price", body: "Each item is matched to your catalogue and what you last quoted for it." },
            { n: "03", title: "Build", body: "A draft quote in your format, in minutes. A human checks and approves before anything leaves." },
            { n: "04", title: "Send & chase", body: "Sent the same day. Follow-ups run on schedule and stop when the customer replies." },
          ],
          closing: "Quotes go out the same day, at consistent prices, without your senior person doing the typing.",
        },
      },
    },
    {
      id: "professional-services",
      label: "Professional Services",
      workflowLabel: "THE WORKFLOW — A new client comes on board",
      states: {
        tool: {
          steps: [
            { n: "01", title: "Kickoff", body: "Notes live in one person's notebook, or a recording nobody rewatches." },
            { n: "02", title: "Requirements", body: "Scattered across WhatsApp, email and a call that only two people were on." },
            { n: "03", title: "Delivery", body: "The team asks the client things they already told you." },
            { n: "04", title: "Reporting", body: "The monthly report is rebuilt by hand, every month, from scratch." },
          ],
          closing: "AI drafted the report faster. Someone still spent a day assembling what went into it.",
        },
        system: {
          steps: [
            { n: "01", title: "Kickoff", body: "The call is transcribed and turned into a structured brief the same day." },
            { n: "02", title: "Requirements", body: "One client record. Everyone works from it, including the people who weren't on the call." },
            { n: "03", title: "Delivery", body: "Nobody asks the client a question that has already been answered." },
            { n: "04", title: "Reporting", body: "Drafted from your actual delivery data, reviewed by a human, sent." },
          ],
          closing: "The monthly report takes an hour to check instead of a day to build.",
        },
      },
    },
  ],
};

const stepIcons: Record<string, LucideIcon> = {
  Enquiry: MessageSquare,
  Qualify: UserCheck,
  Respond: Send,
  "Follow up": Clock3,
  Request: FileText,
  Price: DollarSign,
  Build: Wrench,
  "Send & chase": Send,
  Kickoff: ClipboardCheck,
  Requirements: ListChecks,
  Delivery: Wrench,
  Reporting: BarChart3,
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function noScriptFallbackMarkup() {
  const cards = systemComparisonData.sectors.map((sector) => {
    const steps = sector.states.system.steps.map((step) => [
      '<li class="min-w-0">',
      '<p class="font-display font-semibold text-fg" style="font-size:var(--text-card);line-height:1.05">',
      escapeHtml(step.title),
      "</p>",
      '<p class="mt-3 text-fg-2" style="font-size:var(--text-small);line-height:1.45">',
      escapeHtml(step.body),
      "</p>",
      "</li>",
    ].join("")).join("");

    return [
      '<article class="rounded-md border-4 border-emerald/65 bg-surface-light p-5 sm:p-7">',
      '<p class="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">',
      escapeHtml(sector.label),
      "</p>",
      '<p class="mt-3 text-center font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">',
      escapeHtml(sector.workflowLabel),
      "</p>",
      '<p class="mt-6 text-center font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">With an AI system</p>',
      '<ol class="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">',
      steps,
      "</ol>",
      '<p class="mx-auto mt-8 max-w-3xl text-center font-display font-semibold text-fg" style="font-size:var(--text-lead);line-height:1.3">',
      escapeHtml(sector.states.system.closing),
      "</p>",
      "</article>",
    ].join("");
  }).join("");

  return '<div class="mx-auto mt-12 max-w-7xl space-y-4">' + cards + "</div>";
}

function WorkflowIcon({ step, tone }: { step: WorkflowStep; tone: StateId }) {
  const Icon = stepIcons[step.title] ?? Sparkles;
  const isTool = tone === "tool";

  return (
    <div
      className={["relative flex size-16 items-center justify-center rounded-md border-2", isTool ? "border-[#a78e63]/25 text-[#78603a]" : "border-emerald/15 text-emerald"].join(" ")}
      style={{
        background: isTool
          ? "color-mix(in srgb, var(--surface-muted) 72%, #f0dfc4)"
          : "color-mix(in srgb, var(--surface-accent-soft) 48%, var(--surface-light))",
      }}
    >
      <Icon aria-hidden className="size-7" strokeWidth={1.7} />
      <span
        className={["absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border bg-surface-light font-display text-[0.62rem] font-bold", isTool ? "border-[#a78e63]/30 text-[#78603a]" : "border-emerald/25 text-emerald"].join(" ")}
      >
        {step.n}
      </span>
    </div>
  );
}

function WorkflowColumns({ steps, tone }: { steps: readonly WorkflowStep[]; tone: StateId }) {
  const isTool = tone === "tool";

  return (
    <ol
      className={[
        "grid min-h-[33rem] grid-cols-1 gap-y-8 px-4 py-8 sm:min-h-[28rem] sm:grid-cols-2 sm:gap-x-4 sm:px-6 sm:py-9 lg:min-h-[25rem] lg:grid-cols-4 lg:gap-y-0 lg:px-6 lg:py-10",
        isTool ? "text-[#463a2b]" : "text-emerald",
      ].join(" ")}
      style={{
        background: isTool
          ? "color-mix(in srgb, var(--surface-muted) 68%, #f0dfc4)"
          : "color-mix(in srgb, var(--surface-accent-soft) 34%, var(--surface-light))",
      }}
    >
      {steps.map((step, index) => (
        <li
          key={step.n}
          className={[
            "flex h-[21rem] min-w-0 flex-col items-center px-3 text-center sm:h-auto sm:px-5 lg:px-6",
            index > 0 ? "border-t border-emerald/10 pt-8 sm:border-t-0 sm:pt-0 lg:border-l" : "",
            index % 2 === 1 ? "sm:border-l sm:border-emerald/10" : "",
            index > 1 ? "sm:border-t sm:border-emerald/10 sm:pt-8 lg:border-t-0 lg:pt-0" : "",
          ].join(" ")}
        >
          <WorkflowIcon step={step} tone={tone} />
          <p
            className="mt-5 font-display font-semibold tracking-[var(--tracking-display)]"
            style={{ fontSize: "var(--text-card)", lineHeight: 1.02 }}
          >
            {step.title}
          </p>
          <p
            className={["mt-4 max-w-[34ch] sm:max-w-[18ch]", isTool ? "text-[#665846]" : "text-fg-2"].join(" ")}
            style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}
          >
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function SystemActuallyIs() {
  const sectors = systemComparisonData.sectors;
  const [activeSectorId, setActiveSectorId] = useState("real-estate");
  const [inset, setInset] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabScrollerRef = useRef<HTMLDivElement>(null);
  const activeSector = sectors.find((sector) => sector.id === activeSectorId) ?? sectors[0];

  useEffect(() => {
    const activeTab = tabRefs.current[activeSectorId];
    const tabScroller = tabScrollerRef.current;
    if (!activeTab || !tabScroller) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxScrollLeft = tabScroller.scrollWidth - tabScroller.clientWidth;
    const centeredLeft = activeTab.offsetLeft - (tabScroller.clientWidth - activeTab.offsetWidth) / 2;
    tabScroller.scrollTo({
      left: Math.min(maxScrollLeft, Math.max(0, centeredLeft)),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeSectorId]);

  const updateInset = useCallback((clientX: number) => {
    const comparison = comparisonRef.current;
    if (!comparison) return;

    const rect = comparison.getBoundingClientRect();
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    setInset(Math.min(100, Math.max(0, percentage)));
  }, []);

  function selectSector(sector: Sector) {
    setActiveSectorId(sector.id);
    setInset(50);
  }

  function handleSectorKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % sectors.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + sectors.length) % sectors.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = sectors.length - 1;
    if (nextIndex === currentIndex) return;

    event.preventDefault();
    const nextSector = sectors[nextIndex];
    selectSector(nextSector);
    window.requestAnimationFrame(() => tabRefs.current[nextSector.id]?.focus());
  }

  function startDragging(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateInset(event.clientX);
  }

  function stopDragging(event: PointerEvent<HTMLButtonElement>) {
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function moveDragging(event: PointerEvent<HTMLButtonElement>) {
    if (isDragging) updateInset(event.clientX);
  }

  function handleComparisonPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (isDragging) updateInset(event.clientX);
  }

  function handleSeparatorKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const step = 5;
    let nextInset = inset;

    if (event.key === "ArrowLeft" || event.key === "ArrowDown") nextInset = inset - step;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") nextInset = inset + step;
    if (event.key === "Home") nextInset = 0;
    if (event.key === "End") nextInset = 100;
    if (nextInset === inset) return;

    event.preventDefault();
    setInset(Math.min(100, Math.max(0, nextInset)));
  }

  return (
    <section
      id="what-an-ai-system-is"
      aria-labelledby="what-an-ai-system-is-heading"
      className="relative overflow-hidden bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-5xl text-center">
          <SectionMark>What is an AI system?</SectionMark>
          <h2 id="what-an-ai-system-is-heading" className="mx-auto mt-6 max-w-5xl text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>
            <span className="block">A tool gives your team answers.</span>
            <span className="block">A system does the work.</span>
          </h2>
        </header>

        <div className="mt-12 sm:mt-14">
          <div ref={tabScrollerRef} className="-mx-1 overflow-x-auto px-1 pb-2">
            <div role="tablist" aria-label="Choose an industry" aria-orientation="horizontal" className="flex min-w-max justify-center gap-2">
              {sectors.map((sector, index) => {
                const isActive = activeSector.id === sector.id;
                return (
                  <button
                    key={sector.id}
                    ref={(element) => {
                      tabRefs.current[sector.id] = element;
                    }}
                    id={"system-sector-" + sector.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="system-comparison-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectSector(sector)}
                    onKeyDown={(event) => handleSectorKeyDown(event, index)}
                    className={[
                      "min-h-11 rounded-md border px-5 font-display text-small font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 motion-reduce:transition-none",
                      isActive ? "border-emerald bg-emerald text-fg-on-dark" : "border-border bg-transparent text-fg-2 hover:border-emerald/50 hover:text-emerald",
                    ].join(" ")}
                  >
                    {sector.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-center text-center">
            <p className="relative inline-flex rotate-[-1deg] items-center border-2 border-emerald bg-surface-light px-4 py-3 font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald shadow-card before:absolute before:-left-1 before:-top-1 before:size-2 before:rounded-full before:bg-emerald after:absolute after:-bottom-1 after:-right-1 after:size-2 after:rounded-full after:bg-emerald">
              {activeSector.workflowLabel}
            </p>
          </div>

          <div
            id="system-comparison-panel"
            role="tabpanel"
            aria-labelledby={"system-sector-" + activeSector.id}
            tabIndex={0}
            className="mt-12 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald focus-visible:outline-offset-4 sm:mt-16"
          >
            <div className="relative overflow-hidden rounded-md border-4 border-emerald/65 bg-surface-light shadow-card">
              <div className="relative z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-emerald/15 px-5 py-5 sm:px-8">
                <span className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-[var(--elyst-red-muted)]">Without an AI system</span>
                <span className="flex items-center gap-2 font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">
                  <span className="hidden h-px w-8 bg-emerald/25 sm:block" />
                  <span className="whitespace-nowrap">Drag to compare</span>
                  <span className="hidden h-px w-8 bg-emerald/25 sm:block" />
                </span>
                <span className="text-right font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">With an AI system</span>
              </div>

              <div
                ref={comparisonRef}
                className="relative touch-none overflow-hidden"
                onPointerMove={handleComparisonPointerMove}
                onPointerUp={() => setIsDragging(false)}
                onPointerCancel={() => setIsDragging(false)}
              >
                <WorkflowColumns steps={activeSector.states.system.steps} tone="system" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{ clipPath: "inset(0 " + (100 - inset) + "% 0 0)" }}
                >
                  <WorkflowColumns steps={activeSector.states.tool.steps} tone="tool" />
                </div>

                <div
                  className="pointer-events-none absolute inset-y-0 z-40 w-px -translate-x-1/2 bg-emerald/80 shadow-[0_0_0_1px_rgba(3,98,76,0.08)]"
                  style={{ left: inset + "%" }}
                >
                  <button
                    type="button"
                    role="slider"
                    aria-label="Compare the workflow without an AI system and with an AI system"
                    aria-orientation="vertical"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(inset)}
                    aria-valuetext={Math.round(inset) + " percent without an AI system shown"}
                    className="pointer-events-auto absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-md border-2 border-emerald/25 bg-surface-light text-emerald shadow-[0_10px_28px_rgba(3,98,76,0.18)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 motion-reduce:transition-none touch-none"
                    onPointerDown={startDragging}
                    onPointerMove={moveDragging}
                    onPointerUp={stopDragging}
                    onPointerCancel={stopDragging}
                    onKeyDown={handleSeparatorKeyDown}
                  >
                    <ChevronsLeftRight aria-hidden className="size-7" strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>

            <p
              className="mx-auto mt-12 max-w-4xl text-center font-display font-semibold tracking-[var(--tracking-body)] text-fg sm:mt-14"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}
            >
              The examples are just representative. We start with the work your team actually repeats.
            </p>

            <p className="sr-only" aria-live="polite">
              {inset < 50 ? "Showing more of the workflow without an AI system." : "Showing more of the workflow with an AI system."}
            </p>
          </div>
        </div>
      </div>

      <noscript dangerouslySetInnerHTML={{ __html: noScriptFallbackMarkup() }} />
    </section>
  );
}
