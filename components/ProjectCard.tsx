import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { EntryPreview, ProjectFrontmatter } from "@/lib/types";
import { ArrowUpRightIcon, GitHubIcon, GlobeIcon, PlayIcon } from "@/components/Icons";
import { Tag } from "@/components/Tag";

type ProjectCardProps = {
  project: EntryPreview<ProjectFrontmatter>;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const iconMap = {
    github: GitHubIcon,
    demo: PlayIcon,
    live: GlobeIcon,
    external: ArrowUpRightIcon
  } as const;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-line/80 bg-card shadow-soft transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <Link
          href={`/projects/${project.slug}` as Route}
          className="relative overflow-hidden border-b border-line/70 bg-[#f4efe6] lg:border-b-0 lg:border-r"
          data-cursor="interactive"
        >
          <div className="relative aspect-[16/11] h-full w-full [perspective:1400px]">
            <div
              className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${
                project.hoverCover ? "group-hover:[transform:rotateY(180deg)]" : ""
              }`}
            >
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority={project.featured}
                />
              </div>
              {project.hoverCover ? (
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <Image
                    src={project.hoverCover}
                    alt={`${project.title} alternate preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </Link>
        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 text-sm text-muted">
            <span>{project.year}</span>
            <span>{project.readingTime}</span>
          </div>
          <div>
            <Link href={`/projects/${project.slug}` as Route} data-cursor="interactive">
              <h3 className="font-serif text-[1.8rem] leading-tight transition hover:text-accent sm:text-3xl">{project.title}</h3>
            </Link>
            <p className="mt-4 text-base leading-7 text-muted">{project.summary}</p>
          </div>
          {project.links?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => {
                const Icon = iconMap[link.kind ?? "external"];
                return (
                  <a
                    key={`${project.slug}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-background/65 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted transition hover:border-accent/35 hover:text-foreground"
                    data-cursor="interactive"
                    aria-label={`${link.label} for ${project.title}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
          <div className="mt-auto grid gap-2 text-sm text-foreground/70">
            <p>
              <span className="text-muted">Role</span> {project.role}
            </p>
            <p>
              <span className="text-muted">Outcome</span> {project.outcome}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
