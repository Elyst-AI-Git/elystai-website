import type { Metadata } from "next";
import AiosHero from "@/components/aios/AiosHero";

export const metadata: Metadata = {
  title: "AIOS for Business — Elyst AI",
  description:
    "AIOS is the operations layer for small teams with no technical staff. Message it like a colleague, in the WhatsApp your team already uses — it answers, drafts, and acts.",
};

export default function AiosPage() {
  return (
    <main id="main" className="flex-1 pt-24">
      <AiosHero />
    </main>
  );
}
