import { pageMeta } from "@/lib/seo";
import WaitlistHero from "@/components/waitlist/WaitlistHero";

export const metadata = {
  ...pageMeta({
    path: "/waitlist",
    title: "AI for Work — Join the Waitlist",
    description:
      "AI for Work is the deep-dive AI program for working professionals across India and the GCC. Join the waitlist to be notified the moment it launches.",
  }),
  title: { absolute: "AI for Work — Join the Waitlist | Elyst AI" },
};

export default function WaitlistPage() {
  return (
    <main id="main" className="flex-1">
      <WaitlistHero />
    </main>
  );
}
