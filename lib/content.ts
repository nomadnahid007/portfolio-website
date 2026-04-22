import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import remarkGfm from "remark-gfm";
import type {
  CompiledEntry,
  EntryPreview,
  ProjectFrontmatter,
  ResearchFrontmatter,
  WritingFrontmatter
} from "@/lib/types";
import { readingTimeFromContent } from "@/lib/utils";
import { mdxComponents } from "@/components/MDXComponents";

const contentRoot = path.join(process.cwd(), "content");

const readDirectory = cache(async (folder: string) => {
  const directory = path.join(contentRoot, folder);
  const files = await fs.readdir(directory);

  return Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const fullPath = path.join(directory, file);
        const source = await fs.readFile(fullPath, "utf8");
        return {
          source,
          fileName: file,
          slug: file.replace(/\.mdx$/, "")
        };
      })
  );
});

async function compileEntry<T>(source: string) {
  const { content } = await compileMDX<T>({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm]
      },
      parseFrontmatter: false
    },
    components: mdxComponents
  });

  return content;
}

const getEntries = cache(async <T,>(folder: string) => {
  const files = await readDirectory(folder);

  return Promise.all(
    files.map(async ({ source }) => {
      const { data, content } = matter(source);
      const frontmatter = data as T;
      return {
        frontmatter,
        content,
        readingTime: readingTimeFromContent(content)
      };
    })
  );
});

export const getProjects = cache(async (): Promise<EntryPreview<ProjectFrontmatter>[]> => {
  const entries = await getEntries<ProjectFrontmatter>("projects");

  return entries
    .map(({ frontmatter, readingTime }) => ({ ...frontmatter, readingTime }))
    .sort((a, b) => a.order - b.order);
});

export const getFeaturedProjects = cache(async () => {
  const projects = await getProjects();
  return projects.filter((project) => project.featured);
});

export const getProjectSlugs = cache(async () => {
  const projects = await getProjects();
  return projects.map((project) => project.slug);
});

export const getProjectBySlug = cache(async (slug: string): Promise<CompiledEntry<ProjectFrontmatter> | null> => {
  const filePath = path.join(contentRoot, "projects", `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const compiled = await compileEntry<ProjectFrontmatter>(content);

    return {
      frontmatter: data as ProjectFrontmatter,
      content: compiled
    };
  } catch {
    return null;
  }
});

export const getResearchEntries = cache(async () => {
  const entries = await getEntries<ResearchFrontmatter>("research");

  return entries
    .map(({ frontmatter, readingTime }) => ({ ...frontmatter, readingTime }))
    .sort((a, b) => a.kind.localeCompare(b.kind));
});

export const getResearchByKind = cache(async (kind: ResearchFrontmatter["kind"]) => {
  const entries = await readDirectory("research");

  return Promise.all(
    entries.map(async ({ source }) => {
      const { data, content } = matter(source);
      const frontmatter = data as ResearchFrontmatter;

      if (frontmatter.kind !== kind) {
        return null;
      }

      return {
        frontmatter,
        content: await compileEntry<ResearchFrontmatter>(content)
      };
    })
  ).then((items) => items.filter(Boolean) as CompiledEntry<ResearchFrontmatter>[]);
});

export const getWritingEntries = cache(async () => {
  const entries = await readDirectory("writing");

  const compiled = await Promise.all(
    entries.map(async ({ source }) => {
      const { data, content } = matter(source);
      return {
        frontmatter: data as WritingFrontmatter,
        content: await compileEntry<WritingFrontmatter>(content),
        readingTime: readingTimeFromContent(content)
      };
    })
  );

  return compiled.sort(
    (a, b) => new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
  );
});
