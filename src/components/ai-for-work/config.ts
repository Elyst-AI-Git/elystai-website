/**
 * AI for Work — single source of truth for the launch details that Shirin will
 * paste in just before going live. Every section reads from here, so updating a
 * link or a time happens in exactly one place.
 *
 * TODO(launch): replace the placeholder values below with the real ones.
 */

/** Razorpay payment link — the primary "Pay & enrol now" destination. */
export const RAZORPAY_URL = "#"; // TODO(launch): paste Razorpay payment link

/** Current one-time price, shown in the hero CTA, the pricing card and the FAQ. */
export const PRICE = "₹2,999";

/** Original price — struck through next to the offer price on the pricing card. */
export const ORIGINAL_PRICE = "₹4,999";

/**
 * The full value stack — every deliverable in the box, surfaced before the
 * price by the "What you get" section.
 */
export const VALUE_STACK = [
  "7 live sessions with Q&A",
  "Full learning portal access",
  "Resource vault of prompts & skills",
  "3-Month access to the Circle",
  "1 month of follow-up support",
  "A certificate on completion",
];

/**
 * Scarcity & urgency on the pricing card. Real values go here just before
 * launch so the bar and deadline stay honest and easy to update.
 *
 * TODO(launch): set real seat counts and the actual launch-price deadline.
 */
export const SEATS_TOTAL = 20;
export const SEATS_LEFT = 12;
/** Human-readable deadline for the launch price. */
export const PRICE_DEADLINE = "this Sunday";

/** Discounted price for Elyst AI Circle members (shown as a ribbon). */
export const CIRCLE_PRICE = "₹2,399";

/** Cohort start date — shown as a ribbon on the pricing card. */
export const START_DATE = "July 13";
