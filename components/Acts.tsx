"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Acts() {
  const { t, language } = useLanguage();

  const acts = [
    {
      title: t.acts.cyrWheel.title,
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
      description: t.acts.cyrWheel.description,
      keyfacts: [
        { label: t.acts.cyrWheel.stageArea, value: "6 × 6 m" },
        { label: t.acts.cyrWheel.ceilingHeight, value: "min. 4 m" },
        { label: t.acts.cyrWheel.duration, value: "5–8 Min." },
      ],
      techRider: t.acts.cyrWheel.techRider,
    },
    {
      title: t.acts.aerial.title,
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
      description: t.acts.aerial.description,
      keyfacts: [
        { label: t.acts.aerial.stageArea, value: "4 × 4 m" },
        { label: t.acts.aerial.ceilingHeight, value: "min. 6 m" },
        { label: t.acts.aerial.duration, value: "4–7 Min." },
      ],
      techRider: t.acts.aerial.techRider,
    },
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAerialModalOpen, setIsAerialModalOpen] = useState(false);
  const [isCyrWheelModalOpen, setIsCyrWheelModalOpen] = useState(false);
  const [isHeroVideoModalOpen, setIsHeroVideoModalOpen] = useState(false);
  const aerialVideoRef = useRef<HTMLVideoElement>(null);
  const cyrWheelVideoRef = useRef<HTMLVideoElement>(null);
  const aerialModalVideoRef = useRef<HTMLVideoElement>(null);
  const cyrWheelModalVideoRef = useRef<HTMLVideoElement>(null);
  const aerialCardRef = useRef<HTMLDivElement>(null);
  const cyrWheelCardRef = useRef<HTMLDivElement>(null);
  const [shouldLoadAerialVideo, setShouldLoadAerialVideo] = useState(false);
  const [shouldLoadCyrWheelVideo, setShouldLoadCyrWheelVideo] = useState(false);
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

  // Lazy loading: Load Aerial video when card is in view
  useEffect(() => {
    if (!aerialCardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadAerialVideo(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );

    observer.observe(aerialCardRef.current);

    return () => observer.disconnect();
  }, []);

  // Lazy loading: Load Cyr Wheel video when card is in view
  useEffect(() => {
    if (!cyrWheelCardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadCyrWheelVideo(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" }
    );

    observer.observe(cyrWheelCardRef.current);

    return () => observer.disconnect();
  }, []);

  // Transfer video time from card to modal when modal opens
  useEffect(() => {
    if (isAerialModalOpen && aerialVideoRef.current && aerialModalVideoRef.current) {
      const transferTime = () => {
        if (aerialVideoRef.current && aerialModalVideoRef.current) {
          const currentTime = aerialVideoRef.current.currentTime;
          aerialModalVideoRef.current.currentTime = currentTime;
        }
      };
      
      // Transfer immediately if video is already loaded
      if (aerialModalVideoRef.current.readyState >= 2) {
        transferTime();
      } else {
        // Wait for video to load
        aerialModalVideoRef.current.addEventListener('loadeddata', transferTime, { once: true });
      }
    }
  }, [isAerialModalOpen]);

  useEffect(() => {
    if (isCyrWheelModalOpen && cyrWheelVideoRef.current && cyrWheelModalVideoRef.current) {
      const transferTime = () => {
        if (cyrWheelVideoRef.current && cyrWheelModalVideoRef.current) {
          const currentTime = cyrWheelVideoRef.current.currentTime;
          cyrWheelModalVideoRef.current.currentTime = currentTime;
        }
      };
      
      // Transfer immediately if video is already loaded
      if (cyrWheelModalVideoRef.current.readyState >= 2) {
        transferTime();
      } else {
        // Wait for video to load
        cyrWheelModalVideoRef.current.addEventListener('loadeddata', transferTime, { once: true });
      }
    }
  }, [isCyrWheelModalOpen]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAerialModalOpen) {
          setIsAerialModalOpen(false);
        }
        if (isCyrWheelModalOpen) {
          setIsCyrWheelModalOpen(false);
        }
      }
    };

    if (isAerialModalOpen || isCyrWheelModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isAerialModalOpen, isCyrWheelModalOpen]);

  // Handle fullscreen changes for Aerial video
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (aerialModalVideoRef.current) {
        if (document.fullscreenElement === aerialModalVideoRef.current) {
          aerialModalVideoRef.current.style.objectFit = 'contain';
        } else {
          aerialModalVideoRef.current.style.objectFit = 'cover';
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // Handle fullscreen changes for Cyr Wheel video
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (cyrWheelModalVideoRef.current) {
        if (document.fullscreenElement === cyrWheelModalVideoRef.current) {
          cyrWheelModalVideoRef.current.style.objectFit = 'contain';
        } else {
          cyrWheelModalVideoRef.current.style.objectFit = 'cover';
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        video:fullscreen {
          object-fit: contain !important;
        }
        video:-webkit-full-screen {
          object-fit: contain !important;
        }
        video:-moz-full-screen {
          object-fit: contain !important;
        }
        video:-ms-fullscreen {
          object-fit: contain !important;
        }
      `}</style>
      <section id="acts" className="section bg-gradient-to-b from-white/20 to-earth-50/30 pb-8 md:pb-12 lg:pb-14">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
            {/* Mobile: Heading at top */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-earth-700 mb-6 md:mb-0 md:hidden"
            >
              {t.acts.title}
            </motion.h2>

            {/* Row 1: Text Left, Aerial Video Right */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-10">
              {/* Left: Introduction Text with Heading - Order 3 on mobile (after videos), 1 on desktop */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="flex items-start order-3 md:order-1"
              >
                <div className="w-full">
                  {/* Desktop: Heading inside text block */}
                  <h2 className="hidden md:block text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-earth-700 mb-0 mt-0 mb-6 md:mb-8 lg:mb-10">
                    {t.acts.introTitle}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-sm md:text-base lg:text-lg text-earth-700/90 leading-relaxed">
                      {t.acts.introParagraph1}
                    </p>
                    <div className="pt-2 border-t border-earth-200/60">
                      <p className="text-sm md:text-base lg:text-lg text-earth-700/90 leading-relaxed">
                        {t.acts.introParagraph2}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Aerial Video Card - Order 1 on mobile, 2 on desktop */}
              {(() => {
                const act = acts.find(a => a.title === "Aerial");
                if (!act) return null;
                return (
                  <motion.article
                    ref={aerialCardRef}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="card border border-earth-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-transparent cursor-pointer order-1 md:order-2"
                    style={{ 
                      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                      minHeight: isMobile ? '60vh' : '500px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={() => setIsAerialModalOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsAerialModalOpen(true);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Aerial Details anzeigen"
                  >
                    {/* Video Background - Lazy Loaded */}
                    {shouldLoadAerialVideo && (
                      <>
                        <div className="absolute inset-0 z-0">
                          <video
                            ref={aerialVideoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            title="Karlo Janke Aerial Straps Performance Trailer"
                            aria-label="Aerial Straps Performance Video von Karlo Janke"
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
                              background: 'linear-gradient(to bottom, rgba(45, 36, 28, 0.4) 0%, rgba(45, 36, 28, 0.35) 50%, rgba(45, 36, 28, 0.45) 100%)',
                              zIndex: 1
                            }}
                          />
                        </div>
                      </>
                    )}

                    {/* Content */}
                    <div className="relative z-10 text-white">
                      {/* Icon & Title */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-white">{act.icon}</div>
                        <h3 className="text-xl mt-0 mb-0 font-serif text-white">
                          {act.title}
                        </h3>
                      </div>

                      {/* Click hint */}
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
                        <span>{t.acts.aerial.clickForDetails}</span>
                      </div>
                    </div>
                  </motion.article>
                );
              })()}
            </div>

            {/* Row 2: Cyr Wheel Video Left, Custom Acts Card Right */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-10">
              {/* Left: Cyr Wheel Video Card - Order 4 on mobile, 1 on desktop */}
              {(() => {
                const act = acts.find(a => a.title === "Cyr Wheel");
                if (!act) return null;
                return (
                  <motion.article
                    ref={cyrWheelCardRef}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="card border border-earth-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-transparent cursor-pointer order-4 md:order-1"
                    style={{ 
                      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                      minHeight: isMobile ? '60vh' : '500px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={() => setIsCyrWheelModalOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsCyrWheelModalOpen(true);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Cyr Wheel Details anzeigen"
                  >
                    {/* Video Background - Lazy Loaded */}
                    {shouldLoadCyrWheelVideo && (
                      <>
                        <div className="absolute inset-0 z-0">
                          <video
                            ref={cyrWheelVideoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                            title="Karlo Janke Cyr Wheel Performance Trailer"
                            aria-label="Cyr Wheel Performance Video von Karlo Janke"
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
                            <source src="/Cyr-Wheel_Trailer.mp4" type="video/mp4" />
                          </video>
                          {/* Subtle gradient overlay for better text readability */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: 'linear-gradient(to bottom, rgba(45, 36, 28, 0.4) 0%, rgba(45, 36, 28, 0.35) 50%, rgba(45, 36, 28, 0.45) 100%)',
                              zIndex: 1
                            }}
                          />
                        </div>
                      </>
                    )}

                    {/* Content */}
                    <div className="relative z-10 text-white">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                        <div className="text-white">{act.icon}</div>
                        <h3 className="text-xl mt-0 mb-0 font-serif text-white">
                    {act.title}
                        </h3>
                      </div>

                      {/* Click hint */}
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
                        <span>{t.acts.cyrWheel.clickForDetails}</span>
                      </div>
                    </div>
                  </motion.article>
                );
              })()}

              {/* Right: Custom Acts Callout - Order 5 on mobile, 2 on desktop */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center order-5 md:order-2"
              >
                <div
                  className="bg-earth-100/50 border border-earth-200 rounded-lg w-full"
                  style={{
                    padding: '2rem 1.5rem',
                    minWidth: '280px'
                  }}
                >
                  <h3
                    className="font-serif text-earth-700 mt-0 mb-4 text-left"
                    style={{
                      fontSize: '1.25rem',
                      lineHeight: '1.4',
                      width: '100%'
                    }}
                  >
                    {t.acts.customActs.title}
                  </h3>
                  <p
                    className="text-earth-700/90 text-left"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: '1.7',
                      marginBottom: '1.5rem',
                      width: '100%'
                    }}
                  >
                    {t.acts.customActs.description}
                  </p>
                  <a
                    href="#contact"
                    className="btn btn-outline no-underline"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {t.acts.customActs.contact}
                  </a>
                </div>
              </motion.div>
            </div>
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
                ref={aerialModalVideoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                controls
                title="Karlo Janke Aerial Straps Performance Trailer"
                aria-label="Aerial Straps Performance Video von Karlo Janke"
                style={{
                  objectFit: 'cover'
                }}
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
                {acts.find(act => act.title === t.acts.aerial.title)?.description}
                </p>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Cyr Wheel Modal */}
    <AnimatePresence>
      {isCyrWheelModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[5000] flex items-start justify-center pt-20 md:pt-24 pb-4 px-0 md:px-4 bg-earth-900/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsCyrWheelModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cyrwheel-modal-title"
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
              onClick={() => setIsCyrWheelModalOpen(false)}
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
                ref={cyrWheelModalVideoRef}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                controls
                title="Karlo Janke Cyr Wheel Performance Trailer"
                aria-label="Cyr Wheel Performance Video von Karlo Janke"
                style={{
                  objectFit: 'cover'
                }}
              >
                <source src="/Cyr-Wheel_Trailer.mp4" type="video/mp4" />
              </video>
              
              {/* Hero Video Arrow Button */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCyrWheelModalOpen(false);
                  setTimeout(() => setIsHeroVideoModalOpen(true), 300);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-accent hover:bg-accent/90 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
                aria-label={t.acts.cyrWheel.watchHeroVideo}
                style={{
                  boxShadow: '0 10px 25px rgba(176, 138, 91, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.1)'
                }}
              >
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
                  className="animate-pulse"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <span className="absolute -right-2 top-full mt-2 whitespace-nowrap bg-earth-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  {t.acts.cyrWheel.watchHeroVideo}
                </span>
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 lg:p-8">
              <h3 id="cyrwheel-modal-title" className="text-2xl md:text-3xl font-serif text-earth-700 mb-4 mt-0 flex items-center gap-3">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                </svg>
                Cyr Wheel
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed mb-6 text-earth-700/85">
                {acts.find(act => act.title === t.acts.cyrWheel.title)?.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Hero Video Modal */}
    <AnimatePresence>
      {isHeroVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[5000] flex items-start justify-center pt-20 md:pt-24 pb-4 px-0 md:px-4 bg-earth-900/95 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsHeroVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hero-video-modal-title"
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
              onClick={() => setIsHeroVideoModalOpen(false)}
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
              <iframe
                src="https://www.youtube.com/embed/QTJ6lkGcF7g?autoplay=1&mute=0&loop=1&playlist=QTJ6lkGcF7g&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1&start=5"
                title="Karlo Performance Trailer"
                allow="autoplay; encrypted-media; fullscreen"
                className="absolute inset-0 w-full h-full"
                style={{
                  border: 'none'
                }}
              />
              
              {/* Back to Cyr Wheel Video Arrow Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHeroVideoModalOpen(false);
                  setTimeout(() => setIsCyrWheelModalOpen(true), 300);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-accent hover:bg-accent/90 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/50"
                aria-label="Zurück zum Cyr Wheel Video"
                style={{
                  boxShadow: '0 10px 25px rgba(176, 138, 91, 0.4), 0 0 0 4px rgba(255, 255, 255, 0.1)'
                }}
              >
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
                  className="animate-pulse"
                >
                  <path d="M19 12H5"></path>
                  <path d="m12 19-7-7 7-7"></path>
                </svg>
                <span className="absolute -left-2 top-full mt-2 whitespace-nowrap bg-earth-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  {language === "de" ? "Cyr Wheel Video" : "Cyr Wheel Video"}
                </span>
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 lg:p-8">
              <h3 id="hero-video-modal-title" className="text-2xl md:text-3xl font-serif text-earth-700 mb-4 mt-0 flex items-center gap-3">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                </svg>
                {t.acts.cyrWheel.title} - Trailer 2
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed mb-6 text-earth-700/85">
                {language === "de" 
                  ? "Dieses Video zeigt eine umfassende Performance mit dem Cyr Wheel und gibt einen Einblick in die Vielseitigkeit und Präzision der Artistik."
                  : "This video showcases a comprehensive performance with the Cyr Wheel and provides insight into the versatility and precision of the artistry."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
