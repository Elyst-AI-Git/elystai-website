import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";
import Wordmark from "@/components/site/Wordmark";
import { arvindSession } from "@/components/training/ArvindSessionSection";

const sessionModules = [
  "Map the roles, tools, and tasks that matter",
  "Practise with the work the team already recognises",
  "Turn useful patterns into repeatable ways of working",
  "Leave with a clear next step after the session",
] as const;

export default function ArvindSessionPage() {
  return (
    <main id="main" className="flex-1 bg-bg pt-24">
      <section className="bg-surface-dark" style={{ padding: "clamp(64px, 9vw, 124px) var(--section-px) clamp(64px, 8vw, 112px)" }}>
        <div className="mx-auto max-w-5xl">
          <SectionMark tone="dark">Recent session</SectionMark>

          <div className="mt-7 flex items-center justify-between gap-4 border-b border-white/15 pb-7 sm:gap-8">
            <Link href="/" aria-label="Elyst AI home">
              <Wordmark className="h-6 w-auto text-fg-on-dark sm:h-8" />
            </Link>
            <Image
              src="/brands/arvind-fashions-wordmark-white.png"
              alt="Arvind Fashions"
              width={555}
              height={67}
              className="h-6 w-auto object-contain sm:h-8"
            />
          </div>

          <div className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
            <h1 className="text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              AI training in the room, not just on the slide.
            </h1>
            <p className="mt-7 text-left font-display text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              August 20, 2026
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-fg-muted-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
              {arvindSession.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "clamp(72px, 10vw, 140px) var(--section-px)" }}>
        <article className="mx-auto max-w-3xl">
          <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
            {arvindSession.brief}
          </p>

          <div className="my-12 border-y border-border py-10 sm:my-16 sm:py-12">
            <p className="text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              A training session works when it starts from the work already in the room. The aim here was not to demonstrate every possible tool. It was to make a few useful patterns visible, then practise them with the people who would carry them forward.
            </p>
          </div>

          <h2 className="text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.04 }}>
            What the session covered
          </h2>
          <p className="mt-7 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
            The room moved from context to practice, with each exercise connected to a role, a tool, or a task the team already understood.
          </p>

          <ol className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
            {sessionModules.map((module, index) => (
              <li key={module}>
                <p className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  0{index + 1}
                </p>
                <p className="mt-4 font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.1 }}>
                  {module}
                </p>
              </li>
            ))}
          </ol>

          <div className="my-14 border-y border-border py-10 sm:my-20 sm:py-12">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              What we pulled off
            </p>
            <ul className="mt-7 grid gap-5 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
              {arvindSession.pulledOff.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <blockquote className="border-l-2 border-emerald bg-surface-accent-soft px-6 py-7 sm:px-8 sm:py-9">
            <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}>
              “{arvindSession.testimonial}”
            </p>
            <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
              Sample attendee feedback · wording to be replaced with an approved quote
            </cite>
          </blockquote>
        </article>
      </section>

      <section className="bg-surface-accent-soft" style={{ padding: "clamp(64px, 8vw, 104px) var(--section-px)" }}>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.05 }}>
            Looking for a training session shaped around your team&apos;s work?
          </h2>
          <BrandButton href="/training" variant="metal" tone="emerald" className="mt-8">
            Back to training
          </BrandButton>
        </div>
      </section>
    </main>
  );
}
