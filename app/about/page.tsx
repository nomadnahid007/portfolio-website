import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageIntro } from "@/components/PageIntro";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "About Nahid Hassan and the work he is doing across product, writing, and applied computing."
};

const values = [
  "Clear explanation matters as much as technical correctness.",
  "Product decisions get stronger when they are grounded in user feedback and real usage data.",
  "Writing, teaching, and building are complementary ways of learning."
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="A builder who likes product clarity, strong communication, and thoughtful systems."
        description="I am a Computer Science and Engineering student at BRAC University, currently working as a Product Management Intern at Pathao while building projects in web development, NLP, and applied AI."
      />
      <div className="mx-auto grid w-full max-w-[1220px] gap-8 px-5 pb-24 sm:px-8 lg:grid-cols-[0.78fr_1fr] lg:px-10">
        <div className="overflow-hidden rounded-[2.5rem] border border-line/80 bg-card shadow-soft">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/nahid-hassan-about.png"
              alt={siteConfig.name}
              fill
              className="object-cover object-[58%_28%]"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </div>
        </div>
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-line/80 bg-card/80 p-6 shadow-soft sm:p-8">
            <h2 className="font-serif text-3xl leading-tight">How I approach the work</h2>
            <p className="mt-5 text-base leading-8 text-foreground/84">
              I enjoy work that sits between technical problem-solving and clear communication. That is why product
              management, tutoring, journalism, and software building all feel connected to me rather than separate
              tracks.
            </p>
            <p className="mt-5 text-base leading-8 text-foreground/84">
              At Pathao I have been learning how user feedback, analytics, and feature planning come together in real
              product work. At BRAC University, tutoring taught me how to break difficult concepts into explanations
              that students can actually use. Writing for BracU Express sharpened the same instinct from a different
              angle.
            </p>
          </section>
          <section className="surface rounded-[2rem] border border-line/80 p-6 shadow-soft sm:p-8">
            <h2 className="font-serif text-3xl leading-tight">What matters to me</h2>
            <ul className="mt-6 space-y-4">
              {values.map((value) => (
                <li key={value} className="flex gap-3 text-base leading-8 text-foreground/84">
                  <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact">Get in touch</Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
