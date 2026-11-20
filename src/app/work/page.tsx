import { ogImage, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, caseListSchema, webPageSchema } from "@/lib/schema";
import { WORK_CASES } from "@/lib/work-content";
import JsonLd from "@/components/seo/JsonLd";
import ClosingCta from "@/components/marketing/ClosingCta";
import { SectionMark } from "@/components/ui/section-mark";
import WorkGrid from "@/components/work/WorkGrid";

const DESCRIPTION =
  "AI systems and AI training we delivered for Nalakath Holdings, Arvind Fashions, Kalyan Tourism and Autobahn Corp. What they asked for and what changed.";

export const metadata = {
  ...pageMeta({ path: "/work", title: "AI Case Studies: Our Works", description: DESCRIPTION, image: ogImage("works", "/work/opengraph-image") }),
  robots: { index: true, follow: true },
};

export default function WorkPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd
        data={[
          webPageSchema({ path: "/work", name: "AI Case Studies: Our Works", description: DESCRIPTION, type: "CollectionPage" }),
          caseListSchema(WORK_CASES.map((item) => ({ path: `/work/${item.slug}`, name: item.client }))),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Works", path: "/work" }]),
        ]}
      />
      <section className="bg-bg" style={{ padding: "clamp(76px, 10vw, 148px) var(--section-px) var(--section-py)" }}>
        <div className="mx-auto max-w-7xl">
          <SectionMark>Works</SectionMark>
          <h1 className="mt-6 max-w-5xl text-fg" style={{ fontSize: "var(--text-hero)", lineHeight: 0.98 }}>
            Some of our works.
          </h1>
          <WorkGrid />
        </div>
      </section>
      <ClosingCta />
    </main>
  );
}
