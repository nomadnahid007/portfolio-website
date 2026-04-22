import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Timeline } from "@/components/Timeline";
import { experience } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Experience",
  description: "Experience across product management, tutoring, writing, and communication-focused roles."
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Experience"
        title="Experience across product, teaching, writing, and student leadership."
        description="My experience combines structured product work, academic support, writing, and team coordination. The common thread is making information more useful to people."
      />
      <div className="mx-auto w-full max-w-[1220px] px-5 pb-24 sm:px-8 lg:px-10">
        <Timeline items={experience} />
      </div>
    </>
  );
}
