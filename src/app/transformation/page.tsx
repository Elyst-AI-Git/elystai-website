import { ogImage, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, serviceSchema, webPageSchema } from "@/lib/schema";
import TransformationHero from "@/components/transformation/TransformationHero";
import StepsTimeline from "@/components/transformation/StepsTimeline";
import SystemActuallyIs from "@/components/home/SystemActuallyIs";
import ProblemSequence from "@/components/home/ProblemSequence";
import ProofBlock from "@/components/marketing/ProofBlock";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import GuideBand from "@/components/marketing/GuideBand";
import { SectionMark } from "@/components/ui/section-mark";
import { ServicesFitStrip } from "@/components/marketing/ServicesFitStrip";
import JsonLd from "@/components/seo/JsonLd";
import { TRANSFORMATION_FAQS } from "@/lib/site-content";

const DESCRIPTION =
  "We find the work AI can do for you, build an AI system around how your team works, and train your people to use it. Six clear steps. India and GCC.";

export const metadata = {
  ...pageMeta({
    path: "/transformation",
    title: "AI Transformation for Growing Businesses",
    description: DESCRIPTION,
    image: ogImage("transformation", "/transformation/opengraph-image"),
  }),
  title: { absolute: "AI Transformation for Growing Businesses | Elyst AI" },
  robots: { index: true, follow: true },
};

const worksIf = [
  "A specific task costs you time or leads.",
  "One person owns the change.",
  "You can describe what good looks like.",
  "Your team is roughly 10–30 people.",
];

const doesNotWorkIf = [
  "You want “AI for everything”.",
  "Nobody owns the process.",
  "You want AI deciding with no one checking.",
  "You want AI to replace someone.",
];

export default function TransformationPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd
        data={[
          webPageSchema({ path: "/transformation", name: "AI Transformation for Growing Businesses", description: DESCRIPTION }),
          serviceSchema({ path: "/transformation", name: "AI Transformation", description: DESCRIPTION }),
          faqPageSchema(TRANSFORMATION_FAQS, "/transformation"),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Transformation", path: "/transformation" },
          ]),
        ]}
      />

      <TransformationHero />

      <SystemActuallyIs />

      <ProblemSequence
        linesOnly
        label="An AI system made for your team"
        lines={[
          "Not another software built for all.",
          "An AI system made for your team,",
          "around the way your people work.",
        ]}
      />

      <StepsTimeline />

      <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionMark>Fit</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Is this for you?
          </h2>

          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-center font-display font-semibold text-fg" style={{ fontSize: "var(--text-h3)" }}>
                This works if
              </h3>
              <div className="mt-7 grid gap-4">
                {worksIf.map((item, index) => (
                  <ServicesFitStrip key={item} kind="yes" rotation={[2.2, -1.8, 2.5, -2.1][index]}>
                    {item}
                  </ServicesFitStrip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-center font-display font-semibold text-fg" style={{ fontSize: "var(--text-h3)" }}>
                This does not work if
              </h3>
              <div className="mt-7 grid gap-4">
                {doesNotWorkIf.map((item, index) => (
                  <ServicesFitStrip key={item} kind="no" rotation={[-2.4, 1.7, -2.8, 2.2][index]}>
                    {item}
                  </ServicesFitStrip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofBlock headingId="transformation-proof-heading" />
      <FaqSection faqs={TRANSFORMATION_FAQS} heading="Questions clients ask before they start." />
      <GuideBand />
      <ClosingCta />
    </main>
  );
}
