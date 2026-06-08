"use client";

import { Typewriter } from "@/components/ui/typewriter";

/**
 * Global pre-footer band — the site's last impression, sitting directly on top
 * of the footer on every page. One striking line: the constant "Making AI"
 * with a brand-green typewriter cycling through what Elyst is really for.
 *
 * Kept on the light brand surface so it flows straight into the footer's
 * gradient down to the dark wordmark.
 */

const PHRASES = [
  "genuinely useful.",
  "worth your time.",
  "work for everyone.",
];

export default function PreFooter() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "clamp(36px, 5.5vw, 75px) var(--section-px)" }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2
          className="text-fg"
          style={{
            fontSize: "clamp(1.5rem, 3.75vw, 3rem)",
            lineHeight: 1.12,
            fontWeight: 700,
          }}
        >
          Making AI{" "}
          <Typewriter
            text={PHRASES}
            speed={55}
            deleteSpeed={28}
            waitTime={2200}
            className="text-emerald"
            cursorClassName="ml-0.5 text-green"
          />
        </h2>
      </div>
    </section>
  );
}
