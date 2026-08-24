type VisualProps = {
  className?: string;
};

export type OutcomeVisualId = "reality" | "habits" | "workflows";
export type ArchiveVisualId = "circle" | "work" | "yathra" | "juniors";

export function AudienceVisual({ kind, className = "" }: VisualProps & { kind: "team" | "department" }) {
  if (kind === "team") {
    return (
      <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
        <rect x="24" y="34" width="44" height="44" rx="12" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
        <rect x="88" y="34" width="44" height="44" rx="12" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
        <rect x="152" y="34" width="44" height="44" rx="12" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
        <path d="M14 56H206" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-green" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
      <path d="M28 91V30" stroke="currentColor" strokeWidth="13" strokeLinecap="round" className="text-fg-3" />
      <path d="M82 91V52" stroke="currentColor" strokeWidth="13" strokeLinecap="round" className="text-fg-3" />
      <path d="M136 91V40" stroke="currentColor" strokeWidth="13" strokeLinecap="round" className="text-fg-3" />
      <path d="M190 91V61" stroke="currentColor" strokeWidth="13" strokeLinecap="round" className="text-fg-3" />
      <path d="M12 69H206" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-green" />
    </svg>
  );
}

export function OutcomeVisual({ id, className = "" }: VisualProps & { id: OutcomeVisualId }) {
  if (id === "reality") {
    return (
      <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} role="img" aria-label="Different pieces of work checked against one real condition">
        <path d="M28 30H130" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-fg-3" />
        <path d="M28 60H174" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-fg-3" />
        <path d="M28 90H108" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-fg-3" />
        <circle cx="176" cy="60" r="15" fill="currentColor" className="text-green" />
      </svg>
    );
  }

  if (id === "habits") {
    return (
      <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} role="img" aria-label="A useful new habit fitting into the tools already used">
        <rect x="18" y="40" width="42" height="42" rx="10" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
        <rect x="72" y="40" width="42" height="42" rx="10" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
        <rect x="126" y="40" width="42" height="42" rx="10" fill="currentColor" className="text-green" />
        <rect x="180" y="40" width="22" height="42" rx="10" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} role="img" aria-label="A role-specific workflow practised end to end">
      <rect x="24" y="34" width="48" height="52" rx="13" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
      <rect x="86" y="34" width="48" height="52" rx="13" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
      <rect x="148" y="34" width="48" height="52" rx="13" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
      <path d="M42 60H178" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-green" />
    </svg>
  );
}

export function ArchiveVisual({ id, className = "" }: VisualProps & { id: ArchiveVisualId }) {
  if (id === "circle") {
    return (
      <svg viewBox="0 0 180 100" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
        <circle cx="58" cy="50" r="27" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
        <circle cx="90" cy="50" r="27" stroke="currentColor" strokeWidth="7" className="text-fg-3" />
        <circle cx="122" cy="50" r="27" stroke="currentColor" strokeWidth="7" className="text-green" />
      </svg>
    );
  }

  if (id === "work") {
    return (
      <svg viewBox="0 0 180 100" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
        <path d="M30 76V28" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-fg-3" />
        <path d="M72 76V47" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-fg-3" />
        <path d="M114 76V36" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-fg-3" />
        <path d="M156 76V20" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-green" />
      </svg>
    );
  }

  if (id === "yathra") {
    return (
      <svg viewBox="0 0 180 100" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
        <path d="M18 66C38 66 42 34 62 34C82 34 86 66 106 66C126 66 130 34 150 34" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-fg-3" />
        <circle cx="162" cy="34" r="14" fill="currentColor" className="text-green" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 180 100" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
      <circle cx="32" cy="30" r="8" fill="currentColor" className="text-fg-3" />
      <circle cx="74" cy="54" r="11" fill="currentColor" className="text-fg-3" />
      <circle cx="116" cy="28" r="9" fill="currentColor" className="text-fg-3" />
      <circle cx="150" cy="68" r="15" fill="currentColor" className="text-green" />
    </svg>
  );
}
