"use client";

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/useQuery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Home, Images, Play, Pause } from "lucide-react";
import { useTranslation } from "@/lib/translationContext";

export default function GalleryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Collect all images from all products
  const allImages = products.flatMap((product: any) =>
    product.gallery
      .filter((item: any) => item._type === "image")
      .map((item: any) => {
        const slug = product.slug?.current || product.slug || `product-${product._id}`;
        return {
          ...item,
          productTitle: product.title,
          productSlug: slug,
          productId: product._id,
        };
      })
  );

  // Auto-scroll functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScrolling && allImages.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 3000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, allImages.length]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  return (
    <div className="min-h-screen" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Breadcrumb Navigation */}
   

      {/* Hero Section */}
      <section className="relative py-5 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/products">
              <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('browseProducts')}
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Images className="w-8 h-8 text-fashion-gold" />
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
                {t('productGallery')}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
              {t('galleryDescription')}
            </p>

            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                {allImages.length} {t('imagesLabel')}
              </Badge>
              <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 px-4 py-2">
                {products.length} {t('productsLabel')}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black dark:text-white">
                {t('allProductImages')}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {t('browseVisualCollection')}
              </p>
            </div>

            {/* Auto-scroll Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                onClick={toggleAutoScroll}
              >
                {isAutoScrolling ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    {t('stopAutoScroll')}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    {t('autoScroll')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {allImages.length === 0 ? (
          <div className="text-center py-16">
            <Images className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              {t('noImagesAvailable')}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mb-6">
              {t('workingOnImages')}
            </p>
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
                {t('browseProductsGallery')}
              </Button>
            </Link>
          </div>
        ) : isAutoScrolling ? (
          // Auto-scroll carousel view
          <div className="relative overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {allImages.map((image: any, index: number) => (
                <div
                  key={`${image.productId}-${index}`}
                  className="flex-shrink-0 w-full aspect-[16/9] relative"
                >
                  <Link href={`/product/${encodeURIComponent(image.productSlug)}`}>
                    <Image
                      src={image.asset.url}
                      alt={image.productTitle}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Product Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                      <h3 className="text-white text-xl font-bold mb-2">
                        {image.productTitle}
                      </h3>
                      <div className="flex items-center text-white/90">
                        <span>{t('viewProduct')}</span>
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {allImages.slice(0, 10).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          // Regular grid view
          <div className="gallery-grid">
            {allImages.map((image: any, index: number) => (
              <div
                key={`${image.productId}-${index}`}
                className="gallery-item group relative aspect-square overflow-hidden rounded-lg bg-muted shadow-md hover:shadow-xl transition-all duration-500 hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Link href={`/product/${encodeURIComponent(image.productSlug)}`}>
                  <Image
                    src={image.asset.url}
                    alt={image.productTitle}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                  {/* Product Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <p className="text-white text-sm font-medium truncate mb-1">
                      {image.productTitle}
                    </p>
                    <div className="flex items-center text-xs text-white/80">
                      <span>{t('viewProduct')}</span>
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-lg transition-all duration-300" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-muted rounded-lg px-6 py-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{allImages.length}</p>
              <p className="text-sm text-muted-foreground">{t('imagesLabel')}</p>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
              <p className="text-sm text-muted-foreground">{t('productsLabel')}</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          animation: fadeInUp 0.6s ease-out;
        }

        .gallery-item {
          animation: fadeInScale 0.6s ease-out both;
        }

        .gallery-item:nth-child(odd) {
          animation-delay: 0.1s;
        }

        .gallery-item:nth-child(even) {
          animation-delay: 0.2s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Auto-scroll animation */
        .gallery-grid.auto-scroll .gallery-item {
          animation: autoScroll 30s linear infinite;
        }

        @keyframes autoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
