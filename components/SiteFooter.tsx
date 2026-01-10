"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SiteFooter() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-50 border-t border-earth-200">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <p className="text-sm text-earth-700/70 mb-0">
            {t.footer.copyright.replace("{year}", currentYear.toString())}
          </p>

          {/* Minimal Links */}
          <nav className="flex gap-8" aria-label="Footer Navigation">
            <a
              href="/impressum"
              className="text-sm text-earth-700/70 hover:text-accent transition-colors no-underline"
            >
              {t.footer.impressum}
            </a>
            <a
              href="/datenschutz"
              className="text-sm text-earth-700/70 hover:text-accent transition-colors no-underline"
            >
              {t.footer.datenschutz}
            </a>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
