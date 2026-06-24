import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  index,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <div className="flex flex-col gap-3">
        <span className="section-index">
          {index} <span className="text-muted">/</span> {title.toLowerCase()}
        </span>
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-muted">{subtitle}</p>
        ) : null}
      </div>
    </Reveal>
  );
}
