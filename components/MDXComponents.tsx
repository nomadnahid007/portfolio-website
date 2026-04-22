import Link from "next/link";
import type { Route } from "next";
import type { ComponentPropsWithoutRef } from "react";

type AnchorProps = ComponentPropsWithoutRef<"a">;

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-14 font-serif text-3xl leading-tight text-foreground first:mt-0" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 className="mt-10 text-xl font-semibold text-foreground" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="text-base leading-8 text-foreground/84 sm:text-lg" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="my-6 space-y-3 pl-5" {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="my-6 space-y-3 pl-5" {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1 text-base leading-8 text-foreground/84 sm:text-lg" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-8 border-l-2 border-accent/40 pl-5 italic text-foreground/72" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-foreground/[0.06] px-1.5 py-1 text-sm text-foreground" {...props} />
  ),
  a: ({ href = "", ...props }: AnchorProps) =>
    href.startsWith("/") ? (
      <Link href={href as Route} className="underline decoration-accent/60 underline-offset-4" {...props} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="underline decoration-accent/60 underline-offset-4"
        {...props}
      />
    )
};
