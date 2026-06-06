"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  MessageCircle,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  CutoutCard,
  CutoutCardContent,
  CutoutCardPin,
  CutoutCorner,
  cutoutCardSurfaceClassName,
  MotionDiv,
  useCutoutContentStaggerVariants,
} from "@/components/ui/cutout-card";

type Program = {
  mark: LucideIcon;
  name: string;
  who: string;
  status: string;
  href: string;
  surface: string;
  image?: string;
};

const programs: Program[] = [
  {
    mark: MessageCircle,
    name: "Elyst AI Circle",
    who: "For professionals who want to stay ahead of AI",
    status: "Open",
    href: "/circle",
    surface: "#428979",
    image: "/images/programs/circle.png",
  },
  {
    mark: Sparkles,
    name: "AI Junior",
    who: "For school students, Classes 5–10",
    status: "Enrolling",
    href: "/ai-junior",
    surface: "#81b1a6",
    image: "/images/programs/ai-junior.png",
  },
  {
    mark: Rocket,
    name: "AI Yathra",
    who: "For working professionals and career switchers",
    status: "Next cohort",
    href: "/ai-yathra",
    surface: "#c0d8d3",
    image: "/images/programs/ai-yathra.png",
  },
  {
    mark: GraduationCap,
    name: "Flagship Course",
    who: "The deep-dive program for professionals",
    status: "Coming soon",
    href: "/flagship",
    surface: "#1c725e",
  },
];

// Fanned-out resting positions (desktop) — reduced rotation for subtler curve
const fan = [
  { x: -258, y: 30, rotate: -10 },
  { x: -90, y: -8, rotate: -4 },
  { x: 90, y: -8, rotate: 4 },
  { x: 258, y: 30, rotate: 10 },
];

// Tidy stacked pile before the section is reached
const stacked = programs.map((_, i) => ({
  x: (i - 1.5) * 5,
  y: i * 5,
  rotate: (i - 1.5) * 3,
}));

function ProgramFace({ p }: { p: Program }) {
  const stagger = useCutoutContentStaggerVariants();
  const Icon = p.mark;

  return (
    <div
      className={cutoutCardSurfaceClassName}
      style={{ background: p.surface }}
    >
      <CutoutCard>
        {/* Status pin, cut into the top-right corner */}
        <CutoutCardPin className="top-0 right-0 rounded-bl-[16px] bg-emerald px-3 py-1.5 text-[0.68rem] font-semibold text-fg-on-dark">
          {p.status}
          <CutoutCorner
            size={16}
            className="top-0 -left-[15px] text-emerald"
          />
          <CutoutCorner
            size={16}
            className="-bottom-[15px] right-0 text-emerald"
          />
        </CutoutCardPin>

        <CutoutCardContent className="flex flex-col p-0 overflow-hidden">
          {/* Program cover image — 1:1 */}
          {p.image ? (
            <div className="relative w-full" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
                sizes="230px"
              />
            </div>
          ) : (
            <div
              className="flex w-full items-center justify-center"
              style={{ aspectRatio: "1 / 1", background: p.surface }}
            >
              <Icon className="h-16 w-16 opacity-30" style={{ color: "#ffffff" }} />
            </div>
          )}

          <MotionDiv
            className="flex flex-col p-5 gap-2"
            style={{ background: "#ffffff" }}
            initial="hidden"
            animate="show"
            variants={stagger.container}
          >
            <motion.h3
              variants={stagger.item}
              className="font-display font-semibold leading-tight"
              style={{ color: "var(--elyst-ink)", fontSize: "var(--text-h3)" }}
            >
              {p.name}
            </motion.h3>
            <motion.div
              variants={stagger.item}
              className="h-px w-full"
              style={{ background: "rgba(3,98,76,0.18)" }}
            />
            <motion.p
              variants={stagger.item}
              className="leading-relaxed"
              style={{ color: "rgba(7,24,20,0.72)", fontSize: "var(--text-small)" }}
            >
              {p.who}
            </motion.p>
          </MotionDiv>
        </CutoutCardContent>
      </CutoutCard>
    </div>
  );
}

function FanStage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      className="relative mx-auto hidden h-[580px] w-full max-w-4xl sm:block"
    >
      {programs.map((p, i) => {
        const rest = inView ? fan[i] : stacked[i];
        const isHover = hovered === i;
        const target = isHover
          ? { x: rest.x * 0.4, y: -54, rotate: 0, scale: 1.09 }
          : { ...rest, scale: 1 };

        return (
          <motion.div
            key={p.href}
            className="absolute top-1/2 left-1/2 -ml-[115px] -mt-[165px]"
            style={{ zIndex: isHover ? 60 : i }}
            initial={false}
            animate={{
              ...target,
              opacity: hovered !== null && !isHover ? 0.55 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 24,
              mass: 0.9,
            }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          >
            <Link href={p.href} className="block w-[230px]">
              <ProgramFace p={p} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function AcceleratorTeaser() {
  return (
    <section
      className="overflow-hidden bg-surface-muted"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Learn AI · Accelerator</span>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Become genuinely capable with AI.
          </h2>
          <p
            className="mx-auto mt-4 max-w-prose text-fg-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            Live, bilingual programs — community-backed — for professionals,
            students, and the parents choosing for them.
          </p>
        </div>

        <div className="mt-14">
          <FanStage />

          {/* Mobile: plain stacked cards (no fan) */}
          <div className="grid gap-5 sm:hidden">
            {programs.map((p) => (
              <Link key={p.href} href={p.href} className="block">
                <ProgramFace p={p} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/learn" className="btn btn-ghost btn-pill">
            Explore all programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
