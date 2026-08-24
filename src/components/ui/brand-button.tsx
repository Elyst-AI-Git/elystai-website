"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MetalButton } from "@/components/ui/metal-button";

export type BrandVariant = "metal" | "outline" | "solid";
export type BrandTone = "emerald" | "light" | "green";

export type BrandButtonProps = {
  href?: string;
  variant?: BrandVariant;
  tone?: BrandTone;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  full?: boolean;
  disabled?: boolean;
  analyticsIntent?: "identify" | "training";
  preset?: "chromatic" | "silver" | "gold";
};

const baseClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-md px-6 font-bold leading-none transition-[background-color,color,border-color,transform,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transition-none";

const toneClasses: Record<BrandTone, string> = {
  emerald: "bg-emerald text-fg-on-dark hover:bg-emerald-light",
  light: "bg-surface-light text-ink hover:bg-surface-muted",
  green: "bg-green text-ink hover:bg-green-mid",
};

const outlineClasses: Record<BrandTone, string> = {
  emerald: "border border-emerald bg-transparent text-emerald hover:bg-emerald/5",
  light: "border border-white/35 bg-transparent text-fg-on-dark hover:bg-white/8",
  green: "border border-green bg-transparent text-green hover:bg-green/8",
};

function getButtonClassName({
  variant,
  tone,
  full,
  disabled,
  className,
}: {
  variant: BrandVariant;
  tone: BrandTone;
  full: boolean;
  disabled: boolean;
  className?: string;
}) {
  return cn(
    baseClassName,
    "text-[length:var(--text-small)]",
    full ? "w-full" : "w-fit",
    variant === "outline" ? outlineClasses[tone] : toneClasses[tone],
    variant === "metal" && "brand-button-metal",
    disabled && "pointer-events-none cursor-not-allowed opacity-50",
    className,
  );
}

export function BrandButton({
  href,
  variant = "metal",
  tone = "emerald",
  className,
  children,
  onClick,
  full = false,
  disabled = false,
  analyticsIntent,
  preset = "silver",
}: BrandButtonProps) {
  if (variant === "metal") {
    return (
      <MetalButton
        href={href}
        full={full}
        disabled={disabled}
        onClick={onClick}
        preset={tone === "green" ? "silver" : preset}
        theme={tone === "light" ? "light" : "dark"}
        dataBookingIntent={analyticsIntent}
        className={cn(
          "text-[length:var(--text-small)]",
          toneClasses[tone],
          className,
        )}
      >
        {children}
      </MetalButton>
    );
  }

  const classes = getButtonClassName({ variant, tone, full, disabled, className });
  const dataAttributes = analyticsIntent
    ? { "data-booking-intent": analyticsIntent }
    : {};

  if (!href) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={(event) => onClick?.(event)}
        className={classes}
        {...dataAttributes}
      >
        {children}
      </button>
    );
  }

  if (disabled) {
    return (
      <span className={classes} aria-disabled="true" {...dataAttributes}>
        {children}
      </span>
    );
  }

  const sharedProps = {
    className: classes,
    ...dataAttributes,
    ...(onClick ? { onClick } : {}),
  };

  if (/^(?:https?:|mailto:|tel:|#)/.test(href)) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...sharedProps}>
      {children}
    </Link>
  );
}
