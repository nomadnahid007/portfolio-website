# Portfolio

A production-grade personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Lenis, and file-based MDX content.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis
- MDX via `next-mdx-remote`

## Features

- Responsive routes for home, projects, research, experience, skills, writing, about, and contact
- Dynamic MDX-backed project case studies at `/projects/[slug]`
- Research page limited to thesis and current research work only
- Writing page with inline MDX and optional external links
- Custom cursor trail with hover expansion
- Word-reveal homepage preloader
- SVG path-based route transitions
- Lenis smooth scrolling with scroll reveal motion
- SEO metadata, sitemap, robots, semantic HTML, and accessible focus behavior

## Structure

```text
app/
components/
content/
lib/
styles/
public/
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Content Editing

- Projects live in `content/projects/*.mdx`
- Research entries live in `content/research/*.mdx`
- Writing entries live in `content/writing/*.mdx`
- Shared non-MDX content lives in `content/site.ts` and `lib/site-config.ts`

Every project MDX file should keep the case-study structure:

- Problem
- Context
- Goal
- Solution
- Process
- Challenges
- Outcomes
- Reflection

## Quality Checks

Run:

```bash
npm run lint
npm run typecheck
```
