export const BOOKING_INTENTS = ["audit", "training"] as const;

export type BookingIntent = (typeof BOOKING_INTENTS)[number];

const DEFAULT_CALENDAR_URLS: Record<BookingIntent, string> = {
  // Preserve the verified live event until the two dedicated Cal events are
  // configured. Environment variables can switch each funnel independently.
  audit: "https://cal.com/elyst-ai/30min",
  training: "https://cal.com/elyst-ai/30min",
};

export const CALENDAR_URLS: Record<BookingIntent, string> = {
  audit: process.env.NEXT_PUBLIC_CAL_AUDIT_URL || DEFAULT_CALENDAR_URLS.audit,
  training:
    process.env.NEXT_PUBLIC_CAL_TRAINING_URL || DEFAULT_CALENDAR_URLS.training,
};

export function isBookingIntent(value: string): value is BookingIntent {
  return BOOKING_INTENTS.includes(value as BookingIntent);
}

export function bookingPageHref(intent: BookingIntent): string {
  return `/book/${intent}`;
}

export function calendarHref(
  intent: BookingIntent,
  campaignParameters: Record<string, string | string[] | undefined> = {},
): string {
  const url = new URL(CALENDAR_URLS[intent]);

  for (const [key, value] of Object.entries(campaignParameters)) {
    if (!key.startsWith("utm_") || typeof value !== "string" || !value) continue;
    url.searchParams.set(key, value);
  }

  url.searchParams.set("utm_source", url.searchParams.get("utm_source") ?? "elyst-site");
  url.searchParams.set("utm_medium", url.searchParams.get("utm_medium") ?? "website");
  url.searchParams.set(
    "utm_campaign",
    url.searchParams.get("utm_campaign") ??
      (intent === "audit" ? "ai_workflow_audit_call" : "team_ai_training_session"),
  );

  return url.toString();
}
