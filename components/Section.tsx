import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  contentClassName
}: SectionProps) {
  return (
    <section id={id} className={cn("py-14 sm:py-24 lg:py-30", className)}>
      <Container>
        {(eyebrow || title || description) && (
          <div className="mb-8 max-w-3xl sm:mb-14">
            {eyebrow ? (
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
            ) : null}
            {title ? <h2 className="balance font-serif text-3xl leading-[0.96] sm:text-5xl">{title}</h2> : null}
            {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-lg sm:leading-8">{description}</p> : null}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </Container>
    </section>
  );
}
