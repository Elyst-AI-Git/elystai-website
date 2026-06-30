import { pageMeta } from "@/lib/seo";
import AiosHero from "@/components/aios/AiosHero";
import AiosProblem from "@/components/aios/AiosProblem";
import AiosHowItWorks from "@/components/aios/AiosHowItWorks";
import AiosCapabilities from "@/components/aios/AiosCapabilities";
// Temporarily hidden — "Build for your industry" section. Bring back later.
// import AiosUseCases from "@/components/aios/AiosUseCases";
import AiosModel from "@/components/aios/AiosModel";
import AiosPricing from "@/components/aios/AiosPricing";
import AiosFaq from "@/components/aios/AiosFaq";
import AiosCta from "@/components/aios/AiosCta";

export const metadata = {
  ...pageMeta({
    path: "/aios",
    title: "AI Employee for Businesses",
    description:
      "AIOS works on the WhatsApp your team already uses. It answers questions, drafts documents, and handles tasks, with no technical staff, no new software, and no setup learning curve.",
  }),
  title: { absolute: "AI Employee for Businesses | Elyst AI" },
};

export default function AiosPage() {
  return (
    <main id="main" className="aios-sharp flex-1 pt-24">
      <AiosHero />
      <AiosProblem />
      <AiosHowItWorks />
      <AiosCapabilities />
      {/* <AiosUseCases /> — "Build for your industry", temporarily hidden */}
      <AiosModel />
      <AiosPricing />
      <AiosFaq />
      <AiosCta />
    </main>
  );
}
