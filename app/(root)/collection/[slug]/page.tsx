"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCollectionBySlug } from "@/lib/useQuery";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palette, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import { useTranslation } from "@/lib/translationContext";

interface Collection {
  _id: string;
  title: string;
  title_fr?: string;
  title_ar?: string;
  description?: string;
  description_fr?: string;
  description_ar?: string;
  stylingTips?: string;
  stylingTips_fr?: string;
  stylingTips_ar?: string;
  season?: string;
  year?: number;
  theme?: string;
  imageUrl?: string;
  totalProducts: number;
  products?: Product[];
}

export default function CollectionPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page?: string, category?: string, minPrice?: string, maxPrice?: string }> }) {
  const resolvedParams = use(params);
  const resolvedSearchParams = use(searchParams);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();

  const page = parseInt(resolvedSearchParams.page || '1');
  const limit = 12;
  const offset = (page - 1) * limit;

  const filters = {
    category: resolvedSearchParams.category,
    minPrice: resolvedSearchParams.minPrice ? parseFloat(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? parseFloat(resolvedSearchParams.maxPrice) : undefined,
  };

  const getTranslatedField = (obj: any, field: string) => {
    if (language === 'en') return obj[field];
    return obj[`${field}_${language}`] || obj[field];
  };

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const data = await getCollectionBySlug(resolvedParams.slug, limit, offset, filters);
        setCollection(data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [resolvedParams.slug, page, filters.category, filters.minPrice, filters.maxPrice]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-gold mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('collectionNotFound')}</h1>
          <Link href="/collections">
            <Button>{t('backToCollections')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {collection.imageUrl && (
          <Image
            src={collection.imageUrl}
            alt={collection.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {getTranslatedField(collection, 'title')}
            </h1>
            {getTranslatedField(collection, 'description') && (
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                {getTranslatedField(collection, 'description')}
              </p>
            )}

            {/* Collection Metadata */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {collection.season && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t(collection.season as any)}
                </Badge>
              )}
              {collection.year && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Calendar className="w-4 h-4 mr-2" />
                  {collection.year}
                </Badge>
              )}
              {collection.theme && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Palette className="w-4 h-4 mr-2" />
                  {t(collection.theme as any)}
                </Badge>
              )}
            </div>

            {getTranslatedField(collection, 'stylingTips') && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">{t('stylingTips')}</h3>
                <p className="text-sm leading-relaxed">{getTranslatedField(collection, 'stylingTips')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            {t('collectionPieces')} ({collection.totalProducts || 0})
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {t('discoverCompleteCollection', {
              title: getTranslatedField(collection, 'title'),
              season: collection.season ? t(collection.season as any) : '',
              year: collection.year || ''
            })}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">{t('filterProducts')}</h3>
          <form className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">{t('category')}</label>
              <select
                name="category"
                defaultValue={resolvedSearchParams.category || ''}
                className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-zinc-700 text-black dark:text-white"
              >
                <option value="">{t('allCategories')}</option>
                {/* Add category options dynamically if needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">{t('minPrice')}</label>
              <input
                type="number"
                name="minPrice"
                defaultValue={resolvedSearchParams.minPrice || ''}
                placeholder="0"
                className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white w-24 bg-white dark:bg-zinc-700 text-black dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">{t('maxPrice')}</label>
              <input
                type="number"
                name="maxPrice"
                defaultValue={resolvedSearchParams.maxPrice || ''}
                placeholder="1000"
                className="px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white w-24 bg-white dark:bg-zinc-700 text-black dark:text-white"
              />
            </div>
            <Button type="submit" variant="outline" className="border-zinc-300 dark:border-zinc-600 text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700">{t('applyFilters')}</Button>
            {(resolvedSearchParams.category || resolvedSearchParams.minPrice || resolvedSearchParams.maxPrice) && (
              <Link href={`/collection/${resolvedParams.slug}`}>
                <Button variant="ghost" className="text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700">{t('clearFilters')}</Button>
              </Link>
            )}
          </form>
        </div>

        {collection.products && collection.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 md:px-12 z-20">
              {collection.products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {collection.totalProducts && collection.totalProducts > limit && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                {page > 1 && (
                  <Link href={`/collection/${resolvedParams.slug}?${new URLSearchParams({ ...resolvedSearchParams, page: (page - 1).toString() }).toString()}`}>
                    <Button variant="outline">{t('previousPage')}</Button>
                  </Link>
                )}

                {Array.from({ length: Math.ceil(collection.totalProducts / limit) }, (_, i) => i + 1)
                  .filter(p => p >= Math.max(1, page - 2) && p <= Math.min(Math.ceil(collection.totalProducts / limit), page + 2))
                  .map(p => (
                    <Link key={p} href={`/collection/${resolvedParams.slug}?${new URLSearchParams({ ...resolvedSearchParams, page: p.toString() }).toString()}`}>
                      <Button variant={p === page ? "default" : "outline"}>{p}</Button>
                    </Link>
                  ))}

                {page < Math.ceil(collection.totalProducts / limit) && (
                  <Link href={`/collection/${resolvedParams.slug}?${new URLSearchParams({ ...resolvedSearchParams, page: (page + 1).toString() }).toString()}`}>
                    <Button variant="outline">{t('nextPage')}</Button>
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">{t('noProductsInCollection')}</p>
            <Link href="/products">
              <Button className="mt-4">{t('browseAllProducts')}</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
