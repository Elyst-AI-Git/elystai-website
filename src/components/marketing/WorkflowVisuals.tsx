import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CircleAlert,
  FileText,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import type { CtaIntent } from "@/components/marketing/TrackedCta";
import TrackedCta from "@/components/marketing/TrackedCta";
import { SectionMark } from "@/components/ui/section-mark";

export type EvidenceStatus = "Delivered" | "Permissioned" | "Anonymised" | "Demonstration" | "Method";

export type WorkflowTraceStep = {
  label: string;
  title: string;
  detail: string;
  status?: string;
  tone?: "neutral" | "green" | "warning" | "dark";
};

export function PageThesis({
  eyebrow,
  title,
  description,
  cta,
  visual,
  note,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  cta?: { label: string; intent: CtaIntent };
  visual: ReactNode;
  note?: string;
}) {
  return (
    <section className="border-b border-border/70 bg-bg px-[var(--section-px)] pb-[clamp(72px,9vw,124px)] pt-[clamp(48px,6vw,88px)]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <div>
          <SectionMark>{eyebrow}</SectionMark>
          <h1 className="mt-7 max-w-3xl text-fg" style={{ fontSize: "var(--text-hero)", lineHeight: 1.04 }}>
            {title}
          </h1>
          <div className="mt-6 max-w-2xl text-fg-2" style={{ fontSize: "calc(var(--text-body) + 2px)", lineHeight: 1.5 }}>
            {description}
          </div>
          {cta && (
            <div className="mt-8">
              <TrackedCta label={cta.label} intent={cta.intent} tone="green" variant="solid" />
            </div>
          )}
          {note && (
            <p className="mt-6 max-w-md border-l-2 border-emerald/25 pl-4 text-fg-3" style={{ fontSize: "var(--text-small)", lineHeight: 1.55 }}>
              {note}
            </p>
          )}
        </div>
        <div className="min-w-0">{visual}</div>
      </div>
    </section>
  );
}

function statusClass(tone: WorkflowTraceStep["tone"], dark: boolean) {
  if (tone === "green") return dark ? "bg-green text-ink" : "bg-green/15 text-emerald";
  if (tone === "warning") return dark ? "bg-[#f5d6a6] text-[#3a2914]" : "bg-[#f5e7cf] text-[#73511f]";
  if (tone === "dark") return dark ? "bg-white/12 text-fg-on-dark" : "bg-surface-dark text-fg-on-dark";
  return dark ? "bg-white/10 text-fg-muted-dark" : "bg-surface-muted text-fg-3";
}

export function WorkflowTrace({
  steps,
  dark = false,
  compact = false,
  label = "Workflow trace",
}: {
  steps: WorkflowTraceStep[];
  dark?: boolean;
  compact?: boolean;
  label?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-card border ${dark ? "border-white/12 bg-white/[0.045]" : "border-border bg-white shadow-card"}`}>
      <div className={`flex items-center justify-between gap-4 border-b px-5 py-4 md:px-6 ${dark ? "border-white/10" : "border-border"}`}>
        <span className={`font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${dark ? "text-green" : "text-emerald"}`}>
          {label}
        </span>
        <span className={`font-mono text-[0.68rem] uppercase tracking-[0.12em] ${dark ? "text-fg-muted-dark" : "text-fg-3"}`}>
          input → owner
        </span>
      </div>
      <ol className="relative space-y-3 p-4 before:absolute before:bottom-8 before:left-[2rem] before:top-8 before:w-px before:bg-emerald/25 md:p-6 md:before:left-[2.5rem]">
        {steps.map((step, index) => (
          <li key={`${step.label}-${index}`} className={`relative grid gap-3 rounded-lg border p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center ${dark ? "border-white/10 bg-black/10" : "border-border/80 bg-bg/75"}`}>
            <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[0.68rem] font-bold ${dark ? "border-green/50 bg-surface-dark text-green" : "border-emerald/30 bg-white text-emerald"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={compact ? "sm:pr-3" : ""}>
              <p className={`font-mono text-[0.67rem] font-semibold uppercase tracking-[0.14em] ${dark ? "text-fg-muted-dark" : "text-fg-3"}`}>
                {step.label}
              </p>
              <p className={`mt-1 font-display font-bold ${dark ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: compact ? "var(--text-small)" : "var(--text-h3)", lineHeight: 1.15 }}>
                {step.title}
              </p>
              {!compact && <p className={`mt-2 max-w-xl ${dark ? "text-fg-muted-dark" : "text-fg-2"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>{step.detail}</p>}
            </div>
            <span className={`w-fit rounded-full px-2.5 py-1 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] ${statusClass(step.tone, dark)}`}>
              {step.status ?? step.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ArtifactFrame({
  status,
  label,
  title,
  children,
  tone = "light",
  footer,
}: {
  status: EvidenceStatus;
  label: string;
  title: string;
  children: ReactNode;
  tone?: "light" | "dark";
  footer?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className={`overflow-hidden rounded-card border ${dark ? "border-white/12 bg-white/[0.045]" : "border-border bg-white shadow-card"}`}>
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 ${dark ? "border-white/10" : "border-border"}`}>
        <div className="flex items-center gap-3">
          <FileText className={dark ? "h-4 w-4 text-green" : "h-4 w-4 text-emerald"} aria-hidden />
          <span className={`font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${dark ? "text-fg-muted-dark" : "text-fg-3"}`}>{label}</span>
        </div>
        <span className={`rounded-full px-2.5 py-1 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] ${status === "Demonstration" ? (dark ? "bg-white/10 text-fg-muted-dark" : "bg-surface-muted text-fg-3") : dark ? "bg-green text-ink" : "bg-green/15 text-emerald"}`}>
          {status}
        </span>
      </div>
      <div className="p-5 md:p-6">
        <h3 className={`font-display font-bold ${dark ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-h3)", lineHeight: 1.15 }}>{title}</h3>
        <div className={`mt-5 ${dark ? "text-fg-muted-dark" : "text-fg-2"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.55 }}>{children}</div>
      </div>
      {footer && <div className={`border-t px-5 py-4 md:px-6 ${dark ? "border-white/10 text-fg-muted-dark" : "border-border text-fg-3"}`} style={{ fontSize: "var(--text-label)", lineHeight: 1.5 }}>{footer}</div>}
    </div>
  );
}

export function FitGate({
  checks,
  notYet,
  note,
}: {
  checks: string[];
  notYet: string[];
  note?: string;
}) {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-card bg-emerald p-6 text-fg-on-dark shadow-card md:p-8">
          <div className="flex items-center gap-3">
            <Check className="h-5 w-5 text-green" aria-hidden />
            <h3 className="font-display font-bold" style={{ fontSize: "var(--text-h3)" }}>Readiness check</h3>
          </div>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {checks.map((item) => <li key={item} className="flex gap-3 border-t border-white/15 pt-3 text-fg-on-dark/90" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green" />{item}</li>)}
          </ul>
        </article>
        <article className="rounded-card border border-border bg-white p-6 shadow-card md:p-8">
          <div className="flex items-center gap-3">
            <CircleAlert className="h-5 w-5 text-[#846227]" aria-hidden />
            <h3 className="font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)" }}>Not yet means not yet.</h3>
          </div>
          <ul className="mt-7 space-y-3">
            {notYet.map((item) => <li key={item} className="flex gap-3 border-t border-border pt-3 text-fg-2" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#846227]" />{item}</li>)}
          </ul>
        </article>
      </div>
      {note && <p className="mt-5 max-w-3xl text-fg-3" style={{ fontSize: "var(--text-small)", lineHeight: 1.55 }}>{note}</p>}
    </div>
  );
}

export function PhasePanel({
  number,
  label,
  title,
  intro,
  input,
  output,
  boundary,
  tone = "light",
}: {
  number: string;
  label: string;
  title: string;
  intro: string;
  input: string;
  output: string;
  boundary: string;
  tone?: "light" | "muted" | "dark";
}) {
  const dark = tone === "dark";
  const surface = dark ? "bg-surface-dark" : tone === "muted" ? "bg-surface-muted" : "bg-bg";
  return (
    <section id={label.toLowerCase()} className={`${surface} scroll-mt-28 px-[var(--section-px)] py-[var(--section-py)]`}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionMark tone={dark ? "dark" : "light"}>{number} · {label}</SectionMark>
            <h2 className={`mt-6 max-w-xl font-display font-bold ${dark ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-h2)", lineHeight: 1.1 }}>{title}</h2>
            <p className={`mt-5 max-w-xl ${dark ? "text-fg-muted-dark" : "text-fg-2"}`} style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}>{intro}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className={`rounded-card border p-5 ${dark ? "border-white/12 bg-white/[0.045]" : "border-border bg-white shadow-card"}`}>
              <p className={`font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${dark ? "text-green" : "text-emerald"}`}>Input</p>
              <p className={`mt-4 ${dark ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>{input}</p>
            </div>
            <div className={`rounded-card border p-5 ${dark ? "border-white/12 bg-white/[0.045]" : "border-border bg-white shadow-card"}`}>
              <p className={`font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${dark ? "text-green" : "text-emerald"}`}>Output</p>
              <p className={`mt-4 ${dark ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>{output}</p>
            </div>
            <div className={`rounded-card border p-5 ${dark ? "border-green/30 bg-green/10" : "border-emerald/20 bg-emerald/5"}`}>
              <p className={`font-mono text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${dark ? "text-green" : "text-emerald"}`}>Boundary</p>
              <p className={`mt-4 ${dark ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-small)", lineHeight: 1.5 }}>{boundary}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResponsibilityMap({
  rows,
  title = "From first question to client ownership.",
}: {
  rows: { phase: string; shirin: string; nihal: string; client: string }[];
  title?: string;
}) {
  return (
    <div className="rounded-card border border-border bg-white shadow-card">
      <div className="border-b border-border px-5 py-5 md:px-7">
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-emerald">Responsibility map</p>
        <h3 className="mt-3 max-w-2xl font-display font-bold text-fg" style={{ fontSize: "var(--text-h3)", lineHeight: 1.15 }}>{title}</h3>
      </div>
      <div className="hidden grid-cols-[1.1fr_1fr_1fr_1fr] border-b border-border bg-surface-muted px-6 py-3 md:grid">
        <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-fg-3">Phase</span>
        <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-fg-3">Shirin · CEO</span>
        <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-fg-3">Nihal · CAIO</span>
        <span className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-fg-3">Client owner</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.phase} className="grid gap-4 px-5 py-5 md:grid-cols-[1.1fr_1fr_1fr_1fr] md:items-center md:px-6">
            <p className="font-display font-bold text-fg" style={{ fontSize: "var(--text-small)" }}>{row.phase}</p>
            {[row.shirin, row.nihal, row.client].map((value, index) => (
              <div key={`${row.phase}-${index}`} className="flex gap-3 md:block">
                <span className="w-24 shrink-0 font-mono text-[0.63rem] uppercase tracking-[0.1em] text-fg-3 md:hidden">{index === 0 ? "Shirin" : index === 1 ? "Nihal" : "Client owner"}</span>
                <p className="text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>{value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FounderStrip({
  name,
  role,
  image,
  eyebrow,
  bio,
  side = "left",
  surface = "green",
  href,
  linkedin,
}: {
  name: string;
  role: string;
  image: string;
  eyebrow: string;
  bio: string;
  side?: "left" | "right";
  surface?: "green" | "emerald";
  href?: string;
  linkedin?: string;
}) {
  const bright = surface === "green";
  const text = bright ? "text-ink" : "text-fg-on-dark";
  const muted = bright ? "text-ink/70" : "text-fg-muted-dark";
  const content = (
    <div className={`grid items-stretch gap-0 md:grid-cols-2 ${side === "right" ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div className={`relative min-h-[320px] overflow-hidden ${bright ? "bg-green" : "bg-emerald"}`}>
        <Image src={image} alt={`${name}, ${role}`} fill className="object-contain object-bottom" sizes="(min-width: 768px) 50vw, 100vw" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent" aria-hidden />
      </div>
      <div className={`flex flex-col justify-center px-6 py-10 md:px-12 md:py-14 ${bright ? "bg-[#b9f0cf]" : "bg-surface-dark"}`}>
        <SectionMark tone={bright ? "light" : "dark"}>{eyebrow}</SectionMark>
        <h2 className={`mt-5 font-display font-bold ${text}`} style={{ fontSize: "var(--text-h2)", lineHeight: 1.08 }}>{name}</h2>
        <p className={`mt-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.13em] ${bright ? "text-emerald" : "text-green"}`}>{role}</p>
        <p className={`mt-6 max-w-xl ${muted}`} style={{ fontSize: "var(--text-body)", lineHeight: 1.6 }}>{bio}</p>
        {href && (
          <Link href={href} className={`mt-7 inline-flex w-fit items-center gap-2 font-semibold underline underline-offset-4 ${bright ? "text-emerald" : "text-green"}`} style={{ fontSize: "var(--text-small)" }}>
            View profile <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer" className={`mt-7 inline-flex w-fit items-center gap-2 font-semibold underline underline-offset-4 ${bright ? "text-emerald" : "text-green"}`} style={{ fontSize: "var(--text-small)" }}>
            LinkedIn <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
  return <section className="bg-bg">{content}</section>;
}

export function CtaBand({
  eyebrow = "A bounded next step",
  title,
  description,
  label,
  intent,
  promptChips = [],
}: {
  eyebrow?: string;
  title: string;
  description: string;
  label: string;
  intent: CtaIntent;
  promptChips?: string[];
}) {
  return (
    <section className="bg-surface-dark px-[var(--section-px)] py-[clamp(72px,9vw,124px)]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-20">
        <div>
          <SectionMark tone="dark">{eyebrow}</SectionMark>
          <h2 className="mt-6 max-w-3xl font-display font-bold text-fg-on-dark" style={{ fontSize: "var(--text-h1)", lineHeight: 1.05 }}>{title}</h2>
          <p className="mt-5 max-w-2xl text-fg-muted-dark" style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}>{description}</p>
          <div className="mt-8"><TrackedCta label={label} intent={intent} tone="green" variant="solid" /></div>
        </div>
        {promptChips.length > 0 && (
          <div className="rounded-card border border-white/12 bg-white/[0.045] p-5 md:p-6">
            <p className="font-mono text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-green">Bring this to the first conversation</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {promptChips.map((chip) => <span key={chip} className="rounded-full border border-white/15 px-3 py-2 text-fg-on-dark/85" style={{ fontSize: "var(--text-label)" }}>{chip}</span>)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function SessionBriefVisual() {
  return (
    <div className="rounded-card bg-surface-dark p-5 shadow-card md:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-green">Session brief</p>
          <p className="mt-2 font-display font-bold text-fg-on-dark" style={{ fontSize: "var(--text-h3)" }}>A session your team can use on Monday.</p>
        </div>
        <span className="rounded-full border border-green/35 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-green">Designed</span>
      </div>
      <div className="mt-5 space-y-3">
        {[
          ["01", "Your role", "Sales operations and team leads"],
          ["02", "Your tools", "Approved chat, documents, and CRM"],
          ["03", "Your real work", "Turn an enquiry into a reviewed next action"],
        ].map(([number, label, value]) => (
          <div key={number} className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-white/10 bg-black/10 p-4">
            <span className="font-mono text-[0.72rem] font-bold text-green">{number}</span>
            <div>
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-fg-muted-dark">{label}</p>
              <p className="mt-1 text-fg-on-dark" style={{ fontSize: "var(--text-small)", lineHeight: 1.45 }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-lg bg-green p-4 text-ink">
        <LockKeyhole className="h-5 w-5 shrink-0" aria-hidden />
        <p className="font-semibold" style={{ fontSize: "var(--text-small)", lineHeight: 1.4 }}>Human review stays in the room and in the method.</p>
      </div>
    </div>
  );
}

export function DecisionTreeVisual() {
  const outcomes = [
    { label: "Process change", tone: "bg-white/10 text-fg-on-dark" },
    { label: "Existing tool", tone: "bg-white/10 text-fg-on-dark" },
    { label: "Bounded build", tone: "bg-green text-ink" },
    { label: "Not yet", tone: "bg-[#f5d6a6] text-[#3a2914]" },
  ];
  return (
    <div className="rounded-card bg-surface-dark p-5 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-green">Audit decision tree</span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fg-muted-dark">No preselected build</span>
      </div>
      <div className="mt-7 rounded-lg border border-white/10 bg-black/10 p-4 text-center">
        <span className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-fg-muted-dark">What is actually stalling?</span>
        <p className="mt-2 font-display font-bold text-fg-on-dark" style={{ fontSize: "var(--text-h3)" }}>The workflow, not the tool</p>
      </div>
      <div className="flex justify-center py-3 text-green"><ArrowDown className="h-5 w-5" aria-hidden /></div>
      <div className="grid gap-2 sm:grid-cols-2">
        {outcomes.map((outcome) => <div key={outcome.label} className={`rounded-lg px-4 py-3 text-center font-semibold ${outcome.tone}`} style={{ fontSize: "var(--text-label)" }}>{outcome.label}</div>)}
      </div>
      <p className="mt-5 text-fg-muted-dark" style={{ fontSize: "var(--text-label)", lineHeight: 1.5 }}>The audit earns the next decision. It does not assume the answer is an automation.</p>
    </div>
  );
}

export function SessionLoopVisual() {
  const steps = [
    { label: "Frame", detail: "Task, source, approved information" },
    { label: "Think with AI", detail: "Prepare, classify, retrieve, or draft" },
    { label: "Verify and decide", detail: "Check the output; a person owns the call" },
  ];
  return (
    <div className="rounded-card border border-border bg-white p-5 shadow-card md:p-7">
      <p className="font-mono text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-emerald">Safe-use loop</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.label} className="relative rounded-lg border border-border bg-surface-muted p-4">
            <span className="font-mono text-[0.68rem] font-bold text-emerald">0{index + 1}</span>
            <p className="mt-3 font-display font-bold text-fg" style={{ fontSize: "var(--text-small)" }}>{step.label}</p>
            <p className="mt-2 text-fg-2" style={{ fontSize: "var(--text-label)", lineHeight: 1.45 }}>{step.detail}</p>
            {index < steps.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-emerald md:block" aria-hidden />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-3 rounded-lg border border-[#d6b77a]/50 bg-[#f8f0e1] p-4 text-[#5c431c]">
        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p style={{ fontSize: "var(--text-label)", lineHeight: 1.5 }}>Sensitive, unsupported, or high-impact inputs pause the flow for a human decision.</p>
      </div>
    </div>
  );
}

export function MiniOwnerCard({
  name,
  role,
  tone = "light",
}: {
  name: string;
  role: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={`flex items-center gap-3 rounded-lg border p-3 ${dark ? "border-white/12 bg-white/[0.045]" : "border-border bg-white"}`}>
      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${dark ? "bg-green text-ink" : "bg-emerald text-fg-on-dark"}`}><UserRound className="h-4 w-4" aria-hidden /></div>
      <div>
        <p className={`font-semibold ${dark ? "text-fg-on-dark" : "text-fg"}`} style={{ fontSize: "var(--text-label)" }}>{name}</p>
        <p className={dark ? "text-fg-muted-dark" : "text-fg-3"} style={{ fontSize: "var(--text-micro)" }}>{role}</p>
      </div>
    </div>
  );
}
