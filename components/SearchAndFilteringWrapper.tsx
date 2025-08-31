"use client";

import React, { useState, useEffect } from "react";
import SubHero from "./SubHero";
import { getCategories, getsubcategories } from "@/lib/useQuery";

interface Props {
  onSearch: (value: string) => void;
  onCategorySelect: (value: string) => void;
  onFilterSelect: (value: string) => void;
  searchValue?: string;
  selectedCategory?: string;
  selectedFilter?: string;
}

export default function SearchAndFilltring({
  onSearch,
  onCategorySelect,
  onFilterSelect,
  searchValue = "",
  selectedCategory = "",
  selectedFilter = "",
}: Props) {
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [localSearch, setLocalSearch] = useState(searchValue);

  useEffect(() => {
    getCategories().then(setCategories);
    getsubcategories().then(setSubCategories);
  }, []);

  // Sync local search with parent onSearch
  useEffect(() => {
    onSearch(localSearch);
  }, [localSearch, onSearch]);

  return (
    <SubHero
      categories={categories}
      searchQuery={localSearch}
      onSearchChange={setLocalSearch}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect}
      selectedSubCategory={selectedSubCategory}
      onSubCategorySelect={setSelectedSubCategory}
      selectedFilter={selectedFilter}
      onFilterSelect={onFilterSelect}
    />
  );
}