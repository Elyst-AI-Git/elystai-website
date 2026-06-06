# Home AIOS Teaser — NOTES.md

## What this section is
A single-screen tease of the AIOS product for SME founders who landed on the Home page. Its entire job is to create enough curiosity that they click through to the AIOS page. It does NOT explain AIOS fully — that is the AIOS page's job.

## Job it must do
Be a door, not an explainer. One compelling promise + one real visual hint + one arrow.

---

## CRITICAL DISCIPLINE NOTE
This section must resist the temptation to list capabilities. No feature bullets, no sub-bullets, no "here's what AIOS can do" list. The moment it becomes a feature list it starts competing with the AIOS page and confusing the visitor. One headline. One sub-line. Three benefit phrases max (see content below). One mockup. One CTA.

---

## Layout (structure)

**Split layout — copy left, product mockup right.** Roughly 50/50 on desktop.

Left column (copy):
- Eyebrow chip
- Headline
- Sub-line
- Three short benefit phrases (not a bulleted list — render as stacked lines with a small emerald dash or dot prefix, DM Sans 500, `--fg-2`)
- CTA button: `.btn-primary`

Right column (visual):
- A phone or browser mockup frame containing a WhatsApp/Telegram-style chat interface
- The chat shows: one incoming message from a team member → one AIOS reply with a short answer + a "PDF generated ✓" indicator
- Static on first render; on scroll-into-view, the reply "types in" (simple typewriter animation, ~1s)
- The mockup sits on `--bg`, no drop shadow or device glow needed — keep it clean

On mobile: stack vertically. Mockup moves below copy. Mockup scales to 85% width, centred.

Section background: `--bg` (same as page). No colour change — the visual and copy carry the weight.

---

## Content

**Eyebrow chip** (`.eyebrow` + `.chip`):
"AIOS for Business"

**Headline** (Nohemi 700, `--text-h2`, `--tracking-display`):
Intent: AIOS is the smart operations layer that lives inside the messaging tools your team already uses. Plain language. No jargon.
Claude Code writes the final wording. Example intent: "Your team already uses WhatsApp. Now it works for you."

**Sub-line** (DM Sans 400, `--text-body`, `--fg-2`):
One sentence naming the audience (SMEs of 5–50 people, no technical team) and the mechanism (message it, it answers and acts).

**Three benefit phrases** (DM Sans 500, `--fg-2`, emerald dash prefix):
- "Knowledge trapped in a few heads → instant answers for the whole team"
- "Documents made by hand → generated from one message"
- "Nobody knowing what to do → automatic daily task briefings"

Keep each under 12 words. These are symptoms → relief pairings, not feature names.

**CTA** (`.btn-primary`):
"See how AIOS works →"
Links to /aios

**Micro-qualifier** below CTA (DM Sans 400, `--text-small`, `--fg-3`):
"Configured and deployed for you. Nothing to install."

---

## Reference images

**`mood.png`** — Dayos "Introducing Hero" screenshot (copy left, chat/product interface right on dark bg).
- **Take:** the split-layout proportion (~45% copy / ~55% product), the way the product UI is shown inside a device/browser frame floating on the right, the clean left-aligned copy stack with headline + short paragraphs + single CTA.
- **Ignore:** dark background (ours is `--bg` warm off-white), Dayos's dense multi-paragraph copy (ours is headline + sub-line + 3 short lines max), their specific product UI (ours is a WhatsApp/Telegram chat mockup).

The AIOS teaser should feel like a product company showing a real thing — not an agency describing a service. The mockup does the convincing; the copy names the pain.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` section background, `--elyst-emerald` for CTA button and dash prefixes, `--fg` headline, `--fg-2` body + benefit phrases, `--fg-3` micro-qualifier. Nohemi 700 headline, DM Sans everything else. `--radius-card` on the mockup frame if using a card container.
