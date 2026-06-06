# Home Accelerator Teaser — NOTES.md

## What this section is
The mirror of the AIOS teaser, for the learning visitor. Shows the four Accelerator programs as a ladder so the visitor finds the one that fits and clicks through. This section sells the choice — the Accelerator overview page sells the programs.

## Job it must do
Make the visitor think: "one of these four is for me" — then click "Explore programs."

---

## CRITICAL DISCIPLINE NOTE
Same rule as the AIOS teaser: this is a door, not an explainer. No program descriptions longer than one line. No pricing here. No feature lists. The fanned card reference Nihal shared (images 4–6, the Speechify-style rotating cards) is visually appealing but **wrong for this section** — fanned cards hide content behind each other. On a routing section the visitor needs to see all four programs simultaneously to self-identify. Use a flat 4-card row instead.

The fan animation is noted for potential use on the Accelerator overview page itself — not here.

---

## Layout (structure)

**Centred column layout.** Full-width section, content centred at max ~1100px.

Top: eyebrow chip + headline + sub-line (centred text alignment).

Below: **4 cards in a horizontal row** on desktop, 2×2 grid on tablet, single column on mobile.

Each card (`.card` with Accelerator tone overrides):
- `--radius-xl` (24px) instead of standard `--radius-card` — rounder, warmer
- Softer shadow: `0 4px 32px rgba(3,98,76,0.05)` (more diffuse than `--shadow-card`)
- White fill
- Top: a small programme emblem (icon or initial letter mark, `--elyst-emerald` tint background, 40×40px, `--radius-md`)
- Programme name (Nohemi 600, `--text-h3`, `--fg`)
- Who it's for (DM Sans 400, `--text-small`, `--fg-2`) — one line only
- Bottom: status chip — "Open" / "Enrolling" / "Coming soon" (`.chip`)

On hover: card lifts -4px, shadow deepens. The card's CTA arrow (→) becomes visible (opacity 0 → 1 on hover). On mobile, arrow always visible.

**The four cards in order:**
1. **Elyst AI Circle** · "For professionals who want to stay ahead of AI" · chip: "Open"
2. **AI Junior** · "For school students, Classes 5–10" · chip: "Enrolling"
3. **AI Yathra** · "For working professionals and career switchers" · chip: "Next cohort forming"
4. **Flagship Course** · "The deep-dive program for professionals" · chip: "Coming soon"

Each card links to its respective page (/circle, /ai-junior, /ai-yathra, /flagship).

**Below the cards:** single centred CTA.
"Explore all programs →" (`.btn-ghost` or `.btn-primary` — use ghost here since the AIOS teaser above already used primary; this arm's primary CTA is on its own page)

---

## Content

**Eyebrow chip** (`.eyebrow` + `.chip`):
"Learn AI · Accelerator"

**Headline** (Nohemi 700, `--text-h2`, `--tracking-display`):
Intent: become genuinely capable with AI, for your career or your child, taught in your language.
Claude Code writes the final wording. Plain, warm, no jargon.

**Sub-line** (DM Sans 400, `--text-body`, `--fg-2`):
One sentence. Names the audiences (professionals, students, parents) and the format (live, bilingual, community-backed).

---

## Tone differentiation from AIOS teaser

This section should feel noticeably warmer and softer than the AIOS teaser directly above it — that tonal shift is what tells visitors they've crossed from the "business" arm to the "learning" arm without needing a label.

Achieve this through:
- More vertical whitespace inside cards (`--space-6` padding vs `--space-5` on AIOS)
- Rounder corners (`--radius-xl` vs `--radius-card`)
- Softer shadow (more diffuse, lower opacity)
- Section background: consider `--surface-muted` (subtle green-tint fill) instead of plain `--bg` to create gentle visual separation from the AIOS teaser above

Do NOT introduce a new colour. No warm beige, no purple. The warmth comes from spacing, radius, and shadow — not palette.

---

## Reference images

Three mood images are in this folder — all showing the same fanned card component from different scroll positions:

**`mood.png`** — the clearest view of all cards side by side (use as primary reference).
**`mood-2.png`** — mid-scroll state showing card proportions and icon placement.
**`mood-3.png`** — hover/active state showing how the centre card expands.

All three are from the same source (Speechify-style data-library section). Use them together to understand the card anatomy.

- **Take from all three:** the card proportions (roughly 2:3 portrait ratio), the soft tinted fill per card, the small icon in the top-left of each card, the title + one-line description layout, the generous padding, the off-white section background, the overall light and airy feeling.
- **Ignore across all three:** the fanned/rotated layout (use flat row instead — see Layout section above), the multicolour pastel palette (replace with `--green-tint-07` / `--emerald-tint-10` from DESIGN.md — one consistent tint, not multiple colours), and the "Explore Data Library" CTA.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--surface-muted` section background, `--green-tint-07` or `--emerald-tint-10` for card fill (Accelerator tone — softer than white cards), `--elyst-emerald` for icon emblems and chip text, `--fg` card titles, `--fg-2` who-it's-for line. `--radius-xl` on cards. Nohemi 600 card titles, DM Sans everything else.
