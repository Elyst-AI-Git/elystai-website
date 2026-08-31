import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import TrainingPage from "@/components/training/TrainingPage";
import JsonLd from "@/components/seo/JsonLd";

const TRAINING_DESCRIPTION =
  "Role-specific AI training for companies and institutions, designed around approved tools, real work, human review, and practical follow-through.";

export const metadata = {
  ...pageMeta({
    path: "/training",
    title: "AI Training Built Around Your Team's Work",
    description: TRAINING_DESCRIPTION,
  }),
  title: { absolute: "AI Training Built Around Your Team's Work | Elyst AI" },
  robots: { index: true, follow: true },
};

export default function TrainingPageRoute() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            path: "/training",
            name: "AI training built around your team's actual work",
            description: TRAINING_DESCRIPTION,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Training", path: "/training" },
          ]),
        ]}
      />
      <TrainingPage />
    </>
  );
}
