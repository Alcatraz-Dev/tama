"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLookbook } from "@/lib/useQuery";
import { Lookbook, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Grid3X3 } from "lucide-react";
import { useTranslation } from "@/lib/translationContext";

export default function LookbooksPage() {
  const { t, language } = useTranslation();
  const [lookbooks, setLookbooks] = React.useState<Lookbook[]>([]);

  const getTranslatedField = (obj: any, field: string) => {
    if (language === 'en') return obj[field];
    return obj[`${field}_${language}`] || obj[field];
  };

  React.useEffect(() => {
    async function fetchLookbooks() {
      try {
        const data = await getLookbook();
        setLookbooks(data || []);
      } catch (error) {
        console.error("Error fetching lookbooks:", error);
        setLookbooks([]);
      }
    }
    fetchLookbooks();
  }, []);

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-5 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
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

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Grid3X3 className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
                {t("tamaStories")}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t('discoverTamaStories')}
            </p>

            {lookbooks.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <Badge
                  variant="secondary"
                  className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2"
                >
                  {lookbooks.length} {t("tamaStories")}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2"
                >
                  {lookbooks.reduce(
                    (total, lookbook) =>
                      total + (lookbook.products?.length || 0),
                    0
                  )}{" "}
                  {t("products")}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Style Stories Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {lookbooks && lookbooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {lookbooks
              .filter((lookbook) => lookbook.products)
              .map((lookbook: Lookbook) => (
                <Link
                  key={lookbook._id}
                  href={`/style-stories/${lookbook.slug}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden">
                    {/* Main Image */}
                    {lookbook.images?.[0]?.asset?.url ? (
                      <div className="relative w-full aspect-square overflow-hidden">
                        <Image
                          src={lookbook.images[0].asset.url}
                          alt={lookbook.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Season/Year badges overlay */}
                        {(lookbook.season || lookbook.year) && (
                          <div className="absolute top-3 left-3 flex gap-2">
                            {lookbook.season && (
                              <Badge variant="secondary" className="bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 text-xs">
                                {t(lookbook.season as any)}
                              </Badge>
                            )}
                            {lookbook.year && (
                              <Badge variant="secondary" className="bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 text-xs">
                                {lookbook.year}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                        <div className="text-zinc-500 dark:text-zinc-400 text-center">
                          <Grid3X3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">{t('tamaStory')}</p>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2 text-black dark:text-white group-hover:text-fashion-gold transition-colors">
                        {getTranslatedField(lookbook, 'title')}
                      </h2>

                      {lookbook.theme && (
                        <Badge variant="outline" className="mb-3 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-xs">
                          {t(lookbook.theme as any)}
                        </Badge>
                      )}

                      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
                        {getTranslatedField(lookbook, 'description')}
                      </p>

                      {getTranslatedField(lookbook, 'stylingTips') && (
                        <div className="mb-4 p-3 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg">
                          <p className="text-zinc-700 dark:text-zinc-300 text-xs line-clamp-2 italic">
                            💡 {getTranslatedField(lookbook, 'stylingTips')}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300"
                        >
                          {lookbook.products?.length || 0} {t("items")}
                        </Badge>

                        <div className="text-fashion-gold font-semibold text-sm">
                          {t('viewStory')}
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
              {t('noTamaStoriesAvailable')}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mb-6">
              {t('workingOnTamaStories')}
            </p>
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
                {t("browseAllProducts")}
              </Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
