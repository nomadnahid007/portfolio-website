import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { RichText } from "@/components/RichText";
import { ResearchThesisCard } from "@/components/ResearchThesisCard";
import { getResearchByKind } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "Undergraduate thesis work on runtime-adaptive pruning for large language models."
};

export default async function ResearchPage() {
  const thesisEntries = await getResearchByKind("thesis");

  const thesis = thesisEntries[0];
  const diagrams = thesis
    ? [
        thesis.frontmatter.diagram
          ? {
              src: thesis.frontmatter.diagram,
              alt: "Detailed SPRINT methodology diagram covering the full adaptive pruning pipeline",
              label: "Detailed full-pipeline diagram"
            }
          : null,
        thesis.frontmatter.secondaryDiagram
          ? {
              src: thesis.frontmatter.secondaryDiagram,
              alt: "Supplementary methodology diagram from the SPRINT undergraduate thesis",
              label: "Supplementary methodology diagram"
            }
          : null
      ].filter(Boolean) as { src: string; alt: string; label: string }[]
    : [];

  return (
    <>
      <PageIntro
        eyebrow="Research"
        title="Undergraduate thesis and research output."
        description="This section centers on my undergraduate thesis work on runtime-adaptive pruning for large language models and the methodology behind the final system."
      />
      <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-8 px-5 pb-24 sm:px-8 lg:px-10">
        {thesis ? (
          <ResearchThesisCard
            title={thesis.frontmatter.title}
            period={thesis.frontmatter.period}
            status={thesis.frontmatter.status}
            tags={thesis.frontmatter.tags}
            summary={`${thesis.frontmatter.summary} The work is centered on runtime adaptation: deciding how aggressively to prune an LLM based on prompt sensitivity, early backbone signals, and live hardware telemetry.`}
            openInNewTabHref="/research"
            diagrams={diagrams}
            gist={
              <>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-accent">Overall gist</p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    SPRINT combines oracle sensitivity labeling, a learned complexity router, and a DDQN controller so
                    the system can choose different structural pruning actions per prompt instead of relying on one
                    static pruning profile for every situation.
                  </p>
                </div>
                <ul className="grid gap-3 text-sm leading-7 text-foreground/84">
                  <li className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Built around a balanced 10,000-prompt dataset across GSM8K, MBPP, WikiText-2, MMLU, and BoolQ.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Uses a BERT-mini-based router to predict sensitivity before inference and guide pruning decisions.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <span>Targets real end-to-end speedup by applying structural actions such as layer skipping and head pruning.</span>
                  </li>
                </ul>
              </>
            }
            details={<RichText>{thesis.content}</RichText>}
          />
        ) : null}
      </div>
    </>
  );
}
