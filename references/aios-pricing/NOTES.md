# AIOS Pricing Framing — NOTES.md

## What this section is
Pricing WITHOUT numbers. It signals that AIOS is a premium, custom service, sets the expectation of a tailored quote, and qualifies out tyre-kickers — all without publishing a figure.

## Job it must do
Three things at once: (1) signal premium/serious, (2) set the expectation that price is custom → "book a call for a quote," (3) filter — wrong-fit visitors self-select out via a clear "who this is for / not for." Do NOT publish exact numbers.

---

## Layout (structure) — direction B: structure diagram + "for you / not for you"

Two parts in one section:

### Part 1 — the cost structure (not a price table)
Three components shown as a simple structure (cards or a labelled diagram), each with a one-line description of what it covers — NO figures:
1. **One-time setup** — discovery, configuration, and deployment for your business.
2. **Monthly retainer** — ongoing running + support; scales with the modules you run.
3. **Optional training add-on** — AI-tools training for your team (NotebookLM, Claude Projects).

Make it visually clear these are the *shape* of an engagement, not a menu with prices. A small line: "Configured to your business — every quote is tailored."

### Part 2 — who this is for / who it's not
A two-column qualifier:
- **AIOS is for you if…** (e.g. a team of 5–50, no technical staff, drowning in manual documents/queries, ready to commit to a configured service).
- **AIOS is not for you if…** (e.g. you want a free self-serve tool, a one-off ChatGPT licence, or aren't ready to change how the team works).

The honest disqualifier builds trust and raises perceived fit for the right buyer. Keep it candid, not snobby.

Layout: structure (Part 1) on top, qualifier (Part 2) below — or side by side on wide desktop. Mobile: stack, structure first. `.card` for structure components; the for/not-for can use a subtle two-column block (left tinted with `--green-tint-07`, right neutral/muted) so "for you" reads positive without shouting.

Background: `--bg` (light). Emerald accent on the structure and the "for you" column; muted on "not for you".

**Discipline note:** resist the urge to hint at numbers ("starting from…"). The entire strategy is custom-quote. One CTA, no price.

---

## Content
(Copy is INTENT — Claude Code finalises. Not locked.)

**Eyebrow chip**: "Pricing" / "What it costs"
**Heading** (Nohemi 700, `--text-h2`): intent — priced to your business, not off a shelf. Example intent: "Priced to your business, not a price list."
**Sub-line** (DM Sans 400, `--fg-2`): intent — AIOS is a configured service, so every engagement is quoted to your workflows and the modules you run.
**Structure component copy**: the three components above, one line each, no numbers.
**For / not-for copy**: candid bullet-style lines (these CAN be short lines, this is one of the few places a tight list is appropriate).

**CTA** (`.btn-primary`): "Get a tailored quote → Book a call" → /contact. This is the section's single action.

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.

Where to look (BLUEPRINT §11):
- **Structure (code):** shadcn / HyperUI pricing or feature-comparison blocks — but stripped of prices; drop chosen one as `option-A.txt`.
- **Mood:** Stripe / Linear pricing or "contact sales" framing — premium, calm, structure-not-table, single CTA. **Take:** the confident no-number "talk to us" posture, clean component cards, the for/not-for honesty. **Ignore:** dark themes, three-tier SaaS price tables, "most popular" badges, any figures.

One structure + one mood MAX.

---

## Coherence check
Belongs after `aios-model`: they now know it's a done-for-you service, so "what does it cost?" is the live question — answered with structure + a quote CTA. The "for you / not for you" echoes the qualifying instinct and sets up Proof & founder (next), which provides the credibility that justifies a premium custom quote. Tight, candid, premium — AIOS register. Light only.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` background, `.card`/`--radius-card` for structure components, `--green-tint-07` for the "for you" column, `--elyst-emerald` accents + CTA, `--fg` heading, `--fg-2` body, `--fg-3` muted "not for you". Nohemi 700 heading, DM Sans everything else. Light only (the page's one dark section is aios-problem). NO published numbers anywhere.
