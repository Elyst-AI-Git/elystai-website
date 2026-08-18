import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BorderBeamProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  paused?: boolean;
};

/**
 * A small, token-driven adaptation of the Border Beam pattern used in the
 * 21st.dev/Magic UI reference. The host supplies the quiet base border; this
 * layer only adds the travelling accent segment.
 */
export function BorderBeam({
  className,
  style,
  size = 180,
  duration = 8,
  anchor = 90,
  borderWidth = 1,
  colorFrom = "currentColor",
  colorTo = "currentColor",
  delay = 0,
  paused = false,
  ...props
}: BorderBeamProps) {
  const hostStyle = {
    ...style,
    "--border-beam-size": `${size}px`,
    "--border-beam-duration": `${duration}s`,
    "--border-beam-anchor": `${anchor}%`,
    "--border-beam-border-width": borderWidth,
  } as CSSProperties;

  const beamStyle = {
    width: `${size}px`,
    offsetAnchor: `${anchor}% 50%`,
    offsetPath: `rect(0 auto auto 0 round ${size}px)`,
    offsetRotate: "0deg",
    animation: `border-beam ${duration}s linear infinite`,
    animationDelay: `-${delay}s`,
    background: `linear-gradient(to left, transparent, ${colorFrom}, ${colorTo}, transparent)`,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] border-[calc(var(--border-beam-border-width)*1px)] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        paused && "border-beam-paused",
        className,
      )}
      style={hostStyle}
      {...props}
    >
      <div
        className="border-beam-motion absolute aspect-square [offset-rotate:0deg]"
        style={beamStyle}
      />
    </div>
  );
}
