"use client";

import React, { useState, useEffect } from "react";
import SubHero from "./SubHero";
import { getCategories } from "@/lib/useQuery";
import { useFilter } from "@/useFilter";

export default function SearchAndFilltring() {
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const {
    searchQuery,
    category,
    sortBy,
    setSearchQuery,
    setCategory,
    setSortBy,
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
      onFilterSelect={(filter) => setSortBy(filter as any)}
    />
  );
}