"use client";

"use client";

import React, { useState, useEffect, useRef, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/useQuery";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronRight, Home, Images, Play, Pause } from "lucide-react";
import { useTranslation } from "@/lib/translationContext";

export default function GalleryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [columns, setColumns] = useState(2);
  const [currentMainImage, setCurrentMainImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateColumns = () => setColumns(window.innerWidth >= 768 ? 4 : 2);
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Collect all images from all products
  const allImages = useMemo(() => products.flatMap((product: any) =>
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
  ), [products]);

  useEffect(() => {
    if (allImages.length > 0 && !currentMainImage) {
      setCurrentMainImage(allImages[0]);
    }
  }, [allImages, currentMainImage]);

  // Auto-scroll functionality for main image
  useEffect(() => {
    if (isAutoScrolling && allImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % allImages.length;
          setCurrentMainImage(allImages[next]);
          return next;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoScrolling, allImages]);


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
      <section className="py-16 px-6 max-w-7xl mx-auto bg-gradient-to-b from-transparent via-zinc-50/30 to-transparent dark:from-transparent dark:via-zinc-900/30 dark:to-transparent">
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
        ) : (
          // Gallery featured view with optional auto-scroll on bottom
          <div className="gallery-featured">
            <div className="mb-4 flex justify-center">
              <div className="relative group">
                <img
                  src={currentMainImage?.asset.url}
                  alt={currentMainImage?.productTitle}
                  className="w-full max-w-2xl h-auto rounded-2xl cursor-pointer hover:scale-105 transition-transform"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-2xl" />
                {/* Product Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm rounded-b-2xl">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {currentMainImage?.productTitle}
                  </h3>
                  <Link href={`/product/${currentMainImage?.productSlug}`}>
                    <Button className="bg-white text-black hover:bg-zinc-200">
                      {t('viewProduct')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bottom-gallery">
              <div className="thumbnail-scroll">
                {allImages.map((image, i) => (
                  <img
                    key={i}
                    src={image?.asset.url}
                    alt={image?.productTitle}
                    className={`flex-shrink-0 w-32 h-32 object-cover rounded-2xl cursor-pointer transition-all ${i === currentIndex ? 'ring-2 ring-fashion-gold scale-110' : ''}`}
                    onClick={() => {
                      setCurrentMainImage(image);
                      setCurrentIndex(i);
                    }}
                  />
                ))}
              </div>
            </div>
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
        .gallery-featured {
          animation: fadeInUp 0.6s ease-out;
        }

        .thumbnail-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-scrollbar {
            display: none;
          }
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
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Auto-scroll animation */
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
