# Elyst Supabase — Setup

This is the one-time setup to get the database live. Do the steps in order. Steps
marked **[You]** are yours (account/billing/secrets); steps marked **[Claude/dev]**
are done by Claude Code or a developer with the access token.

The architecture in one line: **one Supabase project**, shared identity in
`auth.users` + `public.profiles`, the course platform in the `app` schema. AI OS
later becomes its own schema in the same project — no second login, no migration.

---

## 1. Create the project — **[You]**

1. Sign up at https://supabase.com with the Elyst Google account (`mailofelystai@gmail.com`).
2. Create an organization (Free or Pro — Pro `$25/mo` recommended before launch).
3. **New project**:
   - Name: `elyst-ai`
   - Region: **South Asia (Mumbai) `ap-south-1`** — closest to India/GCC users.
   - Set a strong database password and save it in your password manager.
4. Note the **project ref** (the `xxxx` in `https://xxxx.supabase.co`).

## 2. Create an access token — **[You]**

- Go to https://supabase.com/dashboard/account/tokens → **Generate new token**.
- Send Claude/dev the **project ref** and the **access token**.
- **Do not** paste the `service_role` key or the DB password into chat — those go
  into the app's env files later.

## 3. Link + push the schema — **[Claude/dev]**

```bash
# install CLI (macOS)
brew install supabase/tap/supabase

# from repo root
supabase login                       # paste the access token
supabase link --project-ref <REF>    # links this repo to the project
supabase db push                     # applies supabase/migrations/* in order
psql "$DATABASE_URL" -f supabase/seed.sql   # or run seed.sql in the SQL editor
```

`db push` applies, in order:
- `0001_shared_identity.sql` — profiles (+ auto-create trigger), discount segments, RLS
- `0002_app_course_structure.sql` — `app` schema; courses, batches, modules, lessons
- `0003_app_commerce.sql` — enrollments, payments, onboarding, webhook_events, lesson gating
- `0004_grant_service_role_app_schema.sql` — service_role write access on `app` schema
- `0005_grant_service_role_public_writes.sql` — service_role write access on `public` schema
- `0006_payments_one_open_per_enrollment.sql` — one open ("created") payment per enrollment
- `0007_normalize_discount_member_emails.sql` — lowercase + enforce `discount_segment_members.email`

## 4. Expose the `app` schema to the API — **[You/Claude]**

Dashboard → **Project Settings → API → Exposed schemas** → ensure `public` **and
`app`** are both listed. (`supabase/config.toml` already sets this for local; the
hosted project needs it confirmed once.)

## 5. Configure Auth — **[You]**

Google sign-in is **primary**, email OTP is the **fallback**. Login happens
**before** payment, so a verified email exists before money moves.

1. **Google**: create an OAuth client in Google Cloud Console
   (Authorized redirect URI: `https://<REF>.supabase.co/auth/v1/callback`).
   Dashboard → **Authentication → Providers → Google** → paste Client ID + Secret.
2. **Email OTP**: Authentication → Providers → Email → enable, and set "Confirm email"
   to use OTP. (Disable password sign-in if you only want Google + OTP.) Note: on a
   free-tier project Supabase's default email provider is rate-limited (a few
   emails/hour) and uses unbranded templates — don't treat OTP as production-ready
   until custom SMTP (e.g. Resend) and branded templates are configured; see the
   project's Supabase guardrails notes for the current rate limit.
3. **URL config**: Authentication → URL Configuration → Site URL =
   `https://elystai.com` (registration is on the main domain), plus redirect URLs
   for `http://localhost:3000/**` and later `https://learn.elystai.com/**` (LMS).

## 6. Load Circle members — **[You → Claude]**

Send the ~30 Circle emails. They are inserted into `public.discount_segment_members`
for the `circle` segment. Discount is applied automatically at checkout by matching
the verified login email (case-insensitive) — there is no shareable code.

## 7. Verify — **[Claude/dev]**

- Confirm tables exist in both `public` and `app`.
- Confirm RLS is **on** for every table (the dashboard shows a shield icon).
- Sign in a test Google user → confirm a `public.profiles` row was auto-created.
- Confirm `app.courses` has `ai-for-work` and a batch at `299900` paise.

Once verified, the schema is **live and green** → hand `BUILD_PLAN.md` + `AGENTS.md`
to Gemini/Antigravity to build the registration app against it.

---

## Safety rails already in place

- **Claude Code guard hook** (`.claude/hooks/guard-destructive.sh`) hard-blocks
  `DROP`, `TRUNCATE`, `DELETE FROM`, `supabase db reset`, and `supabase projects
  delete`. Schema changes happen only through reviewed migration files.
- **Supabase MCP** (if connected) must run `--read-only` and scoped to this one
  `--project-ref`, and must never be given the `service_role` key. The MCP is for
  inspection; writes go through `supabase db push`.

## Environment variables (for the app repo, later)

```
NEXT_PUBLIC_SUPABASE_URL=https://<REF>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...            # safe for the browser
SUPABASE_SERVICE_ROLE_KEY=...                # server only; bypasses RLS; never client
SUPABASE_AUTH_GOOGLE_CLIENT_ID=...
SUPABASE_AUTH_GOOGLE_SECRET=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
BUNNY_STREAM_LIBRARY_ID=...
BUNNY_STREAM_API_KEY=...
BUNNY_TOKEN_AUTH_KEY=...                      # for signed lesson URLs
```
