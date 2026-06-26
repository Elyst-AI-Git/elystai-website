# Site Audit Report — Elyst AI Website

## Summary
Audited the Next.js 16 / React 19 site for mobile performance, runtime correctness, and dead/unnecessary code. The codebase was already in good shape — a previous pass had clearly added systematic touch/low-power gating (`useIsTouch`, `useReducedEffects`) for every continuous animation (canvas trails, dithering shaders, metal-button shaders), so there was very little mobile-performance surgery left to do. The pass found and fixed 3 concrete issues: one console error firing on every page load (Base UI button semantics), one genuine mobile layout-overflow bug (hero headline clipped off-screen on narrow viewports), and one dead component. Build and typecheck are clean after fixes. Full click-through on mobile (375px) and desktop across all 7 routes found no other console errors or layout breaks.

## Mobile performance
| File | What it was doing | Why it hurts phones | Fix applied |
|---|---|---|---|
| _(none — already correct)_ | Every continuous-animation surface in the codebase (`MarkDither`, `canvas.tsx`/`AiosHero`, `MetalButton` shaders, `ProofBar` counters, `display-cards`, `bento-grid`) already checks `useIsTouch` / `useReducedEffects` / `isLowPerfDevice` and serves a static fallback on touch or low-power hardware, with `IntersectionObserver` pausing off-screen loops. No untouched continuous-loop or backdrop-blur-on-every-frame cases were found. | — | No change needed; verified coverage is complete. |

**Trade-off note:** nothing changed here, so there's nothing new to disclose — desktop and mobile animation behavior is exactly as it was before this audit.

## Correctness fixes (found via live console + click-through)

| File | Issue | Fix |
|---|---|---|
| [src/components/ui/brand-button.tsx](src/components/ui/brand-button.tsx) | Every `BrandButton` rendered as a link (`href` set) passed `render={<a/>}` or `render={<Link/>}` into Base UI's `Button`, but never set `nativeButton={false}`. Base UI's `Button` defaults `nativeButton` to `true`, which logged a console error ("expected a native `<button>`... use `nativeButton` to `false`") on **every single page load**, for every CTA button in the Nav, Hero, AiosTeaser, and AcceleratorTeaser. Harmless visually, but it's exactly the kind of noise that buries real errors and signals broken accessibility semantics (the element isn't actually a native button, so screen readers/forms were getting inconsistent treatment). | Added `nativeButton={!href}` to the `MetalButton` call so link-rendered buttons correctly tell Base UI they're not native `<button>` elements. Verified clean console logs across all routes after the fix. |
| [src/components/accel/AccelHero.tsx](src/components/accel/AccelHero.tsx) | The cycling-word hero headline ("Stay *confident/relevant/competitive/irreplaceable* With AI.") used an absolutely-positioned, `whitespace-nowrap` layout trick to prevent layout-jump as the word cycles. The trick sized its invisible placeholder to the shortest word ("Stay confident"), then absolutely positioned the real text inside that box. On a 375px phone, the longest cycling word ("irreplaceable") is wider than the available screen width, so it rendered as a single unbreakable line that ran straight off the right edge of the viewport — clipped and unreadable. | Made the no-jump trick `sm:`-only. Below the `sm` breakpoint, the heading now flows normally (`flex-wrap`, no `whitespace-nowrap`), so "Stay" and the cycling word wrap onto their own centered lines like the "With AI." line below them already does. Desktop/tablet (≥640px) is byte-for-byte the same layout as before — confirmed via screenshot diff. |

## Dead code
| File | Status | Action |
|---|---|---|
| `src/components/circle/CircleJoin.tsx` | Defined but never imported anywhere in `src/app` or `src/components` (the actual `/circle` page wires up `CircleHero`, `CircleAbout`, `CircleForWho`, `CirclePricing`, `CircleFaq`, `CircleCta` — `CircleJoin` was never in that list). | Deleted, after confirming with you that the local branch matched `origin/dev` at `67a07ef` (no uncommitted work would be lost). Typecheck/build clean after removal. |

No other dead components, unused imports, or orphaned files were found in `src/`. The `_workspace/unused/` directory is an existing, correctly-labeled quarantine for retired component experiments (3d-card, dither-shader demos, etc.) — left untouched as it's already out of the build path and clearly intentional.

## UI
Checked all 7 routes (`/`, `/aios`, `/learn`, `/ai-for-work`, `/circle`, `/juniors`, `/waitlist`) at 375px (mobile) and at native desktop width, plus the mobile nav's open/close and accordion-expand interactions, and a waitlist form fill.

- **Mobile (375px):** Every route renders with no horizontal scroll (confirmed via `scrollWidth` checks, not just visual inspection) and zero console errors after the two fixes above. The mobile nav opens, the "Accelerator" accordion expands/collapses correctly (verified via `aria-expanded` state, not just screenshot timing — an early screenshot looked stuck mid-animation but a follow-up frame showed it rendering correctly), and the waitlist phone-number field accepts input cleanly.
- **Desktop:** Spot-checked the homepage and the Accelerator hero specifically (since that's where the mobile fix landed) — pixel-identical to pre-fix screenshots.

## Needs your decision
Nothing outstanding — both correctness fixes were mechanical (no copy or visual-design judgment calls), and the dead-code deletion was already confirmed with you before applying.

## Verification
- `npx tsc --noEmit`: clean, no errors.
- `npm run build`: clean, all 7 routes + `/robots.txt` + `/sitemap.xml` prerender as static content.
- Live click-through via the preview/Playwright-style tooling on mobile (375×812) and desktop viewports across all routes: no console errors, no layout overflow, interactions (nav, accordion, form fill) work as expected.
- No git commits were made — all changes are currently unstaged working-tree edits. Let me know if you'd like them committed.
