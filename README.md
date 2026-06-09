# Elyst AI — Website

Marketing site for Elyst AI: AIOS (an AI employee for businesses) and the Accelerator (AI programs for people). Based in Kozhikode, Kerala, serving India and the GCC.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animation
- Self-hosted fonts, statically rendered (SSG) on every route

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

Requires **Node 20+** (see `.nvmrc`).

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/aios` | AIOS for Business |
| `/learn` | The Accelerator |
| `/circle` | The AI Circle |
| `/juniors` | AI for Juniors |

## Structure

```
src/
  app/         # routes, layout, metadata, robots.ts, sitemap.ts
  components/  # section + UI components
  lib/         # seo + schema helpers, utils
public/        # fonts, images, favicons, og-image
```

SEO/AEO basics (metadata, Open Graph, JSON-LD schema, robots, sitemap) live in
`src/app/layout.tsx`, `src/lib/seo.ts`, and `src/lib/schema.ts`.

## Deployment

Hosted on **Vercel** — connect the repo and it builds on push. No environment
variables are required.

## Branches

- `main` — production
- `dev` — active development (Vercel preview deploys)
