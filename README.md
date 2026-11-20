# Elyst AI website

Marketing site for Elyst AI. Elyst AI finds the work AI can do for a business, builds the AI system, and trains the team to use it. Two services: AI Transformation and AI Kickstart.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Self-hosted DM Sans and Manrope (WOFF2, loaded with `next/font/local`)
- Vercel Analytics
- No animation library: motion is CSS plus small React hooks

## Local development

```bash
npm install
npm run dev
```

The preview runs at [http://localhost:3000](http://localhost:3000). Use Node 22.

## Checks

| Command | Purpose |
| --- | --- |
| `npm run lint` | Lint source and tests |
| `npm run typecheck` | Regenerate route types and run TypeScript |
| `npm test` | SEO, redirect and content regression tests |
| `npm run build` | Production build with webpack |
| `npm run check` | Run every check above |

## Routes

| Path | Purpose | Indexing |
| --- | --- | --- |
| `/` | Company overview | Index |
| `/transformation` | AI Transformation | Index |
| `/kickstart` | AI Kickstart (AI training) | Index |
| `/work` and `/work/[slug]` | Case studies | Index |
| `/about` | Company and founders | Index |
| `/contact` | Contact form | Index |
| `/privacy`, `/terms` | Legal | Noindex |

Old routes redirect in `next.config.ts`.

## Forms and email

The contact form emails each enquiry to the team through [Resend](https://resend.com) with one `fetch` call (`src/lib/deliver.ts`). Set these environment variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `EMAIL_API_KEY` | Resend API key |
| `LEADS_FROM` | Sender on a domain verified in Resend (SPF and DKIM), for example `Elyst AI <hello@elystai.com>` |
| `LEADS_TO` | Where enquiries go. Defaults to `info@elystai.com` |

Until `EMAIL_API_KEY` and `LEADS_FROM` are both set, the form does not accept input: the first keystroke opens a notice with the phone number and email. Set the variables, redeploy, and the form goes live. Submitted values are never logged.

Also set a rate limit for `POST /api/*` in the Vercel Firewall (for example 5 per minute per IP).

## Content

- Page copy lives in `src/lib/site-content.ts`, `src/lib/training-content.ts` and `src/lib/work-content.ts`.
- Case studies are added in `work-content.ts`. Add the slug to `src/app/sitemap.ts` and `public/llms.txt`; a test checks both.
- The guide PDF is `public/downloads/elyst-ai-transformation-guide.pdf`; the "Get the guide" buttons download it directly (no page, no form).
- Share previews (WhatsApp, LinkedIn): drop a 1200 x 630 image in `public/images/og/` (`.jpg` or `.png`) named `home`, `transformation`, `kickstart`, `about`, `works` or `contact`. It is used automatically; otherwise a generated card is shown. Keep each under 300 KB, or WhatsApp skips the preview.
