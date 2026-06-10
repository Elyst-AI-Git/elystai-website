"use client";

import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import { useIsTouch } from "@/lib/use-touch";

/**
 * The page's ONE deliberate dark contrast section. Three "chaos artifacts,"
 * one per pain, on --surface-dark. Chat-style bubbles for Pain 1, stacked
 * doc thumbnails for Pain 2, empty checklist for Pain 3.
 */

const muted = "var(--fg-muted-dark)";
const panelBg = "var(--surface-dark-2)";
const lineBg = "rgba(240, 250, 248, 0.1)";

/** Pain 1 — knowledge trapped in a few heads: left/right chat bubbles. */
function KnowledgeArtifact() {
  const messages = [
    { text: "Who has the vendor list?", side: "right" as const },
    { text: "Ask Rahul", side: "left" as const },
    { text: "He's on leave today", side: "right" as const },
  ];
  return (
    <div
      className="flex flex-col justify-center gap-2.5 rounded-[10px] px-3.5 py-4"
      style={{
        height: "148px",
        background: panelBg,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {messages.map((m) => (
        <div
          key={m.text}
          className={`flex ${m.side === "right" ? "justify-end" : "justify-start"}`}
        >
          <div
            className="rounded-[9px] px-3 py-1.5"
            style={{
              background:
                m.text === "Ask Rahul"
                  ? "rgba(3,98,76,0.18)"
                  : m.side === "right"
                  ? "rgba(0,223,130,0.15)"
                  : "rgba(255,255,255,0.09)",
              color:
                m.text === "Ask Rahul"
                  ? "rgba(200,255,235,0.65)"
                  : m.side === "right"
                  ? "rgba(200,255,235,0.85)"
                  : "rgba(240,250,248,0.55)",
              fontSize: "0.88rem",
              maxWidth: "80%",
              border:
                m.text === "Ask Rahul"
                  ? "1px solid rgba(0,223,130,0.10)"
                  : m.side === "right"
                  ? "1px solid rgba(0,223,130,0.12)"
                  : "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Pain 2 — documents made by hand: misaligned, inconsistent thumbnails. */
function DocumentsArtifact() {
  const docs = [
    { rotate: -3, dashed: false },
    { rotate: 2, dashed: false },
    { rotate: -1, dashed: true },
  ];
  return (
    <div className="relative flex items-center justify-center" style={{ height: "148px" }}>
      {docs.map((d, i) => (
        <div
          key={i}
          className="absolute h-[104px] w-[78px] rounded-[8px] p-2.5"
          style={{
            transform: `translateX(${(i - 1) * 30}px) rotate(${d.rotate}deg)`,
            background: panelBg,
            border: d.dashed
              ? "1px dashed rgba(255,255,255,0.16)"
              : "1px solid rgba(255,255,255,0.06)",
            zIndex: i,
          }}
        >
          <span className="block h-1.5 w-[60%] rounded-full" style={{ background: lineBg }} />
          <span className="mt-2 block h-1 w-full rounded-full" style={{ background: lineBg }} />
          <span className="mt-1.5 block h-1 w-[80%] rounded-full" style={{ background: lineBg }} />
          <span
            className="mt-1.5 block h-1 w-[65%] rounded-full"
            style={{ background: lineBg, opacity: d.dashed ? 0.3 : 1 }}
          />
        </div>
      ))}
    </div>
  );
}

/** Pain 3 — no plan each morning: an empty, unstarted checklist. */
function MorningArtifact() {
  return (
    <div
      className="flex flex-col justify-center gap-3 rounded-[10px] px-5"
      style={{
        height: "148px",
        background: panelBg,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {[0.92, 0.7, 0.8].map((w, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded-[4px]"
            style={{ border: "1px solid rgba(255,255,255,0.18)" }}
          />
          <span
            className="block h-1.5 rounded-full"
            style={{ width: `${w * 100}%`, background: lineBg }}
          />
        </div>
      ))}
    </div>
  );
}

const pains = [
  {
    Artifact: KnowledgeArtifact,
    line: "Everyone waits for their team leads.",
  },
  {
    Artifact: DocumentsArtifact,
    line: "Documents still get typed out by hand.",
  },
  {
    Artifact: MorningArtifact,
    line: "Mornings start with “What am I doing today?”",
  },
];

const offsets = ["", "", ""];

export default function AiosProblem() {
  const isTouch = useIsTouch();

  return (
    <section
      className="bg-surface-dark"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionMark tone="dark">The problem</SectionMark>
          <h2
            className="mt-6 text-fg-on-dark"
            style={{ fontSize: "var(--text-h2)" }}
          >
            <span className="block">Your team has top talent.</span>
            <span className="block md:whitespace-nowrap">
              Then why does work still take time?
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {pains.map(({ Artifact, line }, i) => {
            const content = (
              <>
                <Artifact />
                <p
                  className="max-w-[26ch]"
                  style={{
                    color: muted,
                    fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {line}
                </p>
              </>
            );
            // On touch, skip the whileInView fade/slide entirely — render
            // the finished widgets immediately, fully static.
            if (isTouch) {
              return (
                <div key={line} className={`flex flex-col gap-5 ${offsets[i]}`}>
                  {content}
                </div>
              );
            }
            return (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className={`flex flex-col gap-5 ${offsets[i]}`}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
