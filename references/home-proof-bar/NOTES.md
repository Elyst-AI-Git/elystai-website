# Home Proof Bar — NOTES.md

## What this section is
A thin horizontal strip immediately below the hero. Buys trust before the visitor scrolls further. No selling, no CTA — just hard proof at a glance.

## Job it must do
Answer the sub-conscious question "are these people real?" in one horizontal sweep.

---

## Layout (structure)

Full-width strip on `--surface-muted` (subtle gray-green fill — one shade off `--bg`, barely visible but creates separation from the hero above).

Single row of 5 items, evenly spaced, centred. On mobile: 2×3 grid (2 columns, wrap to 3 rows), still centred.

Each item is:
- **Stat number** (Nohemi 700, `--text-h3`, `--elyst-emerald`) — counts up via IntersectionObserver on first scroll-into-view
- **Label** (DM Sans 400, `--text-small`, `--fg-3`) — below the number

Thin `--border` dividers between items on desktop (vertical rule, 50% height, centred). On mobile remove dividers, use gap spacing only.

No icons. No logos. No CTA. Nothing that competes with the hero above or the teasers below.

Vertical padding: `--space-10` (40px) top and bottom — tight, not a full section.

---

## Content (the 5 items, in order)

1. **34+** · Circle members
2. **2** · AI Junior batches run
3. **80+** · AI Yathra community members
4. **Kerala's first** · AI graduates (no number — this is a label, not a stat; render the label in emerald, qualifier below in `--fg-3`)
5. **Registered LLP** · Kozhikode, Kerala

**Note on item 4:** since it's a qualitative claim, not a number, render it differently — label in Nohemi 700 at `--text-h3` size in `--elyst-emerald`, sub-label "AI graduates" in `--fg-3`. No count-up animation on this one.

**Note on item 5:** same treatment as item 4 — no number to count up. "Registered LLP" in Nohemi 700 emerald, "Kozhikode, Kerala" in `--fg-3`. This is the entity trust signal.

---

## Animation

Numbers count up from 0 on scroll-into-view (IntersectionObserver). Duration ~1.2s, easing `ease-out`. Only items 1, 2, 3 animate — items 4 and 5 are text, they fade in on scroll instead (opacity 0 → 1, 0.6s).

No hover states on this strip. It is purely informational.

---

## Mood

Clean, authoritative, understated. Think of the stat strips on Linear or Stripe — numbers speak, nothing decorates. The emerald on the numbers is the only accent; everything else is muted text on a near-white surface.

**Take from Dayos:** the restraint of presenting proof without fanfare.
**Ignore:** any dark treatment, logos, or large imagery.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--surface-muted` fill, `--elyst-emerald` for numbers/key labels, `--fg-3` for sub-labels, `--border` for dividers. Nohemi 700 for numbers, DM Sans 400 for labels.
