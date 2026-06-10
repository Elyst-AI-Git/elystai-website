import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { courseSchema } from "@/lib/schema";
import AccelHero from "@/components/accel/AccelHero";
import AccelPaths from "@/components/accel/AccelPaths";
import AccelWhy from "@/components/accel/AccelWhy";
import AccelProof from "@/components/accel/AccelProof";
import AccelCta from "@/components/accel/AccelCta";

export const metadata = {
  ...pageMeta({
    path: "/learn",
    title: "AI Programs for Professionals | India & GCC",
    description:
      "AI programs and courses for working professionals across India and the GCC. Taught by practitioners who build AI for real businesses, backed by a community that keeps you current.",
  }),
  title: { absolute: "AI Programs for Professionals | India & GCC | Elyst AI" },
};

export default function LearnPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <JsonLd
        data={courseSchema({
          path: "/learn",
          name: "The Elyst AI Accelerator",
          description:
            "Live, bilingual AI training for working professionals across India and the GCC, taught by people who build AI for real businesses.",
        })}
      />
      <AccelHero />
      <AccelPaths />
      <AccelWhy />
      <AccelProof />
      <AccelCta />
    </main>
  );
}
