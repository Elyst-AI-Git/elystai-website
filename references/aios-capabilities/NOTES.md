# AIOS Capabilities — NOTES.md

## What this section is
The breadth proof. After How-it-works shows the single mechanic, this section shows the modules behind it, so AIOS reads as a real system covering the founder's operations — not a one-trick chatbot.

## Job it must do
Make the visitor think "this covers my whole operation" — breadth WITHOUT overwhelm. Prove it's a system. Each module = a one-line *outcome* (not a feature name) + a real screenshot.

---

## The modules (outcome-led — name the result, not the feature)
1. **Knowledge Base Q&A** — instant answers from your own documents, for the whole team.
2. **Document Generation** — offer letters, invoices, certificates produced as PDFs from one message.
3. **Daily Task Briefings & workflow automation** — everyone knows what to do each morning, automatically.
4. **Integrations** — works with Google Workspace, Canva, and the SME tools you already use.
5. **Role-based access control** — the right person sees the right thing; sensitive data stays restricted.
6. **Open card: "…and capabilities configured to your workflows."** — signals it's tailored, not a fixed feature list. This card is the closer, visually distinct (tint/outline), no screenshot — it's an invitation.

Six items total. If trimming for layout, keep 1–3 + the open card as non-negotiable (they map to the page spine); 4 and 5 are the "it's a real system" reassurance and can compress.

---

## Layout (structure) — direction C: bento grid

Asymmetric bento — varied card sizes so the page reads as a system at a glance and the hero modules get more room.

- Suggested weighting: make **Document Generation** and **Knowledge Base Q&A** the larger bento tiles (they're the strongest, most concrete proof and map to the hero + problem spine). Daily Briefings, Integrations, Role-based access are smaller tiles. The open "configured to your workflows" card is a distinct tinted tile (use `.card-tint`).
- Each product tile (`.card`, white, `--radius-card`, `--shadow-card`): a one-line outcome heading + a short sub-line + a **real product screenshot** (no stock). Screenshot can bleed to the tile edge for the larger tiles.
- Reveal on scroll (staggered fade/lift, subtle). Hover: lift -4px, `--shadow-card-hover` (AIOS register — crisp, not soft).
- Desktop: bento (e.g. a 4-col grid with the two hero tiles spanning 2 cols/2 rows). Mobile: collapse to a single column, hero tiles first, open card last. Don't force the asymmetry on mobile — stack cleanly.

Background: `--bg` (light). Emerald returns fully here as accent (this is firmly in the "after"/relief territory).

**Discipline note:** bento invites clutter. Keep each tile to ONE outcome line + one sub-line + one screenshot. No feature bullet lists inside tiles. If a tile needs explaining in more than two lines, it's two tiles or it's wrong.

---

## Content
(Copy is INTENT + example strings — Claude Code finalises. Not locked.)

**Eyebrow chip** (`.eyebrow` + `.chip`): "What AIOS does" / "Capabilities"

**Heading** (Nohemi 700, `--text-h2`): intent — it's a system, not a single trick. Example intent: "Not one feature. A system that runs your operations."

**Per-tile copy** (heading DM Sans 700 `--fg`; sub-line DM Sans 400 `--fg-2`): use the outcome lines above as the intent for each tile heading; sub-line adds one concrete detail. Keep outcome-led — "instant answers from your own documents," not "Knowledge Base feature."

**Open card copy** (`.card-tint`): intent — "…and whatever else your workflows need. AIOS is configured to your business." Soft, inviting, the bridge to "this is built for me."

**No standalone CTA inside the grid** (the open card carries the "tailored" message). The page's next sections (use-cases, model, pricing) carry conversion.

---

## Screenshots note (for Claude Code)
Every product tile should hold a REAL AIOS screenshot — no stock, no generic UI. Until real screenshots are supplied, build faithful mockups with realistic sample data (consistent with the hero's document artifact and the how-it-works panels — same fake company world, e.g. "Al Noor Trading"). Mark mockups clearly in code comments so they're swapped for real captures before launch.

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.

Where to look (BLUEPRINT §11):
- **Structure (code):** shadcn / Cult UI / HyperUI bento-grid blocks; drop the chosen one in as `option-A.txt`.
- **Mood:** Linear / Vercel / Better Stack capability or feature-grid sections with real product screenshots. **Take:** the asymmetric bento rhythm, real-screenshot-in-card treatment, one accent, generous gutters. **Ignore:** dark backgrounds, neon gradients, dense feature-bullet cards.

One structure + one mood MAX.

---

## Coherence check
Belongs after `aios-how-it-works`: that section shows the one mechanic, this proves the breadth behind it. The larger bento tiles (Document Generation, Knowledge Q&A, Daily Briefings) are the same three pains from the dark problem section, now answered — keep the wording echoing the spine so the visitor feels the loop close. Same card primitives and hover behaviour as the Home cards; tighter/crisper than the Accelerator. Sets up Use-cases (next), which makes this breadth specific to the visitor's industry.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` background, `.card` (white, `--radius-card`, `--shadow-card`) tiles, `.card-tint` for the open card, `--elyst-emerald` accents, `--fg` tile headings, `--fg-2` sub-lines. Hover lift -4px / `--shadow-card-hover`. Nohemi 700 section heading, DM Sans everything else. Light by default — no dark here (the page's one dark section is aios-problem).
