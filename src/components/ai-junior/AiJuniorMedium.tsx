"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const tiles = [
  {
    span: "lg",
    img: "/images/ai-junior/junior-design.png",
    alt: "AI Video Generation",
    tag: "VIDEO",
    tagBg: "#01d2ff",
    tagFg: "#04293a",
    title: "AI Video Generation",
    desc: "Create stunning AI-generated videos and animations effortlessly.",
  },
  {
    span: "sm",
    img: "/images/ai-junior/junior-video-gen.png",
    alt: "AI Prompting",
    tag: "AI PROMPTING",
    tagBg: "var(--elyst-green)",
    tagFg: "var(--elyst-emerald)",
    title: "AI Prompting",
    desc: "Learn how to talk to AI effectively — craft prompts that get real, useful results every time.",
  },
  {
    span: "sm",
    img: "/images/ai-junior/junior-prompting.png",
    alt: "Creating Poster",
    tag: "DESIGN",
    tagBg: "var(--elyst-green)",
    tagFg: "var(--elyst-emerald)",
    title: "Creating Poster",
    desc: "Design eye-catching posters using AI image tools in minutes.",
  },
  {
    span: "lg",
    img: "/images/ai-junior/junior-website.png",
    alt: "Website Development",
    tag: "DEVELOPMENT",
    tagBg: "var(--green-tint-15)",
    tagFg: "var(--elyst-emerald)",
    title: "Website Development",
    desc: "Generate entire web architectures with just natural-language prompts.",
  },
];

function MediumTile({ tile, index }: { tile: (typeof tiles)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className={`group relative h-72 overflow-hidden rounded-[var(--radius-card)] border border-border md:h-80 ${
        tile.span === "lg" ? "md:col-span-7" : "md:col-span-5"
      }`}
    >
      <Image
        src={tile.img}
        alt={tile.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,98,76,0.88) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 p-7">
        <span
          className="mb-3 inline-block rounded-full px-3 py-1 font-bold uppercase"
          style={{ background: tile.tagBg, color: tile.tagFg, fontSize: "0.68rem" }}
        >
          {tile.tag}
        </span>
        <h3 className="font-display font-bold text-fg-on-dark" style={{ fontSize: tile.span === "lg" ? "1.6rem" : "1.35rem" }}>
          {tile.title}
        </h3>
        <p className="mt-1.5 max-w-md text-fg-muted-dark" style={{ fontSize: "var(--text-small)" }}>
          {tile.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function AiJuniorMedium() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Master Every Medium
          </h2>
          <p className="mt-3 text-fg-2" style={{ fontSize: "var(--text-body)" }}>
            From pixels to polygons, learn to command the AI for any creative task.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
          {tiles.map((tile, i) => (
            <MediumTile key={tile.title} tile={tile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
