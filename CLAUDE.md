# CLAUDE.md — Elyst AI Website

This is the project brain for the Elyst AI marketing website. Read it first, every
session. It tells you what we're building, the rules you must follow, and where the
rest of the context lives.

---

## What we're building

The public marketing website for **Elyst AI**, a Kerala-based AI services company.
The site has **two arms** under one brand:

1. **AIOS** — "AI Operating System for SMEs." A configurable AI service Elyst deploys
   per client (not SaaS). The business-credible arm. Drives revenue. **Build first.**
2. **The Accelerator** — Elyst's learning/community side (Circle, AI Junior, AI Yathra,
   a flagship course). The warmer, human arm.

One shared brand, one shared emerald palette. The two arms differ in **tone only**
(see the governing rule below), never in colour system.

**The site's job:** route each visitor to the right arm fast, read as credible and
premium, and rank in both classic search and AI answer engines (AEO/GEO). Every page
is server-rendered (SSG/SSR) — no client-only pages.

---

## Tech stack (LOCKED — do not substitute)

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router)** + **TypeScript** |
| Styling | **Tailwind CSS** + **shadcn/ui** components |
| Motion | **Framer Motion** |
| Content/Blog | **MDX in-repo** (no CMS — a post is a file) |
| Hosting | **Vercel** |
| Forms | Accelerator CTAs → **Nas.io** deep-links · AIOS contact → **Supabase** |

**Why this stack:** one codebase for front + back; TypeScript catches errors across
component props and config; MDX-in-repo means new blog posts are just files (ideal for
AEO/GEO freshness); shadcn gives accessible, unstyled primitives we re-skin to our
tokens; Vercel is zero-config for Next.js with SSG/SSR by default. SSR/SSG is
**mandatory on every page** — AI answer engines and crawlers must see real HTML.

---

## The governing rule (read this twice)

**Light by default. Emerald only. Tone-only difference between the two arms.**

- **Background is light** (warm off-white) across the site. Dark sections are allowed
  **only occasionally**, as a deliberate contrast moment for design philosophy — never
  as the default for a page or hero.
- **One emerald palette** for the whole brand. There is **no violet**, no second accent
  family. (If you find "violet" or "Accelerator violet" in any older note, ignore it —
  `BLUEPRINT.md` has an override at the top that supersedes it.)
- The two arms are separated by **tone, not colour**: AIOS = precise, business-credible,
  tighter spacing, crisper shadows. Accelerator = warmer, softer shadows, rounder cards,
  more whitespace, more human imagery. Same tokens, different *feel*.

When any instruction conflicts with `DESIGN.md`, **`DESIGN.md` wins.**

---

## How to behave (coding discipline)

These reduce the usual LLM mistakes. Caution over speed; use judgement on trivial tasks.

**1. Think before coding.** State assumptions explicitly; if uncertain, ask. If multiple
interpretations exist, surface them — don't pick silently. If a simpler approach exists,
say so. If something is unclear, stop and name what's confusing.

**2. Simplicity first.** The minimum code that solves the problem. No speculative
features, no abstractions for single-use code, no unrequested "flexibility." If you
write 200 lines and it could be 50, rewrite it. Ask: "would a senior engineer call this
overcomplicated?" If yes, simplify.

**3. Surgical changes.** Touch only what the task needs. Don't "improve" adjacent code,
don't refactor what isn't broken, match existing style. Remove only the orphans *your*
change created; flag pre-existing dead code, don't delete it. Every changed line should
trace to the request.

**4. Goal-driven execution.** Turn each task into a verifiable goal and loop until it
passes. For a UI section the verification is the **Playwright screenshot** (desktop
1440px + mobile 390px) checked against the reference, the DESIGN.md tokens, and the
section's governing rule. Don't call a section done until its screenshot passes.

---

## The design authority hierarchy (prevents conflicting input)

Three design inputs operate on different layers and must not fight:

1. **`DESIGN.md`** = brand constitution (colour, type, spacing, radii, shadows).
   The source of truth. **Never overwritten.**
2. **emil-design-eng** (skill) = motion + micro-interaction only (easing, timing,
   press feel, reveals). Touches *feel*, never colour or layout.
3. **Impeccable** (plugin) = discovery interview + audit/polish. Refines and checks;
   never regenerates brand tokens.

When in doubt, **DESIGN.md wins.**

---

## Where the rest of the context lives

| File | What it is |
|---|---|
| `START_HERE.md` | One-page orientation — the reading order and the workflow. Read once. |
| `DESIGN.md` | The brand constitution — colour, type, spacing, components, anti-slop rules. |
| `BLUEPRINT.md` | The content + structure spec — every page, every section, what goes where. Note the DESIGN OVERRIDE at the very top. |
| `HOW_TO_BUILD.md` | The mechanics — tools to install, references model, build/verify loop, blog task. |
| `references/<section>/` | Per-section visual direction: code refs (structure) + screenshots (mood) + NOTES.md (the text brief). |
| `skills/emil-design-eng/` | The motion/polish skill. |

**Build order:** global shell → AIOS pages → Home (router) → Accelerator pages →
supporting pages → blog → SEO/AEO layer. Section by section, never whole pages.
Mobile-first. One commit per verified section.
