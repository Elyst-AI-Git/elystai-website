import type { Metadata } from "next";
import { ogImage } from "@/lib/seo";
import { faqPageSchema, webPageSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/home/Hero";
import NamesStrip from "@/components/home/NamesStrip";
import ProblemSequence from "@/components/home/ProblemSequence";
import TwoWays from "@/components/home/TwoWays";
import SixSteps from "@/components/home/SixSteps";
import { PrinciplesGrid } from "@/components/home/PrinciplesGrid";
import GuideBand from "@/components/marketing/GuideBand";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";
import { HOME_FAQS } from "@/lib/site-content";

const HOME_TITLE = "AI Transformation and AI Training for Businesses | Elyst AI";
const HOME_DESCRIPTION =
  "Elyst AI finds the work AI can do in your business, builds the AI system, and trains your team to use it. For growing businesses across India and the GCC.";
const HOME_OG_IMAGE = ogImage("home", "/opengraph-image");

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
    images: [{ url: HOME_OG_IMAGE, width: 1200, height: 630, alt: "Elyst AI: put AI to work in your business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [HOME_OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd data={[webPageSchema({ path: "/", name: HOME_TITLE, description: HOME_DESCRIPTION }), faqPageSchema(HOME_FAQS, "/")]} />
      <Hero />
      <NamesStrip />
      <ProblemSequence />
      <TwoWays />
      <SixSteps />
      <PrinciplesGrid />
      <FaqSection faqs={HOME_FAQS} heading="Questions worth answering before we start." variant="chat" />
      <GuideBand />
      <ClosingCta />
    </main>
  );
}
