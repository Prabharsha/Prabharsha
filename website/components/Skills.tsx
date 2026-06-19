import { skillGroups } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";
import Reveal from "./ui/Reveal";

export default function Skills() {
  return (
    <section id="skills" className="container-px scroll-mt-24 py-24">
      <SectionHeading
        index="04"
        title="Skills"
        subtitle="The tools I reach for day to day, plus a few I'm exploring on the side."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.label}
            variant="scale"
            delay={i * 0.06}
            className={group.secondary ? "sm:col-span-2 lg:col-span-3" : ""}
          >
            <GlassCard className="h-full p-6">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="font-mono text-sm uppercase tracking-wider text-accent">
                  {group.label}
                </h3>
                {group.note ? (
                  <span className="text-xs text-muted">{group.note}</span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map(({ name, Icon, color }) => (
                  <span
                    key={name}
                    className={`group flex items-center gap-2 rounded-lg border border-line/10 bg-line/[0.03] px-3 py-1.5 text-sm transition-colors hover:border-accent/40 ${
                      group.secondary ? "opacity-80" : ""
                    }`}
                  >
                    <Icon
                      className="h-4 w-4 shrink-0"
                      style={{ color }}
                      aria-hidden
                    />
                    {name}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
