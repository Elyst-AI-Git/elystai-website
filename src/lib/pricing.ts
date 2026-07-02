/**
 * Single source of truth for checkout pricing.
 *
 * Both the price the page DISPLAYS (via /api/checkout/discount-status) and the
 * amount the order route CHARGES must come from this one function, so they can
 * never diverge (that divergence was Issue 3). All amounts are paise.
 */

export interface DiscountSegment {
  id: string;
  name: string;
  kind: string; // 'percent' | 'fixed'
  value: number; // percent (e.g. 20) or fixed paise
  active: boolean;
}

export interface CheckoutQuote {
  basePriceAmount: number; // paise
  amount: number; // paise, what gets charged
  discountAmount: number; // paise
  discountApplied: boolean;
  segmentId: string | null;
}

/**
 * Compute the final checkout amount for a batch given the user's matched
 * discount segment (or null). Only an active segment named "circle"
 * (case-insensitive) discounts. Rounding is done to whole rupees to match the
 * price shown to users; the result is clamped so bad segment data can never
 * push the charge to zero or negative.
 */
export function computeCheckoutQuote(
  basePriceAmount: number,
  segment: DiscountSegment | null
): CheckoutQuote {
  let discountAmount = 0;
  let discountApplied = false;
  let segmentId: string | null = null;

  if (segment && segment.active && segment.name.toLowerCase() === "circle") {
    discountApplied = true;
    segmentId = segment.id;
    if (segment.kind === "percent") {
      const percent = Number(segment.value);
      const rawDiscount = basePriceAmount * (percent / 100);
      const finalAmountRupees = Math.round((basePriceAmount - rawDiscount) / 100);
      discountAmount = basePriceAmount - finalAmountRupees * 100;
    } else if (segment.kind === "fixed") {
      const discountVal = Number(segment.value); // paise
      const finalAmountRupees = Math.round((basePriceAmount - discountVal) / 100);
      discountAmount = basePriceAmount - finalAmountRupees * 100;
    }
    discountAmount = Math.min(Math.max(discountAmount, 0), basePriceAmount);
  }

  return {
    basePriceAmount,
    amount: basePriceAmount - discountAmount,
    discountAmount,
    discountApplied,
    segmentId,
  };
}

/** Normalize the awkward embedded-join shape Supabase returns for the segment. */
export function segmentFromJoin(raw: unknown): DiscountSegment | null {
  const seg = (Array.isArray(raw) ? raw[0] : raw) as DiscountSegment | null;
  return seg ?? null;
}
