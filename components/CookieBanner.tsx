"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Prüfe ob Cookie-Präferenzen bereits gesetzt wurden
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const preferences = {
      necessary: true,
      functional: true,
      analytics: false, // Google Analytics falls später benötigt
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const preferences = {
      necessary: true,
      functional: false,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShowBanner(false);
  };

  const savePreferences = (preferences: {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
  }) => {
    const fullPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(fullPreferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[10000] bg-white border-t-2 border-earth-200 shadow-2xl"
        >
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
            {!showSettings ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-serif text-earth-700 mb-2">
                    Cookie-Einstellungen
                  </h3>
                  <p className="text-sm md:text-base text-earth-700/80 leading-relaxed">
                    Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                    Notwendige Cookies sind für die Funktionalität der Website erforderlich. Sie können Ihre
                    Präferenzen jederzeit anpassen.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 text-sm font-medium text-earth-700 border border-earth-300 rounded-lg hover:bg-earth-100 transition-colors whitespace-nowrap"
                  >
                    Einstellungen
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="px-4 py-2 text-sm font-medium text-earth-700 border border-earth-300 rounded-lg hover:bg-earth-100 transition-colors whitespace-nowrap"
                  >
                    Nur notwendige
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-earth-500 transition-colors whitespace-nowrap"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>
            ) : (
              <CookieSettings
                onSave={savePreferences}
                onCancel={() => setShowSettings(false)}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CookieSettings({
  onSave,
  onCancel,
}: {
  onSave: (preferences: {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
  }) => void;
  onCancel: () => void;
}) {
  const [preferences, setPreferences] = useState({
    necessary: true, // Immer aktiv
    functional: false,
    analytics: false,
  });

  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-serif text-earth-700">
          Cookie-Einstellungen
        </h3>
        <button
          onClick={onCancel}
          className="text-earth-500 hover:text-earth-700 transition-colors"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Notwendige Cookies */}
        <div className="border border-earth-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-earth-700 mb-1">
                Notwendige Cookies
              </h4>
              <p className="text-sm text-earth-700/70">
                Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich
                und können nicht deaktiviert werden.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.necessary}
              disabled
              className="w-5 h-5 text-accent border-earth-300 rounded focus:ring-accent"
            />
          </div>
        </div>

        {/* Funktionale Cookies */}
        <div className="border border-earth-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-earth-700 mb-1">
                Funktionale Cookies
              </h4>
              <p className="text-sm text-earth-700/70">
                Diese Cookies ermöglichen erweiterte Funktionalitäten und Personalisierung.
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.functional}
              onChange={(e) =>
                setPreferences({ ...preferences, functional: e.target.checked })
              }
              className="w-5 h-5 text-accent border-earth-300 rounded focus:ring-accent cursor-pointer"
            />
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="border border-earth-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-earth-700 mb-1">
                Analytics Cookies
              </h4>
              <p className="text-sm text-earth-700/70">
                Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren
                (z.B. Google Analytics, falls aktiviert).
              </p>
            </div>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={(e) =>
                setPreferences({ ...preferences, analytics: e.target.checked })
              }
              className="w-5 h-5 text-accent border-earth-300 rounded focus:ring-accent cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-earth-200">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-earth-700 border border-earth-300 rounded-lg hover:bg-earth-100 transition-colors"
        >
          Abbrechen
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-earth-500 transition-colors"
        >
          Präferenzen speichern
        </button>
      </div>
    </div>
  );
}

