type VisualProps = {
  className?: string;
};

export type FormatVisualId = "half-day" | "full-day" | "multi-session";

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
