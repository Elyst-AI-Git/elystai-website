# Fixes Applied & Verification

Branch: `feat/interaction-logging`. Every fix was verified against the live staging project (`elyst-ai-test` + Razorpay Test mode) using real orders and signed webhooks. `tsc` clean, `npm run build` passes.

---

## Issue 3 — pricing divergence (₹2,399 vs ₹2,999) — ✅ FIXED & VERIFIED

Changes:
- New `src/lib/pricing.ts` — one `computeCheckoutQuote()` used by **both** the display path (`/api/checkout/discount-status`) and the charge path (`/api/checkout/order`). Display and charge can no longer drift.
- `discount-status` now returns the authoritative `amount` / `originalAmount` (paise). `RegisterForm.tsx` renders those numbers via `formatPaise()` instead of the hardcoded `"₹2,399"` / `"₹2,999"` literals.
- `checkout/order/route.ts` reworked: discount is computed **before** the order-reuse check. An existing `created` order is only reused if its amount still matches the current-membership price; if membership changed, the stale order is marked `failed` (superseded) and a fresh order is minted at the correct price.

Verification (staging):
- Non-member order → `299900`. User added to Circle. Re-checkout → **`239900` with a NEW order id**; old order flipped to `failed`. Logged as `order.supersede {oldAmount:299900,newAmount:239900}`.
- `discount-status` for the member returns `{isCircleMember:true, amount:239900, originalAmount:299900}` — display now equals charge.

## Issue 4 — payment not shown processed — ✅ FIXED & VERIFIED

Changes:
- New `src/app/api/checkout/verify/route.ts` — verifies the `razorpay_signature` (`HMAC(order_id|payment_id, key_secret)`) server-side on return, confirms the order belongs to the logged-in user, and flips payment→`paid` + enrollment→`active` **synchronously**, idempotent with the webhook. The webhook stays as the durable backstop.
- `RegisterForm.tsx` Razorpay `handler` now POSTs to `/api/checkout/verify` before redirecting.

Verification (staging):
- Valid signature → `{status:"active"}`, enrollment active, payment paid. `verify.activated` logged once.
- Second call → still active, **no re-activation, no second email** (idempotent).
- Bad signature → `400 Invalid payment signature`.
- Webhook path unchanged and still activates independently (tested valid/bad/duplicate/tampered earlier).

Note: this fixes the *client-return* limbo. In production the webhook must also be correctly registered (see `06-razorpay-webhook-setup`), which removes the last dependency for users who close the tab before the handler runs.

## Issue 1 — confirmation email not sent — ✅ IMPLEMENTED & VERIFIED (needs provider key to deliver)

Changes:
- Migration `0010_enrollment_confirmation_sent.sql` — `app.enrollments.confirmation_sent_at` as an atomic single-fire claim token.
- New `src/lib/email.ts` — `claimAndSendConfirmation()` atomically claims the slot (`update ... where confirmation_sent_at is null`) and sends via Resend's HTTP API, **only if `RESEND_API_KEY` is set**; otherwise logs `email.confirmation.skipped`. Called from **both** the webhook and the verify route.

Verification (staging):
- Webhook activation → email claimed, `email.confirmation.skipped` logged **once**; duplicate webhook delivery → **no second email**.
- Verify activation → same single-fire behaviour.

Remaining to actually deliver mail: set `RESEND_API_KEY` + `EMAIL_FROM` (verified domain) in the deploy env. The code then logs `email.confirmation.sent`.

## Issue 2 — OTP not received — ⚠️ CODE FIXED; CONFIG BLOCKED ON CUSTOM SMTP

Changes:
- `RegisterForm.tsx` — removed `emailRedirectTo` from `signInWithOtp`, so Supabase stays in numeric-code mode (matching the 6-digit UI) instead of switching to magic-link.

Config (confirmed blocked on the platform, not code):
- Attempting to set the `{{ .Token }}` email template returned: *"Email template modification is not available for free tier projects using the default email provider. Please upgrade or configure a custom SMTP provider."*
- Attempting to raise the email rate limit returned: *"Custom SMTP required to configure RATE_LIMIT_EMAIL_SENT."*

So issue 2 is **only fully fixable with a custom SMTP provider** (Resend/SES/Postmark) connected in Supabase Auth. Once that's done: (1) set the magic-link template to use `{{ .Token }}`, (2) raise `rate_limit_email_sent`. Both can then be applied via the Management API in seconds. Until then, the built-in SMTP sends at most 2/hour and only a link — the confirmed root cause.

---

## Net status (updated 2026-07-02 — email + OTP now live)
| Issue | Code | Config/infra | Verified |
|-------|------|---------------------|----------|
| 3 pricing | ✅ done | none | ✅ |
| 4 payment confirm | ✅ done | webhook registered (secret set) | ✅ |
| 1 email | ✅ done | Resend key + verified domain `auth.elystai.com` | ✅ **delivered live** (`email.confirmation.sent`) |
| 2 OTP | ✅ done | custom SMTP (Resend) + `{{ .Token }}` template + rate limit 30/h | ✅ **code delivered live** |

Custom SMTP was connected in the staging Supabase (`smtp.resend.com`, sender `login@auth.elystai.com`), the OTP template was switched to `{{ .Token }}`, and a real confirmation email + a real OTP were both sent successfully on staging. The 23/23 edge-case matrix passes including the real Razorpay webhook secret.

Remaining is production parity only: set `RESEND_API_KEY` + `EMAIL_FROM` on Vercel, replicate the SMTP + template config on the production Supabase project, run migrations 0009+0010 on production, then merge.
