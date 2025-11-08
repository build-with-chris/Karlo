"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { id: "hero", label: "Start" },
  { id: "about", label: "Über Karlo" },
  { id: "acts", label: "Acts" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Kontakt" },
];

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
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
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
      const offsetTop = element.offsetTop - 80; // Berücksichtigt Nav-Höhe
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false); // Schließe Mobile-Menü nach Navigation
    }
  };

  const handleMobileMenuToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled
            ? "bg-earth-50/95 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
        style={{ pointerEvents: 'auto', position: 'fixed', top: 0, left: 0, right: 0 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ pointerEvents: 'auto' }}>
          <div className="flex items-center justify-between h-20" style={{ pointerEvents: 'auto', position: 'relative' }}>
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("hero")}
              className="relative h-12 w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-label="Zur Startseite"
              style={{ background: 'none', border: 'none' }}
            >
              <div className="relative h-12 w-32 md:w-40 overflow-hidden">
                <Image
                  src={isScrolled ? "/LogoSchwarz.png" : "/LogoWeiß.png"}
                  alt="Karlo Logo"
                  fill
                  className="object-contain object-left"
                  priority
                  sizes="(max-width: 768px) 128px, 160px"
                  style={{
                    filter: isScrolled ? 'none' : 'none',
                    padding: '4px'
                  }}
                />
              </div>
            </motion.button>

            {/* Navigation Items */}
            <nav aria-label="Hauptnavigation">
              <ul className="hidden md:flex items-center gap-8">
                {navItems.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className={`relative text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 py-1 ${
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

            {/* Mobile Menu Button - Separate z-index layer */}
            <button
              onClick={handleMobileMenuToggle}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleMobileMenuToggle(e as any);
              }}
              className={`md:hidden p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm ${
                isScrolled
                  ? "text-earth-700 hover:text-accent"
                  : "text-white hover:text-earth-100"
              }`}
              style={{ 
                pointerEvents: 'auto', 
                touchAction: 'manipulation',
                position: 'relative',
                zIndex: 10001,
                WebkitTapHighlightColor: 'transparent'
              }}
              aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ pointerEvents: 'none' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ pointerEvents: 'none' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[10000] bg-earth-900/95 backdrop-blur-md md:hidden"
              style={{ pointerEvents: 'auto' }}
            />

            {/* Menu Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[10001] md:hidden bg-earth-900 shadow-2xl overflow-y-auto"
              style={{ pointerEvents: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full w-full flex flex-col">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-earth-800 bg-earth-900 sticky top-0 z-10" style={{ paddingTop: 'calc(80px + 1.5rem)' }}>
                  <span className="font-serif text-2xl text-earth-100">Menü</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-earth-100 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                    aria-label="Menü schließen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Navigation Items */}
                <nav aria-label="Mobile Navigation" className="flex-1 flex items-center px-6 py-8 overflow-y-auto">
                  <ul className="w-full flex flex-col gap-4">
                    {navItems.map(({ id, label }, index) => (
                      <motion.li
                        key={id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="w-full"
                      >
                        <button
                          onClick={() => scrollToSection(id)}
                          className={`w-full text-left px-6 py-5 rounded-xl text-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.98] ${
                            activeSection === id
                              ? "bg-accent text-white shadow-lg"
                              : "bg-earth-800 text-earth-50 hover:bg-earth-700"
                          }`}
                          aria-current={activeSection === id ? "page" : undefined}
                        >
                          {label}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer Hint */}
                <div className="px-6 py-6 text-center border-t border-earth-800 bg-earth-900">
                  <p className="text-sm text-earth-300">
                    Tippe ein Menüpunkt an, um zur Sektion zu springen
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
