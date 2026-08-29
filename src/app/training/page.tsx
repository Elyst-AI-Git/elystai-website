import type { Metadata } from "next";
import TrainingPage from "@/components/marketing/TrainingPage";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

const title = "AI Training Built Around Your Team's Work | Elyst AI";
const description = "Role-specific AI training for companies and institutions, designed around approved tools, real work, human review, and practical follow-through.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/training" },
  openGraph: { type: "website", siteName: "Elyst AI", url: "/training", title, description, locale: "en_US", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

export default function Training() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ path: "/training", name: title, description, serviceType: "Corporate and institutional AI training" }),
        breadcrumbSchema("Training", "/training"),
      ]} />
      <TrainingPage />
    </>
  );
}
