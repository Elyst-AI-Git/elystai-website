# Production Readiness Checklist

Everything below is **production** setup. Staging (`elyst-ai-test`) is fully done and verified; production is a *separate* Supabase project + *live* Razorpay, so none of the staging config carries over automatically.

## 1. Vercel — Production env vars
Your Preview scope is complete. **Production is missing two** (confirmation email won't send without them):
- [ ] **`RESEND_API_KEY`** = the "payment confirmation" Resend key
- [ ] **`EMAIL_FROM`** = `Elyst AI <noreply@auth.elystai.com>`

Also verify (Production scope):
- [ ] `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` are **LIVE** keys (`rzp_live_…`), not test.
- [ ] `RAZORPAY_WEBHOOK_SECRET` matches a **live-mode** webhook (see §3).
- [ ] `NEXT_PUBLIC_SUPABASE_URL` / anon / service-role point at the **production** Supabase project (not `elyst-ai-test`).

## 2. Production Supabase project (NOT elyst-ai-test)
- [ ] Run migrations **`0009_interaction_events.sql`** and **`0010_enrollment_confirmation_sent.sql`**.
- [ ] Confirm the `app` schema is exposed to the API (Settings → API → Exposed schemas).
- [ ] Custom SMTP (Resend) connected — your prod OTP email already looks branded, so this is likely done; still verify.
- [ ] `mailer_otp_length` = **6** (staging had a wrong default of 8 — check prod).
- [ ] **Both** email templates use `{{ .Token }}` and the branded HTML: "Confirm signup" *and* "Magic Link". (New users hit "Confirm signup", returning users hit "Magic Link" — both must match.)
- [ ] Real data seeded: `courses` (`ai-for-work`), `batches` (status `open`, correct `base_price_amount` in paise), `discount_segments` (`circle`, active, percent 20), and the real Circle member emails in `discount_segment_members` (lowercased).

## 3. Razorpay (live)
- [ ] Switch dashboard to **Live mode**; use live keys in Vercel Production.
- [ ] Register a **live** webhook → `https://<prod-domain>/api/webhooks/razorpay`, events `order.paid`, `payment.captured`, `payment.failed`; put its secret in Vercel Production `RAZORPAY_WEBHOOK_SECRET`.
- [ ] Decide on **international cards**: the "International cards are not supported" message is a Razorpay account setting. Enable it in the dashboard if you want to accept foreign cards; otherwise that message is expected and domestic cards/UPI still work.

## 4. Resend
- [x] Domain `auth.elystai.com` verified (sending enabled).
- [ ] Free tier is 3,000/month, 100/day — fine for launch; monitor volume and upgrade if a cohort exceeds it.

## 5. After go-live
- [ ] Revoke the Supabase personal access token (`sbp_…`) used for staging.
- [ ] Do one real live-mode test purchase (small) end to end, then refund it in the Razorpay dashboard.

## Notes
- The interaction log (`app.interaction_events`) is working: client milestones (e.g. `checkout_submitted`) carry `null` payload by design; server/webhook events carry the detail (amount, status, order id). Filter by `correlation_id` or `order_id` to replay any journey.
