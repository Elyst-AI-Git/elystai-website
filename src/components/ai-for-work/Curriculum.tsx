"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import {
  IconUnderstand,
  IconMessage,
  IconIntegrations,
  IconDocument,
  IconProgram,
  IconAct,
  IconConfigure,
  IconTile,
  type IconProps,
} from "@/components/ui/icons";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Curriculum — the seven modules on a vertical timeline. The heading sits
 * centred above; below, a centre line runs down the middle and each module
 * alternates side. On touch the line moves to the left and every module stacks
 * on its right, one after another.
 *
 * Spacing between modules lives on the wrapper's `gap`, NOT per-row padding —
 * that keeps each row's geometric centre on the text so the icon tile (centred
 * on the row) lines up with the module name.
 */

type Node = {
  Icon: (props: IconProps) => React.ReactElement;
  label: string;
  desc: string;
};

const nodes: Node[] = [
  { Icon: IconUnderstand, label: "Understanding AI", desc: "Start from zero and finally get what AI is, without the confusing tech talk." },
  { Icon: IconMessage, label: "Prompting Mastery & Context Engineering", desc: "Learn how to talk to AI so it gives you what you want, not random answers." },
  { Icon: IconIntegrations, label: "Tools Work For You", desc: "Build your own AI toolkit, made for the work you do." },
  { Icon: IconDocument, label: "AI Multimedia", desc: "Turn your ideas into visuals in minutes." },
  { Icon: IconProgram, label: "Your Personal AI", desc: "Have your own AI assistant ready whenever you need it." },
  { Icon: IconAct, label: "Meet AI Agents", desc: "See how AI can do tasks on its own, while you focus on the bigger things." },
  { Icon: IconConfigure, label: "Automate Your Work", desc: "Set it up once, and let AI handle the same work again and again." },
];

function TimelineNode({ node, index }: { node: Node; index: number }) {
  const { Icon, label, desc } = node;
  const isLeft = index % 2 === 1; // 0-based: nodes 2,4,6 sit on the left
  const num = String(index + 1).padStart(2, "0");

  const card = (
    <div className={`flex flex-col gap-1 ${isLeft ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
      <span className="eyebrow text-emerald" style={{ fontSize: "0.82rem" }}>
        Module {num}
      </span>
      <h3 className="text-fg" style={{ fontSize: "clamp(1.3rem, 2vw, 1.65rem)", fontWeight: 700, lineHeight: 1.25 }}>
        {label}
      </h3>
      <p className="mt-1 max-w-md text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.55 }}>
        {desc}
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative md:grid md:grid-cols-2 md:items-center md:gap-0"
    >
      {/* Icon tile — left rail on mobile, centred on the line on desktop. */}
      <IconTile
        tone="darkgreen"
        size={40}
        className="absolute left-5 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
      >
        <Icon size={20} variant="line" />
      </IconTile>

      {/* Content cell — clears the rail; sits left or right on desktop. */}
      <div className={isLeft ? "pl-16 md:col-start-1 md:pl-0 md:pr-16" : "pl-16 md:col-start-2 md:pl-16"}>
        {card}
      </div>
    </motion.div>
  );
}

export default function Curriculum() {
  const isTouch = useIsTouch();
  return (
    <section
      id="curriculum"
      className="relative scroll-mt-24 overflow-hidden bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      {/* Dynamic dotted background — the AIOS card dot pattern, made patchy via a
          tiled radial mask (so some dots show, some don't) and slowly drifting.
          Top/bottom white gradients fade it into the light sections above and
          below for a seamless transition. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {isTouch ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(3,98,76,0.22) 1.3px, transparent 1.3px)",
              backgroundSize: "18px 18px",
              WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 62%)",
              maskImage: "radial-gradient(circle, black 30%, transparent 62%)",
              WebkitMaskSize: "90px 90px",
              maskSize: "90px 90px",
            }}
          />
        ) : (
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(3,98,76,0.22) 1.3px, transparent 1.3px)",
              backgroundSize: "18px 18px",
              WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 62%)",
              maskImage: "radial-gradient(circle, black 30%, transparent 62%)",
              WebkitMaskSize: "90px 90px",
              maskSize: "90px 90px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "18px 36px", "0px 0px"],
              maskPosition: ["0px 0px", "45px 30px", "0px 0px"],
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* Fade into the light sections above/below */}
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Centred heading */}
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Curriculum</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Seven modules, step by step.
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            Every session is activity-based, so you practise as you learn.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Track */}
          <span
            aria-hidden
            className="absolute top-3 bottom-3 left-5 w-px -translate-x-1/2 md:left-1/2"
            style={{ background: "var(--border)" }}
          />
          {/* Emerald fill — scroll-reveal (static on touch) */}
          {isTouch ? (
            <span
              aria-hidden
              className="absolute top-3 bottom-3 left-5 w-px -translate-x-1/2 md:left-1/2"
              style={{ background: "var(--elyst-emerald)" }}
            />
          ) : (
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              className="absolute top-3 bottom-3 left-5 w-px -translate-x-1/2 md:left-1/2"
              style={{ background: "var(--elyst-emerald)", transformOrigin: "top" }}
            />
          )}

          <div className="relative flex flex-col gap-16">
            {nodes.map((node, i) => (
              <TimelineNode key={node.label} node={node} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
