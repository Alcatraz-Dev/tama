"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowLeft, Home, ChevronRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { useTranslation } from "@/lib/translationContext";

export default function WishlistPage() {
  const { wishlistItems, clearWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fashion-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-zinc-300 dark:border-zinc-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="flex items-center hover:text-fashion-dark transition-colors duration-200 p-1 rounded">
              <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">{t('home')}</span>
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-zinc-400" />
            <span className="text-fashion-dark font-medium">{t('myWishlist')}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-5 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/products">
              <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('continueShopping')}
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
                {t('myWishlist')}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t('wishlistDescription')}
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? t('item') : t('items')}
              </Badge>
              {wishlistItems.length > 0 && (
                <Button
                  onClick={() => {
                    clearWishlist();
                    toast.success(t('wishlistCleared'));
                  }}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  {t('clearAll')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              {t('wishlistEmpty')}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-500 mb-8">
              {t('startAddingItems')}
            </p>
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t('browseProducts')}
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black dark:text-white">
                    {t('savedItems')}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {t('curatedSelection')}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 md:px-12 z-20">
              {wishlistItems.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}