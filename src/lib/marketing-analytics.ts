"use client";

import { track } from "@vercel/analytics";
import type { BookingIntent } from "@/lib/booking";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const UTM_STORAGE_KEY = "elyst_utm_parameters";
const INTERNAL_STORAGE_KEY = "elyst_internal_traffic";

export function readStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored) as unknown;
    if (!parsed || typeof parsed !== "object") return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([key, value]) =>
          UTM_KEYS.includes(key as (typeof UTM_KEYS)[number]) &&
          typeof value === "string",
      ),
    );
  } catch {
    return {};
  }
}

export function captureArrivalUtm(): void {
  if (typeof window === "undefined") return;

  try {
    const current = new URLSearchParams(window.location.search);
    const stored = readStoredUtm();
    let changed = false;

    for (const key of UTM_KEYS) {
      const value = current.get(key);
      if (value && stored[key] !== value) {
        stored[key] = value;
        changed = true;
      }
    }

    if (changed) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
    }
  } catch {
    // Campaign metadata must never affect navigation.
  }
}

export function appendStoredUtm(href: string): string {
  const url = new URL(href, window.location.origin);

  for (const [key, value] of Object.entries(readStoredUtm())) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

export function trackBookingCta(intent: BookingIntent): void {
  track(intent === "identify" ? "identify_cta_click" : "training_cta_click", {
    booking_type: intent,
  });
}

export function trackSchedulerView(intent: BookingIntent): void {
  track("scheduler_view", { booking_type: intent });
}

export function trackBookingComplete(intent: BookingIntent): void {
  track("booking_complete", { booking_type: intent });
}

export function captureInternalTrafficMarker(): void {
  if (typeof window === "undefined") return;

  try {
    if (new URLSearchParams(window.location.search).get("internal") === "1") {
      window.localStorage.setItem(INTERNAL_STORAGE_KEY, "1");
    }
  } catch {
    // Filtering is best effort only.
  }
}

export function isInternalTraffic(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return (
      new URLSearchParams(window.location.search).get("internal") === "1" ||
      window.localStorage.getItem(INTERNAL_STORAGE_KEY) === "1"
    );
  } catch {
    return false;
  }
}
