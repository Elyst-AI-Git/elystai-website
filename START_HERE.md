# START HERE — Elyst AI Website Build

This folder is a complete, self-contained brief for building the Elyst AI website.
It is built in **two rooms**:

- **Cowork (the planning room)** — where Nihal + Cowork define what each section looks
  like, write the text brief for each one, and gather references. The output of this
  room is the filled-in `references/` folder.
- **Claude Code (the building room)** — where the site actually gets coded, section by
  section, reading everything in this folder.

You're in whichever room you opened this in. Read the right path below.

---

## If you are CLAUDE CODE (building the site)

Read in this order, then start building:

1. **`CLAUDE.md`** — what we're building, the locked stack, the governing rule, how to behave.
2. **`DESIGN.md`** — the brand constitution. Colour, type, spacing. This is law.
3. **`BLUEPRINT.md`** — the content + structure of every page and section. (Read the
   DESIGN OVERRIDE box at the top first — it resolves all older dark/violet language.)
4. **`HOW_TO_BUILD.md`** — tools to install (Playwright MCP first), the references model,
   the build/verify loop, build order, and the blog task (last).
5. **`references/README.md`** — read this before touching any section folder. It explains
   the folder convention, how to consume NOTES.md + image files together, the hierarchy
   that resolves conflicts (DESIGN.md > NOTES.md > images), and a table of every section
   folder that currently exists.
6. **`references/<section>/`** — before building any section, open its folder and:
   - Read `NOTES.md` fully (layout spec, content spec, take/ignore notes per image)
   - Use the Read tool on every `.png` file in the folder — the images are visual references
     and must be seen, not just mentioned. NOTES.md tells you what to take and ignore from each.
   - If a section has no folder yet, build from DESIGN.md + BLUEPRINT.md, lean minimal-premium.

Then follow the build loop in HOW_TO_BUILD.md §4: build a section → screenshot it at
1440px and 390px with Playwright → check it against its reference + DESIGN.md → polish
motion with emil-design-eng → commit. One section at a time.

---

## If you are COWORK (planning with Nihal)

Your job is to turn the blueprint into a **section-by-section visual brief** that Claude
Code can build from. For each section in BLUEPRINT.md, working with Nihal:

1. Confirm what that section is and what it must achieve (route, explain, convert).
2. Nihal finds references (code from shadcn / HyperUI / Cult UI; mood screenshots from
   Land-book / Godly / Mobbin — see HOW_TO_BUILD.md §3 for sources).
3. Save them into `references/<section>/` as `option-A.txt` (code) and `mood.png` (image).
4. Write the text brief into `references/<section>/NOTES.md` — what to take, what to
   ignore, the intent. **This is the key handoff:** the NOTES.md carries Cowork's words,
   the screenshot carries Nihal's eye. Together they tell Claude Code exactly what to build.

Discipline: **one structure + one mood per section, max.** Don't overwrite DESIGN.md.
Confusion comes from volume within a section, not from sections differing.

---

## The whole thing in one picture

```
BLUEPRINT.md      = WHAT goes on each page (content + structure)
DESIGN.md         = HOW it looks (brand constitution — never changes)
references/       = WHAT each section looks like (Nihal's eye + Cowork's brief, per section)
HOW_TO_BUILD.md   = HOW to build it (tools, loop, order)
CLAUDE.md         = the rules Claude Code obeys while doing it
skills/           = the polish layer (motion craft)
```

Cowork fills `references/`. Claude Code reads everything and builds. DESIGN.md is the
constitution the whole thing answers to.
