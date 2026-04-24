"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  label?: string;
};

type ZoomableImageGalleryProps = {
  images: GalleryImage[];
  className?: string;
};

export function ZoomableImageGallery({ images, className }: ZoomableImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex]);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className={className}>
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden rounded-[1.4rem] border border-line/80 bg-background/70 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-accent/35"
            data-cursor="interactive"
            aria-label={`Open enlarged figure: ${image.alt}`}
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.15rem] border-b border-line/70 bg-white">
              <Image src={image.src} alt={image.alt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 48vw" />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="text-sm text-muted">{image.label ?? image.alt}</p>
              <span className="text-xs uppercase tracking-[0.18em] text-accent">Click to enlarge</span>
            </div>
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
        >
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex h-12 min-w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition hover:bg-white/16"
            onClick={() => setActiveIndex(null)}
            aria-label="Close enlarged figure"
            data-cursor="interactive"
          >
            Close
          </button>
          <div
            className="relative h-full max-h-[88vh] w-full max-w-6xl overflow-hidden rounded-[1.8rem] border border-white/10 bg-white p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 px-4 text-sm font-medium text-foreground shadow-sm transition hover:bg-white"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
              data-cursor="interactive"
            >
              Done
            </button>
            <div className="relative h-full w-full overflow-hidden rounded-[1.2rem]">
              <Image src={activeImage.src} alt={activeImage.alt} fill className="object-contain" sizes="100vw" priority />
            </div>
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white">
              Click outside or press Esc to close
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
