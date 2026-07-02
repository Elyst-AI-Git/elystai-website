# Staging Test Results — Empirical Run

Environment: Supabase project `elyst-ai-test` (`cmihoglafjxtswtbitsz`, ap-southeast-1) + Razorpay **Test mode** (`rzp_test_T8JoBqOYyptjOw`). App run locally against staging env on `:3100`. All 10 migrations applied, `app` schema exposed, seeded with: course `ai-for-work`, one `open` batch at `base_price_amount = 299900` (₹2,999), Circle segment `percent = 20`, member emails.

Test users (created via Admin API, real sessions):
- `test-circle@elyst.dev` — Circle member
- `test-plain@elyst.dev` — non-member (later added to Circle to test the race)
- `test-noenroll@elyst.dev` — never checked out

Legend: ✅ behaves correctly · ❌ confirmed defect.

---

## Reported issues — verdicts

### Issue 3 — ₹2,399 vs ₹2,999 — ❌ CONFIRMED (reproduced)
Real Razorpay test orders:
- Member fresh order → `amount = 239900` (₹2,399) ✅ correct
- Non-member fresh order → `amount = 299900` (₹2,999) ✅ correct
- **Stale-order reuse (the bug):** non-member created an order at 299900, was then added to the Circle segment (`discount-status` now returns `isCircleMember: true`, so the page renders ₹2,399), and on re-checkout the route **returned the same order at 299900**. Page shows ₹2,399, GPay charges ₹2,999. Exact reported symptom.

Root cause: the "reuse existing `created` payment" branch in `checkout/order/route.ts` returns the old order's amount without re-evaluating membership. Note: the pricing *math* is correct (20% of 299900 rounds to exactly ₹2,399) — this is purely the reuse path serving a stale amount, plus the display coming from a hardcoded literal instead of the order.

Captured by the new logging as `order.create.response { reusedOrder: true, amount: 299900 }` next to `discount-status = member` — support can now see the divergence directly.

### Issue 2 — OTP not received — ❌ CONFIRMED (config)
Read from the live Supabase auth config:
- `smtp_host: none` → built-in shared SMTP, `rate_limit_email_sent: 2` **per hour**. A launch throttles almost instantly.
- Magic-link template ships the default `{{ .ConfirmationURL }}` (a clickable link), but the app UI (`verifyOtp type:"email"`) expects a **6-digit code**. Even a delivered email has no code to type.
- Code sets `emailRedirectTo` on `signInWithOtp`, which biases Supabase toward the link flow.

Fix: custom SMTP (Resend/SES/Postmark), template using `{{ .Token }}`, raise the rate limit, and drop/reconcile `emailRedirectTo`. (Production config must be checked the same way — not touched here.)

### Issue 4 — payment not shown processed — ✅ handler correct; ❌ delivery-dependent
The webhook handler itself is solid:
- Valid signed `order.paid` → enrollment `active`, payment `paid`, `paid_at` set. ✅
- Bad signature → `400`, **no activation**. This is exactly the failure that leaves a paid user in limbo if the webhook secret is wrong.
- Duplicate delivery (same event id) → `duplicate`, no double activation. ✅
- Tampered amount (100 paise on a 239900 order) → `400 mismatch`, no activation. ✅ (security guard holds)

So issue 4 is **not** a handler bug. In production it is caused by webhook *configuration/delivery*: missing webhook, wrong `RAZORPAY_WEBHOOK_SECRET` (→ 400 path), unsubscribed events, or delivery slower than the confirmation page's 7.5s poll window. Fixes: register the Test/Live webhook correctly, and add synchronous `razorpay_signature` verification on return so the user is confirmed immediately, with the webhook as backstop.

### Issue 1 — confirmation email — ❌ CONFIRMED (not implemented)
No mail-sending code exists. The correct single-fire hook point is the webhook on `enrollment → active`, which is now observable via the `webhook.activated` log event. Nothing sends today.

---

## Other flows — all ✅

| Test | Result |
|------|--------|
| discount-status member / non-member | ✅ true / false |
| checkout unauthenticated | ✅ 401 |
| missing city | ✅ 400 "City is required" |
| already-active member re-orders | ✅ 409 "already enrolled" |
| onboarding with no enrollment | ✅ 403 |
| events beacon unauthenticated | ✅ 204 (silently dropped) |
| webhook duplicate | ✅ 200 "duplicate", no double activation |
| webhook tampered amount | ✅ 400 mismatch |
| payment.failed | ✅ payment → `failed`, enrollment stays `pending` |

## Interaction logging — ✅ validated end to end
Every leg was captured and joined by one `correlation_id` recovered from the Razorpay order `notes`: `order.create.request/response` (server), `webhook.received/activated` (webhook). The stale-order divergence and the full paid journey are both reconstructable from a single id — the exact capability needed to answer "I paid and got nothing."

---

## Priority fix list (each mapped to its verifying test)
1. **Issue 3 (High):** stop reusing a stale-priced order across membership changes; render the order's actual amount, never a literal. Verify with the stale-order reuse repro.
2. **Issue 2 (High):** custom SMTP + `{{ .Token }}` template + rate limit + reconcile `emailRedirectTo`. Verify by receiving a real code.
3. **Issue 4 (High):** correct webhook registration + synchronous verify-on-return. Verify with T-W1/T-W2.
4. **Issue 1 (High):** send a confirmation email/WhatsApp from `webhook.activated`, idempotently. Verify with T-E1/T-E2.
