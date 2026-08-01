import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const stylesheet = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

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
  assert.match(reference, /draw one voyage route[^\n]*sea passage/i);
  assert.match(reference, /tighten the final bowstring[^\n]*invocation/i);
  assert.doesNotMatch(reference, /drift the hero collage/i, "the reusable motion contract must match the shipped route and bowstring pair");
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
    ["/assets/odysseus-homecoming.webp", "Archival collage of Odysseus returning to Penelope with the archer and Athena's owl"],
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
  const htmlRule = extractBlock(stylesheet, "html");
  assert.match(htmlRule, /overflow-x\s*:\s*(?:hidden|clip)\b/i);

  const serifFontRule = extractBlock(stylesheet, String.raw`.font-\[var\(--font-serif\)\]`);
  assert.match(serifFontRule, /font-family\s*:\s*var\(--font-serif\),\s*serif\b/i);

  const monoFontRule = extractBlock(stylesheet, String.raw`.font-\[var\(--font-mono\)\]`);
  assert.match(monoFontRule, /font-family\s*:\s*var\(--font-mono\),\s*monospace\b/i);

  const focusRule = extractBlock(stylesheet, ":focus-visible");
  const outline = focusRule.match(/(?:^|;)\s*outline\s*:\s*([^;}]+)/i)?.[1].replace(/\s*!important\s*$/i, "").trim();
  assert.ok(outline && !/^(?:none|0(?:\.0+)?(?:[a-z%]+)?)$/i.test(outline), ":focus-visible must keep a visible outline");

  const voyageLinkRule = extractBlock(stylesheet, '#journey nav[aria-label="Odysseus voyage index"] a');
  assert.match(voyageLinkRule, /min-height\s*:\s*44px\b/i);
  assert.match(voyageLinkRule, /min-width\s*:\s*44px\b/i);

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

test("the mobile layout keeps recognition art and primary navigation visible", () => {
  const mobile = extractBlock(stylesheet, "@media (max-width: 767px)");
  const recognitionGrid = extractBlock(mobile, "#recognition > div > div:first-child");
  assert.match(recognitionGrid, /grid-template-columns\s*:\s*minmax\(0,\s*1fr\)\s*!important/i);

  const compactNavigation = extractBlock(mobile, "header nav a:nth-child(2)");
  assert.match(compactNavigation, /display\s*:\s*none\b/i);
  assert.match(mobile, /header nav a:nth-child\(2\)\s*,\s*header nav a:nth-child\(3\)/i);
});

test("the release package exposes the production build", () => {
  assert.equal(packageJson.scripts.build, "next build");
});

test("the collage asset manifest preserves exact public-domain provenance", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../public/assets/odysseus-sources.json", import.meta.url), "utf8"),
  );

  assert.equal(manifest.license, "Creative Commons Zero (CC0)");
  assert.equal(manifest.providerPolicy, "https://www.metmuseum.org/hubs/open-access");
  assert.equal(manifest.assets.length, 3, "expected one provenance record per collage");

  const sources = manifest.assets.flatMap((asset) => asset.sources);
  const expectedObjectIds = [241307, 247458, 251485, 253053, 254272, 254779];
  assert.deepEqual(sources.map((source) => source.objectId).sort(), expectedObjectIds);

  for (const source of sources) {
    assert.equal(source.institution, "The Metropolitan Museum of Art");
    assert.equal(source.publicDomain, true);
    assert.equal(source.sourcePage, `https://www.metmuseum.org/art/collection/search/${source.objectId}`);
    assert.match(source.sourceImage, /^https:\/\/images\.metmuseum\.org\/CRDImages\/gr\/original\/.+\.jpg$/i);
    assert.ok(source.accessionNumber && source.creditLine, `missing credit record for Met ${source.objectId}`);
  }
});
