"use client";

import { motion } from "framer-motion";
import { Cog, MessagesSquare, Rocket, Search } from "lucide-react";

/**
 * Direction B — vertical timeline (objection-killer: "is this another tool
 * I have to set up and maintain?"). Reframe up top, then four roomy nodes —
 * Discovery → Configuration → Deployment → Training — with an emerald
 * connector that fills in one scroll-reveal pass. No standalone CTA: this
 * flows straight into Pricing, which carries the booking action.
 */

type Node = {
  Icon: typeof Search;
  label: string;
  line: string;
  detail?: string;
};

const nodes: Node[] = [
  {
    Icon: Search,
    label: "Discovery",
    line: "We learn your workflows, documents, and the tools your team already runs.",
  },
  {
    Icon: Cog,
    label: "Configuration",
    line: "We build AIOS around how your business actually works — not the other way round.",
    detail: "Including the Google Workspace / Drive connection, set up for you.",
  },
  {
    Icon: Rocket,
    label: "Deployment",
    line: "It goes live inside the WhatsApp or Telegram your team already has open.",
  },
  {
    Icon: MessagesSquare,
    label: "Training",
    line: "Your team learns to use it — in plain conversation, in under an hour.",
    detail: "Optional add-on: AI-tools training for your team (NotebookLM, Claude Projects).",
  },
];

function TimelineNode({ node, index }: { node: Node; index: number }) {
  const { Icon, label, line, detail } = node;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="relative flex gap-5 pb-16 last:pb-0"
    >
      <span
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{
          background: "var(--bg)",
          border: "2px solid var(--elyst-emerald)",
          color: "var(--elyst-emerald)",
        }}
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="flex flex-col gap-1.5 pt-1.5">
        <span className="eyebrow text-emerald" style={{ fontSize: "0.7rem" }}>
          {String(index + 1).padStart(2, "0")} · {label}
        </span>
        <p className="text-fg" style={{ fontSize: "1.22rem", fontWeight: 600, lineHeight: 1.45 }}>
          {line}
        </p>
        {detail && (
          <p className="text-fg-3" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
            {detail}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function AiosModel() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-16">
          {/* Left — reframe + reassurance */}
          <div className="sm:sticky sm:top-32 sm:self-start">
            <span className="chip">The model</span>
            <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
              You don&rsquo;t set it up. We do.
            </h2>
            <p className="mt-5 max-w-sm text-fg" style={{ fontSize: "var(--text-body)", fontWeight: 500, lineHeight: 1.6 }}>
              Not software you install. A service we run for you — Elyst configures,
              deploys, and supports AIOS directly.
            </p>
            <p className="mt-3 max-w-sm text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.6 }}>
              Your team only needs WhatsApp.
            </p>
          </div>

          {/* Right — vertical timeline */}
          <div className="relative">
            {/* Track — full-height muted line */}
            <span
              aria-hidden
              className="absolute top-[20px] bottom-[20px] left-5 w-px -translate-x-1/2"
              style={{ background: "var(--border)" }}
            />
            {/* Fill — emerald, scroll-reveal in one pass */}
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
              className="absolute top-[20px] bottom-[20px] left-5 w-px -translate-x-1/2"
              style={{ background: "var(--elyst-emerald)", transformOrigin: "top" }}
            />

            <div className="relative">
              {nodes.map((node, i) => (
                <TimelineNode key={node.label} node={node} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
