"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { getLookbookBySlug } from "@/lib/useQuery";
import ProductCard from "@/components/ProductCard";
import LookbookGallery from "@/components/LookbookGallery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Palette, Sparkles, ShoppingBag, ArrowLeft } from "lucide-react";
import { Product, Lookbook } from "@/lib/types";
import { useTranslation } from "@/lib/translationContext";

export default function LookbookPage() {
  const params = useParams();
  const [lookbook, setLookbook] = useState<Lookbook | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  useEffect(() => {
    const fetchLookbook = async () => {
      if (params.slug) {
        try {
          const data = await getLookbookBySlug(params.slug as string);
          setLookbook(data);
        } catch (error) {
          console.error("Error fetching lookbook:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLookbook();
  }, [params.slug]);

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

  if (!lookbook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('lookbookNotFound')}</h1>
          <Link href="/style-stories">
            <Button>Back to Style Stories</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-5 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/style-stories">
              <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToStyleStories')}
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Palette className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
                {lookbook.title}
              </h1>
            </div>

            {/* Theme badge */}
            {lookbook.theme && (
              <Badge variant="secondary" className="mb-4 bg-fashion-gold/10 text-fashion-gold border-fashion-gold/20 px-4 py-2">
                {lookbook.theme}
              </Badge>
            )}

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-6">
              {lookbook.description || t('discoverProductsInStyleStory', { title: lookbook.title })}
            </p>

            {/* Metadata badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                {lookbook.products?.length || 0} {t('products')}
              </Badge>
              {lookbook.season && (
                <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                  {lookbook.season.charAt(0).toUpperCase() + lookbook.season.slice(1)}
                </Badge>
              )}
              {lookbook.year && (
                <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                  {lookbook.year}
                </Badge>
              )}
            </div>

            {/* Styling tips preview */}
            {lookbook.stylingTips && (
              <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 max-w-2xl mx-auto shadow-sm border">
                <h3 className="text-lg font-semibold mb-3 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                  {t('stylingTips')}
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{lookbook.stylingTips}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 md:py-12 ">
        {lookbook.products && lookbook.products.length > 0 ? (
          <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-10 z-20 px-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {lookbook.products.map((product: Product) => (
              <motion.div key={product._id} variants={itemVariants}  >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              {t('noProductsInStyleStory')}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mb-6">
              {t('styleStoryNoProductsYet')}
            </p>
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
                {t('browseAllProducts')}
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Image Gallery (if available) */}
      {lookbook.images && lookbook.images.length > 0 && (
        <section className="py-16 px-6 ">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('theLook')}</h2>
            <LookbookGallery images={lookbook.images} title={lookbook.title} />
          </div>
        </section>
      )}

    </div>
  );
}

