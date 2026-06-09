import { pageMeta } from "@/lib/seo";
import AccelHero from "@/components/accel/AccelHero";
import AccelPaths from "@/components/accel/AccelPaths";
import AccelWhy from "@/components/accel/AccelWhy";
import AccelProof from "@/components/accel/AccelProof";
import AccelCta from "@/components/accel/AccelCta";

export const metadata = pageMeta({
  path: "/learn",
  title: "The Accelerator — Learn AI",
  description:
    "Stay genuinely capable with AI. Live, bilingual AI learning for working professionals across India and the GCC — taught by people who build production AI, and backed by a community that keeps you sharp.",
});

export default function LearnPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <AccelHero />
      <AccelPaths />
      <AccelWhy />
      <AccelProof />
      <AccelCta />
    </main>
  );
}
