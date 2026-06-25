"use client";

/**
 * BrandButton — single reusable button for the whole site.
 *
 * `variant="metal"` (default) renders the cult-ui MetalButton (liquid-metal ring)
 * filled with the brand emerald. `variant="outline"` renders a clean dark-green
 * outline with a white interior (used for the "Explore programs" actions).
 *
 * Pass `href` to render as a link (Next <Link> for internal, <a> for external/hash).
 */
import * as React from "react";
import Link from "next/link";
import { MetalButton } from "@/components/ui/metal-button";
import { useIsTouch } from "@/lib/use-touch";

type BrandVariant = "metal" | "outline" | "solid";
/**
 * "emerald" = brand emerald fill (default).
 * "light"   = premium light-grey fill, black text (Nav CTA).
 * "green"   = brand bright-green (#00df82) fill, black text, blackish metal ring.
 */
type BrandTone = "emerald" | "light" | "green";

type BrandButtonProps = {
  href?: string;
  variant?: BrandVariant;
  tone?: BrandTone;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  full?: boolean;
  preset?: "chromatic" | "silver" | "gold";
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap " +
  "min-h-[48px] px-6 text-[length:var(--text-small)] leading-none";

/* Shared corner radius — matches the small arrow-icon button in the FinalCta
   panels (rounded-md, ~6px), the site's reference "curve" for every button. */
const RADIUS_CLASS = "rounded-md";
const RADIUS_PX = 6;

function Inner({ href, onClick, className, children }: {
  href?: string;
  onClick?: () => void;
  className: string;
  children: React.ReactNode;
}) {
  if (href) {
    const external = href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} onClick={onClick} className={className}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function BrandButton({
  href,
  variant = "metal",
  tone = "emerald",
  className,
  children,
  onClick,
  full,
  preset = "silver",
}: BrandButtonProps) {
  const width = full ? "w-full" : "w-fit";
  const isTouch = useIsTouch();

  if (variant === "outline") {
    return (
      <Inner
        href={href}
        onClick={onClick}
        className={`${BASE} ${width} ${RADIUS_CLASS} border-2 border-emerald bg-white text-emerald transition-colors hover:bg-emerald/5 ${className ?? ""}`}
      >
        {children}
      </Inner>
    );
  }

  // Flat, solid filled button — no metal shader, no glow. Used in the CTA
  // banners where a plain high-contrast action reads cleaner than the metal
  // ring. Tone picks the fill + a text colour with enough contrast on it.
  if (variant === "solid") {
    let solidFill: string;
    if (tone === "light") {
      solidFill = "bg-[#eef0ee] text-[#0a0a0a] hover:bg-[#e3e6e2]";
    } else if (tone === "green") {
      solidFill = "bg-green text-[#06140e] hover:bg-[#00c973]";
    } else {
      solidFill = "bg-emerald text-fg-on-dark hover:bg-emerald-light";
    }
    return (
      <Inner
        href={href}
        onClick={onClick}
        className={`${BASE} ${width} ${RADIUS_CLASS} ${solidFill} transition-colors ${className ?? ""}`}
      >
        {children}
      </Inner>
    );
  }

  const isLight = tone === "light";
  const isGreen = tone === "green";
  const onDark = !isLight && !isGreen;

  let fxFill: string;
  if (isLight) {
    fxFill = "bg-[#eef0ee]! text-[#0a0a0a]! hover:bg-[#e3e6e2]!";
  } else if (isGreen) {
    fxFill = "bg-green! text-[#0a0a0a]! hover:bg-[#00c973]!";
  } else {
    fxFill = "bg-emerald! text-fg-on-dark! hover:bg-emerald-light!";
  }

  // metal variant — emerald (default) / light-grey (Nav) / bright-green (See AIOS) fill.
  // The liquid-metal shader ring IS the effect; no outer glow.

  // MetalFx renders an animated liquid-metal shader behind every button. On
  // touch devices that's a continuous effect nobody can interact with (no
  // cursor to reflect), so render a flat static button with the same brand
  // fill/colors instead.
  if (isTouch) {
    return (
      <Inner
        href={href}
        onClick={onClick}
        className={`${BASE} ${width} ${RADIUS_CLASS} border-2 border-border ${fxFill} ${className ?? ""}`}
      >
        {children}
      </Inner>
    );
  }

  return (
    <MetalButton
      preset={isGreen ? "silver" : preset}
      theme={isGreen ? "dark" : isLight ? "light" : "auto"}
      borderRadius={RADIUS_PX}
      metalFxClassName={`${full ? "w-full" : ""} ${fxFill}`}
      className={`${BASE} ${width} ${RADIUS_CLASS} ${onDark ? "text-fg-on-dark" : "text-[#0a0a0a]"} ${className ?? ""}`}
      render={
        href ? (
          href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") ? (
            <a href={href} onClick={onClick} />
          ) : (
            <Link href={href} onClick={onClick} />
          )
        ) : undefined
      }
      onClick={!href ? onClick : undefined}
    >
      {children}
    </MetalButton>
  );
}
