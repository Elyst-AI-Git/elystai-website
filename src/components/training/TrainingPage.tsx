import BookingButton from "@/components/marketing/BookingButton";
import { SectionMark } from "@/components/ui/section-mark";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import ProgramsHistory from "@/components/training/ProgramsHistory";
import TrainingTestimonials from "@/components/training/TrainingTestimonials";

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

const trainingOutcomes = [
  "A realistic view of what AI can and cannot do",
  "Better habits with the tools you already pay for",
  "Role-specific workflows practised in the room",
];

const trainingStats = [
  { value: "2,500+", label: "people trained" },
  { value: "50+", label: "sessions delivered" },
];

const audiences = [
  "Companies rolling out AI tools to a team",
  "Departments needing role-specific workflows",
];

function TrainingProcessSteps({ steps }: { steps: TrainingStep[] }) {
  return (
    <ol className="grid gap-3 sm:gap-4">
      {steps.map((step, index) => (
        <li key={step.label}>
          <article className="grid min-h-44 w-full content-center gap-5 rounded-md border border-white/10 bg-black/20 px-5 py-6 sm:min-h-48 sm:grid-cols-[minmax(17rem,0.9fr)_minmax(0,1.1fr)] sm:items-center sm:gap-8 sm:px-8 sm:py-7">
            <div className="flex items-baseline gap-3 text-fg-on-dark">
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

            <p className="max-w-xl justify-self-end text-right text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
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
    <div
      className={`w-full overflow-hidden rounded-md border ${className}`}
      style={{ borderColor: "rgba(255,255,255,0.13)", background: "rgba(255,255,255,0.035)" }}
    >
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <span className="font-display font-bold uppercase text-fg-muted-dark whitespace-nowrap" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
          Every session starts with
        </span>
      </div>
      {["Your role", "Your tools", "Your real work"].map((item, index) => (
        <div
          key={item}
          className="grid grid-cols-[2.7rem_1fr] items-center gap-3 border-t px-5 py-4 sm:px-6 sm:py-5"
          style={{ borderColor: "rgba(255,255,255,0.13)" }}
        >
          <span className="font-display text-green" style={{ fontSize: "var(--text-label)" }}>
            0{index + 1}
          </span>
          <strong className="font-display whitespace-nowrap text-fg-on-dark" style={{ fontSize: "var(--text-h3)" }}>
            {item}
          </strong>
        </div>
      ))}
    </div>
  );
}

function AudiencePanel() {
  return (
    <div className="grid overflow-hidden rounded-md border border-border bg-white md:grid-cols-2 md:divide-x md:divide-border">
      {audiences.map((audience, index) => (
        <article
          key={audience}
          className={`grid grid-cols-[3.6rem_1fr] gap-4 p-6 sm:p-8 ${index === 1 ? "border-t border-border bg-surface-muted md:border-t-0" : ""}`}
        >
          <span
            aria-hidden
            className="font-display font-semibold text-emerald"
            style={{ fontSize: "var(--text-proof-number)", lineHeight: 0.82, letterSpacing: "var(--tracking-stat)" }}
          >
            {index + 1}
          </span>
          <p className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.28 }}>
            {audience}
          </p>
        </article>
      ))}
    </div>
  );
}

function OutcomesBoard() {
  return (
    <div className="overflow-hidden rounded-md border border-white/10 bg-surface-dark">
      <ol className="divide-y divide-white/10">
        {trainingOutcomes.map((outcome, index) => (
          <li key={outcome} className="grid grid-cols-[2.6rem_1fr] gap-4 px-5 py-5 sm:grid-cols-[4rem_1fr] sm:px-8 sm:py-7">
            <span className="font-display text-green" style={{ fontSize: "var(--text-label)" }}>
              0{index + 1}
            </span>
            <span className="text-fg-on-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              {outcome}
            </span>
          </li>
        ))}
      </ol>
      <div className="border-t border-white/10 bg-green/10 px-5 py-6 sm:px-8 sm:py-8">
        <p className="font-display font-bold text-green" style={{ fontSize: "var(--text-card)", lineHeight: 1.25 }}>
          Anyone promising you a percentage after one session is guessing.
        </p>
      </div>
    </div>
  );
}

function TrainingProof() {
  return (
    <section className="bg-surface-muted" style={{ padding: "var(--section-py) 0" }}>
      <div className="mx-auto max-w-7xl px-[var(--section-px)]">
        <div className="overflow-hidden rounded-md border border-white/10 bg-surface-dark">
          <div className="grid gap-7 border-b border-white/10 px-6 py-7 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10 lg:py-8">
            <div>
              <SectionMark tone="dark">Proof</SectionMark>
              <h2 className="mt-6 max-w-2xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h3)", lineHeight: 1.12 }}>
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
          <SectionMark>From the room</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            The useful bits people remembered.
          </h2>
        </div>
        <div className="mx-auto max-w-7xl px-[var(--section-px)]">
          <TrainingTestimonials />
        </div>
      </div>
    </section>
  );
}

export default function TrainingPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section className="relative overflow-hidden bg-surface-dark" style={{ padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(64px, 8vw, 104px)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.5fr)] xl:items-center xl:gap-12">
          <div className="max-w-3xl">
            <SectionMark tone="dark">Training</SectionMark>
            <h1 className="mt-6 text-fg-on-dark" style={{ fontSize: "var(--text-display)", lineHeight: 1.04 }}>
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
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
          <div>
            <SectionMark>What you get</SectionMark>
            <h2 className="mt-6 max-w-lg text-fg" style={{ fontSize: "var(--text-h2)" }}>
              What your team walks out with.
            </h2>
          </div>
          <OutcomesBoard />
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
