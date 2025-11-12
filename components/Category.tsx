"use client";
import React from "react";

interface Category {
  _id: string;
  title: string;
}

interface CategoryProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export default function Category({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryProps) {
  return (
    <div className="flex flex-row gap-3 overflow-x-auto ">
      <button
        onClick={() => onSelectCategory("")}
        className={`flex justify-center items-center px-4 py-2 rounded-full shadow-sm text-sm ${
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
          className={`flex justify-center items-center px-4 py-2 rounded-full shadow-sm text-sm ${
            selectedCategory === c._id
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {c.title}
        </button>
      ))}
    </div>
  );
}
