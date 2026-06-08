"use client";

import { useRef, useState } from "react";
import { Languages, Radio, Users2, Hammer } from "lucide-react";
import { motion } from "framer-motion";
import DitherShader from "@/components/ui/dither-shader";

/**
 * Why learn with Elyst — the differentiator. Four warm value blocks, then the
 * founder-story block (the credibility engine): two builders who learned AI by
 * shipping it, and now run production AI in the agency (AIOS). The portraits
 * reuse the home-founders dither→reveal treatment for brand continuity.
 */

const reasons = [
  {
    Icon: Languages,
    title: "Bilingual & local",
    line: "Taught in Malayalam + English, built for Indian and GCC professionals — not a generic Western course.",
  },
  {
    Icon: Radio,
    title: "Live, not recorded",
    line: "Real sessions with real interaction — not a dumped video library you never finish.",
  },
  {
    Icon: Users2,
    title: "Community-backed",
    line: "Learning doesn't stop when the session ends — the Circle keeps you sharp between them.",
  },
  {
    Icon: Hammer,
    title: "Taught by people who build AI",
    line: "Our Services arm (AIOS) ships production AI for businesses every day. You learn from practitioners, not career educators reading slides.",
  },
];

const founders = [
  {
    name: "Nihal Anas",
    role: "Builds AIOS",
    photo: "/images/founders/nihal.jpg",
  },
  {
    name: "Fathima Shirin P",
    role: "Leads the Accelerator",
    photo: "/images/founders/shirin.jpg",
  },
];

const REVEAL_RADIUS = 90;

function FounderPortrait({ f }: { f: (typeof founders)[number] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  const mask = pos
    ? `radial-gradient(circle ${REVEAL_RADIUS}px at ${pos.x}px ${pos.y}px, #000 0%, #000 55%, transparent 78%)`
    : undefined;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setPos(null)}
        className="relative aspect-square w-28 overflow-hidden rounded-2xl ring-1 ring-black/5 sm:w-32"
      >
        <div className="absolute inset-0">
          <DitherShader
            src={f.photo}
            ditherMode="bayer"
            colorMode="duotone"
            primaryColor="#03624C"
            secondaryColor="#F5F8F6"
            gridSize={5}
            brightness={0.05}
            contrast={1.15}
            objectFit="cover"
            className="h-full w-full"
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.photo}
          alt={f.name}
          className="absolute inset-0 hidden h-full w-full object-cover object-top transition-opacity duration-200 md:block"
          style={{ opacity: pos ? 1 : 0, WebkitMaskImage: mask, maskImage: mask }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.photo}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-top md:hidden"
        />
      </div>
      <div className="text-center">
        <p className="text-small font-bold text-fg">{f.name}</p>
        <p className="text-[0.85rem] text-emerald">{f.role}</p>
      </div>
    </div>
  );
}

export default function AccelWhy() {
  return (
    <section className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip" style={{ background: "var(--green-tint-15)" }}>
            Why Elyst
          </span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Learn AI from people who actually build it.
          </h2>
        </div>

        {/* Four value blocks */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {reasons.map(({ Icon, title, line }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="card-tint p-7"
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "var(--green-tint-15)" }}
              >
                <Icon className="h-5 w-5 text-emerald" />
              </span>
              <h3 className="mt-5 text-fg" style={{ fontSize: "var(--text-h3)" }}>
                {title}
              </h3>
              <p className="mt-2 text-small leading-relaxed text-fg-2">{line}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder-story block — the credibility centrepiece */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 grid items-center gap-8 p-8 sm:p-10 md:grid-cols-[auto_1fr]"
          style={{
            borderRadius: "var(--radius-xl, 24px)",
            background: "var(--emerald-tint-10)",
            border: "1px solid var(--green-tint-15)",
          }}
        >
          <div className="flex justify-center gap-6">
            {founders.map((f) => (
              <FounderPortrait key={f.name} f={f} />
            ))}
          </div>

          <div>
            <p
              className="text-fg"
              style={{ fontSize: "var(--text-body)", lineHeight: 1.65, fontWeight: 500 }}
            >
              We learned AI in college, then learned it for real by building —
              shipping projects, then production systems inside companies. Today
              we build AI for businesses every day in the agency. So we teach
              what&rsquo;s real, not theory: what we learned, plus what
              professionals now actually need.
            </p>
            <p className="mt-4 text-small text-fg-3">
              Nihal Anas builds AIOS · Fathima Shirin P leads the Accelerator —
              the two of us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
