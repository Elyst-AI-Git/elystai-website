/**
 * AI for Work — single source of truth for the launch details that Shirin will
 * paste in just before going live. Every section reads from here, so updating a
 * link or a time happens in exactly one place.
 *
 * TODO(launch): replace the placeholder values below with the real ones.
 */

/** Razorpay payment link — the primary "Pay & enrol now" destination. */
export const RAZORPAY_URL = "#"; // TODO(launch): paste Razorpay payment link

/** One-time price, shown in the hero CTA, the pricing card and the FAQ. */
export const PRICE = "₹2,900";

/** Human-readable session schedule (days + timings). */
export const SESSION_SCHEDULE = "Schedule announced soon"; // TODO(launch): e.g. "Mon–Fri, 8–9pm IST"

/** Quick facts shown as the hero stat row. */
export const QUICK_FACTS = [
  "2 weeks",
  "7 live sessions",
  "100% online",
  "Activity-based",
  "Certificate",
];

/** What every ticket includes — reused by the pricing card. */
export const INCLUDED = [
  "7 live sessions",
  "Session recordings",
  "Materials & resources",
  "Activity-based learning",
  "Certificate on completion",
];
