# Claude Code — Start Here

Paste this as your first message when you open Claude Code in this folder.

---

You are building the Elyst AI marketing website. This folder contains everything you need. Do not write a single line of code until you have read all files listed below in order.

## Read in this exact order

1. `START_HERE.md` — understand the two-room workflow and your role as the building room.
2. `CLAUDE.md` — the locked stack, the governing rule, and how you must behave while coding.
3. `DESIGN.md` — the brand constitution. Colour, type, spacing. This is law. You never change it.
4. `BLUEPRINT.md` — every page, every section, content and structure. Read the DESIGN OVERRIDE box at the very top first — it cancels all older dark/violet language in the doc.
5. `HOW_TO_BUILD.md` — tools to install, the references model, the build/verify loop, and the build order.
6. `references/README.md` — how the references folder works, how to consume NOTES.md + image files together, the hierarchy that resolves conflicts, and the full table of section folders that currently exist.

Once you have read all six, confirm back in 3 sentences: what we're building, the build order you will follow, and how you will consume a section's references folder before building it.

## How to consume a section's references folder

Before building any section:
1. Read `references/<section>/NOTES.md` fully — it contains the layout spec, content spec, and explicit take/ignore notes for every image.
2. Use the **Read tool** on every `.png` file in that folder — look at each image. Do not skip this step.
3. NOTES.md always overrides the images. DESIGN.md always overrides both. Never copy colours or fonts from a reference image — re-skin everything to DESIGN.md tokens.

## Setup first

1. Install Playwright MCP: `claude mcp add playwright npx @playwright/mcp@latest`
2. If the Next.js project doesn't exist yet, scaffold it following HOW_TO_BUILD.md §1.
3. Configure Tailwind tokens from DESIGN.md before writing any component.

## The build loop (follow this for every section, no exceptions)

1. Read `references/<section>/NOTES.md` + all images in that folder
2. Build the section — tokens from DESIGN.md, layout from NOTES.md, mood from images
3. Screenshot at **1440px** (desktop) and **390px** (mobile) with Playwright
4. Check screenshot against: the reference images, DESIGN.md tokens, the governing rule (light bg, emerald only, tone-only arm split, routes the right visitor fast)
5. Polish motion and interactions with the `emil-design-eng` skill (`skills/emil-design-eng/SKILL.md`)
6. Fix → iterate until the screenshot passes
7. Commit — one commit per verified section, message format: `section: <name>`

**Do not batch sections. Do not skip the screenshot step. Do not invent colours or fonts.**

## Build order

Follow this exactly — do not jump ahead:

1. **Global shell** — Tailwind token config → Nav → Footer
2. **AIOS page** — highest priority, drives revenue (10 sections)
3. **Home page** — the router (6 sections, references fully loaded)
4. **Accelerator overview** → Circle → AI Junior → AI Yathra → Flagship Course
5. **Supporting pages** — About, Contact, Legal, Thank-you, 404
6. **Blog** — index template + post template + first posts
7. **SEO/AEO layer** — schema, sitemap, robots.txt, llms.txt, OG images

Start with step 1. Confirm you understand before proceeding.
