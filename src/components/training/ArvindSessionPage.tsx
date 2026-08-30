import Image from "next/image";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";
import { arvindSession } from "@/components/training/ArvindSessionSection";

const sessionModules = [
  "Map the roles, tools, and tasks that matter",
  "Practise with the work the team already recognises",
  "Turn useful patterns into repeatable ways of working",
  "Leave with a clear next step after the session",
] as const;

export default function ArvindSessionPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <section className="bg-surface-dark" style={{ padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(72px, 9vw, 128px)" }}>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <SectionMark tone="dark">Session snapshot</SectionMark>
            <div className="border border-white/15 bg-white px-5 py-3">
              <Image
                src="/brands/arvind-fashions-wordmark-tight.png"
                alt="Arvind Fashions"
                width={660}
                height={180}
                className="h-auto w-56 object-contain"
              />
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8 sm:mt-16 sm:pt-10">
            <p className="font-display font-bold uppercase text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              A working training case study
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-hero)", lineHeight: 0.98 }}>
              AI training in the room, not just on the slide.
            </h1>
            <p className="mt-8 max-w-3xl text-fg-muted-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
              {arvindSession.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <article className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
            <div>
              <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                The brief
              </p>
            </div>
            <div>
              <h2 className="text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
                A practical session shaped around the work already in the room.
              </h2>
              <p className="mt-8 max-w-3xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.48 }}>
                {arvindSession.brief}
              </p>
              <p className="mt-7 max-w-3xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}>
                This page records the working structure of the session. Approved agenda detail, impact evidence, and direct attendee feedback will replace the sample material as it becomes available.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-surface-accent-soft" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-5xl">
          <SectionMark>What the session covered</SectionMark>
          <h2 className="mt-6 max-w-3xl text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
            Practical work, built in a clear sequence.
          </h2>

          <ol className="mt-12 grid gap-y-8 border-t border-emerald/20 pt-8 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
            {sessionModules.map((module, index) => (
              <li key={module} className="min-w-0">
                <p className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  0{index + 1}
                </p>
                <p className="mt-4 max-w-[18ch] font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.06 }}>
                  {module}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <article className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
          <div>
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              What we pulled off
            </p>
          </div>
          <div className="grid gap-10">
            {arvindSession.pulledOff.map((item, index) => (
              <div key={item}>
                <span className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  0{index + 1}
                </span>
                <p className="mt-3 max-w-3xl font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.2 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-5xl">
          <SectionMark tone="dark">Attendee feedback</SectionMark>
          <blockquote className="mt-8 max-w-4xl font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>
            “{arvindSession.testimonial}”
            <cite className="mt-6 block font-sans not-italic text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
              Sample attendee feedback · wording to be replaced with an approved quote
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "clamp(64px, 8vw, 104px) var(--section-px)" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-7">
          <p className="max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
            Looking for a training session shaped around your team&apos;s work?
          </p>
          <BrandButton href="/training" variant="outline" tone="emerald">
            Back to training
          </BrandButton>
        </div>
      </section>
    </main>
  );
}
