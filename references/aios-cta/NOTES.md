# AIOS Final CTA Band — NOTES.md

## What this section is
The conversion. The last thing on the page: one unambiguous line and one way to book a call. Everything above has earned this moment — don't dilute it.

## Job it must do
Get the booking. One message, one action. No competing links, no second-guessing.

---

## Layout (structure) — direction B: inline scheduler embed

The visitor books on-page without leaving — highest conversion. A full-width emerald band with the booking embedded.

- Full-width band in `--elyst-emerald` (the page's main accent; this is the one big solid-green moment — note: solid emerald, NOT dark; the page's one dark section stays at aios-problem).
- Left/top: one confident headline + a short low-friction reassurance line.
- Right/below: the **inline scheduler embed** (Cal.com or Calendly) so the call books in-place.
- Buttons/text on the band use `.btn-onlight` (white bg / emerald text) for contrast on the green.

**OPEN DECISION (BLUEPRINT §13):** the scheduler tool for AIOS calls is not yet locked. So brief this with a fallback:
- **If a scheduler is chosen by build time:** embed it inline (Cal.com recommended — clean, free tier, embeds well in Next.js).
- **If not yet chosen:** ship the band with a single `.btn-onlight` "Book a call" button linking to /contact, and leave a clearly-marked slot to drop the embed in later. Do NOT block the page launch on the scheduler decision.

Mobile: the embed must be mobile-first (most traffic is mobile per BLUEPRINT §12) — if the chosen scheduler embeds poorly on mobile, fall back to the button on mobile and embed on desktop.

---

## Content
(Copy is INTENT — Claude Code finalises. Not locked.)

**Headline** (Nohemi 700, `--text-h1` or `--text-h2`, on emerald → `--fg-on-dark`/white): intent — one clear invitation to talk. Example intent: "See AIOS running in your business."
**Reassurance line** (DM Sans 400, on-green muted): intent — low-commitment. Example: "A short call. We'll show you exactly how it'd work for your team. No obligation."
**CTA**: "Book a call" (`.btn-onlight`) → scheduler embed or /contact.

Single CTA only. No secondary link, no footer-style nav inside the band (the global footer follows this section and carries navigation).

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.
- **Structure (code):** shadcn CTA band block + the chosen scheduler's official embed snippet; drop as `option-A.txt`.
- **Mood:** Stripe / Linear closing CTA bands — one line, one action, confident, calm. **Take:** the single-action focus, the full-width accent band, generous padding. **Ignore:** dark themes (use solid emerald, not dark), multi-CTA clutter.

One structure + one mood MAX.

---

## Coherence check
Belongs at the page foot, after `aios-faq`: objections cleared, now convert. It resolves the hero's single CTA ("Book a call") — the page opens and closes on the same one action, a clean bookend. The solid emerald band is the brightest, most saturated moment, the opposite pole to the dark problem section — the page travels from dark chaos to bright resolution. The global footer (already built) follows. Light/emerald, AIOS register — crisp, decisive.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--elyst-emerald` band background, `--fg-on-dark`/white text on it, `.btn-onlight` (white bg / emerald text) for the CTA. `--section-py` padding. Nohemi 700 headline, DM Sans everything else. NOT a dark section — solid emerald (the page's one dark section is aios-problem). Mobile-first scheduler embed with button fallback.
