import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, pageMeta } from "@/lib/seo";
import { caseStudySchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import CaseStudyPage from "@/components/work/CaseStudyPage";
import { CASE_CATEGORIES, WORK_CASES, getWorkCase } from "@/lib/work-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORK_CASES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkCase(slug);
  if (!item) return {};
  return {
    ...pageMeta({
      path: `/work/${item.slug}`,
      title: item.seoTitle,
      description: item.metaDescription,
      // Hero photo when there is one, otherwise the generated card.
      image: item.photos[0] ? item.photos[0].src : `/work/${item.slug}/opengraph-image`,
    }),
    title: { absolute: item.seoTitle },
    robots: { index: true, follow: true },
  };
}

export default async function WorkCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWorkCase(slug);
  if (!item) notFound();
  const category = CASE_CATEGORIES[item.category];

  return (
    <>
      <JsonLd
        data={[
          caseStudySchema({
            path: `/work/${item.slug}`,
            headline: `${item.client}: ${item.subtitle}`,
            description: item.metaDescription,
            image: `${SITE_URL}${item.photos[0]?.src ?? item.logo.src}`,
            keywords: [item.primaryKeyword, ...item.secondaryKeywords].join(", "),
            category: category.label,
            categoryPath: category.href,
            country: item.country,
            client: item.client,
            faqs: item.faqs,
          }),
        ]}
      />
      <CaseStudyPage item={item} />
    </>
  );
}
