import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ArvindSessionPage from "@/components/training/ArvindSessionPage";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const DESCRIPTION = "A practical AI session built around the work people do daily.";
const PATH = "/training/arvind-fashions";
const TITLE = "A full day of AI practice at Arvind Fashions";

export const metadata: Metadata = {
  ...pageMeta({
    path: PATH,
    title: TITLE,
    description: DESCRIPTION,
  }),
  title: { absolute: `${TITLE} | Elyst AI` },
};

export default function ArvindFashionsPage() {
  return (
    <>
      <JsonLd
        data={[
          creativeWorkSchema({ path: PATH, name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Training", path: "/training" },
            { name: "Arvind Fashions", path: PATH },
          ]),
        ]}
      />
      <ArvindSessionPage />
    </>
  );
}
