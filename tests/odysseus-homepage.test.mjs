import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const skill = await readFile(new URL("../skills/artystic/SKILL.md", import.meta.url), "utf8");
const odysseus = await readFile(new URL("../skills/artystic/references/odysseus.md", import.meta.url), "utf8");
const imagery = await readFile(new URL("../skills/artystic/references/imagery-language.md", import.meta.url), "utf8");

const acts = ["troy", "sea", "underworld", "ithaca"];

test("the homepage is a four-painting journey with one invocation", async () => {
  for (const act of acts) {
    assert.match(page, new RegExp(`id=["']${act}["']`));
    const asset = new URL(`../public/assets/odysseus-${act}-master.webp`, import.meta.url);
    assert.ok((await stat(asset)).size > 100_000, `${act} artwork is missing or incomplete`);
    assert.match(page, new RegExp(`/assets/odysseus-${act}-master\\.webp`));
  }

  assert.equal(page.match(/<section\b/g)?.length, 5);
  assert.match(page, /<CopyCommand command="artystic Odysseus"/);
  assert.doesNotMatch(page, /ticker|StatNumber|RecognitionIndex|sea-step|cunning-card/);
});

test("the Odysseus skill now reproduces the asset-first painted direction", () => {
  assert.match(skill, /exact phrase `artystic odysseus`/i);
  assert.match(odysseus, /Create four original, full-bleed narrative masterworks before composing the interface/i);
  assert.match(odysseus, /Troy[\s\S]*Sea[\s\S]*Underworld[\s\S]*Ithaca/);
  assert.match(imagery, /Make the image system before laying out the page/i);
  assert.match(imagery, /plastic skin[\s\S]*broken anatomy[\s\S]*symmetrical poster staging/i);
  assert.doesNotMatch(odysseus, /exactly three archival tableau|vase-band|axe apertures/i);
});

test("the visual system keeps accessible static and narrow-screen states", () => {
  assert.match(page, /className="skip-link"/);
  assert.match(page, /useReducedMotion\(\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.hero\s*\{[\s\S]*min-height: 100dvh/);
});

test("scroll motion stages chapters without adding another runtime", () => {
  assert.match(page, /new IntersectionObserver/);
  assert.match(page, /data-active=\{activeChapter === href\.slice\(1\)\}/);
  assert.equal(page.match(/className="scene-stage"/g)?.length, 2);
  assert.equal(page.match(/className="pigment-wipe/g)?.length, 2);
  assert.match(page, /clipPath: underworldClip/);
  assert.match(page, /style=\{\{ scale: ithacaScale \}\}/);
  assert.match(css, /\.scene-stage\s*\{[\s\S]*position: sticky/);
  assert.match(css, /@keyframes hero-line-in/);
  assert.match(css, /\.pigment-wipe \{ display: none; \}/);
});
