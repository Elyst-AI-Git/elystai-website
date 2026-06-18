import { pageMeta } from "@/lib/seo";
import Hero from "@/components/ai-for-work/Hero";
import WhoItsFor from "@/components/ai-for-work/WhoItsFor";
import Curriculum from "@/components/ai-for-work/Curriculum";
import Format from "@/components/ai-for-work/Format";
import Instructor from "@/components/ai-for-work/Instructor";
import PriceEnrol from "@/components/ai-for-work/PriceEnrol";
import Faq from "@/components/ai-for-work/Faq";

export const metadata = {
  ...pageMeta({
    path: "/ai-for-work",
    title: "AI for Work — 2-Week Live AI Program",
    description:
      "AI for Work is a 2-week live program by Elyst AI for practitioners and founders who want to actually use AI — no tech background needed. 7 live sessions, recordings, certificate. ₹2,900.",
  }),
  title: { absolute: "AI for Work — 2-Week Live AI Program | Elyst AI" },
};

export default function AiForWorkPage() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <WhoItsFor />
      <Curriculum />
      <Format />
      <Instructor />
      <PriceEnrol />
      <Faq />
    </main>
  );
}
