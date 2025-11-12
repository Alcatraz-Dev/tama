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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={localPriceRange[0]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), localPriceRange[1])}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={localPriceRange[1]}
                  onChange={(e) => handlePriceChange(localPriceRange[0], Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Max"
                />
              </div>
              <button
                onClick={applyPriceFilter}
                className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800"
              >
                Apply Price Filter
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-3">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-2 border rounded-md text-sm ${
                    selectedSizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-medium mb-3">Color</h3>
            <div className="grid grid-cols-6 gap-3">
              {availableColors.map((color) => {
                const bgColor = color.startsWith('#') ? color : color;
                return (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColors.includes(color)
                        ? "border-black scale-110"
                        : "border-gray-300 hover:border-black hover:scale-105"
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
            <h3 className="font-medium mb-3">Material</h3>
            <div className="space-y-2">
              {availableMaterials.map((material) => (
                <label key={material} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material)}
                    onChange={() => toggleMaterial(material)}
                    className="rounded"
                  />
                  <span className="text-sm">{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Filters */}
          <div>
            <h3 className="font-medium mb-3">Special Offers</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => setOnSale(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">On Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newArrivals}
                  onChange={(e) => setNewArrivals(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">New Arrivals</span>
              </label>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="font-medium mb-3">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-md text-sm"
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
        <div className="flex gap-2 p-4 border-t">
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md text-sm hover:bg-gray-200"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}