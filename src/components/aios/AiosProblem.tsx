"use client";

import { motion } from "framer-motion";

/**
 * The page's ONE deliberate dark contrast section (committed — see
 * references/aios-problem/NOTES.md). Three "chaos artifacts," one per pain,
 * rendered as quiet, muted panels on --surface-dark. No emerald here — the
 * darkness itself carries the section; the snap back to light afterwards is
 * the point. Kept deliberately spare: few elements, lots of negative space,
 * one consistent panel treatment so it reads as restraint, not collage.
 */

const muted = "var(--fg-muted-dark)";
const panelBg = "var(--surface-dark-2)";
const lineBg = "rgba(240, 250, 248, 0.1)";

/** Pain 1 — knowledge trapped in a few heads: forwarded-question fragments. */
function KnowledgeArtifact() {
  const fragments = [
    { text: "Who has the vendor list?", dim: false },
    { text: "Ask Rahul", dim: true },
    { text: "He's on leave today", dim: true },
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {fragments.map((f, i) => (
        <div
          key={f.text}
          className="self-start rounded-[10px] px-3.5 py-2"
          style={{
            marginLeft: `${i * 18}px`,
            background: panelBg,
            color: f.dim ? muted : "var(--fg-on-dark)",
            opacity: f.dim ? 0.6 : 0.92,
            fontSize: "0.8rem",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {f.text}
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
    <div className="relative flex h-[132px] items-center justify-center">
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
          <span
            className="block h-1.5 w-[60%] rounded-full"
            style={{ background: lineBg }}
          />
          <span
            className="mt-2 block h-1 w-full rounded-full"
            style={{ background: lineBg }}
          />
          <span
            className="mt-1.5 block h-1 w-[80%] rounded-full"
            style={{ background: lineBg }}
          />
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
      className="flex h-[132px] flex-col justify-center gap-3 rounded-[10px] px-5"
      style={{ background: panelBg, border: "1px solid rgba(255,255,255,0.05)" }}
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
    line: "Everything waits on the one or two people who know how it works.",
  },
  {
    Artifact: DocumentsArtifact,
    line: "Offer letters, invoices, certificates — built by hand, slowly.",
  },
  {
    Artifact: MorningArtifact,
    line: "Each day starts without a plan, until someone gets chased.",
  },
];

const offsets = ["sm:translate-y-0", "sm:translate-y-6", "sm:-translate-y-2"];

export default function AiosProblem() {
  return (
    <section
      className="bg-surface-dark"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-fg-muted-dark">Sound familiar?</span>
          <h2
            className="mt-4 text-fg-on-dark"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Your team isn&rsquo;t slow. Everything just waits on a few people.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {pains.map(({ Artifact, line }, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className={`flex flex-col gap-5 ${offsets[i]}`}
            >
              <Artifact />
              <p
                className="max-w-[26ch]"
                style={{ color: muted, fontSize: "var(--text-small)", lineHeight: 1.5 }}
              >
                {line}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
