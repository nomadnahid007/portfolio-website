import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-card/75 px-3 py-1 text-xs font-medium tracking-[0.14em] text-muted uppercase",
        className
      )}
      {...props}
    />
  );
}
