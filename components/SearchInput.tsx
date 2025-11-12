import { Search, Clock, Mic, MicOff } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { getSearchSuggestions } from "@/lib/useQuery";

interface Suggestion {
  _id: string;
  title: string;
  slug: string;
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: Suggestion) => void;
}

function SearchInput({ value, onChange, onSuggestionSelect }: SearchInputProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Save search to recent searches
  const saveToRecentSearches = (searchTerm: string) => {
    if (!searchTerm.trim()) return;

    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length > 1) {
        try {
          const results = await getSearchSuggestions(value);
          setSuggestions(results);
          setShowSuggestions(true);
          setSelectedIndex(-1);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onChange(suggestion.title);
    saveToRecentSearches(suggestion.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    onChange(searchTerm);
    setShowSuggestions(false);
  };

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    if (newValue.trim()) {
      saveToRecentSearches(newValue);
    }
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleInputChange(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="relative max-w-xs sm:max-w-sm w-full">
      <div className="flex items-center gap-2 bg-white text-black px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-sm border border-gray-200 hover:border-gray-300 focus-within:border-fashion-gold focus-within:ring-2 focus-within:ring-fashion-gold/20 transition-all duration-200">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search products..."
          className="flex-1 outline-none text-sm sm:text-base bg-transparent placeholder:text-gray-400"
        />
        <button
          onClick={isListening ? stopVoiceSearch : startVoiceSearch}
          className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
            isListening
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          } active:scale-95`}
          title={isListening ? "Stop voice search" : "Start voice search"}
          aria-label={isListening ? "Stop voice search" : "Start voice search"}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
        <button
          type="button"
          className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200 active:scale-95"
          aria-label="Search"
        >
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {showSuggestions && (suggestions.length > 0 || (value.length === 0 && recentSearches.length > 0)) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-elegant z-50 max-h-60 overflow-y-auto mt-2"
        >
          {suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion._id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                    index === selectedIndex
                      ? "bg-fashion-gold/10 border-l-4 border-fashion-gold"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm sm:text-base text-gray-900 font-medium">{suggestion.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="px-4 py-3 text-xs font-semibold text-fashion-dark border-b border-gray-100 bg-gray-50">
                Recent Searches
              </div>
              <div className="py-2">
                {recentSearches.map((searchTerm, index) => (
                  <div
                    key={searchTerm}
                    onClick={() => handleRecentSearchClick(searchTerm)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150 ${
                      index === selectedIndex ? "bg-fashion-gold/10 border-l-4 border-fashion-gold" : ""
                    }`}
                  >
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-900 truncate">{searchTerm}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;