import type Lenis from "lenis";

// The page's single smooth-scroll instance (null with reduced motion or before mount).
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => { instance = lenis; };
export const getLenis = () => instance;

/** Smooth-scroll to a y position, falling back to native scrolling. */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
