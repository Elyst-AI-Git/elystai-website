# SEO and launch plan (draft for review)

Nothing in this list is implemented yet. Tick, change or strike each item and send it back.
Style rules used: no prices, no unverified numbers, one CTA ("Get in touch").

## 1. Titles and meta descriptions

Titles stay under about 60 characters, descriptions under about 155. The root layout appends " | Elyst AI".

| Page | Proposed title | Proposed description |
|---|---|---|
| Home `/` | Elyst AI: AI Training and AI Systems for Businesses | We find the work AI can do for you, build the AI system, and train your people to use it. Based in Kozhikode, working across Kerala and the UAE. |
| AI Transformation `/transformation` | AI Transformation for Growing Businesses | A 6 step process to results. We find where AI fits, build and test it, then train your team. For growing businesses in Kerala and the UAE. |
| AI Kickstart `/kickstart` | Corporate AI Training for Teams | AI training built on your team's own work. One day, or two half days, in person in Kerala, Bengaluru and the UAE. |
| Work `/work` | Some of Our Work: AI Case Studies | Case studies from Arvind Fashions, Autobahn Mahindra, Kalyan Tourism and Travel and Nalakath Holdings. |
| Case pages `/work/[slug]` | {Client}: Case Study | Per client, one sentence from the `what` field. Nalakath waits on real details. |
| About `/about` | About Elyst AI: Founders Nihal Anas and Fathima Shirin P | We started Elyst AI because businesses struggle to get value out of AI. We build AI systems and train the people who use them. |
| Contact `/contact` | Get in Touch | Tell us what your team is stuck on. We reply with the next step. |
| Guide `/guide` | Put AI to Work in Your Business: The Guide | Keep the current description unless the guide content changes. |

Open question: should the home title lead with the brand or with the offer? Proposed: offer first.

## 2. Social preview (Open Graph and Twitter)

- Exists: sitewide `/images/og/site.png`, plus generated images for About, Kickstart and Transformation.
- Missing: Work index, case pages, Contact, Guide. Plan: one generated `opengraph-image.tsx` per case page showing the client logo on dark green.
- Check every image is 1200 x 630 and that the text matches the new headlines (Transformation hero changed).
- Add `og:locale` `en_IN` and `twitter:site` once the handle is confirmed (Instagram handle `elyst.ai` is known; X handle is not).

## 3. Favicon, icons and browser chrome

- Present: `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png`, 192 and 512 manifest icons, `site.webmanifest`.
- To do: confirm they show the current mark and not an older one; add an SVG icon only if it is a real vector (the old 2 MB fake-SVG was removed on purpose).
- To do: add `theme-color` (dark green `#03624c` or surface dark) and confirm manifest `name`, `short_name`, `background_color`.
- Tab title pattern: "{Page} | Elyst AI". Keep it consistent, including case pages and 404.

## 4. Structured data (JSON-LD)

- Keep: Organization, WebSite, BreadcrumbList, Person (founders), Service (both service pages).
- Organization: add `logo`, `sameAs` (LinkedIn, Instagram), `address` (Kozhikode, Kerala), `contactPoint` (email and phone from `CONTACT`), `areaServed` (Kerala, UAE, India).
- Founders: update `description` and `jobTitle` to the new About copy, and `image` to the new Nihal photo.
- FAQPage: Home and Transformation use it. Kickstart has it switched off. Decide whether to switch it on. Google shows FAQ rich results for few sites, so this is mostly for AI answer engines.
- Case pages: use the existing `creativeWorkSchema` only with facts we can stand behind. Skip anything unverified.
- Validate with the Rich Results Test and Schema.org validator after the build.

## 5. On-page structure

- One `h1` per page. Current h1s: Home "Put AI to work in your business.", Transformation "Change how your team works with AI", Kickstart "AI training built on your team's own work.", About "We started Elyst AI because businesses struggle to get value out of AI."
- Target phrases per page (for headings and body, not stuffing):
  - Home: AI for business, AI training Kerala, AI implementation.
  - Transformation: AI transformation for businesses, AI implementation Kerala, AI systems for SMEs.
  - Kickstart: corporate AI training, AI workshop for teams, AI training Kochi / Bengaluru / UAE.
  - Work: AI case study, AI training case study.
- Logo images need real `alt` text (client name). The new logo band uses plain `<img>`: add `width`, `height` and `loading="lazy"`.
- Internal links: Home to both services and Work; Work cards to case pages; case pages to the matching service. Anchor text should say what the page is, not "click here".
- Clicking the page you are already on now scrolls to the top (done in this round).

## 6. Technical SEO

- `robots.txt`: allows all and lists the sitemap. Keep. Make sure `/guide/thank-you` and `/api` are `noindex` or disallowed.
- `sitemap.xml`: add `lastModified` per page from real edit dates instead of one shared date. Includes the Nalakath case already.
- Canonicals: set by `pageMeta`. Confirm case pages and the 404 route too.
- Redirects: `/training` currently lands on `/kickstart`. Confirm this is a permanent (301) redirect, and list any other old URLs that need one.
- `llms.txt`: still says "AI interns" and "12-session curriculum" and lacks Nalakath. Update to "AI system", add the Nalakath line, and use 3,000+ people, 75+ sessions, 15+ businesses.
- Security headers are already set; no change.

## 7. Performance (it affects rankings and is your stated priority)

- Run Lighthouse mobile on Home, Transformation, Kickstart and one case page. Targets: LCP under 2.5 s, CLS under 0.1, INP under 200 ms.
- Hero visuals are CSS only. The Home hero still uses the dither canvas cards; measure its cost on a mid-range phone.
- Pinned six-step section and the meter use rAF-throttled scroll listeners. Confirm no long tasks on a low-end Android.
- Case folder uses only transform and opacity, with no extra package.
- Lazy-load below-the-fold logos and the founders photos; keep the hero image priority.
- Check font loading (preload the display font, `display: swap`).

## 8. Search presence

- Google Search Console: verification file exists. Submit the sitemap and watch coverage for the new case pages.
- Bing Webmaster Tools: add and import from Search Console.
- Google Business Profile for Kozhikode, with the same name, address and phone as the site footer (NAP consistency). Decide whether to add a UAE listing.
- LinkedIn company page and founder profiles: match the new About wording.

## 9. Content gaps that help search (not part of this round)

- One short page per case with real quotes (needs the employee feedback).
- A FAQ for each audience (HR, founders).
- Later: a resources or blog area built on the guide.

## 10. What I need from you for the client work pages

Each case page is indexed on its own, so each one needs the items below. Anything marked (confirm) is on the page now as a placeholder or a guess.

For every client (Arvind Fashions, Autobahn Mahindra, Kalyan Tourism and Travel, Nalakath Holdings):
1. Written permission to name the client and show their logo (a yes in a message is enough).
2. The exact company name as they write it (Kalyan Tourism and Travel LLC? Nalakath Holdings or Nalakath?).
3. Month and year of the work, and the place (city, or the UAE emirate).
4. Format and group: AI Kickstart or AI Transformation, number of people, which teams.
5. What they asked for, in one or two sentences, in their words if possible.
6. What we did, step by step (three to five steps), with only facts you can stand behind.
7. What the team left with.
8. Employee feedback: the exact words, a name or "Participant from the session", and permission to publish.
9. One to three real photos from the session (no screens with client data), and permission to use them.
10. A contact or link to approve the page before it goes live.

Page-specific confirmations:
- **Kalyan Tourism and Travel (confirm all):** it replaced HAL on cards and the sitemap. Place (I assumed the UAE from the logo), month, whether it was training or transformation, what we did. The page's meta description currently says "Date to confirm"; it must not go live like that.
- **Nalakath Holdings (confirm all):** month, scope, what was built, who was trained.
- **HAL Management Academy:** its case page is removed and its logo stays in the logo band. Do you want it kept as a hidden page, or deleted for good? Also confirm we may still show their logo.
- **Arvind and Autobahn:** confirm "about 40 people", the dates, and that the quotes can be published.
- **Logo band:** confirm permission for De' Lead, Dreamfield, Edex, Jizcon, Kalyan, Kinford and Looco's Pizza to appear by logo.

For SEO on those pages I will then add: a title and description per client, a social preview with both logos, case-study structured data using only these facts, and links from the matching service page.

## 11. Other questions for you

1. Home title: offer first, or brand first?
2. Should Kickstart FAQ markup be switched on?
3. Do you have an X/Twitter handle for the preview cards?
4. Are `/training` and any other old URLs live elsewhere that need redirects?
5. Do we list a UAE address or keep the UAE as a service area only?
6. Nalakath: month, scope and quote, so the case page can be indexed with real content.
7. Nihal's card says "without the team" at the end. Did you mean "without us"? I used your exact wording.

## 12. Status after the case-study spec (20 Nov 2026)

Done from `elyst-case-studies.md`: keyword slugs with 301 redirects from the old URLs, per-page title and meta description, category eyebrow and breadcrumb, Quick answers with FAQ markup, Article and BreadcrumbList markup, sitemap and `llms.txt`, hero photos with the given alt text.

Still open:
- Autobahn quote needs Minesh's approval (section hidden until then).
- Nalakath and Kalyan quotes (sections hidden).
- Kalyan: public company name, place, month and group size (rows hidden until confirmed).
- Autobahn Mahindra logo (shown as text under Group companies for now).
- Arvind: written permission for logo and quote.
- `og:image` is the hero photo at its own size; a 1200 x 630 branded version per case would preview better.

## 13. Status after the SEO, security and performance pass (20 Nov 2026)

Done (see `docs/agent-brief-seo-security-performance.md` for the full list):

- Dependencies: Next 16.4.6, `npm audit` reports 0 vulnerabilities. Removed `framer-motion`, `@base-ui/react`, `class-variance-authority`, `tw-animate-css`, `shadcn`.
- Forms: delivery through Resend (`src/lib/deliver.ts`), origin, size, content-type and fill-time checks, header-injection safe. Until `EMAIL_API_KEY` and `LEADS_FROM` are set, the forms show a "we are working on this" notice with the phone and email.
- Guide: optimised PDF at `/downloads/elyst-ai-transformation-guide.pdf` (2.4 MB to 1.7 MB), offered on `/guide/thank-you`, noindex header on `/downloads/*`.
- Copy and meta: India and GCC wording, new titles and descriptions, FAQ answers rewritten for answer engines (draft, owner to approve), stale "AI interns" copy removed, Kalyan dummy quote removed.
- Structured data: one Organization, one FAQPage per page, WebPage nodes, Course for Kickstart, ItemList for Works, areaServed for India and the GCC.
- `llms.txt` rewritten, `theme-color` added, `/404` route removed, case studies linked from the footer, generated share cards for Works and each case.
- Performance: no animation library (about 45 KB gzipped JavaScript less per page), Manrope as 14 KB WOFF2 files with a size-matched fallback, shader loaded only near view on wide screens with a mouse, one hero canvas instead of two, logo sizes set.
- Devices: larger tap targets, hero switches to the stacked layout below 1024 px, testimonial pause button.

Not done:

- Lighthouse before and after numbers (no Lighthouse in this environment). Measure on a production build.
- Raw HTML size of Home and Transformation (about 230 to 270 KB, 33 to 38 KB gzipped): most of it is the framework's page data, left as is.
- Owner tasks: Resend key and DNS, Vercel Firewall rate limit, Google Business Profile, Search Console and Bing submission, real Kalyan quote, designed share images in `public/images/og/`.
- New Kerala, Bengaluru and UAE landing pages (need unique content).
