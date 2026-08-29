"use client";

import { GripVertical } from "lucide-react";
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
            { n: "01", title: "Enquiry", body: "It lands in a portal inbox, a WhatsApp, or an email. Whoever sees it first owns it." },
            { n: "02", title: "Qualify", body: "An agent calls to find out budget, area and timeline. Some get called. Some don't." },
            { n: "03", title: "Respond", body: "The agent opens ChatGPT, pastes the enquiry, and rewrites the reply it gives back." },
            { n: "04", title: "Follow up", body: "Whenever someone remembers. Nothing records what was already asked." },
          ],
          closing: "The tool made writing the reply faster. It didn't change who gets replied to.",
        },
        system: {
          steps: [
            { n: "01", title: "Enquiry", body: "Every enquiry, every portal and channel, lands in one place the moment it arrives." },
            { n: "02", title: "Qualify", body: "Budget, area, timeline and intent captured before an agent touches it." },
            { n: "03", title: "Respond", body: "The agent opens a briefed lead, not a phone number, and calls the ones worth calling." },
            { n: "04", title: "Follow up", body: "Sequenced and logged automatically. A human is pulled in when a reply needs one." },
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
            { n: "04", title: "Send & chase", body: "Sent a day or two later. Chased if anyone remembers." },
          ],
          closing: "AI helped write the covering email. The two days were never the email.",
        },
        system: {
          steps: [
            { n: "01", title: "Request", body: "The RFQ is read on arrival, whatever format it came in, and its line items pulled out." },
            { n: "02", title: "Price", body: "Each item matched to your catalogue and what you last quoted for it." },
            { n: "03", title: "Build", body: "A draft quote in your format, in minutes. A human checks and approves before anything leaves." },
            { n: "04", title: "Send & chase", body: "Sent same day. Follow-ups run on schedule and stop the moment they reply." },
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
    const steps = sector.states.system.steps.map((step) => `
      <li class="flex gap-3 border-t border-emerald/15 pt-3">
        <span class="shrink-0 font-display text-label font-bold text-emerald">${escapeHtml(step.n)}</span>
        <p class="text-fg-2" style="font-size:var(--text-small);line-height:1.45">
          <span class="font-bold text-fg">${escapeHtml(step.title)} — </span>${escapeHtml(step.body)}
        </p>
      </li>`).join("");

    return `
      <article class="border border-emerald/20 bg-surface-light p-5 sm:p-6">
        <p class="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">${escapeHtml(sector.label)}</p>
        <p class="mt-3 text-fg-2" style="font-size:var(--text-small);line-height:1.45">${escapeHtml(sector.workflowLabel)}</p>
        <ol class="mt-5 space-y-4">${steps}</ol>
        <p class="mt-5 border-t border-emerald/15 pt-4 font-display font-semibold text-fg" style="font-size:var(--text-small);line-height:1.4">${escapeHtml(sector.states.system.closing)}</p>
      </article>`;
  }).join("");

  return `<div class="mx-auto mt-12 max-w-7xl border-t border-emerald/15 pt-8">
    <p class="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">With a system</p>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>
  </div>`;
}

function WorkflowStack({
  steps,
  tone,
}: {
  steps: readonly WorkflowStep[];
  tone: "tool" | "system";
}) {
  return (
    <div className="divide-y divide-emerald/15">
      {steps.map((step) => (
        <article
          key={`${tone}-${step.n}`}
          className="grid min-h-[12.5rem] gap-4 p-5 sm:min-h-[11rem] sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-7 sm:p-7"
        >
          <span
            className={`pt-1 font-display text-label font-bold tracking-[var(--tracking-label)] ${tone === "system" ? "text-emerald" : "text-fg-3"}`}
          >
            {step.n}
          </span>
          <div className="max-w-4xl">
            <h3 className="font-display font-semibold tracking-[var(--tracking-display)] text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.1 }}>
              {step.title}
            </h3>
            <p className="mt-4 max-w-3xl text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
              {step.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function SystemActuallyIs() {
  const sectors = systemComparisonData.sectors;
  const [activeSectorId, setActiveSectorId] = useState("real-estate");
  const [inset, setInset] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeSector = sectors.find((sector) => sector.id === activeSectorId) ?? sectors[0];

  useEffect(() => {
    const activeTab = tabRefs.current[activeSectorId];
    if (!activeTab) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activeTab.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
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
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-emerald/15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark>WHAT AN AI SYSTEM ACTUALLY IS</SectionMark>
          <h2 id="what-an-ai-system-is-heading" className="mx-auto mt-6 max-w-4xl text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>
            <span className="block">A tool gives your team answers.</span>
            <span className="block">A system does the work.</span>
          </h2>
        </header>

        <div className="mt-12 sm:mt-14">
          <div className="-mx-1 overflow-x-auto px-1 pb-2">
            <div role="tablist" aria-label="Choose an industry" aria-orientation="horizontal" className="flex min-w-max justify-center gap-2">
              {sectors.map((sector, index) => {
                const isActive = activeSector.id === sector.id;
                return (
                  <button
                    key={sector.id}
                    ref={(element) => {
                      tabRefs.current[sector.id] = element;
                    }}
                    id={`system-sector-${sector.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="system-comparison-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectSector(sector)}
                    onKeyDown={(event) => handleSectorKeyDown(event, index)}
                    className={`min-h-11 rounded-md border px-5 font-display text-small font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 motion-reduce:transition-none ${
                      isActive ? "border-emerald bg-emerald text-fg-on-dark" : "border-border bg-transparent text-fg-2 hover:border-emerald/50 hover:text-emerald"
                    }`}
                  >
                    {sector.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-center text-center">
            <p className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">
              {activeSector.workflowLabel}
            </p>
          </div>

          <div
            id="system-comparison-panel"
            role="tabpanel"
            aria-labelledby={`system-sector-${activeSector.id}`}
            className="mt-8"
          >
            <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 font-display text-label font-bold uppercase tracking-[var(--tracking-label)] sm:flex sm:items-center sm:justify-between">
              <span className="text-fg-2 sm:order-1">With the tool</span>
              <span className="col-span-2 row-start-2 text-center text-emerald sm:order-2">Drag to compare</span>
              <span className="col-start-2 row-start-1 text-right text-fg-2 sm:order-3">With a system</span>
            </div>

            <div
              ref={comparisonRef}
              className="relative touch-none overflow-hidden border border-emerald/20 bg-surface-light"
              onPointerMove={handleComparisonPointerMove}
              onPointerUp={() => setIsDragging(false)}
              onPointerCancel={() => setIsDragging(false)}
            >
              <WorkflowStack steps={activeSector.states.system.steps} tone="system" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden bg-surface-light"
                style={{ clipPath: `inset(0 ${100 - inset}% 0 0)` }}
              >
                <WorkflowStack steps={activeSector.states.tool.steps} tone="tool" />
              </div>

              <div
                className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-emerald shadow-[0_0_0_1px_rgba(0,223,130,0.08)]"
                style={{ left: `${inset}%` }}
              >
                <button
                  type="button"
                  role="slider"
                  aria-label="Compare the workflow with the tool and with a system"
                  aria-orientation="vertical"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(inset)}
                  aria-valuetext={`${Math.round(inset)} percent with the tool shown`}
                  className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-7 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-sm border border-emerald bg-emerald text-fg-on-dark shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 motion-reduce:transition-none touch-none"
                  onPointerDown={startDragging}
                  onPointerMove={moveDragging}
                  onPointerUp={stopDragging}
                  onPointerCancel={stopDragging}
                  onKeyDown={handleSeparatorKeyDown}
                >
                  <GripVertical aria-hidden className="size-4" />
                </button>
              </div>
            </div>

            <div className="relative mt-7 min-h-[4.5rem] overflow-hidden border-t border-emerald/15 pt-5">
              <p
                className="font-display font-semibold tracking-[var(--tracking-body)] text-fg transition-opacity duration-200 motion-reduce:transition-none"
                style={{ fontSize: "var(--text-lead)", lineHeight: 1.25, opacity: inset < 50 ? 1 : 0 }}
              >
                {activeSector.states.tool.closing}
              </p>
              <p
                aria-hidden={inset < 50}
                className="absolute inset-x-0 top-5 font-display font-semibold tracking-[var(--tracking-body)] text-fg transition-opacity duration-200 motion-reduce:transition-none"
                style={{ fontSize: "var(--text-lead)", lineHeight: 1.25, opacity: inset >= 50 ? 1 : 0 }}
              >
                {activeSector.states.system.closing}
              </p>
            </div>

            <p className="sr-only" aria-live="polite">
              {inset < 50 ? "Showing more of the workflow with the tool." : "Showing more of the workflow with a system."}
            </p>
          </div>
        </div>

      </div>

      <noscript dangerouslySetInnerHTML={{ __html: noScriptFallbackMarkup() }} />
    </section>
  );
}
