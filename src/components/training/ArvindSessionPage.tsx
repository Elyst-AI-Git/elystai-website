import Image from "next/image";
import Link from "next/link";
import ClosingCta from "@/components/marketing/ClosingCta";
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
    <main id="main" className="flex-1 bg-bg pt-24" itemScope itemType="https://schema.org/CreativeWork">
      <section className="bg-surface-dark" style={{ padding: "clamp(64px, 9vw, 124px) var(--section-px) clamp(64px, 8vw, 112px)" }}>
        <header className="mx-auto max-w-5xl">
          <SectionMark tone="dark">Latest session</SectionMark>

          <div className="mt-7 flex min-h-8 items-center justify-between gap-5 border-b border-white/15 pb-7 sm:gap-8">
            <Link href="/" aria-label="Elyst AI home" className="flex shrink-0 items-center">
              <Wordmark className="h-7 w-auto text-fg-on-dark sm:h-8" />
            </Link>
            <Image
              src="/brands/arvind-fashions-wordmark-white.png"
              alt="Arvind Fashions"
              width={555}
              height={67}
              className="h-7 w-auto max-w-[11rem] object-contain sm:h-8 sm:max-w-[16rem]"
            />
          </div>

          <div className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
            <h1 className="text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              A full day of AI practice at Arvind Fashions.
            </h1>
            <time dateTime="2026-08-20" className="mt-7 block text-center font-display text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              August 20, 2026
            </time>
            <p itemProp="description" className="mx-auto mt-8 max-w-3xl text-fg-muted-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}>
              {arvindSession.intro}
            </p>
          </div>
        </header>
      </section>

      <section className="bg-bg" style={{ padding: "clamp(72px, 10vw, 140px) var(--section-px)" }}>
        <article className="mx-auto max-w-3xl" aria-label="Arvind Fashions session case study">
          <section id="brief" aria-labelledby="arvind-brief-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              The brief
            </p>
            <h2 id="arvind-brief-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              {arvindSession.briefHeading}
            </h2>
            <p className="mt-7 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              {arvindSession.brief}
            </p>
          </section>

          <section id="what-we-ran" className="my-14 border-y border-border py-10 sm:my-20 sm:py-12" aria-labelledby="arvind-what-we-ran-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              What we ran
            </p>
            <h2 id="arvind-what-we-ran-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              {arvindSession.whatWeRanHeading}
            </h2>
            <p className="mt-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              {arvindSession.whatWeRanBody}
            </p>
            <ol className="mt-9 grid gap-7">
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

          <section id="room" aria-labelledby="arvind-room-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              The room
            </p>
            <h2 id="arvind-room-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              {arvindSession.roomHeading}
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              {arvindSession.roomParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <FeedbackQuote quote={arvindSession.testimonials[1]} />

          <section id="what-they-left-with" aria-labelledby="arvind-left-with-heading">
            <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              What they left with
            </p>
            <h2 id="arvind-left-with-heading" className="mt-5 text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
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
