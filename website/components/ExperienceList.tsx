"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { experience } from "@/data/site";

const rows = experience.flatMap((job) => job.roles.map((role) => ({ ...role, company: job.company, meta: job.meta })));

/**
 * Role list modelled on the reference's "Awards" rows: one line per role, and on
 * hover (fine pointers only) a lime card trails the cursor with the detail.
 * The detail is also in each row for touch, keyboard and screen readers.
 */
export default function ExperienceList() {
  const list = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const box = list.current;
    const preview = card.current;
    if (!box || !preview) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!fine.matches) return;
    const x = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      x(e.clientX - r.left);
      y(e.clientY - r.top);
    };
    box.addEventListener("pointermove", move);
    return () => box.removeEventListener("pointermove", move);
  }, []);

  const current = hovered === null ? null : rows[hovered];

  return (
    <div className="exp-wrap" ref={list} onPointerLeave={() => setHovered(null)}>
      <ol className="exp-list">
        {rows.map((row, index) => (
          <li key={`${row.company}-${row.title}`} className="exp-row" onPointerEnter={() => setHovered(index)}>
            <div className="exp-main">
              <h3>{row.title}</h3>
              <p className="exp-meta">{row.company} · {row.period}</p>
            </div>
            <p className="exp-detail">{row.detail}</p>
          </li>
        ))}
      </ol>
      <div ref={card} className={`exp-preview ${current ? "is-on" : ""}`} aria-hidden="true">
          {current && <><span>{current.company}</span><strong>{current.title}</strong><small>{current.period}</small></>}
      </div>
    </div>
  );
}
