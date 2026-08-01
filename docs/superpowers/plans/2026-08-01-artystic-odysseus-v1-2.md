# Artystic Odysseus v1.2 — "The Long Return, Rebuilt" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Artystic Odysseus v1.1 homepage from a static, AI-still editorial page into a layered, motion-rich experience with authored archival imagery, and reorganize the Artystic skill so the motion and imagery languages are reusable contracts instead of one theme's accidents.

**Starting point:** commit `7ae30a4` on branch `codex/odysseus-v1.1` (tag `v1.1.0`). Work on a new branch `codex/odysseus-v1.2`.

**Decisions locked with the user before this plan was written:**

1. **Images:** Replace all AI-generated pixels with ImageMagick collages of public-domain (CC0) museum objects, treated with print grain and plate frames. This restores what v1.1 originally promised in `Task 1A` and removes the "AI generated" read.
2. **Motion depth:** Motion libraries ARE allowed now. The old "two-motion budget / no animation runtime" rule is replaced with a layered motion system using `motion` (React) + `lenis` (inertial smooth scroll) plus native CSS keyframes for ambient loops. This is a deliberate user override of the v1.1 restraint contract.
3. **Scope:** Keep all current copy, the six-act narrative structure, section ids, fonts, and the three-image constraint. Overhaul only visuals, motion, provenance, and the skill files.

**Architecture:** Reuse the existing Next.js 16 App Router page and component surface. Add exactly two runtime dependencies (`motion`, `lenis`). Build all choreography from a small set of motion tokens and reusable primitives (reveal, clip-reveal, draw, parallax, ticker, count-up). Rebuild the three narrative tableaus from CC0 museum photography with a reproducible ImageMagick script. Update the skill tree so motion and imagery live in shared reference docs any future theme can reuse.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, `motion` (^12), `lenis` (^1), native CSS scroll-driven + keyframe animations, Next Image, ImageMagick (`magick`, already installed at `/usr/bin/magick`), Met Open Access API (CC0, no API key).

---

## Global Constraints

- Exactly two new runtime dependencies: `motion` and `lenis`. No GSAP unless a specific timeline cannot be expressed in `motion` (document the need in the task before adding).
- Exactly three narrative raster assets in `public/assets/` (same URLs and alt text as v1.1). All other ornament is native CSS/SVG or inline SVG data URIs.
- Every editorial image must be a collage of verified public-domain museum objects. No generative fill, no invented figures, no copied film assets, no actor likenesses, no text baked into images.
- Preserve semantic HTML, visible focus, WCAG AA contrast, 44px control targets, responsive imagery, and layout stability (reserve media space).
- Full `prefers-reduced-motion` states: every JS and CSS animation has a static final-state equivalent. Lenis must not run under reduced motion.
- Preserve the narrative copy and section order; sections may grow visuals but not lose meaning.
- Package version becomes `1.2.0`. Keep tags `v1.0.0` and `v1.1.0` untouched.
- No em/en dashes in visible page or layout copy (existing test contract).

---

## PART A — How the Skill Should Be Organized

The v1.1 skill tree routes `artystic odysseus` to a single reference that mixed narrative, imagery, and a motion budget. v1.2 splits shared languages out so any future theme reuses them instead of reinventing them.

### Target tree

```text
skills/artystic/
  SKILL.md                     router + universal critique loop + shared-language loading rule
  agents/openai.yaml           updated default prompt (authored imagery + layered motion)
  references/
    odysseus.md                theme-specific: narrative, six acts, palette, type, per-act motion moments, tableau contracts
    motion-language.md         NEW, shared: motion principles, tokens, choreography recipes, package policy, reduced-motion contract
    imagery-language.md        NEW, shared: authored-image definition, CC0 sourcing checklist, collage process, provenance manifest schema
```

### Responsibilities per file

**`SKILL.md`** (modify, keep concise)
- Keep the exact route `artystic odysseus` → read `references/odysseus.md` in full.
- Keep the universal critique loop (the "does it feel authored" pass).
- Add one routing rule: any task involving page motion or imagery must also read `references/motion-language.md` and `references/imagery-language.md` respectively, before designing.
- Update the refusal rules: remove "no animation runtime"; replace with "motion must serve narrative, respect reduced motion, and never hide content"; keep all other refusals (no copied film assets, no AI-generated editorial pixels, accessible contrast, focus, alt text).
- Keep the file short. It routes; it does not teach.

**`references/motion-language.md`** (new, shared)
- Principles: motion narrates; every animation answers "what does this tell the reader"; loops are ambient, never attention-seeking; transforms/opacity only, compositor-friendly.
- Tokens: durations (180 / 320 / 560 / 900 ms), entrance ease (cubic-bezier overshoot pair), stagger (60–90 ms), travel distances (24–48 px), clip-path reveal geometry.
- Recipes (each with a before/after and reduced-motion final state):
  1. Headline mask reveal (line-by-line translateY with overshoot)
  2. Clip-path image reveal (inset from edge or scale-from-corner)
  3. Staggered list/item rise with rule-line draw
  4. Path draw (SVG stroke-dashoffset) and moving marker along a path
  5. Parallax layers (useScroll + useTransform)
  6. Ticker/marquee loop (CSS keyframes, paused on reduced motion)
  7. Count-up stat (motion useInView + animate)
  8. Hover micro-interactions (CTA arrow slide, underline sweep, card lift)
  9. Scroll progress bar (useScroll scaleX)
- Package policy: `motion/react` for viewport-driven and state-driven choreography; `lenis` for inertial smooth scroll; CSS keyframes for ambient loops and hover transitions. Never use both systems on the same element.
- Performance: animate transform and opacity only; avoid layout-triggering properties; keep `will-change` minimal; cap simultaneous parallax layers.
- Reduced-motion contract: wrap app in `<MotionConfig reducedMotion="user">`, disable Lenis, and set CSS final states.

**`references/imagery-language.md`** (new, shared)
- Authored-image definition: editorial images are collages of verified public-domain museum objects with hard crops, limited palettes, print grain, and plate frames. Generative pixel synthesis is not "authored" for editorial use.
- Sourcing checklist: CC0/PD source only; verify `isPublicDomain: true` on the object record; record accession number, object title, period, culture, credit line, source image URL, and license in a manifest; prefer object close-ups over whole-vessel shots for texture; never crop out or misattribute a source.
- Collage process: gather → verify → download highest available scan → crop hard (editorial, not painterly) → treat tone (grayscale → level → duotone tint) → add print grain and plate rules → export sRGB WebP with sane payload. Text stays in HTML, never in the image.
- Manifest schema v3: per-asset record with `asset`, `storyBeat`, `compositionNote`, `objects: [{ title, accessionNumber, objectDate, culture, creditLine, sourceUrl, license }]`, `output { width, height, format, colorSpace }`, and top-level `provenance` with `mode: "curated public-domain collage"`, `thirdPartyVisualPixels: true`, `filmAssets: false`, `disclosure`.

**`references/odysseus.md`** (rewrite, keep theme specificity)
- Keep the six acts and their narrative, the palette, type roles, and source-boundary rules (Homeric narrative / Bronze Age material / later Greek visual reception / original modern composition).
- Replace the "two-motion budget" section with a **per-act motion moment table** (act → primary animation → system used → reduced-motion final state). This is the theme contract the site must match.
- Replace the imagery section with the three tableau contracts (hero, underworld, homecoming) pointing to `imagery-language.md` for process and citing the approved source-object search terms.
- Keep refusal rules and completion checklist, updated to the v1.2 contracts.

**`agents/openai.yaml`** (modify)
- Update the default prompt so it commissions "authored archival collages" and "layered narrative motion" instead of the old restraint language.

---

## PART B — Website Rebuild Tasks

### Task 1: Lock contracts, install the motion stack, and write failing tests

**Files:**
- Modify: `package.json` (add `motion`, `lenis`)
- Create: `app/motion-provider.tsx` (client: `<MotionConfig reducedMotion="user">` wrapper)
- Create: `components/lenis-provider.tsx` (client: Lenis mount + rAF loop, disabled under reduced motion)
- Create: `components/scroll-progress.tsx` (client: useScroll scaleX bar)
- Create: `components/grain.tsx` (server: static overlay div using SVG feTurbulence data URI)
- Modify: `app/layout.tsx` (wrap body in providers; keep metadata and fonts)
- Modify: `tests/odysseus-homepage.test.mjs` (new assertions, run to see them fail)

**Interfaces:**
- Layout consumes: motion provider, lenis provider, scroll progress, grain. Providers are tiny and do not change page semantics.
- Test consumes: package.json deps, layout providers, and asserts the reduced-motion + provenance contracts before assets/motion exist.

**Steps:**
- [x] **Step 1:** `bun add motion lenis`. Verify versions land at `^12` and `^1`.
- [x] **Step 2:** Create `motion-provider.tsx` (`"use client"`, wraps `children` in `<MotionConfig reducedMotion="user">`), `lenis-provider.tsx` (uses `matchMedia("(prefers-reduced-motion: reduce)")`; if reduced, render children only), `scroll-progress.tsx` (motion `useScroll` → `scaleX` spring on a fixed top bar using the brick/glint tokens), and `grain.tsx` (fixed, pointer-events-none, low opacity, z-index above content but below header interactions).
- [x] **Step 3:** Wire providers into `app/layout.tsx` between `<body>` and `{children}`.
- [x] **Step 4:** Add test assertions that: `package.json` contains `motion` and `lenis`; layout imports `MotionConfig` with `reducedMotion`; page still has six sections, all ids, all named characters, all three asset paths and alt texts; provenance manifest is schema v3 with `thirdPartyVisualPixels: true` and per-object credits; `motion-language.md` and `imagery-language.md` exist with tokens and reduced-motion rules; `odysseus.md` contains a per-act motion table and no longer says "exactly two meaningful motion moments". Run `node --test tests/odysseus-homepage.test.mjs` and confirm failures are exactly the new contracts.
- [x] **Step 5:** Run `bun run check` and confirm the only errors are from the new files (typecheck will pass after providers are typed).

**Done when:** providers compile, tests fail on new contracts only, deps are recorded.

---

### Task 2: Rebuild the three narrative tableaus from CC0 museum objects

**Files:**
- Create: `scripts/build-collages.sh` (reproducible ImageMagick pipeline)
- Modify: `public/assets/odysseus-hero.webp` (1915x821 keep or 2000x900)
- Modify: `public/assets/odysseus-underworld.webp` (1536x1024 keep)
- Modify: `public/assets/odysseus-homecoming.webp` (1536x1024 keep)
- Modify: `public/assets/odysseus-sources.json` (schema v3, real object credits)
- Modify: `tests/odysseus-homepage.test.mjs` (provenance assertions, already written in Task 1)

**Interfaces:**
- Script consumes: Met Open Access search terms per tableau; produces raw downloads in a git-ignored scratch dir (e.g., `.assetwork/raw/`) and final WebP in `public/assets/`.
- Manifest consumes: script output object records; produces the schema v3 JSON the tests assert.

**Steps:**
- [x] **Step 1:** Write `scripts/build-collages.sh` with helpers: `met_search "query"` → `curl https://collectionapi.metmuseum.org/public/collection/v1/search?q=...&hasImages=true`; `met_object <id>` → fetch object JSON and require `isPublicDomain === true`; `met_download <id>` → `curl` the `primaryImage` URL into `.assetwork/raw/`. Add `.assetwork/` to `.gitignore`.
- [x] **Step 2: Hero (Troy / the long departure).** Search terms: `mycenaean octopus jar`, `cypriot boat model`, `mycenaean ship`. Compose a dark ground (text-safe left third, near-black `#0a0e10`), octopus-jar motif cropped tight on the right, a low ship-model silhouette on the horizon line, one thin oxidized route polyline (SVG overlay composited in), one muted brick accent chip. Tone: desaturate, level, slight blue-black tint. Export 1915x821 or 2000x900, quality ~80, sRGB, strip metadata.
- [x] **Step 3: Underworld (the dead speak).** Search terms: `white-ground lekythos`, `lekythos funerary`. Compose 2-3 hard-cropped lekythos figure fragments stacked vertically and fading toward the top (memory fragments), a single strong brick/red horizontal rule at the lower third (blood offering line), cold desaturated tone. Export 1536x1024.
- [x] **Step 4: Homecoming (Argos / recognition).** Search terms: `odysseus penelope relief`, `odysseus archer`, `athena owl lekythos`, `owl skyphos`. Compose a three-panel editorial row: the pair/relief crop, an archer vase detail, an owl detail, separated by thin rule lines; warm bone-on-charcoal duotone. Export 1536x1024.
- [x] **Step 5:** Inspect every intermediate and final at full size and at ~360px thumbnail. Reject: cutout halos, muddy AI-gradients, text in image, wrong aspect, >400KB payload, colors outside the token palette.
- [x] **Step 6:** Write the v3 manifest: `provenance.mode: "curated public-domain collage"`, `thirdPartyVisualPixels: true`, `filmAssets: false`, disclosure sentence, and for each asset a `compositionNote` plus `objects[]` with `title`, `accessionNumber`, `objectDate`, `culture`, `creditLine`, `sourceUrl`, `license: "CC0"`. Match the test contract from Task 1.
- [x] **Step 7:** Run the test suite; provenance assertions must pass.

**Done when:** all three tableaus are verifiable collages of credited CC0 objects, the script re-runs cleanly from scratch, and the manifest test passes.

---

### Task 3: Global chrome and motion foundation

**Files:**
- Modify: `app/globals.css` (motion tokens, keyframes, grain, progress bar, marquee, sea wave, reveal utilities, reduced-motion finals)
- Modify: `app/page.tsx` (only add wrapper classes/structural hooks the CSS needs; no copy changes)
- Modify: `app/layout.tsx` (already done in Task 1)

**Interfaces:**
- CSS consumes: a set of class names and data attributes used by motion components; defines token variables under `:root` (`--dur-1..4`, `--ease-enter`, `--ease-exit`, `--stagger`, `--rise`, `--clip-reveal`).
- Page consumes: providers from Task 1 and class hooks like `data-reveal="rise"`, `.ticker`, `.sea-wave`, `.stat`.

**Steps:**
- [x] **Step 1:** Add motion tokens to `:root` and a small keyframe library: `rise-in`, `mask-in`, `clip-in`, `draw-line`, `grain-flicker`, `ticker-scroll`, `wave-drift`, `bow-tension`, `caret-blink`, `arrow-slide`.
- [x] **Step 2:** Global layers: fixed grain overlay (from `grain.tsx`), scroll progress bar (from Task 1), selection/focus tokens unchanged, keep all v1.1 color and type tokens.
- [x] **Step 3:** Add reveal utilities: `.rv` (motion-managed entrance; opacity 0 + transform prefixed), `.rv-line`, `.rv-clip` (clip-path inset), `.rv-stagger > *` (children stagger). These are the CSS final-state fallbacks; the `motion` components animate them on view.
- [x] **Step 4:** Add the `.ticker` marquee (chapter names between acts) and `.sea-wave` ambient SVG motion, both with `prefers-reduced-motion: reduce` → `animation: none; transform: none`.
- [x] **Step 5:** Add `@media (prefers-reduced-motion: reduce)` block covering every animated class and the old `.voyage-line` / `.bow-string` so the existing test contract keeps passing, plus `.grain`, `.ticker`, `.sea-wave`, `.stat`.
- [x] **Step 6:** Run `bun run check` and `node --test`. The reduced-motion contract test must pass.

**Done when:** tokens and primitives exist, reduced-motion test passes, no visual changes yet beyond grain + progress bar.

---

### Task 4: Hero experience (`#journey`)

**Files:**
- Modify: `app/page.tsx` (hero block only: wrap h1 lines, add scroll-linked elements)
- Modify: `app/globals.css`

**Interfaces:**
- Motion consumes: `useScroll({ target: heroRef, offset })`, `useTransform` for parallax/fade, `whileInView` for the title sequence.
- CSS consumes: `.hero-word` (mask spans), `.hero-plate` (Ken Burns), `.hero-fade` (scroll-linked opacity), `.voyage-index a` hover animations.

**Steps:**
- [x] **Step 1:** Title reveal: split "The Long Return" into three mask-reveal lines with `motion.span` translateY overshoot, staggered 90ms, ease-out overshoot pair. Reduced motion: lines visible immediately.
- [x] **Step 2:** Background plate: slow Ken Burns zoom (CSS, 18-24s loop, alternate) plus scroll-linked parallax (image translateY slower than scroll) and a scroll fade of the whole content column.
- [x] **Step 3:** CTA: arrow `→` slides right on hover; underline sweep under "Invoke the theme"; `journey-meta` chip gets a subtle rule draw on hover.
- [x] **Step 4:** Voyage index (`Ash / Loss / Cunning / Shades / Signs / Peace`): each link gets an animated top-border draw on hover, underline sweep, and a small chevron micro-motion; first link has an ongoing brick "you are here" marker.
- [x] **Step 5:** Keep the dark text-safe field; verify hero still passes the v1.1 CSS contract tests (opacity, object-position, min-height, voyage index background).

**Done when:** hero feels alive on scroll and hover, still reads as "The Long Return" within 2 seconds of load, reduced motion shows a static plate + full title.

---

### Task 5: Section choreography (`#sea`, `#cunning`, `#memory`, `#recognition`)

**Files:**
- Modify: `app/page.tsx` (add structural hooks only)
- Modify: `app/globals.css`

**Interfaces:**
- Motion consumes: `whileInView` + `viewport={{ once: true, amount: 0.3 }}` for reveals; `useScroll` for the memory image parallax; clip-path reveal for the recognition plate.
- CSS consumes: `.draw-line`, `.rv-clip`, `.rv-stagger`, existing `.voyage-line` / `.bow-string` classes.

**Steps:**
- [x] **Step 1: `#sea` (The cost of return).** Headline mask reveal; keep the voyage route path-draw; add a small ship marker traveling the path with `offset-path` when in view; list items (`Troy`, `The cave`, `Almost home`, `Six taken`, `One hull`, `One survivor`) rise staggered with their accent label and a rule draw. Hover: item shifts 4px, label colors brick, a thin vertical rule extends.
- [x] **Step 2: `#cunning` (Every escape leaves a mark).** Four articles reveal in an alternating diagonal stagger (`rgv` alternating `x` offsets) with border-left color line drawing in; hover lifts the card 4px and draws the h3 underline.
- [x] **Step 3: `#memory` (The dead speak).** Underworld image parallax inside its `overflow-hidden` frame (image scale 1.08, translateY on scroll); text column reveals line-by-line; the two articles (`Achilles`, `Agamemnon`) get staggered rise with top-rule draw. Keep the current dark `--char` band.
- [x] **Step 4: `#recognition` (Home arrives as a sequence of signs).** Homecoming plate reveals with `clip-path: inset(0 0 0 100% → 0)` sweep; the three signs (`The old dog knows first`, `The body keeps its name`, `The bed cannot be moved`) stagger in with index numerals counting up; weave-pattern background drifts subtly on scroll.
- [x] **Step 5:** Insert one `.ticker` marquee between acts (e.g., `Troy / The cave / Almost home / Six taken / One hull / One survivor / Ithaca`) running at a calm 30-40s loop, `aria-hidden`, paused under reduced motion.
- [x] **Step 6:** Re-run `node --test`; the mobile tests (recognition grid collapse, axe register 12 columns, compact nav) must still pass.

**Done when:** every section has a distinct, narrative motion moment; no two sections animate identically; reduced motion shows all final states.

---

### Task 6: Invocation and ambient life (`#invoke`, footer)

**Files:**
- Modify: `app/page.tsx` (add stat markup, keep 12 axe apertures, keep CopyCommand usage)
- Modify: `components/copy-command.tsx` (add feedback animation states)
- Modify: `app/globals.css`

**Interfaces:**
- Motion consumes: `useInView` + `animate` for the stats row; `whileInView` for the command block rise.
- CSS consumes: `.axe-aperture` stagger, `.stat`, `.caret`, `.bow-string` (keep v1.1 contract), `.copy-button` success state.

**Steps:**
- [x] **Step 1:** Bowstring: keep the v1.1 tension draw; add a slow shimmer pass (glint gradient sweep) once in view. Keep `.bow-string` reduced-motion contract.
- [x] **Step 2:** Axe apertures: 12 apertures stagger down into place with a top-rule draw (60ms stagger), final alignment identical to v1.1.
- [x] **Step 3:** Add a stats row that counts up in view: `20 years absent`, `12 axes`, `6 taken`, `1 ship returns`. `motion` `useInView` triggers `animate(0 → n)`; reduced motion shows final numbers immediately.
- [x] **Step 4:** Command block: caret blinking after `npx artystic`; `CopyCommand` success flips to a brick check with a tiny pop; button border sweeps on hover.
- [x] **Step 5:** Footer: source-boundary text fades up on view; link hover underlines. Keep the three source-boundary phrases (test contract).
- [x] **Step 6:** Re-run the full test suite; the invoke section contract (12 apertures, no overflow pre, CopyCommand) must pass.

**Done when:** invocation reads as the climax, stats count, copy feedback is delightful, all tests green.

---

### Task 7: Reorganize the Artystic skill (Part A in practice)

**Files:**
- Modify: `skills/artystic/SKILL.md`
- Modify: `skills/artystic/agents/openai.yaml`
- Rewrite: `skills/artystic/references/odysseus.md`
- Create: `skills/artystic/references/motion-language.md`
- Create: `skills/artystic/references/imagery-language.md`
- Modify: `tests/odysseus-homepage.test.mjs` (skill assertions from Task 1)

**Interfaces:**
- Skill consumes: the shared language docs; routes exactly as specified in Part A.
- Test consumes: the exact route phrase, the new reference files, the per-act motion table, the collage provenance rules.

**Steps:**
- [x] **Step 1:** Write `motion-language.md` and `imagery-language.md` per the Part A specs (tokens, recipes, package policy, sourcing checklist, manifest schema v3).
- [x] **Step 2:** Rewrite `odysseus.md`: keep narrative/acts/palette/type and the four source-boundary layers; replace the two-motion budget with the per-act motion moment table; add the three tableau contracts referencing `imagery-language.md`; update refusal rules and completion checklist.
- [x] **Step 3:** Update `SKILL.md` routing to require shared-language reads for motion/imagery tasks; update refusals (allow motion runtimes with discipline; still refuse AI-generated editorial pixels and copied film assets).
- [x] **Step 4:** Update `agents/openai.yaml` default prompt to commission authored collages and layered narrative motion.
- [x] **Step 5:** Run `node --test tests/odysseus-homepage.test.mjs`; the skill contract tests from Task 1 must pass. Run `quick_validate.py skills/artystic` if the validator exists in the environment.

**Done when:** skill tree matches Part A exactly and tests pass.

---

### Task 8: Verify twice (a11y, reduced motion, quality, build)

**Files:**
- Modify only files implicated by failures.

**Interfaces:**
- Produces: verified desktop/mobile page, clean checks, passing tests, production build.

**Steps:**
- [x] **Step 1:** Run `bun run check`, `node --test tests/odysseus-homepage.test.mjs`, `bun run build`.
- [x] **Step 2:** Visual pass at 1440px and 390px: hero readability, every reveal firing once, no horizontal overflow, no layout shift (reserve media space), parallax not clipping text, ticker not covering focus targets, stats legible.
- [x] **Step 3:** Reduced-motion pass: emulate `prefers-reduced-motion: reduce`; confirm Lenis off, no grain flicker, no ticker drift, all content visible with no animation required to read it.
- [x] **Step 4:** Keyboard + screen-reader pass: tab order intact, focus rings visible on every interactive element, alt text preserved, aria-hidden on decorative motion (ticker, grain, axe apertures), CopyCommand announces state.
- [x] **Step 5:** Performance pass: total image payload under ~1MB across the three tableaus, animation-only properties (transform/opacity), no jank on a mid laptop (this repo's target).
- [x] **Step 6:** Run all checks again after any fixes.

**Done when:** everything above passes twice, with the same commands.

---

### Task 9: Release v1.2.0

**Files:**
- Modify: `package.json` (version `1.2.0`)
- Modify: `README.md` (motion + imagery language summary, updated stack list)
- Modify: `docs/superpowers/specs/` only if a spec update is warranted (optional)
- Create: `docs/superpowers/plans/2026-08-01-artystic-odysseus-v1-2.md` already exists (this file); update the plan's task checkboxes to `[x]` as tasks complete

**Steps:**
- [x] **Step 1:** Bump version, update README stack and feature lists (motion system, archival collages, provenance manifest).
- [x] **Step 2:** Full `bun run check`, `node --test`, `bun run build` on the final tree.
- [x] **Step 3:** Commit on `codex/odysseus-v1.2` and tag `v1.2.0`. Do not push without a separate request.

---

## Handoff Directions for Codex (read this first)

1. `git checkout -b codex/odysseus-v1.2` from the current v1.1 HEAD (`7ae30a4`).
2. Execute tasks in order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9. Task 7 (skill reorg) can be done in parallel with Tasks 2-6 if you are using subagent-driven development; the shared language docs from Task 7 should be drafted early because Tasks 2-6 must match their contracts.
3. After every task: `bun run check` and `node --test tests/odysseus-homepage.test.mjs`. Fix only observed failures.
4. Do NOT touch: narrative copy, section ids, alt texts, fonts, the `copy-command.tsx` public API, or the `next build` script (test-asserted).
5. Do NOT add more than two runtime dependencies. If you genuinely need GSAP, stop and document why first.
6. Every animation must have a reduced-motion final state. This is a hard gate, not a nicety.
7. Verify each image at full size before committing it. If a Met search returns nothing public-domain, widen the query (e.g., `greek vase`, `attic lekythos`) rather than falling back to generative pixels.
8. Commit per task with conventional messages, matching the repo's existing style (`feat:`, `style:`, `test:`, `docs:`).

## Definition of Done

- The homepage reads as authored and layered: smooth inertial scroll, scroll progress, grain, a cinematic hero, a distinct motion moment per section, marquee and count-ups, an animated invocation, and delightful micro-interactions, all under 1MB of image payload.
- The three tableaus are credited CC0 collages; the manifest is schema v3 and the provenance test passes.
- The skill tree matches Part A; `motion-language.md` and `imagery-language.md` exist and are load-bearing for future themes.
- Reduced motion, keyboard, focus, contrast, and layout-stability passes are green; `bun run check`, `node --test`, and `bun run build` pass.
- Version `1.2.0` tagged on `codex/odysseus-v1.2`.
