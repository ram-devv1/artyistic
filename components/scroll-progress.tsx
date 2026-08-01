"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-40 h-px origin-left bg-[var(--brick)] shadow-[0_0_8px_var(--glint)]"
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
    />
  );
}
