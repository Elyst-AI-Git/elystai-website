# Accelerator Paths — NOTES.md
(Replaces the old "ladder" concept. There is no four-program ladder anymore — see accel-hero positioning.)

## What this section is
The page's core section. It presents the ONE forward offering — the **Flagship GenAI program for professionals** (the anchor) — plus the **community (Circle)** that backs the learning journey. Not a menu of four; a primary + a backer.

## Job it must do
Give the professional a TASTE of the coming Flagship (the anchor/destination) and move them into the community (the only live action). Make the relationship legible: Flagship = the deep program (coming late June, no details yet); Circle = the always-on community you can join today.

## Positioning constraints (locked)
- Flagship is the MAIN narrative focus but presented with RESTRAINT — no bragging, no syllabus, no price, no over-promising. Launching late June, specifics still forming. **NO waitlist, NO capture, NO CTA** (Nihal's call) — it is a teaser only. Details will live on a future program page.
- Circle community is the PRIMARY ACTION on the page (because there's no waitlist, it's the only real conversion). Warmly framed as the backer, but it carries the CTA → Nas.io.
- AI Junior / AI Yathra do NOT appear here (they're proof only, in accel-proof).

---

## Layout (structure) — two-tier: one anchor offering + one supporting card

**Tier 1 — Flagship (large, the narrative anchor — NO CTA):**
- A generous feature block, the visual hero of the section. Rounded (`--radius-xl`), soft diffuse shadow, a livelier within-emerald treatment (tint fill or soft gradient panel — this is the "bold but in-system" moment).
- Status marker: "Coming soon · launching late June 2026" chip — honest, prominent. This sets expectation and IS the call ("watch this space"), in place of a button.
- Restrained, outcome-led TASTE: 2–3 broad directional lines about what a professional will get out of it (e.g. use GenAI confidently in real work; build, don't just watch) — explicitly NOT a curriculum, NOT specifics. Make clear "full details coming on its own page."
- **NO CTA, NO form, NO waitlist.** It is a teaser. Do not add a button.

**Tier 2 — The Circle (the live action — carries the page's PRIMARY CTA):**
- A card/band beneath (or beside) the Flagship block. Warm, inviting — it's the thing they can actually do today.
- Copy: the community that keeps you sharp right now — curated AI updates, peers, weekly value; lives in WhatsApp. And: it's where you'll hear first when the Flagship opens.
- Primary CTA: "Join the community →" → Nas.io Circle page. [Insert exact Nas.io URL.] This is the page's main conversion.

Desktop: Flagship dominant up top (full width or 2/3), Circle as a supporting card below or in the remaining 1/3. Mobile: stack, Flagship first, Circle second.

Background: `--bg` or a soft `--surface-muted`/tint to separate from the hero. Accelerator tone throughout — rounder, softer, airier than any AIOS section.

**Discipline note:** the Flagship isn't fully real yet, so the design must not write a cheque the product can't cash. Restraint reads as confidence. Big claims on a coming-soon program read as hype — avoid.

---

## Content
(Copy is INTENT — Claude Code finalises. Not locked. Flagship specifics pending from Nihal.)

**Section eyebrow**: "Where to start" / "The program + the community"
**Section heading** (Nohemi 700, `--text-h2`): intent — the deep program for professionals, and the community around it.

**Flagship block (teaser, no CTA):**
- Name/label: the Flagship GenAI program for professionals (final name TBD).
- Status chip: "Coming soon · launching late June 2026".
- Taste (directional, not a syllabus): use AI confidently in your actual work; go from occasional use to working with it daily; stay competitive as your field changes; build, don't just watch. [Nihal to confirm the broad themes; keep vague — full details on the future program page.]
- NO CTA.

**Circle block (primary action):**
- Intent: the community that keeps you sharp now — curated AI updates, peers, weekly value, in WhatsApp; first to know when the Flagship opens. Active today.
- CTA: "Join the community →" → Nas.io. [Insert URL.]

---

## Reference images
No `mood.png` yet. When you add one, I'll annotate take/ignore.

Where to look (BLUEPRINT §11):
- **Mood:** Maven / On Deck / Reforge upcoming-cohort or waitlist pages (premium professional program, honest "enrolment opens" framing) + warm community blocks. **Take:** the confident-but-honest "coming" treatment, outcome-led copy, the program-as-hero + community-as-support hierarchy. **Ignore:** non-emerald colour, dark themes, fake urgency/countdowns on a program with no date.
- **Structure (code):** shadcn / Cult UI feature-block + secondary card; drop chosen one as `option-A.txt`.

One structure + one mood MAX.

---

## Coherence check
Belongs after accel-hero: the hero states the motive and points to the waitlist; this section shows the actual offering (Flagship) and its backer (Circle). Sets up accel-why (why it's worth it) and accel-proof (that Elyst delivers — Junior/Yathra/community). Warmer, rounder, more colourful than any AIOS section; same emerald palette. Honesty about the Flagship's stage mirrors the AIOS page's honest "thin proof" discipline — the brand doesn't oversell anywhere.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. `--bg`/`--surface-muted` background, `--green-tint-15`/`--emerald-tint-10` for the Flagship panel, `.card-tint` for the Circle block, `--elyst-green`/`--green-mid` accents + CTA, `--elyst-emerald` text accents, `--fg` headings, `--fg-2` body. `--radius-xl`, soft diffuse shadows (Accelerator tone). Nohemi 700 headings, DM Sans else. Light only — no dark, no violet, no new colour.
