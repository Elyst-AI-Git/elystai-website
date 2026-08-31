import Image from "next/image";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";

export const arvindSession = {
  company: "Arvind Fashions",
  intro: "A practical AI session built around the work people do daily.",
  brief:
    "A working session on AI at one of India's biggest company in the fashion and retail segment, exploring where AI can make their everyday work clearer, faster, and easier to repeat across different teams.",
  briefHeading: "They wanted more from the work already happening.",
  whatWeRanHeading: "Start with the basics. Practise on the work.",
  whatWeRanBody:
    "We started with fundamentals, then moved into function-specific application. Participants practised on their own real work alongside exercises we set.",
  whatWeRanItems: [
    "Fundamentals first — establish a shared starting point.",
    "Function-specific application — show what AI could do across the work represented in the room.",
    "Own work — practise on tasks participants brought from their roles.",
    "Set exercises — practise alongside exercises designed for the session.",
  ],
  mixedRoom:
    "Assistant managers and senior directors worked in the same room across marketing, design, finance, support, and other functions.",
  roomHeading: "Exposure is not working knowledge.",
  roomParagraphs: [
    "The room started with exposure, questions, and no shared working knowledge. The session had to meet assistant managers and senior directors across different functions at the same time.",
    "Afterwards, one participant rang to say that something covered during the day had changed how she looked at her work. Several participants stayed back to build something their team could actually use.",
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
  pulledOff: [
    "Role-specific exercises where they see the difference instead of generic demos",
    "Hands-on practice with real work patterns",
    "A clearer next step for using AI effectively at their work after the session",
  ],
  testimonial:
    "This session changed how I looked at my work and how I used AI, I have lots of ideas in mind right now that I want to try out in my work",
  testimonials: [
    "The amount of things I got to know today and the number of ways in which we can make AI for us is crazy",
    "I had no idea there was much things AI can do so well and so fast",
  ],
} as const;

function ArvindWordmark() {
  return (
    <div aria-label={arvindSession.company} className="flex min-h-32 items-center px-2 py-6 sm:px-3">
      <Image
        src="/brands/arvind-fashions-wordmark-red.png"
        alt="Arvind Fashions"
        width={555}
        height={67}
        className="h-auto w-full max-w-[32rem] object-contain"
      />
    </div>
  );
}

export default function ArvindSessionSection() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px) clamp(88px, 8vw, 112px)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-20">
          <header>
            <SectionMark>Latest session</SectionMark>
            <h2 className="mt-6 max-w-xl text-balance text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              A practical team session, built around everyday work.
            </h2>
          </header>

          <div className="relative overflow-hidden rounded-md border-2 border-emerald/20 bg-surface-accent-soft p-6 shadow-card sm:p-8 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-[radial-gradient(circle_at_center,rgba(3,98,76,0.24)_0_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="relative z-10">
              <ArvindWordmark />
              <div className="mt-8 grid gap-9 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
                <div>
                  <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                    Brief
                  </p>
                  <p className="mt-4 max-w-sm text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
                    {arvindSession.brief}
                  </p>
                </div>
                <div>
                  <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                    What we pulled off
                  </p>
                  <ul className="mt-4 grid gap-3 text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.4 }}>
                    {arvindSession.pulledOff.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>

              <blockquote className="mt-10 border-t border-emerald/20 pt-7 font-display font-semibold text-fg" style={{ fontSize: "var(--text-lead)", lineHeight: 1.2 }}>
                “{arvindSession.testimonial}”
                <cite className="mt-4 block font-sans not-italic text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.35 }}>
                  Participant from the session
                </cite>
              </blockquote>

              <div className="mt-9 border-t border-emerald/20 pt-7">
                <BrandButton href="/training/arvind-fashions" tone="emerald">
                  See the Arvind Fashions session
                </BrandButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
