import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/home/Hero";
import NumbersSection from "@/components/home/NumbersSection";
import ProblemSequence from "@/components/home/ProblemSequence";
import SystemActuallyIs from "@/components/home/SystemActuallyIs";
import ProcessSection from "@/components/home/ProcessSection";
import { PrinciplesGrid } from "@/components/home/PrinciplesGrid";
import HomeProofSection from "@/components/home/HomeProofSection";
import TrainingRoutingStrip from "@/components/home/TrainingRoutingStrip";
import ClosingCta from "@/components/marketing/ClosingCta";
import FaqSection from "@/components/marketing/FaqSection";

const homeFaqs = [
  { q: "How is it priced?", a: "Per project, paid in phases." },
  { q: "How long does it take?", a: "We commit to a timeline after the audit, not before." },
  { q: "What if AI isn't the answer?", a: "We say so, and tell you what would help instead." },
  { q: "Who owns it afterwards?", a: "You do. Accounts and access transfer at handover." },
];

const HOME_TITLE = "Elyst AI | AI Strategy, Implementation & Custom AI Development.";
const HOME_DESCRIPTION =
  "We understand how your company works, identify where AI can elevate the business, build the right AI system, and train your team to run it.";

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
      <NumbersSection />
      <ProblemSequence />
      <SystemActuallyIs />
      <ProcessSection />
      <PrinciplesGrid />
      <HomeProofSection />
      <FaqSection faqs={homeFaqs} heading="Questions worth answering before we start." />
      <TrainingRoutingStrip />
      <ClosingCta
        heading={
          <>
            <span className="block">Change how your team</span>
            <span className="block">uses AI at work.</span>
          </>
        }
        buttonLabel="Book a Call"
        href="https://cal.com/elyst-ai/30min"
      />
    </main>
  );
}
