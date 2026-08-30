import { BrandButton } from "@/components/ui/brand-button";
import { SectionMark } from "@/components/ui/section-mark";

const proofStats = [
  {
    value: "4",
    label: "lead sources",
    detail: "Ads, forms, WhatsApp, and referrals brought into one view.",
  },
  {
    value: "1",
    label: "shared queue",
    detail: "Every enquiry moves from intake to a qualified conversation.",
  },
  {
    value: "1",
    label: "human approval point",
    detail: "A counsellor remains in control before any response leaves.",
  },
] as const;

export default function HomeProofSection() {
  return (
    <section
      id="proof-in-practice"
      className="relative overflow-hidden bg-surface-accent-soft"
      aria-labelledby="proof-in-practice-heading"
      style={{ padding: "var(--section-py) var(--section-px)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-emerald/20"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <header className="flex flex-col justify-center">
            <SectionMark>Proof</SectionMark>
            <h2
              id="proof-in-practice-heading"
              className="mt-6 max-w-3xl text-balance text-fg"
              style={{ fontSize: "var(--text-h2)", lineHeight: 1.02 }}
            >
              One lead process, made visible.
            </h2>
          </header>

          <div className="flex flex-col justify-center">
            <p
              className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald"
            >
              Our solution
            </p>
            <p
              className="mt-6 max-w-3xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
              style={{ fontSize: "var(--text-card)", lineHeight: 1.05 }}
            >
              We built one lead queue from enquiry to qualified conversation.
            </p>
            <p className="mt-6 max-w-2xl text-fg-2" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              Course interest, timing, location, and intent are captured before a counsellor calls. The team sees the next action, while a human remains in the loop before any response leaves.
            </p>
          </div>
        </div>

        <div className="mt-16 grid border-y border-emerald/20 lg:grid-cols-3">
          {proofStats.map((stat, index) => (
            <article
              key={stat.label}
              className={[
                "py-8 sm:py-9 lg:px-8 lg:py-10",
                index > 0 ? "border-t border-emerald/20 lg:border-l lg:border-t-0" : "",
              ].join(" ")}
            >
              <p
                className="font-display font-semibold tracking-[var(--tracking-stat)] text-emerald"
                style={{ fontSize: "var(--text-proof-number)", lineHeight: 0.9 }}
              >
                {stat.value}
              </p>
              <p className="mt-5 font-display font-bold uppercase tracking-[var(--tracking-label)] text-fg">
                {stat.label}
              </p>
              <p className="mt-3 max-w-xs text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>
                {stat.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-display text-label font-bold uppercase tracking-[var(--tracking-label)] text-emerald">
              Client feedback
            </p>
            <blockquote
              className="mt-5 max-w-2xl font-display font-semibold tracking-[var(--tracking-display)] text-fg"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.25 }}
            >
              “Approved client feedback will replace this sample once the implementation is ready to publish.”
            </blockquote>
            <p className="mt-5 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
              EdTech lead qualification · sample case study
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">
            <p className="max-w-xl text-fg-2 lg:text-right" style={{ fontSize: "var(--text-body)", lineHeight: 1.45 }}>
              The full case study will carry the complete implementation story and approved evidence.
            </p>
            <BrandButton href="/services#proof" variant="metal" tone="emerald">
              See the full case study
            </BrandButton>
          </div>
        </div>
      </div>
    </section>
  );
}
