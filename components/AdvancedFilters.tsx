"use client";

import React, { useState, useEffect } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { useFilter } from "@/useFilter";

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  availableSizes: string[];
  availableColors: string[];
  availableMaterials: string[];
  maxPrice: number;
}

export default function AdvancedFilters({
  isOpen,
  onClose,
  availableSizes,
  availableColors,
  availableMaterials,
  maxPrice,
}: AdvancedFiltersProps) {
  const {
    priceRange,
    selectedSizes,
    selectedColors,
    selectedMaterials,
    onSale,
    newArrivals,
    sortBy,
    setPriceRange,
    toggleSize,
    toggleColor,
    toggleMaterial,
    setOnSale,
    setNewArrivals,
    setSortBy,
    resetFilters,
  } = useFilter();

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handlePriceChange = (min: number, max: number) => {
    setLocalPriceRange([min, max]);
  };

  const applyPriceFilter = () => {
    setPriceRange(localPriceRange);
  };

  const handleReset = () => {
    resetFilters();
    setLocalPriceRange([0, maxPrice]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 dark:bg-black/50 ">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base md:text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-3 md:p-4 space-y-4 md:space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="text-sm md:text-base font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">Price Range</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={localPriceRange[0]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), localPriceRange[1])}
                  className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-xs md:text-sm bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localPriceRange[1]}
                  onChange={(e) => handlePriceChange(localPriceRange[0], Number(e.target.value))}
                  className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-xs md:text-sm bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Max"
                />
              </div>
              <button
                onClick={applyPriceFilter}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-1.5 md:py-2 rounded-md text-xs md:text-sm hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Apply Price Filter
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="text-sm md:text-base font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">Size</h3>
            <div className="grid grid-cols-4 gap-1 md:gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-2 py-1 md:px-3 md:py-2 border rounded-md text-xs md:text-sm ${
                    selectedSizes.includes(size)
                      ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                      : "bg-card text-black dark:text-white border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="text-sm md:text-base font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">Color</h3>
            <div className="grid grid-cols-6 gap-2 md:gap-3">
              {availableColors.map((color) => {
                const bgColor = color.startsWith('#') ? color : color;
                return (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all ${
                      selectedColors.includes(color)
                        ? "border-black dark:border-white scale-110"
                        : "border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white hover:scale-105"
                    }`}
                    style={{ backgroundColor: bgColor }}
                    title={color}
                  />
                );
              })}
            </div>
          </div>

          {/* Materials */}
          <div>
            <h3 className="text-sm md:text-base font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">Material</h3>
            <div className="space-y-1 md:space-y-2">
              {availableMaterials.map((material) => (
                <label key={material} className="flex items-center gap-1 md:gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material)}
                    onChange={() => toggleMaterial(material)}
                    className="rounded"
                  />
                  <span className="text-xs md:text-sm text-gray-900 dark:text-white">{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div>
            <h3 className="text-sm md:text-base font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">Special Offers</h3>
            <div className="space-y-1 md:space-y-2">
              <label className="flex items-center gap-1 md:gap-2">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  className="rounded"
                />
                <span className="text-xs md:text-sm text-gray-900 dark:text-white">On Sale</span>
              </label>
              <label className="flex items-center gap-1 md:gap-2">
                <input
                  type="checkbox"
                  checked={newArrivals}
                  onChange={(e) => setNewArrivals(e.target.checked)}
                  className="rounded"
                />
                <span className="text-xs md:text-sm text-gray-900 dark:text-white">New Arrivals</span>
              </label>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-sm md:text-base font-medium mb-2 md:mb-3 text-gray-900 dark:text-white">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'price-low' | 'price-high' | 'newest' | 'popularity')}
              className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 dark:border-gray-600 rounded-md text-xs md:text-sm bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-3 md:p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleReset}
            className="flex-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 py-1.5 md:py-2 rounded-md text-xs md:text-sm hover:bg-orange-200 dark:hover:bg-orange-800"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-1.5 md:py-2 rounded-md text-xs md:text-sm hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}