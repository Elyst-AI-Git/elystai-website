# Elyst AI — Registration & Payment QA Report

Branch reviewed: `dev` @ `7a245d4` (matches `origin/dev`)
Scope: the full "Join now" → auth → checkout → Razorpay → onboarding → confirmation flow.
Method: static analysis of the live code paths, cross-checked against current Razorpay and Supabase docs. No code was changed. This is a findings report.

Flow map (files):
- Auth + checkout UI: `src/app/register/RegisterForm.tsx`
- Circle price check: `src/app/api/checkout/discount-status/route.ts`
- Order creation + server pricing: `src/app/api/checkout/order/route.ts`
- Payment confirmation source of truth: `src/app/api/webhooks/razorpay/route.ts`
- Post-payment survey: `src/app/register/onboarding/page.tsx` + `src/app/api/onboarding/route.ts`
- Final state: `src/app/register/confirmation/page.tsx`
- Pricing display constants: `src/components/ai-for-work/config.ts`

---

## The four reported issues — root cause

### Issue 1 — Payment confirmation email not sent

**Root cause: there is no confirmation-email code anywhere in the repo.**
A repo-wide search for any mail sender (Resend, SendGrid, Postmark, Nodemailer, SES, Mailgun, SMTP) returns nothing. The only email the system ever sends is the Supabase **auth** email (the login OTP). After a successful payment the user is only shown an on-screen confirmation and the copy "Our team will reach out via WhatsApp soon" (`confirmation/page.tsx:148`). No email is triggered on `enrollment → active`.

So this is not a bug that fails intermittently — the feature does not exist yet. The webhook (`webhooks/razorpay/route.ts`) is the natural place to fire it, right after the enrollment flips to `active`, because that is the one server-side point that is guaranteed to run exactly once per paid order.

Severity: High (customers pay and receive no receipt).

### Issue 2 — User not getting the OTP

Two independent, code-grounded causes, either of which produces "no code arrives":

1. **`emailRedirectTo` is set on `signInWithOtp`** (`RegisterForm.tsx:203`). Per Supabase docs, when `emailRedirectTo` is present Supabase can switch the email to the **magic-link** flow instead of the numeric-code flow. The UI then asks for a 6-digit code (`verifyOtp` with `type: "email"`, `RegisterForm.tsx:226-230`) that the email may never contain.
2. **Email template.** If the Supabase "Magic Link" template still uses `{{ .ConfirmationURL }}` and not `{{ .Token }}`, the email has a clickable link but no code to type. Users report "no OTP" because there is no visible code.
3. **Deliverability / rate limits.** Supabase's built-in SMTP is heavily rate-limited (a few emails/hour) and frequently lands in spam or is throttled at scale. A cohort launch (many signups in minutes) will silently hit this ceiling. Production needs a custom SMTP provider (Resend/SES/Postmark) configured in Supabase Auth.

Severity: High (blocks login entirely for affected users).

Sources: [Supabase passwordless email](https://supabase.com/docs/guides/auth/auth-email-passwordless), [signInWithOtp reference](https://supabase.com/docs/reference/javascript/auth-signinwithotp), [Auth emails not arriving](https://www.pingram.io/blog/supabase-auth-emails-not-arriving-troubleshooting-guide).

### Issue 3 — Razorpay shows ₹2,399 for Circle members, GPay shows ₹2,999

The price the customer *sees* and the price the customer is *charged* are produced by two different code paths that can disagree:

- **Displayed price** is a hardcoded literal: `RegisterForm.tsx:692` renders `isCircleMember ? "₹2,399" : "₹2,999"`, and `config.ts` hardcodes `CIRCLE_PRICE = "₹2,399"`, `PRICE_AMOUNT = 2999`. `isCircleMember` comes from `GET /api/checkout/discount-status`, which only checks segment membership — it never returns the actual amount.
- **Charged price** is computed independently server-side in `checkout/order/route.ts` from `batch.base_price_amount` (from the DB) minus a discount derived from `discount_segments.value` (from the DB). That computed `amount` is what goes to Razorpay and therefore to GPay.

They diverge whenever the DB does not reconcile to the literals, most plausibly:

1. **Stale-order reuse.** If a `created` payment already exists for the enrollment, the order route returns the *old* order's amount and never recomputes (`checkout/order/route.ts`, the `existingPayment?.razorpay_order_id` branch). A user who first hit checkout *before* being added to the Circle (or before the segment was activated) gets an order minted at 2999; after they are added, the page shows 2399 but checkout reuses the 2999 order. Result: page/Razorpay label says one thing, the UPI charge is the old amount.
2. **Segment value mismatch.** 20% of ₹2,999 is ₹599.80, so the "20% → ₹2,399" claim in the UI copy only holds if the DB `Circle` segment is configured to yield exactly ₹600 off (or a fixed ₹2,399). If the segment is `percent = 20`, the server rounds to ₹2,400, not ₹2,399. If the segment row is inactive, misnamed (the check is `name.toLowerCase() === "circle"`), or the member's email is not in `discount_segment_members`, the server charges full price while the copy still advertises the discount.
3. **Discount-status vs order disagreement.** `discount-status` and `order` run the same membership query separately. A race or data change between the two calls means the badge can say "member" while the order charges non-member price.

The fix direction (for the later work, not this report): the checkout API should return the authoritative amount, and the UI should render *that number*, never a literal. The price shown must be the price in the order.

Severity: High (billing/trust — customers charged more than advertised).

Sources: [Razorpay test UPI details](https://razorpay.com/docs/payments/payments/test-upi-details/), [Test & live modes](https://razorpay.com/docs/payments/dashboard/test-live-modes/).

### Issue 4 — "Payment processed" not shown after returning from Razorpay

The enrollment is flipped to `active` **only by the webhook** (`webhooks/razorpay/route.ts`, on `order.paid` / `payment.captured`). The client-side Razorpay `handler` (`RegisterForm.tsx:319-324`) does **no** server-side verification — it just redirects to `/register/onboarding`. The confirmation page then polls for `status = active` for **5 attempts × 1.5s = 7.5s total** (`confirmation/page.tsx:16-17,55-80`) and, if the webhook has not landed, shows "Confirming your payment… refresh in a minute."

So the user sees "not processed" whenever the webhook is late or never arrives. Webhook never arriving is common and has concrete causes:
- Webhook not registered in the Razorpay dashboard, or pointed at the wrong URL / a non-public URL.
- `RAZORPAY_WEBHOOK_SECRET` mismatch → signature check fails → 400, enrollment never activates (`webhooks/razorpay/route.ts` signature block).
- The `order.paid` / `payment.captured` events not subscribed.
- Webhook slower than 7.5s under load, so even a correct setup shows "pending" to fast users.

**Architectural gap:** relying solely on the async webhook, with no synchronous signature verification on return, is the direct cause. Razorpay's own guidance is to verify `razorpay_signature` server-side in the success handler as the immediate confirmation, and treat the webhook as the durable backstop. Today there is no `/api/checkout/verify` route.

Severity: High (paid customers see an unconfirmed/limbo state).

---

## Additional findings surfaced during review

- **A5 — No idempotent receipt/notification trigger.** Because activation happens in the webhook, that is also the only correct single-fire point for a confirmation email/WhatsApp. Right now nothing hangs off it. (Ties to Issue 1.)
- **A6 — Onboarding gate is weak by design.** `onboarding/route.ts` accepts a submit if *any* enrollment row exists (even `pending`). Intentional to avoid racing the webhook, but it means survey data can be written for a user whose payment later fails. Acceptable, but the report flags it so logging can distinguish "survey submitted, payment not confirmed."
- **A7 — Confirmation copy says "Payment Confirmed" before it is.** The onboarding page header reads "Payment Confirmed" (`onboarding/page.tsx`) purely on the presence of a `pending` enrollment, i.e. before the webhook confirms. A user whose payment ultimately fails still sees "Payment Confirmed" on the survey page.
- **A8 — No structured server logs.** Errors use `console.error` with free-text messages and no correlation id, order id, or user id tying a session together. When a real user reports "I paid and nothing happened," there is currently no way to reconstruct what their session did and what our servers answered. This is exactly what the logging phase must fix (see `03-logging-design.md`).
- **A9 — Amount check tolerance.** The webhook amount guard skips verification if `payload.payment.entity.amount` is absent (`eventAmount !== undefined` gate). For `order.paid` this can happen; the current code fails closed only when currency is present. Worth confirming against real sandbox payloads (see test matrix T-W3).

---

## Severity summary

| # | Issue | Severity | Root cause type |
|---|-------|----------|-----------------|
| 1 | Confirmation email not sent | High | Feature not implemented |
| 2 | OTP not received | High | Config (redirect + template + SMTP) |
| 3 | 2399 vs 2999 mismatch | High | Display literal vs server-computed amount; stale-order reuse |
| 4 | Payment not shown processed | High | Webhook-only activation, no sync verify |
| A7 | Premature "Payment Confirmed" copy | Medium | UI state derived from `pending` |
| A8 | No structured/correlated logging | Medium | Observability gap |
| A6/A9 | Onboarding gate / amount tolerance | Low | Edge cases to verify in sandbox |

All four reported issues are reproducible by reasoning from the code; the staging plan in `02-staging-and-test-plan.md` is how we confirm them empirically and prove the fixes before shipping.
