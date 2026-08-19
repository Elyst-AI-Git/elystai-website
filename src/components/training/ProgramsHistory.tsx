import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionMark } from "@/components/ui/section-mark";

const programs = [
  {
    name: "Elyst AI Circle",
    who: "For professionals who want to stay ahead of AI",
    href: "/circle",
    image: "/images/programs/circle.webp",
  },
  {
    name: "AI for Work",
    who: "A practical AI program for working professionals",
    image: "/images/programs/ai-for-work.webp",
  },
  {
    name: "AI Yathra",
    who: "For working professionals and career switchers",
    image: "/images/programs/ai-yathra.webp",
  },
  {
    name: "AI for Juniors",
    who: "For school students in Classes 5 to 10",
    image: "/images/programs/ai-junior.webp",
  },
] as const;

function ProgramCard({ program }: { program: (typeof programs)[number] }) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-md bg-surface-muted">
        <Image
          src={program.image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>
          {program.name}
        </h3>
        <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>
          {program.who}
        </p>
        {"href" in program ? (
          <span className="mt-5 inline-flex items-center gap-2 font-bold text-emerald">
            View the Circle <ArrowUpRight className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
    </>
  );

  const className =
    "flex h-full flex-col overflow-hidden rounded-md border border-border bg-white transition-colors hover:border-emerald/45";

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
          {programs.map((program) => <ProgramCard key={program.name} program={program} />)}
        </div>
      </div>
    </section>
  );
}
