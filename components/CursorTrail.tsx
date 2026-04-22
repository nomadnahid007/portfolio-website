"use client";

import { useEffect, useRef } from "react";

const TRAIL_SIZE = 6;

export function CursorTrail() {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const enabled = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!enabled) {
      return;
    }

    document.documentElement.dataset.customCursor = "true";

    const core = coreRef.current;
    const ring = ringRef.current;
    const trails = trailRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!core || !ring || trails.length === 0) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let coreX = targetX;
    let coreY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let rafId = 0;
    let active = false;
    let expanded = false;
    let pressed = false;
    const trailPoints = Array.from({ length: TRAIL_SIZE }, (_, index) => ({
      x: targetX,
      y: targetY,
      speed: 0.18 - index * 0.02
    }));

    const drawNode = (node: HTMLDivElement, x: number, y: number, scale = 1) => {
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };

    const setExpanded = (expanded: boolean) => {
      ring.dataset.expanded = expanded ? "true" : "false";
      ring.style.borderColor = expanded ? "rgb(var(--accent) / 0.65)" : "rgb(var(--accent) / 0.4)";
    };

    const animate = () => {
      coreX += (targetX - coreX) * 0.32;
      coreY += (targetY - coreY) * 0.32;
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;

      trailPoints.forEach((point, index) => {
        const followTarget = index === 0 ? { x: coreX, y: coreY } : trailPoints[index - 1];
        point.x += (followTarget.x - point.x) * point.speed;
        point.y += (followTarget.y - point.y) * point.speed;
        drawNode(trails[index], point.x, point.y, 1 - index * 0.1);
      });

      drawNode(core, coreX, coreY, pressed ? 0.78 : 1);
      drawNode(ring, ringX, ringY, expanded ? 1.75 : 1);
      rafId = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!active) {
        core.style.opacity = "1";
        ring.style.opacity = "1";
        trails.forEach((trail) => {
          trail.style.opacity = "1";
        });
        active = true;
      }
    };

    const handleLeave = () => {
      active = false;
      core.style.opacity = "0";
      ring.style.opacity = "0";
      trails.forEach((trail) => {
        trail.style.opacity = "0";
      });
    };

    const handlePress = (value: boolean) => {
      pressed = value;
    };

    const handlePointerDown = () => handlePress(true);
    const handlePointerUp = () => handlePress(false);

    const handleHover = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, select, summary, [data-cursor='interactive']"
      );
      expanded = Boolean(interactive);
      setExpanded(expanded);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("focusin", handleHover);
    document.addEventListener("mouseleave", handleLeave);

    rafId = window.requestAnimationFrame(animate);

    return () => {
      delete document.documentElement.dataset.customCursor;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("focusin", handleHover);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-12 w-12 rounded-full border border-accent/40 bg-white/10 opacity-0 backdrop-blur-sm transition-[opacity,border-color] duration-200 md:block"
      />
      <div
        ref={coreRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[81] hidden h-2.5 w-2.5 rounded-full bg-accent opacity-0 transition-opacity duration-200 md:block"
      />
      {Array.from({ length: TRAIL_SIZE }).map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[79] hidden rounded-full bg-accent/35 opacity-0 transition-opacity duration-200 md:block"
          style={{
            width: `${10 - index}px`,
            height: `${10 - index}px`
          }}
        />
      ))}
    </>
  );
}
