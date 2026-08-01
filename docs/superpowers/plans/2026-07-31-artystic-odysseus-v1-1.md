# Artystic Odysseus v1.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a researched, immersive Odysseus homepage and a reusable `artystic odysseus` theme contract as Artystic v1.1.0.

**Architecture:** Reuse the existing Next.js app and its small component surface. Replace the current homepage with one server-rendered narrative page plus one tiny client interaction for command copying; use native CSS/SVG for the voyage and motion. Keep the core skill concise and route character-specific direction to a single Odysseus reference.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, native CSS animations, Next Image, and ImageMagick-composed public-domain museum collage.

## Global Constraints

- No new runtime dependency unless an installed/native feature cannot meet the requirement.
- No movie stills, actor likenesses, copied costumes, or copied title lockups.
- Three authored archival raster assets maximum; all other ornament is native CSS/SVG.
- Preserve semantic HTML, visible focus, reduced motion, responsive imagery, and WCAG AA text contrast.
- Package version must be `1.1.0`; preserve the starting head as `v1.0.0`.

---

### Task 1: Lock version history and asset contract

**Files:**
- Modify: `package.json`
- Create: `public/assets/odysseus-hero.webp`
- Create: `public/assets/odysseus-underworld.webp`
- Create: `public/assets/odysseus-homecoming.webp`

**Interfaces:**
- Produces: three stable public asset URLs and package version `1.1.0`.

- [x] **Step 1: Verify `v1.0.0` and `codex/odysseus-v1.1` do not already exist.**
- [x] **Step 2: Tag the untouched starting commit `v1.0.0` and create branch `codex/odysseus-v1.1`.**
- [x] **Step 3: Compose the three assets from the approved source study and inspect each one.**
- [x] **Step 4: Copy final assets into `public/assets/` and convert to efficient WebP where needed.**
- [x] **Step 5: Change only the package version from `0.1.1` to `1.1.0`.**

### Task 1A: Replace concept art with authored archival collages

**Files:**
- Modify: `public/assets/odysseus-hero.webp`
- Modify: `public/assets/odysseus-underworld.webp`
- Modify: `public/assets/odysseus-homecoming.webp`

**Interfaces:**
- Preserves: the three stable public URLs and current dimensions.
- Consumes: public-domain Open Access photographs of Greek objects from The Metropolitan Museum of Art.

- [x] **Step 1: Replace every AI-generated pixel with a new ImageMagick-composed editorial collage; do not use generative fill or invented figures.**
- [x] **Step 2: Build the hero from the Mycenaean octopus jar and Cypriot ship model, with cold-black negative space, irregular wave/route marks, and one muted brick accent.**
- [x] **Step 3: Build the underworld image from a white-ground funerary lekythos as repeated, fading memory fragments above one blood-red ritual line.**
- [x] **Step 4: Build homecoming from the Odysseus/Penelope relief, the Odysseus archer vase image, and Athena's owl, using hard editorial crops rather than painterly synthesis.**
- [x] **Step 5: Preserve source boundaries: the Mycenaean object is era-near; the Attic and Cypriot objects are later visual reception. Bake no explanatory text into the images.**
- [x] **Step 6: Inspect each collage at full size and thumbnail size; verify sRGB WebP, exact dimensions, no obvious cutout halo, and a practical web payload.**

### Task 2: Define the page contract before production code

**Files:**
- Create: `tests/odysseus-homepage.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Test consumes: rendered source files and asserts the required narrative anchors, accessible labels, image alt text, and no stale violet-era copy.
- Page produces: semantic sections with ids `journey`, `memory`, `recognition`, and `invoke`.

- [x] **Step 1: Write a Node assert test that requires the four section ids, “The Long Return,” Penelope, Argos, Athena, Achilles, Agamemnon, the install command, all three asset paths, and rejects “Make it feel authored.”**
- [x] **Step 2: Run `node --test tests/odysseus-homepage.test.mjs` and verify it fails because the new page is absent.**
- [x] **Step 3: Replace `app/page.tsx` with the six-act Odysseus homepage, using the existing `CopyCommand` and `next/image`.**
- [x] **Step 4: Update `app/layout.tsx` metadata and font roles to GFS Didot, IBM Plex Sans, and IBM Plex Mono.**
- [x] **Step 5: Run the Node test and verify it passes.**

### Task 3: Build the visual and motion system

**Files:**
- Modify: `app/globals.css`
- Modify: `components/copy-command.tsx`
- Delete: `components/visual-plate.tsx`

**Interfaces:**
- CSS consumes: page class names and renders the cinematic-to-bone tonal arc, voyage path, weave fields, bowstring, responsive layout, focus, and reduced-motion states.
- Copy component produces: existing command-copy behavior with Odysseus button styling through class names only.

- [x] **Step 1: Add test assertions for a reduced-motion media query, visible focus styles, `.voyage-line`, and `.bow-string`; run and verify failure.**
- [x] **Step 2: Replace the violet design system in `app/globals.css` with the approved palette, type roles, layouts, and two-motion budget.**
- [x] **Step 3: Remove only obsolete visual-plate code and keep command copying native.**
- [x] **Step 4: Run the homepage test, `npm run typecheck`, and `npm run lint`; fix only observed failures.**

### Task 4: Make `artystic odysseus` reusable

**Files:**
- Modify: `skills/artystic/SKILL.md`
- Create: `skills/artystic/references/odysseus.md`
- Create: `skills/artystic/agents/openai.yaml`
- Modify: `tests/odysseus-homepage.test.mjs`

**Interfaces:**
- Core skill routes the exact theme phrase to `references/odysseus.md`.
- Theme reference provides narrative, tokens, imagery, component grammar, motion budget, refusal rules, source boundaries, and a completion checklist.

- [x] **Step 1: Add test assertions that the core skill routes “artystic odysseus,” the reference exists, and the reference contains the six emotional states and source-boundary rules; run and verify failure.**
- [x] **Step 2: Rewrite the core skill as a concise theme router plus universal Artystic critique loop.**
- [x] **Step 3: Add the Odysseus v1.1 reference from the completed research, without duplicating the full research dossier.**
- [x] **Step 4: Generate `agents/openai.yaml` with display name, short description, and a `$artystic` default prompt.**
- [x] **Step 5: Run the Node test and `quick_validate.py skills/artystic`; fix only observed failures.**

### Task 5: Verify twice and finish the release

**Files:**
- Modify only files implicated by failures.

**Interfaces:**
- Produces: verified desktop/mobile page, clean checks, valid skill, local v1.1 release commit and tag.

- [x] **Step 1: Run `npm run check`, `npm run build`, and `node --test tests/odysseus-homepage.test.mjs`.**
- [x] **Step 2: Inspect the page at 1440px and 390px, including navigation, cropping, hierarchy, horizontal overflow, focus, copy action, and reduced motion.**
- [x] **Step 3: Run the same automated checks again after visual fixes.**
- [x] **Step 4: Forward-test the skill on a fresh bounded theme request and review the raw result for routing and source discipline.**
- [ ] **Step 5: Commit the finished v1.1 work and tag it `v1.1.0`; do not push without a separate request.**
