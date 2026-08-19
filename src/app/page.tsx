import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/home/Hero";
import ProblemSequence from "@/components/home/ProblemSequence";
import ProcessSection from "@/components/home/ProcessSection";
import { PrinciplesGrid } from "@/components/home/PrinciplesGrid";
import TrainingStrip from "@/components/home/TrainingStrip";
import ClosingCta from "@/components/marketing/ClosingCta";

const HOME_TITLE = "Elyst AI | AI Strategy, Implementation & Custom AI Development.";
const HOME_DESCRIPTION =
  "We audit how your company works, identify where AI can elevate the business, build the right AI system, and train your team to run it.";

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
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
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
      <TrainingStrip />
      <ClosingCta />
    </main>
  );
}
