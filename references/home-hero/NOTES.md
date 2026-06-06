# Home Hero — NOTES.md

## What this section is
The first thing every visitor sees. Its single job: tell them who Elyst is in one breath, then give them a door. If a visitor can't tell in 5 seconds which arm is theirs, they leave. Nothing below this recovers them.

## Job it must do
Route. Not explain, not impress — route. One headline, two doors, done.

---

## Layout (structure)

Use the **Cult UI Hero Dithering** component as the structural base.
Install: `pnpm dlx shadcn@latest add https://cult-ui.com/r/hero-dithering.json`

**Split layout:** copy + fork on the left, dithering shader visual on the right.
- Left column: eyebrow chip → headline → sub-line → two fork cards → micro-proof line
- Right column: dithering shader, desktop only (mobile gets a smaller shader strip below)

**The fork cards** sit below the sub-line, side by side, equal width, equal weight:
- Card 1: "For business owners" · "AI that runs your operations" · arrow → /aios
- Card 2: "For professionals & students" · "Programs that build real AI fluency" · arrow → /learn
- On mobile: stack vertically, full width, card 1 above card 2
- Cards use `.card` primitive (white, `--radius-card` 20px, `--shadow-card`)
- On hover: lift -4px, `--shadow-card-hover`, emerald left border 2px appears
- No `.card-tint` here — plain white. The fork must feel decisive, not decorative.

**Micro-proof line** below the cards (small, `--fg-3`):
"Configured and deployed for your business. Nothing to install." (AIOS register)

---

## Content

**Eyebrow chip** (`.eyebrow` + `.chip`):
"Kozhikode · Kerala · India & GCC"

**Headline** (Nohemi 700, `--text-hero`, `--tracking-display`):
Two lines. Claude Code writes the copy — the intent is:
- Line 1: what Elyst does for businesses (AI that runs operations)
- Line 2: what Elyst does for people (programs that build AI fluency)
Keep it plain, confident, no jargon. No "LLM", no "agentic", no "revolutionising".
Aim: under 10 words total across both lines.

**Sub-line** (DM Sans 400, `--text-body`, `--fg-2`):
One sentence. Names both audiences and both outcomes.
Example intent: "We deploy AI into businesses. We teach people to use it."
Claude Code writes the final wording.

**Fork card copy:**
- Card 1 label: "For business owners" · benefit: "AI that handles your team's daily operations — inside WhatsApp." · CTA text: "See AIOS →"
- Card 2 label: "For professionals & students" · benefit: "Live programs that make you genuinely capable with AI." · CTA text: "Explore programs →"

---

## Animation (shader)

**Component:** HeroDithering from Cult UI.
**Shader config:**
```
colorFront: "#03624C"   // --elyst-emerald
colorBack:  "#F5F8F6"   // --bg (warm off-white)
speed: 0.6              // slow, contemplative — not frantic
scale: 0.8
```
The dithering effect should feel like something materialising out of noise — intelligence becoming visible. Not a screensaver. Not aggressive.

Mobile: use `mobileShaderProps` with the same colors, speed 0.5, smaller canvas. The mobile shader sits below the copy stack as a decorative band, not a side-by-side layout.

**Do not add any other animation to the hero** — no particle fields, no gradient mesh, no scroll parallax on the headline. The shader is the only moving element.

---

## Reference images

**`mood.png`** — Dayos.com hero screenshot. This is the structural and mood reference.
- **Take:** the split-layout proportion (roughly 50/50), the large confident left-aligned headline, the animated visual occupying the right half cleanly, the single sticky CTA button in the nav.
- **Ignore:** everything dark (Dayos is black bg — ours is `--bg` warm off-white), the all-caps treatment (ours is Nohemi sentence case), the Dayos logo/nav/product blocks below fold (not ours).

Feel: premium, minimal, serious without being cold. The light `--bg` background keeps it warm. The emerald dithering on the right signals intelligence, not decoration.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` page background, `--fg` headline, `--fg-2` sub-line, `--elyst-emerald` shader + card border accent on hover, `--elyst-green` not used here. Nohemi 700 for headline, DM Sans for everything else.
