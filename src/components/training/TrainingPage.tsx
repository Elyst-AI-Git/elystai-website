import BookingButton from "@/components/marketing/BookingButton";
import { SectionMark } from "@/components/ui/section-mark";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import ProgramsHistory from "@/components/training/ProgramsHistory";
import { AudienceVisual, OutcomeVisual, type OutcomeVisualId } from "@/components/training/TrainingVisuals";
import { VisualCard } from "@/components/ui/visual-card";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

type TrainingStep = {
  label: string;
  description: readonly [string, string];
};

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
  { value: "2,500+", label: "people trained" },
  { value: "50+", label: "sessions delivered" },
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

function TrainingProcessSteps({ steps }: { steps: TrainingStep[] }) {
  return (
    <ol className="grid gap-3 sm:gap-4">
      {steps.map((step, index) => (
        <li key={step.label}>
          <article className="relative grid min-h-48 w-full content-center gap-6 overflow-hidden rounded-md border border-white/10 bg-surface-dark-2 px-5 py-7 sm:min-h-52 sm:grid-cols-[minmax(17rem,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-8 sm:px-8 sm:py-8">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-1 bg-green" />
            <div className="relative flex items-baseline gap-3 text-fg-on-dark">
              <span
                aria-hidden
                className="font-display font-semibold text-green"
                style={{ fontSize: "var(--text-training-step)", lineHeight: 0.9, letterSpacing: "var(--tracking-stat)" }}
              >
                {index + 1}
              </span>
              <h3
                className="font-display font-semibold text-fg-on-dark"
                style={{ fontSize: "var(--text-training-step)", lineHeight: 0.9, letterSpacing: "var(--tracking-display)" }}
              >
                {step.label}
              </h3>
            </div>

            <p className="relative max-w-xl justify-self-end text-right text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              <span className="block">{step.description[0]}</span>
              <span className="block">{step.description[1]}</span>
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}

function SessionInputs({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="Every session starts with your role, your tools, and your real work"
      className={`relative w-full overflow-hidden rounded-md border p-5 sm:p-6 ${className}`}
      style={{ borderColor: "rgba(255,255,255,0.13)", background: "rgba(255,255,255,0.035)" }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-display font-bold uppercase text-fg-muted-dark" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
          Every session starts with
        </span>
        <span aria-hidden className="h-px w-10 bg-white/20" />
      </div>

      <ol className="mt-7 border-t" style={{ borderColor: "rgba(255,255,255,0.13)" }}>
        {["Your role", "Your tools", "Your real work"].map((item, index) => (
          <li
            key={item}
            className="grid grid-cols-[2.7rem_1fr] items-center gap-3 border-b py-4 last:border-b-0 sm:py-5"
            style={{ borderColor: "rgba(255,255,255,0.13)" }}
          >
            <span className="font-display text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
              0{index + 1}
            </span>
            <strong className="font-display whitespace-nowrap text-fg-on-dark" style={{ fontSize: "calc(var(--text-h3) + 2px)" }}>
              {item}
            </strong>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function AudiencePanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {audiences.map((audience, index) => (
        <VisualCard
          key={audience.title}
          decorated={false}
          className={`min-h-80 p-6 sm:p-8 ${index === 1 ? "bg-surface-muted" : ""}`}
        >
          <div className="flex h-32 items-center justify-center">
            <AudienceVisual kind={audience.kind} className="max-w-[14rem]" />
          </div>
          <span
            aria-hidden
            className="mt-6 block font-display font-semibold text-emerald"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
          >
            0{index + 1}
          </span>
          <p className="mt-3 max-w-sm text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
            {audience.title}
          </p>
        </VisualCard>
      ))}
    </div>
  );
}

function TrainingInvestmentSection() {
  return (
    <section className="bg-surface-muted" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-7xl">
        <header className="max-w-6xl">
          <h2 className="text-balance text-fg" style={{ fontSize: "clamp(2.8rem, 6.2vw, 6rem)", lineHeight: 0.98 }}>
            The AI investment has <span className="hero-accent-word-red">not worked</span> for most companies.
          </h2>
          <p className="mt-8 max-w-6xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
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
    <section className="bg-surface-muted" style={{ padding: "var(--section-py) 0" }}>
      <div className="mx-auto max-w-7xl px-[var(--section-px)]">
        <div className="overflow-hidden rounded-md border border-white/10 bg-surface-dark">
          <div className="grid gap-7 px-6 py-7 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-8">
            <div>
              <SectionMark tone="dark">Proof</SectionMark>
              <h2 className="mt-6 max-w-2xl text-balance text-fg-on-dark" style={{ fontSize: "calc(var(--text-h3) + 2px)", lineHeight: 1.12 }}>
                The sessions are built to be used,
                <span className="lg:block"> not just attended.</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 divide-x divide-white/10 border-y border-white/10">
              {trainingStats.map((stat) => (
                <div key={stat.label} className="px-4 py-5 sm:px-6 lg:px-8">
                  <p className="font-display font-bold text-green" style={{ fontSize: "var(--text-stat-compact)", lineHeight: 0.95 }}>
                    {stat.value}
                  </p>
                  <p className="mt-2 text-fg-on-dark/70" style={{ fontSize: "var(--text-body)", lineHeight: 1.25 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="mt-16 sm:mt-20">
        <div className="mx-auto mb-5 max-w-2xl px-[var(--section-px)] text-center">
          <SectionMark>Already delivered</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Hear it from the people themselves.
          </h2>
          <p className="mx-auto mt-4 max-w-prose text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            Not a forced 5 star review, it&apos;s what they actually felt.
          </p>
        </div>
        <StaggerTestimonials />
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

      <FaqSection faqs={trainingFaqs} heading="Questions teams ask before they plan a session." />
      <ClosingCta
        heading="Tell us what your team is stuck on. We will build the session around it."
        sub={null}
        buttonLabel="Plan a team session"
        intent="training"
      />
    </main>
  );
}
