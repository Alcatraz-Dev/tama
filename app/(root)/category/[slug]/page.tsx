"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug, getCategories } from "@/lib/useQuery";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Package,
  ChevronRight,
  Home,
  SlidersHorizontal,
} from "lucide-react";
import { Product } from "@/lib/types";
import { useTranslation } from "@/lib/translationContext";

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  imageUrl?: string;
  productCount?: number;
}

interface Category {
  _id: string;
  title: string;
  title_fr?: string;
  title_ar?: string;
  slug: {
    current: string;
  };
  imageUrl?: string;
  productCount?: number;
  description?: string;
  description_fr?: string;
  description_ar?: string;
  totalProducts: number;
  products?: Product[];
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedCategories, setRelatedCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();

  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);

  const page = parseInt(resolvedSearchParams.page || "1");
  const limit = 12;
  const offset = (page - 1) * limit;

  const getTranslatedField = (obj: any, field: string) => {
    if (language === "en") return obj[field];
    return obj[`${field}_${language}`] || obj[field];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryData, relatedData] = await Promise.all([
          getCategoryBySlug(resolvedParams.slug, limit, offset),
          getCategories(6),
        ]);
        setCategory(categoryData);
        setRelatedCategories(relatedData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.slug, page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-gold mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
            {t("categoryNotFound")}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {t("categoryNotFoundDesc")}
          </p>
          <Link href="/products">
            <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
              {t("browseAllProducts")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Breadcrumb Navigation */}
      <div className="border-b border-zinc-300 dark:border-zinc-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <Link
              href="/"
              className="flex items-center hover:text-fashion-dark transition-colors duration-200 p-1 rounded"
            >
              <Home
                className={`w-3 h-3 sm:w-4 sm:h-4  ${language === "ar" ? "ml-1" : "mr-1"}`}
              />
              <span className="hidden sm:inline">{t("home")}</span>
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400" />
            <Link
              href="/products"
              className="hover:text-fashion-dark transition-colors duration-200 p-1 rounded"
            >
              {t("products")}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400" />
            <span className="text-fashion-dark font-medium truncate">
              {getTranslatedField(category, "title")}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/products">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backToProducts")}
              </Button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {category.imageUrl && (
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={category.imageUrl}
                  alt={getTranslatedField(category, "title")}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black dark:text-white">
                {getTranslatedField(category, "title")}
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {t("discoverCollection", {
                  category: getTranslatedField(category, "title").toLowerCase(),
                })}
              </p>

              <div className="flex items-center gap-4 mt-6">
                <Badge
                  variant="secondary"
                  className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2"
                >
                  {category.totalProducts || 0} {t("products")}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black dark:text-white">
                {getTranslatedField(category, "title")} {t("collections")}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t("discoverCollection", {
                  category: getTranslatedField(category, "title").toLowerCase(),
                })}
              </p>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
              <select className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 bg-white dark:bg-zinc-800 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-fashion-gold">
                <option value="default">{t("filterDefault")}</option>
                <option value="price-low">{t("priceLow")}</option>
                <option value="price-high">{t("priceHigh")}</option>
                <option value="newest">{t("newest")}</option>
                <option value="popularity">{t("popularity")}</option>
              </select>
            </div>
          </div>
        </div>

        {category.products && category.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.products.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  searchQuery=""
                />
              ))}
            </div>

            {/* Pagination */}
            {category.totalProducts && category.totalProducts > limit && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {page > 1 && (
                  <Link
                    href={`/category/${resolvedParams.slug}?page=${page - 1}`}
                  >
                    <Button
                      variant="outline"
                      className="border-zinc-300 dark:border-zinc-600 text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    >
                      {t("previousPage")}
                    </Button>
                  </Link>
                )}

                {Array.from(
                  { length: Math.ceil(category.totalProducts / limit) },
                  (_, i) => i + 1
                )
                  .filter(
                    (p) =>
                      p >= Math.max(1, page - 2) &&
                      p <=
                        Math.min(
                          Math.ceil(category.totalProducts / limit),
                          page + 2
                        )
                  )
                  .map((p) => (
                    <Link
                      key={p}
                      href={`/category/${resolvedParams.slug}?page=${p}`}
                    >
                      <Button
                        variant={p === page ? "default" : "outline"}
                        className={
                          p === page
                            ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                            : "border-zinc-300 dark:border-zinc-600 text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700"
                        }
                      >
                        {p}
                      </Button>
                    </Link>
                  ))}

                {page < Math.ceil(category.totalProducts / limit) && (
                  <Link
                    href={`/category/${resolvedParams.slug}?page=${page + 1}`}
                  >
                    <Button
                      variant="outline"
                      className="border-zinc-300 dark:border-zinc-600 text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    >
                      {t("nextPage")}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              {t("noProductsFound")}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mb-6">
              {t("workingOnCategories")}
            </p>
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
                {t("browseAllProducts")}
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Related Categories */}
      {relatedCategories && relatedCategories.length > 1 && (
        <section className="py-16 px-6 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
                {t("ourCategoryList")}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                {t("categoriesDescription")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedCategories
                .filter((cat) => cat._id !== category._id) // Exclude current category
                .slice(0, 5) // Show up to 5 related categories
                .map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105">
                      {cat.imageUrl && (
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3">
                          <Image
                            src={cat.imageUrl}
                            alt={getTranslatedField(cat, "title")}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-sm text-center text-black dark:text-white group-hover:text-fashion-gold transition-colors">
                        {getTranslatedField(cat, "title")}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-1">
                        {cat.productCount || 0} {t("items")}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
