"use client";

import { useEffect } from "react";

export function LenisProvider() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let lenis: { destroy: () => void; raf: (time: number) => void } | null = null;
    let frame = 0;
    let cancelled = false;

    if (prefersReducedMotion || !supportsFinePointer) {
      return;
    }

    const boot = async () => {
      const { default: Lenis } = await import("lenis");

      if (cancelled) {
        return;
      }

      lenis = new Lenis({
        duration: 0.85,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.92
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = window.requestAnimationFrame(raf);
      };

      frame = window.requestAnimationFrame(raf);
    };

    void boot();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
