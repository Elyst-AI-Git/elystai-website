import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";

export const arvindSession = {
  company: "Arvind Fashions",
  intro: "A practical team session built around the work people do every day.",
  brief:
    "A working session for a fashion and retail team exploring where AI can make everyday work clearer, faster, and easier to repeat.",
  pulledOff: [
    "Role-specific exercises instead of generic demos",
    "Hands-on practice with real work patterns",
    "A clearer next step for using AI after the room",
  ],
  testimonial: "The practical exercises made it easier to see where AI could fit into the work I already do.",
} as const;

function ArvindWordmark() {
  return (
    <div aria-label={arvindSession.company} className="font-display font-bold uppercase leading-none text-fg-on-dark">
      <span className="block text-[clamp(1.6rem,3vw,2.5rem)] tracking-[0.08em]">Arvind</span>
      <span className="mt-2 block text-[0.72rem] tracking-[0.32em] text-green">Fashions</span>
    </div>
  );
}

export default function ArvindSessionSection() {
  return (
    <section className="relative overflow-hidden bg-surface-dark" style={{ padding: "var(--section-py) var(--section-px)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-20">
          <header>
            <SectionMark tone="dark">Recent session</SectionMark>
            <h2 className="mt-6 max-w-xl text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}>
              AI training in the room, not just on the slide.
            </h2>
          </header>

          <div className="relative overflow-hidden border border-white/15 bg-surface-dark-2 p-6 sm:p-8 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-full w-1/4 bg-[radial-gradient(circle_at_center,rgba(0,223,130,0.25)_0_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="relative z-10 grid gap-9 md:grid-cols-[0.62fr_1.38fr] md:gap-12">
              <div>
                <ArvindWordmark />
                <p className="mt-7 max-w-sm text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
                  {arvindSession.brief}
                </p>
              </div>

              <div className="grid gap-8">
                <div>
                  <p className="font-display font-bold uppercase text-green" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}>
                    What we pulled off
                  </p>
                  <ul className="mt-4 grid gap-3 text-fg-on-dark/85" style={{ fontSize: "var(--text-body)", lineHeight: 1.4 }}>
                    {arvindSession.pulledOff.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <blockquote className="border-t border-white/15 pt-6 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.2 }}>
                  “{arvindSession.testimonial}”
                  <cite className="mt-4 block font-sans not-italic text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.35 }}>
                    Sample attendee feedback · wording to be replaced with approved quote
                  </cite>
                </blockquote>
              </div>
            </div>

            <div className="relative z-10 mt-9 border-t border-white/15 pt-7">
              <BrandButton href="/training/arvind-fashions" tone="green">
                See the Arvind Fashions session
              </BrandButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
