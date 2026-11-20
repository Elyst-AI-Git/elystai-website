import { ogImage, pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, kickstartCourseSchema, serviceSchema, webPageSchema } from "@/lib/schema";
import TrainingPage from "@/components/training/TrainingPage";
import JsonLd from "@/components/seo/JsonLd";
import { trainingFaqs } from "@/lib/training-content";

const TRAINING_DESCRIPTION =
  "Hands-on AI training built on your team's own work. One day or two half days, in person in Kerala, Bengaluru and the UAE, or online.";

export const metadata = {
  ...pageMeta({
    path: "/kickstart",
    title: "AI Kickstart: Corporate AI Training for Teams",
    description: TRAINING_DESCRIPTION,
    image: ogImage("kickstart", "/kickstart/opengraph-image"),
  }),
  title: { absolute: "AI Kickstart: Corporate AI Training for Teams | Elyst AI" },
  robots: { index: true, follow: true },
};

export default function TrainingPageRoute() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/kickstart", name: "AI Kickstart: Corporate AI Training for Teams", description: TRAINING_DESCRIPTION }),
          kickstartCourseSchema(TRAINING_DESCRIPTION),
          serviceSchema({
            path: "/kickstart",
            name: "AI Kickstart: corporate AI training for teams",
            description: TRAINING_DESCRIPTION,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "AI Kickstart", path: "/kickstart" },
          ]),
          faqPageSchema(trainingFaqs, "/kickstart"),
        ]}
      />
      <TrainingPage />
    </>
  );
}
