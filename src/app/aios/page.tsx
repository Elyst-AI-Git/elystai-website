import { pageMeta } from "@/lib/seo";
import AiosHero from "@/components/aios/AiosHero";
import AiosProblem from "@/components/aios/AiosProblem";
import AiosHowItWorks from "@/components/aios/AiosHowItWorks";
import AiosCapabilities from "@/components/aios/AiosCapabilities";
import AiosUseCases from "@/components/aios/AiosUseCases";
import AiosModel from "@/components/aios/AiosModel";
import AiosPricing from "@/components/aios/AiosPricing";
import AiosFaq from "@/components/aios/AiosFaq";
import AiosCta from "@/components/aios/AiosCta";

export const metadata = pageMeta({
  path: "/aios",
  title: "AIOS for Business",
  description:
    "AIOS is the operations layer for small teams with no technical staff. Message it like a colleague, in the WhatsApp your team already uses — it answers, drafts, and acts.",
});

export default function AiosPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <AiosHero />
      <AiosProblem />
      <AiosHowItWorks />
      <AiosCapabilities />
      <AiosUseCases />
      <AiosModel />
      <AiosPricing />
      <AiosFaq />
      <AiosCta />
    </main>
  );
}
