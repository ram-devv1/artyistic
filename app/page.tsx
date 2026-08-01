"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { CopyCommand } from "@/components/copy-command";

const chapters = [
  ["01", "Troy", "#troy"],
  ["02", "The sea", "#sea"],
  ["03", "The dead", "#underworld"],
  ["04", "Ithaca", "#ithaca"],
] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const seaRef = useRef<HTMLElement>(null);
  const underworldRef = useRef<HTMLElement>(null);
  const ithacaRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState("troy");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
        }
      },
      { rootMargin: "-38% 0px -52% 0px" },
    );

    for (const id of chapters.map(([, , href]) => href.slice(1))) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const hero = useScroll({ target: heroRef, offset: ["start start", "end start"] }).scrollYProgress;
  const sea = useScroll({ target: seaRef, offset: ["start end", "end start"] }).scrollYProgress;
  const underworld = useScroll({ target: underworldRef, offset: ["start end", "end start"] }).scrollYProgress;
  const ithaca = useScroll({ target: ithacaRef, offset: ["start end", "end start"] }).scrollYProgress;

  const heroY = useTransform(hero, [0, 1], ["0%", reducedMotion ? "0%" : "10%"]);
  const heroScale = useTransform(hero, [0, 1], [1.02, reducedMotion ? 1.02 : 1.09]);
  const heroCopyY = useTransform(hero, [0, 0.8], ["0%", reducedMotion ? "0%" : "-18%"]);
  const heroCopyOpacity = useTransform(hero, [0, 0.72], [1, reducedMotion ? 1 : 0]);
  const seaY = useTransform(sea, [0, 1], [reducedMotion ? "0%" : "-5%", reducedMotion ? "0%" : "5%"]);
  const seaScale = useTransform(sea, [0, 0.48, 1], [reducedMotion ? 1 : 1.055, 1, reducedMotion ? 1 : 1.025]);
  const underworldY = useTransform(underworld, [0, 1], [reducedMotion ? "0%" : "-4%", reducedMotion ? "0%" : "4%"]);
  const underworldClip = useTransform(
    underworld,
    [0, 0.25, 0.7, 1],
    reducedMotion
      ? ["inset(0%)", "inset(0%)", "inset(0%)", "inset(0%)"]
      : ["inset(9% 7%)", "inset(0%)", "inset(0%)", "inset(4% 2%)"],
  );
  const underworldCopyY = useTransform(underworld, [0, 0.35, 1], [reducedMotion ? "0%" : "9%", "0%", reducedMotion ? "0%" : "-8%"]);
  const underworldWipe = useTransform(underworld, [0, 0.1, 0.3, 1], [1, 1, reducedMotion ? 1 : 0, reducedMotion ? 1 : 0]);
  const ithacaScale = useTransform(ithaca, [0, 1], [reducedMotion ? 1 : 1.08, 1]);
  const ithacaCopyY = useTransform(ithaca, [0, 0.45, 1], [reducedMotion ? "0%" : "10%", "0%", reducedMotion ? "0%" : "-6%"]);
  const ithacaLightOpacity = useTransform(ithaca, [0, 0.48, 0.9], reducedMotion ? [0.38, 0.38, 0.38] : [0.9, 0.38, 0.08]);
  const ithacaWipe = useTransform(ithaca, [0, 0.12, 0.32, 1], [1, 1, reducedMotion ? 1 : 0, reducedMotion ? 1 : 0]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to the journey</a>

      <header className="site-header">
        <a className="wordmark" href="#troy" aria-label="Artystic Odysseus, back to the beginning">
          <span>Artystic</span><i aria-hidden="true" />Odysseus
        </a>
        <nav aria-label="Journey chapters">
          {chapters.map(([number, label, href]) => (
            <a
              key={href}
              href={href}
              data-active={activeChapter === href.slice(1)}
              aria-current={activeChapter === href.slice(1) ? "true" : undefined}
            ><span>{number}</span>{label}</a>
          ))}
        </nav>
      </header>

      <main id="main">
        <section ref={heroRef} id="troy" className="hero" aria-labelledby="hero-title">
          <motion.div className="hero__art" style={{ y: heroY, scale: heroScale }}>
            <Image
              src="/assets/odysseus-troy-master.webp"
              alt="Odysseus looks back toward burning Troy while his surviving crew boards a black-hulled ship"
              fill
              priority
              sizes="100vw"
              className="painting"
            />
          </motion.div>
          <div className="hero__wash" />
          <motion.div className="hero__copy" style={{ y: heroCopyY, opacity: heroCopyOpacity }}>
            <p className="chapter-mark">Book of returns · I</p>
            <h1 id="hero-title">The long<br /><em>return.</em></h1>
            <p className="hero__dek">He won the war. The sea kept the victory for ten more years.</p>
          </motion.div>
          <div className="hero__caption">
            <p>Troy, after the fires</p>
            <span>War behind him. Every dead man carried forward.</span>
          </div>
          <a className="descent" href="#sea"><span>Begin the voyage</span><i aria-hidden="true" /></a>
        </section>

        <section ref={seaRef} id="sea" className="act act--sea" aria-labelledby="sea-title">
          <div className="act__folio-number" aria-hidden="true">II</div>
          <div className="sea-copy">
            <p className="chapter-mark">The sea</p>
            <h2 id="sea-title">Twelve ships left Troy.<br /><em>One came home.</em></h2>
            <p>Command is measured by the men who remain—and by the names the survivor must continue to remember.</p>
          </div>
          <motion.div className="sea-canvas" style={{ scale: seaScale }}>
            <motion.div className="sea-canvas__image" style={{ y: seaY }}>
              <Image
                src="/assets/odysseus-sea-master.webp"
                alt="Odysseus and his exhausted crew fight to keep their damaged ship alive in a storm"
                fill
                sizes="(min-width: 900px) 76vw, 100vw"
                className="painting"
              />
            </motion.div>
            <div className="sea-canvas__edge" />
            <p className="painting-note painting-note--top">The burden of the mast</p>
            <p className="painting-note painting-note--bottom">Responsibility becomes another form of grief.</p>
          </motion.div>
          <p className="margin-script" aria-hidden="true">polytropos · the man of many turns</p>
        </section>

        <section ref={underworldRef} id="underworld" className="act act--underworld" aria-labelledby="underworld-title">
          <div className="scene-stage">
            <motion.div className="underworld-art" style={{ y: underworldY, clipPath: underworldClip }}>
              <Image
                src="/assets/odysseus-underworld-master.webp"
                alt="Odysseus guards a blood offering as Tiresias and the shades gather at the edge of the underworld"
                fill
                sizes="100vw"
                className="painting"
              />
            </motion.div>
            <div className="underworld-veil" />
            <motion.div className="underworld-copy" style={{ y: underworldCopyY }}>
              <p className="chapter-mark">The house of the dead · XI</p>
              <h2 id="underworld-title">Before the dead can speak,<br /><em>they must remember.</em></h2>
              <p>Here victory has no language. His mother, his men, and the prophet wait at the edge of the blood. The road home passes through everyone he failed to bring with him.</p>
            </motion.div>
            <div className="underworld-aside" aria-label="Emotional register">
              <span>grief</span><span>duty</span><span>fear</span><span>memory</span>
            </div>
            <motion.div aria-hidden="true" className="pigment-wipe pigment-wipe--blood" style={{ scaleY: underworldWipe }} />
          </div>
        </section>

        <section ref={ithacaRef} id="ithaca" className="act act--ithaca" aria-labelledby="ithaca-title">
          <div className="scene-stage">
            <motion.div className="ithaca-art" style={{ scale: ithacaScale }}>
              <Image
                src="/assets/odysseus-ithaca-master.webp"
                alt="The old dog Argos recognizes the disguised Odysseus while Penelope waits beside her loom in their Ithacan home"
                fill
                sizes="100vw"
                className="painting"
              />
            </motion.div>
            <motion.div className="ithaca-light" style={{ opacity: ithacaLightOpacity }} />
            <motion.div className="ithaca-copy" style={{ y: ithacaCopyY }}>
              <p className="chapter-mark">Recognition · XVII–XXIII</p>
              <h2 id="ithaca-title">Home does not know him<br /><em>all at once.</em></h2>
              <p>The dog knows. The scar knows. The bow knows. Penelope waits for the one memory no impostor can possess.</p>
            </motion.div>
            <div className="recognition-notes" aria-label="The signs of recognition">
              <p><b>Argos</b><span>The first witness</span></p>
              <p><b>The bow</b><span>The body remembers</span></p>
              <p><b>The olive bed</b><span>The marriage holds</span></p>
            </div>
            <motion.div aria-hidden="true" className="pigment-wipe pigment-wipe--ash" style={{ scaleY: ithacaWipe }} />
          </div>
        </section>

        <section id="invoke" className="invocation" aria-labelledby="invoke-title">
          <p className="chapter-mark">Artystic theme · Odysseus</p>
          <h2 id="invoke-title">Build with<br /><em>the long return.</em></h2>
          <p className="invocation__copy">Use this visual language when the interface should carry cunning, responsibility, grief, endurance, and the difficult work of coming home.</p>
          <div className="command-line">
            <code>artystic Odysseus</code>
            <CopyCommand command="artystic Odysseus" />
          </div>
          <p className="invocation__note">One journey. Four paintings. No ornamental mythology.</p>
        </section>
      </main>

      <footer>
        <p>Artystic / Odysseus</p>
        <p>Version 1.2 · The long return</p>
        <a href="#troy">Return to Troy <span aria-hidden="true">↑</span></a>
      </footer>
    </>
  );
}
