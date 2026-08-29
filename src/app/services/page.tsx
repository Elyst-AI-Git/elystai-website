import type { Metadata } from "next";
import ServicesPage from "@/components/marketing/ServicesPage";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { OG_IMAGE } from "@/lib/seo";

const title = "AI Audit, Build and Handover | Elyst AI";
const description = "From a workflow problem to a working AI system your team owns.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/services" },
  openGraph: { type: "website", siteName: "Elyst AI", url: "/services", title, description, locale: "en_US", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
};

export default function Services() {
  return (
    <>
      <JsonLd data={[
        serviceSchema({ path: "/services", name: title, description, serviceType: "AI workflow audit, build, and handover" }),
        breadcrumbSchema("Services", "/services"),
      ]} />
      <ServicesPage />
    </>
  );
}
