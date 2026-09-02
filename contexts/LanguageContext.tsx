"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { Language, translations, defaultLanguage } from "@/lib/i18n";

const STORAGE_KEY = "language";

type TranslationsType = (typeof translations)[Language];

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
};

// Kleiner Speicher ausserhalb von React. So liest der erste Client-Render die
// gespeicherte Sprache direkt, ohne setState im Effekt und ohne Nachrendern.
const listeners = new Set<() => void>();
let cachedLanguage: Language | null = null;

function isLanguage(value: unknown): value is Language {
  return value === "de" || value === "en";
}

function getSnapshot(): Language {
  if (cachedLanguage === null) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      cachedLanguage = isLanguage(stored) ? stored : defaultLanguage;
    } catch {
      // Privates Fenster oder gesperrter Speicher
      cachedLanguage = defaultLanguage;
    }
  }
  return cachedLanguage;
}

function getServerSnapshot(): Language {
  return defaultLanguage;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function setLanguageInStore(lang: Language) {
  cachedLanguage = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Ohne Speicher gilt die Wahl nur fuer diese Sitzung
  }
  listeners.forEach((listener) => listener());
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Das lang-Attribut muss der angezeigten Sprache folgen, sonst liest ein
  // Screenreader den englischen Text mit deutscher Aussprache vor.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: setLanguageInStore,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
