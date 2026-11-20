import { ImageResponse } from "next/og";
import BrandedOpenGraph from "@/components/seo/BrandedOpenGraph";
import { CASE_CATEGORIES, WORK_CASES, getWorkCase } from "@/lib/work-content";

export const alt = "Elyst AI case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return WORK_CASES.map((item) => ({ slug: item.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWorkCase(slug);
  return new ImageResponse(
    <BrandedOpenGraph
      eyebrow={item ? CASE_CATEGORIES[item.category].label : "Case study"}
      headline={item ? `${item.client}: ${item.subtitle}` : "Elyst AI case study"}
      supporting="A case study by Elyst AI."
    />,
    size,
  );
}
