import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import type { WritingFrontmatter } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { RichText } from "@/components/RichText";
import { Tag } from "@/components/Tag";

type WritingCardProps = {
  entry: {
    frontmatter: WritingFrontmatter;
    content?: ReactNode;
    readingTime?: string;
  };
};

export function WritingCard({ entry }: WritingCardProps) {
  const isExternal = Boolean(entry.frontmatter.externalUrl);
  const href = entry.frontmatter.externalUrl ?? `/writing#${entry.frontmatter.slug}`;

  return (
    <article id={entry.frontmatter.slug} className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
        {entry.frontmatter.publication ? (
          <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">
            {entry.frontmatter.publication}
          </span>
        ) : null}
        <span>{formatDate(entry.frontmatter.publishedAt)}</span>
        {entry.readingTime ? <span>{entry.readingTime}</span> : null}
      </div>
      <div className="mt-5">
        <h3 className="font-serif text-3xl leading-tight">{entry.frontmatter.title}</h3>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{entry.frontmatter.summary}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {entry.frontmatter.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      {entry.content ? (
        <div className="mt-8 border-t border-line/80 pt-8">
          <RichText>{entry.content}</RichText>
        </div>
      ) : null}
      <div className="mt-8">
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-accent/60 underline-offset-4"
            data-cursor="interactive"
          >
            Read externally <span aria-hidden="true">-&gt;</span>
          </a>
        ) : (
          <Link
            href={href as Route}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-accent/60 underline-offset-4"
            data-cursor="interactive"
          >
            Jump to note
          </Link>
        )}
      </div>
    </article>
  );
}
