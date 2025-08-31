"use client";
import React from "react";
import { motion } from "framer-motion";
import SearchInput from "./SearchInput";
import Category from "./Category";

interface SubHeroProps {
  categories: any[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategorySelect: (value: string) => void;
  selectedSubCategory: string; // <-- new
  onSubCategorySelect: (value: string) => void; // <-- new
  selectedFilter: string;
  onFilterSelect: (value: string) => void;
}

function SubHero({
  categories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
}: SubHeroProps) {
  // Motion variants for child items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center gap-5 px-4 py-2"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Search */}
      <motion.div variants={itemVariants} className="w-full md:w-auto">
        <SearchInput value={searchQuery} onChange={onSearchChange} />
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants} className="w-full md:w-auto">
        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onCategorySelect}
        />
      </motion.div>
    </motion.div>
  );
}

export default SubHero;
