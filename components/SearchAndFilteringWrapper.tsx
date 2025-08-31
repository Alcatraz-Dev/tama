"use client";

import React, { useState, useEffect } from "react";
import SubHero from "./SubHero";
import { getCategories } from "@/lib/useQuery";

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

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <SubHero
      categories={categories}
      searchQuery={searchValue}
      onSearchChange={onSearch}
      selectedCategory={selectedCategory}
      onCategorySelect={onCategorySelect}
      selectedFilter={selectedFilter}
      onFilterSelect={onFilterSelect}
    />
  );
}