# Pre-release search and AI retrieval checklist

## Crawl access

- [ ] Public routes return successful HTML responses without requiring JavaScript.
- [ ] `robots.txt` permits standard search crawlers and named AI search crawlers.
- [ ] `sitemap.xml` contains every intended indexable route and excludes retired routes.
- [ ] Internal navigation reaches every indexable page through normal links.

## Page meaning

- [ ] Every indexable route has one visible `h1` that states the page topic.
- [ ] Important claims, services, evidence, FAQs, and contact details exist as HTML text rather than canvas or image text.
- [ ] Headings follow a logical hierarchy and section labels do not replace headings.
- [ ] Each page answers its main user question directly before decorative detail.

## Search metadata

- [ ] Every indexable route has a unique title, description, and self-referencing canonical URL.
- [ ] Open Graph and Twitter metadata use valid titles, descriptions, and preview images.
- [ ] Structured data matches visible content and does not introduce unsupported claims.
- [ ] Legal, error, booking, and completion routes use intentional index/follow rules.

## AI retrieval

- [ ] `/llms.txt` gives a concise company definition, suitable use cases, human boundaries, ownership, evidence limits, key pages, and contact routes.
- [ ] Direct answers use consistent language with the visible website.
- [ ] Results are attributed as client-reported where independent verification is unavailable.
- [ ] Case-study pages distinguish observed session evidence from measured business impact.

## Quality gates

- [ ] Desktop and mobile views have no clipped text, overlapping controls, or layout shifts.
- [ ] Keyboard navigation, focus states, landmarks, labels, and reduced-motion behaviour work.
- [ ] Lint, type checking, tests, and production build pass.
- [ ] Generated HTML is sampled route by route for headings, metadata, canonical URLs, structured data, and core visible copy.
