# AIOS Model & Onboarding — NOTES.md

## What this section is
The objection-killer. By now the visitor wants AIOS but fears "is this another tool I have to set up and maintain?" This section answers plainly: it's not SaaS you install — Elyst configures, deploys, and supports it for you. Your team only needs WhatsApp.

## Job it must do
Remove the effort/risk objection. The visitor should think "I don't have to build or run this — they do, and onboarding is a clear, short path." Low effort, low risk.

---

## The two messages (in this order)
1. **The model:** AIOS is a configured service, NOT self-serve SaaS. Elyst discovers your workflows, configures AIOS to them, deploys it, and supports it directly. Your team's only requirement: WhatsApp or Telegram.
2. **The onboarding path:** Discovery → Configuration → Deployment → Training. Plus the optional AI-tools training add-on (NotebookLM, Claude Projects).

---

## Layout (structure) — direction B: vertical timeline

A clean vertical timeline of the onboarding steps — roomy, mobile-friendly, and it reads as "a guided path someone walks you through" (reinforces the done-for-you message).

- A short reframe statement up top: "Not software you install. A service we run for you." (sets the frame before the steps).
- Vertical timeline, 4 nodes top-to-bottom:
  1. **Discovery** — we learn your workflows, documents, and tools.
  2. **Configuration** — we build AIOS around how your business actually works.
  3. **Deployment** — it goes live in the WhatsApp/Telegram your team already uses.
  4. **Training** — your team learns to use it; optional AI-tools training add-on.
- Each node: a label + one line + small icon/marker. Connector line fills emerald as the eye travels down (subtle scroll-reveal, one pass).
- A small concrete detail near Deployment/Configuration: mention the Google Drive / Workspace connection as the onboarding preview (one line; optional small connect-screen mockup if cheap — not required for v1).
- Desktop: vertical timeline can sit beside a short copy column (reframe + the "your team only needs WhatsApp" reassurance). Mobile: single column, timeline stacks naturally.

Background: `--bg` (light). Emerald on the connector + node markers.

**Discipline note:** four steps, one line each. Don't expand into a project-plan. The message is "it's handled," not "here's a 40-point implementation."

---

## Content
(Copy is INTENT — Claude Code finalises. Not locked.)

**Eyebrow chip**: "The model" / "How you get AIOS"
**Heading** (Nohemi 700, `--text-h2`): intent — you don't install it, we deliver it. Example intent: "You don't set it up. We do."
**Reframe line** (DM Sans 500, `--fg`): intent — not SaaS you install; a service Elyst configures, deploys, and supports.
**Reassurance line** (DM Sans 400, `--fg-2`): "Your team only needs WhatsApp."
**Timeline step copy**: as above, one line per node.
**Add-on mention** (DM Sans 400, `--fg-3`): optional AI-tools training (NotebookLM, Claude Projects) as an add-on.

**No standalone CTA** — flows directly into Pricing (next), which carries the "book a call for a quote" action.

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.

Where to look (BLUEPRINT §11):
- **Structure (code):** shadcn / HyperUI vertical timeline or steps component; drop chosen one as `option-A.txt`.
- **Mood:** Stripe / Linear process or onboarding sections — calm, linear, one accent, lots of whitespace. **Take:** the clean vertical step rhythm, emerald connector, restraint. **Ignore:** dark themes, busy iconography, multi-accent.

One structure + one mood MAX.

---

## Coherence check
Belongs after `aios-use-cases`: they now want it (saw their industry), so this shows how getting it works and removes the setup fear. Reinforces the hero's locked micro-proof ("Your team learns nothing new — it already lives in WhatsApp") — same promise, expanded. Sets up Pricing (next): once they know it's done-for-you, the natural next question is "what does it cost?" — answered with structure, not numbers. Light, tight, business-credible — AIOS register.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` background, `--elyst-emerald` connector + node markers, `--fg` heading + reframe, `--fg-2` step copy + reassurance, `--fg-3` add-on line. Nohemi 700 heading, DM Sans everything else. Light only (the page's one dark section is aios-problem). Subtle one-pass scroll reveal — easing deferred to emil-design-eng.
