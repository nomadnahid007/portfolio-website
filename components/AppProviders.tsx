"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DeferredEnhancements = dynamic(
  () => import("@/components/Enhancements").then((module) => module.Enhancements),
  {
    ssr: false
  }
);

export function AppProviders() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeoutId = 0;
    let idleId = 0;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const enable = () => setReady(true);

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(enable, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(enable, 900);
    }

    return () => {
      window.clearTimeout(timeoutId);
      if (idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return ready ? <DeferredEnhancements /> : null;
}
