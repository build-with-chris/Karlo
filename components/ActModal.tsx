"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  description: string;
  video: string;
  poster: string;
  videoTitle: string;
  /** Sekunde, ab der das Video starten soll, damit es an die Karte anschliesst */
  startTime: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
};

const arrowButtonClass =
  "absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-accent p-4 text-white shadow-2xl transition-transform duration-300 hover:scale-110 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50";

export default function ActModal({
  title,
  icon,
  description,
  video,
  poster,
  videoTitle,
  startTime,
  onClose,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Video an der Stelle fortsetzen, an der die Karte gerade stand
  useEffect(() => {
    const element = videoRef.current;
    if (!element || startTime <= 0) return;

    const applyStartTime = () => {
      element.currentTime = startTime;
    };

    if (element.readyState >= 2) {
      applyStartTime();
    } else {
      element.addEventListener("loadeddata", applyStartTime, { once: true });
      return () => element.removeEventListener("loadeddata", applyStartTime);
    }
    // Bewusst nur beim Oeffnen, spaeteres Spulen des Nutzers nicht ueberschreiben
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  // ESC schliesst, Fokus startet auf dem Schliessen-Knopf, Seite bleibt stehen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[5000] flex items-start justify-center overflow-y-auto bg-earth-900/95 px-0 pb-4 pt-20 backdrop-blur-sm md:px-4 md:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="act-modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-6xl overflow-hidden bg-white shadow-2xl md:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-earth-700 backdrop-blur-sm transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Schliessen"
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

        <div className="relative aspect-video w-full bg-earth-900">
          <video
            ref={videoRef}
            key={video}
            autoPlay
            loop
            muted
            playsInline
            controls
            poster={poster}
            title={videoTitle}
            className="h-full w-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>

          {onPrev && (
            <button
              onClick={onPrev}
              className={`${arrowButtonClass} left-4`}
              aria-label={prevLabel}
            >
              <ArrowIcon direction="left" />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className={`${arrowButtonClass} right-4`}
              aria-label={nextLabel}
            >
              <ArrowIcon direction="right" />
            </button>
          )}
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <h3
            id="act-modal-title"
            className="mb-4 mt-0 flex items-center gap-3 font-serif text-2xl text-earth-700 md:text-3xl"
          >
            <span className="text-accent">{icon}</span>
            {title}
          </h3>
          <p className="mb-0 text-base leading-relaxed text-earth-700/85">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "right" ? (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      ) : (
        <>
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </>
      )}
    </svg>
  );
}
