import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type CanvasRevealEffectProps = {
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
};

function rgba(color: number[] | undefined, opacity: number) {
  const [red = 255, green = 255, blue = 255] = color ?? [];
  return `rgb(${red} ${green} ${blue} / ${opacity})`;
}

/**
 * Static, paint-only dither texture.
 *
 * The previous implementation created a WebGL canvas for every card and
 * background texture. These effects are decorative and do not animate, so a
 * CSS texture has the same visual job without creating GPU contexts or adding
 * the Three.js runtime to every page that uses it.
 */
export function CanvasRevealEffect({
  opacities = [0.3, 0.5, 0.8],
  colors = [[0, 223, 130], [3, 98, 76], [255, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: CanvasRevealEffectProps) {
  const strongestOpacity = Math.max(...opacities, 0.3);
  const dotColor = rgba(colors[0], Math.min(strongestOpacity, 0.72));
  const secondaryDot = rgba(colors[1] ?? colors[0], Math.min(strongestOpacity * 0.58, 0.42));
  const highlightDot = rgba(colors[2] ?? colors[0], Math.min(strongestOpacity * 0.42, 0.26));
  const dotRadius = Math.max(0.65, Math.min(dotSize * 0.38, 1.35));
  const cellSize = Math.max(5, dotSize * 3.5);

  const textureStyle = {
    backgroundImage: [
      `radial-gradient(circle at ${dotRadius}px ${dotRadius}px, ${dotColor} 0 ${dotRadius}px, transparent ${dotRadius + 0.4}px)`,
      `radial-gradient(circle at ${cellSize * 0.62}px ${cellSize * 0.42}px, ${secondaryDot} 0 ${Math.max(0.45, dotRadius * 0.62)}px, transparent ${Math.max(0.8, dotRadius * 0.62 + 0.35)}px)`,
      `radial-gradient(circle at ${cellSize * 0.28}px ${cellSize * 0.76}px, ${highlightDot} 0 ${Math.max(0.4, dotRadius * 0.48)}px, transparent ${Math.max(0.75, dotRadius * 0.48 + 0.3)}px)`,
    ].join(", "),
    backgroundSize: `${cellSize}px ${cellSize}px`,
  } satisfies CSSProperties;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative h-full w-full overflow-hidden bg-[var(--surface-dark)]",
        containerClassName,
      )}
      style={textureStyle}
    >
      {showGradient ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--surface-dark) 0%, var(--surface-dark) 75%, transparent 100%)" }}
        />
      ) : null}
    </div>
  );
}
