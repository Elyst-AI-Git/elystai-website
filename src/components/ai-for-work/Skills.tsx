"use client";

import * as React from "react";
import { SectionMark } from "@/components/ui/section-mark";
import {
  IconMessage,
  IconIntegrations,
  IconDocument,
  IconProgram,
  IconAct,
  IconConfigure,
  type IconProps,
} from "@/components/ui/icons";

/**
 * Skills You Will Learn — the six concrete skills you walk away with. Uses the
 * AIOS card treatment (black/green cards, metal icon tiles, hover lift) in three
 * columns; card heights alternate within each column so the big card zig-zags
 * across the row. Big cards are black, small cards green.
 */

type Item = {
  title: string;
  description: string;
  Icon: (props: IconProps) => React.ReactElement;
};

const items: Item[] = [
  { title: "Master AI Prompts", description: "Turn vague questions into clear instructions AI can follow.", Icon: IconMessage },
  { title: "Work Smarter with AI Tools", description: "Put the best AI tools to use in your daily work.", Icon: IconIntegrations },
  { title: "Make Visuals with AI", description: "Design images, videos and voice without any design skills.", Icon: IconDocument },
  { title: "Build Your Personal AI", description: "Set up an AI that knows your work and helps you daily.", Icon: IconProgram },
  { title: "Work with AI Agents", description: "Hand off jobs and let AI complete them for you.", Icon: IconAct },
  { title: "Put Your Work on Autopilot", description: "Set it up once and let AI run it again and again.", Icon: IconConfigure },
];

// Three columns of two; `big` (the taller, black card) zig-zags top→bottom.
const columns = [
  [0, 1],
  [2, 3],
  [4, 5],
].map((pair, c) => pair.map((idx, pos) => ({ item: items[idx], big: (pos === 0) === (c % 2 === 0) })));

function Card({ item, big }: { item: Item; big: boolean }) {
  const { Icon, title, description } = item;
  return (
    <div
      className="group relative flex flex-col justify-center overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(3,98,76,0.28)] md:p-7"
      style={{ background: big ? "#000000" : "#03543B", minHeight: big ? 300 : 176 }}
    >
      {/* Dotted radial overlay — reveals on hover */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0 bg-[length:5px_5px]"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${
              big ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"
            } 1px, transparent 1px)`,
          }}
        />
      </div>

      <div className="relative flex flex-col gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-md"
          style={
            big
              ? {
                  background: "linear-gradient(180deg, #f8faf9 0%, #dde4e0 55%, #ebefed 100%)",
                  borderTop: "1px solid rgba(255,255,255,0.92)",
                  borderBottom: "1px solid rgba(3,98,76,0.2)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.12)",
                  color: "var(--elyst-emerald)",
                }
              : {
                  background: "linear-gradient(180deg, hsl(160 38% 16%) 0%, hsl(160 38% 9%) 55%, hsl(160 38% 12%) 100%)",
                  borderTop: "1px solid rgba(255,255,255,0.14)",
                  borderBottom: "1px solid rgba(0,0,0,0.4)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.3)",
                  color: "rgba(255,255,255,0.9)",
                }
          }
        >
          <Icon size={22} variant="line" />
        </span>
        <div className="space-y-1.5">
          <h3 className="font-bold tracking-tight text-fg-on-dark" style={{ fontSize: "1.28rem" }}>
            {title}
          </h3>
          <p className="leading-snug text-fg-on-dark/75" style={{ fontSize: "1.05rem" }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Skills you will learn</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            What you&rsquo;ll walk away able to do.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {columns.map((col, c) => (
            <div key={c} className="flex flex-col gap-5">
              {col.map(({ item, big }) => (
                <Card key={item.title} item={item} big={big} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
