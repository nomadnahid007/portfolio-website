"use client";

import { MoonIcon, SunIcon } from "@/components/Icons";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative inline-flex h-10 w-[72px] items-center rounded-full border border-line bg-card/70 p-1 text-muted transition hover:border-foreground hover:text-foreground sm:h-11 sm:w-[78px]"
      data-cursor="interactive"
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 h-8 w-8 rounded-full bg-foreground text-background shadow-soft transition-transform duration-300 sm:h-9 sm:w-9 ${
          isDark ? "translate-x-[30px] sm:translate-x-[34px]" : "translate-x-0"
        }`}
      />
      <span className="relative z-10 inline-flex w-full items-center justify-between px-1.5 sm:px-2">
        <span className={`inline-flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7 ${isDark ? "text-muted" : "text-background mix-blend-difference"}`}>
          <SunIcon className="h-4 w-4" />
        </span>
        <span className={`inline-flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7 ${isDark ? "text-background mix-blend-difference" : "text-muted"}`}>
          <MoonIcon className="h-4 w-4" />
        </span>
      </span>
    </button>
  );
}
