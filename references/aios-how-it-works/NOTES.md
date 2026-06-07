# AIOS How It Works — NOTES.md

## What this section is
The mechanic, shown concretely. It comes right after the dark "problem" section, when the founder is still half-thinking "isn't this just ChatGPT in a group chat?" This section shows exactly how AIOS works in three steps and kills the chatbot doubt.

## Job it must do
Make the visitor "get" how AIOS works in ~10 seconds AND understand why it is NOT ChatGPT — because it knows their business and acts inside it. That differentiator is what justifies paying.

---

## The three steps (the spine — keep these three, this order)
1. **Your team messages AIOS.** In plain language, in WhatsApp/Telegram, like messaging a colleague.
2. **AIOS understands using your business.** It reads your company's own documents, data, and tools to know what's being asked.
3. **It answers or acts.** It returns the answer, or produces the document/task automatically — and the right person sees the right thing.

The contrast line (must appear, plain and confident):
Intent: "A generic chatbot doesn't know your business and can't act inside it. AIOS does both." Claude Code finalises wording — keep it one line, no naming/attacking competitors beyond the category "generic chatbot".

---

## Layout (structure) — direction A: interactive 3-step click-through

The BLUEPRINT's flagged high-value interactive moment. The user controls the reveal.

- A row (or tab strip) of three step markers: **1 · Message → 2 · Understands → 3 · Acts** with short labels.
- One large display panel beside/below the markers. Clicking a step swaps the panel to show that stage:
  - Step 1 panel: the incoming team message (small chat bubble).
  - Step 2 panel: a visual of AIOS drawing on the company's own sources — e.g. document/file tiles or a Drive/Workspace connection lighting up as "context."
  - Step 3 panel: the outcome — the answer returned AND/OR the finished document/task produced.
- Default state: step 1 active. Clicking 2 then 3 walks the mechanic. Optional gentle auto-advance on first scroll-into-view (one pass, then hand control to the user) — but manual click is the primary interaction.
- Active step marker uses `--elyst-emerald`; inactive markers muted (`--fg-3`). A thin progress connector between markers fills emerald as you advance.

**Build discipline (BLUEPRINT hard limit):** the interaction must never delay comprehension. Each panel must read instantly even if the user never clicks. On mobile, degrade gracefully: either tap-to-advance or simply stack the three steps vertically as static panels (1 → 2 → 3 top to bottom). Snappy transitions (AIOS register), ~0.3s, no bounce.

Background: `--bg` (light). This section is the bright relief immediately after the dark problem band — the dark-to-light snap matters, so keep this clean and light.

---

## Content
(Copy is INTENT + example strings — Claude Code finalises. Not locked.)

**Eyebrow chip** (`.eyebrow` + `.chip`): "How AIOS works"

**Heading** (Nohemi 700, `--text-h2`): intent — one message, and the work is done. Example intent: "One message. It knows what to do." Plain, no jargon.

**Step labels + one-line each** (DM Sans 500, `--fg-2`):
- Step 1: "Message it like a colleague." (sub: in the WhatsApp/Telegram your team already uses)
- Step 2: "It understands your business." (sub: reads your own documents, data, and tools)
- Step 3: "It answers, or does the work." (sub: the answer or the finished document — to the right person)

**Contrast line** (DM Sans 500 or a small highlighted callout, `--fg`):
Intent as above — AIOS knows your business and acts inside it; a generic chatbot does neither.

**No CTA.** Flows into Capabilities.

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.

Where to look (BLUEPRINT §11):
- **Structure (code):** shadcn / Cult UI tabs or stepper components as the base; drop the chosen one in as `option-A.txt`. The step panels are likely custom.
- **Mood:** Linear / Vercel "how it works" or feature-walkthrough sections — interactive step reveals, crisp transitions, one accent. **Take:** the click-to-advance clarity, the single emerald accent on the active step, the calm light layout. **Ignore:** dark backgrounds, multi-accent palettes, anything busy.

One structure + one mood MAX.

---

## Coherence check
Belongs after `aios-problem`: the dark section names the pain, this light section shows the fix — the snap from dark to bright is intentional. The three steps echo the page spine (knowledge / documents / mornings appear as the *kinds* of things step 3 produces). It sets up Capabilities (next), which proves the breadth behind this single mechanic. Same chip→heading rhythm as the rest of the page.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` background (light), `--fg` heading + contrast line, `--fg-2` step copy, `--fg-3` inactive markers, `--elyst-emerald` active step + progress fill. `--radius-card` on the display panel. Snappy motion (AIOS register), Framer Motion, ~0.3s, no bounce — fine-tuning deferred to emil-design-eng. Nohemi 700 heading, DM Sans everything else.
