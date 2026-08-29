import Link from "next/link";
import Hero from "@/components/home/Hero";
import FaqList, { type Faq } from "@/components/marketing/FaqList";
import WorkflowSelector, { type WorkflowExample } from "@/components/marketing/WorkflowSelector";
import { ArtifactFrame, CtaBand, WorkflowTrace } from "@/components/marketing/WorkflowVisuals";
import { BodyText, MarketingEyebrow, MarketingSection, SectionTitle, TextLink } from "@/components/marketing/MarketingPrimitives";

const situations = [
  ["01", "Copying", "The same information moves between tools every week."],
  ["02", "Chasing", "Follow-ups depend on one person remembering."],
  ["03", "Searching", "Staff ask for answers that already exist somewhere."],
  ["04", "Waiting", "Requests sit in a queue because nobody triages them."],
  ["05", "Rebuilding", "Reports take hours to prepare and minutes to read."],
  ["06", "Stalling", "A pilot worked once and never became routine."],
];

const workflowExamples: WorkflowExample[] = [
  {
    id: "rfq",
    label: "RFQ → brief",
    title: "An RFQ becomes a complete brief before anyone writes the quote.",
    context: "A sales or operations owner receives an email, PDF, or message with requirements spread across fields and attachments.",
    input: ["Email and PDF attachments", "Previous quote context"],
    preparation: ["Requirements grouped by item, quantity, and deadline", "Missing fields and clarifying questions"],
    humanDecision: "Sales owner reviews completeness and chooses the response.",
    recordedOutcome: "A decision-ready brief and next action return to the agreed queue.",
    owner: "The named sales or operations owner.",
    safeVersion: "Demonstration · synthetic RFQ · no client result claimed",
    status: "Demonstration",
  },
  {
    id: "lead",
    label: "Lead → next action",
    title: "A property or service enquiry becomes a reviewed next action.",
    context: "A lead arrives through a portal, WhatsApp, or a form, often without the information needed for a useful reply.",
    input: ["Enquiry message and contact details", "Availability or service context"],
    preparation: ["Structured summary and missing-information checklist", "Draft response and suggested follow-up"],
    humanDecision: "The responsible person checks fit, tone, and the promised next step.",
    recordedOutcome: "The approved response and follow-up date are recorded.",
    owner: "The named sales or service owner.",
    safeVersion: "Demonstration · representative enquiry · no client result claimed",
    status: "Demonstration",
  },
  {
    id: "meeting",
    label: "Meeting → actions",
    title: "A meeting becomes an accountable action brief.",
    context: "A transcript or set of notes contains decisions, owners, deadlines, open questions, and claims that need checking.",
    input: ["Transcript or meeting notes", "Existing project context"],
    preparation: ["Decisions, owners, and dates separated", "Open questions and claims marked for review"],
    humanDecision: "The meeting owner confirms what was actually agreed.",
    recordedOutcome: "Approved actions move into the team's existing task system.",
    owner: "The manager or project owner.",
    safeVersion: "Demonstration · fictional transcript · no client result claimed",
    status: "Demonstration",
  },
  {
    id: "report",
    label: "Documents → report",
    title: "Recurring documents become a reviewable report draft.",
    context: "A team gathers the same updates from email, spreadsheets, and documents before a regular review.",
    input: ["Approved source documents", "Reporting template and period"],
    preparation: ["Key fields extracted and grouped", "Missing data and unusual changes flagged"],
    humanDecision: "The report owner checks the sources and decides what matters.",
    recordedOutcome: "The reviewed report is published to the existing workspace.",
    owner: "The report or operations owner.",
    safeVersion: "Demonstration · synthetic source set · no client result claimed",
    status: "Demonstration",
  },
];

const principles = [
  { number: "01", title: "Work before tools", body: "The workflow decides the solution—not the tool you saw last week." },
  { number: "02", title: "Smallest useful build", body: "A bounded slice gives the team something real to test." },
  { number: "03", title: "Human approval", body: "A named person stays responsible for decisions and exceptions." },
  { number: "04", title: "Visible limits", body: "Errors, unsupported inputs, and fallback paths are designed in." },
  { number: "05", title: "Documented handover", body: "The team receives the access, runbook, and ownership to operate it." },
];

const homeFaqs: Faq[] = [
  { question: "What happens on an audit call?", answer: "We go through the workflow, where it breaks, who owns it, and what a useful improvement would mean. If there is no fit, we say so on the call." },
  { question: "Do you start by recommending tools?", answer: "No. We look at the work first, then decide whether the answer is a process change, an existing tool, a bounded build, or not yet." },
  { question: "Can you work with our existing software?", answer: "Usually. We check access, data, integration limits, and the system of record during scoping." },
  { question: "What data do you need?", answer: "Only representative workflow information agreed in writing. Do not send passwords, confidential files, or customer data before a scoped engagement." },
  { question: "Will our team be able to run it?", answer: "That is the point of handover. Training, documentation, access transfer, known limits, and a named owner are part of the delivery boundary." },
  { question: "How is work priced?", answer: "Per project, paid in phases. Scope, exclusions, milestones, measures, and any later expansion are written down before work starts." },
];

export default function HomePage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <Hero />

      <MarketingSection tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <MarketingEyebrow>Problem mirror</MarketingEyebrow>
            <SectionTitle className="mt-6">You bought the subscriptions. The work did not change.</SectionTitle>
          </div>
          <div>
            <BodyText className="max-w-3xl">Someone is good with ChatGPT. A pilot worked once. But the process still depends on copying, chasing, searching, waiting, rebuilding, and remembering.</BodyText>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {situations.map(([number, label, body]) => (
                <article key={number} className="rounded-card border border-border bg-white p-5 shadow-card">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[0.68rem] font-semibold tracking-[0.15em] text-emerald">{number}</span>
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-3">{label}</span>
                  </div>
                  <p className="mt-6 font-display font-bold text-fg" style={{ fontSize: "var(--text-small)", lineHeight: 1.35 }}>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </MarketingSection>

      <WorkflowSelector
        examples={workflowExamples}
        eyebrow="Workflow selector"
        title="Start with the queue, not the industry."
        description="Choose the task that keeps returning. Each example shows what comes in, what AI prepares, where a person decides, and what the team owns afterwards."
        defaultIndex={0}
      />

      <MarketingSection tone="dark">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
          <div>
            <MarketingEyebrow tone="dark">The operating model</MarketingEyebrow>
            <SectionTitle tone="dark" className="mt-6">First we map it. Then we prove it. Then you own it.</SectionTitle>
            <BodyText tone="dark" className="mt-5">One continuous delivery chain: Audit → Build → Handover. Every phase has an input, an output, and a stop condition.</BodyText>
          </div>
          <WorkflowTrace
            dark
            label="audit → build → handover"
            steps={[
              { label: "Audit", title: "Map the work", detail: "Workflow, owner, data, risk, and useful measure become visible.", status: "decide", tone: "neutral" },
              { label: "Build", title: "Test the smallest useful system", detail: "Representative cases, review points, exceptions, and limits are tested.", status: "prove", tone: "dark" },
              { label: "Handover", title: "Leave the client in control", detail: "Training, runbook, access transfer, and a named owner close the loop.", status: "own", tone: "green" },
            ]}
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
          <Link href="/services#audit" className="underline decoration-green/40 underline-offset-4 hover:text-green">See Audit</Link>
          <Link href="/services#build" className="underline decoration-green/40 underline-offset-4 hover:text-green">See Build</Link>
          <Link href="/services#handover" className="underline decoration-green/40 underline-offset-4 hover:text-green">See Handover</Link>
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <MarketingEyebrow>Workflow replay</MarketingEyebrow>
            <SectionTitle className="mt-6">A useful system returns a decision to the work.</SectionTitle>
            <BodyText className="mt-5">The goal is not a clever demo. It is a repeatable movement from messy input to a reviewed action, with the system of record and the owner still visible.</BodyText>
          </div>
          <ArtifactFrame
            status="Demonstration"
            label="illustrative handover pack"
            title="What the team should be able to open after we leave."
            footer="Representative artefact · real client outputs are shown only with permission"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["01", "Workflow map", "What comes in, where it stalls, and who owns the result."],
                ["02", "Test set", "Representative cases marked pass, review, exception, or out of scope."],
                ["03", "Runbook", "How to use it, check it, and recover when something changes."],
                ["04", "Owner card", "Named person, access path, limits, and escalation route."],
              ].map(([number, label, body]) => (
                <div key={number} className="rounded-lg border border-border bg-surface-muted p-4">
                  <span className="font-mono text-[0.66rem] font-bold text-emerald">{number}</span>
                  <p className="mt-3 font-display font-bold text-fg" style={{ fontSize: "var(--text-small)" }}>{label}</p>
                  <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>{body}</p>
                </div>
              ))}
            </div>
          </ArtifactFrame>
        </div>
      </MarketingSection>

      <MarketingSection tone="muted">
        <div className="max-w-3xl">
          <MarketingEyebrow>Delivery principles</MarketingEyebrow>
          <SectionTitle className="mt-6">Built around your business, not around a demo.</SectionTitle>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {principles.map((principle, index) => (
            <article key={principle.number} className={`rounded-card border p-5 ${index === 2 ? "border-emerald bg-emerald text-fg-on-dark" : "border-border bg-white shadow-card"}`}>
              <span className={`font-mono text-[0.66rem] font-bold ${index === 2 ? "text-green" : "text-emerald"}`}>{principle.number}</span>
              <h3 className={`mt-7 font-display font-bold ${index === 2 ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.25 }}>{principle.title}</h3>
              <p className={`mt-3 ${index === 2 ? "text-fg-on-dark/80" : "text-fg-2"}`} style={{ fontSize: "var(--text-label)", lineHeight: 1.5 }}>{principle.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-card border border-[#d6b77a]/60 bg-[#f8f0e1] p-5 text-[#5c431c]">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#846227]" aria-hidden />
          <p style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}><strong className="font-display">The human gate is part of the system.</strong> AI can prepare, classify, retrieve, or draft. A named person approves high-impact actions, exceptions, and anything outside the agreed boundary.</p>
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <MarketingEyebrow>Evidence ledger</MarketingEyebrow>
            <SectionTitle className="mt-6">What we can prove today.</SectionTitle>
            <BodyText className="mt-5">We separate delivered work, representative material, and claims that still need permission or measurement.</BodyText>
          </div>
          <div className="grid gap-4">
            <ArtifactFrame status="Demonstration" label="sample implementation" title="A workflow map with the decision boundary visible." footer="Illustrative structure · no client outcome implied">
              <div className="space-y-3">
                {["Source: email, PDF, or message", "Preparation: structured requirements", "Decision: owner reviews completeness", "Result: recorded brief + next action"].map((item, index) => <div key={item} className="flex items-center gap-3 border-b border-border pb-3 last:border-0 last:pb-0"><span className="font-mono text-[0.64rem] text-emerald">0{index + 1}</span><span>{item}</span></div>)}
              </div>
            </ArtifactFrame>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Delivered · training", "Demonstration · implementation", "Not yet claimed · measured result"].map((item, index) => <div key={item} className="rounded-lg border border-border bg-surface-muted p-4"><span className={`inline-block h-2 w-2 rounded-full ${index === 0 ? "bg-green" : index === 1 ? "bg-emerald" : "bg-fg-3"}`} aria-hidden /><p className="mt-3 font-mono text-[0.67rem] uppercase tracking-[0.1em] text-fg-2" style={{ lineHeight: 1.45 }}>{item}</p></div>)}
            </div>
          </div>
        </div>
      </MarketingSection>

      <section className="border-y border-border bg-surface-muted px-[var(--section-px)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <MarketingEyebrow>Capability first</MarketingEyebrow>
            <h2 className="mt-3 font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Need to train the team first?</h2>
            <BodyText className="mt-2 max-w-3xl">Practical AI sessions around your roles, approved tools, and real work.</BodyText>
          </div>
          <TextLink href="/training" className="shrink-0">Explore Training</TextLink>
        </div>
      </section>

      <FaqList faqs={homeFaqs} />

      <CtaBand
        eyebrow="One bounded next step"
        title="Bring the task your team keeps chasing."
        description="One call to understand where it breaks, who owns it, and whether AI should be involved."
        label="Book an audit call"
        intent="audit"
        promptChips={["What comes in?", "Where does it stall?", "Who owns it?", "What would useful mean?"]}
      />
    </main>
  );
}
