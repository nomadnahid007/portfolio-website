"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type RouteTransitionProps = {
  children: ReactNode;
};

const initialPath = "M0 0 H100 V100 Q50 86 0 100 Z";
const exitPath = "M0 0 H100 V0 Q50 0 0 0 Z";

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={mounted ? { opacity: 0, y: 18 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {mounted ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                fill="rgb(var(--foreground) / 1)"
                initial={{ d: initialPath }}
                animate={{ d: exitPath }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              />
            </svg>
          </motion.div>
        ) : null}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
