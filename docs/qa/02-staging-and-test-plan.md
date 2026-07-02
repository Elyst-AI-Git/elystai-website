# Staging Environment & Test Plan

This is the "how companies actually test this" playbook, adapted to Elyst's stack (Next.js on Vercel + Supabase + Razorpay). It has three parts: how to stand up a safe staging replica, the industry practices we are borrowing, and the concrete test matrix that exercises every human path.

The golden rule of payment testing: **never test against production data or live Razorpay keys.** Test mode simulates payments with no real money moved.

---

## Part A — Standing up the staging replica

### A1. Environment separation (what real teams do)
- **Three environments:** local → staging (a.k.a. preview) → production. Each has its own Supabase project and its own Razorpay keys. They never share a database or webhook secret.
- Vercel already gives per-branch **Preview Deployments** (see the Vercel deploy memo). Point Preview at a **separate staging Supabase project** and **Razorpay Test keys** via Preview-scoped environment variables. Production env vars stay on the Production environment only.

### A2. Supabase staging project (DB side)
1. Create a **second Supabase project** (`elyst-staging`). Do not test on the production project.
2. Apply the same schema by running the existing migrations in order (`supabase/migrations/0001…0008`). This gives an identical `app` schema, RLS, and the `enrollment_overview` view — same structure, empty data.
3. **Seed test data** the app needs to function:
   - one `app.courses` row with `slug = 'ai-for-work'`
   - one `app.batches` row for that course with `status = 'open'` and a known `base_price_amount` (in paise — e.g. `299900`)
   - `discount_segments` row `name = 'Circle'`, `active = true`, with the value that must reconcile to the advertised ₹2,399 (this is where Issue 3 gets pinned down — set it deliberately and verify the math)
   - a handful of `discount_segment_members` rows with **test emails you control** (lowercased), plus deliberately-wrong ones (mixed case, not-a-member) to test the negative path
4. **Auth email:** configure a real custom SMTP on staging (Resend/SES sandbox) so OTP delivery is testable, and edit the Magic Link template to include `{{ .Token }}`. This is the fix-under-test for Issue 2.
5. **Access control:** use **service-role key server-side only** (already the pattern per the Supabase guardrails memo). Give testers read access via the Supabase dashboard, not by sharing the service-role key. Keep the no-destructive-ops guardrail on staging too.

### A3. Razorpay Test/sandbox side
1. Toggle the Razorpay dashboard to **Test mode**; generate **`rzp_test_…` keys**. Put them in Preview env vars (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
2. **Register a Test-mode webhook** pointing at the staging URL `https://<preview-domain>/api/webhooks/razorpay`, subscribed to `order.paid`, `payment.captured`, `payment.failed`. Copy its signing secret into `RAZORPAY_WEBHOOK_SECRET` (Preview scope). A wrong/blank secret here is exactly what reproduces Issue 4.
3. **Test payment instruments:**
   - UPI success: `success@razorpay`
   - UPI failure: `failure@razorpay`
   - Test cards from Razorpay docs for card/netbanking paths
4. **Webhook validation:** use the dashboard's "Validate & Test Webhooks" tool and inspect real Test payloads so our `amount`/`currency` guard (A9) is checked against actual shapes, not assumptions.

### A4. Do not let testing touch the codebase or prod
- Reports live in `docs/qa/` (inert markdown). No app logic is modified as part of testing.
- All money movement is Test-mode only. All data is in `elyst-staging`.
- Never copy production PII into staging. Seed synthetic users.

---

## Part B — Industry practices we are adopting

Drawn from standard payment/QA practice (Razorpay's own testing guide, plus general release engineering):

1. **Staging parity** — same schema/migrations, separate data and keys.
2. **Test-mode payment simulation** — `success@razorpay` / `failure@razorpay`, test cards; no real charges.
3. **Webhook contract testing** — register the webhook in Test mode, replay/validate events, assert idempotency and out-of-order handling (this codebase already invests heavily here via `app.webhook_events`).
4. **Boundary & negative testing** — bad phone formats, non-member emails, expired OTP, dismissed checkout, double-click/two-tab races.
5. **Idempotency & race testing** — re-deliver the same webhook, double-submit checkout, confirm no duplicate orders or double activation.
6. **Reconciliation** — after a run, compare `payments.amount` in DB against what Razorpay Test dashboard recorded, and against what the UI displayed. This is the direct check for Issue 3.
7. **Observability before launch** — structured logs with a correlation id per session so a support report maps to a server trace (see `03-logging-design.md`).
8. **Synthetic monitoring (post-launch)** — a scheduled test-mode transaction that alerts if checkout or the webhook breaks.

---

## Part C — Test matrix (every human flow)

Legend: **Expected** = correct behaviour. Tie-back = which reported issue it validates.

### Auth (OTP + Google)
| ID | Scenario | Steps | Expected | Tie-back |
|----|----------|-------|----------|----------|
| T-A1 | New email OTP happy path | Enter new email → Send code → read email → enter 6 digits | Email arrives **with a numeric code**; verify succeeds; checkout step shows | Issue 2 |
| T-A2 | Template regression | Inspect the received email | Contains a 6-digit code (not only a link) | Issue 2 |
| T-A3 | Expired / wrong OTP | Enter wrong code; wait >1h then enter code | Friendly "invalid or expired" error, no crash | Issue 2 |
| T-A4 | Rate limit | Request OTP repeatedly | Graceful throttling message, not silent failure | Issue 2 |
| T-A5 | Google OAuth | Continue with Google → consent → returns | Lands authenticated on /register | — |
| T-A6 | Account switch on same tab | Sign in as A, sign out, sign in as B | B does **not** inherit A's phone/city/Circle badge | (fixed in 7a245d4 — regression guard) |

### Circle pricing (Issue 3 — the important one)
| ID | Scenario | Steps | Expected |
|----|----------|-------|----------|
| T-P1 | Member, fresh order | Member email, no prior order → checkout | UI badge shows member price **and** Razorpay + UPILELG charge the **same** amount; DB `payments.amount` matches |
| T-P2 | Non-member | Non-member email → checkout | Full price everywhere, consistent |
| T-P3 | **Stale-order reuse** | Start checkout as non-member (order minted), add email to Circle, return and checkout again | **Investigate:** does the reused order charge the old (full) price while UI shows discounted? This is the likely Issue-3 repro |
| T-P4 | Segment math | Set segment = 20% on base 2999 | Charged amount = server-rounded value; confirm it equals the advertised ₹2,399 or fix the copy/segment so they agree |
| T-P5 | Inactive/misnamed segment | Deactivate the Circle segment | UI shows full price, charge is full price, no "member" badge |
| T-P6 | Display == charge invariant | Every P-case | The number shown on screen equals `amount` in the order response equals GPay screen equals `payments.amount` |

### Checkout order creation
| ID | Scenario | Expected |
|----|----------|----------|
| T-C1 | Missing phone/city/country | 400 with field-specific message; no order created |
| T-C2 | Bad phone (E.164 > 15, +91 not 10) | Client blocks; server also validates |
| T-C3 | Double-click / two tabs | Exactly one Razorpay order used; unique-violation path returns the winning order (`23505` branch) |
| T-C4 | Already `active` enrollment | 409 "already enrolled", no new order |
| T-C5 | No open batch | 404 friendly message |

### Payment + return (Issue 4)
| ID | Scenario | Steps | Expected |
|----|----------|-------|----------|
| T-W1 | UPI success | Pay with `success@razorpay` | Webhook fires → enrollment `active` → confirmation shows "enrolled" within the poll window |
| T-W2 | Webhook missing/misconfigured | Disable the Test webhook, pay | Reproduces "not processed"; confirms Issue 4 is webhook-dependent |
| T-W3 | Amount guard | Inspect real `order.paid` payload | Confirm the `amount`/`currency` guard behaves on the actual shape (finding A9) |
| T-W4 | Webhook slower than 7.5s | Delay/replay webhook after poll window | User sees "pending"; confirms poll window is too short as sole mechanism |
| T-W5 | Idempotency | Re-deliver same event id | Second delivery is a no-op `duplicate`; no double activation |
| T-W6 | Out of order | Deliver `payment.captured` then `order.paid` | Single activation, no error |
| T-W7 | Payment failed | Pay with `failure@razorpay` | `payments.status = failed`; user can retry; no activation |
| T-W8 | Dismiss checkout | Open Razorpay, close modal | `checkoutLoading` resets; enrollment stays `pending`; user can retry |

### Confirmation email (Issue 1)
| ID | Scenario | Expected (once implemented) |
|----|----------|------------------------------|
| T-E1 | Successful payment | Exactly one confirmation email fires from the webhook on `active`, idempotently |
| T-E2 | Webhook retry | Retried webhook does **not** send a second email |
| T-E3 | Failed payment | No confirmation email sent |

### Onboarding survey
| ID | Scenario | Expected |
|----|----------|----------|
| T-O1 | No enrollment | Direct URL redirects to /register |
| T-O2 | Required fields | Custom field errors show (noValidate path), submit blocked |
| T-O3 | "Payment Confirmed" copy | Flag: header shows before webhook confirms (finding A7) — decide desired behaviour |

---

## Exit criteria for the test phase
1. All four reported issues reproduced in staging (proving the diagnosis) and their root cause pinned to a specific config/code path.
2. The display==charge invariant (T-P6) documented with real numbers.
3. Webhook dependency of Issue 4 demonstrated (T-W2/W4).
4. A prioritized fix list handed off, with each fix mapped to the test that will verify it.
