import type { CSSProperties } from "react";
import Image from "next/image";
import { SectionMark } from "@/components/ui/section-mark";

const programs = [
  {
    name: "AI Yathra",
    who: "For working professionals and career switchers",
    image: "/images/programs/ai-yathra.webp",
    surface: "bg-surface-accent-soft",
    dark: false,
  },
  {
    name: "AI for Juniors",
    who: "For school students, Classes 5 to 10",
    image: "/images/programs/ai-junior.webp",
    surface: "bg-surface-light",
    dark: false,
  },
  {
    name: "Elyst AI Circle",
    who: "A past community for professionals applying AI at work",
    image: "/images/programs/circle.webp",
    surface: "bg-emerald",
    dark: true,
  },
  {
    name: "AI for Work",
    who: "The deep-dive program for professionals",
    image: "/images/programs/ai-for-work.webp",
    surface: "bg-surface-dark-2",
    dark: true,
  },
] as const;

const fanPositions = [
  { x: "-258px", y: "30px", rotate: "-10deg" },
  { x: "-90px", y: "-8px", rotate: "-4deg" },
  { x: "90px", y: "-8px", rotate: "4deg" },
  { x: "258px", y: "30px", rotate: "10deg" },
];

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  return (
    <article
      className={`program-history-card group relative w-full overflow-hidden rounded-[28px] shadow-card ring-1 ring-black/10 ${program.surface} ${program.dark ? "text-fg-on-dark" : "text-fg"}`}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={program.image}
          alt={program.name}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="230px"
        />
      </div>
      <div className="flex min-h-36 flex-col gap-2 p-5">
        <h3 className="font-display font-extrabold leading-tight" style={{ fontSize: "var(--text-h3)" }}>
          {program.name}
        </h3>
        <div className={`h-px w-full ${program.dark ? "bg-white/20" : "bg-emerald/20"}`} />
        <p className={program.dark ? "text-fg-on-dark/75" : "text-fg-2"} style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
          {program.who}
        </p>
      </div>
    </article>
  );
}

export default function ProgramsHistory() {
  return (
    <section id="programs" className="bg-bg" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div className="mx-auto max-w-7xl">
        <SectionMark>History</SectionMark>
        <h2 className="mt-6 text-fg" style={{ fontSize: "var(--text-h2)" }}>
          Programs we have run.
        </h2>

        <div className="relative mx-auto mt-10 hidden h-[38rem] w-full max-w-5xl items-center justify-center sm:flex">
          {programs.map((program, index) => (
            <div
              key={program.name}
              className="absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2"
              style={{
                marginLeft: fanPositions[index].x,
                marginTop: fanPositions[index].y,
                zIndex: index,
              }}
            >
              <div
                className="rotate-[var(--fan-rotate)] transition-transform duration-200 ease-out hover:-translate-y-10 hover:rotate-0 hover:scale-[1.06] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
                style={{ "--fan-rotate": fanPositions[index].rotate } as CSSProperties}
              >
                <ProgramCard program={program} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:hidden">
          {programs.map((program) => (
            <ProgramCard key={program.name} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
