# BUILD_PLAN.md — Elyst "AI for Work" registration app

Handoff plan for the next builder (Antigravity 2.0 / Gemini, then a human dev).
Build the **registration flow + embedded Razorpay checkout** against the Supabase
schema in `supabase/migrations/*`. The LMS frontend comes later; the schema already
supports it, so don't redesign data — read it.

**Read `AGENTS.md` first.** It carries the non-negotiable rules. This file is the
ordered "how to build it."

> Prerequisite: the Supabase project must be **live and verified** (see
> `supabase/SETUP.md`) before you start. Build against the real schema, not a copy.

---

## 0. Stack & conventions

- **Build into the existing `elyst-website` repo** (the main marketing site) →
  served on the **main domain `elystai.com`** (e.g. routes under `/register` or
  `/ai-for-work`). This is NOT a separate app or repo.
- The **LMS comes later** as `learn.elystai.com` (separate surface, same Supabase
  project + same login). Don't build the LMS now; just don't block it.
- App Router + **`@supabase/ssr`** for auth (NOT the deprecated `auth-helpers`).
- **Match the existing `elyst-website` design system** — do not invent a new visual
  style. Reuse its typography, color tokens, components, and "plain, human language"
  copy voice. Buttons use the metal-shader effect, **no green glow**.
- Money is always in **paise (integer)**, server-computed. Never trust client amounts.

## 1. End-to-end flow

```
Google login (or email OTP)          ← identity established BEFORE payment
   └─ profile row auto-exists (DB trigger)
Checkout page (Moment 1 fields)      ← phone (req), city/country (opt)
   └─ POST /api/checkout/order
        • server reads verified email from the session
        • server checks discount_segment_members for that email (case-insensitive)
        • server computes amount: base_price_amount, minus 20% if Circle → round to ₹
        • create/upsert enrollment (status 'pending') + payment (status 'created')
        • create Razorpay Order (Orders API) with the computed amount
        • return { orderId, amount, currency, keyId }
Embedded Razorpay Standard Checkout modal opens on the same page
   └─ user pays
Razorpay → POST /api/webhooks/razorpay   ← THE ONLY TRUSTED SIGNAL
        • verify signature on the RAW body
        • dedupe on event id (app.webhook_events)
        • on payment.captured / order.paid: set payment 'paid', enrollment 'active'
Client success handler                ← treat as a HINT only, never as proof
   └─ redirect to onboarding survey (Moment 2, skippable)
        └─ POST /api/onboarding → app.onboarding
Later: LMS access                     ← active enrollment unlocks gated lessons
```

## 2. API routes

| Route | Method | Auth | Job |
|---|---|---|---|
| `/api/checkout/order` | POST | user session | Segment check, server-compute amount, create enrollment+payment+Razorpay order |
| `/api/webhooks/razorpay` | POST | signature | **Source of truth.** Verify raw-body signature, dedupe, activate enrollment |
| `/api/onboarding` | POST | user session | Upsert Moment-2 survey into `app.onboarding` |
| `/api/lessons/[id]/play` | GET | user session | (LMS, later) Check active enrollment → return signed Bunny URL |

All writes to `enrollments` / `payments` / `webhook_events` use the **service-role**
client (server only). The browser uses the **anon** client and can only read its own
rows (enforced by RLS).

## 3. Webhook rules (get these exactly right)

1. **Signature on the RAW body.** Read the raw request bytes before any JSON parsing;
   verify `x-razorpay-signature` (HMAC-SHA256 with `RAZORPAY_WEBHOOK_SECRET`). In
   Next.js App Router use `await req.text()` and verify before `JSON.parse`.
2. **Idempotent.** Insert the Razorpay event id into `app.webhook_events`; if it
   already exists, ack `200` and stop. Never process the same event twice.
3. **Out-of-order tolerant.** Before mutating, check the stored status. Don't move an
   enrollment backwards (e.g. don't overwrite `active` because a late `created` arrives).
4. **Always 200 fast.** Acknowledge quickly; do the minimal DB update. Razorpay retries
   on non-2xx, so non-idempotent handlers cause double-processing.
5. The **client handler is a hint** — use it only to show "processing"/redirect, never
   to grant access.

## 4. Discount (Circle) — server-side only

- On `/api/checkout/order`, look up the **verified session email** in
  `public.discount_segment_members` joined to an `active` segment.
- If found: apply the segment's rule (Circle = 20%), set `payment.discount_applied`,
  `payment.discount_amount`, and `enrollment.discount_segment_id`.
- **No discount-code form field.** The discount is automatic and cannot be shared.

## 5. Registration form — the three moments

**Moment 1 — checkout (minimal; conversion collapses past ~5–7 fields):**
- Name + email: **from Google, display-only, never input fields.**
- **Phone / WhatsApp** — required.
- **City**, **Country** — optional.
- That's it. No password, no discount field.

**Moment 2 — post-payment onboarding survey (skippable, framed as a benefit):**
- `audience_type` (working professional / business owner / freelancer / job-seeker / student)
- `role`, `industry`, `seniority` (optional)
- `ai_experience` (none / dabbled / regular)
- `primary_goal` (dropdown) + `goal_other` (one optional open-text)
- `heard_about_us`, `linkedin_url` (optional)
- Mostly dropdowns. Weighted toward **who the audience is** (the #1 analytics priority).

**Moment 3 — silent, no fields:** UTM source/medium/campaign, referrer, Circle flag,
discount applied, batch, amount, payment id, timestamp, locale. Captured server-side
onto enrollment/payment/profile rows.

## 6. Form UX best practices

- **Fewest fields at checkout** (≤5–7). Push everything else to Moment 2.
- **Single-column** layout, **mobile-first**, large tap targets.
- **Inline validation** (validate on blur, clear error messages).
- Clear progress / single primary action per step.
- Survey **after** payment, framed as "help us tailor the course to you," with a
  visible **Skip** option. Skipping must never block course access.

## 7. LMS gating (later, but the schema is ready)

- Lesson content is served only via `/api/lessons/[id]/play`, which checks the user
  has an **active enrollment** in a batch of that lesson's course (RLS already enforces
  read access to `app.lessons`).
- Video lives on **Bunny Stream**; the DB stores only `bunny_video_id`. Return a
  **signed/tokenized Bunny URL** (short TTL) — never a raw, shareable URL.
- `is_preview = true` lessons may be served without enrollment (teasers).

## 8. Env vars

See the list at the bottom of `supabase/SETUP.md`. Public (`NEXT_PUBLIC_*`) keys are
browser-safe; `SUPABASE_SERVICE_ROLE_KEY`, Razorpay secrets, and Bunny token keys are
**server-only**.

## Add-ons (not required for launch — confirm before building)

- Resume-an-abandoned-checkout email.
- Admin view of enrollments/onboarding analytics (can be done in Supabase dashboard first).
- Invoice/receipt PDF generation.
