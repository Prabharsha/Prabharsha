"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type CSSProperties } from "react";

import { skillGroups } from "@/data/site";

const items = skillGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.label })));

// Slot centres in % of the stage, kept clear of the headline in the middle.
const desktopSlots: [number, number][] = [
  [16, 16], [50, 12], [82, 18], [8, 44], [90, 52], [24, 84], [62, 88], [86, 82],
  [34, 20], [70, 14], [12, 70], [92, 32], [44, 86], [78, 66], [20, 32], [58, 20],
  [6, 58], [88, 70], [32, 78], [68, 82], [14, 24], [84, 40],
];
const phoneSlots: [number, number][] = [
  [22, 14], [72, 10], [50, 24], [18, 84], [78, 88], [50, 76], [80, 22], [26, 26],
  [64, 84], [34, 92], [12, 18], [86, 80], [40, 12], [60, 26], [20, 76], [76, 74],
  [30, 84], [88, 14], [50, 90], [14, 90], [66, 16], [82, 92],
];

/**
 * "The stack. The possibilities." — modelled on the reference's "Trusted by"
 * block: the heading pins in the centre and the tools blur in and out around
 * it as you scroll. Without JS or with reduced motion it is a plain, static
 * grid of the same list, so nothing is lost.
 */
export default function StackOrbit() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      {
        wide: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        narrow: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const slots = ctx.conditions?.wide ? desktopSlots : phoneSlots;
        el.classList.add("is-orbit");
        const chips = q<HTMLElement>(".stack-chip");
        chips.forEach((chip, i) => {
          const [x, y] = slots[i % slots.length];
          chip.style.left = `${x}%`;
          chip.style.top = `${y}%`;
        });

        gsap.from(q(".stack-line > span"), {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 75%" },
        });

        const header = document.querySelector<HTMLElement>(".site-header");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q(".stack-stage")[0],
            start: () => `top ${header?.offsetHeight ?? 80}px`,
            end: "+=240%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        const step = 0.38;
        chips.forEach((chip, i) => {
          const drift = (i % 2 ? 1 : -1) * 18;
          tl.fromTo(
            chip,
            { autoAlpha: 0, scale: 0.7, filter: "blur(14px)", xPercent: -50, yPercent: -50, y: 30 },
            { autoAlpha: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.6, ease: "power2.out" },
            i * step,
          ).to(
            chip,
            { autoAlpha: 0, scale: 1.12, filter: "blur(12px)", y: -30, x: drift, duration: 0.6, ease: "power2.in" },
            i * step + 1.3,
          );
        });
        tl.to({}, { duration: 0.3 });

        return () => {
          el.classList.remove("is-orbit");
          chips.forEach((chip) => { chip.style.left = ""; chip.style.top = ""; });
        };
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="skills" ref={root} className="stack-section" aria-labelledby="skills-heading">
      <div className="stack-stage">
        <div className="stack-copy">
          <h2 id="skills-heading">
            <span className="stack-line"><span>The stack.</span></span>
            <span className="stack-line"><span><em>The possibilities.</em></span></span>
          </h2>
          <p>From the interface to the API: the tools I build with every day.</p>
        </div>
        <ul className="stack-cloud" aria-label="Technologies I work with">
          {items.map(({ name, Icon, color, group }) => (
            <li key={name} className="stack-chip" style={{ "--c": color } as CSSProperties} title={group}>
              <Icon aria-hidden="true" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
