"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
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

const stateOptions: readonly { id: StateId; label: string }[] = [
  { id: "tool", label: "With the tool" },
  { id: "system", label: "With a system" },
];

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

export default function SystemActuallyIs() {
  const sectors = systemComparisonData.sectors;
  const [activeSectorId, setActiveSectorId] = useState("real-estate");
  const [activeState, setActiveState] = useState<StateId>("tool");
  const [copyVisible, setCopyVisible] = useState(true);
  const hasMountedCopy = useRef(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeSector = sectors.find((sector) => sector.id === activeSectorId) ?? sectors[0];
  const activeWorkflow = activeSector.states[activeState];

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

  useEffect(() => {
    if (!hasMountedCopy.current) {
      hasMountedCopy.current = true;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hideTimer = window.setTimeout(() => setCopyVisible(false), 0);
    const showTimer = window.setTimeout(() => setCopyVisible(true), 24);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(showTimer);
    };
  }, [activeSectorId, activeState]);

  function selectSector(sector: Sector) {
    setActiveSectorId(sector.id);
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

  function handleStateKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    const nextState = event.key === "ArrowLeft" || event.key === "Home" ? "tool" : "system";
    setActiveState(nextState);
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
          <p className="mx-auto mt-5 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
            Pick your industry and watch the same workflow run twice.
          </p>
        </header>

        <div className="mt-12 border-y border-emerald/15 py-5 sm:mt-14 sm:py-6">
          <div className="-mx-1 overflow-x-auto px-1 pb-2">
            <div role="tablist" aria-label="Choose an industry" aria-orientation="horizontal" className="flex min-w-max gap-2">
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

          <div className="mt-7 flex flex-col gap-5 border-t border-emerald/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">
              {activeSector.workflowLabel}
            </p>

            <div role="radiogroup" aria-label="Compare the workflow" className="relative grid w-full grid-cols-2 rounded-full border border-emerald/25 bg-surface-muted p-1 sm:w-auto sm:min-w-[20rem]">
              <span
                aria-hidden
                className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-emerald transition-transform duration-200 ease-out motion-reduce:transition-none"
                style={{ transform: activeState === "system" ? "translateX(100%)" : "translateX(0)" }}
              />
              {stateOptions.map((option) => {
                const isActive = activeState === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveState(option.id)}
                    onKeyDown={handleStateKeyDown}
                    className={`relative z-10 min-h-11 rounded-full px-4 font-display text-small font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 motion-reduce:transition-none ${isActive ? "text-fg-on-dark" : "text-fg-2 hover:text-emerald"}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="system-comparison-panel" role="tabpanel" aria-labelledby={`system-sector-${activeSector.id}`} aria-live="polite" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {activeWorkflow.steps.map((step) => (
                <article key={step.n} className="min-h-[17rem] border border-emerald/20 bg-surface-light p-5 sm:p-6">
                  <div className="flex h-full gap-4 lg:block">
                    <span className="shrink-0 border-r border-emerald/20 pr-4 font-display text-label font-bold tracking-[var(--tracking-label)] text-emerald lg:block lg:border-r-0 lg:border-b lg:pb-4 lg:pr-0">
                      {step.n}
                    </span>
                    <div
                      className="flex min-w-0 flex-1 flex-col transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none lg:pt-5"
                      style={{
                        opacity: copyVisible ? 1 : 0,
                        transform: copyVisible ? "translateY(0)" : "translateY(5px)",
                      }}
                    >
                      <h3 className="font-display font-semibold tracking-[var(--tracking-display)] text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.1 }}>
                        {step.title}
                      </h3>
                      <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-7 font-display font-semibold tracking-[var(--tracking-body)] text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}>
              {activeWorkflow.closing}
            </p>
          </div>
        </div>

        <footer className="mt-8 flex flex-col gap-4 border-t border-emerald/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}>
              Same tools. Same team. The system around them is what changed.
            </p>
            <p className="mt-2 text-fg-3" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>
              Illustrative workflows, not client work. What we&apos;d actually build gets decided in the audit.
            </p>
          </div>
          <Link href="/services" className="shrink-0 font-display font-bold text-emerald underline decoration-emerald/40 underline-offset-4 transition-colors hover:text-emerald-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2" style={{ fontSize: "var(--text-small)" }}>
            See how we build one →
          </Link>
        </footer>
      </div>

      <noscript dangerouslySetInnerHTML={{ __html: noScriptFallbackMarkup() }} />
    </section>
  );
}
