"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** Sliding sun/moon switch. Renders a neutral placeholder until mounted so SSR matches. */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const light = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Light theme"
      className={`theme-toggle ${light ? "is-light" : ""}`}
      onClick={() => setTheme(light ? "dark" : "light")}
      disabled={!mounted}
    >
      <span className="theme-toggle-icons" aria-hidden="true"><Moon size={14} /><Sun size={14} /></span>
      <span className="theme-toggle-knob" aria-hidden="true">{light ? <Sun size={14} /> : <Moon size={14} />}</span>
    </button>
  );
}
