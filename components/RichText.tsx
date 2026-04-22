import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RichTextProps = {
  children: ReactNode;
  className?: string;
};

export function RichText({ children, className }: RichTextProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none prose-headings:font-serif prose-a:font-medium prose-ul:list-disc prose-ol:list-decimal",
        className
      )}
    >
      {children}
    </div>
  );
}
