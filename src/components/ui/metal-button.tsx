"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MetalFxPreset = "chromatic" | "silver" | "gold";
type MetalFxTheme = "dark" | "light";

type MetalButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  full?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  preset?: MetalFxPreset;
  theme?: MetalFxTheme;
  dataBookingIntent?: "identify" | "training";
};

const buttonClassName =
  "relative inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 font-bold leading-none whitespace-nowrap transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none";

export function MetalButton({
  href,
  children,
  className,
  full = false,
  disabled = false,
  onClick,
  preset = "silver",
  theme = "light",
  dataBookingIntent,
}: MetalButtonProps) {
  const classes = cn(buttonClassName, full ? "w-full" : "w-fit", disabled && "pointer-events-none cursor-not-allowed opacity-50", className);
  const dataAttributes = dataBookingIntent ? { "data-booking-intent": dataBookingIntent } : {};

  const inner = href ? (
    /^(?:https?:|mailto:|tel:|#)/.test(href) ? (
      <a href={disabled ? undefined : href} onClick={(event) => onClick?.(event)} className={classes} aria-disabled={disabled} {...dataAttributes}>
        {children}
      </a>
    ) : (
      <Link href={href} onClick={(event) => onClick?.(event)} className={classes} aria-disabled={disabled} {...dataAttributes}>
        {children}
      </Link>
    )
  ) : (
    <button type="button" disabled={disabled} onClick={(event) => onClick?.(event)} className={classes} {...dataAttributes}>
      {children}
    </button>
  );

  return (
    <span
      className={cn("metal-button-shell inline-flex min-h-12 min-w-12", full ? "w-full" : "w-fit")}
      data-preset={preset}
      data-theme={theme}
    >
      {inner}
    </span>
  );
}
