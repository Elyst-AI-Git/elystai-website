import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import ArvindSessionPage from "@/components/training/ArvindSessionPage";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

const DESCRIPTION = "A practical AI training session snapshot for Arvind Fashions, built around real work.";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/training/arvind-fashions",
    title: "Arvind Fashions AI Training Session",
    description: DESCRIPTION,
  }),
  title: { absolute: "Arvind Fashions AI Training Session | Elyst AI" },
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
