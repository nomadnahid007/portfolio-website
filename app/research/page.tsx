import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { RichText } from "@/components/RichText";
import { Tag } from "@/components/Tag";
import { getResearchByKind } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "Current research interests in LLM systems, NLP, and educational tooling."
};

export default async function ResearchPage() {
  const [thesisEntries, currentWorks] = await Promise.all([
    getResearchByKind("thesis"),
    getResearchByKind("current-work")
  ]);

  const thesis = thesisEntries[0];

  return (
    <>
      <PageIntro
        eyebrow="Research"
        title="Current research directions and applied investigations."
        description="This section focuses on active interests in LLM systems, NLP, and student-facing technical tools. It stays limited to current work rather than general notes."
      />
      <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-8 px-5 pb-24 sm:px-8 lg:px-10">
        {thesis ? (
          <section className="rounded-[2.25rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">Thesis</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">{thesis.frontmatter.title}</h2>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">
              {thesis.frontmatter.period} | {thesis.frontmatter.status}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {thesis.frontmatter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="mt-8">
              <RichText>{thesis.content}</RichText>
            </div>
          </section>
        ) : null}

        <section>
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">Current Work</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">In-progress research tracks</h2>
            <p className="mt-4 text-base text-muted">
              My current research interests sit at the intersection of LLM applications, NLP workflows, and practical
              systems that make academic or product tasks easier to navigate.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {currentWorks.map((entry) => (
              <article key={entry.frontmatter.slug} className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
                <h3 className="font-serif text-3xl leading-tight">{entry.frontmatter.title}</h3>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted">
                  {entry.frontmatter.period} | {entry.frontmatter.status}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.frontmatter.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="mt-8">
                  <RichText>{entry.content}</RichText>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
