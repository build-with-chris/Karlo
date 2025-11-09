"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const acts = [
  {
    title: "Cyr Wheel",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="12" r="6"></circle>
        <line x1="12" y1="2" x2="12" y2="22"></line>
        <line x1="2" y1="12" x2="22" y2="12"></line>
      </svg>
    ),
    description:
      "Kraft, Eleganz und Präzision im großen Rad. Dynamische Rotationen verschmelzen mit akrobatischer Finesse zu einem hypnotisierenden visuellen Erlebnis.",
    keyfacts: [
      { label: "Bühnenfläche", value: "6 × 6 m" },
      { label: "Deckenhöhe", value: "min. 4 m" },
      { label: "Dauer", value: "5–8 Min." },
    ],
    techRider: "Tech-Rider verfügbar",
  },
  {
    title: "Aerial",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20"></path>
        <path d="M8 6c0 4-1 8-4 10"></path>
        <path d="M16 6c0 4 1 8 4 10"></path>
        <circle cx="12" cy="4" r="2"></circle>
      </svg>
    ),
    description:
      "Schwerelos in der Vertikalen. Grazie verbindet sich mit athletischer Kontrolle zu Momenten poetischer Spannung. Elegant, kraftvoll, präzise.",
    keyfacts: [
      { label: "Bühnenfläche", value: "4 × 4 m" },
      { label: "Deckenhöhe", value: "min. 6 m" },
      { label: "Dauer", value: "4–7 Min." },
    ],
    techRider: "Tech-Rider verfügbar",
  },
];

export default function Acts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAerialModalOpen, setIsAerialModalOpen] = useState(false);
  const aerialVideoRef = useRef<HTMLVideoElement>(null);
  const aerialCardRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy loading: Load video when card is in view
  useEffect(() => {
    if (!aerialCardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );

    observer.observe(aerialCardRef.current);

    return () => observer.disconnect();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAerialModalOpen) {
        setIsAerialModalOpen(false);
      }
    };

    if (isAerialModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isAerialModalOpen]);

  return (
    <>
      <section id="acts" className="section bg-gradient-to-b from-white/20 to-earth-50/30">
        <div className="container max-w-6xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-center mb-10">Acts</h2>

            {/* Act Cards */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {acts.map((act, index) => {
                const isAerial = act.title === "Aerial";
                
                return (
                  <motion.article
                    key={act.title}
                    ref={isAerial ? aerialCardRef : null}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                    className={`card border border-earth-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden ${
                      isAerial ? 'bg-transparent cursor-pointer' : 'bg-white/50'
                    }`}
                    style={{ 
                      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                      ...(isAerial && isMobile ? { 
                        minHeight: '60vh'
                      } : {})
                    }}
                    onMouseEnter={(e) => {
                      if (!isAerial) {
                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(45, 36, 28, 0.15), 0 8px 10px -6px rgba(45, 36, 28, 0.1)';
                      } else {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isAerial) {
                        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
                      } else {
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                    onClick={() => {
                      if (isAerial) {
                        setIsAerialModalOpen(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (isAerial && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setIsAerialModalOpen(true);
                      }
                    }}
                    tabIndex={isAerial ? 0 : undefined}
                    role={isAerial ? "button" : undefined}
                    aria-label={isAerial ? "Aerial Details anzeigen" : undefined}
                  >
                    {/* Video Background for Aerial - Lazy Loaded */}
                    {isAerial && shouldLoadVideo && (
                      <>
                        <div className="absolute inset-0 z-0">
                          <video
                            ref={aerialVideoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              zIndex: 0
                            }}
                          >
                            <source src="/Straps_Trailer.mp4" type="video/mp4" />
                          </video>
                          {/* Subtle gradient overlay for better text readability */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: 'linear-gradient(to bottom, rgba(45, 36, 28, 0.75) 0%, rgba(45, 36, 28, 0.65) 50%, rgba(45, 36, 28, 0.8) 100%)',
                              zIndex: 1
                            }}
                          />
                        </div>
                      </>
                    )}

                    {/* Content - Minimal for Aerial, Full for Cyr Wheel */}
                    <div className={`relative z-10 ${isAerial ? 'text-white' : ''}`}>
                      {/* Icon & Title */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={isAerial ? "text-white" : "text-accent"}>{act.icon}</div>
                        <h3 className={`text-xl mt-0 mb-0 font-serif ${isAerial ? 'text-white' : 'text-earth-700'}`}>
                          {act.title}
                        </h3>
                      </div>

                      {!isAerial && (
                        <>
                          {/* Description */}
                          <p className="text-sm leading-relaxed mb-5 text-earth-700/85">
                            {act.description}
                          </p>

                          {/* Key Facts */}
                          <div className="space-y-3 mb-4">
                            <h4 className="text-xs font-semibold uppercase tracking-widest mb-3 text-earth-500">
                              Key Facts
                            </h4>
                            <dl className="space-y-2">
                              {act.keyfacts.map((fact) => (
                                <div
                                  key={fact.label}
                                  className="flex justify-between items-baseline text-sm border-b border-earth-200/50 pb-1"
                                >
                                  <dt className="text-earth-700/70">{fact.label}</dt>
                                  <dd className="font-medium text-earth-700">{fact.value}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>

                          {/* Tech Rider */}
                          <p className="text-xs mt-4 flex items-center gap-2 text-accent">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="12" y1="18" x2="12" y2="12"></line>
                              <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                            {act.techRider}
                          </p>
                        </>
                      )}

                      {/* Aerial: Click hint */}
                      {isAerial && (
                        <div className="flex items-center gap-2 text-white/90 text-sm mt-4">
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
                          >
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                            <polyline points="10 17 15 12 10 7"></polyline>
                            <line x1="15" y1="12" x2="3" y2="12"></line>
                          </svg>
                          <span>Klicken für Details</span>
                        </div>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>

          {/* Custom Acts Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12"
            style={{ width: '100%', maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <div
              className="bg-earth-100/50 border border-earth-200 rounded-lg text-center"
              style={{
                padding: '2rem 1.5rem',
                minWidth: '280px',
                width: '100%'
              }}
            >
              <h3
                className="font-serif text-earth-700 mt-0"
                style={{
                  fontSize: '1.125rem',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4',
                  width: '100%'
                }}
              >
                Custom Acts auf Anfrage
              </h3>
              <p
                className="text-earth-700/85"
                style={{
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  maxWidth: '500px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%'
                }}
              >
                Maßgeschneiderte Performances für Ihr Event – individuell abgestimmt auf Ihre Anforderungen.
              </p>
              <a
                href="#contact"
                className="btn btn-outline no-underline"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Anfrage senden
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Aerial Modal */}
    <AnimatePresence>
      {isAerialModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[5000] flex items-start justify-center pt-20 md:pt-24 pb-4 px-0 md:px-4 bg-earth-900/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsAerialModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="aerial-modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-6xl w-full md:rounded-lg bg-white overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsAerialModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-earth-700 hover:bg-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Modal schließen"
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
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Video */}
            <div className="relative w-full aspect-video md:aspect-video bg-earth-900" style={{ minHeight: '50vh' }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                controls
              >
                <source src="/Straps_Trailer.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 lg:p-8">
              <h3 id="aerial-modal-title" className="text-2xl md:text-3xl font-serif text-earth-700 mb-4 mt-0 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M12 2v20"></path>
                  <path d="M8 6c0 4-1 8-4 10"></path>
                  <path d="M16 6c0 4 1 8 4 10"></path>
                  <circle cx="12" cy="4" r="2"></circle>
                </svg>
                Aerial
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed mb-6 text-earth-700/85">
                {acts.find(act => act.title === "Aerial")?.description}
              </p>

              {/* Key Facts */}
              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-3 text-earth-500">
                  Key Facts
                </h4>
                <dl className="space-y-2">
                  {acts.find(act => act.title === "Aerial")?.keyfacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex justify-between items-baseline text-sm border-b border-earth-200/50 pb-1"
                    >
                      <dt className="text-earth-700/70">{fact.label}</dt>
                      <dd className="font-medium text-earth-700">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Tech Rider */}
              <p className="text-xs mt-4 flex items-center gap-2 text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                {acts.find(act => act.title === "Aerial")?.techRider}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
