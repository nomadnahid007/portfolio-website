import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Tag } from "@/components/Tag";
import { certifications, skillGroups } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical, product, analytical, and communication skills developed through coursework, internships, and writing."
};

const principles = [
  "Learn quickly, then turn that learning into clearer execution.",
  "Use data and user feedback to support better product decisions.",
  "Explain complex ideas in a way that helps people act on them."
];

export default function SkillsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Skills"
        title="Tools, methods, and habits that compound."
        description="My strongest work happens where product understanding, software implementation, and communication overlap."
      />
      <div className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:px-10">
        <div className="grid gap-6">
          {skillGroups.map((group) => (
            <section key={group.title} className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">{group.title}</p>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted">{group.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </section>
          ))}
          <section className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">Certifications</p>
            <div className="mt-6 grid gap-4">
              {certifications.map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-line/80 bg-background/55 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">{item.issuer}</p>
                  <h3 className="mt-3 text-lg font-medium text-foreground">{item.title}</h3>
                  {item.note ? <p className="mt-2 text-sm leading-7 text-muted">{item.note}</p> : null}
                </article>
              ))}
            </div>
          </section>
        </div>
        <aside className="surface rounded-[2rem] border border-line/80 p-6 shadow-soft sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">Working Principles</p>
          <ul className="mt-6 space-y-5">
            {principles.map((principle) => (
              <li key={principle} className="border-t border-line/80 pt-5 text-base leading-8 text-foreground/84 first:border-0 first:pt-0">
                {principle}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
