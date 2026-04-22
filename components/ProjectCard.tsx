import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { EntryPreview, ProjectFrontmatter } from "@/lib/types";
import { Tag } from "@/components/Tag";

type ProjectCardProps = {
  project: EntryPreview<ProjectFrontmatter>;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-line/80 bg-card shadow-soft transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
      <Link
        href={`/projects/${project.slug}` as Route}
        className="grid lg:grid-cols-[1.15fr_0.85fr]"
        data-cursor="interactive"
      >
        <div className="relative overflow-hidden border-b border-line/70 bg-[#f4efe6] lg:border-b-0 lg:border-r">
          <div className="relative aspect-[16/11] h-full w-full">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority={project.featured}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 text-sm text-muted">
            <span>{project.year}</span>
            <span>{project.readingTime}</span>
          </div>
          <div>
            <h3 className="font-serif text-[1.8rem] leading-tight sm:text-3xl">{project.title}</h3>
            <p className="mt-4 text-base leading-7 text-muted">{project.summary}</p>
          </div>
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
      </Link>
    </article>
  );
}
