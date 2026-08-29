const numbers = [
  {
    label: "Years in practice",
    value: "6+",
    description: "Making AI practical for people who are not technical.",
  },
  {
    label: "People trained",
    value: "3,000+",
    description: "Founders and functional leads across India and the Middle East.",
  },
  {
    label: "Live sessions",
    value: "50+",
    description: "Sessions built around real work, not generic demos.",
  },
  {
    label: "Industries",
    value: "4+",
    description: "Different operating contexts, one practical approach.",
  },
] as const;

export default function NumbersSection() {
  return (
    <section
      aria-labelledby="numbers-heading"
      className="relative overflow-hidden bg-surface-dark"
      style={{ padding: "clamp(36px, 5vw, 72px) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 id="numbers-heading" className="sr-only">
          Elyst AI by the numbers
        </h2>
        <div className="grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((number, index) => (
            <article
              key={number.label}
              className={`px-5 py-7 sm:px-7 lg:px-8 lg:py-8 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}
            >
              <p
                className="font-display font-bold uppercase text-green"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                {number.label}
              </p>
              <p className="mt-4 font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-stat-compact)", lineHeight: 0.95 }}>
                {number.value}
              </p>
              <p className="mt-4 max-w-xs text-fg-muted-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
                {number.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
