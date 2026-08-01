# Shared motion language

Use motion to narrate. Make every animation answer: “What does this tell the reader?” Keep loops ambient, calm, and away from reading or focus targets. Give each narrative act one unique primary motion moment; never repeat a motion recipe merely to fill space.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Quick | `180 ms` | hover and state feedback |
| Standard | `320 ms` | controls and compact reveals |
| Narrative | `560 ms` | headings, images, and section entrances |
| Ambient | `900 ms` | long draws and staged sequences |
| Entrance pair | `cubic-bezier(0.22, 1.15, 0.36, 1)` / `cubic-bezier(0.64, 0, 0.78, 0)` | overshoot in, decisive exit |
| Stagger | `60–90 ms` | related items only |
| Travel | `24–48 px` | short spatial entrances |
| Clip reveal | `inset(0 0 100% 0)` or an edge-aligned inset | one-shot image or line masks |

## Choreography recipes

| Recipe | Before | After | Reduced-motion final state |
| --- | --- | --- | --- |
| Headline mask reveal | Each line sits below an overflow mask. | Translate each line to `y: 0` with the entrance overshoot and stagger. | Show every line at `y: 0` without a mask. |
| Clip-path image reveal | Hold the plate at an edge inset or corner scale. | Open the inset once or scale from the narrative edge. | Set `clip-path: inset(0)` and final scale. |
| Staggered list rise + rule draw | Place items `24 px` low; scale rules from zero. | Rise related items in order and draw each rule from its anchor. | Show all items and full rules. |
| Path draw + moving marker | Set SVG dash offset and marker distance to zero. | Draw the route, then move the marker along the same path. | Show the full path and marker at its destination. |
| Parallax layers | Keep layers aligned at the section boundary. | Map `useScroll` through `useTransform` to small opposing offsets. | Set every offset to zero. |
| Ticker / marquee | Duplicate one `aria-hidden` run for continuity. | Move it with a slow linear CSS keyframe. | Stop the keyframe at a readable, decorative frame. |
| Count-up stat | Keep the final value in semantic text. | Trigger `animate` once with `useInView`; mirror it through a motion value. | Show the final semantic value immediately. |
| Hover micro-interactions | Keep control geometry and label stable. | Slide a CTA arrow, sweep an underline, or lift a card by at most `4 px`. | Remove transitions; keep focus and selected states visible. |
| Scroll progress bar | Anchor a zero-scale bar to the reading edge. | Map `useScroll().scrollYProgress` to compositor-friendly `scaleX`. | Hide the decorative bar or show a static nonessential state. |

## Package policy

- Use `motion/react` for viewport-driven and state-driven choreography.
- Use Lenis only for inertial smooth scroll. Disable it when `prefers-reduced-motion: reduce` matches; preserve anchors, keyboard scrolling, and native semantics.
- Use CSS keyframes for ambient loops and CSS transitions for hover or focus feedback. Never use both systems on the same element.
- Add another runtime only when the required timeline cannot be expressed with this stack and document the measured need first.

## Reduced-motion contract

Wrap the app in `<MotionConfig reducedMotion="user">`. Disable Lenis and every CSS loop under `prefers-reduced-motion`. Set explicit visible final states for opacity, transform, clip-path, path position, counters, and drawn rules; never require motion to reveal meaning.

## Hydration contract

Keep semantic content and the motion tree identical between SSR and the first client render. Do not branch initial motion props on client-only preference state. Start Lenis in an effect after checking `matchMedia`, cancel its frame, and destroy the instance on cleanup.

## Performance contract

Animate transform and opacity for continuous motion; reserve clip-path and SVG dash changes for bounded one-shot reveals. Avoid layout-triggering properties, permanent `will-change`, and more than three simultaneous parallax layers. Reserve media space and test on a mid-range device.

## Accessibility contract

Keep labels and final values in the DOM. Mark purely decorative motion `aria-hidden`, preserve focus order and visible focus, provide hover feedback on focus where meaningful, and keep motion away from controls and long-form reading. Avoid large zooms, flashes, and scroll hijacking.

## Completion contract

Finish only after desktop, small-screen, keyboard, reduced-motion, and hydration-warning passes succeed; all acts have distinct narrative moments; all content remains readable before and after motion; and the production build shows no animation-driven layout shift or jank.
