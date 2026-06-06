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

type BrandVariant = "metal" | "outline";

type BrandButtonProps = {
  href?: string;
  variant?: BrandVariant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  full?: boolean;
  preset?: "chromatic" | "silver" | "gold";
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-bold whitespace-nowrap " +
  "min-h-[48px] px-6 text-[length:var(--text-small)] leading-none";

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
  className,
  children,
  onClick,
  full,
  preset = "silver",
}: BrandButtonProps) {
  const width = full ? "w-full" : "w-fit";

  if (variant === "outline") {
    return (
      <Inner
        href={href}
        onClick={onClick}
        className={`${BASE} ${width} rounded-[14px] border-[1.5px] border-emerald bg-white text-emerald transition-colors hover:bg-emerald/5 ${className ?? ""}`}
      >
        {children}
      </Inner>
    );
  }

  // metal variant — emerald fill + liquid-metal ring
  return (
    <MetalButton
      preset={preset}
      borderRadius={14}
      metalFxClassName={`${full ? "w-full" : ""} bg-emerald! text-fg-on-dark! hover:bg-emerald-light!`}
      className={`${BASE} ${width} rounded-[14px] text-fg-on-dark ${className ?? ""}`}
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
