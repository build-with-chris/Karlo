"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export type LightboxImage = {
  src: string;
  alt: string;
  photographer?: string;
  photographerInstagram?: string;
};

type Props = {
  images: LightboxImage[];
  index: number | null;
  closeLabel: string;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

const navButtonClass =
  "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function Lightbox({
  images,
  index,
  closeLabel,
  onClose,
  onNavigate,
}: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + images.length) % images.length);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, index, images.length, onClose, onNavigate]);

  const image = isOpen ? images[index] : null;

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-earth-900/95 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label={closeLabel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {isOpen && images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index - 1 + images.length) % images.length);
                }}
                className={`${navButtonClass} left-4`}
                aria-label="Vorheriges Bild"
              >
                <Chevron direction="left" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((index + 1) % images.length);
                }}
                className={`${navButtonClass} right-4`}
                aria-label="Nächstes Bild"
              >
                <Chevron direction="right" />
              </button>
            </>
          )}

          <motion.figure
            key={image.src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="m-0 flex max-h-full max-w-5xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            {image.photographer && (
              <figcaption className="text-sm text-white/70">
                Foto:{" "}
                {image.photographerInstagram ? (
                  <a
                    href={`https://www.instagram.com/${image.photographerInstagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 underline-offset-2 hover:text-accent"
                  >
                    {image.photographer}
                  </a>
                ) : (
                  image.photographer
                )}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "right" ? (
        <polyline points="9 18 15 12 9 6" />
      ) : (
        <polyline points="15 18 9 12 15 6" />
      )}
    </svg>
  );
}
