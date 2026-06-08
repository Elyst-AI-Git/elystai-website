"use client";

import { FileText, FolderSearch, MessageCircle } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const stepCards = [
  {
    icon: <MessageCircle className="size-5 text-emerald" />,
    title: "Message",
    description: "Message it like a colleague — in the WhatsApp or Telegram your team already uses.",
    date: "Step 1",
    iconClassName: "bg-[var(--green-tint-15)]",
    titleClassName: "text-emerald",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 border-border",
  },
  {
    icon: <FolderSearch className="size-5 text-emerald" />,
    title: "Understands",
    description: "It reads your own documents, data and tools — not the open internet.",
    date: "Step 2",
    iconClassName: "bg-[var(--green-tint-15)]",
    titleClassName: "text-emerald",
    className:
      "[grid-area:stack] translate-x-12 translate-y-12 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0 border-border",
  },
  {
    icon: <FileText className="size-5 text-emerald" />,
    title: "Acts",
    description: "It answers, or delivers the finished document — straight to the right person.",
    date: "Step 3",
    iconClassName: "bg-[var(--green-tint-15)]",
    titleClassName: "text-emerald",
    className:
      "[grid-area:stack] translate-x-24 translate-y-24 hover:translate-y-12 border-border shadow-[var(--shadow-card)]",
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
        <div className="mt-12 flex min-h-[300px] w-full items-center justify-center sm:min-h-[400px] md:mt-20 md:min-h-[440px]">
          <div className="origin-center scale-[0.6] sm:scale-[0.82] md:scale-100">
            <DisplayCards cards={stepCards} />
          </div>
        </div>

        {/* Contrast line — kills the "isn't this just ChatGPT?" doubt */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-fg" style={{ fontSize: "var(--text-body)", fontWeight: 600 }}>
            A generic chatbot doesn&rsquo;t know your business and can&rsquo;t act
            inside it.{" "}
            <span style={{ color: "var(--elyst-emerald)" }}>AIOS does both.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
