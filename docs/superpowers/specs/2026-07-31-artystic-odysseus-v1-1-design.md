# Artystic Odysseus v1.1 Design

## Goal

Turn Artystic into a reusable themed design skill and rebuild its homepage as the first theme: `artystic odysseus`. The result must feel like an immersive return from Troy to Ithaca, while remaining a legible, accessible homepage for the skill.

## Core thesis

Odysseus is not a generic victorious Greek hero. He is a king returning from mass violence after twenty years, carrying grief, command responsibility, cunning, pride, rage, and the dead. The emotional arc is *nostos*: the wounded return home.

The site treats survivor's guilt as a modern interpretive lens supported by Homer's concealed tears, sole survival, and impossible choices—not as a diagnosis the poem makes.

## Narrative structure

1. **After Troy** — victory appears as smoke, burnt bronze, and names that do not return.
2. **The sea takes the fleet** — the ten-year voyage is a route of losses, not a sightseeing map.
3. **Cunning under pressure** — Nobody, the ram, the mast, the cup, and the choice at Scylla.
4. **The dead speak** — Achilles rejects dead glory; Agamemnon warns that homecoming can murder a king.
5. **Ithaca does not recognize him** — disguise, Argos, scar, Penelope's weaving, and Athena's mist.
6. **The bow / the bed / peace** — vengeance peaks, recognition is rooted in the olive bed, and Athena ends recurrence.

## Homepage information architecture

- Compact sticky navigation: Artystic / Odysseus, Journey, Memory, Recognition, Invoke.
- Full-viewport hero: archival ship-and-octopus collage, theme name, one thesis line, invoke CTA, restrained voyage index.
- “The cost of return”: Troy-to-Ithaca loss register with the voyage reduced to six emotional stations.
- “The sea remembers”: scroll-led route line and large editorial image fields.
- “The dead speak”: Achilles and Agamemnon as shadows, not competing protagonists.
- “Signs of home”: Penelope, Argos, Athena, scar, loom, and olive-root recognition.
- “String the bow”: Artystic method translated into reusable theme tokens and the install command.
- Source note: distinguish Homer, surviving visual reception, Bronze Age material culture, and the modern film layer.

## Visual system

- **Structural reference:** Netflix — one dominant cinematic image and one clear action.
- **Personality reference:** TIDAL — art owns the surface; chrome recedes.
- **Interaction reference:** Opal — atmospheric progress and quiet reveals.
- **Historical synthesis:** Bronze Age material weight + Geometric/Archaic graphic discipline + modern cinematic scale.
- **Display type:** GFS Didot, including real Greek labels; never faux-Greek character substitution.
- **Readable type:** IBM Plex Sans.
- **Metadata:** IBM Plex Mono.
- **Palette:** hull `#090D0F`, deep sea `#173039`, bone `#D8CCB4`, terracotta `#A24A31`, bronze `#806230`, muted purple `#53364C`, withheld blood `#7B211F`, Athena glint `#C8B16A`.
- **Materials:** charred timber, salt, rope, linen, wool, dark bronze, terracotta, iron, bone, and one restrained gold glint.
- **Shape:** low-radius solid buttons, bowstring rules, vase-band dividers, no pill soup, no generic card grid.

## Motion budget

Only two signature moments:

1. A single voyage route draws across the sea passage.
2. The final bowstring tightens once at the invocation.

Use native CSS/DOM primitives because they already cover the requirement; do not add Anime.js or a video runtime. Respect `prefers-reduced-motion` and keep all meaning visible without animation.

## Asset plan

The final raster work must not resemble AI concept painting. Use authored editorial collage built from public-domain museum photography, decisive cropping, duotone separation, restrained ink/grain, and original cartographic marks. Do not invent faces, bodies, costumes, or cinematic frames. Keep the historical layers legible: Mycenaean material culture is era-near; later Attic and Cypriot objects are reception, not documentary evidence for the Trojan War.

- Compose three original raster works: `odysseus-hero.webp`, `odysseus-underworld.webp`, and `odysseus-homecoming.webp`.
- Avoid actor likenesses, movie frames, copied costumes, copied title treatment, and text inside imagery.
- Build the route, bow, axe apertures, weave, wave, owl, and artifact markers as lightweight HTML/CSS/SVG.

## Reusable skill architecture

- Keep `skills/artystic/SKILL.md` as the concise core workflow.
- Add `skills/artystic/references/odysseus.md` as the v1.1 theme contract.
- When a request contains “artystic odysseus,” load that reference and apply its narrative, palette, typography, imagery, copy, motion, and refusal rules.
- Future characters become sibling references (`achilles.md`, `hades.md`, `agamemnon.md`) without changing the core workflow.
- Add `skills/artystic/agents/openai.yaml` so the skill is discoverable and has a useful default prompt.

## Responsive and accessibility constraints

- Preserve the narrative order on mobile; do not reduce it to decorative crops.
- Minimum 16px body text, 44px interactive targets, visible focus, semantic landmarks, and WCAG AA contrast.
- No critical text embedded in images.
- Use responsive image sizing and avoid layout shift.
- With reduced motion, show the complete route and final states immediately.

## Versioning

- Preserve the current repository head as `v1.0.0`.
- Ship the Odysseus homepage and theme contract as package version `1.1.0` on branch `codex/odysseus-v1.1`.
