import BookingButton from "@/components/marketing/BookingButton";
import { SectionMark } from "@/components/ui/section-mark";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import ProgramsHistory from "@/components/training/ProgramsHistory";
import { AudienceVisual, OutcomeVisual, type OutcomeVisualId } from "@/components/training/TrainingVisuals";
import { VisualCard } from "@/components/ui/visual-card";
import SessionInputs from "@/components/training/SessionInputs";
import TrainingProcessSteps, { type TrainingStep } from "@/components/training/TrainingProcessSteps";
import ArvindSessionSection from "@/components/training/ArvindSessionSection";
import { ShaderPrincipleCard, type Principle } from "@/components/home/PrinciplesGrid";
import TrainingRoutingStrip from "@/components/home/TrainingRoutingStrip";

const trainingSteps: TrainingStep[] = [
  {
    label: "Discover",
    description: ["We learn the roles, the tools", "and the tasks that matter."],
  },
  {
    label: "Design",
    description: ["A small set of concepts and", "tailor-made hands-on exercises."],
  },
  {
    label: "Deliver",
    description: ["Practice on real work with a", "clear view of what AI can do."],
  },
];

const trainingFaqs = [
  { q: "Can it be customised?", a: "Yes. That happens before we design anything." },
  { q: "Can you use our tools?", a: "Yes, and we prefer it." },
  { q: "How many people?", a: "Confirmed in the proposal, based on format." },
  { q: "Suitable for beginners?", a: "Yes. Sessions are built around the room." },
  { q: "On site or remote?", a: "Both." },
  { q: "What do you need from us?", a: "Real work examples and your tool list." },
];

const trainingOutcomes: { title: string; visual: OutcomeVisualId }[] = [
  { title: "A realistic view of what AI can and cannot do", visual: "reality" },
  { title: "Better habits with the tools you already pay for", visual: "habits" },
  { title: "Role-specific workflows practised in the room", visual: "workflows" },
];

const trainingStats = [
  { value: "3,000+", label: "people trained" },
  { value: "50+", label: "live sessions" },
  { value: "4+", label: "industries" },
];

const investmentStats = [
  {
    value: "7%",
    copy: "of AI spend goes to the workforce. 93% goes to technology.",
    source: "Source: Deloitte, 2025",
  },
  {
    value: "12%",
    copy: "of employees say they get enough AI training to actually benefit from it.",
    source: "Source: EY, 2025",
  },
  {
    value: "88%",
    copy: "use AI, but mostly for basic tasks like search and summarising.",
    source: "Source: EY, 2025",
  },
] as const;

const audiences = [
  { title: "Companies rolling out AI tools to a team", kind: "team" as const },
  { title: "Departments needing role-specific workflows", kind: "department" as const },
];

function AudiencePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {audiences.map((audience) => {
        const principle: Principle = {
          title: audience.title,
          description: "Built around the roles, tools, and real work already inside the team.",
          visual: () => <AudienceVisual kind={audience.kind} className="max-w-[14rem]" />,
        };

        return <ShaderPrincipleCard key={audience.title} principle={principle} visualFirst />;
      })}
    </div>
  );
}

function TrainingInvestmentSection() {
  return (
    <section className="bg-surface-accent-soft" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-7xl">
        <header className="max-w-6xl">
          <h2 className="text-balance text-fg" style={{ fontSize: "var(--text-h1)", lineHeight: 1.02 }}>
            The AI investment has <span className="hero-accent-word-red">not worked</span> for most companies.
          </h2>
          <p className="mt-8 max-w-6xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
            Enterprises are spending heavily on AI technology, but outcomes remain inconsistent. Most AI initiatives stall at experimentation, with limited adoption, unclear ownership, and little measurable return.
          </p>
        </header>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:mt-16 lg:gap-12">
          {investmentStats.map((stat) => (
            <article key={stat.value}>
              <p className="font-display font-bold text-[var(--elyst-red-muted)]" style={{ fontSize: "var(--text-stat)", lineHeight: 0.9 }}>
                {stat.value}
              </p>
              <p className="mt-6 max-w-sm text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                {stat.copy}
              </p>
              <p className="mt-4 font-display text-fg-3" style={{ fontSize: "var(--text-small)", lineHeight: 1.35 }}>
                {stat.source}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomesBoard() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {trainingOutcomes.map((outcome, index) => (
        <li key={outcome.title}>
          <VisualCard decorated={false} className="flex min-h-80 h-full flex-col p-6 sm:p-7">
            <div className="flex h-32 items-center justify-center">
              <OutcomeVisual id={outcome.visual} className="max-w-[14rem]" />
            </div>
            <span className="mt-6 font-display font-semibold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              0{index + 1}
            </span>
            <h3 className="mt-3 max-w-sm text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.2 }}>
              {outcome.title}
            </h3>
          </VisualCard>
        </li>
      ))}
    </ol>
  );
}

function TrainingHonesty() {
  const className = "mx-auto max-w-5xl justify-center text-center font-display font-bold text-[length:calc(var(--text-card)+2px)] leading-[1.15] tracking-[var(--tracking-display)]";

  return (
    <div className="training-honesty-gradient mx-auto mt-12 max-w-5xl text-center sm:mt-14 lg:col-span-2">
      <TextGradientScroll text="Anyone promising you a percentage" className={className} />
      <TextGradientScroll text="After one session is guessing." className={`${className} mt-2`} />
    </div>
  );
}

function TrainingProof() {
  return (
    <section className="relative overflow-hidden bg-surface-accent-soft" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-emerald/20" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <header className="flex flex-col justify-center">
            <SectionMark>Proof</SectionMark>
            <h2 className="mt-6 max-w-3xl text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              Training built to be used, not just attended.
            </h2>
          </header>

          <div className="flex flex-col justify-center">
            <p className="font-display font-bold uppercase tracking-[var(--tracking-label)] text-emerald" style={{ fontSize: "var(--text-label)" }}>
              Our solution
            </p>
            <p className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.05 }}>
              Sessions shaped around the roles, tools, and work in the room.
            </p>
            <p className="mt-6 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              The aim is useful practice: people leave with a realistic view of what AI can do and a next step they can take back to work.
            </p>
          </div>
        </div>

        <div className="mt-16 grid border-y border-emerald/20 lg:grid-cols-3">
          {trainingStats.map((stat, index) => (
            <article key={stat.label} className={`py-8 sm:py-9 lg:px-8 lg:py-10 ${index > 0 ? "border-t border-emerald/20 lg:border-l lg:border-t-0" : ""}`}>
              <p className="font-display font-semibold tracking-[var(--tracking-stat)] text-emerald" style={{ fontSize: "var(--text-proof-number)", lineHeight: 0.9 }}>
                {stat.value}
              </p>
              <p className="mt-5 font-display font-bold uppercase tracking-[var(--tracking-label)] text-fg" style={{ fontSize: "var(--text-label)" }}>
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-display font-bold uppercase tracking-[var(--tracking-label)] text-emerald" style={{ fontSize: "var(--text-label)" }}>
              Training feedback
            </p>
            <blockquote className="mt-5 max-w-2xl font-display font-semibold tracking-[var(--tracking-display)] text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}>
              “Not a forced five-star review. It is what people actually felt.”
            </blockquote>
            <p className="mt-5 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
              Feedback from previous Elyst AI sessions
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <p className="max-w-xl text-fg-2 lg:text-right" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              The format changes with the room. The standard is that people leave knowing what to try next.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default function TrainingPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section className="relative overflow-hidden bg-surface-dark" style={{ padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(64px, 8vw, 104px)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.62fr)] xl:items-center xl:gap-16">
          <div className="max-w-3xl">
            <SectionMark tone="dark">Training</SectionMark>
            <h1 className="training-hero-title mt-6 text-fg-on-dark" style={{ lineHeight: 1.04 }}>
              <span className="block">AI training built around the</span>
              <span className="block">work your team already does.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              We build a training session around your roles, your tools, and the work your team actually does.
            </p>
            <div className="mt-8">
              <BookingButton intent="training" variant="solid" tone="green">
                Plan a team session
              </BookingButton>
            </div>
          </div>
          <SessionInputs />
        </div>
      </section>

      <TrainingInvestmentSection />

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-start lg:gap-16">
          <div>
            <SectionMark>Who it is for</SectionMark>
            <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
              Who it is for.
            </h2>
          </div>
          <AudiencePanel />
        </div>
      </section>

      <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
          <div>
            <SectionMark tone="dark">How it works</SectionMark>
            <h2 className="mt-6 max-w-lg text-fg-on-dark" style={{ fontSize: "var(--text-h2)" }}>
              How we build your session.
            </h2>
          </div>
          <TrainingProcessSteps steps={trainingSteps} />
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
            <div>
              <SectionMark>What you get</SectionMark>
              <h2 className="mt-6 max-w-lg text-fg" style={{ fontSize: "var(--text-h2)" }}>
                What your team walks out with.
              </h2>
            </div>
            <OutcomesBoard />
          </div>
          <TrainingHonesty />
        </div>
      </section>

      <ProgramsHistory />
      <TrainingProof />
      <ArvindSessionSection />

      <FaqSection faqs={trainingFaqs} heading="Questions teams ask before they plan a session." />
      <TrainingRoutingStrip
        heading="Ready to build around the work?"
        body="We map the workflow, build what helps, and hand it over to your team."
        stickerValue="3"
        stickerLabel={
          <>
            stages to a
            <br />
            working system.
          </>
        }
        href="/services"
        linkLabel="Explore services"
        headingId="services-routing-heading"
      />
      <ClosingCta
        heading="Tell us what your team is stuck on. We will build the session around it."
        sub={null}
        buttonLabel="Plan a team session"
        intent="training"
      />
    </main>
  );
}
