"use client";
import React from "react";

interface CategoryProps {
  categories: any[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function Category({ categories, selected, onSelect }: CategoryProps) {
  return (
    <div className="flex flex-row gap-3 flex-wrap">
      {/* "All" button to reset category */}
      <button
        onClick={() => onSelect("")} // Clear selection
        className={`flex justify-center items-center px-4 py-2 rounded-full shadow-sm text-sm ${
          selected === "" ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((c: any) => {
        const isActive = selected === c._id || selected === c.title;
        return (
          <button
            key={c._id}
            onClick={() => onSelect(c._id)}
            className={`flex justify-center items-center px-4 py-2 rounded-full shadow-sm text-sm ${
              isActive ? "bg-black text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {c.title}
          </button>
        );
      })}
    </div>
  );
}