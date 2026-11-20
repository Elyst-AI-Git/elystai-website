import { CalendarDays } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

/** A document between two ticks, for AI Transformation. */
function DocumentTicksIcon() {
  return (
    <svg viewBox="0 0 64 48" className="h-12 w-auto" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 5h14l8 8v28a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
      <path d="M36 5v8h8" />
      <path d="M26 24h12M26 31h12" />
      <path d="M4 20l4 4 7-8" />
      <path d="M49 28l4 4 7-8" />
    </svg>
  );
}

const ways = [
  {
    title: "AI Kickstart",
    body: "One day of AI training, or two half days, built on your team's own work.",
    href: "/kickstart",
    cta: "See AI Kickstart",
    icon: <CalendarDays aria-hidden className="size-11" strokeWidth={1.6} />,
  },
  {
    title: "AI Transformation",
    body: "We find the work, build the AI system, and train your people.",
    href: "/transformation",
    cta: "See AI Transformation",
    icon: <DocumentTicksIcon />,
  },
] as const;

export default function TwoWays() {
  return (
    <section
      id="two-ways"
      aria-labelledby="two-ways-heading"
      className="relative overflow-hidden bg-bg"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-emerald/15" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <SectionMark>Two ways to work with us</SectionMark>
          <h2 id="two-ways-heading" className="mx-auto mt-6 max-w-4xl text-balance text-fg" style={{ fontSize: "var(--text-h2)" }}>
            Start small, or go all the way.
          </h2>
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {ways.map((way) => (
            <div
              key={way.title}
              className="principle-card-shader group relative flex min-h-[22rem] flex-col overflow-hidden border border-emerald/35 bg-[var(--surface-dark)] p-7 text-fg-on-dark transition-colors duration-500 hover:border-green/65 motion-reduce:transition-none sm:p-9"
            >
              <CanvasRevealEffect colors={[[0, 223, 130], [3, 98, 76], [255, 255, 255]]} containerClassName="absolute inset-0" dotSize={2} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--surface-dark)]/35 via-transparent to-[var(--surface-dark)]/90" />
              <div className="relative z-10 flex flex-1 flex-col">
                <span className="text-green">{way.icon}</span>
                <h3 className="mt-auto pt-10 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-card)", lineHeight: 1.08, letterSpacing: "-0.03175524em" }}>
                  {way.title}
                </h3>
                <p className="mt-4 max-w-md text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
                  {way.body}
                </p>
                <div className="mt-7 flex justify-end">
                  <BrandButton href={way.href} variant="solid" tone="green" className="bg-green! text-[#06140e]! hover:bg-[#00c973]!">
                    {way.cta}
                  </BrandButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
