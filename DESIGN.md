# Elyst AI — Design System (DESIGN.md)

This file is the **locked design vocabulary** for the Elyst AI website. It is the
single source of truth for colour, type, spacing, radii, shadows, and the core
component primitives. Claude Code must treat every token here as fixed unless
Nihal explicitly changes it.

**What this file is:** the *system* — the palette and rules.
**What this file is NOT:** the *layout* of each section. How a hero, a pricing
block, or a course card is arranged is decided per-section using the reference
screenshots in `/references` + the blueprint (`Elyst_AI_Website_Blueprint.md`).
Build sections against those references, but always using the tokens below.

> Derived from the real production export (`colors_and_type.css`) with three
> deliberate changes: (1) headline font is now **Nohemi**, (2) the two arms are
> differentiated by **tone only**, not colour, (3) the design **defaults to
> light** — legacy dark tokens are kept but used sparingly.

---

## 0. The governing rule

**Convey what we do to the right person as fast as possible.** Two audiences
land on one domain: an SME founder (AIOS / services) and a professional who
wants to upskill (Accelerator). Every page's first job is to route each visitor
to their answer in one scroll. The styling persuades; it never gets in the way
of that routing.

**Aesthetic target:** light + minimal + modern + classy premium. **Not** dark,
**not** techy-startup, **not** AI-slop. If a choice makes the site look like a
generic SaaS template, it's wrong.

---

## 1. Fonts

```
Headlines / display:  "Nohemi", system-ui, sans-serif   (weight 600–700)
Body / UI:            "DM Sans", system-ui, sans-serif   (weight 400–700)
```

- **Nohemi** replaces Space Grotesk for all headings, hero text, and `.font-display`.
  It is free for commercial use and ships as a variable WOFF2. **Self-host it** —
  do not hotlink. Place files in `/public/fonts/nohemi/` and declare with
  `@font-face` using `font-display: swap`. (Source: Rajesh Rajput / Gumroad.)
- **DM Sans** stays for all body, UI, buttons, chips, eyebrows. Load via Google
  Fonts `&display=swap` OR self-host — self-hosting is preferred for Core Web Vitals.
- **Never** fall back to Inter, Roboto, Arial, or system-ui as a *visible* choice —
  those are emergency fallbacks only.

**Performance note (this is how fonts stay SEO-safe):** self-host both fonts,
serve WOFF2, use `font-display: swap`, and `<link rel="preload">` the headline
font. Fonts do not affect rankings directly; a slow-loading font hurts Core Web
Vitals, and that is the only SEO lever here. Keep total font payload lean
(headline: 1–2 weights max; body: 400 + 500 + 700).

### Tracking & scale (from brand, keep exactly)
```
--tracking-display: -0.075em;   /* headlines */
--tracking-body:    -0.05em;    /* body */
--tracking-wide:     0.12em;    /* eyebrows / uppercase labels */

--text-hero:  clamp(2.8rem, 6vw, 5.5rem);
--text-h1:    clamp(2.2rem, 4.5vw, 3.8rem);
--text-h2:    clamp(1.6rem, 3vw, 2.4rem);
--text-h3:    clamp(1.1rem, 2vw, 1.4rem);
--text-body:  clamp(0.95rem, 1.2vw, 1.05rem);
--text-small: 0.875rem;
--text-eyebrow: 0.72rem;
```
Headlines: weight 700, line-height 1.08, display tracking.
Body: 18px base, line-height 1.6, body tracking.

---

## 2. Colour (LOCKED — these are the real brand values)

```
/* Brand */
--elyst-emerald:        #03624C;  /* PRIMARY — deep brand green */
--elyst-emerald-light:  #04855F;  /* primary light */
--elyst-green:          #00DF82;  /* ACCENT — electric signal green */
--elyst-green-mid:      #2EC866;  /* secondary accent / CTA */
--elyst-ink:            #060D09;  /* near-black brand (use sparingly) */
--elyst-carbon:         #1A1A1A;  /* dark panel (legacy, sparingly) */

/* Surfaces — LIGHT IS DEFAULT */
--bg:               hsl(140 18% 97%);  /* #F5F8F6 warm off-white page bg */
--surface-muted:    hsl(145 14% 95%);  /* subtle gray-green fill */
--card:             #FFFFFF;

/* Text */
--fg:               hsl(150 25% 5%);   /* #0A0F0C primary text (NOT pure #000) */
--fg-2:             hsl(155 17% 27%);  /* #3A5347 secondary */
--fg-3:             hsl(155 10% 52%);  /* #7B8C84 muted */
--fg-on-dark:       hsl(150 50% 96%);  /* text on dark sections */
--fg-muted-dark:    hsl(155 24% 62%);

/* Lines & tints */
--border:           hsl(155 18% 88%);  /* #DBE7E1 */
--ring:             var(--elyst-emerald);
--green-tint-07:    rgba(0, 223, 130, 0.07);
--green-tint-15:    rgba(0, 223, 130, 0.15);
--emerald-tint-10:  rgba(3, 98, 76, 0.10);

/* LEGACY DARK — keep, but light is default. Use ONLY for a deliberate
   single contrast section (e.g. one testimonial band). Do NOT rebuild the
   old dark site. */
--surface-dark:     hsl(160 38% 9%);   /* #0E211A */
--surface-dark-2:   hsl(157 32% 13%);  /* #16302A */
--surface-dark-hover: hsl(155 32% 17%);
```

**Rules:**
- Pure `#000` is banned. Darkest text is `--fg` (#0A0F0C).
- Default every page to `--bg` (warm off-white) + white cards. Dark sections are
  the rare exception, never the backbone.
- Emerald is the primary action colour for both arms.

---

## 3. The two arms — TONE-ONLY differentiation

Both arms share the emerald/green palette above. They are differentiated by
**feel, not colour**:

| | AIOS (Services) | Accelerator (Courses, Circle, Junior, Yathra) |
|---|---|---|
| Reads as | Business-credible, precise, confident | Warmer, softer, learning-oriented, inviting |
| Shadows | `--shadow-card` (tighter) | Softer, more diffuse — increase blur, lower opacity |
| Radii | `--radius-card` (20px) | Rounder — prefer `--radius-xl` (24px) on cards |
| Whitespace | Dense, efficient | More generous, breathing room |
| Imagery | Product / dashboard / system | People, learning, human, warm photography |
| Motion | Snappy, minimal | Slightly slower, gentler easing |

Anchor for the Accelerator feel: the existing **AI Junior** page. Anchor for the
AIOS feel: clean B2B SaaS credibility. **No new accent colour is introduced** —
the warmth comes from softer shadows, rounder corners, more whitespace, and warmer imagery.

---

## 4. Spacing, radii, shadows (LOCKED)

```
/* Spacing — 4px base */
--space-1:4px  --space-2:8px  --space-3:12px --space-4:16px
--space-5:20px --space-6:24px --space-8:32px --space-10:40px
--space-12:48px --space-16:64px
--section-py: clamp(80px, 10vw, 140px);
--section-px: clamp(20px, 6vw, 100px);

/* Radii */
--radius-sm:8px --radius-md:10px --radius:12px (button)
--radius-card:20px --radius-xl:24px --radius-pill:999px

/* Shadows — cool emerald-tinted */
--shadow-card:       0 4px 24px rgba(3,98,76,0.08);
--shadow-card-hover: 0 12px 40px rgba(3,98,76,0.16);
--shadow-glow:       0 0 40px rgba(0,223,130,0.20);
```

---

## 5. Component primitives (build these once, reuse everywhere)

Match the production CSS. Key primitives:

- **`.btn`** — DM Sans 700, radius 12px, min-height 48px.
  - `.btn-primary` emerald bg / white text
  - `.btn-onlight` white bg / emerald text (for use on green/dark)
  - `.btn-accent` green-mid bg / ink text
  - `.btn-pill` pill radius · `.btn-ghost` transparent/emerald
- **`.chip`** — emerald-tint fill, emerald text, pill, DM Sans 700, 0.75rem.
- **`.card`** — white, radius-card, `--shadow-card`, hover lifts `-4px`.
- **`.card-tint`** — soft green-tint fill + tint border (community / CTA blocks).
- **`.eyebrow`** — DM Sans 700, uppercase, wide tracking, 0.72rem.

---

## 6. Anti-slop guardrails (hard rules for Claude Code)

1. **No purple-gradient-on-white** hero. No mesh gradients, no glassmorphism overload.
2. **No pure black, no Inter/Roboto/Arial** as visible fonts.
3. **Light default**, not dark. Dark is a single deliberate accent at most.
4. **Real spacing rhythm** — use the scale; no arbitrary one-off pixel values.
5. **Differentiate the arms by tone**, never by changing the palette.
6. **Every section earns its place** against the governing rule (route the right
   person to their answer fast). If a section doesn't help that, cut it.
7. Animations are subtle and purposeful (Framer Motion): entrance fades, gentle
   parallax, hover lifts. No spinning, no gratuitous motion.

---

## 7. Loading order (implementation)

```html
<link rel="preload" href="/fonts/nohemi/Nohemi-VF.woff2" as="font" type="font/woff2" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet">
<!-- @font-face for Nohemi declared in global CSS, font-display: swap -->
```
Tailwind: map these tokens into `tailwind.config` theme (colors, fontFamily,
spacing, borderRadius, boxShadow) so utilities use the system, not ad-hoc values.
