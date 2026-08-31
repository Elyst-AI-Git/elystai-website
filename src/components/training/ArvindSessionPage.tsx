import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";
import Wordmark from "@/components/site/Wordmark";
import { arvindSession } from "@/components/training/ArvindSessionSection";

function FeedbackQuote({ quote }: { quote: string }) {
  return (
    <blockquote className="my-14 border-l-2 border-emerald bg-surface-accent-soft px-6 py-7 sm:my-20 sm:px-8 sm:py-9">
      <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}>
        “{quote}”
      </p>
      <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
        Participant feedback
      </cite>
    </blockquote>
  );
}

export default function ArvindSessionPage() {
  return (
    <main id="main" className="flex-1 bg-bg pt-24">
      <section className="bg-surface-dark" style={{ padding: "clamp(64px, 9vw, 124px) var(--section-px) clamp(64px, 8vw, 112px)" }}>
        <div className="mx-auto max-w-5xl">
          <SectionMark tone="dark">Latest session</SectionMark>

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
              A full day of AI practice at Arvind Fashions.
            </h1>
            <p className="mt-7 text-center font-display text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
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
          <section aria-labelledby="arvind-brief-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              The brief
            </p>
            <h2 id="arvind-brief-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.04 }}>
              {arvindSession.briefHeading}
            </h2>
            <p className="mt-7 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              {arvindSession.brief}
            </p>
          </section>

          <section className="my-14 border-y border-border py-10 sm:my-20 sm:py-12" aria-labelledby="arvind-what-we-ran-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              What we ran
            </p>
            <h2 id="arvind-what-we-ran-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              {arvindSession.whatWeRanHeading}
            </h2>
            <p className="mt-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              {arvindSession.whatWeRanBody}
            </p>
            <ol className="mt-9 grid gap-7 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9">
              {arvindSession.whatWeRanItems.map((item, index) => (
                <li key={item}>
                  <p className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
                    {item}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-9 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
              {arvindSession.mixedRoom}
            </p>
          </section>

          <FeedbackQuote quote={arvindSession.testimonials[0]} />

          <section aria-labelledby="arvind-room-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              The room
            </p>
            <h2 id="arvind-room-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.04 }}>
              {arvindSession.roomHeading}
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              {arvindSession.roomParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <FeedbackQuote quote={arvindSession.testimonials[1]} />

          <section aria-labelledby="arvind-left-with-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              What they left with
            </p>
            <h2 id="arvind-left-with-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.04 }}>
              {arvindSession.leftWithHeading}
            </h2>
            <ul className="mt-7 grid gap-4 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
              {arvindSession.leftWithItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="mt-10 border-t border-border pt-6 text-fg-3" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
              {arvindSession.honestyLine}
            </p>
          </section>
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
