import { SectionMark } from "@/components/ui/section-mark";

const proofCards = [
  {
    eyebrow: "AI implementation",
    title: "A client story belongs here.",
    description:
      "The approved implementation story will show the workflow we changed, what the team owns now, and the result that followed.",
    quote: "Client testimonial pending approval.",
    attribution: "Latest implementation",
    placeholder: true,
  },
  {
    eyebrow: "AI training",
    title: "Practical enough to use the next day.",
    description:
      "Hands-on sessions built around real tools, real roles, and the work people already need to do.",
    quote:
      "The hands on approach of showing each things practically, showing how each tool actually works, made the sessions very effective. Looking forward to what's next.",
    attribution: "Muhammed Sinan B · AI Yathra",
    placeholder: false,
  },
] as const;

export default function HomeProofSection() {
  return (
    <section
      id="proof-in-practice"
      className="relative overflow-hidden bg-surface-dark"
      aria-labelledby="proof-in-practice-heading"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <SectionMark tone="dark">Proof in practice</SectionMark>
          <h2
            id="proof-in-practice-heading"
            className="mx-auto mt-6 text-balance text-fg-on-dark"
            style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}
          >
            The work should show up in the work.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.5 }}>
            Two ways we look for evidence: what changes inside a business, and what people can do after the session.
          </p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {proofCards.map((card) => (
            <article key={card.eyebrow} className="flex min-h-[32rem] flex-col border border-white/10 bg-surface-dark-2 p-6 sm:p-8">
              <p className={`font-display text-label font-bold uppercase tracking-[var(--tracking-label)] ${card.placeholder ? "text-fg-muted-dark" : "text-green"}`}>
                {card.eyebrow}
              </p>
              <h3 className="mt-6 max-w-lg font-display font-semibold tracking-[var(--tracking-display)] text-fg-on-dark" style={{ fontSize: "var(--text-h3)", lineHeight: 1.12 }}>
                {card.title}
              </h3>
              <p className="mt-5 max-w-xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}>
                {card.description}
              </p>

              <div className={`mt-8 flex flex-1 flex-col justify-end border-t p-5 sm:p-6 ${card.placeholder ? "border-white/10 bg-black/10" : "border-green/25 bg-green/[0.06]"}`}>
                <p className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-fg-muted-dark">
                  {card.placeholder ? "Awaiting approved case study" : "From the session"}
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
