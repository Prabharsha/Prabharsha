"use client";

import { ArrowUpRight, Pause, Play, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { recommendations, recommendationsUrl, type Recommendation } from "@/data/site";

const initials = (name: string) =>
  name.replace(/^Dr\.\s*/, "").split(/\s+/).map((part) => part[0]).slice(0, 2).join("");

/** How long a recommendation stays on screen before the slider moves on. */
function slideDuration(rec: Recommendation): number {
  // TODO(human): return milliseconds for this slide.
  return 9000;
}

/**
 * LinkedIn recommendations as an auto-advancing slider. The active person's
 * chip carries a progress bar; when its CSS animation ends the next slide
 * comes in. Hover, keyboard focus, scrolling away or the pause button freeze
 * it; reduced motion turns autoplay off. Text is quoted verbatim.
 */
export default function Recommendations() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  const count = recommendations.length;
  const go = (i: number) => setActive((i + count) % count);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="recommendations" ref={root} className={`recs-section wrap section-space ${paused || !visible ? "is-paused" : ""}`} aria-labelledby="recs-heading">
      <div className="recs-head" data-reveal>
        <h2 id="recs-heading">Don’t take it from me.<br /><em>Take it from them.</em></h2>
        <p>Recommendations from a client, a manager and a senior colleague, as written on LinkedIn.</p>
      </div>
      <div className="recs-controls">
        <div className="recs-people" role="tablist" aria-label="Recommendations" onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          const next = (active + (e.key === "ArrowRight" ? 1 : -1) + count) % count;
          go(next);
          document.getElementById(`rec-tab-${next}`)?.focus();
        }}>
          {recommendations.map((r, i) => (
            <button key={r.name} type="button" role="tab" id={`rec-tab-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} aria-controls={`rec-panel-${i}`} className="recs-person" onClick={() => go(i)}>
              <span className="recs-avatar" aria-hidden="true">{initials(r.name)}</span>
              <span className="recs-who"><strong>{r.name}</strong><small>{r.relation}</small></span>
              {active === i && <i className="recs-progress" aria-hidden="true" style={{ animationDuration: `${slideDuration(r)}ms` }} onAnimationEnd={() => go(i + 1)} />}
            </button>
          ))}
        </div>
        <button type="button" className="recs-toggle" aria-label={paused ? "Play recommendations" : "Pause recommendations"} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>
      <div className="recs-stage">
        {recommendations.map((rec, i) => (
          <article key={rec.name} id={`rec-panel-${i}`} role="tabpanel" aria-labelledby={`rec-tab-${i}`}
            className={`recs-card ${i === active ? "is-active" : i < active ? "is-past" : ""}`}>
            <Quote className="recs-mark" aria-hidden="true" />
            <blockquote>
              {rec.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </blockquote>
            <footer className="recs-foot">
              <span className="recs-avatar recs-avatar--lg" aria-hidden="true">{initials(rec.name)}</span>
              <div><strong>{rec.name}</strong><span>{rec.title}</span><small>{rec.relation} · {rec.date}</small></div>
              <a className="pill-link" href={recommendationsUrl} target="_blank" rel="noopener noreferrer">View on LinkedIn <ArrowUpRight size={16} /></a>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
