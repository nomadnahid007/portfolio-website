import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  className?: string;
  aside?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, className, aside }: PageIntroProps) {
  return (
    <section className={cn("pb-8 pt-24 sm:pb-14 sm:pt-36", className)}>
      <Container>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.26em] text-accent">{eyebrow}</p>
            <h1 className="balance font-serif text-4xl leading-[0.94] sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">{description}</p>
          </div>
          {aside ? <div className="rounded-[2rem] border border-line/80 bg-card/60 p-6">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
