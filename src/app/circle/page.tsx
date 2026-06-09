import { pageMeta } from "@/lib/seo";
import CircleHero from "@/components/circle/CircleHero";
import CircleAbout from "@/components/circle/CircleAbout";
import CircleForWho from "@/components/circle/CircleForWho";
import CirclePricing from "@/components/circle/CirclePricing";
import CircleJoin from "@/components/circle/CircleJoin";
import CircleFaq from "@/components/circle/CircleFaq";
import CircleCta from "@/components/circle/CircleCta";

export const metadata = pageMeta({
  path: "/circle",
  title: "The AI Circle for Professionals",
  description:
    "A closed community for professionals applying AI to their real work. Weekly signals, monthly catchups. 25 founding spots only.",
});

export default function CirclePage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <CircleHero />
      <CircleAbout />
      <CircleForWho />
      <CirclePricing />
      {/* <CircleJoin />, How it works, commented out for now */}
      <CircleFaq />
      <CircleCta />
    </main>
  );
}
