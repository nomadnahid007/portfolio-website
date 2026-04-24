import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon, GitHubIcon, GlobeIcon, PlayIcon } from "@/components/Icons";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { RichText } from "@/components/RichText";
import { Tag } from "@/components/Tag";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found"
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const iconMap = {
    github: GitHubIcon,
    demo: PlayIcon,
    live: GlobeIcon,
    external: ArrowUpRightIcon
  } as const;

  if (!project) {
    notFound();
  }

  return (
    <article className="pb-24 pt-28 sm:pt-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-accent">Project Case Study</p>
            <h1 className="balance mt-4 font-serif text-5xl leading-[0.96] sm:text-6xl">{project.frontmatter.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">{project.frontmatter.summary}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.frontmatter.stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
          <aside className="surface rounded-[2rem] border border-line/80 p-6 shadow-soft lg:sticky lg:top-28">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="uppercase tracking-[0.18em] text-muted">Year</dt>
                <dd className="mt-2 text-base text-foreground">{project.frontmatter.year}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-muted">Role</dt>
                <dd className="mt-2 text-base text-foreground">{project.frontmatter.role}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-muted">Client</dt>
                <dd className="mt-2 text-base text-foreground">{project.frontmatter.client}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.18em] text-muted">Outcome</dt>
                <dd className="mt-2 text-base leading-7 text-foreground">{project.frontmatter.outcome}</dd>
              </div>
            </dl>
            {project.frontmatter.links?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {project.frontmatter.links.map((link) => {
                  const Icon = iconMap[link.kind ?? "external"];
                  return (
                    <a
                      key={`${project.frontmatter.slug}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-background/65 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted transition hover:border-accent/35 hover:text-foreground"
                      data-cursor="interactive"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            ) : null}
            <Button href="/projects" variant="ghost" className="mt-8 w-full justify-center">
              Back to projects
            </Button>
          </aside>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-line/80 bg-card shadow-soft">
          <div className="relative aspect-[16/9]">
            <Image
              src={project.frontmatter.cover}
              alt={project.frontmatter.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <RichText>{project.content}</RichText>
          <aside className="rounded-[2rem] border border-line/80 bg-card/70 p-6 text-sm leading-7 text-muted">
            Every project page on this portfolio follows the same full-case-study structure: problem, context, goal,
            solution, process, challenges, outcomes, and reflection.
          </aside>
        </div>
      </Container>
    </article>
  );
}
