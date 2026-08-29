import type { Metadata } from "next";
import HomePage from "@/components/marketing/HomePage";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

const HOME_TITLE = "AI Workflow Audits and Implementation | Elyst AI";
const HOME_DESCRIPTION = "Elyst AI audits how your team works, builds the right AI system, and hands it over with training and documentation.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Elyst AI",
    url: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Elyst AI" }],
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: HOME_DESCRIPTION, images: [OG_IMAGE] },
};

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <HomePage />
    </>
  );
}
