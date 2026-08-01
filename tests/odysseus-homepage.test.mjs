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

  for (const id of ["journey", "sea", "cunning", "memory", "recognition", "invoke"]) {
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
  assert.match(page, /href=["']#invoke["'][^>]*className=["'][^"']*\bjourney-cta\b/i);
  assert.match(page, /className=["'][^"']*\bjourney-meta\b/i);

  const images = [
    ["/assets/odysseus-hero.webp", "Odysseus hesitates beside his war-worn ship as Troy burns across the dark water"],
    ["/assets/odysseus-underworld.webp", "Odysseus kneels beside the blood offering while the shades gather in a sea cave"],
    ["/assets/odysseus-homecoming.webp", "The old dog Argos recognizes a disguised Odysseus at the threshold of his Ithacan house"],
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

  const invokeSection = page.match(/<section id=["']invoke["'][\s\S]*?<\/section>/)?.[0] ?? "";
  assert.equal(invokeSection.match(/className=["']axe-aperture["']/g)?.length, 12, "the final bow must align with twelve axe apertures");
  assert.doesNotMatch(invokeSection, /<pre[^>]*\boverflow-x-auto\b/i, "the short command must not render an overflow scrollbar");

  assert.match(layout, /GFS_Didot/);
  assert.match(layout, /IBM_Plex_Sans/);
  assert.match(layout, /IBM_Plex_Mono/);
  assert.match(layout, /The Long Return/);
});

test("the hero has scroll motion, masked title lines, and reduced-motion final states", () => {
  const journey = page.match(/<section\b[^>]*id=["']journey["'][\s\S]*?<\/section>/)?.[0] ?? "";

  assert.match(page, /^"use client";/);
  assert.match(page, /import \{ animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform \} from ["']motion\/react["']/);
  assert.match(page, /const heroRef = useRef<HTMLElement>\(null\)/);
  assert.match(page, /useScroll\(\{\s*target: heroRef,\s*offset: \[["']start start["'], ["']end start["']\],?\s*\}\)/);
  assert.match(page, /useTransform\(scrollYProgress, \[0, 1\], \[["']0%["'], ["']12%["']\]\)/);
  assert.match(page, /useTransform\(scrollYProgress, \[0, 0\.78\], \[1, 0\]\)/);
  assert.match(page, /const reducedMotion = useReducedMotion\(\)/);
  assert.doesNotMatch(page, /const staticHero(?:Y|Opacity)\b/);
  assert.match(journey, /style=\{\{ y: heroY \}\}/);
  assert.match(journey, /style=\{\{ opacity: heroOpacity \}\}/);

  assert.equal(journey.match(/className=["']hero-word["']/g)?.length, 3, "the title must have three mask lines");
  assert.equal(journey.match(/<motion\.span\b/g)?.length, 3, "each title line must use Motion");
  assert.match(journey, /whileInView=/);
  assert.doesNotMatch(journey, /reducedMotion\s*\?/, "hero Motion props must match between SSR and the first client render");
  assert.equal(journey.match(/initial=\{\{ y: ["']112%["'] \}\}/g)?.length, 3);
  assert.match(journey, /className=["']hero-plate-wrap["']/);
  assert.match(journey, /className=["'][^"']*\bhero-plate\b/);
  assert.match(journey, /className=["'][^"']*\bhero-fade\b/);

  for (const hook of ["journey-cta__label", "journey-cta__arrow", "journey-meta", "voyage-index", "voyage-index__chevron", "voyage-index__item--active"]) {
    assert.match(journey, new RegExp(`\\b${hook}\\b`), `missing hero interaction hook: ${hook}`);
  }

  assert.match(stylesheet, /\.hero-plate\s*\{[^}]*animation\s*:\s*hero-ken-burns\s+22s\s+ease-in-out\s+infinite\s+alternate/i);
  assert.match(stylesheet, /@keyframes\s+hero-ken-burns\b/);
  assert.match(stylesheet, /\.journey-cta:hover\s+\.journey-cta__arrow\s*\{/);
  assert.match(stylesheet, /\.journey-cta:hover\s+\.journey-cta__label::after\s*\{/);
  assert.match(stylesheet, /\.journey-meta:hover::after\s*\{/);
  assert.match(stylesheet, /\.voyage-index\s+a:hover::before\s*\{/);
  assert.match(stylesheet, /\.voyage-index\s+a:hover\s+\.voyage-index__chevron\s*\{/);

  const reducedMotion = extractBlock(stylesheet, "@media (prefers-reduced-motion: reduce)");
  assert.match(reducedMotion, /\.hero-plate[\s\S]*?animation\s*:\s*none/);
  assert.match(reducedMotion, /\.hero-word__line[\s\S]*?transform\s*:\s*none\s*!important/);
});

test("page-level motion is hydration-safe and static for reduced motion", async () => {
  const scrollProgress = await readFile(new URL("../components/scroll-progress.tsx", import.meta.url), "utf8");
  const journey = page.match(/<section\b[^>]*id=["']journey["'][\s\S]*?<\/section>/)?.[0] ?? "";

  assert.doesNotMatch(journey, /reducedMotion\s*\?/, "hero Motion props must match between SSR and the first client render");
  assert.doesNotMatch(scrollProgress, /\b(?:useReducedMotion|useMotionValue|reducedMotion|finalScaleX)\b/, "progress Motion props must match between SSR and the first client render");
  assert.match(scrollProgress, /style=\{\{ scaleX \}\}/);

  const reducedMotion = extractBlock(stylesheet, "@media (prefers-reduced-motion: reduce)");
  const reducedMotionFor = (target) => [...reducedMotion.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, selectors]) => selectors.split(",").map((selector) => selector.trim()).includes(target))
    .map(([, , declarations]) => declarations)
    .join("\n");

  assert.match(reducedMotionFor(".scroll-progress"), /\btransform\s*:\s*scaleX\(1\)\s*!important\b/i, "reduced motion must keep progress static and complete");
  assert.match(reducedMotionFor(".hero-plate-wrap"), /\btransform\s*:\s*none\s*!important\b/i, "reduced motion must keep hero art passive");
  assert.match(reducedMotionFor(".hero-fade"), /\bopacity\s*:\s*1\s*!important\b/i, "reduced motion must keep hero content visible");
  assert.match(reducedMotionFor(".hero-word__line"), /\btransform\s*:\s*none\s*!important\b/i, "reduced motion must reveal every title line");
});

test("the middle acts have distinct reduced-motion-safe choreography", () => {
  const section = (id) => page.match(new RegExp(`<section\\b[^>]*id=["']${id}["'][\\s\\S]*?<\\/section>`))?.[0] ?? "";
  const sea = section("sea");
  const cunning = section("cunning");
  const memory = section("memory");
  const recognition = section("recognition");
  const taskFiveSections = `${sea}\n${cunning}\n${memory}\n${recognition}`;

  assert.match(page, /const revealViewport = \{ once: true, amount: 0\.3 \}/);
  assert.doesNotMatch(taskFiveSections, /reducedMotion\s*\?/, "Task 5 Motion props must match between SSR and the first client render");

  assert.doesNotMatch(page, /\bseaRef\b/, "the sea section must not keep an unused ref");
  assert.match(sea, /<motion\.span\b[^>]*className=["']section-title-mask__line["']/);
  assert.match(sea, /className=["']sea-route["']/);
  assert.match(sea, /className=["']ship-marker["']/);
  assert.match(sea, /initial=\{\{ offsetDistance: ["']0%["'] \}\}/);
  assert.match(sea, /whileInView=\{\{ offsetDistance: ["']100%["'] \}\}/);
  assert.equal(sea.match(/<motion\.li\b/g)?.length, 6, "all six losses must rise independently");
  assert.equal(sea.match(/\bsea-step\b/g)?.length, 6, "all six losses need the interaction hook");
  assert.equal(sea.match(/\bsea-step__rule\b/g)?.length, 6, "all six losses need a drawing rule");
  assert.equal(sea.match(/whileHover=\{\{ x: 4 \}\}/g)?.length, 6, "sea losses must shift exactly 4px on hover");

  assert.equal(cunning.match(/<motion\.article\b/g)?.length, 4, "all four cunning cards must reveal");
  assert.equal(cunning.match(/\bcunning-card__rule\b/g)?.length, 4, "all four cunning borders must draw");
  assert.equal(cunning.match(/x: -32/g)?.length, 2, "two cunning cards must enter from the left");
  assert.equal(cunning.match(/x: 32/g)?.length, 2, "two cunning cards must enter from the right");
  assert.equal(cunning.match(/whileHover=\{\{ y: -4 \}\}/g)?.length, 4, "cunning cards must lift exactly 4px");

  assert.match(page, /useScroll\(\{\s*target: memoryRef,\s*offset: \[["']start end["'], ["']end start["']\],?\s*\}\)/);
  assert.match(page, /useTransform\(memoryScrollYProgress, \[0, 1\], \[["']-4%["'], ["']4%["']\]\)/);
  assert.match(memory, /className=["']memory-plate["']/);
  assert.match(memory, /style=\{\{ y: memoryY, scale: 1\.08 \}\}/);
  assert.equal(memory.match(/\bmemory-line\b/g)?.length, 2, "the memory heading and introduction must reveal line by line");
  assert.equal(memory.match(/<motion\.article\b/g)?.length, 2, "both named shades must rise");
  assert.equal(memory.match(/\bmemory-voice__rule\b/g)?.length, 2, "both shade rules must draw");

  assert.match(page, /useScroll\(\{\s*target: recognitionRef,\s*offset: \[["']start end["'], ["']end start["']\],?\s*\}\)/);
  assert.match(recognition, /className=["']recognition-weave["']/);
  assert.match(recognition, /className=["'][^"']*\brv-clip\b[^"']*\brecognition-plate\b/);
  assert.match(recognition, /clipPath: ["']inset\(0 0 0 100%\)["']/);
  assert.equal(recognition.match(/<motion\.article\b/g)?.length, 3, "all three signs must stagger in");
  assert.equal(recognition.match(/<RecognitionIndex\b/g)?.length, 3, "all three signs must count their index");
  for (const value of [1, 2, 3]) assert.match(recognition, new RegExp(`<RecognitionIndex value=\\{${value}\\}`));

  const tickerCopy = "Troy / The cave / Almost home / Six taken / One hull / One survivor / Ithaca";
  assert.ok(page.includes(`const tickerCopy = "${tickerCopy}"`), "ticker copy must stay exact");
  const ticker = page.match(/<div\b[^>]*className=["']ticker["'][^>]*>[\s\S]*?<\/div>/)?.[0] ?? "";
  assert.ok(ticker, "missing ticker");
  assert.match(ticker, /aria-hidden=["']true["']/);
  assert.equal(page.match(/className=["']ticker["']/g)?.length, 1, "expected exactly one decorative ticker");

  assert.match(stylesheet, /\.ship-marker\s*\{[^}]*offset-path\s*:/s);
  assert.match(stylesheet, /\.sea-step:hover\s+\.sea-step__label\s*\{[^}]*color\s*:\s*var\(--brick\)/s);
  assert.match(stylesheet, /\.sea-step:hover::before\s*\{[^}]*scaleY\(1\)/s);
  assert.match(stylesheet, /\.cunning-card:hover\s+h3::after\s*\{[^}]*scaleX\(1\)/s);
  assert.match(stylesheet, /\.ticker\s*\{[^}]*animation\s*:\s*ticker-scroll\s+36s\s+linear\s+infinite/s);

  const reducedMotion = extractBlock(stylesheet, "@media (prefers-reduced-motion: reduce)");
  const reducedMotionFor = (target) => [...reducedMotion.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, selectors]) => selectors.split(",").map((selector) => selector.trim()).includes(target))
    .map(([, , declarations]) => declarations)
    .join("\n");

  for (const target of [".cunning-card", ".memory-line", ".memory-voice", ".recognition-sign", ".rv-stagger > *"]) {
    assert.match(reducedMotionFor(target), /\bopacity\s*:\s*1\s*!important\b/i, `${target} must override inline hidden opacity`);
  }
  for (const target of [".section-title-mask__line", ".draw-line", ".cunning-card", ".cunning-card__rule", ".memory-plate", ".memory-line", ".memory-voice", ".recognition-sign", ".recognition-weave", ".rv-stagger > *"]) {
    assert.match(reducedMotionFor(target), /\btransform\s*:\s*none\s*!important\b/i, `${target} must override inline transforms`);
  }
  assert.match(reducedMotionFor(".ship-marker"), /\boffset-distance\s*:\s*100%\s*!important\b/i);
  assert.match(reducedMotionFor(".recognition-plate"), /\bclip-path\s*:\s*inset\(0\)\s*!important\b/i);
  assert.match(reducedMotionFor(".memory-line"), /\bclip-path\s*:\s*inset\(0\)\s*!important\b/i);

  const seaRuleFinal = reducedMotionFor(".sea-step::before");
  assert.match(seaRuleFinal, /\btransition\s*:\s*none\b/i);
  assert.match(seaRuleFinal, /\btransform\s*:\s*scaleY\(1\)/i);
  assert.match(reducedMotionFor(".sea-step__label"), /\btransition\s*:\s*none\b/i);
  const cunningUnderlineFinal = reducedMotionFor(".cunning-card h3::after");
  assert.match(cunningUnderlineFinal, /\btransition\s*:\s*none\b/i);
  assert.match(cunningUnderlineFinal, /\btransform\s*:\s*scaleX\(1\)/i);

  const baseStyles = stylesheet.slice(0, stylesheet.indexOf("@media (prefers-reduced-motion: reduce)"));
  assert.doesNotMatch(baseStyles, /\.section-title-mask__line\s*\{[^}]*\bwill-change\s*:/s);
  assert.doesNotMatch(baseStyles, /\.ship-marker\s*\{[^}]*\bwill-change\s*:/s);
  assert.doesNotMatch(baseStyles, /\.memory-line\s*,\s*\.memory-voice\s*\{[^}]*\bwill-change\s*:/s);
});

test("the release package includes only the required motion runtimes", () => {
  assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
    "@heroicons/react",
    "lenis",
    "motion",
    "next",
    "react",
    "react-dom",
  ]);
  assert.match(packageJson.dependencies.motion, /^\^12(?:\.|$)/);
  assert.match(packageJson.dependencies.lenis, /^\^1(?:\.|$)/);
});

test("the layout wires the reduced-motion-safe motion foundation", async () => {
  const [motionProvider, lenisProvider, scrollProgress, grain] = await Promise.all([
    readFile(new URL("../app/motion-provider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/lenis-provider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/scroll-progress.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/grain.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(motionProvider, /import \{ MotionConfig \} from ["']motion\/react["']/);
  assert.match(motionProvider, /<MotionConfig reducedMotion=["']user["']>/);
  assert.match(lenisProvider, /matchMedia\(["']\(prefers-reduced-motion: reduce\)["']\)/);
  assert.match(lenisProvider, /new Lenis\(/);
  assert.match(lenisProvider, /requestAnimationFrame\(/);
  assert.match(lenisProvider, /cancelAnimationFrame\(/);
  assert.match(scrollProgress, /useScroll\(\)/);
  assert.match(scrollProgress, /useSpring\(scrollYProgress,/);
  assert.doesNotMatch(scrollProgress, /\b(?:useReducedMotion|useMotionValue|reducedMotion|finalScaleX)\b/);
  assert.match(scrollProgress, /style=\{\{ scaleX \}\}/);
  assert.match(scrollProgress, /var\(--brick\)/);
  assert.match(scrollProgress, /var\(--glint\)/);
  const headerLayer = page.match(/<header[^>]*className=["'][^"']*\bz-(\d+)\b/)?.[1];
  const progressLayer = scrollProgress.match(/className=["'][^"']*\bz-(\d+)\b/)?.[1];
  assert.ok(headerLayer && progressLayer, "header and scroll progress must declare z-index layers");
  assert.ok(Number(progressLayer) < Number(headerLayer), `scroll progress z-${progressLayer} must remain below header controls z-${headerLayer}`);
  assert.doesNotMatch(grain, /use client/);
  assert.match(grain, /feTurbulence/);
  assert.match(grain, /pointer-events-none/);

  for (const component of ["MotionProvider", "LenisProvider", "ScrollProgress", "Grain"]) {
    assert.match(layout, new RegExp(`import \\{ ${component} \\}`), `layout must import ${component}`);
    assert.match(layout, new RegExp(`<${component}`), `layout must render ${component}`);
  }
});

test("the visual system keeps its motion and input affordance contracts", () => {
  const rootRule = extractBlock(stylesheet, ":root");
  for (const token of ["dur-1", "dur-2", "dur-3", "dur-4", "ease-enter", "ease-exit", "stagger", "rise", "clip-reveal"]) {
    assert.match(rootRule, new RegExp(`--${token}\\s*:`), `missing --${token} motion token`);
  }

  for (const keyframe of ["rise-in", "mask-in", "clip-in", "draw-line", "grain-flicker", "ticker-scroll", "wave-drift", "bow-tension", "caret-blink", "arrow-slide"]) {
    assert.match(stylesheet, new RegExp(`@keyframes\\s+${keyframe}\\b`), `missing ${keyframe} keyframes`);
  }

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

  assert.doesNotMatch(stylesheet, /#journey\s+a\[href=["']?#invoke/i, "voyage links must not inherit primary CTA styling");
  const journeyCtaRule = extractBlock(stylesheet, ".journey-cta");
  assert.match(journeyCtaRule, /background\s*:\s*var\(--bone\)/i);

  const journeyMetaRule = extractBlock(stylesheet, ".journey-meta");
  assert.match(journeyMetaRule, /color\s*:\s*var\(--bone\)/i);

  const voyageIndexRule = extractBlock(stylesheet, '#journey nav[aria-label="Odysseus voyage index"]');
  assert.match(voyageIndexRule, /background\s*:\s*rgba\(9,\s*13,\s*15,\s*0\.[89]\d*\)/i);

  const axeRegisterRule = extractBlock(stylesheet, ".axe-register");
  assert.match(axeRegisterRule, /grid-template-columns\s*:\s*repeat\(12,/i);

  const reducedMotion = extractBlock(stylesheet, "@media (prefers-reduced-motion: reduce)");
  const rules = [...reducedMotion.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  const reducedMotionFor = (target) => rules
    .filter(([, selectors]) => selectors.split(",").map((selector) => selector.trim()).includes(target))
    .map(([, , declarations]) => declarations)
    .join("\n");

  for (const target of [".voyage-line", ".bow-string", ".grain", ".ticker", ".sea-wave", ".stat", ".rv", ".rv-line", ".rv-clip", ".rv-stagger > *"]) {
    const finalState = reducedMotionFor(target);
    assert.match(finalState, /\banimation(?:-name)?\s*:\s*none\b/i, `${target} must disable animation for reduced motion`);
    assert.match(finalState, /\btransform\s*:\s*none\b/i, `${target} must remove transforms for reduced motion`);
  }

  for (const target of [".stat", ".rv", ".rv-stagger > *"]) {
    assert.match(reducedMotionFor(target), /\bopacity\s*:\s*1\b/i, `${target} must remain visible for reduced motion`);
  }
  assert.match(reducedMotionFor(".rv-clip"), /\bclip-path\s*:\s*inset\(0\)/i, ".rv-clip must reveal its full content for reduced motion");
});

test("the mobile layout keeps recognition art and primary navigation visible", () => {
  const mobile = extractBlock(stylesheet, "@media (max-width: 767px)");
  const recognitionGrid = extractBlock(mobile, "#recognition > div > div:first-child");
  assert.match(recognitionGrid, /grid-template-columns\s*:\s*minmax\(0,\s*1fr\)\s*!important/i);

  const mobileAxeRegister = extractBlock(mobile, ".axe-register");
  assert.match(mobileAxeRegister, /grid-template-columns\s*:\s*repeat\(12,/i);

  const compactNavigation = extractBlock(mobile, "header nav a:nth-child(2)");
  assert.match(compactNavigation, /display\s*:\s*none\b/i);
  assert.match(mobile, /header nav a:nth-child\(2\)\s*,\s*header nav a:nth-child\(3\)/i);
});

test("the release package exposes the production build", () => {
  assert.equal(packageJson.scripts.build, "next build");
});

test("the narrative asset manifest records the production boundary", async () => {
  const manifest = JSON.parse(
    await readFile(new URL("../public/assets/odysseus-sources.json", import.meta.url), "utf8"),
  );

  assert.equal(manifest.schemaVersion, 3);
  assert.equal(manifest.provenance.mode, "curated public-domain collage");
  assert.equal(manifest.provenance.thirdPartyVisualPixels, true);
  assert.equal(manifest.provenance.filmAssets, false);
  assert.equal(manifest.assets.length, 3, "expected one production record per narrative tableau");

  for (const asset of manifest.assets) {
    assert.match(asset.asset, /^\/assets\/odysseus-(?:hero|underworld|homecoming)\.webp$/);
    assert.ok(asset.storyBeat && asset.compositionNote, `incomplete record for ${asset.asset}`);
    assert.ok(Array.isArray(asset.objects) && asset.objects.length > 0, `missing credited source objects for ${asset.asset}`);
    for (const object of asset.objects) {
      for (const field of ["title", "accessionNumber", "objectDate", "culture", "creditLine", "sourceUrl"]) {
        assert.ok(object[field], `missing ${field} for a source object in ${asset.asset}`);
      }
      assert.match(object.sourceUrl, /^https:\/\//);
      assert.equal(object.license, "CC0");
    }
    assert.ok(asset.output.width > 0 && asset.output.height > 0);
    assert.equal(asset.output.format, "WebP");
  }
});

test("the shared motion and imagery languages lock reusable contracts", async () => {
  const [motionLanguage, imageryLanguage] = await Promise.all([
    readFile(new URL("../skills/artystic/references/motion-language.md", import.meta.url), "utf8"),
    readFile(new URL("../skills/artystic/references/imagery-language.md", import.meta.url), "utf8"),
  ]);

  for (const duration of [180, 320, 560, 900]) {
    assert.match(motionLanguage, new RegExp(`\\b${duration}\\s*ms\\b`), `missing ${duration} ms motion token`);
  }
  assert.match(motionLanguage, /motion\/react/);
  assert.match(motionLanguage, /lenis/i);
  assert.match(motionLanguage, /MotionConfig[^\n]*reducedMotion=["'`]user["'`]/);
  assert.match(motionLanguage, /prefers-reduced-motion/);

  assert.match(imageryLanguage, /verified public-domain museum objects/i);
  assert.match(imageryLanguage, /schema v3/i);
  assert.match(imageryLanguage, /thirdPartyVisualPixels[^\n]*true/);
  for (const field of ["title", "accessionNumber", "objectDate", "culture", "creditLine", "sourceUrl", "license"]) {
    assert.match(imageryLanguage, new RegExp(`\\b${field}\\b`), `imagery schema must document ${field}`);
  }
});

test("the Odysseus reference defines motion per act", async () => {
  const reference = await readFile(new URL("../skills/artystic/references/odysseus.md", import.meta.url), "utf8");
  const motionTable = reference.match(
    /\|\s*Act\s*\|\s*Primary animation\s*\|\s*System used\s*\|\s*Reduced-motion final state\s*\|[\s\S]*?(?=\n## |$)/i,
  )?.[0] ?? "";

  assert.ok(motionTable, "missing per-act motion table");
  for (const act of ["After Troy", "The sea takes the fleet", "Cunning under pressure", "The dead speak", "Ithaca does not recognize him", "The bow / the bed / peace"]) {
    assert.match(motionTable, new RegExp(act.replaceAll("/", "\\/"), "i"), `missing motion contract for ${act}`);
  }
  assert.doesNotMatch(reference, /exactly two meaningful motion moments/i);
});
