# Accelerator Hero — NOTES.md

## What this section is
The front door for the LEARNING visitor — now specifically a **working professional who needs to upskill in AI to stay competitive**. Where the AIOS hero had to *convict a buyer*, this one's job is *warm welcome + motive*: AI is changing your field, and Elyst helps you stay genuinely capable — taught live, bilingually, backed by a community.

## Positioning (locked by Nihal — read before writing)
- **Audience = working professionals upskilling.** NOT kids/parents/students. Drop the "for your child" angle entirely.
- **The Flagship GenAI program for professionals is the anchor** — the destination this page points to. It launches late June; specifics are not finalised. Present it with RESTRAINT — do NOT brag, do NOT over-promise, do NOT publish a syllabus/price. Anticipation, honestly framed. **NO waitlist / no capture** (Nihal's call) — the Flagship is a teaser with NO CTA. Details will live on a future program page.
- **The community (Circle) is the PRIMARY ACTION.** Because there's no waitlist, the Nas.io community is the page's only real call-to-action — so it is the primary CTA across the page (hero + final band). It's still framed warmly as "the community that backs your learning," but it carries the conversion.
- AI Junior + AI Yathra are PROOF of track record only (handled in accel-proof), never offerings.

## Job it must do
Make a professional feel "AI is moving fast and this is where I stay ahead — with people who actually build it," then move them into the community (the only live action), with the Flagship named as the serious thing that's coming.

## This is the tonal pole opposite AIOS
A visitor who saw the AIOS page should feel they've walked into a different room of the same house. Warmer, rounder, more whitespace, livelier within-emerald colour, gentler/slower motion. SAME emerald palette — no violet, no new colour, light by default. Warmth/colour come from tone + leaning hard on green accents, tint fills, and within-emerald gradients ("bold but in-system").

---

## Layout (structure) — direction B (colourful gradient + soft shapes) + direction D (kinetic word)

- **Centred hero**, generous symmetrical whitespace (contrast with AIOS's left-aligned split).
- **Background:** soft WITHIN-EMERALD gradient wash — `--bg` warming into `--green-tint-07` / `--emerald-tint-10`, optional faint `--elyst-green` glow. No multi-hue gradient, no violet. Light and airy, not saturated-dark.
- **Soft floating shapes:** a few rounded, low-opacity ABSTRACT shapes drifting gently (slow Accelerator-register motion). NOTE: these are abstract/brand shapes now — NOT four program emblems (there is no four-program ladder anymore). Decorative, never blocking text.
- **Kinetic headline (direction D):** the headline carries ONE cycling word swapping on a gentle timer (~2s, soft fade/slide). Fixed part states the motive; the cycling word names the transformation. Example intent (Claude Code finalises): "Stay genuinely **capable / fluent / confident / competitive** with AI." Only the cycling word moves; the rest is still.
- **Sub-line** (centred): names the audience (working professionals across India & the GCC) + format (live, bilingual Malayalam + English, community-backed).
- **CTAs:** primary = the community (the only live action); optional soft secondary = scroll to learn about the coming Flagship.
  - Primary `.btn-primary`/`.btn-accent`: "Join the community →" → Nas.io Circle page. [Nihal to paste exact Nas.io URL.]
  - Optional secondary `.btn-ghost`: "See what's coming ↓" — smooth-scroll to accel-paths (no waitlist, just the teaser).
- Mobile: stack centred, gradient + a couple of shapes only, cycling word retained if performant, CTAs prominent.

**Discipline note:** designy ≠ busy, and restraint matters doubly because the Flagship isn't fully real yet. One kinetic element (cycling word), a few drifting shapes, a soft gradient — that's the budget. Don't oversell what's still in development.

---

## Content
(Copy is INTENT + example strings — Claude Code finalises. Not locked.)

**Eyebrow chip** (`.eyebrow` + `.chip`, `--green-tint-15` fill for a livelier chip): "Learn AI · The Accelerator"

**Headline** (Nohemi 700, `--text-hero`, `--tracking-display`): motive + cycling word. Intent — stay genuinely capable/competitive with AI as a professional. Warm, plain, no jargon, no hype.

**Sub-line** (DM Sans 400, `--text-body`, `--fg-2`): one sentence — for working professionals who want to stay ahead as AI reshapes their field; live, bilingual, community-backed.

**Primary CTA** (`.btn-primary` or `.btn-accent`): "Join the community →" → Nas.io Circle page. [Insert exact Nas.io URL.]
**Optional secondary CTA** (`.btn-ghost`): "See what's coming ↓" → smooth-scroll to accel-paths. (No waitlist — the Flagship has no capture.)

(Optional soft belonging badge, only if true: "Backed by a 34+ member community.")

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.

Where to look (BLUEPRINT §11 "overall minimal brand feel" + warm cohort/community refs):
- **Mood:** Godly / Land-book — warm, colourful, modern professional-education / community heroes with soft gradients and rounded shapes; Maven cohort heroes for warmth. **Take:** soft gradient washes, rounded floating shapes, generous centred whitespace, friendly confident type. **Ignore:** non-emerald colour (recolour to our greens/tints), dark backgrounds, busy maximalism, kid/school imagery.
- **Structure (code):** shadcn / Cult UI animated/text-cycle hero blocks; drop chosen one as `option-A.txt`.

One structure + one mood MAX.

---

## Coherence check
Same brand house as AIOS/Home (chip→headline→subline→CTA rhythm, emerald palette, fonts) but the OPPOSITE tonal pole — centred, gradient+shapes, cycling-word warmth vs AIOS's tight conviction. Sets up accel-paths (next): hero states the motive, paths show the one real way in now (Flagship waitlist) plus the community backer. NOTE downstream: the Home accelerator-teaser still shows a four-program ladder including Junior/Yathra — flag for revision to match this professionals-only, Flagship+community positioning.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` → `--green-tint-07`/`--emerald-tint-10` gradient, `--elyst-green`/`--green-mid` live accents, `--green-tint-15` chip fill, `--fg` headline, `--fg-2` sub-line, `--elyst-emerald` shape accents. `--radius-xl`/`--radius-pill` shapes, soft diffuse shadows (Accelerator tone). Nohemi 700 headline, DM Sans else. Light only — no dark, no violet, no new colour. Gentle/slow motion — easing deferred to emil-design-eng.
