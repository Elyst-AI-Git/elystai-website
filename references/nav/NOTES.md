# Navigation — NOTES.md

## What this section is
The global site navigation. Appears on every page, built first as part of the global shell. It is a floating pill navbar — dark, centred, sitting above page content.

## Job it must do
Let any visitor reach any key page in one click, signal which arm they're in, and always surface the primary conversion action (Book a call / Join).

---

## Layout (structure)

**Floating pill navbar.** Not edge-to-edge — it floats centred above the page content, fixed on scroll, with a gap between its edges and the viewport edges.

Shape: `--radius-pill` (999px) — fully rounded ends, like image 3.
Background: `--surface-dark` (`#0E211A`) with a subtle `--shadow-card` beneath it.
Width: `min(900px, calc(100vw - 48px))` — max 900px, 24px breathing room each side on smaller screens.
Height: ~56px on desktop, ~52px on mobile.
Position: `fixed`, `top: 20px`, centred horizontally (`left: 50%, transform: translateX(-50%)`).
`z-index`: above all page content.

On scroll: the navbar is already fixed/floating — no additional scroll behaviour needed. Optionally add a very subtle `backdrop-filter: blur(12px)` + slight background opacity increase (from 0.95 to 1.0) once the page scrolls past 40px, to reinforce the floating feeling.

### Desktop layout (left → right inside the pill):

`[Nav links left] ··· [LOGO — centred] ··· [Nav links right] [CTA button]`

- Logo sits at the absolute horizontal centre of the pill via CSS `position: absolute; left: 50%; transform: translateX(-50%)`. The left and right link groups use `flex: 1` on each side to push the logo to true centre.
- Left links (2 items): "AIOS for Business" · "About"
- Right links (2 items): "Learn AI" · "Blog"
- Far right: CTA button (see below)
- All links: DM Sans 500, `--text-small`, `--fg-on-dark`, no underline. On hover: opacity shifts to `--elyst-green` tint, smooth 0.2s.

### The CTA button (far right):

Pill-shaped outline button. **No solid fill by default.** Border is a gradient stroke: `--elyst-emerald` → `--elyst-green` (left to right). This is the image 2 treatment — rainbow border replaced with our emerald-to-green gradient.

Implementation note: CSS `border` doesn't support gradients natively. Use one of:
- A `::before` pseudo-element with gradient background + inner mask
- Or `background: linear-gradient(--surface-dark, --surface-dark) padding-box, linear-gradient(to right, #03624C, #00DF82) border-box; border: 1.5px solid transparent;`

Button text: DM Sans 700, `--fg-on-dark`, `--text-small`.
Padding: `--space-3` vertical, `--space-6` horizontal.
`border-radius`: `--radius-pill`.

On hover: gradient border animates to full brightness, optional very subtle inner glow (`--shadow-glow` at 40% opacity).

**Contextual CTA label (dynamic — requires page context):**
- On Home, AIOS page, About, Contact, Blog: "Book a call" → links to `/contact`
- On Accelerator overview, Circle, AI Junior, AI Yathra, Flagship: "Join" → links to the relevant program page's primary CTA (Circle join, AI Junior enrol, etc.)
- Implementation: read the current route in the layout component. Use a `navCta` config map keyed by route prefix (`/learn`, `/circle`, `/ai-junior`, `/ai-yathra`, `/flagship` → "Join"; everything else → "Book a call").

### "Learn AI" dropdown:
"Learn AI" is the only nav item with a dropdown. On hover/click it reveals:
- Accelerator overview
- Circle
- AI Junior
- AI Yathra
- Flagship Course (with a "Coming soon" chip)

Dropdown style: small floating panel below the nav pill, `--surface-dark-2` background, `--radius-card`, `--shadow-card`. DM Sans 400, `--fg-on-dark` links. Closes on click-outside or mouse-leave.

---

## Mobile navigation

On mobile (`< 768px`): the floating pill collapses to show **logo centre + hamburger icon right only**. No links visible in the pill.

Tapping the hamburger opens a **full-screen menu overlay**:
- Background: `--surface-dark`, full viewport
- Logo at top centre
- Links as large stacked items (Nohemi 600, `--text-h3`, `--fg-on-dark`), generous spacing
- "Learn AI" expands inline (accordion) to show sub-items
- CTA button (same gradient-border pill style) pinned to bottom of overlay as a full-width button
- Close button (×) top right

The full-screen mobile menu matches the feel of the desktop nav — dark, premium, not a standard slide-out drawer.

---

## Reference images

Three images are in this folder. Read all three.

**`mood-1.png`** — dark floating pill nav, logo centred as a symbol, icon buttons on far right, links either side.
- **Take:** the floating pill shape, the dark background, the overall proportion and height of the bar, the way icon buttons sit on the far right as rounded squares.
- **Ignore:** the dark grid background behind it (ours sits on `--bg` page), the icon-only CTA buttons (ours has a text CTA), the specific logo mark.

**`mood-2.png`** — dark pill nav with gradient-border CTA button ("Say Hello").
- **Take:** the gradient border pill CTA treatment — this is exactly the CTA button style we want. The gradient border is the signature element. Also note the active/hover state on "Work" — a muted pill fill behind the active link.
- **Ignore:** the dark gradient background (ours is `--surface-dark` flat), the rainbow gradient (replace with `--elyst-emerald` → `--elyst-green`), the "Work" pill fill on active state (optional for us — defer to polish pass).

**`mood-3.png`** — light background, dark pill nav, logo left-of-centre, links, email-style CTA pill on far right.
- **Take:** the overall pill nav structure, the way the CTA sits as a pill button on the far right with clear visual separation from the links, the compact height and tight internal spacing, the white CTA pill against dark background.
- **Ignore:** the light background (ours floats over `--bg` but the pill itself is dark), the email address as CTA text (ours is "Book a call" / "Join"), the logo position (ours is true centre not left).

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--surface-dark` pill background, `--fg-on-dark` link text, `--elyst-emerald` → `--elyst-green` gradient on CTA border, `--radius-pill` pill shape. DM Sans 500 nav links, DM Sans 700 CTA label. Framer Motion for mobile menu open/close — easing and feel deferred to emil-design-eng polish pass.
