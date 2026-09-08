import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SectionMark } from "@/components/ui/section-mark";

export const arvindSession = {
  company: "Arvind Fashions",
  intro: "A practical AI session built around the work people do daily.",
  caseSummary:
    "In August, Elyst AI delivered an in-person corporate AI training session for Arvind Fashions in Bengaluru.",
  contextHeading: "Useful corporate training begins with context.",
  contextParagraphs: [
    "The way a team applies AI depends on its work, responsibilities and existing level of familiarity.",
    "Elyst AI tailored the session for Arvind Fashions so that the experience was relevant to the people attending. The programme prioritised active participation and workplace relevance over a standard presentation.",
    "A generic introduction can create awareness, but organisations need more than a list of tools or demonstrations. Teams need a structured way to understand where AI fits, how to approach it and how to make better decisions about its use.",
    "This is why Elyst AI starts with the organisation and audience before finalising a corporate session.",
  ],
  approachItems: [
    "Understand the organisation and participating audience",
    "Tailor the session around their context",
    "Deliver an in-person, participatory experience",
    "Keep training practical and relevant to work",
  ],
  roomHeading: "Exposure is not working knowledge.",
  roomParagraphs: [
    "People knew enough about AI to have seen its possibilities, but not enough to apply it consistently to their own work. That gave the day a clear starting point: fundamentals first, then practice.",
    "One participant called after the session and told us that something covered during the day had changed how she looked at her work. Several others stayed back because they wanted to build a working thing for their team, not watch another demo.",
  ],
  leftWithHeading: "What the room left with",
  leftWithItems: [
    "Things participants had set up during the session itself.",
    "Things they had tried and seen working.",
    "Outputs they could see, not just concepts described.",
    "Workflows they could repeat afterwards.",
  ],
  honestyLine:
    "We did not measure productivity after the session. This page shows what the day was like, not a return figure.",
  testimonial:
    "This session changed how I looked at my work and how I used AI, I have lots of ideas in mind right now that I want to try out in my work",
  testimonials: [
    "The amount of things I got to know today and the number of ways in which we can make AI for us is crazy",
    "I had no idea there was much things AI can do so well and so fast",
  ],
} as const;

function ArvindWordmark() {
  return (
    <div aria-label={arvindSession.company} className="flex h-48 items-center justify-center px-2 sm:h-64 sm:px-3">
      <Image
        src="/brands/arvind-fashions-wordmark-white-tight.png"
        alt="Arvind Fashions"
        width={543}
        height={61}
        className="h-auto w-full max-w-[26rem] object-contain"
      />
    </div>
  );
}

function AutobahnWordmark() {
  return (
    <div className="flex h-48 items-center justify-center bg-surface-dark px-2 sm:h-64 sm:px-3">
      <Image
        src="/brands/autobahn-group-wordmark.png"
        alt="Autobahn Group logo"
        width={299}
        height={172}
        className="h-auto w-full max-w-[26rem] object-contain"
      />
    </div>
  );
}

function SessionCard({
  href,
  company,
  location,
  children,
}: {
  href: string;
  company: string;
  location: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative block h-full overflow-hidden rounded-md border-2 border-emerald/35 bg-surface-dark p-6 text-fg-on-dark shadow-card transition-shadow hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-4 sm:p-8 lg:p-10"
      aria-label={`Read the ${company} corporate AI training case study`}
    >
      <div className="relative z-10 flex h-full flex-col">
        {children}
        <div className="mt-8 flex items-end justify-between gap-5 border-t border-white/15 pt-6">
          <div>
            <p className="font-display font-bold uppercase text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
              {company}
            </p>
            <p className="mt-2 text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
              {location}
            </p>
          </div>
          <span className="shrink-0 font-display font-semibold text-green underline decoration-green/35 underline-offset-4 transition-colors group-hover:text-fg-on-dark" style={{ fontSize: "var(--text-small)" }}>
            Read case page
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ArvindSessionSection() {
  return (
    <section id="past-sessions" className="bg-bg" style={{ padding: "var(--section-py) var(--section-px) clamp(88px, 8vw, 112px)" }}>
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end lg:gap-12">
          <div>
            <SectionMark>Past sessions</SectionMark>
            <h2 className="mt-6 text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              Our most recent AI corporate training work
            </h2>
          </div>
          <p className="mt-6 max-w-3xl text-fg-2 lg:col-start-2 lg:mt-0 lg:justify-self-end lg:pb-1" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
            Read how Elyst AI delivers tailored, in-person corporate AI training for organisations and their teams.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2 sm:mt-14">
          <SessionCard
            href="/training/arvind-fashions"
            company="Arvind Fashions"
            location="Bengaluru · August · In person"
          >
            <ArvindWordmark />
            <p className="mt-7 max-w-xl font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.2 }}>
              {arvindSession.intro}
            </p>
            <p className="mt-5 max-w-xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
              {arvindSession.caseSummary}
            </p>
          </SessionCard>

          <SessionCard
            href="/training/autobahn-group"
            company="Autobahn Group"
            location="Kochi · September · In person"
          >
            <AutobahnWordmark />
            <p className="mt-7 max-w-xl font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.2 }}>
              Tailored corporate AI training for an organisation and its participating teams.
            </p>
            <p className="mt-5 max-w-xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
              In September, Elyst AI delivered an in-person corporate AI training session for Autobahn Group in Kochi.
            </p>
          </SessionCard>
        </div>
      </div>
    </section>
  );
}
