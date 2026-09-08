import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import TrainingPage from "@/components/training/TrainingPage";
import JsonLd from "@/components/seo/JsonLd";
import { trainingFaqs } from "@/lib/training-content";

const TRAINING_DESCRIPTION =
  "Practical, in-person corporate AI training tailored to your team’s work. Available across Kerala, Bengaluru, the UAE, Saudi Arabia and Qatar.";

export const metadata = {
  ...pageMeta({
    path: "/training",
    title: "Corporate AI Training for Teams",
    description: TRAINING_DESCRIPTION,
    image: "/training/opengraph-image",
  }),
  title: { absolute: "Corporate AI Training for Teams | Elyst AI" },
  robots: { index: true, follow: true },
};

export default function TrainingPageRoute() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            path: "/training",
            name: "Corporate AI training for teams",
            description: TRAINING_DESCRIPTION,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Training", path: "/training" },
          ]),
          faqPageSchema(trainingFaqs),
        ]}
      />
      <TrainingPage />
    </>
  );
}
