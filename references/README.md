# References folder — READ THIS FIRST

This folder contains the visual and written brief for every section on the site.
Before building any section, open its folder and read everything in it.

---

## Folder convention

Every section has its own subfolder:
```
/references/<section-name>/
  NOTES.md          ← the written brief (always present)
  mood.png          ← primary mood/layout reference image (present if provided)
  mood-2.png        ← secondary reference (present if provided)
  mood-3.png        ← tertiary reference (present if provided)
  mood-*.png        ← any named variants (e.g. mood-hover.png, mood-dither.png)
```

## How to consume a section's references

**Step 1 — Read NOTES.md first.** It contains:
- What the section is and its single job
- The full layout spec (structure, spacing, components)
- The full content spec (copy intent, exact strings where locked)
- Explicit instructions on what to TAKE and IGNORE from each image
- Token reminders (colour, type, spacing always from DESIGN.md)

**Step 2 — Read every image in the folder.** Use the Read tool on each `.png` file.
The images are mood/layout references — they show the feeling or structure to aim for.
NOTES.md tells you specifically what to take from each image and what to ignore.
Never copy an image literally — re-skin everything to DESIGN.md tokens.

**Step 3 — If no folder exists for a section**, build from DESIGN.md + BLUEPRINT.md alone. Lean minimal-premium.

---

## The hierarchy that prevents conflicts

1. **DESIGN.md** — brand constitution. Colour, type, spacing. Always wins. Never changes.
2. **NOTES.md** — the written brief. Overrides anything in a reference image.
3. **mood*.png** — visual direction only. Never overrides NOTES.md or DESIGN.md.

If a reference image shows a dark background but NOTES.md says light — build light.
If a reference image uses a colour not in DESIGN.md — ignore that colour, use the nearest DESIGN.md token.
If a reference image shows a layout NOTES.md doesn't mention — follow NOTES.md, not the image.

---

## Current section folders

| Folder | Section | Images |
|---|---|---|
| `nav/` | Global navigation (pill navbar) | `mood-1.png` `mood-2.png` `mood-3.png` |
| `footer/` | Global footer (utility + letterform display) | `mood.png` |
| `home-hero/` | Home — Hero (fork) | `mood.png` |
| `home-proof-bar/` | Home — Proof bar | — |
| `home-aios-teaser/` | Home — AIOS teaser | `mood.png` |
| `home-accelerator-teaser/` | Home — Accelerator teaser | `mood.png` `mood-2.png` `mood-3.png` |
| `home-founders/` | Home — Founder credibility | `mood-interaction.png` `mood-interaction-hover.png` `mood-dither.png` |
| `home-cta-band/` | Home — Final CTA band | `mood-default.png` `mood-hover.png` |

Sections not yet listed here have no folder — build from DESIGN.md + BLUEPRINT.md.
