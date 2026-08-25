import type { Metadata } from "next";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/home/Hero";
import ProblemSequence from "@/components/home/ProblemSequence";
import ProcessSection from "@/components/home/ProcessSection";
import { PrinciplesGrid } from "@/components/home/PrinciplesGrid";
import ClosingCta from "@/components/marketing/ClosingCta";

const HOME_TITLE = "AI Strategy, Implementation & Development | Elyst AI";
const HOME_DESCRIPTION =
  "We understand how your company works, identify where AI can elevate the business, build the right AI system, and train your team to run it.";
const HOME_OG_IMAGE = "/opengraph-image";

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
    images: [{ url: HOME_OG_IMAGE, width: 1200, height: 630, alt: "Elyst AI strategy, implementation, and custom AI development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [HOME_OG_IMAGE],
  },
};

export default function Home() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Hero />
      <ProblemSequence />
      <ProcessSection />
      <PrinciplesGrid />
      <ClosingCta />
    </main>
  );
}
