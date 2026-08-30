"use client";

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
      <li class="min-w-0">
        <p class="font-display font-semibold text-fg" style="font-size:var(--text-card);line-height:1.05">
          ${escapeHtml(step.title)}
        </p>
        <span class="sr-only">${escapeHtml(step.body)}</span>
      </li>`).join("");

    return `
      <article class="rounded-md border border-emerald/20 bg-surface-light p-5 sm:p-7">
        <p class="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">${escapeHtml(sector.label)}</p>
        <p class="mt-3 text-center font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">${escapeHtml(sector.workflowLabel)}</p>
        <ol class="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">${steps}</ol>
        <p class="mx-auto mt-8 max-w-3xl text-center font-display font-semibold text-fg" style="font-size:var(--text-lead);line-height:1.3">${escapeHtml(sector.states.system.closing)}</p>
      </article>`;
  }).join("");

  return `<div class="mx-auto mt-12 max-w-7xl space-y-4">${cards}</div>`;
}

function WorkflowRow({ steps, workflowLabel }: { steps: readonly WorkflowStep[]; workflowLabel: string }) {
  return (
    <div className="rounded-md border border-emerald/20 bg-surface-light p-5 sm:p-7 lg:p-9">
      <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">
          {workflowLabel}
        </p>
        <p className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-fg-3">
          With a system
        </p>
      </div>

      <ol className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 sm:gap-4 lg:gap-8">
        {steps.map((step) => (
          <li key={step.n} className="min-w-0 text-center sm:text-left">
            <p
              className="font-display font-semibold text-fg"
              style={{ fontSize: "var(--text-card)", lineHeight: 1.04 }}
            >
              {step.title}
            </p>
            <span className="sr-only">{step.body}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function SystemActuallyIs() {
  const sectors = systemComparisonData.sectors;
  const [activeSectorId, setActiveSectorId] = useState("real-estate");
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

  return (
    <section
      id="what-an-ai-system-is"
      aria-labelledby="what-an-ai-system-is-heading"
      className="relative overflow-hidden bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
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
                    aria-controls="system-workflow-panel"
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

          <div
            id="system-workflow-panel"
            role="tabpanel"
            aria-labelledby={`system-sector-${activeSector.id}`}
            tabIndex={0}
            className="mt-8 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald focus-visible:outline-offset-4"
          >
            <WorkflowRow
              steps={activeSector.states.system.steps}
              workflowLabel={activeSector.workflowLabel}
            />

            <p
              className="mx-auto mt-8 max-w-3xl text-center font-display font-semibold tracking-[var(--tracking-body)] text-fg"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.3 }}
            >
              {activeSector.states.system.closing}
            </p>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing the {activeSector.label} workflow.
          </p>
        </div>
      </div>

      <noscript dangerouslySetInnerHTML={{ __html: noScriptFallbackMarkup() }} />
    </section>
  );
}
