"use client";

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
        variant === "outline" ? outlineClasses[tone] : toneClasses[tone],
        className,
      )}
    >
      {children}
    </MetalButton>
  );
}
