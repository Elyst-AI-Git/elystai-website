import { Check, X } from "lucide-react";
import type { CSSProperties } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

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
      ? "var(--surface-accent-soft)"
      : "color-mix(in srgb, var(--elyst-red-muted) 5%, var(--bg))",
    borderWidth: "1.875px",
  } as CSSProperties;

  return (
    <div
      className="services-fit-strip relative flex min-h-20 w-full items-center gap-4 overflow-hidden rounded-md border px-5 py-5 text-fg-2 shadow-card"
      style={style}
    >
      <CanvasRevealEffect
        colors={
          isYes
            ? [[0, 223, 130], [3, 98, 76], [255, 255, 255]]
            : [[174, 78, 71], [174, 78, 71], [255, 255, 255]]
        }
        opacities={[0.2, 0.2, 0.2, 0.35, 0.35, 0.45, 0.6, 0.7, 0.8, 0.9]}
        containerClassName="absolute inset-y-0 right-0 z-0 w-1/4 !bg-transparent"
        dotSize={2}
        showGradient={false}
      />
      <BorderBeam
        size={180}
        duration={8}
        borderWidth={1.875}
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
