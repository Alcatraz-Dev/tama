"use client";

import { useState } from "react";
import { useTranslation, Language } from "@/lib/translationContext";
import { ChevronDown, Globe } from "lucide-react";

const languages = {
  en: { name: "English", flag: "🇺🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  ar: { name: "العربية", flag: "🇹🇳" },
};

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-1.5  rounded-md sm:rounded-lg bg-muted hover:bg-muted/80 transition-colors"
        aria-label="Change language"
      >
        {/* <Globe className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> */}
        <span className="text-xs sm:text-sm font-medium">
          {languages[language].flag}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-50 py-1">
            {Object.entries(languages).map(([code, { name, flag }]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code as Language);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted transition-colors ${
                  language === code ? 'bg-muted/50 text-primary' : 'text-foreground'
                }`}
              >
                <span>{flag}</span>
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}