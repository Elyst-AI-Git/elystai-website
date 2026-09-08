import BookingButton from "@/components/marketing/BookingButton";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { SectionMark } from "@/components/ui/section-mark";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import ProgramsHistory from "@/components/training/ProgramsHistory";
import { FormatVisual } from "@/components/training/TrainingVisuals";
import SessionInputs from "@/components/training/SessionInputs";
import TrainingProcessSteps, { type TrainingStep } from "@/components/training/TrainingProcessSteps";
import ArvindSessionSection from "@/components/training/ArvindSessionSection";
import TrainingRoutingStrip from "@/components/home/TrainingRoutingStrip";
import { NumbersBand, type NumberBandItem } from "@/components/home/NumbersSection";
import { ShaderPrincipleCard, type Principle } from "@/components/home/PrinciplesGrid";
import WhatYouGetSection from "@/components/training/WhatYouGetSection";
import TrainingRatingStrip from "@/components/training/TrainingRatingStrip";
import { trainingFaqs, trainingFormats } from "@/lib/training-content";

const trainingSteps: TrainingStep[] = [
  {
    label: "Discover",
    description: "We first understand the company, the participating teams and what they need from the programme.",
  },
  {
    label: "Design",
    description: "The format and examples are tailored around the audience instead of being copied from a fixed public syllabus.",
  },
  {
    label: "Deliver",
    description: "The session is designed for active participation and practical understanding.",
  },
];

const trainingStats: readonly NumberBandItem[] = [
  {
    value: "3,000+",
    label: "Professionals trained",
    description: "More than 3,000 professionals trained by the Elyst AI team.",
  },
  {
    value: "50+",
    label: "Sessions delivered",
    description: "More than 50 sessions delivered by the Elyst AI team.",
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

function TrainingProof() {
  return <NumbersBand heading="Training by the numbers" numbers={trainingStats} align="center" />;
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

const formatPrinciples: readonly Principle[] = trainingFormats.map((format) => ({
  title: format.title,
  description: format.description,
  visual: () => <FormatVisual id={format.id} className="max-w-[16rem]" />,
}));

function TrainingFormats() {
  return (
    <section id="formats" className="relative overflow-hidden bg-bg" aria-labelledby="training-formats-heading" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-emerald/15" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark>Format</SectionMark>
          <h2 id="training-formats-heading" className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
            Training formats
          </h2>
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-3 sm:mt-14">
          {formatPrinciples.map((principle, index) => (
            <ShaderPrincipleCard
              key={principle.title}
              principle={principle}
              visualFirst
              visualScale={index === 0 ? "w-full max-w-[19rem] scale-110 sm:max-w-none sm:scale-100" : "w-full max-w-[16rem] scale-100 sm:max-w-none sm:scale-[0.9]"}
            />
          ))}
        </div>
      </div>
    </section>
  );
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
            <h1 className="training-hero-title mt-6 text-balance text-fg-on-dark" style={{ lineHeight: 1.04 }}>
              Corporate AI training built around your team’s real work
            </h1>
            <p className="mt-7 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              Elyst AI delivers practical, in-person AI training for organisations that want their teams to use AI more effectively at work.
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
      <TrainingFormats />

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
      <TrainingRatingStrip />
      <ProgramsHistory />

      <FaqSection faqs={trainingFaqs} heading="Questions teams ask before they plan a session." includeStructuredData={false} />
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
