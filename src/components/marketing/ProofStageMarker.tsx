export default function ProofStageMarker({
  activeIndex,
  label,
}: {
  activeIndex: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 font-display text-emerald">
      <span aria-hidden className="flex items-center gap-1.5">
        {[0, 1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={`size-1.5 rounded-full ${dot === activeIndex ? "bg-emerald" : "bg-emerald/25"}`}
          />
        ))}
      </span>
      <span className="text-[0.8rem] font-semibold uppercase tracking-[var(--tracking-label)]">
        {label}
      </span>
    </div>
  );
}
