import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/useQuery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Grid3X3 } from "lucide-react";

interface Category {
  _id: string;
  title: string;
  slug?: {
    current: string;
  } | string;
  imageUrl?: string;
  productCount?: number;
}

function getSlugValue(slug?: { current: string } | string): string {
  if (!slug) return 'no-slug';
  if (typeof slug === 'string') return slug;
  return slug.current || 'no-slug';
}

export default async function CategoriesPage() {
  const categories = await getCategories(50) as Category[]; // Get all categories

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/products">
              <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Grid3X3 className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
                Categories
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collections organized by style, occasion, and theme. Find exactly what you're looking for.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                {categories.length} Categories
              </Badge>
              <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                {categories.reduce((total, cat) => total + (cat.productCount || 0), 0)} Products
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${getSlugValue(category.slug)}`}
                className="group"
              >
                <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  {category.imageUrl && (
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image
                        src={category.imageUrl}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:text-fashion-gold transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                      Discover our {category.title.toLowerCase()} collection
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300">
                        {category.productCount || 0} items
                      </Badge>

                      <div className="text-fashion-gold font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Shop Now →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              No Categories Found
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mb-6">
              We're working on organizing our categories. Check back soon!
            </p>
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Categories | Tama Shop',
    description: 'Explore our curated clothing categories. Find the perfect style for every occasion with our organized collections.',
  };
}