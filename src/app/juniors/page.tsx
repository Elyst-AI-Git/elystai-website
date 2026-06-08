import type { Metadata } from "next";
import AiJuniorHero from "@/components/ai-junior/AiJuniorHero";
import AiJuniorAbout from "@/components/ai-junior/AiJuniorAbout";
import AiJuniorMedium from "@/components/ai-junior/AiJuniorMedium";
import AiJuniorCurriculum from "@/components/ai-junior/AiJuniorCurriculum";
import AiJuniorParents from "@/components/ai-junior/AiJuniorParents";
import AiJuniorStudents from "@/components/ai-junior/AiJuniorStudents";
import AiJuniorMentor from "@/components/ai-junior/AiJuniorMentor";
import AiJuniorCta from "@/components/ai-junior/AiJuniorCta";
import AiJuniorFaq from "@/components/ai-junior/AiJuniorFaq";

export const metadata: Metadata = {
  title: "AI for Juniors - Elyst AI",
  description:
    "A 5-day live AI program for students in Grades 5–10. Your child will learn to prompt, design, and build real things with AI — no technical background required.",
  alternates: { canonical: "https://elystai.com/juniors" },
};

export default function AiJuniorPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <AiJuniorHero />
      <AiJuniorAbout />
      <AiJuniorMedium />
      <AiJuniorCurriculum />
      <AiJuniorParents />
      <AiJuniorStudents />
      <AiJuniorMentor />
      <AiJuniorCta />
      <AiJuniorFaq />
    </main>
  );
}
