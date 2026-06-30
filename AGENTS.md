# AGENTS.md — Elyst AI

Rules for any AI builder (Antigravity / Gemini) or human dev working on the Elyst
registration app and, later, the LMS. CLAUDE.md is not read by every tool, so the
durable rules live **here**. Read this before writing code. For the ordered build
steps, see `BUILD_PLAN.md`. For database setup, see `supabase/SETUP.md`.

## What this project is

Elyst AI runs **cohort-based courses**. "AI for Work" is the first of many. A user is
a person who may enroll in several courses over time. Audience: working professionals,
business owners, and freelancers across **India and the GCC**.

## Locked architecture (decided — do not re-litigate)

- **Single source of truth: Supabase** (Postgres + Auth). Identity, payments,
  enrollments, and course structure all live here.
- **One Supabase project, schema-separated.** `auth.users` + `public.profiles` are the
  shared identity for every Elyst product. The course platform lives in the **`app`**
  schema. A future product (AI OS) gets its **own schema** in the same project —
  shared login, no user migration. Do not spin up a second project for it without a
  deliberate decision.
- **Auth:** Supabase Auth — Google sign-in primary, email OTP fallback. Login happens
  **before** payment. Name + email come from Google → **never ask for them as form
  fields.** Use **`@supabase/ssr`**, not the deprecated `auth-helpers`.
- **App:** registration is built **into the existing `elyst-website` repo** on the
  main domain **`elystai.com`** (not a separate app). The **LMS comes later** at
  **`learn.elystai.com`** — same Supabase project, same login.
- **Payments:** Razorpay **embedded Standard Checkout**. Server creates the Order
  (Orders API) with a **server-computed amount**; the **webhook is the only trusted
  signal** of success; the client handler is a hint, never proof.
- **Discounts:** modeled as reusable **segments** (email allow-list checked server-side
  against the verified login). **No shareable coupon codes.** Circle = 20% off.
- **LMS content:** course structure (courses → modules → lessons) is small text rows in
  Supabase. **Video lives on Bunny Stream**; the DB stores only `bunny_video_id`.
  Lessons are gated and served via **signed/tokenized Bunny URLs** to users with an
  active enrollment.

## Hard rules

1. **Money is server-computed, in paise (integer).** Never trust an amount from the
   client. Verify everything against the DB.
2. **The webhook is the source of truth.** It must: verify the signature on the **raw
   body**, be **idempotent** (dedupe on Razorpay's event id via `app.webhook_events`),
   and tolerate **out-of-order** delivery (check stored status before updating).
3. **Service-role key is server-only.** It bypasses RLS. It must never reach the
   browser. The browser uses the anon key and can only touch its own rows.
4. **Don't weaken RLS.** Users read only their own profile/onboarding/enrollments and
   only access lessons for courses they're enrolled in. `enrollments`/`payments`/
   `webhook_events`/`discount_*` are written by the server only.
5. **Schema changes go through migration files** in `supabase/migrations/`, applied
   with `supabase db push`. Never hand-edit tables in the dashboard for structural
   changes. **Never** `DROP` / `TRUNCATE` / mass-`DELETE` / `db reset` / delete the
   project. (Claude Code enforces this with a guard hook; you must follow it too.)
6. **Keep "did they pay" separate from "did they fill the survey."** Onboarding is its
   own table and is always skippable.

## Data collection — the three moments

- **Moment 1 (checkout, minimal):** phone/WhatsApp, city, country (all required).
  Name/email from Google. No password, no discount field. → `public.profiles`.
- **Moment 2 (post-payment survey, skippable):** audience type, role, industry,
  seniority (opt), AI experience, primary goal (+ one open-text), how they heard of us,
  LinkedIn (opt). Weighted toward **who the audience is** — the #1 analytics priority.
  → `app.onboarding`.
- **Moment 3 (silent):** UTM/referrer, Circle flag, discount, batch, amount, payment id,
  timestamp, locale. → columns on enrollment/payment/profile.
- **Do NOT collect** date of birth, gender, or other vanity/privacy-sensitive fields.

## Design & copy

- **Do not invent a visual style.** Reference the existing **`elyst-website`** codebase
  for the design system, components, typography, and design philosophy, and match it.
- Copy voice: **plain, human language. No jargon, no em dashes.**
- Buttons use the **metal-shader effect only — no green glow.**

## Form UX

Fewest fields at checkout (conversion collapses past ~5–7), single-column, mobile-first,
inline validation, clear progress. Rich survey **after** payment, framed as a benefit,
clearly skippable.

## Build principle

Build the **easiest thing that works**, designed to scale (many concurrent users, many
future courses) but not over-engineered for scale you don't have yet. Favor managed,
auto-scaling services. Mark anything optional as an add-on and confirm before building it.
