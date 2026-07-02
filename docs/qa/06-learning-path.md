# Learning Path — everything we did, how, and why

This is a walkthrough of the whole effort: the four bugs, the fixes, the logging system, the staging setup, and how it was all tested. Written so you can follow it end to end even if you didn't write the code.

---

## 0. The big picture

The registration flow is: **Join now → verify identity (OTP/Google) → enter contact details → pay on Razorpay → onboarding survey → confirmation**. Four things were breaking in that flow. We (a) found the root cause of each from the code, (b) built a safe staging copy to prove it, (c) fixed each, (d) re-tested, and (e) added logging so any future problem is traceable.

The mental model that matters most: **the webhook is the source of truth for "did they pay".** The browser can't be trusted to grant access (a user could fake it), so payment/enrollment rows are only written server-side after Razorpay confirms. Everything below respects that rule.

---

## 1. How the flow actually works (the map)

| Step | File | What happens |
|---|---|---|
| Identity | `src/app/register/RegisterForm.tsx` | Supabase Auth OTP or Google. |
| Price shown | `src/app/api/checkout/discount-status/route.ts` | Is this email a Circle member? What price? |
| Create order | `src/app/api/checkout/order/route.ts` | Computes amount, makes a Razorpay order, writes a `payments` row (`created`). |
| Pay | Razorpay checkout (hosted) | User pays; Razorpay calls our `handler`. |
| Confirm (sync) | `src/app/api/checkout/verify/route.ts` | **New.** Verifies signature, activates immediately. |
| Confirm (async) | `src/app/api/webhooks/razorpay/route.ts` | Razorpay's server calls us; activates + emails. The durable backstop. |
| Survey | `src/app/api/onboarding/route.ts` | Stores the survey. |
| Done | `src/app/register/confirmation/page.tsx` | Polls until enrollment is `active`. |

Data lives in Supabase: `app.enrollments` (the access grant), `app.payments` (money), `app.webhook_events` (idempotency), `public.discount_segments` + `discount_segment_members` (who gets a discount).

---

## 2. The four issues — what, why, fix, proof

### Issue 3 — price mismatch (₹2,399 shown, ₹2,999 charged)
- **Why:** the price the page *showed* and the price we *charged* came from two different pieces of code. The page had `"₹2,399"` hard-typed; the charge was computed on the server from the database. When a person became a Circle member *after* an order was already made, the old full-price order got reused — so the screen said 2,399 while the real charge was 2,999.
- **Fix:** one function, `src/lib/pricing.ts` → `computeCheckoutQuote()`, now feeds *both* the display and the charge, so they can't disagree. The order route recomputes the discount **before** deciding whether to reuse an old order; if the price changed, it throws away the stale order (marks it `failed`) and makes a fresh one.
- **Proof:** on staging, a non-member made a 2,999 order, joined Circle, re-checked out → got a **new** 2,999→2,399 order, old one marked `failed`, and the displayed price matched.

### Issue 4 — "payment not processed" after paying
- **Why:** the enrollment only turned `active` when Razorpay's **webhook** arrived. If the webhook was slow, misconfigured, or its secret didn't match, the user sat on a "confirming…" screen forever. There was no immediate check on return.
- **Fix:** a new route `src/app/api/checkout/verify/route.ts` verifies Razorpay's signature the moment the user returns and activates the enrollment **synchronously**. The webhook stays as the backstop; both are idempotent (whichever lands first wins, the other is a no-op).
- **Proof:** valid signature → instantly `active`; bad signature → 400; someone else's order → 404; running it twice → no double activation.

### Issue 1 — no confirmation email
- **Why:** there was simply no email-sending code anywhere. The feature didn't exist.
- **Fix:** `src/lib/email.ts` sends via Resend, called from both the webhook and the verify route. To guarantee it sends **exactly once** (not once per webhook retry, not twice from webhook+verify), we added `app.enrollments.confirmation_sent_at` (migration `0010`) as an atomic claim: whoever flips it from empty to a timestamp first is the only one who sends.
- **Proof:** on staging, a real email was delivered via Resend and logged as `email.confirmation.sent`; duplicate webhook delivery did **not** send a second copy.

### Issue 2 — OTP code never arrives
- **Why (two layers):** (1) the code set `emailRedirectTo`, which nudges Supabase to send a magic *link* instead of a *code*, but the screen asks for a 6-digit code. (2) Supabase's built-in email is capped at ~2/hour and its template didn't include the code (`{{ .Token }}`), and it can't be changed without a real email provider.
- **Fix:** removed `emailRedirectTo` (code). Connected **Resend as custom SMTP** in Supabase, then set the template to include `{{ .Token }}` and raised the rate limit to 30/hour (done via API once SMTP was active).
- **Proof:** OTP request now returns 200 and the email arrives with a 6-digit code.

---

## 3. The interaction logging system (the "black box recorder")

**Why:** when a user says "I paid and nothing happened," you need to see exactly what their session did and what our servers answered. Before, there was nothing.

**How:** every step of the journey writes a row to `app.interaction_events` (migration `0009`):
- A **correlation id** is minted in the browser at checkout and travels with every call — into the order request, stitched into the Razorpay order's `notes` (so the webhook can recover it), and into onboarding. One id ties the whole journey together.
- The server logs `order.create.request/response` (with the exact amount), `webhook.received/activated/failed`, `verify.activated`, `email.confirmation.sent/skipped/failed`, `order.supersede`, etc.
- `src/lib/logging.ts` is best-effort (never breaks the payment flow) and redacts secrets. `src/lib/log-client.ts` sends browser milestones to `/api/events`.

**How you use it:** in Supabase, open `app.interaction_events` and filter by `correlation_id` or `order_id` to replay any user's journey.

---

## 4. The staging setup (how we tested without risking production)

**Why:** you never test payments on real customer data or live money. Standard practice is a separate, identical environment.

**What we built:**
- A **second Supabase project** (`elyst-ai-test`, ref `cmihoglafjxtswtbitsz`) — same schema (all 10 migrations applied), empty of real data, seeded with a test course/batch/Circle discount.
- **Razorpay Test mode** keys — payments are simulated, no real money.
- A **Vercel preview** of the fix branch, wired to staging.
- Resend for email.

**How (the mechanics):** migrations and seeds were applied through the Supabase **Management API** using a personal access token; test users were created via the Admin API; authenticated API calls were tested by forging the Supabase session cookie from a password-grant login. All of this lives in throwaway scripts, and none of it touched production.

---

## 5. How the testing was done (industry practice we followed)

1. **Environment parity** — same migrations, separate data + keys.
2. **Payment simulation** — Razorpay test cards + `success@razorpay` / `failure@razorpay` UPI.
3. **Webhook contract testing** — signed payloads, idempotency, out-of-order, tampered-amount rejection.
4. **Negative + boundary testing** — bad phone, non-member email, bad signature, foreign order, double-click.
5. **Reconciliation** — the amount shown == the order amount == what's in `payments`.
6. **A repeatable matrix** — 23 automated checks, all green.

---

## 6. What's left / what now

**Done and verified:** all four fixes, the logging, staging, email + OTP delivery.

**Still on your plate:**
1. **Set the confirmation-email env vars on Vercel** (Preview + Production): `RESEND_API_KEY` = the "payment confirmation" key, `EMAIL_FROM` = `Elyst AI <noreply@auth.elystai.com>`.
2. **Run migrations `0009` + `0010` on the production Supabase project** when this merges (staging already has them). Also apply the OTP `{{ .Token }}` template + custom SMTP on the *production* Supabase project — staging and production are separate, so production still needs the same email config.
3. **Merge** `feat/interaction-logging` → `dev` → production when you're happy.
4. **Revoke** the Supabase personal access token (`sbp_…`) at https://supabase.com/dashboard/account/tokens.
5. **Optional next:** WhatsApp confirmation (WhatsApp Cloud API, ~₹0.11–0.14 per message; no free tier for business-initiated). Can hang off the same single-fire path as the email.

**The one caveat to remember:** the confirmation email and OTP both depend on the *production* Supabase + Resend being configured the same way as staging. Fixing staging doesn't fix production automatically — they're deliberately separate.
