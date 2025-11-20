"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { id: "hero", label: "Start" },
  { id: "about", label: "Über Karlo" },
  { id: "acts", label: "Acts" },
  { id: "portfolio", label: "Eindrücke" },
  { id: "contact", label: "Kontakt" },
];

const MOBILE_BUTTON_SIZE = 44; // Apple's recommended minimum touch target
const NAV_HEIGHT = 80;

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll-Tracking für Hintergrund-Effekt
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Verhindere Scrollen wenn Mobile-Menü offen ist
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
      document.documentElement.style.overflowX = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
      document.documentElement.style.overflowX = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
      document.documentElement.style.overflowX = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // IntersectionObserver für aktive Section
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - NAV_HEIGHT;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled
            ? "bg-earth-50/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: `${NAV_HEIGHT}px` }}>
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("hero")}
              className="relative h-12 w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-label="Zur Startseite"
            >
              <div className="relative h-12 w-32 md:w-40">
                <Image
                  src={isScrolled ? "/LogoSchwarz.png" : "/LogoWeiß.png"}
                  alt="Karlo Logo"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                  style={{ padding: '4px' }}
                />
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav aria-label="Hauptnavigation" className="hidden md:block">
              <ul className="flex items-center gap-8">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`relative text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2 py-1 ${
                        isScrolled
                          ? activeSection === id
                            ? "text-accent"
                            : "text-earth-700 hover:text-accent"
                          : activeSection === id
                            ? "text-white"
                            : "text-white/90 hover:text-white"
                      }`}
                      aria-current={activeSection === id ? "page" : undefined}
                      type="button"
                    >
                      {label}
                      {activeSection === id && (
                        <motion.span
                          layoutId="activeSection"
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                            isScrolled ? "bg-accent" : "bg-white"
                          }`}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isScrolled
                  ? "text-earth-700 hover:text-accent"
                  : "text-white hover:text-white/80"
              }`}
              style={{
                width: `${MOBILE_BUTTON_SIZE}px`,
                height: `${MOBILE_BUTTON_SIZE}px`,
                minWidth: `${MOBILE_BUTTON_SIZE}px`,
                minHeight: `${MOBILE_BUTTON_SIZE}px`,
              }}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] md:hidden"
            onClick={closeMobileMenu}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-earth-900/98 backdrop-blur-md" />

            {/* Menu Content */}
            <div
              className="relative h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Spacer for nav bar */}
              <div style={{ height: `${NAV_HEIGHT}px` }} />

              {/* Navigation Items - Centered vertically */}
              <nav
                aria-label="Mobile Navigation"
                className="flex-1 flex items-center justify-center px-8 py-12"
              >
                <ul className="w-full space-y-5">
                  {navItems.map(({ id, label }, index) => (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                    >
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`w-full text-center px-8 py-6 rounded-3xl text-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent active:scale-[0.97] ${
                          activeSection === id
                            ? "bg-accent text-white shadow-lg shadow-accent/20"
                            : "bg-earth-800/80 text-earth-50 hover:bg-earth-700/80 active:bg-earth-700"
                        }`}
                        style={{
                          minHeight: '72px',
                          touchAction: 'manipulation'
                        }}
                        aria-current={activeSection === id ? "page" : undefined}
                        type="button"
                      >
                        {label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
