"use client";

import React, { useState, useEffect, useMemo } from "react";
import { getProducts } from "@/lib/useQuery";
import SearchAndFilltring from "@/components/SearchAndFilteringWrapper";
import ProductCard from "@/components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // Filtering + sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (p) =>
          p.category?._id === selectedCategory ||
          p.category?.title === selectedCategory
      );
    }

    if (selectedFilter === "Price") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedFilter === "Date") {
      result.sort(
        (a, b) =>
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      );
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedFilter]);

  return (
    <section className="py-8 md:py-12">
      {/* Filtering controls */}
      <div className="my-5 flex justify-center items-center">
        <SearchAndFilltring
          onSearch={setSearchQuery}
          onCategorySelect={setSelectedCategory}
          onFilterSelect={setSelectedFilter}
          searchValue={searchQuery}
          selectedCategory={selectedCategory}
          selectedFilter={selectedFilter}
        />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-8 mx-5 md:mx-12">
        All Products
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 md:px-12 z-20">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        )}
      </div>
    </section>
  );
}
