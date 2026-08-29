import { ArrowDownRight, ArrowRight } from "lucide-react";

const problemSteps = [
  { label: "Access", text: "You bought AI subscriptions for the team." },
  { label: "Adoption", text: "But the work output has not changed much." },
  { label: "Diagnosis", text: "You are not the problem." },
  { label: "System", text: "A subscription is not an AI system." },
] as const;

function SystemDiagram() {
  return (
    <div
      className="relative isolate flex min-h-[22rem] flex-col justify-between overflow-hidden border border-white/15 bg-surface-dark p-6 sm:min-h-[27rem] sm:p-8"
      role="img"
      aria-label="A set of AI tools becoming one workflow system"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/10" />
        <span className="absolute inset-8 border border-white/10 sm:inset-12" />
      </div>

      <div className="relative z-10 flex items-center justify-between gap-4">
        <span className="font-display text-[0.78rem] font-bold uppercase tracking-[0.2em] text-green">
          The missing layer
        </span>
        <ArrowDownRight className="size-5 text-green" strokeWidth={1.5} aria-hidden />
      </div>

      <div className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-5">
        <div className="space-y-3">
          {["Tool", "Context", "Workflow"].map((label, index) => (
            <div
              key={label}
              className={`flex items-center justify-between gap-3 border px-3 py-3 font-display text-[0.78rem] font-bold uppercase tracking-[0.16em] ${
                index === 2
                  ? "border-white/35 bg-white/10 text-fg-on-dark"
                  : "border-white/15 text-fg-muted-dark"
              }`}
            >
              <span>{label}</span>
              <span aria-hidden className={`shrink-0 whitespace-nowrap ${index === 2 ? "text-green" : "text-fg-muted-dark/60"}`}>
                {index === 2 ? "ready" : "unused"}
              </span>
            </div>
          ))}
        </div>

        <ArrowRight className="size-6 text-green sm:size-8" strokeWidth={1.5} aria-hidden />

        <div className="flex aspect-square flex-col justify-between border border-green/60 bg-emerald p-4 text-fg-on-dark sm:p-6">
          <span className="font-display text-[0.72rem] font-bold uppercase tracking-[0.2em] text-green">
            Elyst AI
          </span>
          <div>
            <span className="block font-display text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              One system.
            </span>
            <span className="mt-2 block max-w-[12ch] text-sm leading-[1.35] text-fg-on-dark/75 sm:text-base">
              Built around the work your team already does.
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
        <span className="max-w-[20ch] text-sm leading-[1.35] text-fg-muted-dark">
          Access is the starting point. A working system is the outcome.
        </span>
        <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-green shadow-[0_0_0_6px_rgba(0,223,130,0.12)]" />
      </div>
    </div>
  );
}

export default function ProblemSequence() {
  return (
    <section
      aria-labelledby="problem-sequence-heading"
      className="relative overflow-hidden bg-bg"
      style={{ padding: "clamp(80px, 10vw, 140px) var(--section-px)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[var(--section-px)] right-[var(--section-px)] border-x border-emerald/15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="border-y border-emerald/15 py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl">
            <h2
              id="problem-sequence-heading"
              className="text-balance font-display font-semibold tracking-[-0.045em] text-fg"
              style={{ fontSize: "clamp(2.8rem, 6.4vw, 5.8rem)", lineHeight: 0.98 }}
            >
              AI is easy to buy.
              <span className="block text-emerald">Making it work takes a system.</span>
            </h2>
            <p
              className="mt-8 max-w-2xl text-fg-2"
              style={{ fontSize: "var(--text-lead)", lineHeight: 1.45 }}
            >
              A subscription gives your team access. We build the workflow, context, and handover around the work so the change can actually hold.
            </p>
          </div>
        </header>

        <div className="grid border-b border-emerald/15 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="relative border-b border-emerald/15 py-10 sm:py-12 lg:border-b-0 lg:border-r lg:py-14 lg:pr-14">
            <div aria-hidden className="absolute bottom-14 left-1 top-14 w-px bg-emerald/20" />
            <div className="space-y-0">
              {problemSteps.map((step, index) => (
                <article
                  key={step.label}
                  className={`group relative border-b border-emerald/15 py-7 pl-8 first:pt-0 last:border-b-0 last:pb-0 sm:pl-10 ${index === 3 ? "lg:pb-2" : ""}`}
                >
                  <span className="relative inline-flex items-center gap-3 font-display text-[0.82rem] font-bold uppercase tracking-[0.2em] text-emerald transition-colors duration-300 group-hover:text-emerald-light">
                    <span aria-hidden className="absolute -left-[2.15rem] size-2 rounded-full border border-emerald bg-bg transition-colors duration-300 group-hover:bg-emerald sm:-left-[2.65rem]" />
                    {step.label}
                  </span>
                  <h3 className="mt-3 max-w-xl font-display text-[clamp(1.55rem,2.8vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-fg transition-colors duration-300 group-hover:text-emerald">
                    {step.text}
                  </h3>
                </article>
              ))}
            </div>

            <div className="mt-10 border-l-2 border-emerald pl-5 sm:mt-12">
              <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-fg">
                That is the gap we built Elyst AI to close.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-surface-muted p-5 sm:p-8 lg:p-12">
            <SystemDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
