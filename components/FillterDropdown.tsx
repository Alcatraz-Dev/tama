"use client";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function FillterDropdown({ options, selected, onSelect }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-48 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-2 bg-white font-semibold text-xs  rounded-full shadow-sm hover:bg-gray-100"
      >
        {selected}
        <div className="bg-slate-200 rounded-full p-1">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 w-full mt-1 bg-white border text-xs border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">
          {options.map((option: any, idx: number) => (
            <li
              key={idx}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-gray-700"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default FillterDropdown;