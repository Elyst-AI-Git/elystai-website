import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { courseSchema } from "@/lib/schema";
import AiJuniorHero from "@/components/ai-junior/AiJuniorHero";
import AiJuniorAbout from "@/components/ai-junior/AiJuniorAbout";
import AiJuniorMedium from "@/components/ai-junior/AiJuniorMedium";
import AiJuniorCurriculum from "@/components/ai-junior/AiJuniorCurriculum";
import AiJuniorParents from "@/components/ai-junior/AiJuniorParents";
import AiJuniorStudents from "@/components/ai-junior/AiJuniorStudents";
import AiJuniorMentor from "@/components/ai-junior/AiJuniorMentor";
import AiJuniorCta from "@/components/ai-junior/AiJuniorCta";
import AiJuniorFaq from "@/components/ai-junior/AiJuniorFaq";

export const metadata = {
  ...pageMeta({
    path: "/juniors",
    title: "AI Program for Students Grades 5–10 | 5-Day Live Course",
    description:
      "A 5-day live AI program where students in Grades 5 to 10 learn to prompt, design, and build real things with AI. No coding or technical background needed.",
  }),
  title: { absolute: "AI Program for Students Grades 5–10 | 5-Day Live Course | Elyst AI" },
};

export default function AiJuniorPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd
        data={courseSchema({
          path: "/juniors",
          name: "AI for Juniors",
          description:
            "A 5-day live AI program for students in Grades 5 to 10. They learn to prompt, design, and build real things with AI, with no technical background needed.",
        })}
      />
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
