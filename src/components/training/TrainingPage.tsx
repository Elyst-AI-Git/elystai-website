import BookingButton from "@/components/marketing/BookingButton";
import { SectionMark } from "@/components/ui/section-mark";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import ProgramsHistory from "@/components/training/ProgramsHistory";
import { AudienceVisual } from "@/components/training/TrainingVisuals";
import SessionInputs from "@/components/training/SessionInputs";
import TrainingProcessSteps, { type TrainingStep } from "@/components/training/TrainingProcessSteps";
import ArvindSessionSection from "@/components/training/ArvindSessionSection";
import { ShaderPrincipleCard, type Principle } from "@/components/home/PrinciplesGrid";
import TrainingRoutingStrip from "@/components/home/TrainingRoutingStrip";
import { NumbersBand, type NumberBandItem } from "@/components/home/NumbersSection";
import WhatYouGetSection from "@/components/training/WhatYouGetSection";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

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

const trainingStats: readonly NumberBandItem[] = [
  {
    value: "3,000+",
    label: "People trained",
    description: "Founders and functional leads across India and the Middle East.",
  },
  {
    value: "50+",
    label: "Live sessions",
    description: "Practical sessions built around roles, tools, and real work.",
  },
  {
    value: "4+",
    label: "Industries",
    description: "Different operating contexts, one practical way to learn.",
  },
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
    <div className="grid gap-5 md:grid-cols-2">
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

function TrainingProof() {
  return <NumbersBand heading="Training by the numbers" numbers={trainingStats} />;
}

export default function TrainingPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section
        className="relative overflow-hidden"
        style={{
          padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(64px, 8vw, 104px)",
          background: "linear-gradient(to bottom, var(--surface-dark) 0%, var(--surface-dark) 62%, color-mix(in srgb, var(--surface-dark) 72%, var(--surface-accent-soft)) 82%, var(--surface-accent-soft) 100%)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-60 [mask-image:linear-gradient(to_bottom,transparent_0%,black_25%,black_78%,transparent_100%)]">
          <CanvasRevealEffect
            colors={[[0, 223, 130], [3, 98, 76], [255, 255, 255]]}
            containerClassName="absolute inset-0 !bg-transparent"
            dotSize={2}
            showGradient={false}
          />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[var(--surface-accent-soft)] opacity-25" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.62fr)] xl:items-center xl:gap-16">
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
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto max-w-4xl text-center">
            <SectionMark>Who it is for</SectionMark>
            <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
              Who it is for.
            </h2>
          </header>
          <div className="mx-auto mt-12 max-w-5xl sm:mt-14">
            <AudiencePanel />
          </div>
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

      <WhatYouGetSection />
      <TrainingProof />
      <ArvindSessionSection />
      <ProgramsHistory />

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
        heading={
          <>
            <span className="block">Tell us what your team is stuck on.</span>
            <span className="block">We will build the session around it.</span>
          </>
        }
        sub={null}
        buttonLabel="Plan a team session"
        intent="training"
      />
    </main>
  );
}
