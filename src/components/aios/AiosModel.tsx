"use client";

import * as React from "react";
import { SectionMark } from "@/components/ui/section-mark";
import { motion } from "framer-motion";
import {
  IconDiscovery,
  IconConfigure,
  IconDeploy,
  IconSupport,
  IconTile,
  type IconProps,
} from "@/components/ui/icons";

type Node = {
  Icon: (props: IconProps) => React.ReactElement;
  label: string;
  line: string;
  detail?: string;
};

const nodes: Node[] = [
  {
    Icon: IconDiscovery,
    label: "Discovery",
    line: "We learn your workflows and where the time goes.",
  },
  {
    Icon: IconConfigure,
    label: "Configuration",
    line: "We build AIOS around how you actually work.",
  },
  {
    Icon: IconDeploy,
    label: "Deployment",
    line: "It goes live inside your team's WhatsApp or Telegram.",
  },
  {
    Icon: IconSupport,
    label: "Support",
    line: "We stay on, tuning it as you grow.",
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
      className="relative flex items-center gap-5 pb-16 last:pb-0"
    >
      <IconTile tone="darkgreen" size={40} className="relative z-10 shrink-0">
        <Icon size={20} variant="line" />
      </IconTile>
      <div className="flex flex-col gap-1.5">
        <span className="eyebrow text-emerald" style={{ fontSize: "0.88rem" }}>
          {String(index + 1).padStart(2, "0")} · {label}
        </span>
        <p
          className="text-fg md:whitespace-nowrap"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)", fontWeight: 600, lineHeight: 1.45 }}
        >
          {line}
        </p>
        {detail && (
          <p className="text-fg-3" style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)", lineHeight: 1.5 }}>
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
            <SectionMark>The model</SectionMark>
            <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}>
              You don&rsquo;t set it up. We do.
            </h2>
            <p className="mt-5 max-w-sm text-fg" style={{ fontSize: "clamp(1.25rem, 1.65vw, 1.45rem)", fontWeight: 500, lineHeight: 1.6 }}>
              AIOS isn&rsquo;t software you install and figure out. We learn how your
              business works and build AIOS around it.
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
