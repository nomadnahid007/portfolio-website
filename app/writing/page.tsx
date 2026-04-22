import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { WritingCard } from "@/components/WritingCard";
import { getWritingEntries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing on explanation, product learning, and communicating technical ideas clearly."
};

export default async function WritingPage() {
  const entries = await getWritingEntries();

  return (
    <>
      <PageIntro
        eyebrow="Writing"
        title="Writing shaped by product work, tutoring, and journalism."
        description="This section collects internal notes and short essays on explanation, user feedback, and building better technical communication habits."
      />
      <div className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 sm:px-8 lg:px-10">
        {entries.map((entry) => (
          <WritingCard key={entry.frontmatter.slug} entry={entry} />
        ))}
      </div>
    </>
  );
}
