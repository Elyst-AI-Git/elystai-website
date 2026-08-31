import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ArvindSessionPage from "@/components/training/ArvindSessionPage";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const DESCRIPTION = "A practical AI session built around the work people do daily.";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/training/arvind-fashions",
    title: "A full day of AI practice at Arvind Fashions",
    description: DESCRIPTION,
  }),
  title: { absolute: "A full day of AI practice at Arvind Fashions | Elyst AI" },
};

export default function ArvindFashionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Training", path: "/training" },
        { name: "Arvind Fashions", path: "/training/arvind-fashions" },
      ])]} />
      <ArvindSessionPage />
    </>
  );
}
