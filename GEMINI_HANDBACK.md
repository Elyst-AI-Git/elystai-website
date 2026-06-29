# Gemini Handback — Elyst AI Registration Flow

We have built the frontend and backend integration for the cohort registration and post-payment onboarding survey. All code has been structured, lint-checked, and successfully built locally with zero TypeScript or Next.js errors.

---

## 1. Summary of What Was Built

### Supabase Integration Layer
- **Browser Client (`src/lib/supabase/browser.ts`)**: Initializes using `@supabase/ssr`. Added build-time environment variable fallback placeholders to prevent static pre-rendering from throwing errors during compile-time.
- **Server Client (`src/lib/supabase/server.ts`)**: 
  - `createServerSupabaseClient`: Uses `cookies` to resolve sessions (Next.js 16 / React 19 async cookies standard).
  - `createAdminSupabaseClient`: Uses `SUPABASE_SERVICE_ROLE_KEY` to bypass Row-Level Security (RLS) for server-side updates on checkout, payments, and webhook events.
- **Middleware (`src/middleware.ts`)**: Intercepts requests to dynamically refresh access tokens for authenticated users.
- **OAuth Callback (`src/app/api/auth/callback/route.ts`)**: Exchanges Google OAuth authorization code for a session token and redirects users to `/register`.

### Checkout Flow (Moment 1 & 3)
- **API Endpoint (`src/app/api/checkout/order/route.ts`)**:
  - Validates active user sessions.
  - Queries `public.discount_segment_members` case-insensitively for Circle members.
  - Retrieves the latest open/upcoming cohort batch for `ai-for-work`.
  - Computes order amounts in paise (applies 20% discount if Circle member, rounding final charge to the nearest whole rupee).
  - Silently captures UTM attributes and page referrer (Moment 3).
  - Saves the details as `pending` under `app.enrollments` and `created` under `app.payments`.
  - Communicates with Razorpay Orders API to initialize order and returns metadata.
- **Checkout Interface (`src/app/register/`)**:
  - Uses a `<Suspense>` wrapped form (`RegisterForm.tsx`) to avoid SSR-bailout errors with `useSearchParams`.
  - Step 1: Render dynamic identity checks (Google Sign-In + Email OTP login).
  - Step 2: Show Google profile and request phone/WhatsApp details with live validator.
  - Integrates `https://checkout.razorpay.com/v1/checkout.js` script to trigger standard checkout overlays.

### Webhook Event Handling
- **API Webhook Endpoint (`src/app/api/webhooks/razorpay/route.ts`)**:
  - Verifies signatures on raw request payloads using HMAC-SHA256 and `RAZORPAY_WEBHOOK_SECRET`.
  - Logs event entries under `app.webhook_events` to achieve idempotency and prevent double processing.
  - Monitors `order.paid` and `payment.captured` status updates.
  - Incorporates out-of-order validation (never updates `paid` records back to `created` or `failed`).
  - Sets payment status to `paid` and marks enrollment as `active` upon confirmation.

### Onboarding Survey (Moment 2)
- **API Endpoint (`src/app/api/onboarding/route.ts`)**: Stores skippable post-payment survey results under `app.onboarding` for authenticated profiles.
- **Survey Interface (`src/app/register/onboarding/page.tsx`)**: Collects professional profiles, seniority levels, AI experience, goals, and LinkedIn profiles. Renders a prominent "Skip survey" escape action to ensure course access is never blocked.

---

## 2. Design Decisions & Tradeoffs
1. **Prerender Fallbacks**: Added dummy fallback placeholders (`https://placeholder-elyst.supabase.co`) in `src/lib/supabase/browser.ts`. This allows Next.js static page generation to build the site without throwing a runtime error when local environment variables are not available.
2. **Suspense Wrapping**: Standardized `src/app/register/page.tsx` as a server component wrapping the client-side form (`RegisterForm.tsx`) in a `<Suspense>` boundary. This avoids search-param prerender errors and satisfies Next.js routing requirements.
3. **TypeScript Safety**: Fully cast all Razorpay handlers and window properties, eliminating `any` usages to comply with strict eslint configurations.
