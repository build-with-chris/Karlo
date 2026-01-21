"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if viewport is desktop size
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section id="hero" className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - Video on Desktop, Image on Mobile */}
      <div className="absolute inset-0 z-0">
        {isDesktop ? (
          // Desktop: Video Background
          <>
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  objectPosition: 'center center'
                }}
              >
                <source src="/CyrHero.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Subtle gradient overlay - minimal for video focus on Desktop */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.3) 100%)'
              }}
            />
          </>
        ) : (
          // Mobile: Image Background
          <>
            <style jsx>{`
              @media (max-width: 768px) {
                .hero-image {
                  object-position: center 20% !important;
                  transform: scale(1.15);
                }
              }
            `}</style>
            <Image
              src="/HeroMobile.webp"
              alt="Karlo Janke bei einer Cyr Wheel Performance – Professioneller Zirkusartist in Aktion"
              fill
              priority
              quality={95}
              className="object-cover hero-image"
              sizes="100vw"
              style={{
                objectPosition: 'center 30%',
                transformOrigin: 'center 30%'
              }}
            />
            {/* Gradient overlay for better text readability */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.65) 100%)'
              }}
            />
            {/* Smooth transition to white body on mobile */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 md:hidden"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(250, 247, 242, 0.15) 40%, rgba(250, 247, 242, 0.3) 70%, rgba(250, 247, 242, 0.5) 90%, rgba(250, 247, 242, 0.7) 100%)'
              }}
            />
          </>
        )}
      </div>

      {/* Content - Desktop: Bottom left, Mobile: Three sections */}
      <div className="relative z-10 w-full h-full flex flex-col md:block">
        {/* Mobile: Top Third - Name and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:hidden flex flex-col items-center justify-start pt-16 px-4"
          style={{ height: '26.67vh', minHeight: '26.67vh' }}
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
              lineHeight: '1.1',
              marginBottom: '0.25rem',
              color: 'white',
              fontFamily: 'var(--font-serif)',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
              textAlign: 'center'
            }}
          >
            Karlo
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: 'rgba(250, 247, 242, 0.9)',
              fontWeight: '300',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}
          >
            {t.hero.tagline}
          </motion.p>
        </motion.div>

        {/* Mobile: Middle Third - Empty (Image visible) */}
        <div className="md:hidden" style={{ height: '26.67vh', minHeight: '26.67vh' }} />

        {/* Mobile: Bottom Third - CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="md:hidden flex flex-col items-center justify-end pb-12 px-4"
          style={{ height: '26.67vh', minHeight: '26.67vh' }}
        >
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a href="#portfolio" className="btn btn-primary no-underline text-sm px-4 py-2.5">
              {t.hero.portfolioButton}
            </a>
            <a href="#contact" className="btn btn-outline no-underline bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/40 text-sm px-4 py-2.5">
              {t.hero.contactButton}
            </a>
          </motion.div>
        </motion.div>

        {/* Desktop: Bottom left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:block absolute bottom-12 left-8 lg:left-12 space-y-3"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
              lineHeight: '1.1',
              marginBottom: '0.25rem',
              color: 'white',
              fontFamily: 'var(--font-serif)',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)',
              textAlign: 'left'
            }}
          >
            Karlo
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              color: 'rgba(250, 247, 242, 0.9)',
              fontWeight: '300',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)',
              whiteSpace: 'nowrap',
              textAlign: 'left'
            }}
          >
            {t.hero.tagline}
          </motion.p>

          {/* CTAs - Compact on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-start"
          >
            <a href="#portfolio" className="btn btn-primary no-underline text-sm px-4 py-2.5">
              {t.hero.portfolioButton}
            </a>
            <a href="#contact" className="btn btn-outline no-underline bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/40 text-sm px-4 py-2.5">
              {t.hero.contactButton}
            </a>
          </motion.div>

          {/* Social Media Icons - Smaller on Desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex gap-3 justify-start"
            style={{ paddingTop: '0.75rem' }}
          >
            <a
              href="https://www.instagram.com/karlojanke/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: 'white',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@karlojanke"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: 'white',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Right side on Desktop, hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden md:block absolute bottom-8 right-8 lg:right-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/80 drop-shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
