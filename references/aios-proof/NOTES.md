# AIOS Proof & Founder — NOTES.md

## What this section is
Final credibility before the ask. It puts a real, capable person and a real registered company behind AIOS — so the booking CTA is a call with someone trustworthy, not a leap of faith.

## Job it must do
Move trust from "this looks like a real product" to "real, capable people stand behind it." Close the credibility gap right before the conversion.

## Honesty constraint (BLUEPRINT §13)
AIOS social proof is THIN until the Dubai pilot is public. Do NOT invent testimonials, client logos, or metrics. Lean on what's true: the founder's credentials, the registered LLP, the build-per-client philosophy, and working flows actually demoed. Leave a clearly-marked slot to drop the Dubai outcome the moment it's live.

---

## Layout (structure) — direction A: founder-led, dithering portrait

Reuse the `home-founders` dithering-portrait aesthetic for a deliberate family callback — the same "person emerging from signal noise" treatment ties the AIOS page to the brand's most human moment.

- **Nihal-focused** (this is the AIOS arm — Nihal Anas, Chief AI Officer). One founder card/feature block, not the two-up grid from Home (that's the Home/About job). 
- Portrait area: dithered emerald rendering of Nihal's photo by default; on hover (desktop) the real photo crossfades in (~0.5s), same mechanic as `home-founders`. Mobile: show the real photo directly (no hover).
- Beside/below the portrait: name, role chip ("Chief AI Officer · AIOS"), a short build-philosophy paragraph (configured per client, supported directly), and the registered-LLP line.
- A small, honest proof strip: registered LLP (Elyst AI LLP · Kozhikode), "live working deployments / flows demoed" — real signals only. Reserve a marked slot: "[Dubai pilot outcome — add when live]".
- Optional quote card slot (leave empty / hidden until a real, attributable quote exists — do not fill with placeholder praise).

Background: `--bg` (light). Emerald on role chip + accents. AIOS register: crisp, not soft.

**Discipline note:** one founder, honest signals, no fabricated proof. If there's nothing true to put in the quote slot, omit the slot — an empty honest section beats a fake-testimonial section.

---

## Content
(Copy is INTENT — Claude Code finalises. Not locked.)

**Eyebrow chip**: "Who builds AIOS" / "Behind AIOS"
**Heading** (Nohemi 700, `--text-h2`): intent — built and run by the people you'll actually talk to. Example intent: "Built and run by the person you'll work with."
**Founder name**: Nihal Anas · role chip: "Chief AI Officer · AIOS"
**Build-philosophy line(s)** (DM Sans 400, `--fg-2`): intent — AIOS is configured per client and supported directly by the team that built it; not a faceless tool.
**LLP / signal line** (DM Sans 400, `--fg-3`): "Elyst AI LLP · Kozhikode, Kerala" + honest current signals.
**Dubai slot**: clearly-marked placeholder for the pilot case study.

**No standalone CTA** — flows into FAQ then the final CTA band.

---

## Reference images
Look at the existing `home-founders/` references for the dithering portrait + reveal aesthetic — match that family. No new `mood.png` needed unless you want a different framing; if so, drop it here.

- **Structure (code):** reuse the dithering-portrait implementation noted in `home-founders/NOTES.md` (`@paper-design/shaders-react` Dithering over a real photo, `colorFront: --elyst-emerald`, `colorBack: --bg`). Single card, not the two-up grid.
- **Mood:** same as `home-founders` — authentic, real photo, emerald dither, light surface. **Ignore:** dark backgrounds, the two-founder layout (this is Nihal only).

---

## Coherence check
Belongs after `aios-pricing`: a premium custom quote needs a credible human behind it — this provides it. The dithering portrait is a direct callback to `home-founders` and the hero's dithering language on Home, tying the brand together. Sets up FAQ (next) and the final CTA: once they trust the person, the remaining objections (FAQ) and the booking (CTA) are low-friction. Light, AIOS register.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` background, `--elyst-emerald` dither colour + role chip, `--fg` name/heading, `--fg-2` philosophy, `--fg-3` LLP/signal lines. `--radius-xl` on the founder card (match home-founders). Nohemi 700 name/heading, DM Sans everything else. Framer Motion crossfade on hover (desktop), real photo on mobile. Light only (the page's one dark section is aios-problem). No fabricated proof.
