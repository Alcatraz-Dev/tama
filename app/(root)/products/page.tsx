"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllProducts } from "@/lib/useQuery";
import SearchAndFilltring from "@/components/SearchAndFilteringWrapper";
import ProductCard from "@/components/ProductCard";
import AdvancedFilters from "@/components/AdvancedFilters";
import { useFilter } from "@/useFilter";
import { Product } from "@/lib/types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    searchQuery,
    category,
    subcategory,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedMaterials,
    onSale,
    newArrivals,
    sortBy,
    setSearchQuery,
    setCategory,
    setSubcategory,
    setPriceRange,
    setSizes,
    setColors,
    setMaterials,
    setOnSale,
    setNewArrivals,
    setSortBy,
  } = useFilter();

  // Load filters from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get('q')) setSearchQuery(params.get('q')!);
    if (params.get('category')) setCategory(params.get('category'));
    if (params.get('subcategory')) setSubcategory(params.get('subcategory'));
    if (params.get('minPrice') || params.get('maxPrice')) {
      setPriceRange([
        Number(params.get('minPrice')) || 0,
        Number(params.get('maxPrice')) || 1000,
      ]);
    }
    if (params.get('sizes')) setSizes(params.get('sizes')!.split(','));
    if (params.get('colors')) setColors(params.get('colors')!.split(','));
    if (params.get('materials')) setMaterials(params.get('materials')!.split(','));
    if (params.get('onSale')) setOnSale(params.get('onSale') === 'true');
    if (params.get('newArrivals')) setNewArrivals(params.get('newArrivals') === 'true');
    if (params.get('sort')) setSortBy(params.get('sort') as 'default' | 'price-low' | 'price-high' | 'newest' | 'popularity');
  }, []);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery) params.set('q', searchQuery);
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 1000) params.set('maxPrice', priceRange[1].toString());
    if (selectedSizes.length > 0) params.set('sizes', selectedSizes.join(','));
    if (selectedColors.length > 0) params.set('colors', selectedColors.join(','));
    if (selectedMaterials.length > 0) params.set('materials', selectedMaterials.join(','));
    if (onSale) params.set('onSale', 'true');
    if (newArrivals) params.set('newArrivals', 'true');
    if (sortBy !== 'default') params.set('sort', sortBy);

    const queryString = params.toString();
    const newUrl = queryString ? `/products?${queryString}` : '/products';

    router.replace(newUrl, { scroll: false });
  }, [
    searchQuery,
    category,
    subcategory,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedMaterials,
    onSale,
    newArrivals,
    sortBy,
    router,
  ]);

  useEffect(() => {
    getAllProducts().then((data) => {
      console.log("Fetched products:", data);
      setProducts(data);
    });
  }, []);

  // Get available filter options
  const availableOptions = useMemo(() => {
    const sizes = new Set<string>();
    const colors = new Set<string>();
    const materials = new Set<string>();
    let maxPrice = 0;

    // Common fashion colors
    const fashionColors = [
      '#000000', // Black
      '#FFFFFF', // White
      '#FF0000', // Red
      '#0000FF', // Blue
      '#008000', // Green
      '#FFFF00', // Yellow
      '#800080', // Purple
      '#FFA500', // Orange
      '#FFC0CB', // Pink
      '#A52A2A', // Brown
      '#808080', // Gray
      '#00FFFF', // Cyan
      '#FF00FF', // Magenta
      '#F5F5DC', // Beige
      '#800000', // Maroon
      '#008080', // Teal
      '#000080', // Navy
      '#FFD700', // Gold
      '#C0C0C0', // Silver
      '#8B4513', // Saddle Brown
    ];

    products.forEach((product) => {
      if (product.sizes) {
        product.sizes.forEach((size: string) => sizes.add(size));
      }
      if (product.colors) {
        product.colors.forEach((color) => {
          if (typeof color === 'string') {
            colors.add(color);
          } else {
            if (color.name) colors.add(color.name);
            else if (color.hex) colors.add(color.hex);
          }
        });
      }
      if (product.materials) {
        product.materials.forEach((material: string) => materials.add(material));
      }
      if (product.price > maxPrice) maxPrice = product.price;
    });

    // Add fashion colors to the set
    fashionColors.forEach(color => colors.add(color));

    return {
      sizes: Array.from(sizes).sort(),
      colors: Array.from(colors).sort(),
      materials: Array.from(materials).sort(),
      maxPrice,
    };
  }, [products]);

  // Filtering + sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];
    const query = searchQuery.trim().toLowerCase();

    // Search filter
    if (query) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category) {
      result = result.filter(
        (p) =>
          p.category?._id === category ||
          p.category?.title === category
      );
    }

    // Subcategory filter
    if (subcategory) {
      result = result.filter(
        (p) =>
          (p.subcategory?._id === subcategory ||
            p.subcategory?.title === subcategory) &&
          (!category || p.category?._id === category)
      );
    }

    // Price range filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((size: string) => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((color) => {
          if (typeof color === 'string') {
            return selectedColors.includes(color);
          } else {
            return selectedColors.includes(color.name || color.hex || '');
          }
        })
      );
    }

    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter((p) =>
        p.materials?.some((material: string) => selectedMaterials.includes(material))
      );
    }

    // Sale filter
    if (onSale) {
      result = result.filter((p) => p.onSale);
    }

    // New arrivals filter (products from last 30 days)
    if (newArrivals) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter((p) =>
        p._createdAt && new Date(p._createdAt) > thirtyDaysAgo
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            (b._createdAt ? new Date(b._createdAt).getTime() : 0) - (a._createdAt ? new Date(a._createdAt).getTime() : 0)
        );
        break;
      case 'popularity':
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [
    products,
    searchQuery,
    category,
    subcategory,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedMaterials,
    onSale,
    newArrivals,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  return (
    <section className="py-8 md:py-12">
      {/* Filtering controls */}
      <div className="my-5 flex flex-col items-center gap-4">
        <SearchAndFilltring onOpenAdvancedFilters={() => setShowAdvancedFilters(true)} />
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        availableSizes={availableOptions.sizes}
        availableColors={availableOptions.colors}
        availableMaterials={availableOptions.materials}
        maxPrice={availableOptions.maxPrice}
      />

      <div className="flex justify-between items-center mb-8 mx-5 md:mx-12">
        <h1 className="text-2xl md:text-3xl font-bold">
          All Products
        </h1>
        <p className="text-sm text-gray-600">
          {filteredProducts.length} products found
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 md:px-12 z-20">
        {paginatedProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              searchQuery={searchQuery}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
            if (pageNum > totalPages) return null;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 border rounded-md ${
                  currentPage === pageNum
                    ? "bg-black text-white border-black"
                    : "hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
