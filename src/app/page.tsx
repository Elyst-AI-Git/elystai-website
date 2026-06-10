import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ProofBar from "@/components/home/ProofBar";
import AiosTeaser from "@/components/home/AiosTeaser";
import AcceleratorTeaser from "@/components/home/AcceleratorTeaser";
import Founders from "@/components/home/Founders";
import FinalCta from "@/components/home/FinalCta";

const HOME_TITLE = "Elyst AI | AI System for Businesses & AI Programs for Professionals";
const HOME_DESCRIPTION =
  "Elyst AI builds an AI employee that small business teams use on WhatsApp and runs AI programs and courses for professionals across India and the GCC. No technical background needed for either.";

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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Elyst AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main id="main" className="flex-1 pt-24">
      <Hero />
      <ProofBar />
      <AiosTeaser />
      <AcceleratorTeaser />
      <Founders />
      <FinalCta />
    </main>
  );
}
