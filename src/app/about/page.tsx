import { ogImage, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, personSchema, webPageSchema } from "@/lib/schema";
import { SectionMark } from "@/components/ui/section-mark";
import JsonLd from "@/components/seo/JsonLd";
import Founders, { founders } from "@/components/home/Founders";
import { ServicesFitStrip } from "@/components/marketing/ServicesFitStrip";
import ClosingCta from "@/components/marketing/ClosingCta";

const ABOUT_META_TITLE = "About Elyst AI: Nihal Anas and Fathima Shirin P";
const ABOUT_DESCRIPTION =
  "We started Elyst AI because businesses struggle to get value out of AI. We build AI systems and train the people who use them, from Kozhikode, Kerala.";
const STORY = [
  "Both founders graduated as Kerala's first AI engineering batch. They started on the technical side building AI solutions.",
  "Over time, Nihal has built AI solutions across 5 different areas in AI. Shirin has trained more than 3,000 professionals on AI.",
  "Together, they started a company from Kerala that does both: builds AI systems and trains the people on it.",
];

const HOW_WE_WORK = [
  { title: "Built around your business", body: "We design around your team, not a demo." },
  { title: "Tested on real work", body: "We test, fix and improve on your actual tasks." },
  { title: "You own the build", body: "Accounts move to you at handover. No lock-in." },
];

export const metadata = {
  ...pageMeta({
    path: "/about",
    title: ABOUT_META_TITLE,
    description: ABOUT_DESCRIPTION,
    image: ogImage("about", "/about/opengraph-image"),
  }),
  title: { absolute: ABOUT_META_TITLE },
  robots: { index: true, follow: true },
};

const aboutPeople = founders.map((founder) =>
  personSchema({
    id: founder.name === "Fathima Shirin P" ? "fathima-shirin-p" : "nihal-anas",
    name: founder.name,
    jobTitle: `${founder.role} and ${founder.title}`,
    description: founder.description,
    image: founder.photo,
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
      <JsonLd data={[webPageSchema({ path: "/about", name: ABOUT_META_TITLE, description: ABOUT_DESCRIPTION, type: "AboutPage" }), ...aboutPeople, aboutBreadcrumbs]} />

      <section className="bg-bg" style={{ padding: "clamp(76px, 10vw, 148px) var(--section-px) clamp(64px, 8vw, 104px)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionMark>About Elyst AI</SectionMark>
          <h1 className="mt-6 text-fg" style={{ fontSize: "clamp(1.9rem, 4.3vw, 3.9rem)", lineHeight: 1.08 }}>
            <span className="block">We started <span className="hero-accent-word">Elyst AI</span> because businesses</span>
            <span className="block">struggle to get value out of AI.</span>
          </h1>
        </div>
      </section>

      <section className="bg-bg" style={{ padding: "0 var(--section-px) clamp(56px, 7vw, 96px)" }}>
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[0.58fr_1.42fr] md:gap-16">
          <div>
            <SectionMark>Our story</SectionMark>
          </div>
          <div className="max-w-4xl text-fg-2" style={{ fontSize: "var(--text-lead)", lineHeight: 1.5 }}>
            {STORY.map((paragraph, index) => (
              <p key={paragraph} className={index > 0 ? "mt-6" : ""}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <Founders />

      <section className="bg-bg" style={{ padding: "clamp(56px, 7vw, 96px) var(--section-px)" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center">
          <SectionMark>How we work</SectionMark>
          <div className="mt-10 grid w-full max-w-md gap-6">
            {HOW_WE_WORK.map((item, index) => (
              <ServicesFitStrip key={item.title} kind="plain" rotation={[-1.8, 2.2, -2.4, 1.6, -2, 2.4][index % 6]}>
                <span className="block font-semibold">{item.title}</span>
                <span className="mt-1 block font-normal text-fg-2" style={{ fontSize: "var(--text-small)" }}>{item.body}</span>
              </ServicesFitStrip>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </main>
  );
}
