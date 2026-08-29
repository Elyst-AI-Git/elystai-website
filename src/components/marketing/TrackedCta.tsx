"use client";

import { useEffect, useState, type ReactNode } from "react";
import { track } from "@vercel/analytics/react";
import { BrandButton } from "@/components/ui/brand-button";

// The training link is deliberately independent from the audit link. Set the
// public variable to the dedicated Cal.com event before launch.
export const AUDIT_CAL_URL = process.env.NEXT_PUBLIC_AUDIT_CAL_URL ?? "https://cal.com/elyst-ai/30min";
export const TRAINING_CAL_URL = process.env.NEXT_PUBLIC_TRAINING_CAL_URL ?? "https://cal.com/elyst-ai/training-session";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORAGE_KEY = "elyst_utm_params";

export type CtaIntent = "audit" | "training";

export const ANALYTICS_EVENTS = [
  "audit_cta_click",
  "training_cta_click",
  "scheduler_view",
  "booking_complete",
  "training_enquiry_submit",
] as const;

function storedUtm(): Record<string, string> {
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function captureUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const values = { ...storedUtm() };
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) values[key] = value;
  }
  try {
    if (Object.keys(values).length) window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(values));
  } catch {
    // Attribution must not affect navigation.
  }
  return values;
}

function withUtm(href: string, values: Record<string, string>) {
  const url = new URL(href);
  for (const key of UTM_KEYS) {
    if (values[key] && !url.searchParams.has(key)) url.searchParams.set(key, values[key]);
  }
  return url.toString();
}

function internalTraffic() {
  if (typeof window === "undefined") return true;
  const hostname = window.location.hostname;
  return process.env.NODE_ENV !== "production" || hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local");
}

function recordSchedulerIntent(intent: CtaIntent) {
  if (internalTraffic()) return;
  const event = intent === "audit" ? "audit_cta_click" : "training_cta_click";
  track(event, { intent, destination: "cal.com" });
  track("scheduler_view", { intent, destination: "cal.com" });
}

export function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}

export default function TrackedCta({
  label,
  intent,
  variant = "solid",
  tone = "emerald",
  className,
  full,
  onClick: afterClick,
}: {
  label: string;
  intent: CtaIntent;
  variant?: "metal" | "outline" | "solid";
  tone?: "emerald" | "light" | "green";
  className?: string;
  full?: boolean;
  onClick?: () => void;
}) {
  const baseHref = intent === "audit" ? AUDIT_CAL_URL : TRAINING_CAL_URL;
  const [href, setHref] = useState(baseHref);

  useEffect(() => {
    const timer = window.setTimeout(() => setHref(withUtm(baseHref, captureUtm())), 0);
    return () => window.clearTimeout(timer);
  }, [baseHref]);

  return (
    <BrandButton
      href={href}
      onClick={() => {
        recordSchedulerIntent(intent);
        afterClick?.();
      }}
      variant={variant}
      tone={tone}
      className={className}
      full={full}
    >
      {label}
    </BrandButton>
  );
}

export function TrackedExternalLink({
  children,
  intent,
  className,
}: {
  children: ReactNode;
  intent: CtaIntent;
  className?: string;
}) {
  const baseHref = intent === "audit" ? AUDIT_CAL_URL : TRAINING_CAL_URL;
  const [href, setHref] = useState(baseHref);

  useEffect(() => {
    const timer = window.setTimeout(() => setHref(withUtm(baseHref, captureUtm())), 0);
    return () => window.clearTimeout(timer);
  }, [baseHref]);

  return (
    <a href={href} onClick={() => recordSchedulerIntent(intent)} className={className}>
      {children}
    </a>
  );
}
