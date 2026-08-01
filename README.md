# Artystic

Artystic is a design-polish skill and editorial-style website for making interfaces feel authored instead of templated.

It ships as:

- a Next.js site showcasing the visual system
- a tiny CLI entrypoint
- a bundled Pi skill at `skills/artystic/SKILL.md`

Artystic is a cross-agent design-polish skill for pages that already work but still feel generic. It is tailored for GPT 5.5 and works cleanly across Pi, Codex, Claude Code, Cursor, OpenCode, and other skill-compatible coding agents. It pushes toward stronger visual subject matter, fewer sharper containers, mixed typography with clear roles, meaningful image plates, and restrained motion that guides attention.

## v1.2: The Long Return

The Odysseus homepage is a four-act moving art book built around original narrative paintings of Troy, the sea, the Underworld, and Ithaca. Motion for React drives restrained scene depth, Lenis provides inertial scrolling, and native CSS handles ambient texture with complete reduced-motion states.

Reusable motion and imagery contracts live in `skills/artystic/references/motion-language.md` and `skills/artystic/references/imagery-language.md` so future Artystic themes can use the same asset-first and interaction discipline.

## How to use it

### Install

```bash
npx artystic
```

This runs the skills.sh installer for the Artystic skill and installs it into your compatible agent setup.

Use it when a page feels too safe, too same-font, too SaaS-like, too card-heavy, or visually under-authored.

## Agent compatibility

Artystic is built to install and run as a reusable skill, not just as a website demo.

It is designed for cross-agent use, including:

- GPT 5.5
- Pi
- Codex
- Claude Code
- Cursor
- OpenCode
- other skills-compatible agent setups

## Project structure

```text
app/                              Next.js pages, layout, motion provider, and styles
components/                       Motion, smooth-scroll, grain, and UI components
public/assets/                    Original narrative paintings and brand assets
skills/artystic/SKILL.md          Bundled cross-agent skill router
skills/artystic/references/       Odysseus, motion, and imagery contracts
bin/artystic.mjs                  CLI entrypoint
```

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion for React, Lenis, native CSS animation, Next Image, and ImageMagick.

## Repository

GitHub: https://github.com/Bram-cat/artyistic

## License

MIT — see [LICENSE](./LICENSE).
