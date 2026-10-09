import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent — driven by CSS vars so the theme can swap warm/cool
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          deep: "rgb(var(--accent-deep) / <alpha-value>)",
        },
        violet: {
          glow: "rgb(var(--violet) / <alpha-value>)",
        },
        "ink-contrast": "rgb(var(--ink-contrast) / <alpha-value>)",
        // Surfaces driven by CSS variables so the theme toggle can swap them
        ink: "rgb(var(--ink) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "aurora-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(6%, -8%) scale(1.15)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1.1)" },
          "50%": { transform: "translate(-8%, 6%) scale(0.95)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(5%, 5%) scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Entrance for the sky's light studies. Kept on the inner node so it
        // never collides with the parallax transform on the wrapper.
        "glow-in": {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        "aurora-3": "aurora-3 26s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        // Named rather than arbitrary (`animate-[glow-in_...]`) because
        // Tailwind only emits the @keyframes block for animations reached
        // through this map.
        "glow-in": "glow-in 2.4s ease-out 0.3s both",
        "glow-in-late": "glow-in 2.4s ease-out 0.7s both",
      },
    },
  },
  plugins: [],
};

export default config;
