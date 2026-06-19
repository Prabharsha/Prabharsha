import { MapPin, Code2, Rocket } from "lucide-react";
import { site } from "@/data/site";
import SectionHeading from "./ui/SectionHeading";
import GlassCard from "./ui/GlassCard";
import Reveal from "./ui/Reveal";

const facts = [
  { Icon: MapPin, label: "Location", value: site.location },
  { Icon: Code2, label: "Focus", value: site.focus },
  { Icon: Rocket, label: "Now building", value: site.building },
];

export default function About() {
  return (
    <section id="about" className="container-px scroll-mt-24 py-24">
      <SectionHeading index="02" title="About" />
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <GlassCard hover={false} className="h-full p-7 sm:p-9">
            <p className="text-lg leading-relaxed text-ink/90">{site.bio}</p>
            <p className="mt-4 leading-relaxed text-muted">
              I care about clean architecture, dependable APIs and interfaces
              that feel effortless. Outside of work I build side projects to
              learn new tools across the stack.
            </p>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="grid h-full gap-4">
            {facts.map(({ Icon, label, value }) => (
              <GlassCard
                key={label}
                className="flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-xs uppercase tracking-wider text-muted">
                    {label}
                  </span>
                  <span className="block font-medium">{value}</span>
                </span>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
