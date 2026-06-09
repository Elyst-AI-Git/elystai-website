"use client";

import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { SectionMark } from "@/components/ui/section-mark";
import {
  IconDocument,
  IconBriefing,
  IconIntegrations,
  IconAnswer,
  IconAccess,
  IconCustom,
} from "@/components/ui/icons";

const items: BentoItem[] = [
  {
    title: "Create assets from one message.",
    description:
      "Offer letters, quotes, invoices, receipts, agreements, generated as finished PDFs from a single instruction.",
    icon: <IconDocument size={22} variant="line" />,
    colSpan: 2,
  },
  {
    title: "Daily briefings and tasks.",
    description: "Everyone gets what they need each morning.",
    icon: <IconBriefing size={22} variant="line" />,
  },
  {
    title: "Works with the tools you run.",
    description: "Plug into Docs, Sheets, Drive, Canva, Notion, Microsoft etc.",
    icon: <IconIntegrations size={22} variant="line" />,
  },
  {
    title: "Answers from your own documents.",
    description:
      "Ask anything about your business. It replies from your files, not guesses.",
    icon: <IconAnswer size={22} variant="line" />,
    colSpan: 2,
  },
  {
    title: "The right person sees the right thing.",
    description: "Role-based access, so the team see what they should and nothing they shouldn't.",
    icon: <IconAccess size={22} variant="line" />,
    colSpan: 2,
  },
  {
    title: "…and whatever your work needs.",
    description: "Configured to your workflows, not a generic fixed template.",
    icon: <IconCustom size={22} variant="line" />,
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
          <SectionMark>What AIOS does</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Not one feature.
            <br />
            <span className="md:whitespace-nowrap">
              A system that{" "}
              <span style={{ color: "var(--elyst-emerald)" }}>runs</span>
              {" "}your operations.
            </span>
          </h2>
        </div>

        <div className="mt-14">
          <BentoGrid items={items} />
        </div>
      </div>
    </section>
  );
}
