"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchInput from "./SearchInput";
import Category from "./Category";
import FillterDropdown from "./FillterDropdown";

function SubHero({ categories }: any) {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Motion variants for child items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-5 px-4 py-2"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      {/* Search */}
      <motion.div variants={itemVariants} className="w-full md:w-auto">
        <SearchInput />
      </motion.div>

      {/* Categories */}
      <motion.div variants={itemVariants} className="w-full md:w-auto">
        <Category categories={categories} />
      </motion.div>

      {/* Filter Dropdown */}
      <motion.div variants={itemVariants} className="w-full md:w-auto">
        <FillterDropdown
          options={["Price", "Date", "Rating"]}
          selected={selectedFilter || "Select Filter"}
          onSelect={setSelectedFilter}
        />
      </motion.div>
    </motion.div>
  );
}

export default SubHero;