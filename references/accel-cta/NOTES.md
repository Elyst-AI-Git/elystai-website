# Accelerator — Final CTA Band — NOTES.md

## What this section is
The conversion close for the learning visitor. Catches anyone who scrolled to the bottom and re-presents the two ways in: the Flagship waitlist (primary) and the community (the low-friction backer).

## Job it must do
Convert. The community (Nas.io) is the page's ONLY real action — so it's the primary (and effectively sole) CTA. The Flagship is named as "coming," with no waitlist/button. One warm, decisive band.

## Positioning (locked)
- Community (Nas.io) is the PRIMARY CTA (mirrors the hero). It's the only live conversion on the page.
- Flagship: mentioned as "coming soon," NO waitlist, NO button. Honest anticipation only.
- No bragging about the Flagship.

---

## Layout (structure) — warm emerald CTA band

- Full-width band in a warm within-emerald treatment — `--elyst-emerald` or a soft within-emerald gradient (livelier than AIOS's flat band, Accelerator tone). Rounded container edges if inset; generous padding.
- One confident headline + a short warm line.
- One CTA (the only live action):
  - Primary `.btn-onlight` (white/emerald) or `.btn-accent`: "Join the community →" → Nas.io Circle page. [Insert exact Nas.io URL.]
  - Optional: a soft non-clickable line "Flagship program launching late June — community members hear first." (anticipation, no button).
- Mobile: stack, CTA prominent, full width.

Note: this is NOT a dark section — warm emerald, light brand. (The whole Accelerator page is light; only the AIOS page uses one dark section.)

The global footer (already built) follows this band — don't rebuild nav here.

**Discipline note:** two CTAs max, clear primary/secondary hierarchy. Don't reintroduce Junior/Yathra or any past program as an action here.

---

## Content
(Copy is INTENT — Claude Code finalises. Not locked.)

**Headline** (Nohemi 700, `--text-h1`/`--text-h2`): intent — stay ahead of AI, with people who build it. Warm, inviting. Example intent: "Stay ahead of AI. Start with us."
**Sub-line** (DM Sans 400): intent — join the community today; the Flagship program is coming and members hear first.
**Primary CTA**: "Join the community →" → Nas.io. [Insert URL.]
**Anticipation line** (no button): "Flagship program launching late June 2026."

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.
- **Structure (code):** shadcn CTA band block; drop chosen one as `option-A.txt`.
- **Mood:** Maven / warm community closing CTAs — inviting, warm accent, clear primary action. **Take:** the single-focus warmth, the primary/secondary pairing, generous padding. **Ignore:** non-emerald colour, dark themes, multi-CTA clutter, fake countdowns.

One structure + one mood MAX.

---

## Coherence check
Belongs at the page foot, after accel-proof: trust built, now convert. Bookends the hero — the page opens and closes on the same pairing (Flagship waitlist primary, community secondary). Warm emerald band is the brightest Accelerator moment, mirroring (in warm tone) how the AIOS page closes on its emerald band — same brand, different temperature. Global footer follows.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--elyst-emerald` or within-emerald gradient band, `--fg-on-dark`/white text on it, `.btn-onlight`/`.btn-accent` primary, lighter secondary. `--radius-xl` if inset, `--section-py` padding. Nohemi 700 headline, DM Sans else. Light brand (warm emerald, NOT dark — no violet, no new colour). Gentle motion — easing deferred to emil-design-eng.
