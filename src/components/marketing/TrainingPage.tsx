import FaqList, { type Faq } from "@/components/marketing/FaqList";
import WorkflowSelector, { type WorkflowExample } from "@/components/marketing/WorkflowSelector";
import {
  ArtifactFrame,
  CtaBand,
  PageThesis,
  SessionBriefVisual,
  SessionLoopVisual,
  WorkflowTrace,
} from "@/components/marketing/WorkflowVisuals";
import { BodyText, MarketingEyebrow, MarketingSection, SectionTitle } from "@/components/marketing/MarketingPrimitives";

const trainingExamples: WorkflowExample[] = [
  {
    id: "training-rfq",
    label: "RFQ exercise",
    title: "Turn an RFQ into a decision-ready brief.",
    context: "Participants work from synthetic source material and practise extracting requirements without losing the source or the gaps.",
    input: ["RFQ email and PDF", "Role context and approved tool"],
    preparation: ["Requirements grouped into a brief", "Missing fields and clarifying questions"],
    humanDecision: "The participant verifies the brief against the source and decides what to ask next.",
    recordedOutcome: "A reusable checklist and reviewed next-action brief.",
    owner: "The participant's role owner or manager.",
    safeVersion: "Representative exercise · synthetic documents",
    status: "Demonstration",
  },
  {
    id: "training-meeting",
    label: "Meeting exercise",
    title: "Turn a meeting into accountable next actions.",
    context: "A fictional transcript contains decisions, owners, dates, open questions, and claims that need checking.",
    input: ["Fictional transcript", "Existing action or project template"],
    preparation: ["Decisions, owners, and dates separated", "Open questions marked for review"],
    humanDecision: "Participants compare the output with the transcript and correct what was not agreed.",
    recordedOutcome: "An action brief that fits the team's existing task system.",
    owner: "The meeting or project owner.",
    safeVersion: "Representative exercise · fictional transcript",
    status: "Demonstration",
  },
  {
    id: "training-response",
    label: "Customer response",
    title: "Draft a customer response without skipping judgement.",
    context: "Participants use an approved scenario to frame the task, set the tone, and decide what needs a person before sending.",
    input: ["Customer message and policy excerpt", "Approved tone and response boundary"],
    preparation: ["Draft response with source references", "Unclear or risky claims flagged"],
    humanDecision: "The participant checks accuracy, tone, and whether the response should be sent at all.",
    recordedOutcome: "A reviewed draft and a repeatable response checklist.",
    owner: "The service or customer-success owner.",
    safeVersion: "Representative exercise · approved synthetic scenario",
    status: "Demonstration",
  },
  {
    id: "training-research",
    label: "Research",
    title: "Research a question with a verification step built in.",
    context: "Participants start with a real work question and learn to separate source, inference, uncertainty, and next action.",
    input: ["Work question and source boundary", "Approved research tools"],
    preparation: ["Source-backed summary", "Claims, gaps, and follow-up questions"],
    humanDecision: "The participant checks the important claims before using the answer.",
    recordedOutcome: "A research brief with a reusable verification checklist.",
    owner: "The person accountable for the decision.",
    safeVersion: "Representative exercise · source boundary agreed in session",
    status: "Demonstration",
  },
];

const trainingFaqs: Faq[] = [
  { question: "Can the session be customised?", answer: "Yes. We start with the audience, role mix, approved tools, real tasks, and desired change before designing the session." },
  { question: "Can you use our tools?", answer: "Yes, where access and policy allow it. We prefer familiar tools over a tour of new ones." },
  { question: "Who is it suitable for?", answer: "Leadership teams, functional departments, cross-functional teams, internal champions, and institutions. The examples and depth change by room." },
  { question: "How many people can attend?", answer: "It depends on the format, exercise design, and amount of individual practice. We confirm a useful participant range in the proposal." },
  { question: "Is it on-site or remote?", answer: "Both. Location, equipment, access, and facilitation needs are agreed before the session." },
  { question: "What preparation is needed?", answer: "A sponsor, role mix, approved tool list, representative tasks, and the boundaries participants need to respect. Do not send confidential data." },
  { question: "What follow-through is included?", answer: "The proposal states whether the engagement includes resources, a manager-owned action, a check-in, or further implementation work. We do not imply follow-through that is not included." },
  { question: "How is training priced?", answer: "Per session or programme, based on audience, format, preparation, facilitation, and follow-through. We confirm the scope before pricing." },
  { question: "Are certificates provided?", answer: "Certificates are not automatic. If a certificate is useful for your programme, we can define the format and criteria in the proposal." },
];

const formatCards = [
  { title: "Align leaders", best: "Leaders need a shared view of where AI belongs and what must stay controlled.", room: "A concise briefing, decision examples, and a safe-use boundary.", leaves: "A shortlist of decisions and a next workflow to examine." },
  { title: "Practise one workflow", best: "A department needs to change a repeated task, not just learn concepts.", room: "Role-specific examples, live practice, critique, and a reusable method.", leaves: "A practised workflow and a checklist the team can reuse." },
  { title: "Build safe-use habits", best: "A mixed team is using AI inconsistently or without a common review rule.", room: "Approved tools, data boundaries, verification, and human ownership.", leaves: "Shared language and a clear boundary for responsible use." },
  { title: "Develop internal champions", best: "A programme has a manager owner and a real challenge that can continue after the room.", room: "Deeper practice, challenge framing, review, and next-action planning.", leaves: "A manager-owned experiment or a scoped implementation question." },
];

export default function TrainingPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <PageThesis
        eyebrow="Corporate and institutional training"
        title="A session your team can use on Monday."
        description="Not a tour of AI tools. Your team practises relevant work, learns where human review belongs, and leaves with a repeatable method."
        cta={{ label: "Plan a team session", intent: "training" }}
        note="The session is designed around roles, approved tools, real tasks, and the operating constraints the sponsor needs respected."
        visual={<SessionBriefVisual />}
      />

      <MarketingSection tone="dark">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-20">
          <div>
            <MarketingEyebrow tone="dark">Proof status</MarketingEyebrow>
            <SectionTitle tone="dark" className="mt-6">Training is delivered. The proof is labelled honestly.</SectionTitle>
            <BodyText tone="dark" className="mt-5">Corporate delivery experience exists, but exact names, quotes, images, and scale belong on the page only when permissioned and reconciled.</BodyText>
          </div>
          <ArtifactFrame status="Anonymised" label="corporate session replay" title="A cross-functional team practised work, not tool theatre." tone="dark" footer="Audience and session details shown at the level currently safe to publish; named proof requires permission.">
            <div className="grid gap-3 sm:grid-cols-2">
              {["Role-based task examples", "Approved tools and information boundaries", "Live practice and critique", "Reusable checklist and next action"].map((item, index) => <div key={item} className="rounded-lg border border-white/10 bg-black/10 p-4"><span className="font-mono text-[0.64rem] text-green">0{index + 1}</span><p className="mt-3 text-fg-on-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>{item}</p></div>)}
            </div>
          </ArtifactFrame>
        </div>
      </MarketingSection>

      <MarketingSection tone="muted">
        <MarketingEyebrow>Sponsor + participant fit</MarketingEyebrow>
        <SectionTitle className="mt-6">Built for the sponsor. Designed for the room.</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-card border border-border bg-white p-6 shadow-card md:p-8">
            <p className="font-mono text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-emerald">The sponsor needs</p>
            <h3 className="mt-5 font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>A session they can defend.</h3>
            <ul className="mt-6 space-y-3 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>{["Relevant outcomes", "Safe-use boundaries", "A format matched to the room", "A follow-through decision"].map((item) => <li key={item} className="flex gap-3 border-t border-border pt-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />{item}</li>)}</ul>
          </article>
          <article className="rounded-card border border-emerald bg-emerald p-6 text-fg-on-dark shadow-card md:p-8">
            <p className="font-mono text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-green">Participants need</p>
            <h3 className="mt-5 font-display font-bold" style={{ fontSize: "var(--text-h3)" }}>A room that respects their work.</h3>
            <ul className="mt-6 space-y-3 text-fg-on-dark/85" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>{["Practical exercises", "Clear examples with no assumed technical background", "Approved tools they can actually use", "A method they can explain and inspect"].map((item) => <li key={item} className="flex gap-3 border-t border-white/15 pt-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />{item}</li>)}</ul>
          </article>
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <MarketingEyebrow>Session design</MarketingEyebrow>
            <SectionTitle className="mt-6">Before the room. In the room. After the room.</SectionTitle>
            <BodyText className="mt-5">No session starts with a slide deck. It starts with the work the team needs to do better and the risks the sponsor needs controlled.</BodyText>
          </div>
          <WorkflowTrace
            label="session timeline"
            steps={[
              { label: "Before", title: "Discover roles, tools, and tasks", detail: "Agree the audience, approved tools, representative work, and desired change.", status: "prepare", tone: "neutral" },
              { label: "In the room", title: "Frame → use AI → verify → decide", detail: "Participants practise a real task, compare outputs, and critique what needs a person.", status: "practice", tone: "dark" },
              { label: "After", title: "Leave with a usable next step", detail: "Resources, a reusable artefact, manager-owned action, and any agreed check-in are explicit.", status: "transfer", tone: "green" },
            ]}
          />
        </div>
      </MarketingSection>

      <WorkflowSelector
        examples={trainingExamples}
        eyebrow="Session replay"
        title="See one exercise from start to finish."
        description="Every replay shows the original task, participant attempt, verification step, improved output, and reusable checklist."
        defaultIndex={0}
        compact
      />

      <MarketingSection tone="muted">
        <MarketingEyebrow>Useful outputs</MarketingEyebrow>
        <SectionTitle className="mt-6">What your team walks out with.</SectionTitle>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {["One practised workflow", "Reusable task checklist", "Agreed data boundaries", "Human-review rule", "Next-step plan"].map((item, index) => <article key={item} className="rounded-card border border-border bg-white p-5 shadow-card"><span className="font-mono text-[0.66rem] font-bold text-emerald">0{index + 1}</span><h3 className="mt-7 font-display font-bold text-fg" style={{ fontSize: "var(--text-small)", lineHeight: 1.3 }}>{item}</h3><p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.5 }}>{["Something the team has actually practised.", "A repeatable way to frame the next task.", "A boundary for what information can be used.", "A clear point where a person checks and decides.", "A realistic action matched to the format."][index]}</p></article>)}
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className="max-w-3xl">
          <MarketingEyebrow>Choose by outcome</MarketingEyebrow>
          <SectionTitle className="mt-6">The format follows what should change.</SectionTitle>
          <BodyText className="mt-5">A briefing, workshop, or programme is a delivery choice—not a product tier. We choose it with the sponsor and the room.</BodyText>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {formatCards.map((format, index) => <article key={format.title} className="rounded-card border border-border bg-white p-6 shadow-card md:p-7"><div className="flex items-center justify-between gap-4"><span className="font-mono text-[0.66rem] font-bold text-emerald">0{index + 1}</span><span className="rounded-full bg-surface-muted px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fg-3">format</span></div><h3 className="mt-7 font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>{format.title}</h3><dl className="mt-5 space-y-4"><div><dt className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-emerald">Best when</dt><dd className="mt-1 text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>{format.best}</dd></div><div><dt className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-emerald">In the room</dt><dd className="mt-1 text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>{format.room}</dd></div><div><dt className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-emerald">Leaves you with</dt><dd className="mt-1 text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>{format.leaves}</dd></div></dl></article>)}
        </div>
      </MarketingSection>

      <MarketingSection tone="muted">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
          <div>
            <MarketingEyebrow>Safety + follow-through</MarketingEyebrow>
            <SectionTitle className="mt-6">The session ends with judgement, not a prompt.</SectionTitle>
            <BodyText className="mt-5">Participants learn where data can go, how to verify an output, when a human decides, and what happens after the session.</BodyText>
          </div>
          <SessionLoopVisual />
        </div>
      </MarketingSection>

      <MarketingSection>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <MarketingEyebrow>History, labelled</MarketingEyebrow>
            <SectionTitle className="mt-6">Relevant proof first. History second.</SectionTitle>
            <BodyText className="mt-5">Corporate delivery belongs next to corporate evidence. Earlier public programmes can show teaching history, but they are not substitutes for a corporate case.</BodyText>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ArtifactFrame status="Anonymised" label="corporate proof" title="One session, described at the level safe to publish." footer="Named client, quote, image, and reconciled scale require permission.">
              <p>Audience context, exercises, approved tools, and the artefact participants left with. The evidence is separated from any measured productivity claim.</p>
            </ArtifactFrame>
            <ArtifactFrame status="Delivered" label="public programme history" title="Earlier programmes remain a separate lane." footer="History is not a current corporate offer.">
              <ul className="space-y-3">{["AI Yathra", "AI for Work", "Elyst AI Circle"].map((item) => <li key={item} className="flex gap-3 border-b border-border pb-3 last:border-0 last:pb-0"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />{item}</li>)}</ul>
            </ArtifactFrame>
          </div>
        </div>
      </MarketingSection>

      <FaqList faqs={trainingFaqs} />

      <CtaBand
        eyebrow="Plan a useful room"
        title="Tell us what your team is stuck on."
        description="We will build the session around the role mix, approved tools, sample work, preferred format, and desired change—not around a standard package."
        label="Plan a team session"
        intent="training"
        promptChips={["Role mix", "Team size", "Approved tools", "Sample work", "Format", "Desired change"]}
      />
    </main>
  );
}
