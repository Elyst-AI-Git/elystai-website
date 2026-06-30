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
  week: 1 | 2;
};

const nodes: Node[] = [
  { Icon: IconUnderstand, label: "What AI Actually Is", desc: "A clear picture of how AI actually works across tools and where it is today.", week: 1 },
  { Icon: IconMessage, label: "Prompting & Context", desc: "Write prompts that get you the right answer the first time, not the fifth time.", week: 1 },
  { Icon: IconIntegrations, label: "Your AI Toolkit", desc: "Pick the right AI tools for your job and know exactly when to use each one.", week: 1 },
  { Icon: IconDocument, label: "Create With AI", desc: "Make images, video and voice for your work in minutes without prior skills.", week: 1 },
  { Icon: IconProgram, label: "Your Personal AI", desc: "Set up an assistant that already knows your work and is ready on demand.", week: 2 },
  { Icon: IconAct, label: "AI Agents At Work", desc: "Hand multi-step tasks to AI that finishes them while you focus elsewhere.", week: 2 },
  { Icon: IconConfigure, label: "Automate The Repeats", desc: "Build automations once and let the same work run itself, week after week.", week: 2 },
];

function TimelineNode({ node, index }: { node: Node; index: number }) {
  const { Icon, label, desc } = node;
  const isLeft = index % 2 === 1; // 0-based: nodes 2,4,6 sit on the left
  const num = String(index + 1).padStart(2, "0");

  const card = (
    <div className={`flex flex-col gap-1 ${isLeft ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
      <span className="eyebrow text-emerald" style={{ fontSize: "calc(var(--text-label) + 3px)" }}>
        Area {num}
      </span>
      <h3 className="text-fg" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)", fontWeight: 700, lineHeight: 1.25 }}>
        {label}
      </h3>
      <p className="mt-1 max-w-md text-fg-2" style={{ fontSize: "calc(var(--text-small) + 3px)", lineHeight: 1.55 }}>
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
          <SectionMark>What you go through</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Seven curated sections
          </h2>
          <p className="mt-4 text-fg-2" style={{ fontSize: "calc(var(--text-body) + 2px)" }}>
            Every section, picked with purpose
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
            {nodes.map((node, i) => {
              // A week banner sits above the first module of each week, so the
              // two-week arc reads at a glance: 4 modules in Week 1, 3 in Week 2.
              const firstOfWeek = i === 0 || node.week !== nodes[i - 1].week;
              return (
                <React.Fragment key={node.label}>
                  {firstOfWeek && (
                    <div className="relative z-10 flex justify-center">
                      <span
                        className="inline-flex items-center gap-2 rounded-xl border-[3px] px-6 py-2 font-display font-bold uppercase tracking-wide"
                        style={{
                          background: node.week === 1 ? "var(--elyst-emerald)" : "var(--elyst-green)",
                          color: node.week === 1 ? "#ffffff" : "#06140e",
                          borderColor: "#06140e",
                          fontSize: "calc(var(--text-label) + 2px)",
                          boxShadow: "0 6px 18px -8px rgba(3,98,76,0.5)",
                        }}
                      >
                        Week {node.week} · {node.week === 1 ? "Say Hello to Effective AI" : "Let's start automating"}
                      </span>
                    </div>
                  )}
                  <TimelineNode node={node} index={i} />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
