"use client";

import Image from "next/image";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionStyle } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CopyCommand } from "@/components/copy-command";

const revealViewport = { once: true, amount: 0.3 };
const tickerCopy = "Troy / The cave / Almost home / Six taken / One hull / One survivor / Ithaca";

function RecognitionIndex({
  active,
  delay,
  reducedMotion,
  value,
}: {
  active: boolean;
  delay: number;
  reducedMotion: boolean | null;
  value: number;
}) {
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => String(Math.round(latest)).padStart(2, "0"));

  useEffect(() => {
    if (reducedMotion) {
      count.set(value);
      return;
    }
    if (!active) return;

    const playback = animate(count, value, { duration: 0.56, delay, ease: [0.22, 1, 0.36, 1] });
    return () => playback.stop();
  }, [active, count, delay, reducedMotion, value]);

  return <motion.span aria-hidden="true" className="recognition-index">{display}</motion.span>;
}

function StatNumber({
  active,
  reducedMotion,
  value,
}: {
  active: boolean;
  reducedMotion: boolean | null;
  value: number;
}) {
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => String(Math.round(latest)));

  useEffect(() => {
    if (reducedMotion) {
      count.set(value);
      return;
    }
    if (!active) return;

    const playback = animate(count, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => playback.stop();
  }, [active, count, reducedMotion, value]);

  return (
    <>
      <motion.span aria-hidden="true" className="stat__count">{display}</motion.span>
      <span aria-hidden="true" className="stat__final">{value}</span>
    </>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const memoryRef = useRef<HTMLElement>(null);
  const recognitionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLUListElement>(null);
  const [recognitionActive, setRecognitionActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const statsInView = useInView(statsRef, { once: true, amount: 0.6 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: memoryScrollYProgress } = useScroll({
    target: memoryRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: recognitionScrollYProgress } = useScroll({
    target: recognitionRef,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);
  const memoryY = useTransform(memoryScrollYProgress, [0, 1], ["-4%", "4%"]);
  const recognitionWeaveY = useTransform(recognitionScrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#D8CCB4]/10 bg-[#090D0F]/90 font-[var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-[#D8CCB4]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <a href="#journey" className="flex min-h-11 shrink-0 items-center text-[#D8CCB4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8B16A]">
            Artystic <span className="px-2 text-[#A24A31]">/</span> Odysseus
          </a>
          <nav aria-label="Primary navigation" className="ml-auto flex min-w-0 items-center gap-5 overflow-x-auto">
            <a href="#journey" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Journey</a>
            <a href="#memory" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Memory</a>
            <a href="#recognition" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Recognition</a>
            <a href="#invoke" className="flex min-h-11 shrink-0 items-center hover:text-[#C8B16A]">Invoke</a>
          </nav>
        </div>
      </header>

      <main className="min-h-screen bg-[#090D0F] text-[#D8CCB4]">
        <section ref={heroRef} id="journey" aria-labelledby="journey-title" className="relative isolate min-h-[calc(100svh-2.75rem)] overflow-hidden border-b border-[#D8CCB4]/10">
          <motion.div className="hero-plate-wrap" style={{ y: heroY }}>
            <Image
              src="/assets/odysseus-hero.webp"
              alt="Odysseus hesitates beside his war-worn ship as Troy burns across the dark water"
              fill
              priority
              sizes="100vw"
              className="hero-plate object-cover object-center opacity-70"
            />
          </motion.div>
          <div className="hero-shade absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(9,13,15,0.98)_0%,rgba(9,13,15,0.74)_45%,rgba(9,13,15,0.18)_100%)]" />
          <motion.div className="hero-fade relative z-10 mx-auto flex min-h-[calc(100svh-2.75rem)] max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 sm:py-16 lg:px-8" style={{ "--hero-opacity": heroOpacity } as MotionStyle}>
            <h1 id="journey-title" aria-label="The Long Return" className="max-w-4xl font-[var(--font-serif)] text-6xl leading-[0.88] tracking-[-0.055em] text-[#D8CCB4] sm:text-8xl lg:text-[9rem]">
              <span className="hero-word" aria-hidden="true">
                <motion.span
                  className="hero-word__line"
                  initial={{ y: "112%" }}
                  whileInView={{ y: ["112%", "-3%", "0%"] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.56, delay: 0, times: [0, 0.82, 1], ease: [[0.22, 1, 0.36, 1], [0.22, 1.15, 0.36, 1]] }}
                >
                  The
                </motion.span>
              </span>
              <span className="hero-word" aria-hidden="true">
                <motion.span
                  className="hero-word__line"
                  initial={{ y: "112%" }}
                  whileInView={{ y: ["112%", "-3%", "0%"] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.56, delay: 0.09, times: [0, 0.82, 1], ease: [[0.22, 1, 0.36, 1], [0.22, 1.15, 0.36, 1]] }}
                >
                  Long
                </motion.span>
              </span>
              <span className="hero-word" aria-hidden="true">
                <motion.span
                  className="hero-word__line"
                  initial={{ y: "112%" }}
                  whileInView={{ y: ["112%", "-3%", "0%"] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.56, delay: 0.18, times: [0, 0.82, 1], ease: [[0.22, 1, 0.36, 1], [0.22, 1.15, 0.36, 1]] }}
                >
                  Return
                </motion.span>
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D8CCB4]/78 sm:text-xl">
              Odysseus leaves a burning victory behind and carries the dead across ten more years of sea. He survives, but survival does not leave him innocent, whole, or finished.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a href="#invoke" className="journey-cta inline-flex min-h-12 items-center border border-[#A24A31] bg-[#A24A31] px-5 font-semibold text-[#090D0F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8B16A]">
                <span className="journey-cta__label">Invoke the theme</span> <span aria-hidden="true" className="journey-cta__arrow ml-3">→</span>
              </a>
              <span className="journey-meta font-[var(--font-mono)] text-xs uppercase tracking-[0.22em]">20 years absent · one ship returns</span>
            </div>
            <nav aria-label="Odysseus voyage index" className="voyage-index mt-12 border-t border-[#D8CCB4]/20 pt-5">
              <ol className="grid gap-3 font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.18em] text-[#D8CCB4]/58 sm:grid-cols-3 lg:grid-cols-6">
                <li className="voyage-index__item voyage-index__item--active"><a href="#journey">Ash <span aria-hidden="true" className="voyage-index__chevron">›</span></a></li>
                <li><a href="#sea">Loss <span aria-hidden="true" className="voyage-index__chevron">›</span></a></li>
                <li><a href="#cunning">Cunning <span aria-hidden="true" className="voyage-index__chevron">›</span></a></li>
                <li><a href="#memory">Shades <span aria-hidden="true" className="voyage-index__chevron">›</span></a></li>
                <li><a href="#recognition">Signs <span aria-hidden="true" className="voyage-index__chevron">›</span></a></li>
                <li><a href="#invoke">Peace <span aria-hidden="true" className="voyage-index__chevron">›</span></a></li>
              </ol>
            </nav>
          </motion.div>
        </section>

        <section id="sea" aria-labelledby="sea-title" className="border-b border-[#D8CCB4]/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="sea-route" aria-hidden="true">
            <motion.span
              className="ship-marker"
              initial={{ offsetDistance: "0%" }}
              whileInView={{ offsetDistance: "100%" }}
              viewport={revealViewport}
              transition={{ duration: 4.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
              <h2 id="sea-title" aria-label="The cost of return" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] text-[#D8CCB4] sm:text-7xl">
                <span className="section-title-mask" aria-hidden="true">
                  <motion.span
                    className="section-title-mask__line"
                    initial={{ y: "112%" }}
                    whileInView={{ y: ["112%", "-3%", "0%"] }}
                    viewport={revealViewport}
                    transition={{ duration: 0.56, times: [0, 0.82, 1], ease: [[0.22, 1, 0.36, 1], [0.22, 1.15, 0.36, 1]] }}
                  >
                    The cost of return
                  </motion.span>
                </span>
              </h2>
              <p className="max-w-3xl text-xl leading-9 text-[#D8CCB4]/72">
                The voyage is not a catalogue of monsters. It is a register of decisions, warnings ignored, men lost, and a horizon that repeatedly lets Ithaca appear before taking it away.
              </p>
            </div>
            <ol className="rv-stagger mt-14 grid border-y border-[#D8CCB4]/15 sm:grid-cols-2 lg:grid-cols-3">
              <motion.li className="sea-step border-b border-[#D8CCB4]/15 p-6 sm:border-r lg:border-b" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ x: 4 }} viewport={revealViewport} transition={{ duration: 0.56 }}><motion.span aria-hidden="true" className="draw-line sea-step__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56 }} /><span className="sea-step__label font-[var(--font-mono)] text-xs text-[#C8B16A]">Troy</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">Smoke, looted bronze, and victory already curdling into absence.</p></motion.li>
              <motion.li className="sea-step border-b border-[#D8CCB4]/15 p-6 lg:border-b" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ x: 4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.07 }}><motion.span aria-hidden="true" className="draw-line sea-step__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.07 }} /><span className="sea-step__label font-[var(--font-mono)] text-xs text-[#C8B16A]">The cave</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">“Nobody” saves the crew; a revealed name gives Poseidon the route home.</p></motion.li>
              <motion.li className="sea-step border-b border-[#D8CCB4]/15 p-6 sm:border-r lg:border-r-0" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ x: 4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.14 }}><motion.span aria-hidden="true" className="draw-line sea-step__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.14 }} /><span className="sea-step__label font-[var(--font-mono)] text-xs text-[#C8B16A]">Almost home</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">Ithaca enters sight. The wind-bag opens while its captain sleeps.</p></motion.li>
              <motion.li className="sea-step border-b border-[#D8CCB4]/15 p-6 lg:border-b-0 lg:border-r" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ x: 4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.21 }}><motion.span aria-hidden="true" className="draw-line sea-step__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.21 }} /><span className="sea-step__label font-[var(--font-mono)] text-xs text-[#C8B16A]">Six taken</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">At Scylla, command becomes the choice of who cannot be saved.</p></motion.li>
              <motion.li className="sea-step border-b border-[#D8CCB4]/15 p-6 sm:border-b-0 sm:border-r" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ x: 4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.28 }}><motion.span aria-hidden="true" className="draw-line sea-step__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.28 }} /><span className="sea-step__label font-[var(--font-mono)] text-xs text-[#C8B16A]">One hull</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">The Laestrygonians empty the fleet until only his black ship remains.</p></motion.li>
              <motion.li className="sea-step p-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ x: 4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.35 }}><motion.span aria-hidden="true" className="draw-line sea-step__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.35 }} /><span className="sea-step__label font-[var(--font-mono)] text-xs text-[#C8B16A]">One survivor</span><p className="mt-3 leading-7 text-[#D8CCB4]/66">After Helios, every oar bench is silent except the one memory must fill.</p></motion.li>
            </ol>
          </div>
        </section>

        <div className="ticker-shell border-b border-[#D8CCB4]/10">
          <div className="ticker" aria-hidden="true">
            <span className="ticker__run">{tickerCopy}</span>
            <span className="ticker__run">{tickerCopy}</span>
          </div>
        </div>

        <section id="cunning" aria-labelledby="cunning-title" className="border-b border-[#D8CCB4]/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <h2 id="cunning-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl">Every escape leaves a mark</h2>
            <div className="grid gap-px bg-[#D8CCB4]/15 sm:grid-cols-2">
              <motion.article className="cunning-card bg-[#090D0F] p-7" initial={{ opacity: 0, x: -32, y: 24 }} whileInView={{ opacity: 1, x: 0, y: 0 }} whileHover={{ y: -4 }} viewport={revealViewport} transition={{ duration: 0.56 }}><motion.span aria-hidden="true" className="cunning-card__rule" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={revealViewport} transition={{ duration: 0.56 }} /><h3 className="font-[var(--font-serif)] text-3xl">Nobody survives the cave</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">Odysseus hides beneath wool, then pride makes him name himself across the water.</p></motion.article>
              <motion.article className="cunning-card bg-[#090D0F] p-7" initial={{ opacity: 0, x: 32, y: 24 }} whileInView={{ opacity: 1, x: 0, y: 0 }} whileHover={{ y: -4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.07 }}><motion.span aria-hidden="true" className="cunning-card__rule" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.07 }} /><h3 className="font-[var(--font-serif)] text-3xl">Circe suspends the year</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">A cup changes bodies; moly, a blade, and an oath restore them. Survival remains negotiation.</p></motion.article>
              <motion.article className="cunning-card bg-[#090D0F] p-7" initial={{ opacity: 0, x: -32, y: 24 }} whileInView={{ opacity: 1, x: 0, y: 0 }} whileHover={{ y: -4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.14 }}><motion.span aria-hidden="true" className="cunning-card__rule" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.14 }} /><h3 className="font-[var(--font-serif)] text-3xl">Desire is given a boundary</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">He hears the Sirens bound upright while the crew rows past with sealed ears.</p></motion.article>
              <motion.article className="cunning-card bg-[#090D0F] p-7" initial={{ opacity: 0, x: 32, y: 24 }} whileInView={{ opacity: 1, x: 0, y: 0 }} whileHover={{ y: -4 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.21 }}><motion.span aria-hidden="true" className="cunning-card__rule" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.21 }} /><h3 className="font-[var(--font-serif)] text-3xl">Cunning cannot save everyone</h3><p className="mt-4 leading-7 text-[#D8CCB4]/66">His intelligence is practical and violent: it preserves the vessel by accepting six deaths.</p></motion.article>
            </div>
          </div>
        </section>

        <section id="memory" ref={memoryRef} aria-labelledby="memory-title" className="border-b border-[#D8CCB4]/10">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
            <div className="relative min-h-[32rem] overflow-hidden lg:min-h-[48rem]">
              <motion.div className="memory-plate" style={{ y: memoryY, scale: 1.08 }}>
                <Image
                  src="/assets/odysseus-underworld.webp"
                  alt="Odysseus kneels beside the blood offering while the shades gather in a sea cave"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div className="px-4 py-16 sm:px-10 lg:px-16 lg:py-24">
              <motion.h2 id="memory-title" className="memory-line font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl" initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0)" }} viewport={revealViewport} transition={{ duration: 0.56 }}>The dead speak</motion.h2>
              <motion.p className="memory-line mt-7 text-lg leading-8 text-[#D8CCB4]/70" initial={{ opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, y: 0, clipPath: "inset(0)" }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.07 }}>The underworld belongs to Odysseus’s reckoning. The war’s famous kings enter only as shadows inside his return.</motion.p>
              <div className="mt-10 space-y-8">
                <motion.article className="memory-voice relative border-t border-[#D8CCB4]/15 pt-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.14 }}><motion.span aria-hidden="true" className="draw-line memory-voice__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.14 }} /><h3 className="font-[var(--font-serif)] text-3xl text-[#D8CCB4]">Achilles rejects dead glory</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">His answer strips victory of its polish: life without rank would be worth more than rule among shades.</p></motion.article>
                <motion.article className="memory-voice relative border-t border-[#D8CCB4]/15 pt-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.21 }}><motion.span aria-hidden="true" className="draw-line memory-voice__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.21 }} /><h3 className="font-[var(--font-serif)] text-3xl text-[#D8CCB4]">Agamemnon warns of the door</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">A king can reach home and still be murdered there. Odysseus learns to return concealed.</p></motion.article>
              </div>
            </div>
          </div>
        </section>

        <section id="recognition" ref={recognitionRef} aria-labelledby="recognition-title" className="border-b border-[#D8CCB4]/10 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.div className="recognition-weave" aria-hidden="true" style={{ y: recognitionWeaveY }} />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
              <div>
                <h2 id="recognition-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl">Home arrives as a sequence of signs</h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[#D8CCB4]/70">Athena folds him into mist and a beggar’s body. Recognition comes quietly, through witnesses that cannot be persuaded by a crown.</p>
              </div>
              <motion.div
                className="rv-clip recognition-plate relative min-h-[30rem] overflow-hidden border border-[#D8CCB4]/10"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                whileInView={{ clipPath: "inset(0)" }}
                onViewportEnter={() => setRecognitionActive(true)}
                viewport={revealViewport}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/assets/odysseus-homecoming.webp"
                  alt="The old dog Argos recognizes a disguised Odysseus at the threshold of his Ithacan house"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div className="rv-stagger mt-12 grid gap-8 md:grid-cols-3">
              <motion.article className="recognition-sign border-t border-[#D8CCB4]/15 pt-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ duration: 0.56 }}><RecognitionIndex value={1} active={recognitionActive} delay={0} reducedMotion={reducedMotion} /><h3 className="font-[var(--font-serif)] text-3xl">The old dog knows first</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">Argos raises his head, recognizes the hidden master, and dies after keeping the twenty-year watch.</p></motion.article>
              <motion.article className="recognition-sign border-t border-[#D8CCB4]/15 pt-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.07 }}><RecognitionIndex value={2} active={recognitionActive} delay={0.07} reducedMotion={reducedMotion} /><h3 className="font-[var(--font-serif)] text-3xl">The body keeps its name</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">Eurycleia finds the scar beneath the disguise: identity preserved where speech still withholds it.</p></motion.article>
              <motion.article className="recognition-sign border-t border-[#D8CCB4]/15 pt-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ duration: 0.56, delay: 0.14 }}><RecognitionIndex value={3} active={recognitionActive} delay={0.14} reducedMotion={reducedMotion} /><h3 className="font-[var(--font-serif)] text-3xl">The bed cannot be moved</h3><p className="mt-3 leading-7 text-[#D8CCB4]/62">Penelope’s final test is shared knowledge: their bed was built around a living olive tree.</p></motion.article>
            </div>
          </div>
        </section>

        <section id="invoke" aria-labelledby="invoke-title" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <motion.span
            aria-hidden="true"
            className="bow-string-shimmer"
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: [0, 1, 1, 0], y: [0, 112, 224] }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 2.4, delay: 0.45, ease: "easeInOut" }}
          />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <h2 id="invoke-title" className="font-[var(--font-serif)] text-5xl leading-none tracking-[-0.045em] sm:text-7xl">String the bow. End the cycle.</h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[#D8CCB4]/70">The bow restores Odysseus’s name through violence. The olive-root bed restores the marriage through memory. Athena must still stop revenge from repeating itself.</p>
              </div>
              <motion.div
                className="invoke-command border-y border-[#D8CCB4]/20 py-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[#C8B16A]">Artystic theme command</p>
                <pre className="mt-5 font-[var(--font-mono)] text-2xl text-[#D8CCB4] sm:text-4xl"><code>npx artystic<span aria-hidden="true" className="caret" /></code></pre>
                <div className="mt-7"><CopyCommand command="npx artystic" /></div>
                <p className="mt-6 max-w-xl text-sm leading-7 text-[#D8CCB4]/58">Invoke <code className="text-[#C8B16A]">artystic odysseus</code> for the narrative, palette, typography, imagery, motion budget, and source boundaries of The Long Return.</p>
              </motion.div>
            </div>
            <motion.ul
              ref={statsRef}
              className="stats-row"
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              <motion.li className="stat" aria-label="20 years absent" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}><StatNumber active={statsInView} reducedMotion={reducedMotion} value={20} /><span aria-hidden="true">years absent</span></motion.li>
              <motion.li className="stat" aria-label="12 axes" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}><StatNumber active={statsInView} reducedMotion={reducedMotion} value={12} /><span aria-hidden="true">axes</span></motion.li>
              <motion.li className="stat" aria-label="6 taken" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}><StatNumber active={statsInView} reducedMotion={reducedMotion} value={6} /><span aria-hidden="true">taken</span></motion.li>
              <motion.li className="stat" aria-label="1 ship returns" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}><StatNumber active={statsInView} reducedMotion={reducedMotion} value={1} /><span aria-hidden="true">ship returns</span></motion.li>
            </motion.ul>
            <motion.div
              className="axe-register"
              aria-hidden="true"
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              <motion.span className="axe-register__rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={revealViewport} transition={{ duration: 0.56 }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
              <motion.span className="axe-aperture" variants={{ hidden: { opacity: 0, y: -24 }, visible: { opacity: 1, y: 0 } }} />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#D8CCB4]/10 bg-[#090D0F] px-4 py-10 text-[#D8CCB4] sm:px-6 lg:px-8">
        <motion.div className="footer-source mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.24fr_0.76fr]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={revealViewport} transition={{ duration: 0.56 }}>
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[#C8B16A]"><a href="/assets/odysseus-sources.json">Source boundary</a></p>
          <p className="max-w-4xl text-sm leading-7 text-[#D8CCB4]/58">
            Homeric material grounds the journey, losses, and recognitions. Later visual reception supplies distinct vase and object traditions; it is not Bronze Age documentary evidence. The survivor’s-guilt frame, cinematic scale, and this design are an original modern interpretation, not a diagnosis made by Homer or an archaeological reconstruction.
          </p>
        </motion.div>
      </footer>
    </>
  );
}
