import type { TimelineItem as TimelineItemType } from "@/lib/types";

type TimelineProps = {
  items: TimelineItemType[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative space-y-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line">
      {items.map((item) => (
        <article key={`${item.company}-${item.period}`} className="relative rounded-[2rem] border border-line/80 bg-card/80 p-6 pl-10 shadow-soft sm:p-8 sm:pl-12">
          <span className="absolute left-0 top-8 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-background bg-accent" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-accent">{item.period}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight">{item.role}</h3>
              <p className="mt-1 text-base text-muted">
                {item.company} | {item.location}
              </p>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">{item.summary}</p>
          </div>
          <ul className="mt-6 grid gap-3 text-base leading-7 text-foreground/84">
            {item.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
