import Link from "next/link";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    mark: "C",
    name: "Elyst AI Circle",
    who: "For professionals who want to stay ahead of AI",
    status: "Open",
    href: "/circle",
  },
  {
    mark: "J",
    name: "AI Junior",
    who: "For school students, Classes 5–10",
    status: "Enrolling",
    href: "/ai-junior",
  },
  {
    mark: "Y",
    name: "AI Yathra",
    who: "For working professionals and career switchers",
    status: "Next cohort forming",
    href: "/ai-yathra",
  },
  {
    mark: "F",
    name: "Flagship Course",
    who: "The deep-dive program for professionals",
    status: "Coming soon",
    href: "/flagship",
  },
];

export default function AcceleratorTeaser() {
  return (
    <section
      className="bg-surface-muted"
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col rounded-[24px] bg-white p-6 transition-transform duration-200 hover:-translate-y-1"
              style={{ boxShadow: "0 4px 32px rgba(3, 98, 76, 0.05)" }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md font-display text-h3 font-semibold text-emerald"
                style={{ background: "var(--emerald-tint-10)" }}
              >
                {p.mark}
              </div>
              <h3
                className="mt-5 text-fg"
                style={{ fontSize: "var(--text-h3)", fontWeight: 600 }}
              >
                {p.name}
              </h3>
              <p className="mt-2 flex-1 text-small text-fg-2">{p.who}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="chip">{p.status}</span>
                <ArrowRight className="h-5 w-5 text-emerald opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-sm:opacity-100" />
              </div>
            </Link>
          ))}
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
