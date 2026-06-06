# Home Final CTA Band — NOTES.md

## What this section is
The last section on the Home page before the footer. A full-width split-panel section that re-presents both doors to anyone who scrolled to the bottom undecided.

## Job it must do
Convert the undecided visitor. One last clean fork — no new information, just two clear paths with a memorable hover interaction that makes the visitor feel the choice.

---

## Layout (structure)

**Two panels side by side, full section width, equal 50/50 split.** No gap between them — they share a single dividing line. Section height: at least `60vh` on desktop so the panels feel substantial, not cramped.

On mobile: stack vertically. Each panel full width, roughly `40vh` tall each.

### Each panel contains:
- **Top-left:** Large headline (Nohemi 700, `--text-h1`, sentence case) — the CTA label
- **Top-right:** Arrow button (rounded square icon button, ~48×48px, `--radius-md`, border `1px solid --border`) — the arrow points diagonal up-right (↗)
- **Bottom-left:** One-line description (DM Sans 400, `--text-body`) — plain, direct
- Background: see hover behaviour below

### Default state (both panels idle):
- Both panels: `--bg` (warm off-white) background
- All text: `--fg` (dark)
- Arrow button: `--border` stroke, `--fg` arrow icon
- Thin `--border` vertical divider between the two panels

### Hover state (one panel hovered):
- The hovered panel's background **flood-fills** with its accent colour — smooth, full-panel background transition
- Framer Motion `backgroundColor` animation, duration ~0.3s, easing `ease-out` — the fill sweeps in, not a hard swap
- **Left panel (AIOS) hover colour:** `--elyst-emerald` (`#03624C`) — deep emerald fill, text switches to `--fg-on-dark` (light)
- **Right panel (Accelerator) hover colour:** `--elyst-green` (`#00DF82`) — electric green fill, text switches to `--elyst-ink` (near-black, for contrast on bright green)
- Arrow button on hover: fill matches inverted (on emerald: white button; on green: ink button)
- The non-hovered panel dims slightly: `opacity: 0.6` on its text, background stays `--bg`

### Section headline (above both panels, optional):
One centred line in Nohemi 700, `--text-h2`, `--fg`, sitting above the split panels with `--space-8` gap.
Claude Code writes the final wording. Intent: a warm, direct prompt acknowledging both visitor types. Under 6 words. Example: "Where do you want to start?"

---

## Content

**Left panel — AIOS:**
- Headline: "Book a call" (or "Work with us")
- Description: "Deploy AI into your operations — configured for your team, runs in WhatsApp."
- Arrow links to: `/contact`

**Right panel — Accelerator:**
- Headline: "Explore programs" (or "Learn with us")
- Description: "Join a live program that makes you genuinely capable with AI."
- Arrow links to: `/learn`

**Below both panels — micro-reassurance line** (centred, `--text-small`, `--fg-3`, `--space-6` below the panels):
"Not sure which fits? Start with the Circle — open now, ₹299/month."
This catches the fully undecided visitor and routes them to the lowest-friction entry point.

---

## Reference images

**`mood-default.png`** — image 10. Both panels in default/idle state, light background, large headline + arrow button layout.
- **Take:** the panel proportions, the top-left headline + top-right arrow button composition, the bottom-left description placement, the clean vertical divider between panels, the generous internal padding.
- **Ignore:** the all-caps treatment (ours is Nohemi sentence case), the pure white background (ours is `--bg` warm off-white), the black footer bar below it (that's the footer, separate section).

**`mood-hover.png`** — image 11. Right panel in hover state with yellow flood-fill background.
- **Take:** the full-panel background flood-fill mechanic on hover, the way the hovered panel's colour completely replaces the background, the contrast it creates against the idle panel.
- **Ignore:** the yellow colour (ours: left panel → `--elyst-emerald`, right panel → `--elyst-green`), the static nature of the screenshot (ours animates with Framer Motion ~0.3s ease-out).

---

## Animation note (for emil-design-eng polish pass)
The flood-fill transition is the signature interaction of this section. It should feel confident and deliberate — not instant (that's a flash) and not slow (that's sluggish). ~0.3s with `ease-out` is the target. The non-hovered panel dimming to `opacity: 0.6` amplifies the effect without adding more animation.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` default panel background, `--elyst-emerald` AIOS hover fill, `--elyst-green` Accelerator hover fill, `--fg-on-dark` text on emerald, `--elyst-ink` text on green, `--border` divider and arrow button stroke. Nohemi 700 panel headlines, DM Sans descriptions. No dark band — this section stays light by default, colour only appears on hover.
