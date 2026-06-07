"use client";

import { motion } from "framer-motion";
import {
  Bell,
  FileText,
  Lock,
  MessageSquareText,
  Plug,
  Sparkles,
} from "lucide-react";

/**
 * Mockup visuals below are faithful placeholders in the established product
 * world (Al Noor Trading) — mark for swap with real captures before launch,
 * per references/aios-capabilities/NOTES.md "Screenshots note".
 */

function KnowledgeVisual() {
  return (
    <div className="flex flex-col gap-2.5 px-6 pb-6">
      <div
        className="self-start max-w-[78%] px-3.5 py-2 text-fg-2"
        style={{ background: "var(--surface-muted)", borderRadius: "12px 12px 12px 4px", fontSize: "0.8rem" }}
      >
        What&rsquo;s our refund policy for late deliveries?
      </div>
      <div
        className="self-start max-w-[88%] px-3.5 py-2.5 shadow-sm"
        style={{ background: "#ffffff", borderRadius: "12px 12px 12px 4px", fontSize: "0.8rem", border: "1px solid var(--border)" }}
      >
        Refunds apply within 7 days of a delayed shipment, per the Q3 ops
        policy — full credit, no restocking fee.
        <span className="mt-1.5 block text-emerald" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
          Source: Ops Policy.pdf · p. 4
        </span>
      </div>
    </div>
  );
}

function DocGenVisual() {
  const docs = [
    { label: "Offer letter", rotate: -4 },
    { label: "Invoice", rotate: 0 },
    { label: "Certificate", rotate: 4 },
  ];
  return (
    <div className="relative flex h-[120px] items-center justify-center pb-6">
      {docs.map((d, i) => (
        <div
          key={d.label}
          className="absolute flex h-[96px] w-[74px] flex-col items-center justify-end gap-1.5 rounded-[8px] pb-2.5 shadow-sm"
          style={{
            transform: `translateX(${(i - 1) * 34}px) rotate(${d.rotate}deg)`,
            background: "#ffffff",
            border: "1px solid var(--border)",
            zIndex: i,
          }}
        >
          <FileText className="h-4 w-4 text-emerald" />
          <span className="text-fg-3" style={{ fontSize: "0.6rem" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

type Tile = {
  Icon: typeof Sparkles;
  heading: string;
  sub: string;
  span: "lg" | "sm";
  Visual?: () => React.ReactElement;
  tint?: boolean;
};

const tiles: Tile[] = [
  {
    Icon: MessageSquareText,
    heading: "Instant answers from your own documents",
    sub: "The whole team gets the same correct answer, sourced from what you actually wrote down.",
    span: "lg",
    Visual: KnowledgeVisual,
  },
  {
    Icon: FileText,
    heading: "Offer letters, invoices, certificates — done from one message",
    sub: "Generated as finished PDFs, formatted and consistent every time.",
    span: "lg",
    Visual: DocGenVisual,
  },
  {
    Icon: Bell,
    heading: "Everyone knows what to do each morning",
    sub: "Daily task briefings, sent automatically to the right people.",
    span: "sm",
  },
  {
    Icon: Plug,
    heading: "Works with the tools you already run",
    sub: "Google Workspace, Canva, and the SME tools your team knows.",
    span: "sm",
  },
  {
    Icon: Lock,
    heading: "The right person sees the right thing",
    sub: "Role-based access keeps sensitive data restricted, by default.",
    span: "sm",
  },
];

function ProductTile({ tile, index }: { tile: Tile; index: number }) {
  const { Icon, heading, sub, span, Visual } = tile;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className={`card card-hover flex flex-col overflow-hidden ${
        span === "lg" ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      {Visual && <Visual />}
      <div className={`flex flex-col gap-2 p-6 ${Visual ? "pt-2" : ""} ${span === "lg" ? "mt-auto" : ""}`}>
        <Icon className="h-5 w-5 text-emerald" />
        <h3 className="font-semibold text-fg" style={{ fontSize: span === "lg" ? "var(--text-h3)" : "1.05rem" }}>
          {heading}
        </h3>
        <p className="text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
          {sub}
        </p>
      </div>
    </motion.div>
  );
}

function OpenCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: tiles.length * 0.06, ease: "easeOut" }}
      className="card-tint flex flex-col justify-center gap-2 p-6"
    >
      <Sparkles className="h-5 w-5 text-emerald" />
      <h3 className="font-semibold text-fg" style={{ fontSize: "1.05rem" }}>
        …and whatever else your workflows need.
      </h3>
      <p className="text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
        AIOS is configured to your business — not picked off a shelf.
      </p>
    </motion.div>
  );
}

export default function AiosCapabilities() {
  return (
    <section
      className="bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">What AIOS does</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Not one feature. A system that runs your operations.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-4">
          {tiles.map((tile, i) => (
            <ProductTile key={tile.heading} tile={tile} index={i} />
          ))}
          <OpenCard />
        </div>
      </div>
    </section>
  );
}
