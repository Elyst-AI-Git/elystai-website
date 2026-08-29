import Link from "next/link";

export default function TrainingRoutingStrip() {
  return (
    <section
      className="bg-bg"
      aria-labelledby="training-routing-heading"
      style={{ padding: "0 var(--section-px)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-6 border-y border-emerald/15 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10 sm:py-8">
        <div className="border-l-2 border-emerald pl-5 sm:pl-6">
          <h2
            id="training-routing-heading"
            className="font-display font-semibold text-fg"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.25 }}
          >
            Need to train the team on AI first?
          </h2>
          <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
            We run practical AI sessions for teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:justify-end">
          <span className="font-display font-bold text-emerald" style={{ fontSize: "var(--text-small)" }}>
            3,000+ people trained so far.
          </span>
          <Link
            href="/training"
            className="font-display font-bold text-emerald underline decoration-emerald/40 underline-offset-4 transition-colors hover:text-emerald-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2"
            style={{ fontSize: "var(--text-small)" }}
          >
            Explore training →
          </Link>
        </div>
      </div>
    </section>
  );
}
