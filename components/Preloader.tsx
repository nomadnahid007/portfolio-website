"use client";

import { useEffect, useState } from "react";

const words = ["Building", "Things", "That", "Matter"];

export function Preloader() {
  const [phase, setPhase] = useState<"intro" | "hold" | "exit">("intro");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisible(false);
      return;
    }

    const holdTimer = window.setTimeout(() => setPhase("hold"), 920);
    const exitTimer = window.setTimeout(() => setPhase("exit"), 2140);
    const hideTimer = window.setTimeout(() => setVisible(false), 2540);

    return () => {
      window.clearTimeout(holdTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className={`preloader-screen ${phase === "hold" ? "preloader-hold" : ""} ${phase === "exit" ? "preloader-leave" : ""}`}
      onClick={() => setVisible(false)}
      aria-label="Skip intro"
    >
      <div className="preloader-stage" aria-hidden="true">
        <span className="preloader-orbit" />
        <span className="preloader-scan preloader-scan-top" />
        <span className="preloader-scan preloader-scan-bottom" />
        <span className="preloader-grid" />
        <span className="preloader-glow" />
      </div>
      <div className="preloader-content overflow-hidden px-6 text-center">
        <span className="preloader-kicker">Nahid Hassan</span>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 font-serif text-[2.5rem] leading-none sm:gap-x-4 sm:text-6xl">
          {words.map((word, index) => (
            <span
              key={word}
              className={`preloader-word ${word === "Matter" ? "text-[#de4e4e]" : ""}`}
              style={{ animationDelay: `${0.34 + index * 0.16}s` }}
            >
              {word}
            </span>
          ))}
        </div>
        <div className="preloader-line" />
        <span className="preloader-skip">Tap to skip</span>
      </div>
    </button>
  );
}
