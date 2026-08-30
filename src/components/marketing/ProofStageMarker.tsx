export default function ProofStageMarker({
  activeIndex,
  label,
  total = 4,
}: {
  activeIndex: number;
  label: string;
  total?: number;
}) {
  return (
    <div className="flex items-center gap-3 font-display text-emerald">
      <span aria-hidden className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, dot) => (
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
