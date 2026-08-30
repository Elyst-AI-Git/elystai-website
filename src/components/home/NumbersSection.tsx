export type NumberBandItem = {
  label: string;
  value: string;
  description: string;
};

const numbers: readonly NumberBandItem[] = [
  {
    label: "Businesses advised",
    value: "10+",
    description: "AI workflows shaped around how teams actually work.",
  },
  {
    label: "People trained",
    value: "3,000+",
    description: "Founders and functional leads across India and the Middle East.",
  },
  {
    label: "Industries",
    value: "4+",
    description: "Different operating contexts, one practical approach.",
  },
] as const;

export function NumbersBand({
  numbers: items,
  heading = "Elyst AI by the numbers",
}: {
  numbers: readonly NumberBandItem[];
  heading?: string;
}) {
  return (
    <section
      aria-labelledby="numbers-heading"
      className="relative overflow-hidden bg-surface-dark"
      style={{ padding: "clamp(36px, 5vw, 72px) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-white/10" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 id="numbers-heading" className="sr-only">
          {heading}
        </h2>
        <div className="grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((number, index) => (
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

export default function NumbersSection() {
  return <NumbersBand numbers={numbers} />;
}
