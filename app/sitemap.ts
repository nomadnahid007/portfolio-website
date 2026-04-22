import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs();
  const routes = ["", "/projects", "/research", "/experience", "/skills", "/writing", "/about", "/contact"];

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date()
    })),
    ...projectSlugs.map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`),
      lastModified: new Date()
    }))
  ];
}
