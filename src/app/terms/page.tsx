import LegalSkeleton from "@/components/marketing/LegalSkeleton";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/terms",
  title: "Terms",
  description: "Terms for Elyst AI.",
});

export default function Terms() {
  return <LegalSkeleton title="Terms" />;
}
