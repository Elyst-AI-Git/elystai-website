# Home Founder Credibility — NOTES.md

## What this section is
The section that moves trust from "this looks nice" to "real people I'd want to work with built this." Two founders, their roles, and the story that makes their youth an asset rather than a liability.

## Job it must do
Build personal trust. A visitor who likes the product but doesn't trust the people behind it won't book a call or enrol. This section closes that gap.

---

## Layout (structure)

**Two full-width horizontal cards, side by side.** Each card spans roughly half the viewport width (minus gap). On mobile: stack vertically, full width.

Each card is a **founder card with a dithering portrait reveal**:

### Default state (before hover):
- The card shows a **dithered/pixelated treatment of the founder's portrait** — using the same dithering shader aesthetic as the hero. The image appears as an emerald-toned pixel-dissolve rendering of the face/upper body, like it's still materialising.
- Name and role are visible below (or overlaid at bottom of card), always readable.
- The card itself sits on `--bg`, `--radius-xl`, `--shadow-card`.

### Hover state:
- The real founder photograph **crossfades in** as the dithering dissolves away — Framer Motion `AnimatePresence` with opacity 0→1 on the real photo, opacity 1→0 on the dithered layer, duration ~0.5s, easing `ease-out`.
- The transition should feel like fog clearing or signal resolving into clarity — not a hard swap.
- On mobile: no hover. Show a 50/50 split of dithered | real photo side by side within the card, or simply show the real photo directly (hover is not a mobile interaction).

### Card content layout:
- Top ~70% of card height: the portrait area (dithered → real on hover)
- Bottom ~30%: white or `--bg` content area with:
  - Name (Nohemi 700, `--text-h3`, `--fg`)
  - Role + arm (DM Sans 500, `--text-small`, `--elyst-emerald`) — e.g. "Chief AI Officer · AIOS"
  - One-line bio (DM Sans 400, `--text-small`, `--fg-2`) — max 15 words
  - LinkedIn link (small, `--fg-3`, underline on hover)
  - CTA link that connects to their arm: "Work with Nihal →" / "Learn with Shirin →"

---

## Content

**Section eyebrow** (centred above the two cards):
`.eyebrow` + `.chip`: "The founders"

**Section headline** (Nohemi 700, `--text-h2`, centred):
Intent: two people who studied AI when almost no one in Kerala did, and chose to build rather than join a big company.
Claude Code writes the final line. Example intent: "Built by Kerala's first AI graduates."

**Section sub-line** (DM Sans 400, `--text-body`, `--fg-2`, centred):
One sentence. Names Kozhikode, India + GCC, and that both arms come from the same foundation.

**Nihal's card:**
- Name: Nihal Anas
- Role chip: "Chief AI Officer · AIOS"
- Bio line: "Builds and deploys AIOS for SMEs across India and the GCC."
- CTA: "Work with Nihal →" → /contact or /aios

**Shirin's card:**
- Name: Fathima Shirin P
- Role chip: "CEO · AI Accelerator"
- Bio line: "Leads live AI learning programs for professionals and students."
- CTA: "Learn with Shirin →" → /learn

---

## The dithering portrait implementation note (for Claude Code)

The dithering effect on portraits is a **CSS/canvas implementation**, not the Cult UI hero shader used in the hero section. Options in priority order:
1. Use the `@paper-design/shaders-react` `Dithering` primitive directly (same package as hero — consistent) applied to an `<img>` or `<canvas>` layer over the photo. Set `colorFront: "--elyst-emerald"`, `colorBack: "--bg"`.
2. Fallback: a CSS `filter` + SVG filter approach (feComponentTransfer + feTurbulence) that approximates a dither look.

The real photo underneath must be a real, well-lit portrait on a neutral or light background. No stock. No AI-generated faces. No heavy editing. These are real people — the image must read as authentic.

Until real photos are supplied, use a placeholder with the founder's initials on `--emerald-tint-10` background + the dithering effect on top of that.

---

## Reference images

Three images are in this folder. Read all three before building.

**`mood-interaction.png`** — portrait carousel in default state (all cards showing real photos, dark background).
**`mood-interaction-hover.png`** — same carousel with one card in hover state (card expands, photo fades, bio text appears).
- These two are the **interaction reference**. Take: the portrait-led card format, the generous card height that gives the face space to breathe, the way hovering a card reveals a text layer over the portrait area. Ignore: dark background (ours is `--bg`), the carousel/scrollable format (we have exactly two cards, static side-by-side), the multiple-people format (we have two founders only).

**`mood-dither.png`** — orange dithered portrait concept (halftone/pixel-dissolve treatment of a face in brand colour, split with a real photo).
- This is the **visual style reference** for the default/before-hover state. Take: the dithered/pixelated treatment of a portrait rendered in a single brand colour, the way the face is still recognisable through the texture, the feeling of a person emerging from signal noise. Ignore: the orange colour (ours is `--elyst-emerald`), the 50/50 side-by-side split within a single card (ours transitions on hover, not a static split).

---

## Coherence check
This section uses the same dithering aesthetic as the hero — intentional. It creates a visual callback that ties the site's opening moment to its most human moment. The founders are the intelligence that built AIOS and the Accelerator; the dithering → reveal mechanic says exactly that without words.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` section background, `--elyst-emerald` for dithering shader colour and role chips, `--fg` names, `--fg-2` bio lines, `--fg-3` LinkedIn links. `--radius-xl` on cards. Nohemi 700 names, DM Sans everything else. Framer Motion for hover crossfade — easing and timing deferred to emil-design-eng skill in polish pass.
