"use client";
import React from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useTranslation } from "@/lib/translationContext";

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
  const { t, language } = useTranslation();

  const getTranslatedField = (obj: any, field: string) => {
    if (language === 'en') return obj[field];
    return obj[`${field}_${language}`] || obj[field];
  };
  return (
    <div className="flex flex-row flex-wrap justify-center gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-x-visible">
      {/* Category buttons */}
      <button
        onClick={() => onSelectCategory("")}
        className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap  touch-manipulation ${
          selectedCategory === ""
            ? "bg-black dark:bg-white text-white dark:text-black"
            : "bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        {t('all')}
      </button>

      {categories.map((c) => (
        <button
          key={c._id}
          onClick={() => onSelectCategory(c._id)}
          className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap touch-manipulation ${
            selectedCategory === c._id
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {getTranslatedField(c, 'title')}
        </button>
      ))}

      {/* Filter buttons */}
      {onToggleSale && (
        <button
          onClick={onToggleSale}
          className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap touch-manipulation ${
            onSale
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {t('onSale')}
        </button>
      )}

      {onToggleNewArrivals && (
        <button
          onClick={onToggleNewArrivals}
          className={`flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs whitespace-nowrap  touch-manipulation ${
            newArrivals
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {t('newArrivals')}
        </button>
      )}

      {onSortChange && (
        <div className={`relative ${language === "ar" ? "mx-1" : ""}`}>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "default" | "price-low" | "price-high" | "newest" | "popularity")}
            className="flex justify-center items-center pl-2 pr-6 py-1.5 rounded-full shadow-sm text-xs bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-0 outline-none cursor-pointer touch-manipulation appearance-none w-auto"
          >
            <option value="default">{t('filterSortBy')}</option>
            <option value="price-low">{t('priceLow')}</option>
            <option value="price-high">{t('priceHigh')}</option>
            <option value="newest">{t('newest')}</option>
          </select>
          <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-700 dark:text-gray-300 pointer-events-none" />
        </div>
      )}

      {onOpenAdvancedFilters && (
        <button
          onClick={onOpenAdvancedFilters}
          className="flex justify-center items-center px-4 py-1.5 rounded-full shadow-sm text-xs bg-card text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap  touch-manipulation"
        >
          <SlidersHorizontal className={`w-3 h-3 ${language === "ar" ? "ml-1" : "mr-1"}`} />
          {t('more')}
        </button>
      )}
    </div>
  );
}
