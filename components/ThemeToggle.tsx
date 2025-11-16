"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-muted hover:bg-muted/80 transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-500" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-1 sm:p-2 rounded-md sm:rounded-lg bg-muted hover:bg-muted/80 transition-all duration-500 overflow-hidden group active:scale-95"
      aria-label="Toggle theme"
    >
      {/* Dynamic background glow */}
      <div className={`absolute inset-0 rounded-md sm:rounded-lg transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-r from-yellow-400/30 via-orange-400/20 to-red-400/10 opacity-0 group-hover:opacity-100"
          : "bg-gradient-to-r from-blue-400/30 via-purple-400/20 to-indigo-400/10 opacity-0 group-hover:opacity-100"
      }`} />

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-md sm:rounded-lg bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300" />

      <div className="relative z-10 transition-all duration-500 group-hover:scale-125 group-active:scale-110">
        {theme === "dark" ? (
          <Sun className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-500 drop-shadow-lg transition-all duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:brightness-125" />
        ) : (
          <Moon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 drop-shadow-lg transition-all duration-700 ease-in-out group-hover:rotate-[-360deg] group-hover:brightness-125" />
        )}
      </div>

      {/* Enhanced sparkle effects */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {/* Main sparkles */}
        <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '1s' }} />
        <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.2s' }} />
        <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '0.8s' }} />
        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }} />

        {/* Orbiting sparkles */}
        <div className="absolute w-6 h-6 border border-yellow-400/50 rounded-full animate-spin opacity-60" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 w-0.5 h-0.5 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

    </button>
  );
}