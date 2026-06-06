# Footer — NOTES.md

## What this section is
The site-wide footer. Appears on every page. It is the second sitemap, a major AEO/GEO signal (tells crawlers the full entity structure), and ends every page with a memorable brand moment — the large "Elyst AI" letterform display at the base.

## Job it must do
Two things: (1) give any visitor quick access to every key page, and (2) leave them with the brand name literally filling their screen as they leave — a recall moment.

---

## Layout (structure)

Two distinct zones stacked vertically:

### Zone 1 — Utility footer (top)
Standard 4-column footer grid on `--bg` (light surface, consistent with the page).

| Column | Contents |
|---|---|
| **Col 1 — Contact & entity** | Address: Kozhikode, Kerala. Phone (if public). Email. Social icons (LinkedIn — Nihal + Shirin + company page, Instagram, WhatsApp community link). Legal entity line: "Elyst AI LLP · LLPIN: [number]" |
| **Col 2 — AIOS for Business** | Links: AIOS overview, Book a call, Contact |
| **Col 3 — Learn AI** | Links: Accelerator overview, Circle, AI Junior, AI Yathra, Flagship Course |
| **Col 4 — Company** | Links: About, Blog/Insights, Privacy Policy, Terms |

Below the 4 columns, a thin `--border` rule, then a single line:
"© 2026 Elyst AI LLP · Kozhikode, Kerala · All rights reserved." — DM Sans 400, `--text-small`, `--fg-3`, left-aligned.

On mobile: 2×2 column grid, contact col spans full width at top.

### Zone 2 — Brand name display (bottom)
The large "Elyst AI" letterform treatment sitting flush at the very bottom of the footer, below the utility zone. This is a full-width display element — the text fills the horizontal width of the viewport.

**Typography:** Nohemi 700, display size — scale to fill ~90% of viewport width. This will be very large (roughly `clamp(5rem, 15vw, 18rem)` or sized via `vw` units to fill width). Letter-spacing: `--tracking-display` (-0.075em).

**The letterform fill:** The letters "Elyst AI" are not solid colour — they are filled with a **visual texture or image that represents Elyst**. This is a CSS `background-clip: text` technique (webkit-background-clip: text, color: transparent, background-image: [texture or image]).

**What the fill should represent — brief for Claude Code:**
The reference (Awesomic) uses a nature/organic texture inside their wordmark. Ours must feel native to Elyst. Options in priority order:
1. **A subtle emerald gradient motion** — `--elyst-emerald` to `--elyst-green` diagonal gradient, slow-shifting (CSS animation, `background-position` shift, ~8s loop). This reads as "intelligent, living, emerald" — directly on-brand.
2. **A still emerald-to-green gradient** — same colours, static. Simpler fallback.
3. **A real texture image** — if Nihal supplies one (e.g. a macro photo of something relevant to Kerala, technology, or community), it can be used as the background-image fill. Must feel intentional, not stock. Do NOT use a generic nature texture.

The text below the large letterform (if any): a single micro-line, `--text-small`, `--fg-3`, centred — e.g. "Kozhikode · Kerala · 2026". Optional.

**Background of Zone 2:** `--surface-dark` (`#0E211A`) — the dark emerald tone. This creates a strong visual separation from the light utility footer above and makes the letterform fill pop. The transition from Zone 1 (`--bg`) to Zone 2 (`--surface-dark`) can have a subtle gradient bleed of ~40px.

---

## Reference image

**`mood.png`** — image 12 (Awesomic footer). Shows the utility footer columns above and the large brand wordmark "awesomic." at the bottom with a nature/leaf texture fill inside the letterforms.
- **Take:** the overall two-zone structure (utility grid on top, giant brand wordmark below), the way the letterforms fill the full width, the `background-clip: text` visual technique, the dark background zone under the wordmark, the scale and dominance of the brand name display.
- **Ignore:** the exact texture (theirs is organic/nature — ours is emerald gradient or a Elyst-specific image per the brief above), the Awesomic-specific columns and content, the asterisk/trademark symbol beside their name (not needed for us), the specific dark colour (use `--surface-dark` from DESIGN.md).

---

## AEO/GEO note (important for Claude Code)
The footer must include the full legal entity details on every page:
- "Elyst AI LLP" — exact registered name
- LLPIN (Nihal to supply the number)
- "Kozhikode, Kerala, India"

This is a strong entity-recognition signal for AI engines building a knowledge graph of Elyst. It must be in plain HTML text, not an image — crawlable and indexable.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. Zone 1: `--bg` background, `--fg` link text, `--fg-3` secondary labels, `--border` divider rule. Zone 2: `--surface-dark` background, `--fg-on-dark` for any small text, letterform fill via `background-clip: text` using emerald gradient (`--elyst-emerald` → `--elyst-green`). Nohemi 700 for the large wordmark, DM Sans for all utility footer text.
