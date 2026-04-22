"use client";

import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";
import { Reveal } from "@/components/Reveal";

type StaggerProps = {
  children: ReactNode;
  className?: string;
};

export function Stagger({ children, className }: StaggerProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }

        return cloneElement(child as ReactElement<StaggerItemProps>, {
          __staggerIndex: index
        });
      })}
    </div>
  );
}

type StaggerItemProps = StaggerProps & {
  __staggerIndex?: number;
};

export function StaggerItem({ children, className, __staggerIndex = 0 }: StaggerItemProps) {
  return (
    <Reveal className={className} delay={0.04 + __staggerIndex * 0.08}>
      {children}
    </Reveal>
  );
}
