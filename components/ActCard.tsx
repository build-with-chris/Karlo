"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactNode;
  video: string;
  poster: string;
  videoTitle: string;
  /** Sekunde, ab der die Karte laeuft */
  startAt: number;
  hint: string;
  isInView: boolean;
  /** Startrichtung der Einblendung, negativ heisst von links */
  offsetX: number;
  delay: number;
  className?: string;
  /** Bekommt die aktuelle Laufzeit, damit das Modal nahtlos weiterlaeuft */
  onOpen: (startTime: number) => void;
};

export default function ActCard({
  title,
  icon,
  video,
  poster,
  videoTitle,
  startAt,
  hint,
  isInView,
  offsetX,
  delay,
  className = "",
  onOpen,
}: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Das Video erst laden, wenn die Karte in die Naehe des Viewports kommt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Ein nachtraeglich eingehaengtes <source> beachtet das Video erst nach
  // load(). Ohne diesen Aufruf bliebe dauerhaft nur das Standbild stehen.
  // Danach an die gewaehlte Stelle springen, der Anfang beider Trailer ist leer.
  useEffect(() => {
    const element = videoRef.current;
    if (!shouldLoadVideo || !element) return;

    const springen = () => {
      if (startAt > 0 && element.duration > startAt) element.currentTime = startAt;
    };

    element.addEventListener("loadedmetadata", springen, { once: true });
    element.load();

    return () => element.removeEventListener("loadedmetadata", springen);
  }, [shouldLoadVideo, startAt]);

  const open = () => onOpen(videoRef.current?.currentTime ?? 0);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, x: offsetX }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: offsetX }}
      transition={{ duration: 0.8, delay }}
      className={`card relative aspect-[4/3] cursor-pointer overflow-hidden border border-earth-200 bg-earth-900 shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:aspect-auto md:min-h-[500px] ${className}`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`${title}: Video und Details anzeigen`}
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload={shouldLoadVideo ? "auto" : "none"}
          poster={poster}
          title={videoTitle}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {shouldLoadVideo && <source src={video} type="video/mp4" />}
        </video>
        {/* Abdunklung, damit Titel und Hinweis auf dem Video lesbar bleiben */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-900/40 via-earth-900/35 to-earth-900/45" />
      </div>

      <div className="relative z-10 text-white">
        <div className="mb-4 flex items-center gap-3">
          {icon}
          <h3 className="mb-0 mt-0 font-serif text-xl text-white">{title}</h3>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
          </svg>
          <span>{hint}</span>
        </div>
      </div>
    </motion.article>
  );
}
