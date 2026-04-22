import Link from "next/link";
import type { Route } from "next";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
};

type LinkButtonProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

function buttonStyles(variant: NonNullable<SharedProps["variant"]>) {
  return cn(
    "group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
    variant === "primary"
      ? "border-foreground bg-foreground text-background hover:-translate-y-0.5 hover:bg-accent hover:text-white"
      : "border-line bg-card/70 text-foreground hover:-translate-y-0.5 hover:border-foreground hover:bg-card"
  );
}

function ButtonArrow() {
  return (
    <span aria-hidden="true" className="inline-flex overflow-hidden">
      <span className="transition duration-300 group-hover:-translate-y-5 group-hover:translate-x-5">-&gt;</span>
    </span>
  );
}

export function Button({ children, className, variant = "primary", ...props }: LinkButtonProps | NativeButtonProps) {
  if ("href" in props && props.href) {
    const { href, target, rel, ...anchorProps } = props as LinkButtonProps;
    const isExternal = target === "_blank" || !href.startsWith("/");

    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noreferrer"}
          className={cn(buttonStyles(variant), className)}
          data-cursor="interactive"
          {...anchorProps}
        >
          <span>{children}</span>
          <ButtonArrow />
        </a>
      );
    }

    return (
      <Link
        href={href as Route}
        className={cn(buttonStyles(variant), className)}
        data-cursor="interactive"
        {...anchorProps}
      >
        <span>{children}</span>
        <ButtonArrow />
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as NativeButtonProps;

  return (
    <button
      type={type}
      className={cn(buttonStyles(variant), className)}
      data-cursor="interactive"
      {...buttonProps}
    >
      <span>{children}</span>
      <ButtonArrow />
    </button>
  );
}
