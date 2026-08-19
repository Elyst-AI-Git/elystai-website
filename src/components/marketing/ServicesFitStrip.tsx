import { Check, X } from "lucide-react";
import type { CSSProperties } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import DotPattern from "@/components/ui/dot-pattern";

export function ServicesFitStrip({
  children,
  rotation,
  kind,
}: {
  children: string;
  rotation: number;
  kind: "no" | "yes";
}) {
  const isYes = kind === "yes";
  const style = {
    "--services-fit-rotation": `${rotation}deg`,
    borderColor: isYes
      ? "color-mix(in srgb, var(--elyst-green) 42%, var(--border))"
      : "color-mix(in srgb, var(--elyst-red-muted) 42%, var(--border))",
    background: isYes
      ? "color-mix(in srgb, var(--elyst-green) 5%, var(--bg))"
      : "color-mix(in srgb, var(--elyst-red-muted) 5%, var(--bg))",
  } as CSSProperties;

  return (
    <div
      className="services-fit-strip relative flex min-h-20 w-full items-center gap-4 overflow-hidden rounded-md border px-5 py-5 text-fg-2 shadow-card"
      style={style}
    >
      {!isYes ? (
        <DotPattern
          width={22}
          height={22}
          cx={1}
          cy={1}
          cr={0.65}
          className="z-0 opacity-25"
          style={{ color: "var(--elyst-red-muted)" }}
        />
      ) : null}
      <BorderBeam
        size={180}
        duration={8}
        borderWidth={1}
        colorFrom={isYes ? "var(--elyst-green)" : "var(--elyst-red-muted)"}
        colorTo={isYes ? "var(--elyst-green)" : "var(--elyst-red-muted)"}
      />
      {isYes ? (
        <Check className="relative z-10 size-5 shrink-0 text-emerald" strokeWidth={2.2} aria-hidden />
      ) : (
        <X className="relative z-10 size-5 shrink-0" style={{ color: "var(--elyst-red-muted)" }} strokeWidth={2.2} aria-hidden />
      )}
      <span className="relative z-10" style={{ fontSize: "var(--text-body)", lineHeight: 1.35 }}>&ldquo;{children}&rdquo;</span>
    </div>
  );
}
