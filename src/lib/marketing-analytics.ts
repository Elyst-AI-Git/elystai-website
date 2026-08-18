"use client";

import { track } from "@vercel/analytics";

export type BookingIntent = "audit" | "training";

export const CAL_BOOKING_URL = "https://cal.com/elyst-ai/30min";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
const UTM_STORAGE_KEY = "elyst_utm_parameters";
const INTERNAL_STORAGE_KEY = "elyst_internal_traffic";

function readStoredUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([key, value]) => UTM_KEYS.includes(key as (typeof UTM_KEYS)[number]) && typeof value === "string"
      )
    );
  } catch {
    return {};
  }
}

/** Capture campaign parameters once so they survive navigation to Cal.com. */
export function captureArrivalUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const current = new URLSearchParams(window.location.search);
    const stored = readStoredUtm();
    let changed = false;
    for (const key of UTM_KEYS) {
      const value = current.get(key);
      if (value && !stored[key]) {
        stored[key] = value;
        changed = true;
      }
    }
    if (changed) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
    }
  } catch {
    // Marketing metadata must never affect the page.
  }
}

export function bookingHref(intent: BookingIntent): string {
  const url = new URL(CAL_BOOKING_URL);
  const stored = readStoredUtm();
  const context = intent === "audit" ? "ai_workflow_audit_call" : "team_ai_training_session";

  for (const key of UTM_KEYS) {
    if (stored[key]) url.searchParams.set(key, stored[key]);
  }

  url.searchParams.set("utm_source", stored.utm_source ?? "elyst-site");
  url.searchParams.set("utm_medium", stored.utm_medium ?? "website");
  url.searchParams.set("utm_campaign", stored.utm_campaign ?? context);
  url.searchParams.set(
    "utm_content",
    stored.utm_content ? `${stored.utm_content}_${context}` : context
  );

  return url.toString();
}

export function trackBookingIntent(intent: BookingIntent): void {
  track(intent === "audit" ? "audit_cta_click" : "training_cta_click", {
    booking_type: intent,
  });
  track("scheduler_view", { booking_type: intent });
}

export function trackBookingComplete(intent: BookingIntent): void {
  track("booking_complete", { booking_type: intent });
}

export function trackTrainingEnquiry(): void {
  track("training_enquiry_submit", { booking_type: "training" });
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
