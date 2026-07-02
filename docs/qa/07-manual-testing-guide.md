# Manual Testing Guide — test every flow yourself

Everything here uses the **staging** environment. No real money moves. Nothing touches production.

---

## Where to test

**Staging site (Vercel preview):**
`https://elystai-website-git-feat-in-3ce2c3-mailofelystai-5168s-projects.vercel.app/register`

> If confirmation emails don't send from this preview, set `RESEND_API_KEY` (the "payment confirmation" key) and `EMAIL_FROM=Elyst AI <noreply@auth.elystai.com>` in Vercel → Settings → Environment Variables → **Preview**, and for the live Razorpay webhook set `RAZORPAY_WEBHOOK_SECRET=F7EpR@natDq9LCE` there too, then redeploy. OTP works regardless (it uses Supabase SMTP).

**Where to see results (Supabase dashboard → `elyst-ai-test` project → Table Editor):**
- `app.enrollment_overview` — one readable row per enrolment: who, what, paid?, amount, survey answers.
- `app.interaction_events` — the journey log. Filter by `order_id` or `correlation_id`.
- `app.payments` — the money row (status `created`/`paid`/`failed`, amount in paise).

---

## Login accounts you can use

You log in with **email OTP** (a 6-digit code arrives in your inbox) or **Google**. Use Gmail "+aliases" so every test is a fresh person but all land in your one inbox:

| Email to type | Behaviour |
|---|---|
| `mailofelystai+member@gmail.com` | **Circle member** → sees ₹2,399 |
| `mailofelystai+plain@gmail.com` | Non-member → sees ₹2,999 |
| `mailofelystai+anything@gmail.com` | Fresh non-member (make up new suffixes for repeat tests) |

Tip: once an account has paid, it's "already enrolled" — to re-run a clean checkout, just use a new `+suffix`.

---

## Razorpay test payment instruments (Test mode only)

**UPI:**
- `success@razorpay` → instant success
- `failure@razorpay` → instant failure

**Card:**
- Number `4111 1111 1111 1111`, any future expiry (e.g. `12/30`), any CVV (e.g. `123`)
- On the OTP/3DS page, choose **Success** (or use `1111` if a code is asked)

---

## The flows to run

### A. OTP login (Issue 2)
1. Go to /register, enter `mailofelystai+otp1@gmail.com`, click **Send Verification Code**.
2. Check inbox → you should get a **6-digit code** (not just a link). Enter it → you're in.
3. ✅ Pass = code arrives and verifies. (Old bug: no code / only a link.)

### B. Google login
1. Click **Continue with Google**, pick an account, return to /register signed in. ✅

### C. Non-member checkout + successful payment (Issues 3 + 4 + 1)
1. Log in as `mailofelystai+plain@gmail.com`.
2. Fill phone/city/country. Price box should read **₹2,999**.
3. **Proceed to Payment** → Razorpay opens showing **₹2,999** (same number). Pay with `success@razorpay`.
4. You should land on the survey ("Payment Confirmed"), fill it, then see **Registration Confirmed** quickly (not a stuck "confirming…").
5. Check inbox → **confirmation email** arrives.
6. In Supabase `enrollment_overview`: your row is `active`, `payment_amount` = `299900`. ✅

### D. Member checkout (Issue 3)
1. Log in as `mailofelystai+member@gmail.com`.
2. Price box should read **₹2,399**, and Razorpay + the UPI/card screen should all show **₹2,399** — the same number everywhere. Pay and confirm. ✅
3. ✅ Pass = the amount shown, the amount on Razorpay, and `payments.amount` (`239900`) all match.

### E. Payment failure
1. Fresh account, checkout, pay with `failure@razorpay`.
2. You should NOT be enrolled; you can retry. In `payments`, status `failed`. ✅

### F. Dismiss / abandon
1. Open Razorpay, close the popup without paying.
2. Nothing charged; enrollment stays `pending`; you can try again. ✅

### G. Validation
1. Try to proceed with an empty phone / city / country, or a bad phone (e.g. 3 digits) → you should see field errors and be blocked. ✅

### H. Onboarding survey
1. After a successful payment, the survey should require the mandatory fields (audience, role, industry, etc.) before submitting. ✅

### I. Trace a journey (logging)
1. After any run, open `app.interaction_events`, sort by `created_at`.
2. You'll see the sequence: `order.create.request` → `order.create.response` (with the amount) → `verify.activated` / `webhook.activated` → `email.confirmation.sent`. ✅

---

## What "good" looks like (quick checklist)
- OTP email contains a 6-digit code.
- The price is identical on the page, on Razorpay, on the UPI/card screen, and in `payments.amount`.
- After paying, you reach "Registration Confirmed" within a few seconds.
- A confirmation email arrives once (not twice).
- Every run leaves a readable trail in `interaction_events`.

If any of these fail, grab the `correlation_id` / `order_id` from `interaction_events` and that's everything needed to diagnose it.
