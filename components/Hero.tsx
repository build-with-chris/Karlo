"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <style jsx>{`
          @media (max-width: 768px) {
            .hero-image {
              object-position: center 20% !important;
              transform: scale(1.15);
            }
          }
        `}</style>
        <Image
          src="/Karlo Profil.png"
          alt="Karlo performing with Cyr Wheel"
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
        {/* Gradient overlay for better text readability - darker at bottom, lighter at top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.65) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-5xl px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6 md:space-y-8"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              color: 'white',
              fontFamily: 'var(--font-serif)',
              textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)'
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
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              color: 'rgba(250, 247, 242, 0.95)',
              fontWeight: '300',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)',
              whiteSpace: 'nowrap'
            }}
          >
            Cyr Wheel & Aerial Artist
          </motion.p>

          {/* Leitmotiv Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
              lineHeight: '1.6',
              color: 'rgba(250, 247, 242, 0.98)',
              fontWeight: '300',
              fontStyle: 'italic',
              maxWidth: '48rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '2.5rem',
              textShadow: '0 3px 8px rgba(0, 0, 0, 0.8), 0 1px 4px rgba(0, 0, 0, 0.6)',
              padding: '0 1rem'
            }}
          >
            "For me, the real excitement lies in the tension—the immersive dive into the moment where suspense, timing, and control all merge. It's about creating that captivating experience for everyone."
          </motion.blockquote>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ paddingTop: '1rem' }}
          >
            <a href="#portfolio" className="btn btn-primary no-underline">
              Portfolio ansehen
            </a>
            <a href="#contact" className="btn btn-outline no-underline bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/40">
              Kontakt aufnehmen
            </a>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-4 justify-center"
            style={{ paddingTop: '2rem' }}
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
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
