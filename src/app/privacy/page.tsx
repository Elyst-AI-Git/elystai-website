import LegalSkeleton from "@/components/marketing/LegalSkeleton";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/privacy",
  title: "Privacy",
  description: "Privacy information for Elyst AI.",
});

export default function Privacy() {
  return <LegalSkeleton title="Privacy" />;
}
