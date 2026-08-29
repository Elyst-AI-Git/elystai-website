import type { Metadata } from "next";
import AboutPage from "@/components/marketing/AboutPage";
import JsonLd from "@/components/seo/JsonLd";
import { aboutPeopleSchema, breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

const title = "Your AI Partner | About Elyst AI";
const description = "Meet the two founders who handle discovery, technical decisions, implementation, training, and handover at Elyst AI.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", siteName: "Elyst AI", url: "/about", title, description, locale: "en_US", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

export default function About() {
  return (
    <>
      <JsonLd data={[organizationSchema, aboutPeopleSchema, breadcrumbSchema("About", "/about")]} />
      <AboutPage />
    </>
  );
}
