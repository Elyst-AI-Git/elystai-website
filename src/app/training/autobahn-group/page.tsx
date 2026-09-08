import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import AutobahnSessionPage from "@/components/training/AutobahnSessionPage";
import { breadcrumbSchema, creativeWorkSchema, faqPageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { autobahnFaqs } from "@/lib/training-content";

const DESCRIPTION = "How Elyst AI delivered a tailored, full-day corporate AI training programme for 40 HR professionals at Autobahn Group in Kochi.";
const PATH = "/training/autobahn-group";
const TITLE = "Corporate AI Training for Autobahn Group";

export const metadata: Metadata = {
  ...pageMeta({
    path: PATH,
    title: TITLE,
    description: DESCRIPTION,
  }),
  title: { absolute: `${TITLE} | Elyst AI` },
  robots: { index: true, follow: true },
};

export default function AutobahnGroupPage() {
  return (
    <>
      <JsonLd
        data={[
          creativeWorkSchema({ path: PATH, name: TITLE, description: DESCRIPTION }),
          faqPageSchema(autobahnFaqs, PATH),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Training", path: "/training" },
            { name: "Autobahn Group", path: PATH },
          ]),
        ]}
      />
      <AutobahnSessionPage />
    </>
  );
}
