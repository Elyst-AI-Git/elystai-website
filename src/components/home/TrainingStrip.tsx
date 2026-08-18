import { ArrowUpRight } from "lucide-react";
import { BrandButton } from "@/components/ui/brand-button";

const sessionInputs = ["Your roles", "Your tools", "Your real work"];

export default function TrainingStrip() {
  return (
    <section className="bg-bg" style={{ padding: "clamp(56px, 8vw, 108px) var(--section-px)" }}>
      <div
        className="mx-auto max-w-7xl overflow-hidden rounded-md border"
        style={{ borderColor: "rgba(3,98,76,0.2)", background: "#eef8f2" }}
      >
        <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
          <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-emerald" aria-hidden />
              <span
                className="font-display font-bold uppercase text-emerald"
                style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)" }}
              >
                Training
              </span>
            </div>

            <p
              className="mt-6 max-w-3xl font-display font-bold text-fg"
              style={{
                fontSize: "var(--text-display)",
                lineHeight: 1.08,
                letterSpacing: "var(--tracking-display)",
              }}
            >
              Need to train your team on AI first? We run practical AI sessions for businesses.
            </p>

            <BrandButton href="/training" variant="solid" className="mt-8">
              Explore Training
              <ArrowUpRight className="h-4.5 w-4.5" aria-hidden />
            </BrandButton>
          </div>

          <div
            className="flex flex-col justify-center border-t px-7 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-10"
            style={{ borderColor: "rgba(255,255,255,0.1)", background: "var(--surface-dark)" }}
          >
            <p
              className="font-display font-bold uppercase text-green"
              style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}
            >
              Every session starts with
            </p>

            <ol className="mt-5 border-y" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {sessionInputs.map((item, index) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b py-4 last:border-b-0 sm:py-5"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <span className="font-display text-green" style={{ fontSize: "var(--text-label)" }}>
                    0{index + 1}
                  </span>
                  <span
                    className="font-display font-semibold text-white"
                    style={{ fontSize: "var(--text-card)", lineHeight: 1.1 }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
