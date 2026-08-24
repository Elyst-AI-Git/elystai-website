"use client";

import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";

const problemLines = [
  "You bought AI subscriptions for the team.",
  "But the work output has not changed much.",
  "You are not the problem.",
  "A subscription is not an AI system.",
  "That is the gap we built Elyst AI to close.",
];

export default function ProblemSequence() {
  return (
    <section
      aria-label="The gap between AI subscriptions and changed work"
      className="bg-bg"
      style={{ padding: "clamp(80px, 10vw, 140px) var(--section-px)" }}
    >
      <div className="problem-sequence-gradient mx-auto flex max-w-7xl flex-col items-center text-center">
        {problemLines.map((line) => (
          <TextGradientScroll
            key={line}
            text={line}
            className="problem-sequence-line w-full font-display font-semibold leading-[1.15] tracking-[var(--tracking-display)]"
          />
        ))}
      </div>
    </section>
  );
}
