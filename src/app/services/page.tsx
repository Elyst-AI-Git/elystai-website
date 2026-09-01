import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import ServicesHero from "@/components/marketing/ServicesHero";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import { SectionMark } from "@/components/ui/section-mark";
import { ServicesFitStrip } from "@/components/marketing/ServicesFitStrip";
import ServicesProcess from "@/components/marketing/ServicesProcess";
import ServicesProofSection from "@/components/marketing/ServicesProofSection";
import TrainingRoutingStrip from "@/components/home/TrainingRoutingStrip";
import JsonLd from "@/components/seo/JsonLd";

const SERVICES_DESCRIPTION =
  "From workflow diagnosis to tested implementation and handover, Elyst AI builds around the tools your team already uses.";

export const metadata = {
  ...pageMeta({
    path: "/services",
    title: "How Elyst AI Builds Systems Your Team Owns",
    description: SERVICES_DESCRIPTION,
  }),
  title: { absolute: "How Elyst AI Builds Systems Your Team Owns | Elyst AI" },
  robots: { index: true, follow: true },
};

const fitPairs = [
  {
    no: "We want to add AI to the business.",
    yes: "A specific task is costing us time or leads.",
  },
  {
    no: "Nobody really owns this process.",
    yes: "One person owns it and wants it fixed.",
  },
  {
    no: "We want AI to decide and nobody checks.",
    yes: "I want to make my team AI-Native",
  },
  {
    no: "We just want to try something and see.",
    yes: "We can describe what good looks like.",
  },
];

const serviceFaqs = [
  {
    q: "How long does it take?",
    a: "It depends on the workflow. We commit to timelines after we understand it, not before.",
  },
  {
    q: "What data access do you need?",
    a: "Only what the workflow requires, agreed in writing first.",
  },
  {
    q: "What if AI is not the answer?",
    a: "We say so, and tell you what would help instead.",
  },
  {
    q: "Who owns it afterwards?",
    a: "You do. Accounts and admin transfer at handover.",
  },
  {
    q: "What support is included?",
    a: "An agreed period, defined in the proposal.",
  },
  {
    q: "How is it priced?",
    a: "Per project, paid in phases. Never one upfront sum.",
  },
];

const bringLists = {
  you: [
    "A decision owner",
    "Access to the workflow",
    "Honest answers about what has already failed",
    "Time from the people who actually do the work",
  ],
  we: [
    "Discovery and mapping",
    "The build",
    "Training and documentation",
    "A named owner at handover",
  ],
};

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd
        data={[
          serviceSchema({
            path: "/services",
            name: "AI workflow identification, implementation and training",
            description: SERVICES_DESCRIPTION,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      <ServicesHero />

      <ServicesProcess />

      <ServicesProofSection />

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionMark>Fit</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Is this for you?
          </h2>

          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-center font-display font-semibold text-fg" style={{ fontSize: "var(--text-h3)" }}>
                This won&apos;t work if
              </h3>
              <div className="mt-7 grid gap-4">
                {fitPairs.map((pair, index) => (
                  <ServicesFitStrip key={pair.no} kind="no" rotation={[-2.4, -1.7, -2.8, -2.1][index]}>
                    {pair.no}
                  </ServicesFitStrip>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-center font-display font-semibold text-fg" style={{ fontSize: "var(--text-h3)" }}>
                This will work if
              </h3>
              <div className="mt-7 grid gap-4">
                {fitPairs.map((pair, index) => (
                  <ServicesFitStrip key={pair.yes} kind="yes" rotation={[2.2, 2.8, 1.9, 2.5][index]}>
                    {pair.yes}
                  </ServicesFitStrip>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Working together is intentionally held out of the page for now. */}
      {false && (
      <section className="bg-surface-muted" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-16">
          <div>
            <SectionMark>Working together</SectionMark>
            <h2 className="mt-6 max-w-md text-fg" style={{ fontSize: "var(--text-h2)" }}>
              What we need from you.
            </h2>
          </div>

          <div className="overflow-hidden rounded-md border border-emerald/20 bg-surface-dark shadow-card">
            <div className="grid md:grid-cols-2">
              <div className="p-6 sm:p-8">
                <span className="font-display font-bold uppercase text-fg-muted-dark" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  You bring
                </span>
                <ul className="mt-5 list-none divide-y divide-white/10 border-t border-white/10 p-0">
                  {bringLists.you.map((item) => (
                    <li key={item} className="py-4 text-fg-on-dark/85" style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t-2 border-green p-6 sm:p-8 md:border-l md:border-t-0">
                <span className="font-display font-bold uppercase text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                  We bring
                </span>
                <ul className="mt-5 list-none divide-y divide-white/10 border-t border-white/10 p-0">
                  {bringLists.we.map((item) => (
                    <li key={item} className="py-4 text-fg-on-dark/85" style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <FaqSection
        faqs={serviceFaqs}
        heading="Questions clients ask before they start."
      />

      <TrainingRoutingStrip />

      <ClosingCta
        heading="Bring us one workflow that is not working."
        sub="Bring tasks that take too long and we will tell you if AI is the answer."
        buttonLabel="Book a Call"
        intent="identify"
        href="/services#our-process"
      />
    </main>
  );
}
