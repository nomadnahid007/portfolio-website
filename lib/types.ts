import type { ReactNode } from "react";
import type { Route } from "next";

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  year: string;
  role: string;
  client: string;
  stack: string[];
  featured: boolean;
  order: number;
  cover: string;
  hoverCover?: string;
  outcome: string;
  links?: {
    label: string;
    href: string;
    kind?: "github" | "demo" | "live" | "external";
  }[];
};

export type ResearchFrontmatter = {
  title: string;
  slug: string;
  kind: "thesis" | "current-work";
  summary: string;
  period: string;
  status: string;
  tags: string[];
  diagram?: string;
  secondaryDiagram?: string;
  paperUrl?: string;
  companionUrl?: string;
};

export type WritingFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  publication?: string;
  externalUrl?: string;
  featured: boolean;
  tags: string[];
};

export type CompiledEntry<T> = {
  frontmatter: T;
  content: ReactNode;
};

export type EntryPreview<T> = T & {
  readingTime: string;
};

export type NavigationItem = {
  href: Route;
  label: string;
};

export type SectionNavItem = {
  id: string;
  label: string;
};

export type TimelineItem = {
  company: string;
  role: string;
  employmentType?: "Full-time" | "Part-time";
  period: string;
  location: string;
  summary: string;
  points: string[];
  href?: string;
  hrefLabel?: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export type ContactLink = {
  icon: "email" | "github" | "linkedin" | "facebook";
  label: string;
  href: string;
  value: string;
  note: string;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  note?: string;
};
