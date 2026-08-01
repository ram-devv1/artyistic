import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

test("the homepage source declares the complete Long Return contract", () => {
  assert.match(page, /The Long Return/);
  assert.equal(page.match(/<section\b/g)?.length, 6, "expected six narrative acts");

  for (const id of ["journey", "memory", "recognition", "invoke"]) {
    assert.match(page, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }

  for (const name of ["Penelope", "Argos", "Athena", "Achilles", "Agamemnon"]) {
    assert.match(page, new RegExp(`\\b${name}\\b`), `missing ${name}`);
  }

  assert.match(page, /npx artystic/);
  assert.match(page, /import \{ CopyCommand \} from ["']@\/components\/copy-command["']/);
  assert.match(page, /<CopyCommand command=["']npx artystic["'] \/>/);
  assert.match(page, /aria-label=["']Primary navigation["']/);
  assert.match(page, /aria-label=["']Odysseus voyage index["']/);

  const images = [
    ["/assets/odysseus-hero.webp", "Storm-dark Aegean voyage collage tracing the long return to Ithaca"],
    ["/assets/odysseus-underworld.webp", "Underworld remembrance collage of sacrifice, memory, and counsel"],
    ["/assets/odysseus-homecoming.webp", "Ithaca recognition still life with mist, woven thread, and olive wood"],
  ];

  for (const [src, alt] of images) {
    assert.match(page, new RegExp(src.replaceAll("/", "\\/")), `missing ${src}`);
    assert.ok(page.includes(`alt="${alt}"`), `missing meaningful alt text for ${src}`);
  }
  assert.equal(page.match(/\/assets\/odysseus-[^"']+\.webp/g)?.length, 3, "expected exactly three Odysseus images");

  assert.match(page, /Homeric material/);
  assert.match(page, /later visual reception/i);
  assert.match(page, /original modern interpretation/i);
  assert.doesNotMatch(page, /Make it feel authored\./);
  assert.doesNotMatch(`${page}\n${layout}`, /[—–]/, "visible source copy must not use em or en dashes");
  assert.doesNotMatch(page, /Act [IVX]+/, "acts must remain semantic rather than visible labels");
  assert.doesNotMatch(page, /0[1-6] [·/]/, "narrative order must not appear as decorative numbering");
  assert.doesNotMatch(page, />[^<{]*\bv(?:ersion)?\s*\d+(?:\.\d+)+[^<{]*</i, "version labels must not be visible");
  assert.doesNotMatch(page, />[^<{]*\b(?:scroll|keep scrolling)\b[^<{]*</i, "scroll cues must not be visible");

  const cunningSection = page.match(/<section id=["']cunning["'][\s\S]*?(?=<section id=["']memory["'])/)?.[0] ?? "";
  assert.ok(cunningSection, "missing #cunning");
  assert.doesNotMatch(cunningSection, /cunning-card__mark|<article[^>]*>\s*<p[^>]*\buppercase\b/s, "cunning cards must not repeat micro-eyebrow labels");
  assert.doesNotMatch(page, /Odysseus · Νόστος/, "the hero must not include a kicker");

  assert.match(layout, /GFS_Didot/);
  assert.match(layout, /IBM_Plex_Sans/);
  assert.match(layout, /IBM_Plex_Mono/);
  assert.match(layout, /The Long Return/);
});
