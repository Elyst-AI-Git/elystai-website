import type { Metadata } from "next";
import CircleHero from "@/components/circle/CircleHero";
import CircleAbout from "@/components/circle/CircleAbout";
import CircleForWho from "@/components/circle/CircleForWho";
import CirclePricing from "@/components/circle/CirclePricing";
import CircleJoin from "@/components/circle/CircleJoin";
import CircleFaq from "@/components/circle/CircleFaq";
import CircleCta from "@/components/circle/CircleCta";

export const metadata: Metadata = {
  title: "Elyst AI Circle - Join the AI Circle",
  description:
    "A closed community for professionals applying AI to their real work. Weekly signals, monthly catchups. 25 founding spots only.",
  alternates: { canonical: "https://elystai.com/circle" },
};

export default function CirclePage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <CircleHero />
      <CircleAbout />
      <CircleForWho />
      <CirclePricing />
      <CircleJoin />
      <CircleFaq />
      <CircleCta />
    </main>
  );
}
