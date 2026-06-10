"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  IconBuild,
  IconFocus,
  IconCommunity,
  IconPromise,
  IconTile,
  type IconProps,
} from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { SectionMark } from "./SectionMark";
import { useIsTouch } from "@/lib/use-touch";

/**
 * Why learn with Elyst — the differentiator. Four warm value blocks, all
 * framed in the brand's gradient-edge card, closing on the agency-proof card:
 * what AIOS (our Services arm) builds and experiments with daily, distilled
 * into what's actually useful to know in this AI era. Replaces the prior
 * founder-story block — same credibility, sharper and more concrete.
 *
 * Corner texture borrowed from the 21st.dev "grid-feature-cards" block — a
 * faint blueprint grid with a few randomly "lit" cells, masked to fade from
 * the top-left corner — recoloured to brand emerald so each card reads as a
 * small architectural diagram rather than a flat panel. The "lit" cells are
 * derived deterministically from the card's index (not Math.random) so SSR
 * and the client always agree and the pattern stays stable across renders.
 */

function seededPattern(seed: number): [number, number][] {
  return Array.from({ length: 5 }, (_, i) => [
    ((seed * 13 + i * 7) % 4) + 7,
    ((seed * 17 + i * 11) % 6) + 1,
  ]);
}

function CardGridTexture({ seed }: { seed: number }) {
  const patternId = React.useId();
  const cells = seededPattern(seed);
  const cell = 22;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -ml-16 [mask-image:radial-gradient(farthest-side_at_top_left,white,transparent_75%)]"
    >
      <svg className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id={patternId} width={cell} height={cell} patternUnits="userSpaceOnUse" x="-12" y="4">
            <path
              d={`M.5 ${cell}V.5H${cell}`}
              fill="none"
              stroke="var(--elyst-emerald)"
              strokeOpacity={0.3}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
        <svg x="-12" y="4" className="overflow-visible">
          {cells.map(([cx, cy], i) => (
            <rect
              key={i}
              strokeWidth={0}
              width={cell + 1}
              height={cell + 1}
              x={cx * cell}
              y={cy * cell}
              fill="var(--elyst-emerald)"
              fillOpacity={0.16}
            />
          ))}
        </svg>
      </svg>
    </div>
  );
}

const reasons: {
  Icon: (props: IconProps) => React.ReactElement;
  title: string;
  line: string;
}[] = [
  {
    Icon: IconBuild,
    title: "Taught by people who build it.",
    line: "Our AI agency builds AI. You learn what actually works, not what sounds good for a course.",
  },
  {
    Icon: IconFocus,
    title: "Not your typical AI course.",
    line: "Others flex the number of AI tools they cover. We cover what helps you become AI native.",
  },
  {
    Icon: IconCommunity,
    title: "Backed by a community.",
    line: "Learning doesn't stop when the session ends. The Circle keeps you sharp between them.",
  },
];

export default function AccelWhy() {
  // On touch, skip the whileInView fade/slide on these 4 cards — render
  // them finished/static immediately, same pattern as AiosProblem.
  const isTouch = useIsTouch();
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Why Elyst AI</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Learn AI from people
            <br />
            who actually built it.
          </h2>
        </div>

        {/* Three value blocks + the agency-proof card, all gradient-framed */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {reasons.map(({ Icon, title, line }, i) => {
            const card = (
              <Card
                variant="gradient"
                className="h-full p-7"
                style={{
                  borderRadius: "var(--radius-card, 20px)",
                  background: "var(--card)",
                  border: "1px solid var(--green-tint-15)",
                }}
              >
                <CardGridTexture seed={i} />
                <IconTile tone="darkgreen" className="relative z-10">
                  <Icon size={22} variant="duotone" />
                </IconTile>
                <h3 className="relative z-10 mt-5 text-fg" style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)", fontWeight: 700 }}>
                  {title}
                </h3>
                <p className="relative z-10 mt-2 leading-relaxed text-fg-2" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.15rem)" }}>{line}</p>
              </Card>
            );
            if (isTouch) return <div key={title}>{card}</div>;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              >
                {card}
              </motion.div>
            );
          })}

          {/* Agency-proof card — replaces the prior founder-story block.
              What AIOS (our Services arm) builds and experiments with daily,
              distilled into what's actually useful for you to know right now. */}
          {(() => {
            const card = (
              <Card
                variant="gradient"
                className="h-full p-7"
                style={{
                  borderRadius: "var(--radius-card, 20px)",
                  background:
                    "linear-gradient(135deg, var(--green-tint-15), var(--emerald-tint-10))",
                  border: "1px solid var(--green-tint-15)",
                }}
              >
                <CardGridTexture seed={reasons.length} />
                <IconTile tone="darkgreen" className="relative z-10">
                  <IconPromise size={22} variant="duotone" />
                </IconTile>
                <h3 className="relative z-10 mt-5 text-fg" style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)", fontWeight: 700 }}>
                  Our promise.
                </h3>
                <p className="relative z-10 mt-2 leading-relaxed text-fg-2" style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.15rem)" }}>
                  We don&rsquo;t do hundreds of courses in various domains. We do
                  one domain, that&rsquo;s AI.
                </p>
              </Card>
            );
            if (isTouch) return <div>{card}</div>;
            return (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: reasons.length * 0.08, ease: "easeOut" }}
              >
                {card}
              </motion.div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
