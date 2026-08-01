import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

function extractBlock(source, marker) {
  const markerStart = source.indexOf(marker);
  assert.notEqual(markerStart, -1, `missing block for ${marker}`);

  const start = source.indexOf("{", markerStart + marker.length);
  assert.notEqual(start, -1, `missing block for ${marker}`);

  let depth = 1;
  for (let end = start + 1; end < source.length; end += 1) {
    if (source[end] === "{") depth += 1;
    if (source[end] === "}") depth -= 1;
    if (depth === 0) return source.slice(start + 1, end);
  }

  assert.fail(`unclosed block for ${marker}`);
}

const odysseusRoute = /exact phrase\s+`artystic odysseus`,\s+read\s+`references\/odysseus\.md`\s+in full\b/i;
const odysseusSourceContracts = [
  ["Homeric narrative", /\*\*Homeric narrative:\*\*[^\n]*textual story layer/i],
  ["Bronze Age material", /\*\*Bronze Age material:\*\*[^\n]*material culture[^\n]*not proof of a literal Homeric scene/i],
  ["later Greek visual reception", /\*\*Later Greek visual reception:\*\*[^\n]*later interpretations[^\n]*not documentary views of Troy/i],
  ["original modern composition", /\*\*Original modern composition:\*\*[^\n]*synthesize those layers[^\n]*modern cinema only as atmosphere[^\n]*never historical evidence/i],
  ["original modern composition film boundary", /refuse copied film assets[^\n]*trailer frames/i],
];

function assertOdysseusContracts(skill, reference) {
  assert.match(skill, odysseusRoute, "the exact Odysseus route must require its full reference");

  for (const [sourceLayer, contract] of odysseusSourceContracts) {
    assert.match(reference, contract, `missing source boundary: ${sourceLayer}`);
  }
}

test("Artystic routes the exact Odysseus theme to its complete contract", async () => {
  const skill = await readFile(new URL("../skills/artystic/SKILL.md", import.meta.url), "utf8");
  const reference = await readFile(new URL("../skills/artystic/references/odysseus.md", import.meta.url), "utf8");
  assertOdysseusContracts(skill, reference);

  for (const emotion of ["survivor's guilt", "revenge", "responsibility", "grief", "pain", "anger"]) {
    assert.match(reference, new RegExp(emotion.replace("'", "['’]"), "i"), `missing ${emotion}`);
  }

  assert.match(reference, /modern interpretive lens[^\n]*never[^\n]*Homeric diagnosis/i);
});

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

  const recognitionSection = page.match(/<section id=["']recognition["'][\s\S]*?(?=<section id=["']invoke["'])/)?.[0] ?? "";
  assert.ok(recognitionSection, "missing #recognition");
  assert.doesNotMatch(recognitionSection, /recognition-card__mark|<article[^>]*>\s*<p\b[^>]*>[\s\S]*?<\/p>\s*<h3\b/s, "recognition card headings must stand without micro-eyebrow labels");
  assert.doesNotMatch(page, /Odysseus · Νόστος/, "the hero must not include a kicker");

  assert.match(layout, /GFS_Didot/);
  assert.match(layout, /IBM_Plex_Sans/);
  assert.match(layout, /IBM_Plex_Mono/);
  assert.match(layout, /The Long Return/);
});

test("the visual system keeps its motion and input affordance contracts", () => {
  const focusRule = extractBlock(stylesheet, ":focus-visible");
  const outline = focusRule.match(/(?:^|;)\s*outline\s*:\s*([^;}]+)/i)?.[1].replace(/\s*!important\s*$/i, "").trim();
  assert.ok(outline && !/^(?:none|0(?:\.0+)?(?:[a-z%]+)?)$/i.test(outline), ":focus-visible must keep a visible outline");

  const reducedMotion = extractBlock(stylesheet, "@media (prefers-reduced-motion: reduce)");
  const rules = [...reducedMotion.matchAll(/([^{}]+)\{([^{}]*)\}/g)];

  for (const target of [".voyage-line", ".bow-string"]) {
    assert.ok(
      rules.some(([, selectors, declarations]) =>
        selectors.split(",").map((selector) => selector.trim()).includes(target)
        && /\banimation(?:-name)?\s*:\s*none\b/i.test(declarations)),
      `${target} must disable animation for reduced motion`,
    );
  }
});
