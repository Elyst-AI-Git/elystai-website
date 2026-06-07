# AIOS FAQ — NOTES.md

## What this section is
The objection-remover AND the page's single biggest AI-citation asset. It answers the real last-minute questions a buyer has, and (because it's marked up with FAQPage schema and written answer-first) it's what AI engines quote when someone asks about AIOS.

## Job it must do
Two jobs: (1) remove the final objections so the booking CTA is friction-free; (2) feed AEO/GEO — answer-first, plain, self-contained answers that engines can lift verbatim. This is one of the three highest-leverage sections on the page (BLUEPRINT §4 close).

---

## The questions (real buyer questions — keep these, plain answers)
1. **Do we need any technical skills?** — No. Your team uses WhatsApp/Telegram as they already do; Elyst configures and runs everything.
2. **What if our team only uses WhatsApp?** — That's exactly the point. AIOS lives in WhatsApp/Telegram; nothing new to install or learn.
3. **Is our data secure / where does it live?** — Answer honestly and specifically. Do NOT hand-wave (BLUEPRINT §13 flags this as a real objection). State how data is handled and access controlled. [Nihal to confirm exact, true wording before launch.]
4. **How long does setup take?** — Give the honest range across discovery → configuration → deployment. [Confirm real timeline.]
5. **What does it cost?** — Custom, configured to your business: one-time setup + monthly retainer + optional training add-on. Tailored quote on a call. (Mirrors the pricing section — no numbers.)
6. **Can it work in the GCC / in Arabic?** — Answer to the real capability. [Confirm Arabic support status before publishing.]
7. **How is this different from ChatGPT?** — The differentiator answer: AIOS knows your business (your documents, data, tools) and acts inside it (produces documents, runs tasks, role-based); a generic chatbot does neither. (Echoes the how-it-works contrast line.)

Order: lead with the lowest-friction reassurances (1, 2), put the differentiator (7) and data/security (3) where they get attention. Claude Code finalises order + exact wording; items in [brackets] need Nihal's real facts before launch — do not invent.

---

## Layout (structure)
- **Accordion.** Click a question to expand its answer. Keep it text — crawlable and citable.
- **Critical AEO requirement:** all answers must be present in the initial server-rendered HTML (not injected on click via JS). The accordion may visually collapse them, but the text must exist in the DOM on load, and be marked up with **FAQPage schema (JSON-LD)** per BLUEPRINT §12.2. This is the page's biggest citation asset — if the answers aren't in the HTML, engines can't quote them.
- **Answer-first writing:** each answer opens with the direct answer in 1–2 sentences, then expands. 2–4 sentences total per answer.
- Single column, comfortable measure. Plenty of whitespace. Subtle divider lines between items.

Background: `--bg` (light). Emerald only on the expand/active indicator and any inline links. Restrained.

**Discipline note:** keep it text. No illustrations, no cards-with-icons. The value here is crawlable, quotable plain text — design it to be read and lifted, not decorated.

---

## Content
(Answers are INTENT + must be made factually true by Nihal where bracketed. Not locked.)

**Eyebrow chip**: "FAQ" / "Questions, answered"
**Heading** (Nohemi 700, `--text-h2`): intent — the things buyers actually ask. Example intent: "Questions teams ask before they start."
**Q&A pairs**: as listed above, answer-first, plain, 2–4 sentences.

**No CTA inside the accordion** — the final CTA band (next section) carries the action. Optionally one soft line at the end: "Still have a question? Ask us on the call."

---

## Reference images
No `mood.png` needed — this is a standard accordion. If you want a specific style, drop one in.
- **Structure (code):** shadcn Accordion component; drop as `option-A.txt`. Ensure the implementation renders answer text server-side (some accordion libs lazy-render — avoid that here).
- **Mood:** any clean, text-forward FAQ (Linear / Stripe). **Take:** restraint, readable measure, subtle dividers. **Ignore:** dark themes, icon-heavy cards.

---

## Coherence check
Belongs after `aios-proof`: trust established, now clear the last doubts. Several answers deliberately echo earlier sections — data/security (the model), cost (pricing), "different from ChatGPT" (how-it-works), "only WhatsApp" (hero micro-proof) — reinforcing the page spine one final time in the visitor's own question-shaped language. Sets up the final CTA. Light, plain, AEO-optimised.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` background, `--fg` questions, `--fg-2` answers, `--elyst-emerald` expand indicator + inline links, `--border` dividers. Nohemi 700 section heading + question text optional, DM Sans for answers. Light only (the page's one dark section is aios-problem). FAQPage JSON-LD schema required; answers server-rendered in HTML.
