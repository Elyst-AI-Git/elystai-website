import { Sparkles, UserCheck, Inbox } from "lucide-react";

/**
 * Hero visuals for the two service pages. Plain markup and CSS keyframes
 * (transform and opacity only): no canvas, no images, no extra packages.
 */

const FLOW = [
  { Icon: Inbox, label: "An enquiry arrives" },
  { Icon: Sparkles, label: "The AI system drafts the reply" },
  { Icon: UserCheck, label: "Your team checks and sends" },
] as const;

/** Transformation: the work moving through an AI system, step by step. */
export function TransformationFlowVisual() {
  return (
    <div aria-hidden className="relative w-full max-w-md xl:mx-auto">
      <span className="absolute bottom-8 left-[1.7rem] top-8 w-px overflow-hidden bg-white/15">
        <i className="hv-travel absolute inset-x-0 top-0 block h-1/3 bg-gradient-to-b from-transparent via-green to-transparent" />
      </span>
      <ul className="relative flex flex-col gap-6">
        {FLOW.map(({ Icon, label }, i) => (
          <li key={label} className="relative flex items-center gap-4 rounded-md border border-white/15 bg-white/[0.06] px-4 py-4 backdrop-blur-sm">
            <i className="hv-lit pointer-events-none absolute inset-0 rounded-md border-2 border-green opacity-0" style={{ animationDelay: `${i * 2}s` }} />
            <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-green text-[#06140e]">
              <Icon className="size-5" strokeWidth={2.2} />
            </span>
            <span className="font-display font-semibold text-fg-on-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.2 }}>
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Kickstart: a real task in, a result building out. */
export function KickstartPromptVisual() {
  return (
    <div aria-hidden className="relative w-full max-w-md xl:mx-auto rounded-md bg-surface-light p-5 shadow-card sm:p-6">
      <p className="font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
        Your task
      </p>
      <p className="ml-auto mt-3 max-w-[88%] rounded-2xl rounded-br-sm bg-[#e9ece9] px-4 py-3 text-fg" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>
        Turn this week&rsquo;s customer calls into a one-page report.
      </p>
      <div className="mt-5 rounded-md border border-emerald/20 bg-white p-4">
        <p className="flex items-center gap-2 font-display font-bold uppercase text-emerald" style={{ fontSize: "var(--text-micro)", letterSpacing: "var(--tracking-label)" }}>
          <Sparkles className="size-3.5" strokeWidth={2.4} /> Result
        </p>
        <div className="mt-3 space-y-2.5">
          {["w-full", "w-[92%]", "w-[78%]", "w-[60%]"].map((w, i) => (
            <div key={w} className={`h-2 rounded-full bg-emerald/15 ${w}`}>
              <i className="hv-fill block h-full w-full rounded-full bg-emerald/70" style={{ animationDelay: `${i * 0.45}s` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
