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
      <section className="relative overflow-hidden bg-surface-dark" style={{ padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(80px, 10vw, 140px)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
          <div>
            <SectionMark tone="dark">Session snapshot</SectionMark>
            <h1 className="mt-6 max-w-3xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-hero)", lineHeight: 0.98 }}>
              {arvindSession.company}
            </h1>
          </div>
          <p className="max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
            {arvindSession.intro} {arvindSession.brief}
          </p>
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionMark>What the session covered</SectionMark>
          <h2 className="mt-6 max-w-3xl text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
            Practical work, shaped around the people in the room.
          </h2>
          <div className="mt-12 grid border-y border-emerald/20 md:grid-cols-2 lg:grid-cols-4">
            {sessionModules.map((module, index) => (
              <article key={module} className="border-b border-emerald/20 px-1 py-7 md:px-6 md:py-8 lg:border-b-0 lg:border-l lg:first:border-l-0">
                <span className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>0{index + 1}</span>
                <h3 className="mt-5 max-w-[16ch] font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.05 }}>{module}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-accent-soft" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-20">
          <div>
            <SectionMark>What we pulled off</SectionMark>
            <h2 className="mt-6 max-w-xl text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              A session people could take back to the work.
            </h2>
          </div>
          <div className="grid gap-8">
            {arvindSession.pulledOff.map((item, index) => (
              <div key={item} className="grid gap-3 border-b border-emerald/20 pb-7 sm:grid-cols-[4rem_1fr] sm:items-start">
                <span className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>0{index + 1}</span>
                <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.2 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-20">
          <SectionMark tone="dark">Attendee feedback</SectionMark>
          <blockquote className="max-w-4xl font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>
            “{arvindSession.testimonial}”
            <cite className="mt-6 block font-sans not-italic text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
              Sample attendee feedback · wording to be replaced with approved quote
            </cite>
          </blockquote>
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-7">
          <p className="max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
            This is a working session snapshot. The final version will include the approved agenda, impact evidence, and attendee quote.
          </p>
          <BrandButton href="/training" variant="outline" tone="emerald">
            Back to training
          </BrandButton>
        </div>
      </section>
    </main>
  );
}
