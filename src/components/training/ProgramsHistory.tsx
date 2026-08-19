import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";
import { ArchiveVisual, type ArchiveVisualId } from "@/components/training/TrainingVisuals";

const programs = [
  {
    name: "Elyst AI Circle",
    who: "For professionals who want to stay ahead of AI",
    href: "/circle",
    visual: "circle" as ArchiveVisualId,
  },
  {
    name: "AI for Work",
    who: "A practical AI program for working professionals",
    visual: "work" as ArchiveVisualId,
  },
  {
    name: "AI Yathra",
    who: "For working professionals and career switchers",
    visual: "yathra" as ArchiveVisualId,
  },
  {
    name: "AI for Juniors",
    who: "For school students in Classes 5 to 10",
    visual: "juniors" as ArchiveVisualId,
  },
] as const;

function ProgramCard({ program, index }: { program: (typeof programs)[number]; index: number }) {
  const content = (
    <>
      <div className="flex h-40 items-center justify-center border-b border-border bg-surface-muted px-6 sm:h-44">
        <ArchiveVisual id={program.visual} className="max-w-[10rem]" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <span className="font-display font-semibold text-emerald" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
          Archive 0{index + 1}
        </span>
        <h3 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>
          {program.name}
        </h3>
        <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
          {program.who}
        </p>
        {"href" in program ? (
        <span className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-emerald" style={{ fontSize: "var(--text-small)" }}>
          View the Circle <ArrowUpRight className="size-4" aria-hidden />
        </span>
        ) : null}
      </div>
    </>
  );

  const className =
    "group flex h-full min-h-[20rem] flex-col overflow-hidden rounded-md border border-border bg-white transition-colors hover:border-emerald/45";

  return "href" in program ? (
    <Link href={program.href} className={className}>
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
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
        <div className="mt-10 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => <ProgramCard key={program.name} program={program} index={index} />)}
        </div>
      </div>
    </section>
  );
}
