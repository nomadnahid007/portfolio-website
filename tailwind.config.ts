import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      boxShadow: {
        soft: "0 24px 64px rgba(15, 23, 42, 0.08)"
      },
      spacing: {
        18: "4.5rem",
        26: "6.5rem",
        30: "7.5rem"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(190, 84, 56, 0.18), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.92), rgba(247,245,239,0.94))",
        "grid-fade":
          "linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px)"
      },
      animation: {
        shimmer: "shimmer 7s linear infinite"
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" }
        }
      }
    }
  },
  plugins: [typography]
};

export default config;
