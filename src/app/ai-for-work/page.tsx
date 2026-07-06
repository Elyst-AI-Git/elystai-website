import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { courseSchema } from "@/lib/schema";
import { PRICE, PRICE_AMOUNT, START_DATE_ISO } from "@/components/ai-for-work/config";
import Hero from "@/components/ai-for-work/Hero";
import Marquee from "@/components/ai-for-work/Marquee";
import Pain from "@/components/ai-for-work/Pain";
import InstructorVideo from "@/components/ai-for-work/InstructorVideo";
import Transformation from "@/components/ai-for-work/Transformation";
import Curriculum from "@/components/ai-for-work/Curriculum";
import ValueStack from "@/components/ai-for-work/ValueStack";
import Instructor from "@/components/ai-for-work/Instructor";
import Testimonials from "@/components/ai-for-work/Testimonials";
import Faq from "@/components/ai-for-work/Faq";
import WebinarStrip from "@/components/ai-for-work/WebinarStrip";
import PriceEnrol from "@/components/ai-for-work/PriceEnrol";
import FinalCta from "@/components/ai-for-work/FinalCta";

export const metadata = {
  ...pageMeta({
    path: "/ai-for-work",
    title: "AI for Work: 2-Week Live AI Program",
    description:
      `AI for Work is a 2-week live program by Elyst AI for professionals and founders who want to use AI with confidence in their everyday work. Live classes, live Q&A, free recordings, and a certificate. ${PRICE}.`,
    image: "/images/og/ai-for-work.png",
  }),
  title: { absolute: "AI for Work by Elyst AI" },
};

export default function AiForWorkPage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={courseSchema({
          path: "/ai-for-work",
          name: "AI for Work",
          description:
            "A 2-week live cohort-based program teaching working professionals, business owners, and freelancers to use AI with confidence in their everyday work.",
          offer: { price: PRICE_AMOUNT, priceCurrency: "INR", startDate: START_DATE_ISO },
        })}
      />
      <Hero />
      <Marquee />
      <Pain />
      <InstructorVideo />
      <Transformation />
      <Curriculum />
      <ValueStack />
      <Instructor />
      <Testimonials />
      <Faq />
      <WebinarStrip />
      <PriceEnrol />
      <FinalCta />
    </main>
  );
}
