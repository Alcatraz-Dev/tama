"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, TranslationKey } from './translations';

export type { Language };

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  translate: (text: string, from?: Language, to?: Language) => Promise<string>;
  isTranslating: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem('tama-language') as Language;
    if (savedLang && ['en', 'fr', 'ar'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tama-language', lang);
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations.en[key] || key;

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }

    return text;
  };

  const translate = async (text: string, from: Language = 'en', to: Language = language): Promise<string> => {
    if (from === to) return text;

    const cacheKey = `${from}-${to}-${text}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    setIsTranslating(true);

    try {
      // Using Google Translate API (you'll need to set up your API key)
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          from,
          to,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      const translatedText = data.translatedText;

      setTranslationCache(prev => ({
        ...prev,
        [cacheKey]: translatedText,
      }));

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to original text
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <TranslationContext.Provider value={{
      language,
      setLanguage,
      t,
      translate,
      isTranslating,
    }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

// Hook for automatic translation of dynamic content
export function useAutoTranslate() {
  const { translate, language } = useTranslation();

  const autoTranslate = async (text: string, originalLang: Language = 'en') => {
    if (language === originalLang) return text;
    return await translate(text, originalLang, language);
  };

  return autoTranslate;
}