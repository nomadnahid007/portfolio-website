"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { ZoomableImageGallery } from "@/components/ZoomableImageGallery";

type Diagram = {
  src: string;
  alt: string;
  label: string;
};

type ResearchThesisCardProps = {
  title: string;
  period: string;
  status: string;
  tags: string[];
  summary: string;
  gist: ReactNode;
  details: ReactNode;
  diagrams: Diagram[];
  openInNewTabHref: string;
};

export function ResearchThesisCard({
  title,
  period,
  status,
  tags,
  summary,
  gist,
  details,
  diagrams,
  openInNewTabHref
}: ResearchThesisCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rounded-[2.25rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">Thesis</p>
      <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr]">
        <div>
          <h2 className="mt-4 font-serif text-4xl leading-tight">{title}</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">
            {period} | {status}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{summary}</p>
          <div className="mt-6 grid gap-4 rounded-[1.6rem] border border-line/80 bg-background/55 p-5">{gist}</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setExpanded((value) => !value)}>{expanded ? "Hide details" : "View details"}</Button>
            <Button href={openInNewTabHref} target="_blank" variant="ghost">
              Open in new tab
            </Button>
          </div>
        </div>
        {diagrams.length ? <ZoomableImageGallery images={diagrams} className="grid gap-4" /> : null}
      </div>
      {expanded ? <div className="mt-8">{details}</div> : null}
    </section>
  );
}
