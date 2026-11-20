import { KickstartPromptVisual } from "@/components/site/HeroVisuals";
import { ArrowRight, ArrowUp, Check, ClipboardList, Loader2, PhoneCall, Wrench } from "lucide-react";
import ContactCta from "@/components/marketing/ContactCta";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { SectionMark } from "@/components/ui/section-mark";
import ProofBlock from "@/components/marketing/ProofBlock";
import GuideBand from "@/components/marketing/GuideBand";
import ClosingCta from "@/components/marketing/ClosingCta";
import ProblemSequence from "@/components/home/ProblemSequence";
import FaqSection from "@/components/marketing/FaqSection";
import { FormatVisual } from "@/components/training/TrainingVisuals";
import { ShaderPrincipleCard, type Principle } from "@/components/home/PrinciplesGrid";
import WhatYouGetSection from "@/components/training/WhatYouGetSection";
import { trainingFaqs, trainingFormats } from "@/lib/training-content";

const phases = [
  {
    label: "Before",
    title: "We prepare for your team",
    body: "A call with the team to understand how work flows today.",
    Icon: ClipboardList,
    card: "border-emerald/20 bg-[#eef7f1] text-fg",
    tag: "text-emerald",
    sub: "text-fg-2",
    bar: "bg-emerald/20",
    fill: "bg-emerald",
    chip: "bg-emerald/10 text-emerald",
    step: 1,
  },
  {
    label: "During",
    title: "Hands-on, on real tasks",
    body: "People practise on the work they do every day, not on demos.",
    Icon: Wrench,
    card: "border-emerald/30 text-fg",
    tag: "text-emerald",
    sub: "text-fg",
    bar: "bg-emerald/25",
    fill: "bg-emerald",
    chip: "bg-white/50 text-emerald",
    step: 2,
    style: { background: "linear-gradient(160deg,#c6ead7,#7fcba6)" },
  },
  {
    label: "After",
    title: "A call with the founder",
    body: "We walk you through the best opportunities we saw.",
    Icon: PhoneCall,
    card: "border-emerald/40 bg-surface-dark text-fg-on-dark",
    tag: "text-green",
    sub: "text-fg-muted-dark",
    bar: "bg-white/15",
    fill: "bg-green",
    chip: "bg-green/15 text-green",
    step: 3,
  },
] as const;

function SearchVsTodo() {
  const todo = ["Reply to this week's enquiries", "Prepare the weekly report", "Send the follow-ups"];
  return (
    <div className="grid gap-5 md:grid-cols-2" role="img" aria-label="On the left, a team asks an AI tool a single question. On the right, a to-do list where the AI has done two steps and is working on the third.">
      <div aria-hidden className="flex min-h-[24rem] flex-col rounded-md border border-emerald/20 bg-surface-light p-6 shadow-card">
        <p className="font-display font-bold uppercase text-fg-3" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
          Most teams ask AI a question
        </p>
        <div className="flex flex-1 items-center justify-end">
          <p className="max-w-[88%] rounded-2xl rounded-br-sm bg-[#e9ece9] px-4 py-3 text-fg" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
            Write a polite follow-up email to a customer who has not replied to our quote.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-fg-3/30 bg-white px-5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <span className="flex-1 truncate text-fg-3" style={{ fontSize: "var(--text-small)" }}>
            Ask anything
            <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-fg-2 motion-reduce:animate-none" />
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-fg text-white">
            <ArrowUp className="size-4" strokeWidth={2.4} />
          </span>
        </div>
        <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-small)" }}>
          AI used like a search bar.
        </p>
      </div>

      <div aria-hidden className="flex min-h-[24rem] flex-col rounded-md border-2 border-emerald bg-surface-dark p-6 text-fg-on-dark shadow-card">
        <p className="font-display font-bold uppercase text-green" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
          Teams that use an AI system
        </p>
        <ul className="flex flex-1 flex-col justify-center gap-4">
          {todo.map((item, index) => {
            const done = index < 2;
            return (
              <li key={item}>
                <div className="flex items-center gap-3">
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-md border-2 ${done ? "border-green bg-green text-[#06140e]" : "border-green/70 bg-surface-dark text-green"}`}>
                    {done ? <Check className="size-4" strokeWidth={3} /> : <Loader2 className="size-4 animate-spin motion-reduce:animate-none" strokeWidth={2.6} />}
                  </span>
                  <span className={done ? "text-fg-muted-dark line-through decoration-green/50" : "font-semibold text-fg-on-dark"} style={{ fontSize: "var(--text-body)" }}>
                    {item}
                  </span>
                </div>
                {!done ? (
                  <div className="ml-10 mt-2">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
                      <div className="todo-progress h-full rounded-full bg-green" />
                    </div>
                    <p className="mt-1 font-display font-bold uppercase text-green" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
                      AI is working on this
                    </p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
          AI used on the work in front of them.
        </p>
      </div>
    </div>
  );
}

const formatPrinciples: readonly Principle[] = trainingFormats.map((format) => ({
  title: format.title,
  description: format.description,
  visual: () => <FormatVisual id={format.id} className="max-w-[16rem]" />,
}));

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
          <CanvasRevealEffect colors={[[0, 223, 130], [3, 98, 76], [255, 255, 255]]} containerClassName="absolute inset-0 !bg-transparent" dotSize={2} showGradient={false} />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.62fr)] xl:items-center xl:gap-16">
          <div className="max-w-3xl">
            <SectionMark tone="dark">AI Kickstart</SectionMark>
            <h1 className="training-hero-title mt-6 text-balance text-fg-on-dark" style={{ lineHeight: 1.04 }}>
              AI training built on <span className="hero-accent-word hero-accent-word-neon">your</span> team’s work.
            </h1>
            <p className="mt-7 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.5 }}>
              One day, or two half days.
            </p>
            <div className="mt-8">
              <ContactCta tone="green" />
            </div>
          </div>
          <KickstartPromptVisual />
        </div>
      </section>

      <section className="bg-surface-accent-soft" aria-labelledby="not-stick-heading" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-7xl">
          <header className="max-w-5xl">
            <SectionMark>Why it matters</SectionMark>
            <h2 id="not-stick-heading" className="mt-6 text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}>
              Why most AI training does not stick.
            </h2>
            <p className="mt-6 max-w-3xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
              Most teams use AI like a search bar.
            </p>
          </header>
          <div className="mt-12">
            <SearchVsTodo />
          </div>
          {/* TODO(proof): the Deloitte and EY figures return only with a visible link to each source. */}
        </div>
      </section>

      <ProblemSequence
        linesOnly
        label="Training built around how your team works"
        lines={[
          "Not another generic AI training.",
          "Built around how your team works,",
          "to get the most out of AI.",
        ]}
      />

      <section aria-labelledby="phases-heading" className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-7xl">
          <header className="mx-auto max-w-4xl text-center">
            <SectionMark>How it works</SectionMark>
            <h2 id="phases-heading" className="mt-6 text-balance text-fg" style={{ fontSize: "var(--text-h2)" }}>
              <span className="block">Prepared for your team,</span>
              <span className="block">not borrowed from a template.</span>
            </h2>
          </header>
          <ol className="mt-12 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {phases.map((phase, index) => (
              <li key={phase.label} className="contents">
                <div
                  className={`relative flex min-h-[22rem] flex-col overflow-hidden rounded-md border-2 p-7 shadow-card ${phase.card}`}
                  style={"style" in phase ? phase.style : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex size-12 items-center justify-center rounded-md ${phase.chip}`}>
                      <phase.Icon aria-hidden className="size-6" strokeWidth={1.7} />
                    </span>
                    <span className={`font-display font-bold uppercase ${phase.tag}`} style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                      {phase.label}
                    </span>
                  </div>
                  <h3 className="mt-10 font-display font-semibold" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
                    {phase.title}
                  </h3>
                  <p className={`mt-7 ${phase.sub}`} style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
                    {phase.body}
                  </p>
                  <div className="mt-auto flex gap-1.5 pt-8" aria-hidden>
                    {[1, 2, 3].map((n) => (
                      <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= phase.step ? phase.fill : phase.bar}`} />
                    ))}
                  </div>
                </div>
                {index < phases.length - 1 ? (
                  <ArrowRight aria-hidden className="hidden size-7 self-center text-emerald md:block" strokeWidth={1.8} />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WhatYouGetSection />

      <section id="formats" className="relative overflow-hidden bg-bg" aria-labelledby="training-formats-heading" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-emerald/15" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <header className="mx-auto max-w-4xl text-center">
            <SectionMark>Formats</SectionMark>
            <h2 id="training-formats-heading" className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              Choose the format that fits your team.
            </h2>
          </header>
          <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
            {formatPrinciples.map((principle, index) => (
              <ShaderPrincipleCard
                key={principle.title}
                principle={principle}
                visualFirst
                visualScale={index === 0 ? "w-full max-w-[19rem] scale-110 sm:max-w-none sm:scale-100" : "w-full max-w-[16rem] scale-100 sm:max-w-none sm:scale-[0.9]"}
              />
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.3 }}>
            In person in Kerala, Bengaluru and the UAE.
          </p>
        </div>
      </section>

      <ProofBlock headingId="kickstart-proof-heading" />
      <FaqSection faqs={trainingFaqs} heading="Questions teams ask before they plan a session." />
      <GuideBand />

      <ClosingCta />
    </main>
  );
}
