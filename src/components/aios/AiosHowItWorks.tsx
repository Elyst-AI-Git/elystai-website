"use client";

import { FileText, FolderSearch, MessageCircle } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const stepCards = [
  {
    icon: <MessageCircle className="size-6 text-emerald" />,
    title: "Message",
    description: "Message it like a colleague — in the WhatsApp or Telegram your team already uses.",
    date: "Step 1",
    iconClassName: "bg-[var(--green-tint-15)]",
    titleClassName: "text-emerald",
    className:
      "[grid-area:stack] hover:-translate-y-16 hover:scale-[1.08] hover:z-30 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 border-border",
  },
  {
    icon: <FolderSearch className="size-6 text-emerald" />,
    title: "Understands",
    description: "It reads your own documents, data and tools — not the open internet.",
    date: "Step 2",
    iconClassName: "bg-[var(--green-tint-15)]",
    titleClassName: "text-emerald",
    className:
      "[grid-area:stack] translate-x-14 translate-y-14 hover:-translate-y-2 hover:scale-[1.08] hover:z-30 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 border-border",
  },
  {
    icon: <FileText className="size-6 text-emerald" />,
    title: "Acts",
    description: "It answers, or delivers the finished document — straight to the right person.",
    date: "Step 3",
    iconClassName: "bg-[var(--green-tint-15)]",
    titleClassName: "text-emerald",
    className:
      "[grid-area:stack] translate-x-28 translate-y-28 hover:translate-y-6 hover:scale-[1.08] hover:z-30 border-border shadow-[var(--shadow-card)]",
  },
];

export default function AiosHowItWorks() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">How AIOS works</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            One message. It knows what to do.
          </h2>
        </div>

        {/* Stacked display cards — hover any card to bring it forward.
            Scaled down on narrow screens so the offset deck stays on-canvas. */}
        <div className="mt-2 flex min-h-[340px] w-full items-center justify-center sm:min-h-[440px] md:mt-6 md:min-h-[520px]">
          <div className="origin-center scale-[0.52] sm:scale-[0.74] md:scale-100">
            <DisplayCards cards={stepCards} />
          </div>
        </div>

        {/* Contrast line — kills the "isn't this just ChatGPT?" doubt */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-fg" style={{ fontSize: "var(--text-body)", fontWeight: 600 }}>
            A generic chatbot doesn&rsquo;t know your business and can&rsquo;t act
            inside it.
            <br />
            <span style={{ color: "var(--elyst-emerald)" }}>AIOS does both.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
