"use client";

import { SectionMark } from "@/components/ui/section-mark";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock,
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
import { BrandButton } from "@/components/ui/brand-button";
import SquigglyArrow from "@/components/ui/squiggle-arrow";
import { NoiseBackground } from "@/components/ui/noise-background";
import { useIsTouch } from "@/lib/use-touch";

type Program = {
  mark: LucideIcon;
  name: string;
  who: string;
  status: string;
  href: string;
  surface: string;
  /** true = surface is dark enough to need light text */
  dark?: boolean;
  image?: string;
};

const programs: Program[] = [
  {
    mark: Rocket,
    name: "AI Yathra",
    who: "For working professionals and career switchers",
    status: "Closed",
    href: "/ai-yathra",
    surface: "#c0d8d3",
    image: "/images/programs/ai-yathra.png",
  },
  {
    mark: Sparkles,
    name: "AI for Juniors",
    who: "For school students, Classes 5–10",
    status: "Closed",
    href: "/juniors",
    surface: "#81b1a6",
    image: "/images/programs/ai-junior.png",
  },
  {
    mark: MessageCircle,
    name: "Elyst AI Circle",
    who: "For professionals who want to stay ahead of AI",
    status: "Open Now",
    href: "/circle",
    surface: "#428979",
    dark: true,
    image: "/images/programs/circle.png",
  },
  {
    mark: GraduationCap,
    name: "AI for Work",
    who: "The deep-dive program for professionals",
    status: "Join waitlist",
    href: "/waitlist",
    surface: "#1c725e",
    dark: true,
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
  // Adaptive text/divider colours based on surface brightness
  const headingColor = p.dark ? "var(--fg-on-dark)" : "var(--elyst-ink)";
  const bodyColor    = p.dark ? "rgba(240,250,248,0.8)" : "rgba(7,24,20,0.72)";
  const dividerColor = p.dark ? "rgba(255,255,255,0.2)" : "rgba(3,98,76,0.18)";
  // NoiseBackground runs a continuous useAnimationFrame spring loop driving a
  // moving gradient, plus backdrop-blur-sm — on touch this runs once per card
  // (4 cards on this section) forever with no pointer to react to. Freeze the
  // gradient and drop the blur on touch.
  const isTouch = useIsTouch();

  return (
    <NoiseBackground
      containerClassName={`rounded-[33px] bg-transparent p-[5px] shadow-none ring-1 ring-black/25 dark:bg-transparent ${isTouch ? "backdrop-blur-none" : ""}`}
      className="overflow-hidden rounded-[28px]"
      gradientColors={["#060d09", "#1a1a1a", "#03624c"]}
      noiseIntensity={0.12}
      animating={!isTouch}
    >
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
            <div className="relative w-full aspect-[4/3] sm:aspect-square">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
                sizes="230px"
              />
            </div>
          ) : (
            /* Coming Soon placeholder */
            <div
              className="relative flex w-full flex-col items-center justify-center overflow-hidden aspect-[4/3] sm:aspect-square"
              style={{ background: p.surface }}
            >
              {/* Dot grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Diagonal stripe wash */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, white 0, white 1px, transparent 0, transparent 50%)",
                  backgroundSize: "10px 10px",
                }}
              />
              {/* Content — a timer, signalling it's on its way */}
              <div className="relative flex flex-col items-center">
                <Clock
                  strokeWidth={1.5}
                  className="select-none"
                  style={{ width: "4.5rem", height: "4.5rem", color: "rgba(255,255,255,0.55)" }}
                />
              </div>
            </div>
          )}

          <MotionDiv
            className="flex flex-col p-5 gap-2"
            initial="hidden"
            animate="show"
            variants={stagger.container}
          >
            <motion.h3
              variants={stagger.item}
              className="font-display leading-tight"
              style={{ color: headingColor, fontSize: "var(--text-h3)", fontWeight: 800 }}
            >
              {p.name}
            </motion.h3>
            <motion.div
              variants={stagger.item}
              className="h-px w-full"
              style={{ background: dividerColor }}
            />
            <motion.p
              variants={stagger.item}
              className="leading-relaxed"
              style={{ color: bodyColor, fontSize: "var(--text-small)" }}
            >
              {p.who}
            </motion.p>
          </MotionDiv>
        </CutoutCardContent>
      </CutoutCard>
    </div>
    </NoiseBackground>
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
            <div className="block w-[230px]">
              <ProgramFace p={p} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function AcceleratorTeaser() {
  return (
    <section
      className="relative overflow-hidden bg-bg"
      style={{
        paddingTop: "clamp(44px, 5.5vw, 80px)",
        paddingBottom: "var(--section-py)",
        paddingLeft: "var(--section-px)",
        paddingRight: "var(--section-px)",
      }}
    >
      {/* Static brand-green glow behind the cards — replaced the interactive
          gradient component (felt sluggish/unreliable) with a plain layered
          radial-gradient. No JS, no pointer-tracking, just a soft backdrop
          that fades smoothly into the sections above and below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-[135%] w-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_60%,transparent_74%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_60%,transparent_74%)]"
        style={{
          background:
            "radial-gradient(48% 38% at 50% 36%, rgba(0, 223, 130, 0.32), transparent 70%), " +
            "radial-gradient(40% 34% at 28% 58%, rgba(3, 98, 76, 0.24), transparent 70%), " +
            "radial-gradient(40% 34% at 72% 58%, rgba(46, 200, 102, 0.24), transparent 70%)",
          filter: "blur(64px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionMark>Learn AI</SectionMark>
          <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Become genuinely good with AI,
            <br />
            not just aware of it.
          </h2>
          <p
            className="mx-auto mt-4 max-w-prose text-fg-2"
            style={{ fontSize: "var(--text-body)" }}
          >
            Programs if you want to use AI well in your work.
            <br />
            Taught by the team that builds AI for businesses.
          </p>
        </div>

        <div className="mt-4">
          <FanStage />

          {/* Mobile: plain stacked cards (no fan) */}
          <div className="grid gap-4 sm:hidden">
            {programs.map((p) => (
              <div key={p.href} className="mx-auto w-full max-w-[300px]">
                <ProgramFace p={p} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-1">
          <SquigglyArrow
            direction="right"
            variant="bouncy"
            width={160}
            height={88}
            className="block self-center text-emerald"
          />
          <BrandButton href="/learn" className="self-center">
            Explore Programs
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
