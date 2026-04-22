import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProjectCard } from "@/components/ProjectCard";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies across student platforms, NLP systems, graphics projects, and academic engineering work."
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="Case studies built around constraints, not just outcomes."
        description="Each project is documented as a full narrative covering the problem, the context, the solution, the process, the challenges, and the lessons learned."
      />
      <div className="pb-24">
        <div className="mx-auto flex w-full max-w-[1220px] flex-col gap-6 px-5 sm:px-8 lg:px-10">
          <Stagger className="grid gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </>
  );
}
