# ELYST AI — Website Revamp: Content & Structure Blueprint

*A build-once specification for developers and copywriters.*

**Elyst AI LLP · Kozhikode, Kerala**
Two arms: AI Services (AIOS) led by Nihal Anas · AI Accelerator led by Fathima Shirin P
Prepared June 2026

---

> ## ⚠️ DESIGN OVERRIDE — read before anything else
> This blueprint was written before the design direction was finalised. Two
> things in the section text below are **superseded by `DESIGN.md`**, which
> always wins:
>
> 1. **"Dark" / "dark hero" → LIGHT.** The site is **light by default** (warm
>    off-white `--bg`, emerald accent). Dark is allowed only as an *occasional
>    single contrast section*, never as the page or hero default. Wherever the
>    text below says "dark", read it as "light, unless a deliberate contrast
>    section is wanted here".
> 2. **"Violet" / "Accelerator violet" → NO violet. Shared emerald, tone-only.**
>    Both arms use the **same emerald palette**. The Accelerator is differentiated
>    by *tone* — softer shadows, rounder cards, more whitespace, warmer human
>    imagery — **not** by a violet accent. Wherever the text below says "violet"
>    or "violet-tinted", read it as "the Accelerator's warmer *tone* on the shared
>    emerald palette" (see DESIGN.md §3). The open question at the end of this doc
>    about "Services-green + Accelerator-violet pair" is now **resolved: one shared
>    emerald palette, tone-only split.**
>
> Everything else in the blueprint (structure, content, order, CTAs, proof
> points, SEO) stands as written.

## 0. How to read this document

This is a blueprint, not finished copy. Every section tells the developer what to build and the copywriter what to write — the structure, the order, the proof points to surface, the visual needed, and the call-to-action. Final wording is written against this skeleton, not invented from scratch.

The document is ordered the way a visitor experiences the site: the overall map first (sitemap and navigation), then page by page, top to bottom, for each arm, then the shared and supporting pages, then design references, then the SEO / AEO / GEO and technical layer that makes the site findable by both Google and AI engines.

> **The one rule that governs every decision here**
> Convey what we do to the right person as fast as possible. A real-estate founder in Dubai and a working professional looking to upskill arrive on the same domain but want completely different things. The site's first job, on every page, is to route each of them to their answer in one scroll — then let the styling and interactions do the persuading.

---

## 1. Sitemap

Every page the site should have, grouped by arm. Pages marked **NEW** do not exist today and are part of this revamp. The two arms share one domain and one navigation shell but are visually distinct (see Design Direction).

### Top level

| Page | Purpose (one line) |
|---|---|
| **Home / Landing** | The fork in the road. Establishes Elyst AI as a serious AI company and sends each visitor type toward their arm within one scroll. |
| **About / Team** | Who Elyst is — two 23-year-old founders among Kerala's first AI graduates. Trust and credibility for both arms. |
| **Contact / Book a call** | Single conversion hub. Routes to the right next step depending on whether the visitor is an SME lead or an upskilling lead. |

### Arm 1 — AI Services (Nihal)

| Page | Purpose |
|---|---|
| **AIOS (NEW — highest priority)** | The flagship Services page. Explains the AI Operating System for SMEs end to end and drives "Book a call". The single most important new page on the site. |
| **AIOS — Use cases / Industries (optional v2)** | Tailored proof for real estate, staffing, education, logistics. Can launch as anchored sections inside the AIOS page, split into its own page later. |

### Arm 2 — AI Accelerator (Shirin)

| Page | Purpose |
|---|---|
| **Accelerator overview (NEW)** | The hub for the upskilling arm. One page that frames the ladder — Circle → AI Junior → AI Yathra → Flagship Course — and sends each visitor to the right program. |
| **Elyst AI Circle (exists, refresh)** | Sell the paid membership community. Standard vs Founding Member tiers, the July 15 deadline. |
| **AI Junior (exists, refresh)** | Sell the 5-day bilingual program for school students, Classes 5–10. |
| **AI Yathra (NEW standalone)** | Sell the virtual GenAI cohort for working professionals and career switchers. Currently only a mention on Home. |
| **Flagship Course (NEW — plan now, build shell)** | The anchor product of the arm. GenAI for professionals. Format not locked — launch as a waitlist / "notify me" page first. |

### Supporting / system pages

| Page | Purpose |
|---|---|
| **Blog / Insights (recommended)** | The engine for SEO, AEO and GEO. Where AI engines find quotable, citable answers about AIOS and AI upskilling. Strongly advised — see Section 12. |
| **Privacy Policy / Terms** | Legal baseline. Required for payment, community signups and trust. |
| **Thank-you / confirmation pages** | Post-signup and post-booking pages. Prime real estate for the next step and for tracking conversions. |
| **404** | On-brand dead-end recovery that pushes back into the two arms. |

> **Page count summary**
> Must-build now: Home, AIOS (new), Accelerator overview (new), Circle (refresh), AI Junior (refresh), AI Yathra (new), About, Contact, Privacy/Terms.
> Plan now, soft-launch: Flagship Course (waitlist page), Blog.
> That is roughly 10–12 pages. Resist adding more — depth per page beats page count.

---

## 2. Navigation structure

The navigation has to serve two audiences that barely overlap, without confusing either. The cleanest pattern is a top nav split by arm, not by feature.

### Primary (desktop) navigation

Left: logo. Centre/right: the items below. Far right: one primary button.

| Nav item | Behaviour |
|---|---|
| **AIOS for Business** | Direct link to the AIOS page. Plain link, no dropdown — this is the money page and friction should be zero. Tint subtly toward Services green on hover. |
| **Learn AI** | Dropdown revealing the Accelerator: Overview, Circle, AI Junior, AI Yathra, Flagship Course (with a "coming soon" tag). Tint violet on hover. |
| **About** | Link to About / Team. |
| **Book a call (button)** | Solid accent button, always visible, sticky on scroll. On an Accelerator page it can read contextually as "Join". |

> **Why split the nav by arm, not by "Products / Services / Community"**
> A visitor self-identifies in under two seconds: "I run a business" vs "I want to learn". Labelling the two doors in their language — "AIOS for Business" and "Learn AI" — routes them before they have to think. Feature-based labels force them to translate, which is friction.

### Mobile navigation

- Hamburger opens a full-screen menu — with 63% of 2026 web traffic mobile and over 60% of membership traffic mobile, the menu must feel native, not a desktop afterthought.
- Two clearly separated groups at the top: "For Business (AIOS)" and "Learn AI" with sub-items nested under each. About and Book a call below.
- The "Book a call" / "Join" button pinned to the bottom of the screen as a persistent bar.

### Footer

The footer is the second sitemap and a major AEO/GEO signal (it tells crawlers the full entity structure). Four columns:

| Column | Contents |
|---|---|
| **AIOS for Business** | AIOS overview, Use cases / Industries, Book a call, (later) pricing enquiry. |
| **Learn AI** | Accelerator overview, Circle, AI Junior, AI Yathra, Flagship Course. |
| **Company** | About, Blog/Insights, Contact, Careers (if hiring interns publicly). |
| **Legal & social** | Privacy, Terms, LinkedIn (Nihal + Shirin + company), Instagram, WhatsApp/community link, email, registered entity line: "Elyst AI LLP · Kozhikode, Kerala". |

> **Footer detail that punches above its weight**
> Put the full legal entity name, LLPIN and city in the footer on every page. It is a strong trust and entity-recognition signal — both for SME founders who want to know you are a real registered company, and for AI engines building an entity profile of Elyst AI (see GEO, Section 12).

---

## 3. Home / Landing page

> **Purpose** — Who it is for: both visitor types, arriving cold. Who it must satisfy: the one who has 8 seconds. What it must make them do: self-identify and click into their arm. The Home page does not sell AIOS or any course in full — it sells the choice. If it tries to explain everything, it explains nothing.

**Sections in order, top to bottom:**

### 1. Hero — the brand statement + the fork
- **Goal:** Say who Elyst is in one line, then immediately offer the two doors.
- **Content:** Headline — a confident, plain-language statement of what Elyst does for both audiences (avoid jargon like "LLM-powered", "agentic"). Sub-line: one sentence naming the two things — AI systems that run a company's operations, and programs that make people fluent in AI. **The fork:** two large clickable cards above the fold. Left: "Run your business on AI → AIOS". Right: "Become fluent in AI → Learn". Each with a one-line benefit and an arrow. This is the single most important interaction on the site.
- **Visual:** Light hero (warm off-white `--bg`). Subtle, restrained motion only — a soft drifting gradient or gentle particle field, nothing busy. Fork cards lift gently and the emerald accent edge strengthens on hover. No stock photo. Optional looping micro-mockup (a WhatsApp message turning into a generated PDF). *(A single dark section may appear lower on the page for contrast — but the hero and the page default are light.)*
- **CTA:** Two of equal weight — "See AIOS" and "Explore programs". Do not bury one.

### 2. Proof bar / credibility strip
- **Goal:** Buy trust in one glance before the visitor scrolls further.
- **Content:** A thin strip of hard proof: community members (34+ and growing), batches run (AI Junior x2, AI Yathra 2.0), "among Kerala's first AI graduates", registered LLP. Real numbers only. Client logos/testimonials (once the Dubai pilot is live) live here.
- **Visual:** Clean logo/stat row on the light surface, emerald accent only on the numbers. Numbers count up on scroll-in.
- **CTA:** None — supports, does not convert.

### 3. Arm 1 teaser — AIOS for Business
- **Goal:** Give the SME visitor enough to want the full AIOS page.
- **Content:** Section tinted toward Services green. Headline: the core promise — AIOS is the smart operations layer that runs on the WhatsApp/Telegram your team already uses. Three benefit lines mapped to known SME pains: knowledge trapped in heads → instant answers; manual documents → generated from one message; coordination chaos → automatic daily task briefings. One sentence on the model: Elyst configures and deploys per client — nothing to install.
- **Visual:** A single strong product mockup — a phone showing a WhatsApp/Telegram thread where a staff question is answered + a generated PDF returned. Real screenshot in a clean device frame.
- **CTA:** "See how AIOS works →".

### 4. Arm 2 teaser — Learn AI (Accelerator)
- **Goal:** Give the upskilling visitor the ladder and a door.
- **Content:** Section tinted toward Accelerator violet — a deliberate, warmer, community-led feel. Headline: become genuinely good at using AI for your work or your child's future — in your language. Show the four programs as a ladder/row with one line each: Circle (community), AI Junior (kids 5–10), AI Yathra (professionals), Flagship Course (coming). Make clear they are rungs, not random products.
- **Visual:** Four compact violet-tinted cards, each with a tiny emblem. Warmer and more human — real faces/screenshots of sessions allowed here, still no generic stock.
- **CTA:** "Explore programs →".

### 5. Why Elyst / founder credibility
- **Goal:** Move trust from "this looks slick" to "these are real, capable people".
- **Content:** Two 23-year-old founders, among Kerala's first formally trained AI graduates, building from Kozhikode for India and the GCC. Nihal leads the systems; Shirin leads the learning. One or two real testimonials with names/photos if available.
- **Visual:** Two founder portraits (real, on-brand), short bios on the light surface. Testimonials as quote cards with avatar + name + role.
- **CTA:** "Meet the team →".

### 6. Final CTA band + footer
- **Goal:** Last chance to route anyone who scrolled to the bottom undecided.
- **Content:** Re-present the fork, simplified: "Running a business?" → Book a call. "Want to learn?" → Explore programs. Footer as in Section 2.
- **Visual:** Full-width accent band, two paths side by side.
- **CTA:** Dual: "Book a call" / "Explore programs".

> **Highest-leverage section on Home:** the hero fork (Section 1). If only one thing is perfect, it is this. A visitor who cannot tell in 8 seconds which door is theirs will leave, and nothing further down recovers them.

---

## 4. AIOS page (NEW — highest priority on the whole site)

> **Purpose** — For Visitor Type A, the SME founder or operations lead (real estate, staffing, education, logistics), arriving from LinkedIn, a WhatsApp referral, or the GCC network. They need answered: Can this fix my team's daily chaos? Is it real? What does it cost? Who runs it? It must make them **book a call**. Feel: serious, premium, product-led, light-and-clean with emerald accent — like a real tech company's product page, not an agency brochure. (Dark allowed only as an occasional contrast section.)

**Sections in order, top to bottom:**

### 1. Hero — the promise + proof it is real
- **Goal:** In one screen: what AIOS is, who it is for, and that it actually works.
- **Content:** Headline — AIOS as the company's smart operations intern that already knows the whole business and works inside WhatsApp/Telegram. Concrete and outcome-led. Sub-line names the audience (SMEs of 5–50 people, no technical team) and mechanism (message it, it answers and acts). Single primary CTA + secondary "Watch the 90-second walkthrough". Micro-proof under the CTA: "Configured and deployed for you. Nothing to install."
- **Visual:** Split-screen hero (copy left, product right) — a live-looking WhatsApp/Telegram conversation where one message triggers a real outcome (an offer-letter PDF, or a knowledge answer). Subtle motion: the message "sends" and the reply types in on loop.
- **CTA:** "Book a call" (primary). "Watch how it works" (secondary, ghost).

### 2. The problem — name their daily chaos
- **Goal:** Make the founder feel understood in their own words before pitching anything.
- **Content:** Exactly the three problems AIOS solves: knowledge lives in a few heads and everything waits on them; documents (offer letters, invoices, certificates) are made by hand, slowly and inconsistently; nobody knows what to do each morning without being chased. Do not list problems the product doesn't fix.
- **Visual:** Three icon + line blocks, deliberately muted/desaturated on a `--surface-muted` fill — visually greyer and flatter than the brighter "after" sections, so the contrast does the storytelling. (No accent colour here; save the emerald for the "after".)
- **CTA:** None — let it land.

### 3. How AIOS works — the one-message mechanic
- **Goal:** Show the magic concretely so it stops sounding like a chatbot.
- **Content:** Three steps: (1) your team messages AIOS, (2) AIOS understands using your company's own documents and tools, (3) it answers or produces the document/task automatically, with the right person seeing the right thing. One line drawing the contrast vs ChatGPT: AIOS knows your business and acts inside it; a generic chatbot does neither.
- **Visual:** Animated three-step flow or a short looping screen-recording of a real flow. High-value place for one strong interactive element — let the user click through the three steps.
- **CTA:** None.

### 4. Capabilities — the modules
- **Goal:** Show breadth without overwhelming. Prove it is a system, not a trick.
- **Content:** Card grid, each with a one-line outcome and a real screenshot: Knowledge Base Q&A; Document Generation (offer letters, invoices, certificates as PDFs); Daily Task Briefings & workflow automation; Google Workspace / Canva / SME-tool integrations; Role-based access control. End with an open card: "…and capabilities configured to your workflows".
- **Visual:** Real product screenshots in each card (no stock). Cards reveal on scroll. Consider a tabbed interface that expands each capability to a larger screenshot + 2-line explainer.
- **CTA:** None.

### 5. Built for your industry — use cases
- **Goal:** Let the specific visitor see themselves. Real estate first (the live pilot).
- **Content:** Tabs/anchored blocks for Real estate, Staffing agencies, Education businesses, Logistics SMEs. Each: the specific pain and the specific AIOS flow that fixes it. Lead with real estate; fold in the Dubai client outcome as a mini case study once live.
- **Visual:** Per-industry mockup or screenshot. Can later graduate into its own Use-cases page.
- **CTA:** "Book a call" contextual to their industry.

### 6. The model & onboarding
- **Goal:** Kill the "is this another tool I have to set up?" objection.
- **Content:** The configured-service model plainly: not SaaS you install. Elyst discovers your workflows, configures AIOS, deploys it, and supports it. Your team only needs WhatsApp or Telegram. Onboarding timeline: discovery → configuration → deployment → training. Mention the optional AI-tools training add-on (NotebookLM, Claude Projects). Show the Google Drive / Workspace connection as an onboarding preview.
- **Visual:** A clean horizontal stepper. Optional small mockup of the Drive OAuth connect screen.
- **CTA:** None — flows into pricing.

### 7. Pricing framing (no numbers published)
- **Goal:** Signal premium, set expectation of a custom quote, qualify out tyre-kickers.
- **Content:** Do **not** publish exact figures. Present the structure: one-time setup fee, monthly retainer that scales with the modules you run, optional AI-tools training add-on. Frame as "configured to your business". A short "who this is for / who this is not for" qualifier builds trust and filters leads. The action is always "book a call for a tailored quote".
- **Visual:** A three-part structure diagram (Setup · Retainer · Training add-on), not a pricing table.
- **CTA:** "Get a tailored quote → Book a call".

### 8. Proof & founder
- **Goal:** Final credibility before the ask.
- **Content:** Who builds and runs AIOS: Nihal Anas, Chief AI Officer; the team; registered LLP. Build philosophy (configured per client, supported directly). Testimonial or pilot outcome when available — until Dubai is live, use the strongest honest signal (live deployments, working flows demoed).
- **Visual:** Founder portrait + short bio. Quote card if available.
- **CTA:** None.

### 9. FAQ
- **Goal:** Remove last objections AND feed AEO/GEO (AI engines quote FAQs heavily).
- **Content:** Real questions: Do we need technical skills? What if our team only uses WhatsApp? Is our data secure / where does it live? How long does setup take? What does it cost? Can it work in the GCC / in Arabic? How is this different from ChatGPT? Answer each in 2–4 sentences, plain language. Mark up with FAQPage schema (Section 12).
- **Visual:** Accordion. Keep it text — crawlable, citable.
- **CTA:** None.

### 10. Final CTA band
- **Goal:** The conversion.
- **Content:** One unambiguous line and one button. Optionally a calendar embed so the call books without leaving the page.
- **Visual:** Full-width green band, optional inline scheduler.
- **CTA:** "Book a call".

> **Highest-leverage sections on AIOS:** (1) the hero — promise + a real product mockup that proves it works; (2) how it works — the one-message mechanic that separates AIOS from a chatbot; (3) the FAQ — objection-killer and the page's biggest AI-citation asset. If these three are right, the page converts even if the rest is plain.

---

## 5. Accelerator overview page (NEW)

> **Purpose** — For Visitor Type B (professionals, students/parents, career switchers), arriving from Instagram, Shirin's LinkedIn, or a community referral. It must frame the four programs as a single ladder so the visitor finds the rung that fits and clicks through. This page sells the choice; the program pages sell the program. Feel: warmer, more human, community-led, Accelerator violet — a deliberate tonal shift from the Services world.

### 1. Hero — the mission
- **Goal:** Say what the Accelerator is for in human terms.
- **Content:** Headline — become genuinely capable with AI, for your career, work, or child, taught in your language (Malayalam + English). Sub-line names who it serves (students, professionals, business owners across India and the GCC) and the format (live, bilingual, community-backed).
- **Visual:** Warm, soft light hero — Accelerator tone (rounder cards, softer shadows, more whitespace, warm human imagery) on the shared emerald palette. A real montage/screenshot from a live session or community, tastefully framed. (Warmth comes from tone, not a new colour — see DESIGN.md §3.)
- **CTA:** "Find your program ↓".

### 2. The ladder — choose your program
- **Goal:** The core routing interaction of the page.
- **Content:** Four cards as a progression: Circle (ongoing community) · AI Junior (school students 5–10) · AI Yathra (working professionals, cohort) · Flagship Course (deep structured program — coming soon). Each card: who it's for, format, price signal, single outcome. Make the progression legible — Circle is the always-on layer; the others are intensives; the Flagship is the deep dive everything feeds into.
- **Visual:** Four violet cards with who-it's-for badges. Hover lifts and reveals the CTA. Consider a "Which is right for me?" toggle (student / professional / parent) that highlights the matching card.
- **CTA:** Per card: "Join the Circle", "Enrol AI Junior", "Join AI Yathra", "Get notified".

### 3. Why learn with Elyst
- **Goal:** Differentiate from generic online AI courses.
- **Content:** Bilingual and local (Malayalam + English, for Indian and GCC learners). Live, not just recorded. Community-backed so learning doesn't stop when the session ends. Taught by practitioners actually building AI products (the Services arm is the proof).
- **Visual:** Three/four value blocks, real session imagery.
- **CTA:** None.

### 4. Proof — results & voices
- **Goal:** Social proof concentrated in one place.
- **Content:** Hard numbers — Circle 34+ members and growing; AI Junior 2 batches run (Apr–May 2026); AI Yathra 2.0 delivered Dec 2025 with 80+ community members. Member/parent/participant testimonials with names and photos.
- **Visual:** Stat row + testimonial cards with avatars. Numbers count up on scroll.
- **CTA:** None.

### 5. Final CTA + footer
- **Goal:** Catch the undecided.
- **Content:** Re-present the ladder simplified, plus a soft "not sure where to start? Join the Circle" nudge — the lowest-commitment entry point and the funnel's top.
- **Visual:** Violet CTA band.
- **CTA:** "Join the Circle" as the default low-friction action.

> **Highest-leverage section:** the ladder (Section 2). The Accelerator's whole problem is that four products confuse a newcomer. If the ladder makes the progression obvious and routes by visitor self-ID, the page works.

---

## 6. Elyst AI Circle page (exists — refresh)

> **Purpose** — Sell the paid membership community; the lowest-friction entry to the whole Accelerator funnel. Surface the urgency: the Founding Member rate locks on **July 15**. Feel: warm, social, alive — community pages convert on belonging, not features.

### 1. Hero — the promise of belonging
- **Goal:** Sell the feeling of being in the room where AI is understood early.
- **Content:** Headline — stay ahead of AI without drowning in it; a curated community that filters noise into what matters for your work. Sub-line: who it's for (professionals and business owners), what you get weekly, and that it lives where you already are (WhatsApp).
- **Visual:** A real (anonymised if needed) glimpse of the community feel — a curated update, a discussion snippet. Member count badge: "34+ members".
- **CTA:** "Join the Circle".

### 2. What you actually get
- **Goal:** Make the intangible concrete.
- **Content:** Curated AI updates, tools and use cases, weekly prompts, peer discussion, member-only content. Frame each as a benefit ("never miss the tool that matters", not "tools section").
- **Visual:** Real screenshots of past curated updates / weekly prompts.
- **CTA:** None.

### 3. Pricing & tiers
- **Goal:** Convert. Transparent pricing reduces signup friction sharply.
- **Content:** Two tiers side by side: Standard ₹299/month; Founding Member (locked lifetime rate, limited, closes July 15). Two tiers is clean. Clear "best for" label on each. Make the Founding Member urgency explicit — a deadline line and ideally a live countdown to July 15. State cancellation/renewal terms upfront.
- **Visual:** Two pricing cards, Founding Member highlighted in accent with a "closes July 15" ribbon and countdown.
- **CTA:** "Become a Founding Member" (primary) / "Join Standard".

### 4. Social proof
- **Goal:** Belonging proof.
- **Content:** Member testimonials with names/photos; what they've gained. Member count and growth.
- **Visual:** Quote cards with avatars.
- **CTA:** None.

### 5. FAQ + final CTA
- **Goal:** Remove last doubts; convert; feed AEO.
- **Content:** Questions — What platform is it on (Nas.io + WhatsApp)? How much time weekly? Can I cancel anytime? What happens after July 15? Is it worth ₹299? FAQPage schema. Final join band after.
- **Visual:** Accordion + violet CTA band.
- **CTA:** "Join the Circle".

> **Highest-leverage section:** Pricing & tiers (Section 3) with the July 15 Founding Member deadline made unmissable. Transparent pricing + a real deadline is the conversion engine of this page.

---

## 7. AI Junior page (exists — refresh)

> **Purpose** — Sell the 5-day live bilingual AI program for school students, Classes 5–10, at ₹699–₹999. Key nuance: the buyer is the **parent**, the user is the **child**. Reassure the parent (safe, worthwhile, age-appropriate, real outcomes) while exciting the child. Feel: still violet/Accelerator but brighter, friendlier, more energetic.

### 1. Hero — the parent's promise
- **Goal:** Speak to the parent's hope for their child in one line.
- **Content:** Headline — give your child a real head start with AI, taught live, in Malayalam + English, in 5 days. Sub-line: Classes 5–10, live online, morning and afternoon batches, run by Kerala's first AI graduates.
- **Visual:** Bright, friendly mockup or real photo/screenshot from a live student session (with consent). Energetic but trustworthy.
- **CTA:** "Enrol your child".

### 2. What your child will learn (the 5 days)
- **Goal:** Make the curriculum concrete so parents see value.
- **Content:** Day-by-day outline: what the child does each day and what they can do by the end. Emphasise hands-on, safe, age-appropriate, practical outcomes. Show schedule and batch times clearly.
- **Visual:** A 5-day timeline/curriculum graphic. Sample of student output if available.
- **CTA:** None.

### 3. Why it's safe & worth it (parent reassurance)
- **Goal:** Address the parent's real objections head-on.
- **Content:** Live and supervised, bilingual so nothing is lost, small focused program, qualified instructors. Two batches already run successfully (Apr–May 2026) — proof it works.
- **Visual:** Reassurance blocks + a "batches already run" proof badge.
- **CTA:** None.

### 4. Pricing, batches & enrolment
- **Goal:** Convert with clarity on price, time and how to join.
- **Content:** ₹699–₹999 (state what determines the range). Morning and afternoon batch options with times and dates. Simple enrolment step.
- **Visual:** Batch selector (morning/afternoon) + price. Minimal fields, mobile-first.
- **CTA:** "Enrol your child".

### 5. Parent testimonials + FAQ
- **Goal:** Social proof from other parents; remove doubts; feed AEO.
- **Content:** Testimonials from parents of past two batches with names. FAQ: age suitability, device/internet needs, language mix, missed session, certificate. FAQPage schema.
- **Visual:** Parent quote cards + accordion.
- **CTA:** "Enrol your child".

> **Highest-leverage section:** Parent reassurance + curriculum (Sections 2 & 3). The parent buys when convinced it is safe, real, and worth their child's time. The two completed batches are the strongest proof — surface them prominently.

---

## 8. AI Yathra page (NEW standalone)

> **Purpose** — Sell the virtual GenAI cohort for working professionals, freshers and career switchers. It needs its own page so it can rank, convert and be linked from campaigns. It is **recurring, not a one-off** — the page must read as an ongoing program with cohorts, not a past event. Feel: professional, momentum-driven (the name means "journey" — lean into cohort-as-journey). Violet/Accelerator, slightly more serious than AI Junior.

### 1. Hero — the journey framing
- **Goal:** Position AI Yathra as a guided sprint from "AI-curious" to "AI-capable".
- **Content:** Headline — go from using AI occasionally to working with it confidently, in a focused, live, multi-day cohort. Sub-line: who it's for (working professionals, freshers, career switchers), format (virtual, multi-day, community-backed), and that the next cohort is forming. Always show a next-cohort date or a waitlist — never let it look finished.
- **Visual:** Cohort/journey visual — a path or progress motif. Real session/community imagery from AI Yathra 2.0.
- **CTA:** "Join the next cohort" (or "Join the waitlist" between cohorts).

### 2. What the cohort covers
- **Goal:** Concrete curriculum + the cohort cadence that builds urgency.
- **Content:** Day-by-day / module outline of the multi-day sprint and the outcome by the end. Show start date, daily cadence, and the live + peer-learning model.
- **Visual:** Multi-day curriculum timeline + cadence graphic.
- **CTA:** None.

### 3. Proof — Yathra 2.0
- **Goal:** Use the December 2025 delivery as concrete proof.
- **Content:** AI Yathra 2.0 — 3-day virtual program delivered Dec 2025, 80+ WhatsApp community members. Participant testimonials. The "2.0" signals a recurring, improving program.
- **Visual:** Stat highlight (80+ members) + participant quotes with names.
- **CTA:** None.

### 4. Who it's for / who it's not
- **Goal:** Qualify the right learner; bold disqualification builds trust.
- **Content:** Clear "this is for you if… / this is not for you if…" block. Filters out the wrong people and raises perceived fit for the right ones.
- **Visual:** Two-column for/not-for block.
- **CTA:** None.

### 5. Pricing, dates & enrolment + FAQ
- **Goal:** Convert.
- **Content:** Cohort price, next dates, enrolment step. If between cohorts, a waitlist capture instead of a dead "sold out". FAQ: time commitment, live vs recorded, language, prerequisites, certificate. FAQPage schema.
- **Visual:** Date + price card; minimal enrolment form; accordion.
- **CTA:** "Join the next cohort" / "Join the waitlist".

> **Highest-leverage section:** Hero next-cohort framing (Section 1) + Yathra 2.0 proof (Section 3). The page lives or dies on reading as an active, recurring program with a real next date — not a recap of a finished event.

---

## 9. Flagship Course page (NEW — plan now, soft-launch as waitlist)

> **Purpose** — The anchor product of the Accelerator. GenAI for professionals, career-growth focused, likely bilingual. Format (live cohort vs self-paced) is **not locked**. Because it is in development, do **not** build a full sales page yet — build a high-intent waitlist / "notify me" page that captures demand, validates positioning, and lets Circle / AI Junior / AI Yathra all point to it as "the deep dive that's coming". Feel: the most premium page in the Accelerator — violet, refined, anticipation-building.

### 1. Hero — the anticipation
- **Goal:** Build desire for the flagship before it exists.
- **Content:** Headline — Elyst's most complete AI program for professionals is coming; the destination the other programs lead to. Sub-line: who it's for and the transformation (career growth through real GenAI fluency). Be honest it's launching soon — scarcity of access, not fake availability.
- **Visual:** Premium teaser. A refined "coming soon" treatment, not an empty page. Optional roadmap/"what's coming" motif.
- **CTA:** "Join the waitlist" / "Get notified first".

### 2. What it will cover (directional)
- **Goal:** Validate positioning and excite without over-committing to unfinalised details.
- **Content:** Directional outline of outcomes and themes — enough to make a professional want in, framed as "what you'll be able to do" rather than a locked syllabus. Avoid publishing format/price until decided.
- **Visual:** Outcome-led blocks, clearly marked as the in-development vision.
- **CTA:** "Join the waitlist".

### 3. Waitlist value + the ladder back
- **Goal:** Capture the lead and route them to act now while they wait.
- **Content:** Why join the waitlist (early access, founding pricing, first to know). Then: "while you wait, start in the Circle / next AI Yathra" — converting flagship interest into immediate funnel action.
- **Visual:** Waitlist form (minimal fields) + links back to Circle and AI Yathra.
- **CTA:** "Join the waitlist" (primary) + "Start in the Circle" (secondary).

> **Highest-leverage move:** Capturing the waitlist email AND routing that warm lead into the Circle/Yathra today. The flagship's biggest near-term value is as a demand-capture and funnel-feeder, not a sale.

---

## 10. Supporting pages

### About / Team

> **Purpose** — Build trust for both arms from one page. The founders are young — turn that into the story (Kerala's first AI graduates, building for India and the GCC) rather than hiding it.

1. **Hero — the founding story.** Short, confident origin: why two 23-year-old AI graduates from Kozhikode built Elyst, and the belief that AI should work for ordinary businesses and ordinary people. Visual: founder portraits, real, on-brand, on the light surface.
2. **The two founders.** Nihal Anas — Chief AI Officer, leads AI Services / AIOS. Fathima Shirin P — CEO, leads the AI Accelerator. One short bio each, LinkedIn links. Make the arm-to-founder mapping explicit. CTA: "Work with us" (→ AIOS) / "Learn with us" (→ Accelerator).
3. **What we believe / how we work.** Principles: built for non-technical teams, taught in your language, real outcomes over hype, direct support. Registered LLP line for legitimacy.
4. **Team / interns (optional).** A small team strip if desired. Avoid overstating headcount — honesty reads as confidence.

### Contact / Book a call

> **Purpose** — One conversion hub that routes by intent. An SME lead books a call; an upskilling lead is pointed to the right program or the Circle.

1. **Intent split.** Two paths at the top: "I run a business → book an AIOS call" (calendar embed) and "I want to learn → see programs / join the Circle". Below, a simple contact form + direct email + WhatsApp link for everything else. CTA: "Book a call" / "Explore programs".

### System pages

- **Privacy Policy + Terms** — required for payments, community signups, and trust. Clean, real, findable in the footer.
- **Thank-you pages** — after every signup/booking, a confirmation page that sets expectations ("we'll reach out within X") AND offers the next step (book a call → also join the Circle). Place conversion tracking events here.
- **404** — on-brand recovery that re-presents the two doors instead of dead-ending.

---

## 11. Design & interaction references (curated, per page type)

Best-in-class sites to study, grouped by the page type they best inform — and what specifically to take. Steal patterns, not pixels; keep Elyst's own **light + minimal + premium** identity throughout (warm off-white default, emerald accent, dark only as an occasional contrast section). Several references below happen to be dark-themed — borrow their **restraint, rhythm, and clarity**, not their colour scheme.

### For the AIOS page (serious product / dev-tool feel)

| Reference | What to take from it |
|---|---|
| **Linear** (linear.app) | The benchmark for minimal, confident product pages. Restrained palette with one accent, strong typography, subtle scroll motion, the feeling of a serious tool. Closest north star for AIOS — borrow the discipline, render it light. |
| **Vercel** (vercel.com) | Split-screen hero (copy left, live product right), crisp section rhythm, making a technical product feel premium and simple. |
| **Stripe** (stripe.com) | Explaining a complex "we handle everything for you" model with clarity and trust; interactive product visuals; enterprise-grade but approachable tone — ideal for AIOS's configured-service positioning. |
| **Better Stack / Datadog** | Technical-credibility signals; single-CTA, distraction-free hero; capability cards with real product screenshots. (Take the structure; keep ours light.) |

### For Circle (paid community / membership)

| Reference | What to take from it |
|---|---|
| **Pavilion** (joinpavilion.com) | How an application/selectivity flow creates eliteness and scarcity; premium membership positioning. Model the Founding Member tier on this. |
| **Peak Freelance** | Showing membership value instantly with concise copy + heavy, specific social proof above the fold. |
| **The Support System** | Distinctive branding/illustration to create an unmistakable "vibe" — community converts on feeling, not features. |
| **Mighty Networks / Nas.io showcase pages** | Proven layouts for selling high-ticket community + course bundles; transparent pricing and tier presentation. |

### For AI Junior, AI Yathra & Flagship (cohort / course)

| Reference | What to take from it |
|---|---|
| **Maven** (maven.com) cohort pages | Gold standard for cohort-course pages — instructor credibility up top, clear cohort dates + cadence, curriculum module breakdown, "who this is for". Directly model AI Yathra and the Flagship on these. |
| **On Deck / Reforge** | Premium professional-program positioning, outcome-led copy, strong proof rails. |
| **Leadpages / Teachery course-page roundups** | High-converting course-page anatomy — hero value prop, instructor bio, curriculum, pricing comparison, FAQ, trust badges. |
| **Any strong kids-education program page** | For AI Junior: parent-reassurance patterns, bright friendly tone over a trustworthy base, batch/schedule clarity. |

### For overall minimal brand feel & interactions

| Reference / source | What to take from it |
|---|---|
| **Awwwards & Godly** (godly.website) | Best-in-class animated, brand-forward sites. Hero motion, micro-interactions, "serious tech company" polish — borrow restraint, not maximalism. Filter for light/premium examples. |
| **Lapa Ninja & SaaS Landing Page** (saaslandingpage.com) | Swipe-file galleries for section-level patterns for both arms, ongoing. |
| **Saaspo & Land-book** | Categorised real-site examples for hero, pricing, testimonial and feature sections. |

> **Interaction direction — experiment, but obey the core rule**
> Encouraged: a slow particle/gradient hero, scroll-triggered reveals, count-up stats, the AIOS "one-message → result" loop, a tabbed capability explorer, the Accelerator "which program is right for me?" toggle, a July-15 countdown on Circle.
> Hard limits: nothing that delays the visitor understanding what we do, no animation that blocks reading, no carousel that hides content, mobile-first always. If an interaction is beautiful but slows comprehension, cut it. Speed of conveying the message beats spectacle every time.

---

## 12. SEO, AEO & GEO + technical checklist

Three layers of findability, plus the build requirements that make them work. **SEO** = found by Google search. **AEO** = cited when someone asks an AI engine (ChatGPT, Perplexity, Google AI Overviews, Claude) a question. **GEO** = your brand understood as an entity by generative engines. For a young company competing in India + the GCC, AEO and GEO are where the disproportionate upside is — most local competitors are not doing this.

### 12.1 Foundational SEO (frontend + backend)

- **Per-page basics:** unique title tag, meta description, one H1, clean semantic heading hierarchy, descriptive URLs (`/aios`, `/learn`, `/circle`, `/ai-junior`, `/ai-yathra`). One clear keyword intent per page.
- **Core Web Vitals / speed:** fast load is table stakes and a ranking + conversion factor. Optimise images (WebP/AVIF), lazy-load below-the-fold, minimise the hero animation's cost, server-side render the content (see 12.5).
- **Mobile-first:** 63% of traffic and 60%+ of membership traffic is mobile. Design and test mobile first.
- **Crawlability:** XML `sitemap.xml` (auto-generated, submitted to Google Search Console + Bing Webmaster), `robots.txt` that allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) unless you have reason to block, canonical tags, no orphan pages.
- **Internal linking:** Home → arm pages → program/AIOS pages, plus the footer sitemap. Strong internal links teach Google and AI engines your structure.
- **Local SEO:** Google Business Profile for Elyst AI LLP (Kozhikode), consistent NAP across the site and directories — matters for "AI company Kerala" / GCC-adjacent searches.

### 12.2 Structured data (schema markup) — the backbone of AEO

Schema is machine-readable JSON-LD that tells engines exactly what each thing is. Implement:

| Schema type | Where |
|---|---|
| **Organization / LegalService** | Site-wide. Name "Elyst AI LLP", LLPIN, logo, founders, city, sameAs links to LinkedIn/Instagram. The entity anchor for GEO. |
| **Person** | About page — Nihal Anas, Fathima Shirin P, with roles and sameAs to LinkedIn. |
| **Product / Service + Offer** | AIOS page (the service), each program. Offer for Circle tiers, AI Junior, AI Yathra. |
| **Course** | AI Junior, AI Yathra, Flagship — makes them eligible for AI and Google course surfaces. |
| **FAQPage** | Every page with an FAQ (AIOS, Circle, AI Junior, AI Yathra). Highest-impact AEO markup. |
| **AggregateRating / Review** | Wherever you have real testimonials, marked up honestly. |
| **BreadcrumbList** | Site-wide — tells engines page position in the hierarchy. |

### 12.3 AEO — getting cited by AI engines

- **FAQ everywhere:** the single highest-impact AEO optimisation because it matches the question-shaped way people prompt AI. Every key page gets a real FAQ + FAQPage schema.
- **Answer-first writing:** lead each section/answer with the direct answer in 1–2 sentences, then expand. AI engines lift the clean, self-contained answer.
- **Listicle & comparison content:** comparative/list content earns ~25% of all AI citations. Create pieces like "AIOS vs a generic AI chatbot", "best ways for an SME to use AI on WhatsApp", "AI courses for professionals in Kerala".
- **Freshness:** 83% of AI citations come from pages updated in the last 12 months; un-refreshed pages are ~3x more likely to lose citations. Update key pages and blog posts quarterly, with "last updated" dates.
- **Quotable stats & definitions:** put clear, attributable facts on-page (member counts, batch results, what AIOS is in one sentence).
- **Platform reality:** only ~11% of domains appear in both ChatGPT and Perplexity — build broad, well-structured content rather than chasing one engine.

### 12.4 GEO — being understood as an entity + LLM-accessible files

- **llms.txt:** add a `/llms.txt` at the site root — a plain-Markdown index pointing AI crawlers to your most important pages (AIOS, each program, About). Honest caveat: as of 2026 the major AI labs have not confirmed they consume it, and measured traffic impact is so far minimal — treat it as low-cost insurance and future-proofing, not a silver bullet. Takes ~30 minutes.
- **Clean, content-first HTML:** the most reliable "LLM-accessible file" is a fast, server-rendered HTML page with the real content in the markup (not injected by JS after load). Optionally also expose key pages as clean `.md` versions, which the llms.txt standard prefers.
- **Consistent entity signals:** same company name, LLPIN, founders, and city everywhere; sameAs links tying the site to LinkedIn/Instagram/Google Business Profile.
- **Off-site presence:** AI engines weight third-party mentions. Get Elyst onto LinkedIn (active), directories, any press, and let founders publish.
- **AI crawler access:** in `robots.txt`, explicitly allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot. You cannot be cited by an engine you have blocked.

### 12.5 Technical / build requirements

- **Render content server-side:** use SSR/SSG (e.g. Next.js, which Elyst already targets). A client-rendered SPA that ships an empty shell is bad for SEO and worse for AEO/GEO, because crawlers and many AI fetchers read raw HTML and see nothing. The real text must be in the initial HTML.
- **Analytics & conversion tracking:** privacy-friendly analytics, plus event tracking on the money actions — "Book a call" clicks, Circle joins, AI Junior/Yathra enrolments, waitlist signups. Track on the thank-you pages.
- **Accessibility:** semantic HTML, alt text on every image (also helps SEO/GEO), sufficient colour contrast throughout (and on any dark contrast sections), keyboard navigation. Accessible markup is more machine-readable markup.
- **Performance budget:** cap the cost of hero animations; prefer CSS/SVG/Canvas over heavy video where possible; preload the hero, defer the rest.
- **Open Graph / Twitter cards:** per-page OG image, title, description so links shared on LinkedIn/WhatsApp/Instagram render well — critical since both arms recruit via social and WhatsApp.
- **Security & trust:** HTTPS, a real privacy policy, secure payment/community links.

> **If you do only five things for findability:** (1) Server-render real content (SSR/SSG). (2) FAQPage + Organization + Course schema on every relevant page. (3) A genuine FAQ written answer-first on AIOS and every program page. (4) Consistent entity signals (name/LLPIN/founders/sameAs) site-wide + Google Business Profile. (5) Allow AI crawlers in robots.txt. llms.txt and a blog amplify these but come after.

---

## 13. Gaps, risks & open decisions

Things a visitor needs that are currently missing, and things that could make a lead leave without acting. Resolve before or during build.

### Content gaps a visitor will feel

- **AIOS social proof is thin until the Dubai pilot is live.** Type-A founders want proof it is real. Mitigation: lead with live working flows, founder credentials, a strong walkthrough video; fold in the Dubai outcome the moment it exists.
- **No published pricing on anything custom (AIOS).** Some buyers self-disqualify without a number. Mitigation: structure-not-numbers framing + "who it's for" qualifier; make booking a call feel low-cost and consultative.
- **Flagship Course has no locked format/price.** Risk of looking like vapourware. Mitigation: waitlist page with honest "in development", outcome-led vision, founding-access incentive.
- **AI Yathra could read as a past event.** Mitigation: always show a next cohort date or a live waitlist; never a static recap.
- **Data/security questions for AIOS.** SME founders will ask where their company data lives. Mitigation: a clear, honest FAQ answer — do not hand-wave this.

### Structural / UX risks

- **Two-audience confusion.** The single biggest risk. If the Home fork and nav split are not crisp, both audiences feel the site is "not quite for me". The arm-split nav and hero fork are the mitigation — get them right first.
- **Arm visual differentiation vs brand cohesion.** Push the two accents/feels far enough to feel different, not so far it looks like two companies. One logo, one type system, one footer — accent and warmth do the differentiating.
- **Mobile + WhatsApp traffic.** Most leads arrive on mobile from WhatsApp/Instagram links. A desktop-first build will leak conversions. Test every page on a phone first.
- **Animation over substance.** The "serious tech company" look can tip into style-over-clarity. Every interaction must pass the test: does it help the visitor understand or act faster? If not, cut it.

### Open decisions to lock before build

1. The exact accent colour(s): one shared accent, or a Services-green + Accelerator-violet pair? (This blueprint assumes the pair — confirm.)
2. Whether to publish the Circle prices on-page (recommended — transparency lifts conversion) vs gate them.
3. Whether AIOS "Use cases" launch as in-page sections (recommended for v1) or separate pages.
4. Whether to launch the Blog at build or fast-follow (recommended: at least 3–5 cornerstone posts at launch for AEO).
5. Flagship Course format (live cohort vs self-paced) — does not block the waitlist page, but blocks the full page.
6. CRM / scheduler choice for "Book a call" and where enrolment payments are handled (Nas.io for Circle is set; what about AIOS calls and course payments?).

> **The single highest-priority build item:** the AIOS page. It is the highest-value, currently-nonexistent page on the site, it serves the cash-flow-critical Services arm, and it is the destination for the most valuable visitor (the SME founder). Build it first and build it best.

---

## Appendix — references & sources

Live sources consulted for 2026 design, conversion, AEO/GEO and llms.txt practice:

- [SaaS / dark-minimal landing patterns 2026](https://swipepages.com/blog/12-best-saas-landing-page-examples-of-2026/)
- [B2B SaaS landing trends 2026](https://www.saashero.net/content/top-landing-page-design-trends/)
- [Cohort / course landing pages 2026](https://unicornplatform.com/blog/online-course-landing-pages-in-2026/)
- [Membership / community site examples 2026](https://joinit.com/blog/membership-site-examples)
- [Mighty Networks — high-ticket community + course pages](https://www.mightynetworks.com/resources/5-landing-page-examples-to-help-you-sell-a-high-ticket-online-course-and-paid-community)
- [Answer Engine Optimization playbook 2026 (Frase)](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai)
- [AEO 2026 (AirOps)](https://www.airops.com/blog/aeo-answer-engine-optimization)
- [llms.txt 2026 guide](https://getmint.ai/resources/llms-txt)
- [Should you implement llms.txt (2026 reality check)](https://www.linkbuildinghq.com/blog/should-websites-implement-llms-txt-in-2026/)
