"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/ui/section-mark";
import {
  CutoutCard,
  CutoutCardContent,
  cutoutCardSurfaceClassName,
  MotionDiv,
  useCutoutContentStaggerVariants,
} from "@/components/ui/cutout-card";
import { NoiseBackground } from "@/components/ui/noise-background";
import { useIsTouch } from "@/lib/use-touch";

type Program = {
  name: string;
  who: string;
  live: boolean;
  href: string;
  surface: string;
  dark?: boolean;
  image: string;
};

const programs: Program[] = [
  {
    name: "Elyst AI Circle",
    who: "For professionals who want to stay ahead of AI",
    live: true,
    href: "/circle",
    surface: "#428979",
    dark: true,
    image: "/images/programs/circle.png",
  },
  {
    name: "AI for Work",
    who: "The deep-dive program for professionals",
    live: false,
    href: "/ai-for-work",
    surface: "#1c725e",
    dark: true,
    image: "/images/programs/ai-for-work.jpg",
  },
  {
    name: "AI Yathra",
    who: "For working professionals and career switchers",
    live: false,
    href: "/ai-yathra",
    surface: "#c0d8d3",
    image: "/images/programs/ai-yathra.png",
  },
  {
    name: "AI for Juniors",
    who: "For school students, Classes 5–10",
    live: false,
    href: "/juniors",
    surface: "#81b1a6",
    image: "/images/programs/ai-junior.png",
  },
];

function ProgramFace({ program }: { program: Program }) {
  const stagger = useCutoutContentStaggerVariants();
  const isTouch = useIsTouch();
  const headingColor = program.dark ? "var(--fg-on-dark)" : "var(--elyst-ink)";
  const bodyColor = program.dark ? "rgba(240,250,248,0.8)" : "rgba(7,24,20,0.72)";
  const dividerColor = program.dark ? "rgba(255,255,255,0.2)" : "rgba(3,98,76,0.18)";

  return (
    <NoiseBackground
      containerClassName={`rounded-[33px] bg-transparent p-[5px] shadow-none ring-1 ring-black/25 dark:bg-transparent ${isTouch ? "backdrop-blur-none" : ""}`}
      className="overflow-hidden rounded-[28px]"
      gradientColors={["#060d09", "#1a1a1a", "#03624c"]}
      noiseIntensity={0.12}
      animating={!isTouch}
    >
      <div className={cutoutCardSurfaceClassName} style={{ background: program.surface }}>
        <CutoutCard>
          <CutoutCardContent className="flex flex-col overflow-hidden p-0">
            <div className="relative aspect-[4/3] w-full sm:aspect-square">
              <Image
                src={program.image}
                alt={program.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 30vw, 80vw"
              />
            </div>

            <MotionDiv
              className="flex flex-col gap-2 p-5"
              initial="hidden"
              animate="show"
              variants={stagger.container}
            >
              <motion.h3
                variants={stagger.item}
                className="font-display leading-tight"
                style={{ color: headingColor, fontSize: "var(--text-h3)", fontWeight: 800 }}
              >
                {program.name}
              </motion.h3>
              <motion.div variants={stagger.item} className="h-px w-full" style={{ background: dividerColor }} />
              <motion.p
                variants={stagger.item}
                className="leading-relaxed"
                style={{ color: bodyColor, fontSize: "var(--text-small)" }}
              >
                {program.who}
              </motion.p>
            </MotionDiv>
          </CutoutCardContent>
        </CutoutCard>
      </div>
    </NoiseBackground>
  );
}

export default function ProgramsGrid() {
  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
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

      <div className="relative z-10 mx-auto max-w-6xl">
        <div>
          <SectionMark>History</SectionMark>
          <h3 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Programs we have run.
          </h3>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program) => (
              <ProgramFace key={program.href} program={program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
