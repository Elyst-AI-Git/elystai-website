type VisualProps = {
  className?: string;
};

export type OutcomeVisualId = "reality" | "habits" | "workflows";
export type ArchiveVisualId = "circle" | "work" | "yathra" | "juniors";
export type FormatVisualId = "half-day" | "full-day" | "multi-session";

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

export function FormatVisual({ id, className = "" }: VisualProps & { id: FormatVisualId }) {
  if (id === "half-day") {
    return (
      <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} role="img" aria-label="A focused half-day session represented by a clock">
        <circle cx="110" cy="60" r="38" stroke="currentColor" strokeWidth="7" className="text-fg-on-dark/65" />
        <path d="M110 22A38 38 0 0 1 144 44" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-fg-on-dark" />
        <path d="M110 60V39M110 60L127 70" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="text-fg-on-dark" />
      </svg>
    );
  }

  if (id === "full-day") {
    return (
      <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} role="img" aria-label="A full-day session with time for participation and application">
        <path d="M28 60H192" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-fg-on-dark/65" />
        {[38, 77, 116, 155, 192].map((x, index) => (
          <circle key={x} cx={x} cy="60" r="13" fill="currentColor" className={index === 2 ? "text-fg-on-dark" : "text-fg-on-dark/65"} />
        ))}
        <path d="M77 60V35M155 60V85" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-fg-on-dark/65" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 120" fill="none" className={`h-auto w-full ${className}`} role="img" aria-label="Several linked sessions building capability over time">
      <rect x="28" y="30" width="46" height="46" rx="10" stroke="currentColor" strokeWidth="7" className="text-fg-on-dark/65" />
      <rect x="87" y="30" width="46" height="46" rx="10" stroke="currentColor" strokeWidth="7" className="text-fg-on-dark/65" />
      <rect x="146" y="30" width="46" height="46" rx="10" fill="currentColor" className="text-fg-on-dark" />
      <path d="M74 53H87M133 53H146" stroke="currentColor" strokeWidth="7" strokeLinecap="round" className="text-fg-on-dark" />
      <path d="M51 90H169" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-fg-on-dark/65" />
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
