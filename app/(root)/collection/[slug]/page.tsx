import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCollectionBySlug } from "@/lib/useQuery";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palette, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams.page || '1');
  const limit = 12;
  const offset = (page - 1) * limit;

  const filters = {
    category: resolvedSearchParams.category,
    minPrice: resolvedSearchParams.minPrice ? parseFloat(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? parseFloat(resolvedSearchParams.maxPrice) : undefined,
  };

  const collection = await getCollectionBySlug(resolvedParams.slug, limit, offset, filters);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Collection Not Found</h1>
          <Link href="/collections">
            <Button>Back to Collections</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
              {collection.title}
            </h1>
            {collection.description && (
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                {collection.description}
              </p>
            )}

            {/* Collection Metadata */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {collection.season && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {collection.season.charAt(0).toUpperCase() + collection.season.slice(1)}
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
                  {collection.theme}
                </Badge>
              )}
            </div>

            {collection.stylingTips && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold mb-2">Styling Tips</h3>
                <p className="text-sm leading-relaxed">{collection.stylingTips}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            Collection Pieces ({collection.totalProducts || 0})
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Discover the complete {collection.title} collection. Each piece is carefully curated to reflect our vision for {collection.season} {collection.year}.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Filter Products</h3>
          <form className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">Category</label>
              <select
                name="category"
                defaultValue={resolvedSearchParams.category || ''}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-700 text-black dark:text-white"
              >
                <option value="">All Categories</option>
                {/* Add category options dynamically if needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">Min Price</label>
              <input
                type="number"
                name="minPrice"
                defaultValue={resolvedSearchParams.minPrice || ''}
                placeholder="0"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white w-24 bg-white dark:bg-gray-700 text-black dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-black dark:text-white">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                defaultValue={resolvedSearchParams.maxPrice || ''}
                placeholder="1000"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white w-24 bg-white dark:bg-gray-700 text-black dark:text-white"
              />
            </div>
            <Button type="submit" variant="outline" className="border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Apply Filters</Button>
            {(resolvedSearchParams.category || resolvedSearchParams.minPrice || resolvedSearchParams.maxPrice) && (
              <Link href={`/collection/${resolvedParams.slug}`}>
                <Button variant="ghost" className="text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Clear Filters</Button>
              </Link>
            )}
          </form>
        </div>

        {collection.products && collection.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {collection.products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {collection.totalProducts > limit && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                {page > 1 && (
                  <Link href={`/collection/${resolvedParams.slug}?${new URLSearchParams({ ...resolvedSearchParams, page: (page - 1).toString() }).toString()}`}>
                    <Button variant="outline">Previous</Button>
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
                    <Button variant="outline">Next</Button>
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No products in this collection yet.</p>
            <Link href="/products">
              <Button className="mt-4">Browse All Products</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CollectionPageProps) {
  const resolvedParams = await params;
  const collection = await getCollectionBySlug(resolvedParams.slug);

  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }

  return {
    title: `${collection.title} Collection | Tama Shop`,
    description: collection.description || `Explore the ${collection.title} collection featuring ${collection.products?.length || 0} pieces.`,
    openGraph: {
      title: `${collection.title} Collection`,
      description: collection.description,
      images: collection.imageUrl ? [collection.imageUrl] : [],
    },
  };
}