import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import TrainingPage from "@/components/marketing/TrainingPage";
import JsonLd from "@/components/seo/JsonLd";

const TRAINING_DESCRIPTION =
  "Role specific AI training for businesses and institutions, built around real work.";

export const metadata = {
  ...pageMeta({
    path: "/training",
    title: "AI Training Built Around Your Team's Actual Work",
    description: TRAINING_DESCRIPTION,
  }),
  title: { absolute: "AI Training Built Around Your Team's Actual Work | Elyst AI" },
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
