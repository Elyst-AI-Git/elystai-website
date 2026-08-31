import { SectionMark } from "@/components/ui/section-mark";

export default function TrainingRatingStrip() {
  return (
    <section className="bg-bg" aria-label="Training feedback" style={{ padding: "0 var(--section-px) clamp(32px, 4vw, 56px)" }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-y border-emerald/15 bg-surface-accent-soft px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-9">
        <div>
          <SectionMark>Feedback</SectionMark>
          <p className="mt-4 max-w-2xl font-display font-semibold text-fg" style={{ fontSize: "var(--text-card)", lineHeight: 1.12 }}>
            Our average rating is 4.8 out of five across 50+ sessions.
          </p>
        </div>

        <div
          className="relative inline-flex w-fit rotate-[-2deg] items-center gap-3 self-start border-2 border-emerald bg-surface-light px-5 py-4 text-emerald shadow-card before:absolute before:-left-1 before:-top-1 before:size-2 before:rounded-full before:bg-emerald after:absolute after:-bottom-1 after:-right-1 after:size-2 after:rounded-full after:bg-emerald sm:self-auto"
          aria-label="4.8 out of five across more than 50 sessions"
        >
          <span className="font-display font-semibold leading-none" style={{ fontSize: "calc(var(--text-card) + 4px)", letterSpacing: "var(--tracking-stat)" }}>
            4.8
          </span>
          <span className="max-w-[9ch] font-display text-label font-bold uppercase leading-[1.05] tracking-[var(--tracking-label)]">
            out of five
            <br />
            50+ sessions
          </span>
        </div>
      </div>
    </section>
  );
}
