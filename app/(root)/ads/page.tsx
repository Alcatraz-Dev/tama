"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAds } from "@/lib/useQuery";
import { useTranslation } from "@/lib/translationContext";
import { TranslationKey } from "@/lib/translations";
import { ChevronLeft, ChevronRight, Play, Pause, Grid3X3, ArrowLeft, Monitor, Sidebar, Footprints, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedBanner from "@/components/AnimatedBanner";
import CountdownTimer from "@/components/CountdownTimer";

interface Ad {
  _id: string;
  title: string;
  title_fr: string;
  title_ar: string;
  description: string;
  description_fr: string;
  description_ar: string;
  media: Array<{
    _type: string;
    _key: string;
    asset: any;
  }>;
  product?: {
    _id: string;
    slug: {
      current: string;
    };
  };
  active: boolean;
  startDate?: string;
  endDate?: string;
  order: number;
  position: string;
}

function Ads() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData = await getAds();
        setAds(adsData);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || ads.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, ads.length]);

  const getLocalizedText = (ad: Ad, field: 'title' | 'description') => {
    const langSuffix = language === 'fr' ? '_fr' : language === 'ar' ? '_ar' : '';
    const value = ad[`${field}${langSuffix}` as keyof Ad] || ad[field];
    return String(value);
  };

  const getVideoUrl = (media: Ad['media'][0]) => {
    if (!media?.asset?.url) return null;
    return media.asset.url;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background" dir={language === "ar" ? "rtl" : "ltr"}>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black dark:border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative py-5 px-6 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/products">
              <Button variant="outline" size="sm" className="border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToProducts')}
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Grid3X3 className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
              <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white">
                {t('adsTitle') || 'Our Ads'}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t('adsDescription') || 'Discover our latest promotional offers and special deals.'}
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                onClick={() => setViewMode('slider')}
                variant={viewMode === 'slider' ? 'default' : 'outline'}
                className="px-6 py-2"
              >
                {t('sliderView') || 'Slider View'}
              </Button>
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                className="px-6 py-2"
              >
                {t('gridView') || 'Grid View'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ads Content */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {ads.length === 0 ? (
          <div className="text-center py-16">
            <Grid3X3 className="w-16 h-16 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
              {t('noAdsAvailable') || 'No ads available at the moment.'}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mb-6">
              {t('checkBackSoon') || 'Check back soon for exciting offers and promotions.'}
            </p>
            <Link href="/products">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200">
                {t('browseAllProducts')}
              </Button>
            </Link>
          </div>
        ) : viewMode === 'slider' ? (
          <AnimatedBanner>
            <div className="relative">
              {/* Main Slider */}
              <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                {ads.map((ad, index) => {
                  const media = ad.media?.[0];
                  const videoUrl = media?._type === 'file' ? getVideoUrl(media) : null;
                  const imageUrl = media?._type === 'image' && media.asset ? media.asset.url : null;

                  return (
                    <div
                      key={ad._id}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {videoUrl ? (
                        <video
                          src={videoUrl}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={getLocalizedText(ad, 'title')}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      ) : null}

                      {/* Dynamic Overlay based on position */}
                      <div className={`absolute inset-0 ${
                        ad.position === 'banner' ? 'bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent' :
                        ad.position === 'sidebar' ? 'bg-gradient-to-r from-black/50 to-transparent' :
                        ad.position === 'footer' ? 'bg-gradient-to-b from-transparent to-black/50' :
                        'bg-black/40'
                      }`}></div>

                      {/* Content based on position */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`text-center text-white max-w-4xl px-6 ${
                          ad.position === 'banner' ? 'text-center' :
                          ad.position === 'sidebar' ? 'text-left max-w-md' :
                          ad.position === 'footer' ? 'text-center max-w-2xl' :
                          'text-center max-w-3xl'
                        }`}>
                          {/* Position indicator */}
                          <div className="inline-block bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                            {t(`${ad.position}Ad` as TranslationKey) || `${ad.position} Ad`}
                          </div>

                          <h2 className={`font-bold mb-4 drop-shadow-2xl ${
                            ad.position === 'banner' ? 'text-4xl md:text-6xl lg:text-7xl' :
                            ad.position === 'sidebar' ? 'text-3xl md:text-4xl' :
                            ad.position === 'footer' ? 'text-2xl md:text-3xl' :
                            'text-3xl md:text-5xl lg:text-6xl'
                          }`}>
                            {getLocalizedText(ad, 'title')}
                          </h2>
                          {getLocalizedText(ad, 'description') && (
                            <p className={`mb-8 drop-shadow-xl ${
                              ad.position === 'banner' ? 'text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto' :
                              ad.position === 'sidebar' ? 'text-base md:text-lg max-w-sm' :
                              ad.position === 'footer' ? 'text-sm md:text-base max-w-xl mx-auto' :
                              'text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto'
                            }`}>
                              {getLocalizedText(ad, 'description')}
                            </p>
                          )}

                          {/* Countdown Timer */}
                          {ad.endDate && (
                            <div className="absolute bottom-4 left-4">
                              <CountdownTimer endDate={ad.endDate} />
                            </div>
                          )}

                          {/* Position-specific CTA styling */}
                          {ad.product?.slug?.current && ad.active && (
                            <Link
                              href={`/product/${ad.product.slug.current}`}
                              className={`absolute bottom-4 right-4 inline-block font-bold transition-all duration-300 shadow-lg hover:scale-105 ${
                                ad.position === 'banner'
                                  ? 'bg-gradient-to-r from-white to-gray-100 text-black px-4 py-2 rounded-full text-sm hover:from-gray-100 hover:to-white'
                                  : ad.position === 'sidebar'
                                  ? 'bg-white text-black px-3 py-2 rounded-full text-xs hover:bg-gray-100'
                                  : ad.position === 'footer'
                                  ? 'bg-white text-black px-4 py-2 rounded-full text-xs hover:bg-gray-100'
                                  : 'bg-white text-black px-4 py-2 rounded-full text-xs hover:bg-gray-200'
                              }`}
                            >
                              {t('learnMore') || 'Learn More'} →
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Inactive Overlay */}
                      {!ad.active && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-white text-2xl font-bold mb-2">
                              {t('inactive') || 'Inactive'}
                            </div>
                            <div className="text-white/80 text-sm">
                              {t('adCurrentlyInactive') || 'This ad is currently not active'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              {ads.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Auto-play Control */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
                  >
                    {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {ads.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {ads.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </AnimatedBanner>
        ) : (
          /* Dynamic Grid View Based on Position */
          <div className="space-y-12">
            {/* Group ads by position */}
            {['banner', 'sidebar', 'footer', 'popup'].map((position) => {
              const positionAds = ads.filter(ad => ad.position === position);
              if (positionAds.length === 0) return null;

              return (
                <div key={position} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {position === 'banner' && <Monitor className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />}
                      {position === 'sidebar' && <Sidebar className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />}
                      {position === 'footer' && <Footprints className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />}
                      {position === 'popup' && <Maximize className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />}
                      <h2 className="text-2xl font-bold text-black dark:text-white">
                        {t(`${position}Ads` as TranslationKey) || `${position} Ads`}
                      </h2>
                    </div>
                    <div className="h-px bg-gradient-to-r from-zinc-300 dark:from-zinc-600 to-transparent flex-1"></div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                      {positionAds.length} {positionAds.length === 1 ? t('ad') || 'ad' : t('ads') || 'ads'}
                    </span>
                  </div>

                  <div className={`grid gap-8 ${
                    position === 'banner'
                      ? 'grid-cols-1'
                      : position === 'sidebar'
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      : position === 'footer'
                      ? 'grid-cols-1 lg:grid-cols-2'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {positionAds.map((ad) => {
                      const media = ad.media?.[0];
                      const videoUrl = media?._type === 'file' ? getVideoUrl(media) : null;
                      const imageUrl = media?._type === 'image' && media.asset ? media.asset.url : null;

                      // Different card styles based on position
                      const getCardClasses = () => {
                        switch (position) {
                          case 'banner':
                            return 'bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] overflow-hidden';
                          case 'sidebar':
                            return 'bg-white dark:bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden';
                          case 'footer':
                            return 'bg-white dark:bg-zinc-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex';
                          case 'popup':
                            return 'bg-white dark:bg-zinc-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden relative';
                          default:
                            return 'bg-white dark:bg-zinc-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden';
                        }
                      };

                      const getMediaClasses = () => {
                        switch (position) {
                          case 'banner':
                            return 'relative w-full h-80 md:h-96 overflow-hidden';
                          case 'sidebar':
                            return 'relative w-full aspect-[4/5] overflow-hidden';
                          case 'footer':
                            return 'relative w-48 h-32 flex-shrink-0 overflow-hidden rounded-l-xl';
                          case 'popup':
                            return 'relative w-full aspect-video overflow-hidden';
                          default:
                            return 'relative w-full aspect-square overflow-hidden';
                        }
                      };

                      return (
                        <div
                          key={ad._id}
                          className={`group ${getCardClasses()}`}
                        >
                          <div className={`relative ${getMediaClasses()}`}>
                            {videoUrl ? (
                              <video
                                src={videoUrl}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              />
                            ) : imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={getLocalizedText(ad, 'title')}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                priority
                              />
                            ) : null}

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                            {/* Position Badge */}
                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                              {t(position as TranslationKey) || position}
                            </div>

                            {/* Media Type Indicator */}
                            {videoUrl && (
                              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                                <Play className={`w-3 h-3 inline ${language === 'ar' ? 'ml-1 scale-x-[-1] ' : 'mr-1'}`} />
                                {t('video') || 'Video'}
                              </div>
                            )}

                            {/* Countdown Timer */}
                            {ad.endDate && (
                              <div className="absolute bottom-4 left-4">
                                <CountdownTimer endDate={ad.endDate} />
                              </div>
                            )}

                            {/* Button Overlay */}
                            {ad.product?.slug?.current && ad.active && (
                              <div className="absolute bottom-4 right-4">
                                <Link
                                  href={`/product/${ad.product.slug.current}`}
                                  className={`inline-block font-bold transition-all duration-300 shadow-lg hover:scale-105 ${
                                    position === 'banner'
                                      ? 'bg-gradient-to-r from-white to-gray-100 text-black px-4 py-2 rounded-full text-sm hover:from-gray-100 hover:to-white'
                                      : position === 'sidebar'
                                      ? 'bg-white text-black px-3 py-2 rounded-full text-xs hover:bg-gray-100'
                                      : position === 'footer'
                                      ? 'bg-white text-black px-4 py-2 rounded-full text-xs hover:bg-gray-100'
                                      : 'bg-white text-black px-4 py-2 rounded-full text-xs hover:bg-gray-200'
                                  }`}
                                >
                                  {t('learnMore') || 'Learn More'} →
                                </Link>
                              </div>
                            )}

                            {/* Inactive Overlay */}
                            {!ad.active && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                <div className="text-center">
                                  <div className="text-white text-lg font-bold mb-1">
                                    {t('inactive') || 'Inactive'}
                                  </div>
                                  <div className="text-white/80 text-xs">
                                    {t('comingSoon') || 'Coming Soon'}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Content below media */}
                          <div className="p-6">
                            <h3 className={`font-bold mb-2 text-black dark:text-white transition-colors line-clamp-2 ${
                              position === 'banner' ? 'text-2xl group-hover:text-yellow-600' :
                              position === 'sidebar' ? 'text-xl group-hover:text-green-600' :
                              position === 'footer' ? 'text-lg group-hover:text-purple-600' :
                              'text-lg group-hover:text-orange-600'
                            }`}>
                              {getLocalizedText(ad, 'title')}
                            </h3>
                            {getLocalizedText(ad, 'description') && (
                              <p className={`text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 ${
                                position === 'banner' ? 'text-base' : 'text-sm'
                              }`}>
                                {getLocalizedText(ad, 'description')}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Ads;