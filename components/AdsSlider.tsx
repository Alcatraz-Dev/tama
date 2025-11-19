"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAds } from "@/lib/useQuery";
import { useTranslation } from "@/lib/translationContext";
import { TranslationKey } from "@/lib/translations";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

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

function AdsSlider() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData: Ad[] = await getAds();
        // Filter only banner ads for the home page slider
        const bannerAds = adsData.filter(ad => ad.position === 'banner' && ad.active);
        setAds(bannerAds);
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
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-3xl overflow-hidden shadow-2xl mx-5 mt-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black dark:border-white"></div>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return null; // Don't show anything if no banner ads
  }

  return (
    <div className="relative">
      {/* Main Slider */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl px-5 mt-8">
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
              <div className={`absolute inset-0 bg-gradient-to-t from-yellow-500/30 via-yellow-500/10 to-transparent`}></div>

              {/* Content based on position */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6">
                  {/* Position indicator */}
                  <div className="inline-block bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-4">
                    {t(`${ad.position}Ad` as TranslationKey) || `${ad.position} Ad`}
                  </div>

                  <h2 className="font-bold mb-4 drop-shadow-2xl text-4xl md:text-6xl lg:text-7xl">
                    {getLocalizedText(ad, 'title')}
                  </h2>
                  {getLocalizedText(ad, 'description') && (
                    <p className="mb-8 drop-shadow-xl text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
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
                      className="absolute bottom-4 right-4 mx-4 inline-block font-bold transition-all duration-300 shadow-lg hover:scale-105 bg-gradient-to-r from-white to-gray-100 text-black px-4 py-2 rounded-full text-sm hover:from-gray-100 hover:to-white"
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
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Auto-play Control */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-12 right-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
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
  );
}

export default AdsSlider;