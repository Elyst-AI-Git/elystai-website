import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, organizationSchema, personSchema } from "@/lib/schema";
import { SectionMark } from "@/components/ui/section-mark";
import JsonLd from "@/components/seo/JsonLd";
import Founders, { founders } from "@/components/home/Founders";
import ClosingCta from "@/components/marketing/ClosingCta";

const ABOUT_META_TITLE = "The Team Behind Elyst AI";
const ABOUT_DESCRIPTION =
  "The team behind Elyst AI, and how we identify, build, and hand over AI systems.";
const ABOUT_HERO_COPY =
  "The hard part of AI is not opening another tool. It is choosing what to change, fitting it into how the business already runs, and getting people to actually use it.";
const COMPANY_COPY =
  "Elyst AI exists because most AI projects stop at a demo. We start by understanding how a business actually runs, not by pitching a tool. We make the trade-offs visible before anything gets built, so every decision is made with open eyes rather than in the dark. What we hand back is not a black box someone has to maintain forever, but a working system, fully explained, that keeps running.";

export const metadata = {
  ...pageMeta({
    path: "/about",
    title: "The Team Behind",
    description: ABOUT_DESCRIPTION,
  }),
  title: { absolute: ABOUT_META_TITLE },
  robots: { index: true, follow: true },
};

const aboutPeople = founders.map((founder) =>
  personSchema({
    name: founder.name,
    jobTitle: `${founder.role} and ${founder.title}`,
    description: founder.description,
    sameAs: [founder.linkedin, founder.instagram],
  })
);

const aboutBreadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd data={[organizationSchema, ...aboutPeople, aboutBreadcrumbs]} />

      <section className="bg-bg" style={{ padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(64px, 8vw, 104px)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionMark>About Elyst AI</SectionMark>
          <h1 className="mt-6 max-w-5xl text-fg" style={{ fontSize: "var(--text-hero)", lineHeight: 0.98 }}>
            Your AI partner
          </h1>

          <p className="mt-7 max-w-4xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.5, letterSpacing: "-0.040095em" }}>
            {ABOUT_HERO_COPY} <strong className="hero-accent-word">That is the part we do.</strong>
          </p>
        </div>
      </section>

      <Founders />

      <section className="bg-bg" style={{ padding: "clamp(56px, 7vw, 96px) var(--section-px)" }}>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.58fr_1.42fr] md:gap-16">
          <div>
            <SectionMark>Company</SectionMark>
          </div>
          <p className="max-w-4xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.5 }}>
            {COMPANY_COPY}
          </p>
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
