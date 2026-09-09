import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import FaqSection from "@/components/marketing/FaqSection";
import ClosingCta from "@/components/marketing/ClosingCta";
import { SectionMark } from "@/components/ui/section-mark";
import Wordmark from "@/components/site/Wordmark";
import { arvindAdditionalFeedback, arvindFaqs } from "@/lib/training-content";
import { arvindSession } from "@/components/training/ArvindSessionSection";

function FeedbackQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: ReactNode;
}) {
  return (
    <section aria-label="Participant quote" className="my-16 sm:my-24">
      <blockquote className="border-l-2 border-emerald bg-surface-accent-soft px-6 py-7 sm:px-8 sm:py-9">
        <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}>
          “{quote}”
        </p>
        <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
          <strong className="font-semibold text-fg">{attribution}</strong>
        </cite>
      </blockquote>
    </section>
  );
}

export default function ArvindSessionPage() {
  return (
    <main id="main" className="flex-1 bg-bg pt-24" itemScope itemType="https://schema.org/CreativeWork">
      <section className="bg-surface-dark" style={{ padding: "clamp(64px, 9vw, 124px) var(--section-px) clamp(64px, 8vw, 112px)" }}>
        <header className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="underline underline-offset-4 hover:text-fg-on-dark">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/training" className="underline underline-offset-4 hover:text-fg-on-dark">Corporate AI training</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Arvind Fashions</li>
            </ol>
          </nav>

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
            <SectionMark tone="dark">Corporate training work</SectionMark>
            <h1 itemProp="name" className="mt-6 text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h1)", lineHeight: 1.02 }}>
              Corporate AI training at Arvind Fashions
            </h1>
            <p itemProp="description" className="mx-auto mt-7 max-w-3xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
              {arvindSession.caseSummary}
            </p>
          </div>
        </header>
      </section>

      <section className="bg-bg" style={{ padding: "clamp(72px, 10vw, 140px) var(--section-px)" }}>
        <article className="mx-auto max-w-3xl" aria-label="Arvind Fashions corporate training case study">
          <section id="brief" aria-labelledby="arvind-brief-heading">
            <h2 id="arvind-brief-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              The requirement
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              <p>The way a team applies AI depends on its work, responsibilities and existing level of familiarity.</p>
              <p>Elyst AI tailored the session for Arvind Fashions so that the experience was relevant to the people attending. The programme prioritised active participation and workplace relevance over a standard presentation.</p>
              <p>A generic introduction can create awareness, but organisations need more than a list of tools or demonstrations. Teams need a structured way to understand where AI fits, how to approach it and how to make better decisions about its use.</p>
              <p>This is why Elyst AI starts with the organisation and audience before finalising a corporate session.</p>
            </div>
          </section>

          <FeedbackQuote
            quote={arvindAdditionalFeedback.quote}
            attribution={arvindAdditionalFeedback.attribution}
          />

          <section id="programme" className="mt-16 sm:mt-24" aria-labelledby="arvind-programme-heading">
            <h2 id="arvind-programme-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              A programme designed for a cross-functional audience
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              <p>Elyst AI tailored the programme around the organisation and the range of teams attending.</p>
              <p>The session was designed to help participants approach AI with greater clarity and connect the learning to their own work. Instead of treating AI as a collection of tools or isolated demonstrations, the programme focused on building practical understanding through participation and relevant workplace context.</p>
            </div>
          </section>

          <section id="customisation" className="mt-16 sm:mt-24" aria-labelledby="arvind-customisation-heading">
            <h2 id="arvind-customisation-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              Why cross-functional AI training requires customisation
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              <p>Design, marketing, customer service and operations teams do not approach work in the same way. Their responsibilities, decisions and expectations from AI differ.</p>
              <p>Effective corporate AI training must account for these differences while giving the organisation a shared foundation. This is why Elyst AI understands the audience before finalising the structure of a programme.</p>
            </div>
          </section>

          <FeedbackQuote
            quote={arvindSession.testimonial}
            attribution="Participant from the session"
          />

          <section id="approach" aria-labelledby="arvind-approach-heading">
            <h2 id="arvind-approach-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              How Elyst AI approached the engagement
            </h2>
            <ol className="mt-9 grid gap-8">
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Understand the audience</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The programme was shaped around a group ranging from assistant managers to senior managers across four business functions.</p>
              </li>
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Build around the organisation</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The session was tailored for Arvind Fashions rather than delivered from a generic public syllabus.</p>
              </li>
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Prioritise participation</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The full-day format created room for active involvement, guided application and questions from different functional perspectives.</p>
              </li>
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Keep the learning connected to work</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The programme was designed to help participants relate AI to a professional context instead of approaching it only as a new technology.</p>
              </li>
            </ol>
          </section>

          <p className="mt-16 text-fg-2 sm:mt-24" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
            Explore <Link href="/training" className="font-semibold text-emerald underline decoration-emerald/35 underline-offset-4">corporate AI training for teams</Link> from Elyst AI.
          </p>
        </article>
      </section>

      <FaqSection faqs={arvindFaqs} heading="Frequently asked questions" includeStructuredData={false} />

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
