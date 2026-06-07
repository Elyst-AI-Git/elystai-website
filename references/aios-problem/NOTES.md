# AIOS Problem — NOTES.md

## What this section is
The "before." It comes straight after the hero's promise, when the founder is still skeptical that AIOS understands their world. Its only move is to describe their daily chaos so accurately they feel *read*. It sells nothing — it earns the right to pitch.

## Job it must do
Make the visitor silently nod "yes, that's exactly my problem," so everything after it lands as relief, not as a sales pitch. Name the EXACT three pains AIOS fixes — no others.

---

## The three pains (the only three — do not add more)
1. **Knowledge trapped in a few heads.** Everything waits on the one or two people who "know how it works."
2. **Documents made by hand.** Offer letters, invoices, certificates — built manually, slowly, inconsistently.
3. **No plan each morning.** Nobody knows what to do without being chased; the day starts in a scramble.

Do NOT list problems AIOS doesn't solve. Three, tightly.

---

## Layout (structure) — direction B: "chaos artifacts", rendered DARK

**This is the design system's ONE allowed dark contrast section.** The whole page is light by default; this section deliberately drops into dark so the chaos reads as *weight*, then the page snaps back to light for the relief that follows. This is committed (not deferred) — see the dark-section note below.

A three-part layout where each pain is shown as a small, restrained **artifact of the mess** — not an icon, not a cartoon. Think desaturated fragments of the founder's real day, arranged with deliberate, premium restraint, glowing faintly on a dark surface. The discipline note below is critical: this must read as *quiet overwhelm*, not a busy collage.

Suggested arrangement:
- Section eyebrow + a short heading line up top (left-aligned or centred — Claude Code's call against the chosen mood ref).
- Three blocks, one per pain. Each block = a muted artifact visual + a one-line pain statement beneath it.
- Desktop: three across (or a staggered/offset row so it feels slightly unsettled, not gridded-perfect). Mobile: stack vertically.

Artifact ideas per pain (pick ONE treatment and apply consistently across all three — do not mix metaphors):
1. Knowledge in heads → a cluster of unanswered/forwarded message fragments, the same question pinging multiple people ("Who has the…?" "Ask Rahul" "He's on leave").
2. Documents by hand → a small pile of slightly misaligned document thumbnails, each subtly inconsistent (different layouts/fonts), one half-finished.
3. No morning plan → an empty/uncertain start-of-day surface — a blank task list, an unstarted checklist, scattered notes with no order.

**Mood = dark, heavy, a touch uncomfortable.** This is the heaviest section on the page by design — the dark-to-light snap makes the bright emerald "after" sections hit harder. The mood does half the storytelling.

Background: `--surface-dark` (#0E211A), with `--surface-dark-2` for any raised artifact panels. Text uses `--fg-on-dark` (headings) and `--fg-muted-dark` (secondary). Artifacts are desaturated and low-glow — muted, not neon. **No bright emerald/green accent here** — save all emerald for the relief that follows. The darkness itself is the device; resist lighting it up.

Transition: the preceding section (hero) and the following section (how-it-works) are both light, so this dark band sits between two light sections. Give it a clean edge in/out — no gradient bleed that muddies the snap. The contrast IS the point.

---

## CRITICAL DISCIPLINE NOTE
"Chaos artifacts" must stay premium. The failure mode is stock-illustration clutter or a noisy collage. Keep it: few elements, lots of muted negative space, one consistent metaphor across all three blocks, desaturated palette only. The feeling is *quiet overwhelm*, not a cluttered cartoon. If a treatment starts looking busy or playful, strip it back toward direction A (flat muted blocks).

---

## Content
(Copy is INTENT + example strings for Claude Code to finalise — not locked.)

**Eyebrow chip** (`.eyebrow` + `.chip`, muted here — emerald chip is fine as the chip is small text, but keep the section otherwise emerald-free):
Intent: "The daily reality" / "Sound familiar?" — Claude Code finalises.

**Heading** (Nohemi 700, `--text-h2`, `--fg`):
Intent: name the chaos without blame — the visitor should feel understood, not criticised. Example intent: "Your team isn't slow. Everything just waits on a few people."

**Three pain lines** (DM Sans 500, `--fg-2`, one under each artifact):
- Pain 1 intent: knowledge lives in a few heads and everything waits on them.
- Pain 2 intent: documents are made by hand — slow, and never quite consistent.
- Pain 3 intent: each morning starts without a plan; nobody knows what to do until they're chased.
Keep each under ~12 words. State the pain plainly; do not hint at the solution yet (the next section does that).

**No CTA.** Let it land. A CTA here breaks the "I feel understood" moment.

---

## Reference images
No `mood.png` supplied yet. When you find one, drop it here and I'll annotate take/ignore.

Where to look (HOW_TO_BUILD §3 + BLUEPRINT §11):
- **Mood:** Land-book / Godly / saaslandingpage.com — search for "problem section", "before/after", muted/desaturated feature sections. Look for restrained, premium "here's the mess" treatments, NOT busy illustration packs.
- **Structure (code):** shadcn / HyperUI feature-block or bento layouts as the skeleton; drop the chosen one in as `option-A.txt`. The artifacts themselves will likely be custom (mocked message fragments / document thumbnails), so the code ref only governs the block layout.

One structure + one mood MAX.

---

## Dark-section decision (COMMITTED)
This section IS the design system's one allowed dark contrast section. Decision is locked. Consequence to hold across the rest of the page: **no other AIOS section may go dark** — proof, CTA, and everything else stay light. If a later section wants a dark moment, it must steal it from here, not add a second one. One dark band on the whole page, and it lives at "the problem."

---

## Coherence check
Belongs after `aios-hero`: the hero promises relief, this names the pain that relief addresses. The three pains map 1:1 to the three benefit phrases in `home-aios-teaser` ("knowledge trapped → instant answers," etc.) and will map again to How-it-works and Capabilities — keep the same three, same order, same plain words across the page so the spine is legible. Tonally this is the page's deliberate low point; everything emerald-and-bright after it is the recovery.

---

## Tokens reminder
Colour, type, spacing from DESIGN.md only. **This is the one dark section:** `--surface-dark` background, `--surface-dark-2` raised panels, `--surface-dark-hover` for any hover, `--fg-on-dark` headings, `--fg-muted-dark` secondary text and desaturated artifacts. **No bright `--elyst-emerald` / `--elyst-green` accent here** (emerald is withheld on purpose; the darkness carries the section). Ensure sufficient contrast on dark per DESIGN.md §6 accessibility. Nohemi 700 heading, DM Sans everything else.
