import Image from "next/image";
import Link from "next/link";
import FaqSection from "@/components/marketing/FaqSection";
import ClosingCta from "@/components/marketing/ClosingCta";
import { SectionMark } from "@/components/ui/section-mark";
import Wordmark from "@/components/site/Wordmark";
import { autobahnFaqs, autobahnFeedback } from "@/lib/training-content";

const caseSummary =
  "In September, Elyst AI delivered a full-day, in-person corporate AI training programme for 40 HR professionals from Autobahn Group in Kochi.";

function FeedbackQuote({
  quote,
  attribution,
  role,
}: {
  quote: string;
  attribution: string;
  role?: string;
}) {
  return (
    <section aria-label="Participant quote" className="my-16 sm:my-24">
      <blockquote className="border-l-2 border-emerald bg-surface-accent-soft px-6 py-7 sm:px-8 sm:py-9">
        <p className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}>
          “{quote}”
        </p>
        <cite className="mt-5 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
          {role ? (
            <>
              <strong className="font-semibold text-fg">{attribution}</strong>
              <span className="mt-1 block">{role}</span>
            </>
          ) : attribution}
        </cite>
      </blockquote>
    </section>
  );
}

function AutobahnLogo() {
  return (
    <Image
      src="/brands/autobahn-corp-wordmark.png"
      alt="Autobahn Group"
      width={180}
      height={110}
      className="h-auto w-[9rem] max-w-[48%] object-contain sm:w-[12rem]"
    />
  );
}

export default function AutobahnSessionPage() {
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
              <li aria-current="page">Autobahn Group</li>
            </ol>
          </nav>

          <div className="mt-7 flex min-h-8 items-center justify-between gap-5 border-b border-white/15 pb-7 sm:gap-8">
            <Link href="/" aria-label="Elyst AI home" className="flex shrink-0 items-center">
              <Wordmark className="h-7 w-auto text-fg-on-dark sm:h-8" />
            </Link>
            <AutobahnLogo />
          </div>

          <div className="mx-auto mt-12 max-w-4xl text-center sm:mt-16">
            <SectionMark tone="dark">Corporate training work</SectionMark>
            <h1 itemProp="name" className="mt-6 text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h1)", lineHeight: 1.02 }}>
              Corporate AI training at Autobahn Group
            </h1>
            <p itemProp="description" className="mx-auto mt-7 max-w-3xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
              {caseSummary}
            </p>
          </div>
        </header>
      </section>

      <section className="bg-bg" style={{ padding: "clamp(72px, 10vw, 140px) var(--section-px)" }}>
        <article className="mx-auto max-w-3xl" aria-label="Autobahn Group corporate training case study">
          <section id="brief" aria-labelledby="autobahn-brief-heading">
            <h2 id="autobahn-brief-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              The requirement
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              <p>Autobahn Group wanted its HR team to develop a proper understanding of AI and how it could be used effectively at work.</p>
              <p>Because the programme was exclusively for HR, it needed to reflect the function’s working context rather than provide a broad session intended for a mixed audience.</p>
            </div>
          </section>

          <FeedbackQuote
            quote={autobahnFeedback[0].quote}
            attribution={autobahnFeedback[0].attribution}
          />

          <section id="programme" className="mt-16 sm:mt-24" aria-labelledby="autobahn-programme-heading">
            <h2 id="autobahn-programme-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              A programme tailored for the HR function
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              <p>Elyst AI shaped the programme around Autobahn Group and the participating HR team.</p>
              <p>The full-day session was designed to build practical understanding, encourage active participation and help attendees connect AI with a professional context. The programme did not treat AI as a collection of disconnected tools or demonstrations.</p>
            </div>
          </section>

          <section id="department-specific" className="mt-16 sm:mt-24" aria-labelledby="autobahn-department-heading">
            <h2 id="autobahn-department-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              Why department-specific AI training matters
            </h2>
            <div className="mt-7 grid gap-6 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
              <p>A department-specific programme can be more relevant than a general company-wide introduction because everyone in the room shares related responsibilities and working contexts.</p>
              <p>For HR and L&amp;D leaders, this also makes it easier to align the programme with the needs of the function instead of expecting participants to translate generic material by themselves.</p>
            </div>
          </section>

          <FeedbackQuote
            quote={autobahnFeedback[1].quote}
            attribution={autobahnFeedback[1].attribution}
            role={autobahnFeedback[1].role}
          />

          <section id="approach" className="mt-16 sm:mt-24" aria-labelledby="autobahn-approach-heading">
            <h2 id="autobahn-approach-heading" className="text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.08 }}>
              How Elyst AI approached the engagement
            </h2>
            <ol className="mt-9 grid gap-8">
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Understand the function</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The programme was planned specifically for an HR audience of 40 participants.</p>
              </li>
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Account for different levels of responsibility</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The group included HR team members through the HR lead, requiring a programme relevant across levels of seniority.</p>
              </li>
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Tailor the programme</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The session was shaped around the organisation and audience rather than copied from a fixed public syllabus.</p>
              </li>
              <li>
                <h3 className="font-display font-semibold text-fg" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>Use a participatory format</h3>
                <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>The full-day, in-person format allowed space for guided application, questions and practical engagement.</p>
              </li>
            </ol>
          </section>

          <p className="mt-16 text-fg-2 sm:mt-24" style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>
            Explore <Link href="/training" className="font-semibold text-emerald underline decoration-emerald/35 underline-offset-4">corporate AI training for teams</Link> from Elyst AI.
          </p>

        </article>
      </section>

      <FaqSection faqs={autobahnFaqs} heading="Frequently asked questions" includeStructuredData={false} />

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
