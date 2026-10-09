import { animate, utils } from "animejs";

/**
 * Shared motion tokens and primitives.
 *
 * Everything on the page animates through anime.js so there is a single
 * requestAnimationFrame loop for the whole document. anime's engine also
 * pauses itself while the tab is hidden, so background tabs stop costing
 * frames without any per-component bookkeeping.
 */

/** The site's house curve — a soft, slightly-overshooting ease-out. */
export const EASE = "cubicBezier(0.21, 0.47, 0.32, 0.98)";

/** Follow-the-cursor curve for continuously driven values. */
export const EASE_FOLLOW = "out(3)";

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isCoarsePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared viewport observer                                                   */
/* -------------------------------------------------------------------------- */

type InViewHandler = (inView: boolean) => void;

const handlers = new WeakMap<Element, InViewHandler>();
let observer: IntersectionObserver | null = null;

/**
 * One IntersectionObserver for every scroll-triggered element on the page.
 *
 * Each reveal used to carry its own observer; a page with ~40 of them made the
 * browser run 40 separate intersection computations per scroll frame. A single
 * shared observer batches all of those into one callback, and the margin here
 * reproduces the trigger line the reveals were tuned against.
 */
function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          handlers.get(entry.target)?.(entry.isIntersecting);
        }
      },
      { rootMargin: "-60px 0px" }
    );
  }
  return observer;
}

/** Watch `el`, calling `fn` on every enter/leave. Returns an unsubscribe. */
export function observeInView(el: Element, fn: InViewHandler): () => void {
  const io = getObserver();
  handlers.set(el, fn);
  io.observe(el);
  return () => {
    io.unobserve(el);
    handlers.delete(el);
  };
}

/* -------------------------------------------------------------------------- */
/*  Reveal keyframes                                                           */
/* -------------------------------------------------------------------------- */

export type RevealVariant = "up" | "left" | "right" | "blur" | "scale" | "rise";

type Props = Record<string, number | string>;

/** Resting state for every property any variant can touch. */
const REST: Props = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
};

/**
 * Hidden states are written with anime's `x`/`y` shorthand so the whole set
 * compiles down to one composed `transform`, never a per-property style write.
 */
const HIDDEN: Record<RevealVariant, Props> = {
  up: { opacity: 0, y: 24 },
  rise: { opacity: 0, y: 48 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  blur: { opacity: 0, y: 20, filter: "blur(12px)" },
  scale: { opacity: 0, scale: 0.94, y: 16 },
};

export function hiddenState(variant: RevealVariant): Props {
  return HIDDEN[variant];
}

/**
 * The matching visible state — only the keys this variant actually moved, so a
 * plain fade never picks up a `filter` (which would otherwise promote the node
 * to its own containing block for nothing).
 */
export function shownState(variant: RevealVariant): Props {
  const out: Props = {};
  for (const key of Object.keys(HIDDEN[variant])) out[key] = REST[key];
  return out;
}

/** Park an element in its hidden state without animating. */
export function setHidden(el: Element, variant: RevealVariant) {
  utils.set(el, hiddenState(variant));
}

/** Park an element in its final state — used when motion is reduced. */
export function setShown(el: Element, variant: RevealVariant) {
  utils.set(el, shownState(variant));
}

export function playIn(
  el: Element,
  variant: RevealVariant,
  duration: number,
  delay: number
) {
  return animate(el, {
    ...shownState(variant),
    duration: duration * 1000,
    delay: delay * 1000,
    ease: EASE,
  });
}

export function playOut(el: Element, variant: RevealVariant) {
  return animate(el, {
    ...hiddenState(variant),
    duration: 260,
    ease: "outQuad",
  });
}

/* -------------------------------------------------------------------------- */
/*  Server-rendered hidden state                                               */
/* -------------------------------------------------------------------------- */

/**
 * The hidden state as a plain React style object.
 *
 * The effect that parks an element can only run after hydration, so without
 * this the first paint would show every reveal fully visible and then blink it
 * away. Emitting the same state inline means the server markup already matches
 * what anime.js is about to take over.
 */
export function hiddenStyle(variant: RevealVariant): React.CSSProperties {
  const s = HIDDEN[variant];
  const parts: string[] = [];
  if (s.x !== undefined) parts.push(`translateX(${s.x}px)`);
  if (s.y !== undefined) parts.push(`translateY(${s.y}px)`);
  if (s.scale !== undefined) parts.push(`scale(${s.scale})`);
  return {
    opacity: s.opacity as number,
    ...(parts.length ? { transform: parts.join(" ") } : null),
    ...(s.filter ? { filter: s.filter as string } : null),
  };
}
