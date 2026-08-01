"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import type { ReactNode } from "react";

export function LenisProvider({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lenis: Lenis | undefined;

    const stop = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = undefined;
    };
    const start = () => {
      if (reducedMotion.matches || lenis) return;
      lenis = new Lenis();
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };
    const sync = () => {
      if (reducedMotion.matches) stop();
      else start();
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    return () => {
      reducedMotion.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return <>{children}</>;
}
