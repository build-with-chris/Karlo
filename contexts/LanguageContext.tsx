"use client";

import React, { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { Language, translations, defaultLanguage } from "@/lib/i18n";
import { subscribeToStorage, writeToStorage } from "@/lib/clientStorage";

type TranslationsType = typeof translations[Language];

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "language";

function getStoredLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "de" || saved === "en" ? saved : defaultLanguage;
}

// Auf dem Server gibt es keinen localStorage, dort gilt die Standardsprache.
function getDefaultLanguage(): Language {
  return defaultLanguage;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToStorage,
    getStoredLanguage,
    getDefaultLanguage
  );

  const setLanguage = useCallback((lang: Language) => {
    writeToStorage(STORAGE_KEY, lang);
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
