"use client";

import { ArrowUpRight, Quote } from "lucide-react";
import { useState } from "react";

import { recommendations, recommendationsUrl } from "@/data/site";

const initials = (name: string) =>
  name.replace(/^Dr\.\s*/, "").split(/\s+/).map((part) => part[0]).slice(0, 2).join("");

/**
 * LinkedIn recommendations, after the reference's "Don't take it from us"
 * block: a row of people to pick from and one glass card with their words.
 * Text is quoted verbatim.
 */
export default function Recommendations() {
  const [active, setActive] = useState(0);
  const rec = recommendations[active];

  return (
    <section id="recommendations" className="recs-section wrap section-space" aria-labelledby="recs-heading">
      <div className="recs-head" data-reveal>
        <h2 id="recs-heading">Don’t take it from me.<br /><em>Take it from them.</em></h2>
        <p>Recommendations from a client, a manager and a senior colleague, as written on LinkedIn.</p>
      </div>
      <div className="recs-people" role="tablist" aria-label="Recommendations" onKeyDown={(e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = (active + (e.key === "ArrowRight" ? 1 : -1) + recommendations.length) % recommendations.length;
        setActive(next);
        document.getElementById(`rec-tab-${next}`)?.focus();
      }}>
        {recommendations.map((r, i) => (
          <button key={r.name} type="button" role="tab" id={`rec-tab-${i}`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} aria-controls="rec-panel" className="recs-person" onClick={() => setActive(i)}>
            <span className="recs-avatar" aria-hidden="true">{initials(r.name)}</span>
            <span className="recs-who"><strong>{r.name}</strong><small>{r.relation}</small></span>
          </button>
        ))}
      </div>
      <article id="rec-panel" role="tabpanel" aria-labelledby={`rec-tab-${active}`} className="recs-card" key={rec.name}>
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
    </section>
  );
}
