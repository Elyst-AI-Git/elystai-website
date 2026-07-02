# Interaction Logging Design (post-"Join now")

Goal: from the moment a user clicks "Join now"/"Proceed to Payment", every step of their journey and every server response is recorded, so that when someone says "I paid and got nothing," we can reconstruct exactly what happened.

This is a design, not yet implemented. It is written so the implementation phase can follow it directly.

---

## Principles (how mature teams do this)

1. **Correlation id per session.** Generate one id (a UUID) when the user reaches checkout and attach it to every client event and every server log for that journey. Support can then paste one id and see the whole trace.
2. **Structured, not free-text.** Log JSON objects with stable fields, not `console.error("something failed")`. Machine-queryable.
3. **Both sides of every exchange.** For each server call, record the request (what the user sent) and the response (what our server answered, including status and error code).
4. **Durable + queryable.** Client-side console logs vanish. Persist the important server-side events to a table so they survive and can be joined to `payments`/`enrollments`.
5. **PII-aware.** Store email/phone only where already stored (Supabase). In the event log, prefer `profile_id` + correlation id over raw PII. Never log OTP codes, Razorpay secrets, or full webhook signatures.
6. **Idempotent + append-only.** Events are inserts, never updates; one row per thing that happened.

---

## What to capture (the journey)

Client-emitted milestones (sent to a lightweight `/api/events` endpoint):
- `checkout_viewed`, `otp_requested`, `otp_verified`, `checkout_submitted`
- `razorpay_opened`, `razorpay_dismissed`, `razorpay_handler_success` (with order_id, payment_id)
- `onboarding_viewed`, `onboarding_submitted`
- `confirmation_pending`, `confirmation_confirmed`

Server-recorded events (from the API routes themselves):
- `order.create.request` / `order.create.response` (amount, discount_applied, reused_order?) — this is where Issue 3 becomes visible: the amount we actually computed, logged next to what the client displayed.
- `discount_status.checked` (isCircleMember result)
- `webhook.received` / `webhook.verified` / `webhook.activated` / `webhook.failed` (event id, order id, amount, status transition) — this is where Issue 4 becomes visible: whether the webhook ever arrived and what it did.
- `onboarding.saved`
- any error, with the route, status code, and error code (not just a message)

---

## Storage

Add an `app.interaction_events` table (server-only, service-role writes; no client insert — the `/api/events` route validates the session and writes on the user's behalf, same trust model as the rest of the `app` schema). Suggested shape:

```
app.interaction_events (
  id             uuid pk default gen_random_uuid(),
  correlation_id uuid not null,          -- the journey id
  profile_id     uuid references public.profiles(id),
  event          text not null,          -- e.g. 'order.create.response'
  source         text not null,          -- 'client' | 'server' | 'webhook'
  order_id       text,                   -- razorpay order id when known
  http_status    integer,
  payload        jsonb,                  -- redacted, structured details
  created_at     timestamptz not null default now()
)
create index on app.interaction_events (correlation_id);
create index on app.interaction_events (order_id);
create index on app.interaction_events (profile_id);
```

RLS: no client policies (service-role only), matching `webhook_events`. Optionally a read policy for the user's own rows if we want to expose a status timeline.

---

## Tooling options (build vs buy)

- **Minimum viable (recommended first):** the `interaction_events` table above + structured `console.log(JSON.stringify(...))` in the API routes (Vercel captures stdout, and the table gives durable joins to payments). Zero new vendors.
- **Better ergonomics:** add a log drain / product-analytics tool. Common choices: Sentry (errors + traces), Axiom or Logtail/Better Stack (structured log storage + search), PostHog (product funnel + session). Any one of these consumes the same structured events. Vercel supports log drains natively.
- **Payment reconciliation:** keep the Razorpay dashboard as the third source of truth and reconcile `interaction_events` + `payments` against it.

Recommendation: ship the DB table + structured server logs first (owns the data, no vendor lock-in, directly answers support tickets), then wire a drain to Axiom/Sentry for search and alerting once volume grows.

---

## Where each hook goes (implementation map)

| Event | File |
|-------|------|
| generate correlation_id, `checkout_submitted` | `src/app/register/RegisterForm.tsx` (start of `handleCheckout`) |
| `order.create.request/response` | `src/app/api/checkout/order/route.ts` |
| `discount_status.checked` | `src/app/api/checkout/discount-status/route.ts` |
| `razorpay_opened/dismissed/handler_success` | `RegisterForm.tsx` Razorpay options |
| `webhook.*` | `src/app/api/webhooks/razorpay/route.ts` |
| `onboarding.saved` | `src/app/api/onboarding/route.ts` |
| `confirmation_pending/confirmed` | `src/app/register/confirmation/page.tsx` |
| new sink | `src/app/api/events/route.ts` (new) + `app.interaction_events` migration |

The correlation id should be minted client-side at checkout and passed on every subsequent call (checkout body, onboarding body) and stitched into the Razorpay order `notes` so the webhook can recover it from Razorpay's payload.
