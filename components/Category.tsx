"use client";
import React from "react";
import { SlidersHorizontal } from "lucide-react";

interface Category {
  _id: string;
  title: string;
}

interface CategoryProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  onSale?: boolean;
  onToggleSale?: () => void;
  newArrivals?: boolean;
  onToggleNewArrivals?: () => void;
  sortBy?: string;
  onSortChange?: (sort: "default" | "price-low" | "price-high" | "newest" | "popularity") => void;
  onOpenAdvancedFilters?: () => void;
}

export default function Category({
  categories,
  selectedCategory,
  onSelectCategory,
  onSale = false,
  onToggleSale,
  newArrivals = false,
  onToggleNewArrivals,
  sortBy = "default",
  onSortChange,
  onOpenAdvancedFilters,
}: CategoryProps) {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-x-visible">
      {/* Category buttons */}
      <button
        onClick={() => onSelectCategory("")}
        className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap  touch-manipulation ${
          selectedCategory === ""
            ? "bg-black text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        All
      </button>

      {categories.map((c) => (
        <button
          key={c._id}
          onClick={() => onSelectCategory(c._id)}
          className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap touch-manipulation ${
            selectedCategory === c._id
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {c.title}
        </button>
      ))}

      {/* Filter buttons */}
      {onToggleSale && (
        <button
          onClick={onToggleSale}
          className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap touch-manipulation ${
            onSale
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          On Sale
        </button>
      )}

      {onToggleNewArrivals && (
        <button
          onClick={onToggleNewArrivals}
          className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap  touch-manipulation ${
            newArrivals
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          New
        </button>
      )}

      {onSortChange && (
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as "default" | "price-low" | "price-high" | "newest" | "popularity")}
          className="flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs bg-white text-gray-700 hover:bg-gray-100 border-0 outline-none cursor-pointer touch-manipulation"
        >
          <option value="default">Sort</option>
          <option value="price-low">Price: Low</option>
          <option value="price-high">Price: High</option>
          <option value="newest">Newest</option>
        </select>
      )}

      {onOpenAdvancedFilters && (
        <button
          onClick={onOpenAdvancedFilters}
          className="flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs bg-white text-gray-700 hover:bg-gray-100 whitespace-nowrap  touch-manipulation"
        >
          <SlidersHorizontal className="w-3 h-3 mr-1" />
          More
        </button>
      )}
    </div>
  );
}
