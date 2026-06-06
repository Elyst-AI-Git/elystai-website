# How to Build — Elyst AI Website (HOW_TO_BUILD.md)

Everything operational for building the site: tools to install, brand assets,
how references work, the build/verify loop, and the blog task. This is the
single "mechanics" file — `DESIGN.md` is the brand, `BLUEPRINT.md` is the content,
this is the *how*.

---

## 1. Tools to install (first session)

### Playwright MCP — REQUIRED (your visual feedback loop)
Lets Claude Code open the dev server in a real browser, screenshot its own work
at desktop + mobile, *see* the result, and fix it. Without it, Claude builds blind.
Single highest-value tool for a design build.
```bash
claude mcp add playwright npx @playwright/mcp@latest
```

### Skills
Copy/install these into `.claude/skills/`. Each owns a different layer.

| Skill | Layer it owns | Priority |
|---|---|---|
| **frontend-design** (official Anthropic) | Bold, intentional layout direction. | High |
| **react-best-practices** | Clean Next.js/React patterns. | High |
| **emil-design-eng** (in `/skills/emil-design-eng/`) | Motion + micro-interaction craft — easing, timing, press feel, reveals. The "premium feel" layer. Used in polish, not layout. | High |
| **elyst-content** (build later — see §5) | Site copy + blog in Elyst voice. | When writing copy |

### Impeccable (design plugin) — use carefully
`/plugin marketplace add pbakaus/impeccable`
- **Allowed:** its discovery **interview** (feed it our `DESIGN.md`, let it
  *append/refine* direction — creative north star, missing decisions), and its
  `/impeccable audit` + `/polish` commands on finished sections.
- **HARD RULE:** never let it overwrite the locked brand tokens in `DESIGN.md`
  (emerald palette, Nohemi + DM Sans, spacing). DESIGN.md is the constitution.

### The design authority hierarchy (prevents conflicting input)
1. **`DESIGN.md`** = brand constitution (colour, type, spacing). Never overwritten.
2. **emil-design-eng** = motion/feel only. Never colour/layout.
3. **Impeccable** = interview + audit. Refines/checks, never regenerates tokens.
When in doubt, **DESIGN.md wins**.

---

## 2. Brand assets

No real image assets exist yet. Until Nihal supplies them, use a clean **text
wordmark** ("Elyst AI", Nohemi 700, emerald) as a placeholder — never invent a logo.
All assets self-hosted under `/public`, no hotlinking.

| Asset | Path | Format |
|---|---|---|
| Logo (full, on-light) | `/public/brand/logo.svg` | SVG |
| Logo (on-dark) | `/public/brand/logo-on-dark.svg` | SVG |
| Logo mark / icon | `/public/brand/mark.svg` | SVG |
| Favicon | `/public/icon.svg` (+ `favicon.ico`) | SVG/ICO |
| Apple touch icon | `/public/apple-icon.png` | PNG 180×180 |
| OG / social image | `/public/og/default.png` | PNG 1200×630 |
| Font — Nohemi | `/public/fonts/nohemi/Nohemi-VF.woff2` | WOFF2 (self-host) |
| Font — DM Sans | self-host or Google Fonts | WOFF2 |

**Imagery direction:** AIOS = product/dashboard/system (precise, B2B-credible).
Accelerator = people/learning/warmth (softer, human). No AI-cliché stock
(glowing brains, robot hands). Everything sits on the light `--bg`.

Colours:-

:root {
  /* ---- Brand colors (raw) ---- */
  --elyst-emerald:        #03624C;  /* primary â€” deep brand green       hsl(163 94% 20%) */
  --elyst-emerald-light:  #04855F;  /* primary-light                    hsl(163 95% 27%) */
  --elyst-green:          #00DF82;  /* accent â€” electric signal green   hsl(153 100% 44%) */
  --elyst-green-mid:      #2EC866;  /* secondary accent / CTA on dark   */
  --elyst-ink:            #060D09;  /* near-black brand bg (Circle hero) */
  --elyst-carbon:         #1A1A1A;  /* testimonial / dark panel bg       */

---

## 3. References — how visual direction is fed in

Two kinds, used together, stored in `/references/<section>/`:

- **CODE reference = structure** (highest control). A copied real HTML/Tailwind/
  React snippet. Tells Claude the exact layout. Stored as `.txt`/`.tsx`.
- **IMAGE reference = taste/mood**. A screenshot of a vibe we want. Stored as `.png`.

> Mental model: code = the blueprint, image = the mood board. Use both.

**Where to get them:**
- *Code:* **shadcn/ui** (foundation, use first) · **HyperUI** (free Tailwind
  sections) · **Cult UI** (cult-ui.com — premium *animated* components, shadcn +
  Framer Motion; reach here when a section wants distinctive motion) · Tailark.
- *Images:* **Land-book** (filter to one section type) · **Godly.design** · **Mobbin**.

**Folder shape:**
```
/references
  /hero
    option-A.txt     <- copied component code (structure)
    mood.png         <- screenshot (taste)
    NOTES.md         <- text brief from Cowork + 2 lines "take this, ignore that"
  /aios-explainer
  /pricing
  ...one folder per section in the blueprint
```

**The discipline that prevents confusion (important):**
1. **DESIGN.md never changes** as references are added. References live here,
   separate. Colour/type always come from DESIGN.md, never from a reference.
2. **One structure + one mood per section, MAX.** Confusion comes from *volume*,
   not difference. Different *sections* looking different is fine and expected.
   Multiple competing references *within one section* is the thing to avoid.
3. **Coherence guard:** pick references with a family resemblance (all
   minimal-premium); in verify, ask "does this section belong with the last one?"

**How Claude consumes a section's references:**
1. `option-*.txt` → structural base, re-skinned to DESIGN.md tokens (drop its colours/fonts).
2. `mood.png` → match the *feeling*, not the pixels.
3. `NOTES.md` → the human's written brief (from Cowork) + take/ignore notes.
4. None present → build from DESIGN.md + BLUEPRINT.md, lean minimal-premium.

---

## 4. Build & verify loop (the core discipline)

Build **section by section**, never whole pages at once. Per section:
```
1. Read: the blueprint section + DESIGN.md + /references/<section>/
2. Build: code it, tokens from DESIGN.md, structure from references
3. Verify (Playwright MCP):
   - screenshot at 1440px (desktop) AND 390px (mobile)
   - check vs: reference, DESIGN.md tokens, the governing rule
   - routes the right person fast? on-palette? mobile clean? feels premium?
4. Polish (emil-design-eng): press states, easing, entrance motion
5. Fix → iterate until the screenshot passes
6. Commit: one commit per verified section
```

**Build order (from the blueprint priority):**
1. Global shell: layout, nav, footer, fonts, Tailwind token config from DESIGN.md.
2. **AIOS pages first** — highest priority, drives revenue.
3. Home (the router page — sends each audience to their arm).
4. Accelerator overview → Circle → AI Junior → AI Yathra → Flagship Course.
5. Supporting pages (about, contact, legal).
6. Blog system (templates + first posts).
7. SEO/AEO/GEO layer: schema (Organization, FAQPage, Course, Product), sitemap,
   robots.txt (allow AI crawlers), llms.txt, OG images, metadata.

**Mobile-first.** Most visitors arrive on phones.

---

## 5. Content-writing skill (build when copy is needed, not before)

A custom `elyst-content` skill so copy reads as Elyst, not generic AI. Build it
**after the first AIOS page's copy is dialled in** — use Nihal's edits on that
page as the voice examples. Rules it enforces:
- **Answer-first** (lead with the answer/value — critical for AEO).
- Plain, confident, no hype, explains before it sells.
- Two registers: AIOS = business-credible/precise; Accelerator = warmer/encouraging.
- Schema-aware (structures so FAQ/Course/Product schema maps cleanly).
- Short, scannable, real examples. Never fabricates stats/testimonials/clients.

---

## 6. Blog automation (SET UP LAST)

Monthly (1–2×). **Research → propose → human selects → write.**
```
1. Research trending + metric-boosting topics; avoid duplicating existing posts.
2. Propose 2-3 topics with a one-line angle each.
3. Nihal picks ONE, adds his input.
4. Then it writes the full post — Elyst voice, answer-first, schema-marked,
   internal links, meta + OG — as a draft MDX in /content/blog/ for review.
```
Depends on the site + content skill existing, so it's genuinely the last thing wired up.
