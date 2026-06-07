# AIOS Use Cases — NOTES.md

## What this section is
The "this is for a business like mine" section. After Capabilities proves AIOS is a system, this makes that system specific to the visitor's industry — the exact pain in their world and the exact AIOS flow that fixes it.

## Job it must do
Self-recognition. The visitor sees their own industry, their own pain, and a concrete flow — and thinks "they built this for me." That recognition is what makes the booking CTA land.

---

## Industries (four, shown with equal weight)
1. **Real estate**
2. **Staffing agencies**
3. **Education businesses**
4. **Logistics SMEs**

Decision: **no single lead industry — present all four equally.** (BLUEPRINT suggested leading with real estate for the Dubai pilot proof; Nihal chose equal weight. Keep the real-estate tab ready to fold in the Dubai outcome as a mini case study the moment it's live — that tab can gain a small proof badge later without restructuring.)

Default active tab on load: real estate (first in reading order) — neutral choice, not a "lead." Order can be alphabetical or as listed.

Each industry needs exactly two things:
- **The specific pain** (in that industry's language).
- **The specific AIOS flow** that fixes it (concrete, one short scenario + outcome).

Directional content per industry (Claude Code finalises wording; confirm specifics with Nihal before launch):
- Real estate → chasing listing details/availability + generating client documents (agreements, brochures) by hand → AIOS answers from the property data and generates the document on request.
- Staffing → offer letters and candidate docs made manually, slowly, inconsistently → AIOS generates them from one message, consistently.
- Education → repeated parent/student queries + certificates/receipts by hand → AIOS answers from the institution's info and issues documents.
- Logistics → status/where-is-it questions + daily coordination chaos → AIOS answers from the ops data and pushes daily task briefings.

---

## Layout (structure) — direction A: tabbed industry switcher

- A horizontal tab strip: Real estate · Staffing · Education · Logistics. Active tab uses `--elyst-emerald`; inactive muted (`--fg-3`).
- One display panel below/beside. Clicking a tab swaps the panel to that industry's: pain line → AIOS flow → a per-industry mockup/screenshot.
- Panel = split: short copy (pain + flow) one side, industry mockup the other. Reuse the chat/document mockup language from the hero and capabilities (same product world).
- Snappy tab transition (~0.3s, AIOS register). Default: real-estate tab active.
- **Mobile + SEO note:** tabs hide content from crawlers if done as pure JS toggles. Render all four panels in the DOM (server-side) and show/hide with CSS/aria, OR make each industry an anchor-linked block on mobile. The text for all four industries must exist in the initial HTML (BLUEPRINT §12.5 — content must be server-rendered). On mobile, collapse tabs to a stacked accordion or stacked blocks rather than a cramped tab row.

Background: `--bg` (light). Emerald accent on active tab + flow highlights.

**Discipline note:** one pain + one flow + one mockup per industry. Do NOT turn each tab into a feature list — that's Capabilities' job. This section is about *specificity*, not breadth.

---

## Content
(Copy is INTENT — Claude Code finalises. Not locked.)

**Eyebrow chip**: "Built for your industry"
**Heading** (Nohemi 700, `--text-h2`): intent — AIOS shaped to how your industry actually works. Example intent: "Configured for how your industry runs."
**Per-tab copy**: pain line (DM Sans 500, `--fg-2`) + flow description (DM Sans 400, `--fg-2`) + a one-line outcome.

**CTA** (`.btn-primary`, contextual): "Book a call" — phrased contextually to the active industry where possible (e.g. "Talk to us about your agency"). Keep it to one CTA at the section's foot.

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.

Where to look (BLUEPRINT §11):
- **Structure (code):** shadcn / Cult UI tabs component; drop chosen one as `option-A.txt`.
- **Mood:** Stripe / Vercel industry- or use-case switchers — clean tabs, one accent, real product panel per tab. **Take:** the tab-to-panel clarity, the split copy+mockup panel, single accent. **Ignore:** dark themes, dense tabs, carousels.

One structure + one mood MAX.

---

## Coherence check
Belongs after `aios-capabilities`: capabilities = the system in general, use-cases = the system in *their* world. Each industry flow is built from the same modules just shown (document generation, knowledge Q&A, daily briefings) — keep that visible so it reads as "the same system, pointed at my industry." Same mockup world as hero/capabilities. Sets up Model & onboarding (next): now they want it, the next section shows how getting it works.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg` background, `--elyst-emerald` active tab + CTA + flow accents, `--fg` heading, `--fg-2` copy, `--fg-3` inactive tabs. `.card`/`--radius-card` on the panel/mockup. Nohemi 700 heading, DM Sans everything else. Light only (the page's one dark section is aios-problem). All four panels server-rendered for SEO.
