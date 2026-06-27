import { pageMeta } from "@/lib/seo";
import { PRICE } from "@/components/ai-for-work/config";
import Hero from "@/components/ai-for-work/Hero";
import Marquee from "@/components/ai-for-work/Marquee";
import Pain from "@/components/ai-for-work/Pain";
import Transformation from "@/components/ai-for-work/Transformation";
import HowItWorks from "@/components/ai-for-work/HowItWorks";
import Curriculum from "@/components/ai-for-work/Curriculum";
import ValueStack from "@/components/ai-for-work/ValueStack";
import Instructor from "@/components/ai-for-work/Instructor";
import Testimonials from "@/components/ai-for-work/Testimonials";
import Faq from "@/components/ai-for-work/Faq";
import PriceEnrol from "@/components/ai-for-work/PriceEnrol";
import FinalCta from "@/components/ai-for-work/FinalCta";

export const metadata = {
  ...pageMeta({
    path: "/ai-for-work",
    title: "AI for Work: 2-Week Live AI Program",
    description:
      `AI for Work is a 2-week live program by Elyst AI for professionals and founders who want to use AI with confidence in their everyday work. Live classes, live Q&A, free recordings, and a certificate. ${PRICE}.`,
  }),
  title: { absolute: "AI for Work: 2-Week Live AI Program | Elyst AI" },
};

export default function AiForWorkPage() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Marquee />
      <Pain />
      <Transformation />
      <HowItWorks />
      <Curriculum />
      <ValueStack />
      <Instructor />
      <Testimonials />
      <Faq />
      <PriceEnrol />
      <FinalCta />
    </main>
  );
}
