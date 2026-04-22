import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ArrowUpRightIcon, FacebookIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { PageIntro } from "@/components/PageIntro";
import { contactLinks, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ways to get in touch for internships, collaborations, writing, and project opportunities."
};

const contactIconMap = {
  email: MailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon
} as const;

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Open to internships, collaborations, and meaningful conversations."
        description="If you want to connect about product work, technical writing, student-focused tools, or applied AI projects, I would be glad to hear from you."
      />
      <div className="mx-auto grid w-full max-w-[1220px] gap-6 px-4 pb-20 sm:px-8 sm:pb-24 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
        <section className="surface rounded-[2rem] border border-line/80 p-6 shadow-soft sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-accent">Availability</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Available for internships, project collaboration, writing, and community work.</h2>
          <p className="mt-5 text-base leading-8 text-muted">
            Email is the fastest way to reach me. A short note with context, timeline, and what kind of collaboration
            you have in mind is always helpful.
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
      </div>
    </>
  );
}
