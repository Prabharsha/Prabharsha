import { experience } from "@/data/site";

const rows = experience.flatMap((job) => job.roles.map((role) => ({ ...role, company: job.company })));

/** Role list modelled on the reference's "Awards" rows: one line per role. */
export default function ExperienceList() {
  return (
    <ol className="exp-list">
      {rows.map((row) => (
        <li key={`${row.company}-${row.title}`} className="exp-row">
          <div className="exp-main">
            <h3>{row.title}</h3>
            <p className="exp-meta">{row.company} · {row.period}</p>
          </div>
          <p className="exp-detail">{row.detail}</p>
        </li>
      ))}
    </ol>
  );
}
