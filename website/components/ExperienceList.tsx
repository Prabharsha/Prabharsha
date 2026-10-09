import { experience } from "@/data/site";

/**
 * Experience, grouped by company. Each role row: title, period, summary,
 * highlights and the stack used.
 */
export default function ExperienceList() {
  return (
    <div className="exp-companies">
      {experience.map((job) => (
        <section key={job.company} className="exp-company" aria-labelledby={`exp-${job.company}`}>
          <header className="exp-company-head">
            <h3 id={`exp-${job.company}`}>{job.company}</h3>
            <p>{job.meta}</p>
          </header>
          <ol className="exp-list">
            {job.roles.map((role) => (
              <li key={role.title + role.period} className="exp-row">
                <div className="exp-main">
                  <p className="exp-meta">{role.period}</p>
                  <h4>{role.title}</h4>
                  {role.tags && <ul className="tag-list" aria-label={`${role.title} stack`}>{role.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
                </div>
                <div className="exp-body">
                  <p className="exp-detail">{role.detail}</p>
                  {role.highlights && <ul className="exp-points">{role.highlights.map((h) => <li key={h}>{h}</li>)}</ul>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
