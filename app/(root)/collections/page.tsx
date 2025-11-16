import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/useQuery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palette, Sparkles, ArrowRight } from "lucide-react";
import { Collection } from "@/lib/types";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
            Our Collections
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collections, each telling a unique story through fashion.
            From seasonal trends to timeless pieces, find your perfect style.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {collections && collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection: Collection) => (
              <div
                key={collection._id}
                className="group relative bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Collection Image */}
                <div className="relative h-64 overflow-hidden">
                  {collection.imageUrl ? (
                    <Image
                      src={collection.imageUrl}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                      <Palette className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Collection Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                    {collection.title}
                  </h3>

                  {collection.description && (
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                  )}

                  {/* Collection Metadata */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collection.season && (
                      <Badge variant="secondary" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {collection.season.charAt(0).toUpperCase() + collection.season.slice(1)}
                      </Badge>
                    )}
                    {collection.year && (
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {collection.year}
                      </Badge>
                    )}
                    {collection.theme && (
                      <Badge variant="secondary" className="text-xs">
                        <Palette className="w-3 h-3 mr-1" />
                        {collection.theme}
                      </Badge>
                    )}
                  </div>

                  {/* Product Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {collection.products?.length || 0} pieces
                    </span>

                    <Link href={`/collection/${collection.slug?.current}`}>
                      <div className="flex gap-2">
                        <button className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:bg-black/90 dark:hover:bg-zinc-200 transition-all duration-300 hover:cursor-pointer font-semibold text-sm">
                          Explore
                        </button>
                        <button className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-3 py-2 rounded-full hover:bg-black/90 transition-all duration-300 -rotate-45 hover:rotate-0 hover:cursor-pointer">
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Palette className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              No Collections Available
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mb-6">
              We're working on bringing you amazing collections. Check back soon!
            </p>
            <Link href="/products">
              <button className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:bg-black/90 dark:hover:bg-zinc-200 transition-all duration-300 hover:cursor-pointer font-semibold text-sm">
                Browse All Products
              </button>
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
    title: "Collections | Tama Shop",
    description: "Explore our curated fashion collections. From seasonal trends to timeless pieces, discover your perfect style with Tama Shop.",
    openGraph: {
      title: "Collections | Tama Shop",
      description: "Explore our curated fashion collections",
    },
  };
}