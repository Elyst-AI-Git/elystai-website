# Elyst AI website master guide

**Status:** definitive design, content, UX, and implementation reference
**Prepared:** 29 August 2026
**Canonical public domain:** `https://elystai.com`
**Primary routes:** `/`, `/services`, `/training`, `/about`
**Supersedes for website decisions:** `home-page-reference-brief.md`, `services-page-reference-brief.md`, `training-page-reference-brief.md`, `about-page-reference-brief.md`, `work-page-reference-brief.md`, and `website-page-presentation-architecture-brief.md`

This is the only report that should be needed before redesigning or rebuilding the website. The earlier briefs remain as research records, but decisions should come from this document.

---

## 1. The decision

Elyst AI is an implementation company first and a corporate-training company second.

The primary commercial story is:

> Elyst finds one costly workflow, decides whether AI should be used, builds the smallest useful system, keeps human approval where it matters, and hands the system over so the client can run it.

The secondary story is:

> Elyst designs practical AI training around a team's roles, approved tools, and real work, then gives the sponsor a clear next step.

The website must not present Elyst as:

- an automation catalogue;
- an “AI-native transformation” agency;
- a training or course company with implementation attached;
- a generic software-development studio;
- a large GCC agency or a company with local GCC offices;
- a company with implementation outcomes that have not yet been proved.

### The page jobs

| Page | Primary visitor | The page's single job | Impression on exit | Primary action |
|---|---|---|---|---|
| Home | GCC SME founder, owner, COO, operations or functional leader | Make the visitor recognise one costly workflow and understand Elyst's model | “They understand the operational problem and can start small without losing control.” | Book an audit call |
| Services | Decision-maker with a named workflow problem | Make the engagement, outputs, boundaries, human gates, and ownership concrete | “I know what happens, what I receive, what remains human, and where scope ends.” | Bring one workflow |
| Training | HR/L&D sponsor, people leader, department head, or institutional buyer | Make the session safe to sponsor, relevant to the room, and useful after the room | “This will use our work, respect our constraints, and leave something usable.” | Plan a team session |
| About | A sceptical buyer validating the small team | Turn a two-person company into an accountability advantage | “The people shown here will do the work and stay responsible through handover.” | Meet the team, then book an audit call |
| Work, later | Evidence-seeking buyer | Let a buyer inspect a real workflow, evidence, human boundary, and handover | “I can see exactly what changed and what the case does not prove.” | Discuss a similar workflow |

### Recommended site architecture

`Home → Services → Audit booking` is the primary path.
`Home or Nav → Training → Training booking` is the secondary path.
`Home or Nav → About → Services or Audit booking` is the trust path.

Recommended navigation order:

`Services · Training · About · Book an audit call`

Do not add Work to the main navigation until at least one permissioned implementation case exists. Do not restore AIOS, Accelerator, Circle, course, or closed-program links to the primary navigation.

---

## 2. What the current sites reveal

The live public site and the local working rebuild are materially different. Neither should be adopted wholesale.

### Keep from the live public site

- The visual confidence: large type, emerald/dark contrast, tailored diagrams, founder portraits, and less reliance on generic cards.
- The live Services process interaction and fit comparison.
- The live Training page's role/tools/work framing, session sequence, outcome cards, programme history, and evidence rhythm.
- The live About page's full-width founder strips and real photographs.
- The distinctive dither identity and dark starfield footer.

### Keep from the local working rebuild

- The clearer implementation-first language.
- The honest Audit → Build → Handover structure.
- The fit boundaries, human review, process-fix option, phased pricing language, documentation, and ownership.
- Cleaner semantic page structure, metadata, schema, redirects, and route separation.
- Preview-only placeholders instead of silently inventing missing proof.

### Do not carry forward

- “AI-native” as the central promise. It describes an identity, not a business outcome.
- The same dither hero on every page. It makes the pages feel interchangeable.
- Long pages made almost entirely of headings and bullet lists.
- The live footer typewriter that visibly ends on fragments such as `gen|` or `work f|`.
- Rotating words that repeat or leave partial copy in the accessibility tree.
- Unverified counters or inconsistent training totals.
- A Services CTA that links back to the same process section instead of starting a qualified conversation.
- The local About page without founder photographs and verified bios.
- Empty proof areas in production.

### Verified gaps before launch

1. The public Training page says `2,500+` people trained while About says `2,000+`. Reconcile this to one documented number.
2. `50+ companies`, `50+ sessions`, `10+ businesses`, and `4+ industries` must each have a clear definition and evidence before publication.
3. The Aug 20 corporate session is training proof, not implementation proof. Use the client name, logo, quote, photos, or exercises only with permission.
4. There is no permissioned implementation case study yet. Use a clearly labelled sample artefact or demonstration, never a simulated client result.
5. The claim that Nihal was “one of the first AI engineers in Kerala” needs evidence or removal.
6. Legal entity name, jurisdiction, company LinkedIn, delivery model, and operating facts need confirmation.
7. The local preview currently logs invalid negative SVG rectangle dimensions and a server/client theme hydration mismatch in the metallic CTA component. These are launch defects, not cosmetic warnings.

---

## 3. Content and evidence rules

Every section must do one job. The reader should move through this sequence:

`Orient me → Recognise my work → Show me the method → Show me the boundary → Prove what is true → Give me one next move`

### Evidence ladder

Use evidence in this order:

1. **Permissioned client evidence:** named result, quote, image, baseline, and measurement period.
2. **Permissioned anonymised evidence:** sector, workflow, baseline, intervention, result, and caveat.
3. **Verified Elyst artefact:** audit map, test set, runbook excerpt, session exercise, or follow-through plan.
4. **Clearly labelled demonstration:** synthetic data, representative workflow, no claimed client result.
5. **Principle or hypothesis:** explicitly labelled as Elyst's method or current market focus.

Never publish a provider's case-study result as an Elyst benchmark. Never turn training attendance into implementation evidence.

### Voice

- Plain, direct, and operational.
- Use the words a buyer recognises: enquiries, RFQs, approvals, follow-ups, reports, documents, handovers.
- Prefer “one workflow” to “AI transformation.”
- Prefer “human review” to “human in the loop.”
- Prefer “system your team owns” to “AI-native.”
- Prefer a concrete limitation to a broad reassurance.
- No hype, exclamation marks, unexplained acronyms, or invented precision.

### Draft system used below

Every visible section has three alternatives:

- **Draft A — plain:** clearest and safest.
- **Draft B — human:** recognises the visitor's experience.
- **Draft C — sharp:** more distinctive and commercially assertive.

One draft is marked **Recommended**. Use that draft as the implementation default unless Nihal or Shirin explicitly selects another. Visual directions can be mixed only when they preserve the section's stated job.

---

## 4. Visual and interaction system

### Core visual idea: the workflow trace

The site needs one ownable device beyond the dither: a thin emerald “workflow trace” that enters with messy inputs, changes state at labelled decisions, pauses at a human approval gate, and exits as an owned result.

This is the justified aesthetic risk. It is specific to Elyst's work, can carry real information, and replaces generic AI particles, gradients, and decorative cards.

Use the trace differently on each page:

- Home: a short animated before/after workflow.
- Services: a detailed state diagram with inputs, exceptions, approval, and ownership.
- Training: a session timeline from pre-work to follow-through.
- About: a responsibility handoff between Shirin, Nihal, and the client owner.
- Work, later: the actual measured workflow.

### Existing brand system to retain

| Role | Token | Use |
|---|---|---|
| Primary emerald | `#03624C` | Primary actions, workflow trace, strong labels |
| Light emerald | `#04855F` | Hover and supporting accents |
| Bright green | `#00DF82` | Small state changes, approval, selected items; never large text blocks |
| Ink | `#060D09` | Primary copy and deep surfaces |
| Soft background | approximately `#F5F8F6` | Main canvas |
| Muted surface | existing soft green-grey | Section separation |
| White | `#FFFFFF` | Artefact frames and high-contrast cards |

Do not introduce a second accent colour. Use red only for a genuine risk/error state inside a workflow example, not as decoration.

### Typography

- **Display:** Manrope, 700. Use for thesis headlines and section claims.
- **Body:** DM Sans. Use for paragraphs, FAQs, labels, and controls.
- **Utility/data:** system monospace only for workflow states, field names, timestamps, and labelled sample artefacts.
- Keep headlines tight; keep body line length between roughly 55 and 72 characters on desktop.
- Do not use all-caps except short eyebrows and state labels.

### Layout

- Desktop content width: `max-width: 1200px`; reading copy should rarely exceed `760px`.
- Use a 12-column desktop grid, 8-column tablet grid, and 4-column mobile grid.
- Preserve the current generous section rhythm, but reduce sections whose only content is a short list.
- Alternate layout logic, not only surface colour: full-bleed workflow, split narrative, artefact frame, portrait strip, and quiet text section.
- Mobile always places the claim before the visual. Interactive diagrams must become a vertical state list, not a horizontally squeezed canvas.

### Motion

- One orchestrated motion moment per page.
- Home: the workflow trace resolves once, then rests.
- Services: interaction is user-controlled through a workflow or phase selector.
- Training: steps reveal as a session timeline.
- About: portraits and responsibility labels can crossfade once; no continuous animation.
- Respect `prefers-reduced-motion`; the static state must communicate the same meaning.
- Remove the continuous footer typewriter. It creates unfinished phrases and contributes nothing to conversion.

### Component vocabulary

Build and reuse these components:

- `PageThesis`: eyebrow, H1, support, CTA, page-specific visual slot.
- `WorkflowTrace`: input → preparation → human gate → action → owner.
- `WorkflowSelector`: two to four example workflows with one visible at a time.
- `PhasePanel`: input, work, output, boundary.
- `ArtifactFrame`: clearly labels Live, Permissioned, Anonymised, or Demonstration.
- `EvidenceCard`: source, claim, measurement period, caveat.
- `FitGate`: works when / not yet when.
- `ResponsibilityMap`: Shirin / Nihal / client owner.
- `FounderStrip`: portrait, verified bio, delivery role, social links.
- `CtaBand`: one claim, one action, no decorative secondary button.
- `FaqAccordion`: semantic buttons, keyboard support, deep-linkable items.

Avoid a universal card component that makes every piece of information look equally important.

---

## 5. Shared shell

### G1 — Navigation

**Section job:** Show that implementation is primary while keeping Training and About one click away.
**Must convey:** Elyst has one clear commercial path.
**Recommended:** Draft A.

| Draft | Content | Visual and behaviour |
|---|---|---|
| **A — Recommended** | `Services · Training · About · Book an audit call` | Keep the dark floating bar. Logo left, links right, white audit CTA. On `/training`, switch only the CTA label and destination to `Plan a team session`; keep the link order unchanged. |
| B | `How we work · Training · About · Bring a workflow` | More human language, but “How we work” is less searchable and less explicit than Services. Use only if the whole site adopts conversational navigation. |
| C | `Services · Training · About` plus a persistent `Start with one workflow` button | Strongest differentiation, but the button is longer. Use only if it remains readable at 1024px without reducing hit area. |

Mobile menu requirements: full-screen dark panel, visible close button, no scroll behind it, current page indicated, and the route-specific CTA anchored at the bottom.

### G2 — Footer

**Section job:** End with legitimacy, contactability, and clean route access.
**Must convey:** Elyst is a real company in Kerala with clear ways to contact it.
**Recommended:** Draft A.

| Draft | Content | Visual and behaviour |
|---|---|---|
| **A — Recommended** | Company name, Kozhikode, domain email, phone, Services, Training, About, Privacy, Terms, LinkedIn, Instagram | Keep the starfield and giant wordmark. Remove the typewriter entirely. Add legal entity only after verification. Keep WhatsApp as contact, not “community.” |
| B | Add a small line: `Serving GCC teams remotely from India; on-site delivery by agreement.` | Useful once delivery logistics are confirmed. Place above the route links, not beside the giant wordmark. |
| C | Replace the giant wordmark with a compact “What to bring to the first call” checklist | More useful but loses a distinctive brand ending. Use only if conversion testing shows the wordmark causes excessive blank scroll without recall value. |

---

## 6. Home page

### Page thesis

The homepage is a diagnosis and orientation page. It should not explain every service. It should make the right buyer recognise one broken workflow, understand Elyst's method, see the human and ownership boundary, and take one action.

### Recommended order

`Hero → Problem mirror → Workflow selector → Audit/Build/Handover → Workflow replay → Principles and human gate → Evidence → Training bridge → FAQ → Audit CTA`

### H1 — Hero

**Section job:** State the commercial promise without “AI agency” language.
**Must convey:** One costly workflow can be fixed safely and owned by the client.
**Visitor takeaway:** “This is about changing work, not buying another tool.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Fix one costly workflow with AI. Leave with a system your team owns.**<br>We map the work, decide what is worth changing, build the smallest useful system, and train your team to run it.<br>CTA: `Book an audit call` · Secondary: `See how it works` | Text left. Dither mark right, but let a single workflow trace pass through it and resolve into `Owner: your team`. |
| B | **Your team has AI tools. The work still runs the old way.**<br>Elyst finds where time, leads, or decisions are being lost and fixes one workflow properly.<br>CTA: `Bring us one workflow` | Replace the static mark with three recognisable inputs—email, WhatsApp, spreadsheet—feeding a human approval gate. |
| C | **Stop buying AI. Start changing the work.**<br>Audit. Build. Handover. One bounded engagement, built around the tools your team already uses.<br>CTA: `Book an audit call` | Strong typography occupies 7 columns; a compact animated trace occupies 5. Use the bright green only on `changing the work`. |

### H2 — Problem mirror

**Section job:** Make the visitor feel accurately understood before explaining Elyst.
**Must convey:** The gap is between tool access and changed work.
**Visitor takeaway:** “They understand the operational symptoms.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **The AI tool is not the problem. The workflow is.**<br>The same information is still copied, the same follow-ups are still remembered manually, and the same report still takes hours. | A quiet before-state map with duplicated arrows, stalled queues, and one overloaded owner. |
| **B — Recommended** | **You bought the subscriptions. The work did not change.**<br>Someone is good with ChatGPT. A pilot worked once. But the process still depends on copying, chasing, searching, and remembering. | Preserve the live site's large sequential statements, but increase contrast and stop after four lines. Each line highlights one operational verb. |
| C | **If one person has to remember it, AI has not changed it.**<br>Look for the queue, handoff, document, approval, or follow-up that keeps returning. That is where useful work starts. | A scrolling list of real symptoms becomes a single selected workflow. No decorative animation after selection. |

### H3 — Workflow selector

**Section job:** Translate a broad offer into work the visitor recognises.
**Must convey:** Elyst can start across several verticals without pretending to sell fixed industry products.
**Visitor takeaway:** “One of these resembles our work.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Where does work keep leaking?**<br>`Lead intake and follow-up` · `RFQs and quote preparation` · `Appointments and recovery` · `Documents and reporting`<br>Support: These are examples, not packages. The audit starts with your workflow. | Four text selectors. Selecting one reveals input, human decision, output, and a one-line safe first version. |
| B | **Pick the task your team complains about most.**<br>The repeated task with a clear owner and visible cost is usually the right place to begin. | One question-led selector with `What comes in?`, `Where does it stall?`, and `Who approves it?` fields. No data submission; this is an explainer. |
| C | **Start with the queue, not the industry.**<br>Enquiries waiting. Quotes delayed. Documents unread. Follow-ups forgotten. | A queue visual where four items move from waiting to prepared, then stop at a human gate. |

### H4 — Audit, Build, Handover

**Section job:** Make the operating model legible in under 20 seconds.
**Must convey:** Elyst diagnoses before building and leaves ownership behind.
**Visitor takeaway:** “I understand the sequence and what I receive.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Audit. Build. Handover.**<br>Audit: workflow map and first opportunity. Build: tested working slice and exception paths. Handover: trained owner, runbook, access, and limits. | Three live-site-style cards, but each card shows one actual artefact rather than an abstract icon. |
| **B — Recommended** | **First we map it. Then we prove it. Then you own it.**<br>`Map → Test → Own` as the visible outcome line; `Audit → Build → Handover` as the service labels. | One continuous trace crosses three phases. Each phase expands on focus and exposes input, output, and stop condition. |
| C | **Three phases. No black box.**<br>We decide what is worth doing, test the smallest useful system, and leave your team able to run it. | Dark full-width section with three transparent panels. Human approval remains bright green throughout all phases. |

### H5 — Workflow replay

**Section job:** Show one complete system instead of describing “AI implementation.”
**Must convey:** Existing tools remain, AI prepares work, a human decides, and the result returns to the system of record.
**Visitor takeaway:** “I can picture this inside our business.”
**Recommended:** Draft C.

| Draft | Copy | Visual |
|---|---|---|
| A | **Example: a property enquiry becomes a ready next action.**<br>Portal or WhatsApp enquiry → structured summary → missing-information checklist → response draft → agent review → CRM or follow-up. | UAE real-estate example, clearly labelled `Representative workflow, not a client case`. |
| B | **Example: an RFQ becomes a complete brief before anyone writes the quote.**<br>Email/PDF → requirements → missing fields → priority → draft reply → sales review → next-action queue. | Trade/logistics example with document preview and missing-field states. Label synthetic data. |
| **C — Recommended** | **See one workflow move.**<br>Choose `Lead`, `RFQ`, or `Report`. Every example shows what enters, what AI prepares, where a person approves, what gets recorded, and who owns it. | Interactive three-tab workflow trace. Default to RFQ for GCC relevance; keep all figures illustrative and claim no result. |

### H6 — Principles and human gate

**Section job:** Turn Elyst's values into observable delivery behaviour.
**Must convey:** The system is bounded, reviewed, testable, secure, and owned.
**Visitor takeaway:** “They know where AI should stop.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Built around your business, not around a demo.**<br>Work before tools · Smallest useful build · Human approval · Clear exceptions · Documented handover | Retain the stronger live visual-card language, but make each graphic encode its rule. Five cards maximum. |
| B | **What stays human.**<br>AI can prepare, classify, retrieve, or draft. Your named owner approves high-impact actions, exceptions, and anything outside the agreed boundary. | One large workflow with the human gate as the visual centre; supporting rules orbit it. |
| C | **What we refuse to automate.**<br>Unowned workflows. Unsupported claims. High-risk decisions without review. Systems nobody can test or take over. | Four redacted “declined” briefs beside one green accepted workflow. Use red sparingly and accessibly. |

### H7 — Evidence

**Section job:** Establish trust without filling the proof gap with scale theatre.
**Must convey:** Elyst distinguishes delivered work, sample work, and future claims.
**Visitor takeaway:** “They are honest about what has and has not been proved.”
**Recommended:** Draft B until an implementation case exists.

| Draft | Copy | Visual |
|---|---|---|
| A | **Inspect the output, not the promise.**<br>Show a sanitised workflow map, a test set, and a one-page handover outline. Label each `Elyst demonstration` until produced for a client. | Three artefact frames with readable crops and downloadable accessible text equivalents. |
| **B — Recommended** | **What we can prove today.**<br>One permissioned corporate-training story, one clearly labelled sample implementation workflow, and an explicit note that implementation evidence will be added after verified delivery. | Evidence ledger with status labels: `Delivered`, `Demonstration`, `Not yet claimed`. No counter animation. |
| C | **Evidence before promises.**<br>We publish the baseline, intervention, measurement period, and limitation—or we do not publish the result. | A compact case template showing empty fields as methodology, not `[NEEDS]` production placeholders. |

### H8 — Training bridge

**Section job:** Offer training without splitting the homepage's main commercial path.
**Must convey:** Training is useful when capability or safe adoption must come before implementation.
**Visitor takeaway:** “There is a separate option if our immediate need is the team.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Need to train the team first?**<br>We design practical AI sessions around your roles, approved tools, and real work.<br>Link: `Explore Training` | A compact horizontal strip with one session artefact, visually quieter than the implementation sections. |
| B | **Not every team needs a build first.**<br>Sometimes the right next step is a shared method, safe-use rules, and practice on real work. | A fork in the workflow trace: `Implementation` stays primary; `Training` branches quietly. |
| C | **Build capability before you build the system.**<br>Role-specific workshops for teams that need to use AI consistently and safely. | One training-room photograph if permissioned; otherwise a role/tool/task storyboard. |

### H9 — FAQ

**Section job:** Remove practical objections immediately before conversion.
**Must convey:** Elyst is specific about data, time, ownership, price structure, and saying no.
**Recommended:** Draft A.

| Draft | Content | Visual |
|---|---|---|
| **A — Recommended** | What happens on the audit call? · Do you start with a tool? · What data is needed? · What if AI is not the answer? · Who owns the system? · How is work priced? | Two-column accordion on desktop, one column on mobile. First answer open by default only when arriving from a CTA anchor. |
| B | Organise questions under `Before`, `During`, and `After`. | Three short groups with no more than three questions each. Better when content expands. |
| C | Replace the FAQ with `Five things we decide before building`. | Stronger editorially, but weaker for search and specific objections. Use only if Services holds the full FAQ. |

### H10 — Final CTA

**Section job:** Convert recognition into one bounded next move.
**Must convey:** The first call is about a workflow, not a generic sales pitch.
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Start with one workflow.**<br>Bring the task that takes too long. We will tell you whether to fix the process, adopt a tool, or build.<br>CTA: `Book an audit call` | Preserve the hover inversion from the local CTA, but keep text readable without hover. |
| **B — Recommended** | **Bring the task your team keeps chasing.**<br>One call to understand where it breaks, who owns it, and whether AI should be involved.<br>CTA: `Book an audit call` | Full-width dark CTA band with the workflow trace entering unfinished and exiting as three decision options. |
| C | **One workflow. One owner. One honest next step.**<br>CTA: `Discuss a workflow` | Minimal type-only ending before the footer. Best if the preceding evidence section is visually rich. |

### Home metadata

- **Title:** `AI Workflow Audits and Implementation | Elyst AI`
- **Description:** `Elyst AI finds one costly workflow, builds the smallest useful AI system, and hands it over with training, documentation, and clear human review.`
- **Schema:** `Organization` + `WebSite`; visible facts only.

---

## 7. Services page

### Page thesis

Services is a workflow replay and ownership page. It must make a bounded engagement easier to understand than a generic consulting proposal.

### Recommended order

`Hero → Fit gate → Workflow examples → Audit → Build → Handover → Engagement boundaries → FAQ → Audit CTA`

### S1 — Hero

**Section job:** Define the engagement and owned outcome.
**Must convey:** Elyst covers diagnosis, build, and transfer; the client is not buying an endless dependency.
**Visitor takeaway:** “I know the start and end state.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **From a workflow problem to a system your team owns.**<br>We audit the work, build the smallest useful system, and hand it over with training, documentation, and clear limits.<br>CTA: `Book an audit call` | Replace the dither with the full workflow trace: messy input → preparation → human approval → recorded result → client owner. |
| B | **We build it so your team can run it without us.**<br>One engagement covering discovery, testing, deployment, and handover. | Lead with the handover outcome. Show a runbook, owner card, and access-transfer checklist as the hero visual. |
| C | **One workflow in. A working system out. No black box.**<br>Audit. Build. Handover. Scope and exclusions are visible before work starts. | Dark hero with a precise state diagram and a labelled “out of scope” boundary. |

### S2 — Fit gate

**Section job:** Qualify the buyer and increase trust by refusing poor-fit work.
**Must convey:** A useful project needs repetition, ownership, data, an outcome, and human review.
**Visitor takeaway:** “They will not force AI into a weak process.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Is this for you?**<br>Works when the workflow repeats, has an owner, has accessible data, and has a measurable consequence. Not yet when the request begins with a tool, has no owner, or expects unreviewed high-risk decisions. | Preserve the two equal columns. Use a neutral `Not yet` label instead of presenting every mismatch as rejection. |
| **B — Recommended** | **A good first project has five things.**<br>A repeated task · one owner · usable source material · a visible cost or delay · a person who can approve the change. | Five-item readiness check. Selecting an item reveals why it matters; a sixth line states the human-review rule. |
| C | **Before you book, read this.**<br>If nobody owns the workflow or nobody can describe a useful outcome, do not automate it yet. | Three “do not build yet” statements followed by one accepted brief. Strong, but use only if tone remains constructive. |

### S3 — Example workflows

**Section job:** Make the offer concrete across the current test domains.
**Must convey:** Elyst begins with operational work, not industry theatre or technology labels.
**Visitor takeaway:** “They understand work similar to ours.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Examples of a useful first workflow.**<br>Real-estate lead intake · RFQ-to-brief · appointment follow-up · document/report preparation.<br>Label: `Examples to adapt, not packaged products.` | Four selectors. Each shows source, prepared output, human gate, safe standalone pilot, and paid integration expansion. |
| B | **What comes in messy and leaves ready for a decision?**<br>Enquiries, RFQs, bookings, and recurring documents are common starting points. | Input/output gallery: raw email or message on the left; structured brief and decision queue on the right. |
| C | **Choose the queue that costs you most.**<br>Sales queue · operations queue · service queue · reporting queue. | Queue visual avoids sector labels and stays globally relevant, but offers less GCC specificity. |

### S4 — Audit

**Section job:** Explain what Elyst studies and what the buyer receives before a build decision.
**Must convey:** An audit can recommend a process fix, an existing tool, a small build, or no action yet.
**Visitor takeaway:** “The audit creates a useful decision even if no project follows.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **1. Audit — decide what is worth building.**<br>Input: the current workflow, owner, volume, source material, and previous attempts. Output: current-state map, ranked opportunity, risks, data readiness, measure, and next step. | Two columns labelled `We inspect` and `You receive`, with a workflow-map artefact between them. |
| **B — Recommended** | **First, stop the wrong project.**<br>We find where the work actually stalls and decide whether the answer is a process change, an existing tool, a bounded build, or “not yet.” | A decision tree ending in four honest outcomes. The build path is not visually preselected. |
| C | **The audit earns the build.**<br>Nothing moves forward until the workflow, owner, evidence, risk, and success measure are clear. | Dark editorial section with five approval stamps; use carefully so it does not resemble compliance software. |

### S5 — Build

**Section job:** Make the build boundary, testing, exception handling, and existing-tool fit visible.
**Must convey:** Elyst builds the smallest useful slice and proves it on representative work before expansion.
**Visitor takeaway:** “This is phased engineering, not a demo reveal.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **2. Build — prove the smallest useful system.**<br>Approved scope and test cases go in. A working slice, human review, exceptions, documented limits, and measured test results come out. | A test console with representative cases: pass, review, exception, and out-of-scope. No invented performance number. |
| B | **Build into the work your team already uses.**<br>We preserve the system of record, add only the required components, and make every write-back or action explicit. | Existing tools sit around the workflow trace; no logo wall unless integration is confirmed. Use functional labels first. |
| C | **Prototype is not the finish line.**<br>The system must survive real inputs, predictable failures, human review, and a named owner before rollout. | Split “demo” versus “operating system” comparison. Avoid implying enterprise-scale production unless in scope. |

### S6 — Handover

**Section job:** Make Elyst's strongest differentiator the emotional and visual climax.
**Must convey:** The client receives ownership, access, training, limits, and an escalation path.
**Visitor takeaway:** “We will not be trapped by the vendor.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **3. Handover — your team takes control.**<br>Named owner · role-based training · runbook · known limits · access transfer · support period. | Dark section with a handover pack open: owner card, runbook, access list, and exception guide. |
| **B — Recommended** | **Six months later, can your team still run it?**<br>That is the handover test. We train the people who use it, transfer access, document the limits, and agree what happens when something falls outside them. | A six-month state diagram: live workflow, client owner, documented exception, optional improvement request. Elyst is outside the daily loop. |
| C | **We build it so you do not need us.**<br>Ongoing improvement can be scoped separately. Dependency is not the business model. | Type-led dark section with a small ownership-transfer animation. Strongest language; use only if commercially accepted. |

### S7 — Engagement boundaries

**Section job:** Explain the safe first project, responsibilities, scope changes, and paid expansion boundary.
**Must convey:** One workflow and one owner first; integrations and production complexity are separately scoped.
**Visitor takeaway:** “The engagement will not expand invisibly.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **What the first project looks like.**<br>One workflow · one owner · one agreed measure · bounded test set · visible human review. Integrations, live systems, sensitive data, monitoring, support, and broader rollout are separately scoped. | Concentric scope rings: `First proof`, `Paid implementation`, `Later rollout`. Make exclusions readable, not hidden in tooltips. |
| B | **What we bring. What you bring.**<br>Elyst: discovery, architecture, build, testing, training, documentation. Client: decision owner, lawful access, representative work, reviewers, and timely decisions. | Two responsibility columns joined by written phase gates. |
| C | **Scope changes are decisions, not surprises.**<br>Every proposal names inclusions, exclusions, milestones, measures, payment phases, and change control. | A proposal anatomy preview with the relevant headings visible. |

### S8 — FAQ

**Section job:** Resolve procurement and operating questions.
**Recommended:** Draft B.

| Draft | Content | Visual |
|---|---|---|
| A | How long? · What data? · What if AI is not the answer? · Who owns it? · What support? · How priced? | Standard accordion, no more than eight items. |
| **B — Recommended** | Add scope changes, credential handling, result guarantees, and what “handover” contains to Draft A. | Split desktop layout: sticky section thesis left, accordion right, as on the stronger live Services page. |
| C | Replace FAQ with a downloadable `Before we build` checklist. | Useful as a secondary asset, but retain at least four visible FAQ answers for search and accessibility. |

### S9 — Final CTA

**Section job:** Ask for a qualified workflow, not a generic discovery call.
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Bring us one workflow that is not working.**<br>Tell us what comes in, where it stalls, who owns it, and what a useful improvement would look like.<br>CTA: `Book an audit call` | Dark CTA band with four small prompt fields shown as examples, not an embedded form. |
| B | **Pick the task your team complains about most.**<br>That is usually where the first conversation should start.<br>CTA: `Discuss the workflow` | Preserve the live CTA composition but send the action to the booking route, not back to the process. |
| C | **If the workflow has no owner, start there. If it does, bring it to us.**<br>CTA: `Book an audit call` | Type-only close. Strongest qualification stance. |

### Services metadata

- **Title:** `AI Audit, Build and Handover | Elyst AI`
- **Description:** `Elyst AI audits one costly workflow, builds the smallest useful AI system, and hands it over with human review, training, documentation, and client ownership.`
- **Schema:** `Service` + `BreadcrumbList`; no prices, ratings, or unverified areas served.

---

## 8. Training page

### Page thesis

Training is a sponsor-safe room-transformation page, not a course catalogue. It must satisfy two audiences at once:

- The sponsor needs relevance, safety, logistics, evidence, and follow-through.
- The participant needs to know this will not be a generic lecture, a tool parade, or a public test of competence.

### Recommended order

`Hero → Proof status → Sponsor and participant fit → Session design → Session replay → What leaves the room → Formats → Safety and follow-through → Past work/testimonials → FAQ → Training CTA`

### T1 — Hero

**Section job:** Make the session easy to explain and safe to sponsor.
**Must convey:** Training is built around roles, approved tools, real work, and human judgement.
**Visitor takeaway:** “This is relevant to our team and usable after the session.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **AI training built around the work your team already does.**<br>We design the session around your roles, approved tools, real tasks, and operating constraints.<br>CTA: `Plan a team session` | Keep the live `Your role · Your tools · Your real work` panel. Remove the dither from this page. |
| **B — Recommended** | **A session your team can use on Monday.**<br>Not a tour of AI tools. Your team practises relevant work, learns where human review belongs, and leaves with a repeatable method.<br>CTA: `Plan a team session` | A three-frame room storyboard: before, live practice, after. Use real artefacts when permissioned, otherwise a labelled representative session. |
| C | **Become genuinely good with AI, not just aware of it.**<br>Role-specific practice for teams that need consistent, safe use—not another awareness session. | Type-led dark hero with a compact session timeline. This line is strong, but the supporting copy must make the buyer and format explicit. |

### T2 — Proof status

**Section job:** Establish delivered experience immediately without overstating outcomes.
**Must convey:** Elyst has run training; exact scale and client evidence are permissioned and consistent.
**Visitor takeaway:** “This is not their first room, and they are careful about proof.”
**Recommended:** Draft B until named permission is confirmed.

| Draft | Copy | Visual |
|---|---|---|
| A | **Corporate session delivered for [permissioned client].**<br>Audience, duration, roles, exercises, approved quote, and one session image. | Named evidence card. Publish only after written logo, name, quote, and image permission. |
| **B — Recommended** | **A six-hour corporate AI session for a cross-functional team.**<br>Show what participants practised, what artefact they left with, and one anonymised sponsor or participant quote. | Anonymised session replay. No logo. Label date and location only if approved. |
| C | **Training proof, separated honestly.**<br>`Delivered sessions` · `People trained` · `Corporate session` with one documented source behind each figure. | Counter strip only after reconciling `2,000+` versus `2,500+` and defining `50+`. No animated counting. |

### T3 — Sponsor and participant fit

**Section job:** Show that Elyst understands both the buyer and the room.
**Must convey:** The programme is adapted by role and maturity, without singling people out.
**Visitor takeaway:** “The sponsor can defend the purchase; participants will not resent it.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Built for the sponsor. Designed for the room.**<br>Sponsor: relevant outcomes, safe-use boundaries, format, and follow-through. Participant: practical exercises, clear examples, no assumed technical background, and no tool theatre. | Split view: sponsor brief on one side, participant experience on the other. Both converge on the same session plan. |
| B | **Who we run these for.**<br>Leadership teams · functional departments · cross-functional teams · internal champions · institutions. | Role selectors; each reveals `best when`, `what happens`, and `what leaves the room`. |
| C | **Different roles need different practice.**<br>Leaders decide where AI belongs. Teams practise the work. Champions help the habit survive. | Three-path model: Leaders, Working teams, Champions. Avoid implying a full academy or LMS. |

### T4 — How the session is designed

**Section job:** Replace curriculum breadth with a designed learning experience.
**Must convey:** Discovery happens before slides; practice and follow-through are part of delivery.
**Visitor takeaway:** “This is built, not pulled from a generic deck.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Discover. Design. Deliver. Follow through.**<br>Roles, tools, and tasks → tailored exercises → live practice and critique → resources and next action. | Four-step timeline using the live page's strong vertical sequence; add the missing follow-through step. |
| **B — Recommended** | **Before the room. In the room. After the room.**<br>Before: role and task discovery. In: frame the work, use AI, verify, decide. After: reusable artefacts, manager-owned action, and agreed check-in. | Three-stage session trace. More buyer-readable than four internal delivery phases. |
| C | **No session starts with a slide deck.**<br>It starts with the work the team needs to do better and the risks the sponsor needs controlled. | Show a blank generic deck being replaced by role cards, task examples, and a safety boundary. Use only if the tone remains professional. |

### T5 — Session replay

**Section job:** Let the buyer see what participants actually do.
**Must convey:** Participants practise a real task, compare outputs, verify claims, and improve the method.
**Visitor takeaway:** “I can picture the room.”
**Recommended:** Draft C.

| Draft | Copy | Visual |
|---|---|---|
| A | **Example: turn an RFQ into a decision-ready brief.**<br>Extract requirements, mark missing fields, draft clarifying questions, verify against the source, and decide the next action. | GCC-relevant exercise with synthetic documents. Label `Representative exercise`. |
| B | **Example: turn a meeting into an accountable next-action brief.**<br>Separate decisions, owners, deadlines, open questions, and claims that need checking. | Broad cross-functional exercise using a fictional transcript. |
| **C — Recommended** | **See one exercise from start to finish.**<br>Choose `Research`, `RFQ`, `Meeting`, or `Customer response`. Each replay shows the original task, participant attempt, verification step, improved output, and reusable checklist. | Interactive artefact stack. Do not show a prompt without the surrounding task, source, review, and decision. |

### T6 — What leaves the room

**Section job:** Turn “learning outcomes” into tangible participant and sponsor outputs.
**Must convey:** The value is usable work, safe habits, and a next step—not an attendance claim.
**Visitor takeaway:** “People leave with something they can reuse.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **What your team walks out with.**<br>One practised workflow · reusable task checklist or prompt pattern · agreed data boundaries · human-review rule · next-step plan. | Five artefact cards that look like real working documents, not course features. |
| B | **What changes after the session.**<br>The team can frame tasks more clearly, verify outputs, use approved tools consistently, and identify work worth improving next. | Before/after behaviour map. Avoid claiming measured productivity change. |
| C | **Less blank-page prompting. More repeatable work.**<br>Participants leave with a method they can explain, inspect, and improve. | One completed workflow canvas with participant annotations. |

### T7 — Formats

**Section job:** Help the sponsor choose based on the job to be done, not product names.
**Must convey:** Delivery format follows audience, objective, and follow-through need.
**Visitor takeaway:** “I can identify the right starting format.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Choose by audience.**<br>Leadership briefing · role-specific workshop · cross-functional session · multi-session programme · institutional session. | Decision cards with duration shown only once confirmed; no public prices until policy is settled. |
| **B — Recommended** | **Choose by what should change.**<br>Align leaders · practise one workflow · build shared safe-use rules · develop internal champions · move one challenge toward a prototype. | Each format card has `Best when`, `In the room`, and `Leaves you with`. This is more outcome-oriented than a format list. |
| C | **One room, or a programme.**<br>Use one session for alignment and practice. Use multiple sessions only when a real challenge, weekly output, manager ownership, and follow-through exist. | Two-column comparison that prevents a one-off workshop being sold as transformation. |

### T8 — Safety and follow-through

**Section job:** Make responsible use and transfer visible.
**Must convey:** People learn where data can go, how to verify, when a human decides, and what happens after training.
**Visitor takeaway:** “The session will not encourage careless use.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Frame → Think with AI → Verify and decide.**<br>Frame the task and source. Use only approved tools and information. Verify the output. Keep a person responsible for the decision. | Three-stage loop adapted to Elyst's vocabulary. Show a blocked path for sensitive or unsupported inputs. |
| B | **What should never be pasted into a public tool?**<br>The answer depends on company policy, tool contract, and the task. We agree the rules before the session. | Data-boundary matrix: public, internal, restricted, prohibited. Do not present legal advice. |
| C | **The session ends with an owner.**<br>One manager-owned action, one application signal, and one 7–14-day follow-up are agreed where the programme includes follow-through. | Small follow-through panel. Do not promise the check-in if it is not included in the proposal. |

### T9 — Past work and testimonials

**Section job:** Show history without making closed programmes look like current offers or mixing audiences carelessly.
**Must convey:** Elyst has taught people, but corporate buyers can distinguish relevant proof from old programme history.
**Visitor takeaway:** “They have delivery experience, and they label it honestly.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Programmes we have run.**<br>List past programmes with dates and audience; no `Closed` badges. | Keep the live tilted programme cards, but move them below corporate proof and reduce visual weight. |
| **B — Recommended** | **Relevant proof first. History second.**<br>Corporate session story → permissioned corporate quote → smaller archive of prior public programmes and participant comments. | Separate evidence lanes by audience. Never use a parent/student quote as corporate-training proof. |
| C | **What participants said after using it.**<br>Use only quotes tied to a named or accurately described session, role, and permission status. | One quote at a time, no auto-rotating carousel. Include context beneath the quote. |

### T10 — FAQ

**Section job:** Resolve sponsor questions about tailoring, tools, logistics, preparation, pricing, certificates, and follow-through.
**Recommended:** Draft A.

| Draft | Content | Visual |
|---|---|---|
| **A — Recommended** | Can it be customised? · Can we use our tools? · Who is it suitable for? · How many people? · On-site or remote? · What preparation is needed? · What follow-through is included? · How is it priced? · Are certificates provided? | Sticky thesis left, accordion right. Every answer must be complete before launch; no visible placeholders. |
| B | Group as `Fit`, `Delivery`, `Afterwards`. | Better if there are more than eight questions. Keep only the most important answer expanded. |
| C | Add a `What we need from you` readiness checklist above six short FAQs. | Stronger qualification, especially for custom corporate sessions. |

### T11 — Final CTA

**Section job:** Collect the minimum information needed for a useful training-fit conversation.
**Must convey:** The session begins with audience and desired change, not a standard package.
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Tell us who it is for and what should change.**<br>CTA: `Plan a team session` | Preserve the live CTA band; route to the dedicated training event. |
| **B — Recommended** | **Tell us what your team is stuck on. We will build the session around it.**<br>Ask for role mix, team size, approved tools, sample work, preferred format, and desired change.<br>CTA: `Plan a team session` | Six prompt chips resolve into a session brief. No file upload or confidential data at this stage. |
| C | **A useful session starts before the room.**<br>CTA: `Plan the session` | Minimal close paired with the pre-session discovery timeline. |

### Training metadata

- **Title:** `AI Training Built Around Your Team's Work | Elyst AI`
- **Description:** `Role-specific AI training for companies and institutions, designed around approved tools, real work, human review, and practical follow-through.`
- **Schema:** `Service` + `BreadcrumbList`; do not use `Course` unless a stable, publicly described course actually exists.

---

## 9. About page

### Page thesis

About is an accountability page. It should make a two-person team feel selective, complementary, and close to the work—not under-resourced or inflated.

### Recommended order

`Hero → Founder strips → Responsibility map → Operating principles → Company facts → Proof of people → Audit CTA`

### A1 — Hero

**Section job:** Name the relationship and turn small-team size into a delivery promise.
**Must convey:** The founders do the work from first call to handover.
**Visitor takeaway:** “I know who I am hiring.”
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Your AI partner.**<br>The two people on this page handle discovery, technical decisions, implementation, training, and handover. We take only a few clients at a time because we do the work ourselves. | Quiet portrait-led hero using both founders. No dither. Use natural, consistent portraits rather than isolated cut-outs floating in empty space. |
| B | **A team of two, from the first call to the handover.**<br>Small enough to stay close to the work. Broad enough to cover discovery, adoption, engineering, and ownership. | Preserve the local headline but use the live founder portraits as the hero visual. |
| C | **The people who scope it are the people who build and hand it over.**<br>No sales handoff to an unknown delivery team. | Large type with a responsibility trace passing between Shirin, Nihal, and the client owner. |

### A2 — Founder strips

**Section job:** Establish identity, credibility, and delivery ownership.
**Must convey:** Each founder has a distinct role; bios contain only verified facts.
**Visitor takeaway:** “I can see who owns which part.”
**Recommended:** Draft A.

| Draft | Content | Visual |
|---|---|---|
| **A — Recommended** | Shirin: name, CEO, discovery/solution mapping/training/adoption, verified 60-word bio, LinkedIn. Nihal: name, Chief AI Officer, technical scoping/implementation/deployment/handover, verified 60-word bio, LinkedIn. | Keep the live alternating full-width founder strips. Standardise portrait treatment, spacing, title chips, and biography length. Remove any unverified “first” claim. |
| B | Write each bio as `What she/he owns`, `Relevant experience`, and `What the client can expect`. | More operational and less biographical. Use a portrait plus three short labelled lines. |
| C | Use first-person founder notes: `The part I own` and `The trade-off I protect`. | Most human and distinctive, but requires genuine founder-written copy. Do not ghostwrite invented opinions. |

### A3 — Responsibility map

**Section job:** Show how two founders and the client owner cover the engagement.
**Must convey:** Small-team delivery has explicit ownership and no invisible gaps.
**Visitor takeaway:** “The operating model is complete.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **Who owns what.**<br>Shirin: discovery, solution map, training, adoption. Nihal: technical scope, build, deployment, handover. Client owner: decisions, access, review, adoption. | Three-column responsibility matrix by phase. |
| **B — Recommended** | **From first question to client ownership.**<br>Discovery passes into technical scope, build moves through client review, and handover ends with the client owner in control. | One horizontal responsibility trace with names attached to actual decisions, not decorative avatars. |
| C | **Two founders. One accountable delivery chain.** | Compact RACI-style view. Use only if labels remain readable to non-technical buyers. |

### A4 — Operating principles

**Section job:** Turn values into observable client behaviour and refusals.
**Must convey:** Elyst uses judgement, not just capability.
**Visitor takeaway:** “I know how they make difficult decisions.”
**Recommended:** Draft C.

| Draft | Copy | Visual |
|---|---|---|
| A | **How we operate.**<br>Diagnose before building · bounded systems · explicit human review · workflow measures · honest refusal. | Five paired statements, each with `What this changes for the client`. |
| B | **What we will do. What we will not do.**<br>Map the work / pitch a tool first. Test the smallest useful system / sell transformation theatre. Keep a human owner / hide decisions inside a black box. | Two-column behaviour comparison. Keep language factual, not combative. |
| **C — Recommended** | **The trade-offs we make visible.**<br>What AI does · what a person decides · what data is used · what failure looks like · who owns it afterwards. | One annotated project brief showing the five decisions. This is more credible than abstract company values. |

### A5 — Company facts

**Section job:** Establish legal and regional legitimacy without implying scale or exposing personal information.
**Must convey:** Where Elyst is based, how it operates, and how to verify the company.
**Visitor takeaway:** “This is a real, reachable company with a truthful footprint.”
**Recommended:** Draft A after facts are confirmed.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | Legal entity · registration jurisdiction · Kozhikode, Kerala, India · domain email · company LinkedIn · remote/on-site delivery model · GCC focus described truthfully. | Compact facts table. Do not publish a residential address, unsupported office, or unconfirmed service area. |
| B | **Based in Kerala. Built to work across teams.**<br>Add a verified sentence on remote GCC delivery and on-site availability by agreement. | Small Kerala-to-GCC map with no office pins; use route or service-area shading only if the claim is operationally true. |
| C | **Why we remain a small team.**<br>We take two or three clients at a time so the founders stay involved. | Capacity statement beside company facts. Use only if this remains the actual operating cap. |

### A6 — Proof of people

**Section job:** Connect biographies and principles to delivered behaviour.
**Must convey:** The founders' roles are visible in real work.
**Visitor takeaway:** “The story is supported by an artefact or permissioned account.”
**Recommended:** Draft B.

| Draft | Copy | Visual |
|---|---|---|
| A | **One session, two responsibilities.**<br>Show how Shirin designed and led adoption while Nihal supported technical exercises or implementation framing, only if factually accurate. | Permissioned training photo plus role annotations. |
| **B — Recommended** | **How we make one decision together.**<br>Use a representative workflow: Shirin surfaces the operational problem, Nihal defines the safe technical boundary, the client owner approves the change. | A clearly labelled demonstration responsibility map. No client result implied. |
| C | **What a client receives from the two-person model.**<br>Direct access · fewer handoffs · consistent context · explicit ownership. | Four concise outcomes beside the responsibility trace. Avoid claiming faster delivery without measurement. |

### A7 — Final CTA

**Section job:** Turn trust into a low-pressure next move.
**Recommended:** Draft A.

| Draft | Copy | Visual |
|---|---|---|
| **A — Recommended** | **Bring us one workflow. Speak to the people who will do the work.**<br>CTA: `Book an audit call` | Portraits recede; one clean dark CTA band takes focus. |
| B | **Change how your team uses AI at work.**<br>Bring the task that takes too long and we will tell you whether AI is the answer.<br>CTA: `See how we work` | Keep the live CTA copy but link first to Services; use only as a softer trust path. |
| C | **Two people. One honest answer about the work.**<br>CTA: `Book an audit call` | Minimal type-only close. |

### About metadata

- **Title:** `Your AI Partner | About Elyst AI`
- **Description:** `Meet the two founders who lead Elyst AI's discovery, implementation, training, and handover work from Kozhikode, Kerala.`
- **Schema:** `Organization` + verified `Person` records + `BreadcrumbList`.

---

## 10. Work page, only after proof exists

Do not add `/work` or `/case-studies` at launch. Add it when Elyst has at least one permissioned implementation case and one permissioned corporate-training story.

Recommended case order:

`Situation → Measurable baseline → Before workflow → What Elyst built → Human gate → After workflow → Measured result → Handover → What the case does not prove`

Three case-story directions:

| Draft | Narrative | Visual |
|---|---|---|
| **A — Recommended** | **From [problem] to [measured operating change].** Start with the baseline and result, then replay the system. | Before/after workflow with evidence cards and a persistent source/caveat panel. |
| B | **What changed, and what stayed human.** Centre the decision boundary and client ownership. | Human-gate diagram plus handover pack. |
| C | **A workflow lesson, not a trophy.** Include what failed, what was cut, and what the result does not prove. | Engineering-style case log with timeline, test cases, and limitations. |

Until this page exists, use a compact proof ledger on Home and the relevant proof section on Training.

---

## 11. Booking and conversion design

### Audit booking

Use a dedicated `AI Workflow Audit Call` event. The first screen should ask only:

- company and role;
- industry;
- repeated workflow;
- who owns it;
- tools or source material involved;
- approximate frequency or volume;
- what useful improvement would mean.

Do not ask for passwords, confidential files, customer data, or detailed integration access before a scoped engagement. Do not publicly advertise the audit as free while pricing policy remains unsettled.

### Training booking

Use a separate event and analytics intent. Ask:

- sponsor role;
- audience and role mix;
- participant range;
- approved tools;
- work participants should practise;
- preferred format and location;
- desired change after the session.

The Training page must never send its main CTA to the audit booking event.

### CTA naming

| Context | Primary CTA | Avoid |
|---|---|---|
| Home | `Book an audit call` | Get started, Learn more |
| Services | `Book an audit call` or `Discuss one workflow` | See how we work when it links to the same page |
| Training | `Plan a team session` | Book a call, Explore programmes |
| About | `Book an audit call` | Contact us |
| Work, later | `Discuss a similar workflow` | Start your transformation |

---

## 12. Responsive, accessibility, and interaction requirements

### Mobile

- Keep the claim, supporting line, and primary CTA visible before the page-specific visual.
- Never place two equal primary buttons on a 390px viewport. The secondary action becomes a text link.
- Convert workflow diagrams into a vertical state sequence with clear `Input`, `AI prepares`, `Human decides`, `Recorded`, and `Owner` labels.
- Founder strips stack as portrait → name/role → bio; alternate alignment only on desktop.
- Keep cards full width and avoid horizontal carousels for essential information.
- FAQ hit areas must be at least 44px high; CTA controls should preserve the existing 48px minimum.
- Do not let decorative shadows create hundreds of blank pixels between the final CTA and footer.

### Accessibility

- One H1 per page; headings must follow a real hierarchy.
- All page-specific visuals need an accessible text equivalent describing the workflow, not generic alt text such as “AI graphic.”
- Never communicate Fit/Not fit or pass/fail only through green and red.
- Interactive selectors must be keyboard operable, expose selected state, and remain understandable with JavaScript disabled where practical.
- Motion must stop or simplify under `prefers-reduced-motion`.
- Keep visible focus rings and the existing skip link.
- Testimonials require names/roles only where permissioned; decorative quotation marks remain hidden from assistive technology.
- Do not split visible sentences into duplicated per-letter DOM nodes unless the accessible name is explicitly preserved and tested.

### Interaction limits

- One interactive explainer per page is enough.
- No auto-rotating carousels for essential proof.
- No text animation that can be captured mid-word.
- No pointer-only hover state that hides essential content from touch users.
- Every animation must settle into a complete, readable state.

---

## 13. Software architecture

### Keep the stack

Keep Next.js, React, Tailwind, Framer Motion, and the existing self-hosted typography. There is no product or maintainability reason to migrate the marketing site.

### Rendering model

- Server Components by default.
- Client Components only for the navigation menu, FAQ state, workflow selector, measured CTA tracking, dither, and page-specific controlled motion.
- Page copy and section data should remain statically rendered in HTML for crawlability and resilience.
- Do not add a CMS until publishing cadence and ownership justify it. Typed content objects in the repository are enough now.

### Recommended component structure

```text
src/components/marketing/
  PageThesis.tsx
  WorkflowTrace.tsx
  WorkflowSelector.tsx
  PhasePanel.tsx
  ArtifactFrame.tsx
  EvidenceCard.tsx
  FitGate.tsx
  ResponsibilityMap.tsx
  FounderStrip.tsx
  CtaBand.tsx
  FaqAccordion.tsx
```

`PageHero` should become a thesis shell with a required page-specific visual slot. It must not hard-code the dither mark for Services, Training, and About.

### Content model

Store section copy as typed data with explicit fields:

```ts
type EvidenceStatus = "permissioned" | "anonymised" | "demonstration" | "method";

type WorkflowExample = {
  title: string;
  context: string;
  input: string[];
  preparation: string[];
  humanDecision: string;
  recordedOutcome: string;
  owner: string;
  status: EvidenceStatus;
};
```

The status must be rendered visibly. It is not internal metadata.

### Known defects to fix

1. Fix negative SVG `<rect>` width/height generation at initial measurement. Clamp to zero or delay rendering until dimensions are valid.
2. Fix the `metal-fx` hydration mismatch caused by server and client choosing different theme attributes. Pass a deterministic theme from the server or render the effect only after mount with a stable accessible button underneath.
3. Remove live footer and hero typewriter fragments.
4. Ensure animated text does not duplicate words in the accessibility tree.
5. Verify CTA destinations and route-specific analytics after component consolidation.

### Performance approach

- Use the dither only on Home and provide a static image/SVG fallback.
- Lazy-load below-fold interactive diagrams and portrait media.
- Use `next/image` with explicit dimensions and responsive sizes for founder and training photos.
- Avoid shipping a client-side animation library to sections that only need CSS transitions.
- Prevent layout shift by reserving final media and artefact dimensions.
- Keep font files limited to the weights actually used.
- Run production builds and inspect performance in the deployed environment; development-server screenshots are not performance evidence.

---

## 14. SEO, schema, redirects, and analytics

### Indexable commercial routes

- `/`
- `/services`
- `/training`
- `/about`

Keep booking, privacy, and terms accessible but `noindex` if that remains the settled release policy.

### Redirects

Use server-side permanent redirects with no chains:

- `/aios` → `/services`
- `/learn` → `/training`
- `/ai-for-work` → `/training`
- `/juniors` → `/training`
- `/circle` stays live only while the business decision requires it; keep it outside primary navigation.

### Structured data

- Home: `Organization`, `WebSite`.
- Services: `Service`, `BreadcrumbList`.
- Training: `Service`, `BreadcrumbList`.
- About: `Organization`, verified `Person`, `BreadcrumbList`.
- Work, later: `Article` or `CaseStudy` only if the chosen vocabulary is supported and matches visible content; do not invent ratings or results.

### Analytics events

- `audit_cta_click`
- `training_cta_click`
- `workflow_example_select`
- `services_phase_select`
- `faq_open`
- `scheduler_view`
- `booking_complete`
- `training_enquiry_submit`

Include page, section, CTA label, destination intent, and preserved UTM parameters. Do not collect workflow text through analytics unless the user submits it intentionally and the privacy policy covers it.

### Conversion questions to measure

1. Do qualified visitors reach the Services workflow replay?
2. Which workflow example receives attention?
3. Does the audit CTA convert better after evidence or after the workflow replay?
4. Do Training visitors use the training CTA rather than the audit CTA?
5. Which FAQ objections are opened before booking?

Do not optimise for raw CTA clicks if call quality falls.

---

## 15. Content required before implementation can be considered complete

### Founders and company

- Verified 60-word Shirin bio.
- Verified 60-word Nihal bio.
- Confirmed role titles and profile URLs.
- Permissioned, consistently treated portraits.
- Legal entity, jurisdiction, operating location, domain email, company LinkedIn, and delivery model.

### Implementation evidence

- One labelled sample workflow using synthetic data.
- One sanitised sample audit map.
- One sample test set with pass/review/exception/out-of-scope cases.
- One sample handover-pack outline.
- Explicit statement that these are demonstrations until client evidence exists.

### Training evidence

- Reconciled people-trained and session totals with definitions.
- Permission status for the Aug 20 client name, logo, photos, quote, participant count, exercises, and outputs.
- Complete certificate policy.
- Confirmed delivery formats, indicative durations, participant ranges, travel rules, and follow-through options.

### Commercial operations

- Audit booking event and fields.
- Training booking event and fields.
- Scope/pricing language consistent with current internal policy.
- No public promise that the audit is free.

---

## 16. Implementation sequence

### Phase 1 — truth and conversion

1. Freeze the approved evidence ledger and remove unsupported claims.
2. Reconcile Training and About totals.
3. Confirm founder/company facts and permissions.
4. Fix separate audit and training booking paths.
5. Remove broken/incomplete animated text.

### Phase 2 — shared system

1. Refactor the shared hero into `PageThesis` with a visual slot.
2. Build `WorkflowTrace`, `ArtifactFrame`, `EvidenceCard`, and `CtaBand`.
3. Preserve the current tokens, nav, footer atmosphere, and accessible primitives.
4. Fix SVG measurement and hydration defects before adding more motion.

### Phase 3 — pages, in commercial order

1. Home.
2. Services.
3. Training.
4. About.
5. Work only after permissioned implementation proof.

### Phase 4 — verification

1. Desktop at 1440, 1200, and 1024 widths.
2. Mobile at 390 and 360 widths.
3. Keyboard-only navigation and selector use.
4. Reduced-motion rendering.
5. Screen-reader heading, button, tab, and accordion names.
6. Production build, lint, typecheck, and route checks.
7. No console errors, hydration warnings, invalid SVG attributes, broken words, or visible placeholders.
8. Metadata, canonical URLs, schema, robots, sitemap, redirects, and 404 behaviour.
9. Audit and training booking completion with UTMs preserved.
10. Public-domain smoke test after deployment; a Git push alone is not release evidence.

---

## 17. Definition of done

The website is ready only when all of the following are true:

- A founder or operations leader can explain Elyst after the Home hero without using the phrase “AI agency.”
- Services shows one full workflow, including the human gate and handover, not just a process list.
- Training clearly addresses the sponsor and participant, shows a real or labelled representative session, and uses a training-specific booking path.
- About uses real portraits, verified bios, responsibility ownership, and confirmed company facts.
- Every proof item declares whether it is permissioned, anonymised, a demonstration, or a method.
- Every page has a distinct visual signature within the same brand system.
- The dither mark is a brand signature, not the answer to every page hero.
- No section exists solely because a standard agency template normally includes it.
- No unsupported metric, GCC claim, client result, credential, or superlative remains.
- No essential information depends on hover, continuous motion, or JavaScript-only text.
- No console, hydration, SVG, accessibility, booking, redirect, or indexing defect remains.

The final test is simple:

> Before being asked to believe Elyst's claims, the visitor should be able to see their own work enter the page, move through a decision, stop at the right human, and leave under their team's ownership.

---

## 18. Reference pattern index

These references informed the system. Their provider-published metrics are not Elyst evidence.

### Workflow and services presentation

- [Coveniq](https://coveniq.ai/) — workflow states, business rules, approval gates, evidence, and action boundaries.
- [CLRT, Dubai](https://www.clrtstudio.com/) — work-first diagnosis and credible `wait, adopt, or build` decision.
- [Fourlines, Dubai](https://www.fourlinesagency.com/work/pentagon-real-estate) — concrete UAE workflow, existing CRM, and human close.
- [WorkflowMD](https://workflowmd.io/consultants) — evidence-linked recommendations and clearly labelled fictional samples.
- [Change by Design](https://changebydesign.ai/case-studies/01-always-on-lead-engine) — result first, then end-to-end workflow replay.
- [Stonecut](https://stonecut.agency/work/connected-service-website) — service shown as connected production states.
- [BCG X](https://www.bcg.com/x/) — build-to-run lifecycle and transfer.
- [Deloitte](https://www.deloitte.com/global/en/what-we-do/case-studies-collection/harnessing-ai-to-shape-tomorrows-world.html) — need, foundation, capability, and roadmap.
- [Polara Venture Studio, Kochi](https://www.polaraventurestudio.com/) — real systems as proof of method.
- [Globify, Kerala](https://globify.in/services/ai-automation/) — visible process, departments, industries, and existing-system fit.
- [Upteky, UAE logistics](https://upteky.com/case-studies/uae-logistics-ai-crm-lead-reactivation/) — concrete logistics workflow; numerical claims remain self-reported.

### Training presentation

- [Microsoft Copilot Skilling Center](https://adoption.microsoft.com/en-us/copilot/skilling-center/) — role paths for leaders, champions, technical owners, and users.
- [General Assembly AI training](https://www.generalassemb.ly/employers/what-we-teach/ai) — readiness, role application, and sustained adoption.
- [IDEO U Team Learning](https://www.ideou.com/pages/team-training) — learning by doing, activities, feedback, and team guides.
- [Harvard Business School Executive Education](https://www.exed.hbs.edu/the-learning-experience) — cases, simulations, discussion, and social learning.
- [Coursera for Business](https://www.coursera.org/business/) — role mapping, hands-on practice, baselines, and reporting.
- [CIPD learning evaluation](https://www.cipd.org/en/knowledge/factsheets/evaluating-learning-factsheet/) and [Kirkpatrick](https://www.kirkpatrickpartners.com/) — learning transfer and evaluation levels.
- [Growcial, India](https://growcial.org/) — real HR workflows and pre-agreed outcomes.
- [AI Workshop, UAE](https://aiworkshop.ae/) — role-specific delivery and Frame → Think with AI → Verify and decide.
- [UAE AI Buildathon](https://aibuildathon.net/) — one real challenge, weekly outputs, prototype, and roadmap.
- [Simplilearn for Business](https://www.simplilearn.com/corporate-training) — skills-gap assessment, role grouping, practice, and assessment.
- [upGrad for Business](https://business.upgrad.com/business) — realistic simulations, feedback, manager insight, and programme-level follow-through.

### About and trust presentation

- [BCG Purpose and People](https://www.bcg.com/about/purpose-people) — purpose, principles, people, and locations.
- [Principle Global](https://www.principleglobal.com/en-gb/about) — named leadership, regional context, and observable culture.
