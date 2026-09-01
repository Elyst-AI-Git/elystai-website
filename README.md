# Elyst AI website

Marketing site for Elyst AI's workflow identification, implementation, custom AI development, and team training services.

## Stack

- Next.js 16, React 19, and TypeScript
- Tailwind CSS v4
- Self-hosted DM Sans and Manrope fonts
- Vercel Analytics
- Framer Motion only for the homepage and training scroll sequences

## Local development

```bash
npm install
npm run dev
```

The preview runs at [http://localhost:3000](http://localhost:3000).

## Checks

| Command | Purpose |
| --- | --- |
| `npm run lint` | Lint source and tests |
| `npm run typecheck` | Regenerate route types and run TypeScript |
| `npm test` | Run booking and redirect regression tests |
| `npm run build` | Create the production build with webpack |
| `npm run check` | Run every check above |

## Current routes

| Path | Purpose | Indexing |
| --- | --- | --- |
| `/` | Company overview | Index |
| `/services` | Identify, build, and handover | Index |
| `/training` | Team training and program history | Index |
| `/about` | Company and founders | Index |
| `/book/identify` | Identify scheduler | Noindex |
| `/book/training` | Training scheduler | Noindex |
| `/booking-complete` | Booking confirmation | Noindex |
| `/privacy` | Privacy policy | Noindex |
| `/terms` | Website terms | Noindex |
| `/robots.txt` | Crawler rules | N/A |
| `/sitemap.xml` | Four canonical commercial pages | N/A |

Retired routes, including `/circle` and `/register`, redirect directly to their current destination in `next.config.ts`.

## Booking configuration

The known live Cal.com event is retained as a local fallback. Production should set two dedicated events so service and training conversions remain separate:

```bash
NEXT_PUBLIC_CAL_IDENTIFY_URL=https://cal.com/elyst-ai/your-identify-event
NEXT_PUBLIC_CAL_TRAINING_URL=https://cal.com/elyst-ai/your-training-event
```

Configure each Cal event's success redirect to `/booking-complete?intent=identify` or `/booking-complete?intent=training`. No other environment variables are required.

## Deployment

Vercel runs the same `npm run build` command. Metadata, schema, robots, and sitemap logic live under `src/app`, `src/lib/seo.ts`, and `src/lib/schema.ts`.
