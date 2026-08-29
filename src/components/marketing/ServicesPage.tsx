import FaqList, { type Faq } from "@/components/marketing/FaqList";
import WorkflowSelector, { type WorkflowExample } from "@/components/marketing/WorkflowSelector";
import {
  ArtifactFrame,
  CtaBand,
  DecisionTreeVisual,
  FitGate,
  PageThesis,
  PhasePanel,
  WorkflowTrace,
} from "@/components/marketing/WorkflowVisuals";
import { BodyText, MarketingEyebrow, MarketingSection, SectionTitle } from "@/components/marketing/MarketingPrimitives";

const serviceWorkflowExamples: WorkflowExample[] = [
  {
    id: "real-estate",
    label: "Lead intake",
    title: "A property enquiry becomes a reviewed next action.",
    context: "A portal or WhatsApp enquiry arrives with incomplete details and needs a useful, timely response.",
    input: ["Portal, form, or WhatsApp enquiry", "Property or service context"],
    preparation: ["Structured lead summary", "Missing-information checklist and response draft"],
    humanDecision: "The sales owner checks fit, tone, availability, and the promised next step.",
    recordedOutcome: "Approved response and follow-up date return to the CRM or queue.",
    owner: "The named sales or service owner.",
    safeVersion: "Example to adapt · no packaged product implied",
    status: "Demonstration",
  },
  {
    id: "rfq",
    label: "RFQ to brief",
    title: "An RFQ becomes complete enough for a person to quote.",
    context: "Requirements arrive across an email, PDF, spreadsheet, or message, but the gaps are not visible yet.",
    input: ["Email and source documents", "Customer and previous-quote context"],
    preparation: ["Requirements grouped into a brief", "Missing fields and clarifying questions"],
    humanDecision: "The sales or operations owner validates the brief before any quote is drafted.",
    recordedOutcome: "The approved brief and next action are recorded in the existing system.",
    owner: "The named sales or operations owner.",
    safeVersion: "Example to adapt · synthetic source material",
    status: "Demonstration",
  },
  {
    id: "follow-up",
    label: "Appointments",
    title: "An appointment queue becomes a consistent follow-up loop.",
    context: "Bookings, cancellations, and no-shows need a response, but the next action depends on memory.",
    input: ["Booking and attendance status", "Approved message rules"],
    preparation: ["Priority and suggested next action", "Draft follow-up matched to the situation"],
    humanDecision: "A team member checks context and approves the message or exception.",
    recordedOutcome: "The response, status, and next follow-up are logged.",
    owner: "The service or customer-success owner.",
    safeVersion: "Example to adapt · no automation outcome claimed",
    status: "Demonstration",
  },
  {
    id: "reporting",
    label: "Reporting",
    title: "Recurring updates become a reviewable report draft.",
    context: "A manager collects repeated updates from documents and spreadsheets before a regular review.",
    input: ["Approved source files", "Reporting template and period"],
    preparation: ["Fields extracted and grouped", "Gaps, changes, and unusual items flagged"],
    humanDecision: "The report owner checks each important claim against the source.",
    recordedOutcome: "The reviewed report is published to the existing workspace.",
    owner: "The reporting or operations owner.",
    safeVersion: "Example to adapt · synthetic source set",
    status: "Demonstration",
  },
];

const fitChecks = [
  "A repeated task",
  "One accountable owner",
  "Usable source material",
  "A visible cost or delay",
  "A person who can approve the change",
];

const notYet = [
  "The request starts with a tool",
  "Nobody owns the workflow",
  "The outcome cannot be described",
  "The data cannot be shared lawfully",
  "A high-impact decision has no human review",
];

const serviceFaqs: Faq[] = [
  { question: "How long does an engagement take?", answer: "It depends on the workflow and the agreed test boundary. We commit to a timeline after the audit, not before." },
  { question: "What data access do you need?", answer: "Only what the workflow requires, agreed in writing first. Do not send passwords or confidential files before a scoped engagement." },
  { question: "What if AI is not the answer?", answer: "We say so and explain whether a process change, an existing tool, or a clearer owner would help instead." },
  { question: "Who owns the system afterwards?", answer: "You do. Accounts, administration, documentation, and the named owner are transferred at handover." },
  { question: "What does handover contain?", answer: "Training for the people who use it, a runbook, known limits, an escalation path, access transfer, and an agreed support period." },
  { question: "How are credentials handled?", answer: "Credentials go through secure, agreed channels. They are never requested by email or placed in a shared document." },
  { question: "Do you guarantee a result?", answer: "No result is promised before testing. Any published outcome needs a baseline, measurement period, and limitation." },
  { question: "How is work priced?", answer: "Per project, paid in phases. Scope changes, live integrations, broader rollout, monitoring, and support are written down separately." },
];

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <PageThesis
        eyebrow="AI workflow services"
        title="From a workflow problem to a system your team owns."
        description="We audit the work, build the smallest useful system, and hand it over with training, documentation, and clear limits."
        cta={{ label: "Book an audit call", intent: "audit" }}
        note="The engagement starts with one workflow and one owner. Broader implementation is earned by the evidence from that first slice."
        visual={
          <WorkflowTrace
            label="delivery trace"
            steps={[
              { label: "Input", title: "Messy work arrives", detail: "Email, forms, documents, messages, or a queue that keeps returning.", status: "observe", tone: "neutral" },
              { label: "Preparation", title: "A bounded first pass", detail: "The useful fields, missing information, and next action become visible.", status: "prepare", tone: "dark" },
              { label: "Human gate", title: "A person reviews", detail: "A named owner verifies the source and decides what may happen next.", status: "approve", tone: "green" },
              { label: "Recorded", title: "The result returns", detail: "The approved brief or action goes back to the system of record.", status: "record", tone: "neutral" },
              { label: "Ownership", title: "Your team runs it", detail: "Runbook, access, limits, and escalation path stay with the client.", status: "own", tone: "green" },
            ]}
          />
        }
      />

      <MarketingSection tone="muted">
        <div className="max-w-3xl">
          <MarketingEyebrow>Fit gate</MarketingEyebrow>
          <SectionTitle className="mt-6">A good first project has five things.</SectionTitle>
          <BodyText className="mt-5">This is a qualification tool, not a rejection wall. If one of the fundamentals is missing, fix that before adding automation.</BodyText>
        </div>
        <div className="mt-10"><FitGate checks={fitChecks} notYet={notYet} note="The sixth rule: high-impact actions and exceptions always have a human owner." /></div>
      </MarketingSection>

      <WorkflowSelector
        examples={serviceWorkflowExamples}
        eyebrow="Example workflows"
        title="What comes in messy and leaves ready for a decision?"
        description="Real-estate lead intake, RFQ-to-brief, appointment follow-up, and reporting are starting points—not fixed industry packages."
        defaultIndex={1}
      />

      <PhasePanel
        number="01"
        label="Audit"
        title="First, stop the wrong project."
        intro="We find where the work actually stalls and decide whether the answer is a process change, an existing tool, a bounded build, or not yet."
        input="Current workflow, owner, volume, source material, and previous attempts"
        output="Current-state map, ranked opportunity, risk and data-readiness notes, measure, and next step"
        boundary="No build decision without a clear workflow, owner, evidence, and useful outcome"
      />

      <MarketingSection tone="dark">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
          <div>
            <MarketingEyebrow tone="dark">Audit output</MarketingEyebrow>
            <SectionTitle tone="dark" className="mt-6">The audit earns the next decision.</SectionTitle>
            <BodyText tone="dark" className="mt-5">A useful audit can end in a process fix, a tool recommendation, a bounded build, or a clear “not yet.” The build path is not preselected.</BodyText>
          </div>
          <DecisionTreeVisual />
        </div>
      </MarketingSection>

      <PhasePanel
        number="02"
        label="Build"
        title="Prove the smallest useful system."
        intro="Approved scope and representative test cases go in. A working slice, human review, exceptions, documented limits, and measured test results come out."
        input="Agreed workflow, source material, scope, test cases, and system-of-record boundary"
        output="Working slice, review points, exception path, documented limits, and test notes"
        boundary="Live integrations, monitoring, sensitive data, and broader rollout are separately scoped"
        tone="muted"
      />

      <MarketingSection>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <MarketingEyebrow>Build boundary</MarketingEyebrow>
            <SectionTitle className="mt-6">A prototype is not the finish line.</SectionTitle>
            <BodyText className="mt-5">The system has to survive representative inputs, predictable failures, human review, and a named owner before the work expands.</BodyText>
          </div>
          <ArtifactFrame status="Method" label="test console" title="Every case has a visible state." footer="No invented performance number. Results are measured against the agreed test set.">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Pass", "The output meets the agreed requirement."],
                ["Review", "A person checks the source before action."],
                ["Exception", "The case leaves the normal path for a named owner."],
                ["Out of scope", "The system stops and does not pretend."],
              ].map(([state, body], index) => (
                <div key={state} className="rounded-lg border border-border bg-surface-muted p-4">
                  <div className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-green" : index === 1 ? "bg-emerald" : index === 2 ? "bg-[#b78b3b]" : "bg-fg-3"}`} aria-hidden /><span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-fg-3">{state}</span></div>
                  <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>{body}</p>
                </div>
              ))}
            </div>
          </ArtifactFrame>
        </div>
      </MarketingSection>

      <PhasePanel
        number="03"
        label="Handover"
        title="Six months later, can your team still run it?"
        intro="That is the handover test. We train the people who use it, transfer access, document the limits, and agree what happens when something falls outside them."
        input="Working system, known exceptions, access list, runbook, and named client owner"
        output="Trained users, transferred accounts, runbook, limits, escalation path, and support period"
        boundary="Elyst is outside the daily loop. Ongoing improvement is scoped separately if needed."
        tone="dark"
      />

      <MarketingSection tone="muted">
        <div className="max-w-3xl">
          <MarketingEyebrow>Engagement boundaries</MarketingEyebrow>
          <SectionTitle className="mt-6">The first project stays deliberately small.</SectionTitle>
          <BodyText className="mt-5">One workflow, one owner, one agreed measure, a bounded test set, and visible human review. Complexity expands only through a written decision.</BodyText>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["01", "First proof", "One workflow · one owner · bounded test set · clear review gate"],
            ["02", "Paid implementation", "Approved integrations · live access · monitoring · support"],
            ["03", "Later rollout", "More teams, more workflows, and broader change only after evidence"],
          ].map(([number, title, body], index) => (
            <article key={number} className={`rounded-card border p-6 ${index === 0 ? "border-emerald bg-emerald text-fg-on-dark" : "border-border bg-white shadow-card"}`}>
              <span className={`font-mono text-[0.66rem] font-bold ${index === 0 ? "text-green" : "text-emerald"}`}>{number}</span>
              <h3 className={`mt-7 font-display font-bold ${index === 0 ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-h3)" }}>{title}</h3>
              <p className={`mt-4 ${index === 0 ? "text-fg-on-dark/80" : "text-fg-2"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-border bg-white p-6 shadow-card"><p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-emerald">We bring</p><p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>Discovery, architecture, build, testing, training, documentation, and a written scope.</p></div>
          <div className="rounded-card border border-border bg-white p-6 shadow-card"><p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-emerald">You bring</p><p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>A decision owner, lawful access, representative work, reviewers, and timely decisions.</p></div>
        </div>
      </MarketingSection>

      <FaqList faqs={serviceFaqs} />

      <CtaBand
        eyebrow="Bring a workflow"
        title="Bring us one workflow that is not working."
        description="Tell us what comes in, where it stalls, who owns it, and what a useful improvement would look like."
        label="Book an audit call"
        intent="audit"
        promptChips={["Workflow", "Owner", "Source material", "Useful measure"]}
      />
    </main>
  );
}
