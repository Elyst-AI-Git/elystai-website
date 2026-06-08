"use client";

import {
  Bell,
  FileText,
  Lock,
  MessageSquareText,
  Plug,
  Sparkles,
} from "lucide-react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const items: BentoItem[] = [
  {
    title: "Instant answers from your documents",
    meta: "Knowledge",
    description:
      "The whole team gets the same correct answer, sourced from what you actually wrote down.",
    icon: <MessageSquareText className="h-5 w-5 text-green" />,
    status: "Live",
    tags: ["Knowledge", "Search"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Documents done from one message",
    meta: "Generate",
    description:
      "Offer letters, invoices and certificates — finished PDFs, formatted and consistent every time.",
    icon: <FileText className="h-5 w-5 text-green" />,
    status: "Live",
    tags: ["PDFs", "Templates"],
  },
  {
    title: "Everyone knows what to do each morning",
    meta: "Briefings",
    description: "Daily task briefings, sent automatically to the right people.",
    icon: <Bell className="h-5 w-5 text-green" />,
    tags: ["Automation"],
  },
  {
    title: "Works with the tools you already run",
    meta: "Integrations",
    description: "Google Workspace, Canva, and the SME tools your team knows.",
    icon: <Plug className="h-5 w-5 text-green" />,
    tags: ["Workspace", "Canva"],
    colSpan: 2,
  },
  {
    title: "The right person sees the right thing",
    meta: "Access",
    description: "Role-based access keeps sensitive data restricted, by default.",
    icon: <Lock className="h-5 w-5 text-green" />,
    status: "Secure",
    tags: ["Roles"],
    colSpan: 2,
  },
  {
    title: "…and whatever else your workflows need",
    meta: "Custom",
    description: "AIOS is configured to your business — not picked off a shelf.",
    icon: <Sparkles className="h-5 w-5 text-green" />,
    tags: ["Bespoke"],
  },
];

export default function AiosCapabilities() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">What AIOS does</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Not one feature. A system that runs your operations.
          </h2>
        </div>

        <div className="mt-14">
          <BentoGrid items={items} />
        </div>
      </div>
    </section>
  );
}
