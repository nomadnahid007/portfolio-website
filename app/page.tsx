import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ArrowUpRightIcon, FacebookIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { Preloader } from "@/components/Preloader";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ResearchThesisCard } from "@/components/ResearchThesisCard";
import { RichText } from "@/components/RichText";
import { Section } from "@/components/Section";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { Tag } from "@/components/Tag";
import { Timeline } from "@/components/Timeline";
import { WritingCard } from "@/components/WritingCard";
import { homeHighlights } from "@/content/site";
import { getProjects, getResearchByKind, getWritingEntries } from "@/lib/content";
import { certifications, contactLinks, experience, skillGroups, siteConfig } from "@/lib/site-config";

const principles = [
  "Start with the user problem, then validate with data before expanding scope.",
  "Write specs and explanations that make collaboration easier for design, engineering, and users.",
  "Prefer systems that stay understandable after launch, not just impressive in a demo."
];

const socialLinks = [
  {
    href: siteConfig.social.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon
  },
  {
    href: siteConfig.social.github,
    label: "GitHub",
    icon: GitHubIcon
  },
  {
    href: siteConfig.social.facebook,
    label: "Facebook",
    icon: FacebookIcon
  },
  {
    href: `mailto:${siteConfig.email}`,
    label: "Email",
    icon: MailIcon
  }
] as const;

const contactIconMap = {
  email: MailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon
} as const;

export default async function HomePage() {
  const [projects, thesisEntries, writing] = await Promise.all([
    getProjects(),
    getResearchByKind("thesis"),
    getWritingEntries()
  ]);

  const currentProjects = projects.slice(0, 4);
  const thesis = thesisEntries[0];
  const featuredWriting = writing.filter((entry) => entry.frontmatter.featured).slice(0, 4);
  const thesisDiagrams = thesis
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
      <Preloader />

      <section id="home" className="pb-14 pt-24 sm:pb-24 sm:pt-36">
        <Container>
          <div className="grid gap-5 sm:gap-8 xl:grid-cols-[1.08fr_0.92fr]">
            <Reveal>
              <div className="hero-shell overflow-hidden rounded-[2rem] border border-line/80 p-5 shadow-soft sm:rounded-[2.75rem] sm:p-10">
                <div className="inline-flex rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm text-accent">
                  Hello, I&apos;m
                </div>
                <div className="mt-6 flex flex-col gap-5 sm:gap-6">
                  <h1 className="max-w-[10ch] font-serif text-[3.25rem] leading-[0.9] tracking-[-0.03em] sm:max-w-none sm:text-7xl">
                    Nahid Hassan
                  </h1>
                  <p className="max-w-[16ch] text-[1.85rem] font-medium leading-[1.04] tracking-tight text-foreground sm:max-w-none sm:text-3xl">
                    Product Intern <span className="text-accent">@ Pathao</span>
                  </p>
                </div>
                <p className="mt-5 max-w-[26ch] text-base leading-8 text-muted sm:mt-6 sm:max-w-3xl sm:text-lg sm:leading-9">
                  I work at the intersection of product thinking, student-facing software, and applied AI. My recent
                  work spans ride-product execution at Pathao, academic tooling, plagiarism detection, text
                  clustering, and communication-heavy technical writing.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                  <Button href="/docs/nahid-hassan-cv.pdf" target="_blank" className="w-full justify-center sm:w-auto">
                    View Resume
                  </Button>
                  <Button href="/projects" variant="ghost" className="w-full justify-center sm:w-auto">
                    Explore Projects
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted sm:mt-8">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    const external = item.href.startsWith("http");
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line/80 bg-card/65 text-muted transition hover:-translate-y-0.5 hover:border-accent/45 hover:text-foreground"
                        data-cursor="interactive"
                        aria-label={item.label}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                      </a>
                    );
                  })}
                </div>

                <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
                  {homeHighlights.map((item) => (
                    <div key={item.label} className="rounded-[1.45rem] border border-line/80 bg-card/70 p-5 sm:rounded-[1.6rem]">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted">{item.label}</p>
                      <p className="mt-3 font-serif text-4xl leading-none sm:text-5xl">{item.value}</p>
                      <p className="mt-4 text-sm leading-6 text-muted sm:leading-7">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 sm:mt-10">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">Current Projects</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {currentProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}` as Route}
                        className="rounded-[1.35rem] border border-line/80 bg-card/75 p-4 transition hover:-translate-y-1 hover:border-accent/50"
                        data-cursor="interactive"
                      >
                        <p className="text-sm font-semibold text-foreground">{project.title}</p>
                        <p className="mt-2 text-xs leading-6 text-muted">{project.stack.slice(0, 2).join(" | ")}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="surface overflow-hidden rounded-[2rem] border border-line/80 p-3 shadow-soft sm:rounded-[2.75rem] sm:p-4">
                <div className="relative aspect-[6/5] overflow-hidden rounded-[1.75rem] border border-line/70 sm:aspect-[4/5] sm:rounded-[2.2rem]">
                  <Image
                    src="/images/nahid-hassan-portrait.jpg"
                    alt="Portrait of Nahid Hassan"
                    fill
                    priority
                    className="object-cover object-[62%_36%]"
                    sizes="(max-width: 1280px) 100vw, 42vw"
                  />
                </div>
                <div className="grid gap-4 px-2 pb-2 pt-4 sm:pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-accent">Current Focus</p>
                    <p className="mt-2 text-sm leading-7 text-muted sm:text-base">
                      Product execution for mobility systems, practical NLP projects, and educational tools that solve
                      real friction instead of adding novelty.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Tag>Pathao</Tag>
                    <Tag>BRACU</Tag>
                    <Tag>NLP</Tag>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section
        id="experience"
        eyebrow="Experience"
        title="Work that blends product, communication, and execution."
        description="My work has moved between product management, teaching, writing, and execution-heavy collaboration, with the same emphasis on clarity and follow-through."
      >
        <Timeline items={experience} />
      </Section>

      <Section
        id="projects"
        eyebrow="Projects"
        title="Academic and applied builds with real technical depth."
        description="These projects cover the kinds of problems I keep returning to: student workflows, text understanding, product clarity, and systems that need to be usable beyond the prototype stage."
      >
        <Stagger className="grid gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section
        id="research"
        eyebrow="Research"
        title="Undergraduate thesis on runtime-adaptive pruning for large language models."
        description="My thesis work focuses on SPRINT, a sensitivity-guided framework for selecting structural pruning decisions at inference time using oracle labels, a learned router, and reinforcement learning."
      >
        {thesis ? (
          <Reveal>
            <ResearchThesisCard
              title={thesis.frontmatter.title}
              period={thesis.frontmatter.period}
              status={thesis.frontmatter.status}
              tags={thesis.frontmatter.tags}
              summary={`${thesis.frontmatter.summary} Instead of compressing the model once and using the same structure for every prompt, the thesis explores how runtime signals can help choose different pruning actions based on complexity, hardware state, and quality-speed tradeoffs.`}
              openInNewTabHref="/research"
              diagrams={thesisDiagrams}
              gist={
                <>
                  <p className="text-sm leading-7 text-foreground/84">
                    The core pipeline combines oracle sensitivity labels, a learned complexity router, and a DDQN
                    controller so the system can decide when to skip layers or prune attention heads while keeping
                    degradation bounded.
                  </p>
                  <ul className="grid gap-3 text-sm leading-7 text-foreground/84">
                    <li className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>Built on a 10,000-prompt multi-domain benchmark spanning math, code, language modeling, and QA.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>Designed to deliver structural speed gains that are visible at inference time, not just sparse weights on paper.</span>
                    </li>
                  </ul>
                </>
              }
              details={<RichText>{thesis.content}</RichText>}
            />
          </Reveal>
        ) : null}
      </Section>

      <Section
        id="skills"
        eyebrow="Skills"
        title="The product, technical, and communication stack behind the work."
        description="The strongest part of my work sits where product judgment, technical implementation, and communication support each other."
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="grid gap-6">
            {skillGroups.map((group) => (
              <Reveal key={group.title}>
                <section className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">{group.title}</p>
                  <p className="mt-4 max-w-xl text-base leading-7 text-muted">{group.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
          <Reveal>
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
          </Reveal>
        </div>
      </Section>

      <Section
        eyebrow="Certifications"
        title="Selected certifications that sharpen communication, strategy, and applied AI work."
        description="Focused learning credentials that reinforce how I approach AI systems, communication, and strategic thinking."
      >
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {certifications.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="rounded-[1.8rem] border border-line/80 bg-card/80 p-6 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.issuer}</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight">{item.title}</h3>
                {item.note ? <p className="mt-4 text-sm leading-7 text-muted">{item.note}</p> : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="writing"
        eyebrow="Writing"
        title="Writing across campus journalism, culture, and literary publication."
        description="I treat writing as part of how I think: reporting carefully, structuring ideas cleanly, and making the final piece feel human instead of generic."
      >
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-6">
            {featuredWriting.map((entry) => (
              <Reveal key={entry.frontmatter.slug}>
                <WritingCard entry={entry} />
              </Reveal>
            ))}
            <Reveal delay={0.08}>
              <div className="flex flex-wrap gap-3">
                <Button href="/writing">Open writing archive</Button>
                <Button href="/writing" target="_blank" variant="ghost">
                  Open in new tab
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <aside className="overflow-hidden rounded-[2rem] border border-line/80 bg-card/82 shadow-soft">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/august-gift.jpg"
                  alt="A birthday gift tied to Nahid Hassan's featured Sehri Tales write-up August"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
              </div>
              <div className="space-y-4 p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.22em] text-accent">A Special Memory</p>
                <h3 className="font-serif text-3xl leading-tight">A birthday gift connected to &quot;August&quot; and a writing milestone.</h3>
                <p className="text-base leading-8 text-muted">
                  This photo holds a personal story for me. It was a birthday gift from my friends Arpita, Nazifa,
                  and Stella in 2024 after my Sehri Tales piece &quot;August&quot; was featured, and it remains one of the most
                  meaningful reminders of why writing matters.
                </p>
                <Button href="https://www.thedailystar.net/star-literature/news/august-sehri-tales-selections-day-20-3579761">
                  Read &quot;August&quot;
                </Button>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section
        id="about"
        eyebrow="About"
        title="A builder who likes systems that stay useful and legible."
        description="The common thread in my work is straightforward: take a messy problem, structure it well, and make the outcome easier for someone else to use."
      >
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[2.4rem] border border-line/80 bg-card/80 shadow-soft">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/nahid-hassan-about.png"
                  alt={siteConfig.name}
                  fill
                  className="object-cover object-[58%_28%]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="grid gap-6">
              <article className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
                <h3 className="font-serif text-3xl leading-tight">What I care about</h3>
                <p className="mt-5 text-base leading-8 text-foreground/84">
                  I learn fastest when I have to build, explain, and iterate at the same time. That is why product
                  work, tutoring, journalism, and software projects all feel connected in my career rather than
                  separate tracks.
                </p>
                <p className="mt-5 text-base leading-8 text-foreground/84">
                  I am especially interested in how NLP and LLM-assisted systems can improve educational and
                  user-facing experiences without losing trust, structure, or day-to-day usefulness.
                </p>
              </article>
              <article className="surface rounded-[2rem] border border-line/80 p-6 shadow-soft sm:p-8">
                <h3 className="font-serif text-3xl leading-tight">Current direction</h3>
                <p className="mt-5 text-base leading-8 text-muted">
                  Right now I am focused on product roles where user feedback, analytics, experimentation, and
                  execution all matter, while continuing to build AI and NLP systems that are useful outside the lab.
                </p>
              </article>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Open to internships, collaborations, and meaningful conversations."
        description="If you are working on product, education, student platforms, or applied AI and think there is a fit, I would be glad to connect."
      >
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <section className="surface rounded-[2rem] border border-line/80 p-6 shadow-soft sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">Availability</p>
              <h3 className="mt-4 font-serif text-4xl leading-tight">Available for internships, project collaboration, writing, and community work.</h3>
              <p className="mt-5 text-base leading-8 text-muted">
                Email is the fastest way to reach me. If it helps, send a short note on the context, timeline, and
                kind of collaboration you have in mind.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={`mailto:${siteConfig.email}`} className="w-full justify-center sm:w-auto">
                  Email me
                </Button>
                <Button href={siteConfig.social.linkedin} variant="ghost" className="w-full justify-center sm:w-auto">
                  Connect on LinkedIn
                </Button>
              </div>
            </section>
          </Reveal>
          <Reveal delay={0.06}>
            <section className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">Contact Points</p>
              <div className="mt-6 divide-y divide-line/80">
                {contactLinks.map((link) => {
                  const Icon = contactIconMap[link.icon];
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                      data-cursor="interactive"
                    >
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-line/80 bg-background/65 text-accent transition group-hover:border-accent/35 group-hover:text-foreground">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm uppercase tracking-[0.18em] text-muted">{link.label}</p>
                          <p className="mt-2 text-xl font-medium text-foreground">{link.value}</p>
                          <p className="mt-2 max-w-lg text-sm leading-7 text-muted">{link.note}</p>
                        </div>
                      </div>
                      <span className="inline-flex h-10 w-10 flex-none items-center justify-center self-end rounded-full border border-line/80 text-muted transition group-hover:border-accent/35 group-hover:text-foreground sm:self-auto">
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </section>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
