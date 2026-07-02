# QA / Testing Phase — Elyst Registration & Payments

Reviewed on branch `dev` @ `7a245d4`. These docs are a findings report and plan only — no application code was changed to produce them.

1. [`01-issue-report.md`](01-issue-report.md) — root-cause analysis of the four reported issues (confirmation email, OTP, 2399-vs-2999, payment-not-processed) plus additional findings, with file/line references.
2. [`02-staging-and-test-plan.md`](02-staging-and-test-plan.md) — how to stand up a safe staging replica (separate Supabase project + Razorpay Test mode), the industry practices we are borrowing, and a full test matrix covering every human flow.
3. [`03-logging-design.md`](03-logging-design.md) — design for logging every interaction after "Join now", with an `app.interaction_events` table, correlation ids, and a build-vs-buy path.
4. [`04-staging-test-results.md`](04-staging-test-results.md) — **empirical results** from running the flow against a real staging Supabase project + Razorpay Test mode. Issues 1, 2, 3 confirmed/reproduced; issue 4 shown to be a webhook config/delivery problem (handler itself is correct). Logging validated end to end.
5. [`05-fixes-and-verification.md`](05-fixes-and-verification.md) — **the fixes applied** for all four issues and how each was re-verified on staging. Also lists what remains configurable from the Elyst side (custom SMTP, Resend key, live webhook).

## TL;DR of the four issues
- **Confirmation email:** not implemented at all — no mail-sending code exists. Fire it from the webhook on `enrollment → active`.
- **OTP:** `emailRedirectTo` set on `signInWithOtp` can force magic-link mode; template may lack `{{ .Token }}`; built-in SMTP is rate-limited. Needs config fixes + custom SMTP.
- **2399 vs 2999:** displayed price is a hardcoded literal; charged price is computed server-side from the DB and can diverge (stale-order reuse, segment math, inactive segment). UI must render the order's actual amount.
- **Payment not processed:** activation happens only via the async webhook with no synchronous signature verification; a missing/slow webhook leaves the user in limbo. Add server-side verify on return.
