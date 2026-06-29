# Gemini Handoff Memento — Elyst AI Cohort Registration

This document serves as a complete context snapshot of the cohort registration implementation. It is designed to be passed directly to another Large Language Model (LLM) or developer to continue, audit, or test the project.

---

## 1. Project Context
*   **Repository**: `elyst-website` (Next.js 16.2.7 App Router, React 19.2.4, Tailwind CSS v4)
*   **Git Branch**: `feat/registration-gemini` (working tree is clean, changes are committed locally).
*   **Goal**: Build the "AI for Work" course registration flow, including authentication (Google OAuth + Email OTP), checkout fields (Moment 1), Razorpay Order API integration, Razorpay webhooks (idempotency + signature checks), and post-payment onboarding survey (Moment 2).

---

## 2. Completed Architecture & Added Files

### A. Supabase Client Configuration
*   **[browser.ts](file:///Users/nihalanas/Documents/Development/elyst-website/src/lib/supabase/browser.ts)**: Configures the client-side Supabase client using `@supabase/ssr`. Added fallback dummy placeholders for the API keys so static page generation during `next build` does not crash when local `.env.local` keys are missing.
*   **[server.ts](file:///Users/nihalanas/Documents/Development/elyst-website/src/lib/supabase/server.ts)**:
    *   `createServerSupabaseClient()`: Cookie-based server client (handles React 19 / Next.js 16 async cookie parameters).
    *   `createAdminSupabaseClient()`: Standalone admin client initialized with the `SUPABASE_SERVICE_ROLE_KEY` to bypass Row-Level Security (RLS) for backend operations (e.g. modifying `enrollments` or `payments`).
*   **[proxy.ts](file:///Users/nihalanas/Documents/Development/elyst-website/src/proxy.ts)**: Refreshes user auth sessions on every request (Next.js 16 Proxy convention replacing the deprecated `middleware.ts`).
*   **[callback/route.ts](file:///Users/nihalanas/Documents/Development/elyst-website/src/app/api/auth/callback/route.ts)**: `GET /api/auth/callback` exchanges the OAuth code for a session and redirects to `/register`.

### B. Checkout Flow & APIs
*   **[RegisterForm.tsx](file:///Users/nihalanas/Documents/Development/elyst-website/src/app/register/RegisterForm.tsx)**: Reusable client component. Handles conditional steps: Google / OTP authentication, collection of Moment 1 fields (Phone required, City/Country optional), and loading/triggering the Razorpay Standard Checkout overlay popup.
*   **[page.tsx](file:///Users/nihalanas/Documents/Development/elyst-website/src/app/register/page.tsx)**: Server component wrapping `RegisterForm` in `<Suspense>` to avoid static build bailouts with `useSearchParams`.
*   **[checkout/order/route.ts](file:///Users/nihalanas/Documents/Development/elyst-website/src/app/api/checkout/order/route.ts)**: `POST /api/checkout/order`
    *   Verifies user session.
    *   Performs server-side case-insensitive email check against `public.discount_segment_members` joined to `active` segments. If email matches the `circle` segment, applies 20% discount.
    *   Fetches the active cohort batch for `ai-for-work`.
    *   Computes the final charge in paise, rounding to the nearest whole rupee (₹2,999 base -> ₹2,399 for Circle).
    *   Inserts/upserts `pending` enrollment (capturing Moment 3 UTM parameters/referrer silently) and `created` payment rows.
    *   Requests a Razorpay Order and returns checkout metadata to the client.
*   **[PriceEnrol.tsx](file:///Users/nihalanas/Documents/Development/elyst-website/src/components/ai-for-work/PriceEnrol.tsx)**: Redirected landing page CTA button to `/register`.

### C. Razorpay Webhooks
*   **[webhooks/razorpay/route.ts](file:///Users/nihalanas/Documents/Development/elyst-website/src/app/api/webhooks/razorpay/route.ts)**: `POST /api/webhooks/razorpay`
    *   Verifies incoming request signatures on the raw payload using HMAC-SHA256 and `RAZORPAY_WEBHOOK_SECRET` with **timing-safe string comparison** (`crypto.timingSafeEqual`).
    *   Added **malformed payload and signature protection** (immediately returns `400 Bad Request` to prevent infinite Razorpay retries).
    *   Inserts event logs into `app.webhook_events` to enforce idempotency (duplicate keys immediately return `200 OK` and halt).
    *   Monitors `payment.captured` and `order.paid` events.
    *   Checks existing DB status before mutating to prevent out-of-order events from overwriting `paid` fields back to `created` or `failed`.
    *   Sets payment status to `paid` and enrollment status to `active`.

### D. Onboarding Survey
*   **[onboarding/page.tsx](file:///Users/nihalanas/Documents/Development/elyst-website/src/app/register/onboarding/page.tsx)**: Gathers Moment 2 data (audience type, industry, role, seniority, AI experience, goals, and LinkedIn). Incorporates a prominent, skippable action that redirects directly to `/learn`.
*   **[onboarding/route.ts](file:///Users/nihalanas/Documents/Development/elyst-website/src/app/api/onboarding/route.ts)**: `POST /api/onboarding` upserts user responses to `app.onboarding`.

---

### 🟢 Resolved: Supabase Schema Privilege Denied (Permission Denied for Schema `app`)
During initial tests, querying database tables under the custom `app` schema returned a `42501 permission denied for schema app` error.
*   **Why**: The database migrations (`0002_app_course_structure.sql`) grant schema usage privileges to `anon` and `authenticated` roles, but they **did not grant usage privileges to the `service_role` role** (which is the database user used by our server-side API client).
*   **How it was Fixed**: We added **[0004_grant_service_role_app_schema.sql](file:///Users/nihalanas/Documents/Development/elyst-website/supabase/migrations/0004_grant_service_role_app_schema.sql)** to the migrations directory to grant `usage` and `all privileges` on the `app` schema and tables to `service_role` and configure default privileges for future migrations. This has been applied to the database.

---

## 4. Environment Variables Required
Make sure `.env.local` contains the following valid keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
```

---

## 5. Pending Tasks & Verification Checklist

- [x] **Database Grants**: Run the SQL commands in `0004_grant_service_role_app_schema.sql` on your Supabase project (already completed and applied).
- [ ] **Local Webhook Testing**: Setup a public webhook tunnel (like `ngrok`) to route Razorpay webhooks to `http://localhost:3000/api/webhooks/razorpay` and register it in Razorpay dashboard.
- [ ] **Configure Google OAuth Redirects**: Confirm redirect callbacks point to `https://<ref>.supabase.co/auth/v1/callback` in both Google Cloud console and Supabase dashboard settings.
- [ ] **HTML Email Templates**: Replace default Supabase raw text email templates with custom HTML templates under Supabase Settings.
- [ ] **SMTP Provider Configuration**: Connect a real transactional email provider (like Resend, SES, or SendGrid) to send OTP emails from your own domain.

---

## 6. Important Edge Cases to Verify
1.  **Discount Rule Rounding**: The server-side checkout rounds calculated percentage discounts to the nearest whole rupee (paise converted to rupees, rounded, then converted back to paise). Verify that this matches the database price exactly.
2.  **Out-Of-Order Webhook Delivery**: Verify that if a late `payment.failed` event is delivered after a successful `payment.captured` event, the payment status remains `paid` (checked in `/api/webhooks/razorpay`).
3.  **Idempotency Checks**: Verify that resending the same Razorpay webhook payload doesn't trigger secondary database writes (checked by catching unique violations on `webhook_events`).
4.  **Case-Insensitive Discount Matching**: Verify that adding emails in different casings to `public.discount_segment_members` still resolves the correct 20% discount based on session emails.
