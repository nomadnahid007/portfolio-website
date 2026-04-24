import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageIntro } from "@/components/PageIntro";
import { WritingCard } from "@/components/WritingCard";
import { getWritingEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Published journalism and literary writing by Nahid Hassan across BracU Express and The Daily Star."
};

export default async function WritingPage() {
  const entries = await getWritingEntries();
  const featured = entries.filter((entry) => entry.frontmatter.featured);
  const bracuExpress = entries.filter((entry) => entry.frontmatter.publication === "BracU Express");
  const dailyStar = entries.filter((entry) => entry.frontmatter.publication === "The Daily Star");

  return (
    <>
      <PageIntro
        eyebrow="Writing"
        title="Published writing shaped by journalism, campus life, and literary experimentation."
        description="This archive is fully file-based on the site for speed and reliability, while each piece links back to its original publication when you want to read it in full."
        aside={
          <div className="space-y-4">
            <p className="text-sm leading-7 text-muted">A curated archive of published work across reporting, opinion, and short-form literary selections.</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-line/80 bg-background/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Pieces</p>
                <p className="mt-2 font-serif text-3xl">{entries.length}</p>
              </div>
              <div className="rounded-2xl border border-line/80 bg-background/60 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted">Sources</p>
                <p className="mt-2 font-serif text-3xl">2</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="https://bracuexpress.com/author/nahid-hassan/" variant="ghost">
                BracU Express archive
              </Button>
              <Button href="/writing" target="_blank">
                Open this page in new tab
              </Button>
            </div>
          </div>
        }
      />

      <div className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 sm:px-8 lg:px-10">
        <section className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <div className="rounded-[2rem] border border-line/80 bg-card/82 p-6 shadow-soft sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-accent">Featured Note</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">The &quot;August&quot; milestone and the photo I still keep close.</h2>
            <p className="mt-5 text-base leading-8 text-muted">
              This image sits in the writing archive because it marks something more personal than publication alone.
              It was a birthday gift from Arpita, Nazifa, and Stella in 2024 after my Sehri Tales piece &quot;August&quot; was
              featured. I wanted the site to remember that encouragement, not just list links.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="https://www.thedailystar.net/star-literature/news/august-sehri-tales-selections-day-20-3579761">
                Read &quot;August&quot;
              </Button>
              <Button href="https://www.thedailystar.net/tags/sehri-tales" variant="ghost">
                Explore Sehri Tales
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-line/80 bg-card/82 shadow-soft">
            <div className="relative aspect-[4/3] sm:aspect-[5/4]">
              <Image
                src="/images/august-gift.jpg"
                alt="A birthday gift celebrating Nahid Hassan's Sehri Tales piece August"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Featured Writing</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">Pieces I&apos;d want a recruiter, editor, or collaborator to see first.</h2>
          </div>
          <div className="grid gap-6">
            {featured.map((entry) => (
              <WritingCard key={entry.frontmatter.slug} entry={entry} />
            ))}
          </div>
        </section>

        <section className="grid gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">BracU Express</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">Campus reporting, interviews, and opinion pieces.</h2>
          </div>
          <div className="grid gap-6">
            {bracuExpress.map((entry) => (
              <WritingCard key={entry.frontmatter.slug} entry={entry} />
            ))}
          </div>
        </section>

        <section className="grid gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">The Daily Star</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight">Sehri Tales selections published in Star Literature.</h2>
          </div>
          <div className="grid gap-6">
            {dailyStar.map((entry) => (
              <WritingCard key={entry.frontmatter.slug} entry={entry} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
