import { SectionMark } from "@/components/ui/section-mark";

const proofCards = [
  {
    eyebrow: "We are early",
    title: "The proof is still being built.",
    description:
      "We are early in the implementation work we can show publicly. When a client gives us permission, this is where the workflow, result, and handover story will live.",
    label: "Implementation proof",
    quote: "Client case study pending permission.",
    attribution: "We will publish the work, not a logo wall.",
    muted: true,
  },
  {
    eyebrow: "Arvind training",
    title: "Training proof belongs here too.",
    description:
      "The approved testimonial from the Arvind training session will sit here once it is ready to publish.",
    label: "Training proof",
    quote: "Arvind training testimonial pending approval.",
    attribution: "Latest training session",
    muted: false,
  },
] as const;

export default function ServicesProofSection() {
  return (
    <section
      id="proof"
      className="relative overflow-hidden bg-surface-dark"
      aria-labelledby="services-proof-heading"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <SectionMark tone="dark">Proof</SectionMark>
          <h2 id="services-proof-heading" className="mt-6 text-balance text-fg-on-dark" style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>
            Show the work. Then let it speak.
          </h2>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {proofCards.map((card) => (
            <article key={card.eyebrow} className="flex min-h-[27rem] flex-col border border-white/10 bg-surface-dark-2 p-6 sm:p-8">
              <p className={`font-display text-label font-bold uppercase tracking-[var(--tracking-label)] ${card.muted ? "text-fg-muted-dark" : "text-green"}`}>
                {card.eyebrow}
              </p>
              <h3 className="mt-6 max-w-lg font-display font-semibold tracking-[var(--tracking-display)] text-fg-on-dark" style={{ fontSize: "var(--text-h3)", lineHeight: 1.12 }}>
                {card.title}
              </h3>
              <p className="mt-5 max-w-xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}>
                {card.description}
              </p>

              <div className={`mt-8 flex flex-1 flex-col justify-end border-t p-5 sm:p-6 ${card.muted ? "border-white/10 bg-black/10" : "border-green/25 bg-green/[0.06]"}`}>
                <p className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-fg-muted-dark">
                  {card.label}
                </p>
                <blockquote className="mt-4 max-w-xl font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-lead)", lineHeight: 1.35 }}>
                  “{card.quote}”
                </blockquote>
                <p className="mt-5 text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
                  {card.attribution}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
