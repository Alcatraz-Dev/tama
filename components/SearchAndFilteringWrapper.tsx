"use client";

import React, { useState, useEffect } from "react";
import SubHero from "./SubHero";
import { getCategories } from "@/lib/useQuery";
import { useFilter } from "@/useFilter";
import { Category } from "@/lib/types";
import { FilterState } from "@/useFilter";

interface SearchAndFilteringWrapperProps {
  onOpenAdvancedFilters?: () => void;
}

export default function SearchAndFiltering({ onOpenAdvancedFilters }: SearchAndFilteringWrapperProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const {
    searchQuery,
    category,
    sortBy,
    onSale,
    newArrivals,
    setSearchQuery,
    setCategory,
    setSortBy,
    setOnSale,
    setNewArrivals,
  } = useFilter();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <SubHero
      categories={categories}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedCategory={category || ""}
      onCategorySelect={setCategory}
      selectedSubCategory={selectedSubCategory}
      onSubCategorySelect={setSelectedSubCategory}
      selectedFilter={sortBy}
      onFilterSelect={(filter) => setSortBy(filter as FilterState['sortBy'])}
      onSale={onSale}
      onToggleSale={() => setOnSale(!onSale)}
      newArrivals={newArrivals}
      onToggleNewArrivals={() => setNewArrivals(!newArrivals)}
      sortBy={sortBy}
      onSortChange={setSortBy}
      onOpenAdvancedFilters={onOpenAdvancedFilters}
    />
  );
}