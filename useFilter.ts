"use client";
import { create } from "zustand";

export interface FilterState {
  // Existing
  category: string | null;
  subcategory: string | null;

  // Search
  searchQuery: string;

  // Price
  priceRange: [number, number];

  // Size
  selectedSizes: string[];

  // Color
  selectedColors: string[];

  // Material
  selectedMaterials: string[];

  // Special filters
  onSale: boolean;
  newArrivals: boolean;

  // Sort
  sortBy: 'price-low' | 'price-high' | 'newest' | 'popularity' | 'default';
}

export interface FilterActions {
  // Existing
  setCategory: (c: string | null) => void;
  setSubcategory: (c: string | null) => void;

  // Search
  setSearchQuery: (q: string) => void;

  // Price
  setPriceRange: (range: [number, number]) => void;

  // Size
  toggleSize: (size: string) => void;
  setSizes: (sizes: string[]) => void;

  // Color
  toggleColor: (color: string) => void;
  setColors: (colors: string[]) => void;

  // Material
  toggleMaterial: (material: string) => void;
  setMaterials: (materials: string[]) => void;

  // Special
  setOnSale: (onSale: boolean) => void;
  setNewArrivals: (newArrivals: boolean) => void;

  // Sort
  setSortBy: (sort: FilterState['sortBy']) => void;

  // Reset
  resetFilters: () => void;
}

const initialState: FilterState = {
  category: null,
  subcategory: null,
  searchQuery: '',
  priceRange: [0, 1000],
  selectedSizes: [],
  selectedColors: [],
  selectedMaterials: [],
  onSale: false,
  newArrivals: false,
  sortBy: 'default',
};

export const useFilter = create<FilterState & FilterActions>((set, get) => ({
  ...initialState,

  setCategory: (c) => set({ category: c }),
  setSubcategory: (c) => set({ subcategory: c }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setPriceRange: (range) => set({ priceRange: range }),
  toggleSize: (size) => set((state) => ({
    selectedSizes: state.selectedSizes.includes(size)
      ? state.selectedSizes.filter(s => s !== size)
      : [...state.selectedSizes, size]
  })),
  setSizes: (sizes) => set({ selectedSizes: sizes }),
  toggleColor: (color) => set((state) => ({
    selectedColors: state.selectedColors.includes(color)
      ? state.selectedColors.filter(c => c !== color)
      : [...state.selectedColors, color]
  })),
  setColors: (colors) => set({ selectedColors: colors }),
  toggleMaterial: (material) => set((state) => ({
    selectedMaterials: state.selectedMaterials.includes(material)
      ? state.selectedMaterials.filter(m => m !== material)
      : [...state.selectedMaterials, material]
  })),
  setMaterials: (materials) => set({ selectedMaterials: materials }),
  setOnSale: (onSale) => set({ onSale }),
  setNewArrivals: (newArrivals) => set({ newArrivals }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(initialState),
}));