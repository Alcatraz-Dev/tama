"use client";

import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Clock,
  Gift,
  Star,
  Trophy,
  Truck,
  Tag,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/translationContext";
import { useCartStore } from "@/store/cart";
import { CartItem } from "@/store/cart";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./ui/button";

interface SpecialEventFeature {
  featureType: string;
  featureTitle: string;
  featureTitle_fr?: string;
  featureTitle_ar?: string;
  featureDescription?: string;
  featureDescription_fr?: string;
  featureDescription_ar?: string;
  featureValue?: string;
  featureIcon: string;
  isPrimary: boolean;
}

interface SpecialEvent {
  _id: string;
  eventName: string;
  eventName_fr?: string;
  eventName_ar?: string;
  eventType: string;
  headline: string;
  headline_fr?: string;
  headline_ar?: string;
  description?: string;
  description_fr?: string;
  description_ar?: string;
  startDate: string;
  endDate: string;
  eventFeatures?: SpecialEventFeature[];
  themeColors: {
    primaryColor: string | { hex: string };
    secondaryColor: string | { hex: string };
    backgroundColor: string | { hex: string };
  };
  discountProducts?: Array<{
    product: {
      _id: string;
      title: string;
      price: number;
      gallery?: Array<{
        asset: {
          url: string;
        };
      }>;
      slug: {
        current: string;
      };
    };
    discountType: string;
    discountValue: number;
    maxDiscountAmount?: number;
    customImage?: {
      asset: {
        url: string;
      };
    };
  }>;
  // Additional fields from schema
  eventTemplate?: string;
  themePreset?: string;
  featuresTemplate?: string;
  advancedSettings?: {
    popupDelay?: number;
    scrollTrigger?: number;
    maxDisplays?: number;
    priority?: number;
    mainImage?: {
      asset: {
        url: string;
      };
    };
    backgroundPattern?: string;
  };
  metadata?: {
    tags?: string[];
    internalNotes?: string;
  };
  eventId?: string;
  trackingCode?: string;
}

interface SpecialEventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  event: SpecialEvent | null;
}

export default function SpecialEventPopup({
  isOpen,
  onClose,
  event,
}: SpecialEventPopupProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { language, t } = useTranslation();
  const { addToCart } = useCartStore();

  // Helper function to extract color value from color input
  const getColorValue = (
    color: string | { hex: string } | undefined
  ): string => {
    if (typeof color === "string") return color;
    if (color && typeof color === "object" && color.hex) return color.hex;
    return "#DC2626"; // default
  };

  // Countdown timer effect
  useEffect(() => {
    if (!event || !isOpen) {
      // console.log('SpecialEventPopup: Timer effect - no event or not open');
      return;
    }

    // console.log('SpecialEventPopup: Setting up countdown timer for event:', event.eventName);
    // console.log('SpecialEventPopup: Event endDate:', event.endDate);

    const now = new Date();
    const endDate = new Date(event.endDate);
    const remainingMs = Math.max(0, endDate.getTime() - now.getTime());
    const remainingSeconds = Math.floor(remainingMs / 1000);

    // console.log('SpecialEventPopup: Now:', now.toISOString());
    // console.log('SpecialEventPopup: End date:', endDate.toISOString());
    // console.log('SpecialEventPopup: Remaining seconds:', remainingSeconds);

    setTimeRemaining(remainingSeconds);

    if (remainingSeconds > 0) {
      // console.log('SpecialEventPopup: Starting countdown interval');
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          console.log("SpecialEventPopup: Timer tick, remaining:", prev);
          if (prev <= 1) {
            console.log(
              "SpecialEventPopup: Timer reached zero, clearing interval"
            );
            clearInterval(interval);
            // Auto-expire the event when timer reaches 0
            if (event?._id) {
              console.log("SpecialEventPopup: Auto-expiring event:", event._id);
              fetch("/api/special-events", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  action: "expire",
                  eventId: event._id,
                }),
              })
                .then((response) => {
                  // console.log('SpecialEventPopup: Expiry API response:', response.status);
                  return response.json();
                })
                .then((data) => {
                  // console.log('SpecialEventPopup: Expiry API result:', data);
                  // Force re-check of active events after successful expiry
                  if (data.success) {
                    // console.log('SpecialEventPopup: Event expired successfully, triggering re-check');
                    // This will cause the hooks to re-check on next interval
                  }
                })
                .catch((error) => {
                  console.error("Failed to expire special event:", error);
                });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        // console.log('SpecialEventPopup: Cleanup - clearing timer interval');
        clearInterval(interval);
      };
    } else {
      console.log("SpecialEventPopup: No time remaining, timer not started");
    }
  }, [event, isOpen]);

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return "00 : 00 : 00 : 00";

    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days.toString().padStart(2, "0")} : ${hours.toString().padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "tag":
        return <Tag className="w-5 h-5" />;
      case "gift":
        return <Gift className="w-5 h-5" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "truck":
        return <Truck className="w-5 h-5" />;
      case "trophy":
        return <Trophy className="w-5 h-5" />;
      case "star":
        return <Star className="w-5 h-5" />;
      case "fire":
        return <Zap className="w-5 h-5" />;
      case "clock":
        return <Clock className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const addProductWithDiscount = (discountProduct: any) => {
    const product = discountProduct.product;
    if (!product) return;

    let discountedPrice = product.price;
    let discountPercentage = 0;

    if (discountProduct.discountType === "percentage") {
      const discountAmount =
        (product.price * discountProduct.discountValue) / 100;
      const maxDiscount = discountProduct.maxDiscountAmount || discountAmount;
      discountedPrice = product.price - Math.min(discountAmount, maxDiscount);
      discountPercentage = discountProduct.discountValue;
    } else if (discountProduct.discountType === "fixed") {
      discountedPrice = product.price - discountProduct.discountValue;
      discountPercentage = Math.round(
        (discountProduct.discountValue / product.price) * 100
      );
    } else if (discountProduct.discountType === "final_price") {
      discountedPrice = discountProduct.discountValue;
      discountPercentage = Math.round(
        ((product.price - discountProduct.discountValue) / product.price) * 100
      );
    }

    const cartItem: CartItem = {
      _id: product._id,
      title: product.title,
      slug: product.slug?.current || "",
      price: Math.max(0, discountedPrice),
      gallery: discountProduct.customImage
        ? [discountProduct.customImage]
        : product.gallery || [],
      quantity: 1,
      inStock: true,
    };

    addToCart(cartItem);
    // Show success message
    alert(
      `Added ${product.title} to cart with ${discountPercentage}% discount!`
    );
  };

  if (!isOpen || !event) return null;

  // Ensure required fields exist with defaults
  const safeEvent = {
    ...event,
    themeColors: {
      primaryColor: getColorValue(event.themeColors?.primaryColor),
      secondaryColor: getColorValue(event.themeColors?.secondaryColor),
      backgroundColor: getColorValue(event.themeColors?.backgroundColor),
    },
    discountProducts: event.discountProducts || [],
    eventFeatures: event.eventFeatures || [],
    advancedSettings: {
      popupDelay: event.advancedSettings?.popupDelay || 10,
      scrollTrigger: event.advancedSettings?.scrollTrigger || 300,
      maxDisplays: event.advancedSettings?.maxDisplays || 3,
      priority: event.advancedSettings?.priority || 10,
      mainImage: event.advancedSettings?.mainImage,
      backgroundPattern: event.advancedSettings?.backgroundPattern || "none",
    },
    metadata: event.metadata || {},
  };

  // Debug main image data
  console.log(
    "SpecialEventPopup: Main image data:",
    safeEvent.advancedSettings.mainImage
  );
  console.log(
    "SpecialEventPopup: Main image URL:",
    safeEvent.advancedSettings.mainImage?.asset?.url
  );

  const primaryFeatures =
    safeEvent.eventFeatures.filter((f) => f.isPrimary) || [];
  const secondaryFeatures =
    safeEvent.eventFeatures.filter((f) => !f.isPrimary) || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic background with theme colors and pattern */}
        <div
          className="relative bg-gradient-to-br backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${safeEvent.themeColors.backgroundColor}95 0%, ${safeEvent.themeColors.primaryColor}10 100%)`,
          }}
        >
          {/* Background Pattern Layer */}
          {safeEvent.advancedSettings?.backgroundPattern &&
            safeEvent.advancedSettings.backgroundPattern !== "none" && (
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                {(() => {
                  const pattern = safeEvent.advancedSettings.backgroundPattern;
                  const emojis = {
                    snowflakes: ["❄️", "❅", "✼"],
                    hearts: ["❤️", "💖", "💕", "💗"],
                    stars: ["⭐", "✨", "🌟", "💫"],
                    fireworks: ["🎆", "🎇", "✨", "💥"],
                    leaves: ["🍃", "🌿", "🌱", "🍀"],
                    flowers: ["🌸", "🌺", "🌻", "🌷"],
                  };

                  const patternEmojis =
                    emojis[pattern as keyof typeof emojis] || [];
                  if (patternEmojis.length === 0) return null;

                  return Array.from({ length: 12 }, (_, i) => {
                    const emoji = patternEmojis[i % patternEmojis.length];
                    const size = 16 + Math.random() * 12; // 16-28px
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const delay = Math.random() * 3;

                    return (
                      <div
                        key={`${pattern}-${i}`}
                        className="absolute animate-pulse"
                        style={{
                          left: `${left}%`,
                          top: `${top}%`,
                          fontSize: `${size}px`,
                          opacity: 0.3,
                          animationDelay: `${delay}s`,
                          animationDuration: "4s",
                        }}
                      >
                        {emoji}
                      </div>
                    );
                  });
                })()}
              </div>
            )}

          {/* Static gradient border */}
          <div
            className="absolute inset-0 rounded-3xl opacity-20"
            style={{
              background: `linear-gradient(45deg, ${safeEvent.themeColors.primaryColor}, ${safeEvent.themeColors.secondaryColor}, ${safeEvent.themeColors.primaryColor})`,
            }}
          ></div>

          <div
            className="absolute inset-[1px] rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${safeEvent.themeColors.backgroundColor}95 0%, ${safeEvent.themeColors.primaryColor}10 100%)`,
            }}
          ></div>

          <div className="relative p-4 sm:p-6 lg:p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 shadow-lg"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Enhanced Hero Section - Main Image at Top */}
            {safeEvent.advancedSettings?.mainImage && (
              <div className="mb-4 sm:mb-6 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10">
                <div className="relative h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 rounded-t-2xl sm:rounded-t-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                  <Image
                    src={urlFor(safeEvent.advancedSettings.mainImage).url()}
                    alt={(() => {
                      switch (language) {
                        case "fr":
                          return safeEvent.eventName_fr || safeEvent.eventName;
                        case "ar":
                          return safeEvent.eventName_ar || safeEvent.eventName;
                        default:
                          return safeEvent.eventName;
                      }
                    })()}
                    fill
                    className="object-cover"
                  />
                  {/* Enhanced gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                    style={{
                      background: `linear-gradient(to top, ${safeEvent.themeColors.backgroundColor}90 0%, ${safeEvent.themeColors.primaryColor}20 50%, transparent 100%)`,
                    }}
                  ></div>

                  {/* Floating promotional text on image */}
                  <div
                    className="absolute bottom-1 left-1 right-1 sm:bottom-2 sm:left-2 sm:right-2 md:bottom-4 md:left-4 md:right-4"
                    dir={language === "ar" ? "rtl" : "ltl"}
                  >
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg sm:rounded-xl p-1 sm:p-2 md:p-4 border border-white/20">
                      <h3 className="text-white text-xs sm:text-xs md:text-sm font-bold mb-0.5 sm:mb-1 drop-shadow-lg uppercase leading-tight">
                        {(() => {
                          switch (language) {
                            case "fr":
                              return (
                                safeEvent.headline_fr || safeEvent.headline
                              ).toUpperCase();
                            case "ar":
                              return (
                                safeEvent.headline_ar || safeEvent.headline
                              ).toUpperCase();
                            default:
                              return safeEvent.headline.toUpperCase();
                          }
                        })()}
                      </h3>
                      <p className="text-white/90 text-xs drop-shadow-md hidden md:block">
                        {(() => {
                          switch (language) {
                            case "fr":
                              return (
                                safeEvent.description_fr?.slice(0, 50) ||
                                safeEvent.description?.slice(0, 50)
                              );
                            case "ar":
                              return (
                                safeEvent.description_ar?.slice(0, 50) ||
                                safeEvent.description?.slice(0, 50)
                              );
                            default:
                              return safeEvent.description?.slice(0, 50);
                          }
                        })()}
                        ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Event Title and Description - Always Show */}
            <div className="text-center mb-4 sm:mb-6">
              <h2
                className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-1 sm:mb-2 leading-tight uppercase"
                style={{
                  backgroundImage: `linear-gradient(to right, ${safeEvent.themeColors.primaryColor}, ${safeEvent.themeColors.secondaryColor})`,
                }}
              >
                {(() => {
                  switch (language) {
                    case "fr":
                      return (
                        safeEvent.headline_fr || safeEvent.headline
                      ).toUpperCase();
                    case "ar":
                      return (
                        safeEvent.headline_ar || safeEvent.headline
                      ).toUpperCase();
                    default:
                      return safeEvent.headline.toUpperCase();
                  }
                })()}
              </h2>

              <p
                className=" uppercase text-gray-200 dark:text-gray-200 text-[8px] sm:text-[8px] md:text-xs lg:text-xs xl:text-xs px-2 sm:px-4 mb-2 sm:mb-3 max-w-2xl mx-auto leading-relaxed"
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                {(() => {
                  switch (language) {
                    case "fr":
                      return safeEvent.description_fr || safeEvent.description;
                    case "ar":
                      return safeEvent.description_ar || safeEvent.description;
                    default:
                      return safeEvent.description;
                  }
                })()}
              </p>
            </div>

            {/* Event Template & Priority Badge */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {safeEvent.eventTemplate &&
                safeEvent.eventTemplate !== "custom" && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {safeEvent.eventTemplate.replace("_", " ").toUpperCase()}
                  </span>
                )}

              {safeEvent.advancedSettings?.priority &&
                safeEvent.advancedSettings.priority > 5 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    ⭐ HIGH PRIORITY
                  </span>
                )}
            </div>

            {/* Tags Display */}
            {safeEvent.metadata?.tags && safeEvent.metadata.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {safeEvent.metadata.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${safeEvent.themeColors.secondaryColor}20`,
                      color: safeEvent.themeColors.primaryColor,
                      border: `1px solid ${safeEvent.themeColors.primaryColor}30`,
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Countdown Timer */}
            <div
              className="flex flex-col items-center gap-1 mt-2 bg-gradient-to-r px-3 py-3 rounded-full border mb-4"
              style={{
                backgroundImage: `linear-gradient(to right, ${safeEvent.themeColors.primaryColor}20, ${safeEvent.themeColors.secondaryColor}20)`,
                borderColor: `${safeEvent.themeColors.primaryColor}40`,
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock
                  className="w-4 h-4"
                  style={{ color: safeEvent.themeColors.primaryColor }}
                />
                <span
                  className="text-xs sm:text-sm font-semibold"
                  style={{ color: safeEvent.themeColors.primaryColor }}
                >
                  {t("eventEndsIn")} {Math.floor(timeRemaining / 86400)}{" "}
                  {t("days")}
                </span>
              </div>

              {timeRemaining > 0 && (
                <div
                  className="text-sm sm:text-base font-bold"
                  style={{ color: safeEvent.themeColors.primaryColor }}
                >
                  {formatTimeRemaining(timeRemaining)}
                </div>
              )}
            </div>

            {/* Event Features */}
            {(primaryFeatures.length > 0 || secondaryFeatures.length > 0) && (
              <div className="space-y-2 sm:space-y-3 lg:space-y-2 mb-4">
                {/* Primary Features */}
                {primaryFeatures.map((feature) => (
                  <div
                    key={feature.featureTitle}
                    className="bg-gradient-to-r border rounded-2xl p-3 sm:p-4 shadow-sm"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${safeEvent.themeColors.primaryColor}10, ${safeEvent.themeColors.secondaryColor}10)`,
                      borderColor: `${safeEvent.themeColors.primaryColor}30`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: safeEvent.themeColors.primaryColor,
                        }}
                      >
                        <span className="text-white">
                          {getFeatureIcon(feature.featureIcon)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className=" uppercase font-semibold text-white dark:text-white text-xs sm:text-sm mb-1">
                          {(() => {
                            switch (language) {
                              case "fr":
                                return (
                                  feature.featureTitle_fr ||
                                  feature.featureTitle
                                );
                              case "ar":
                                return (
                                  feature.featureTitle_ar ||
                                  feature.featureTitle
                                );
                              default:
                                return feature.featureTitle;
                            }
                          })()}
                        </h3>
                        <div className="flex items-center justify-between gap-2">
                          {feature.featureDescription && (
                            <p className="text-gray-200 dark:text-gray-200 lg:text-xs text-[10px] sm:text-[10px]">
                              {(() => {
                                switch (language) {
                                  case "fr":
                                    return (
                                      feature.featureDescription_fr ||
                                      feature.featureDescription
                                    );
                                  case "ar":
                                    return (
                                      feature.featureDescription_ar ||
                                      feature.featureDescription
                                    );
                                  default:
                                    return feature.featureDescription;
                                }
                              })()}
                            </p>
                          )}
                          {feature.featureValue && (
                            <span
                              className="inline-block mt-1 px-2 py-1 rounded-full lg:text-xs text-[10px] font-semibold"
                              style={{
                                backgroundColor:
                                  safeEvent.themeColors.secondaryColor,
                                color: "white",
                              }}
                            >
                              {feature.featureValue}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Secondary Features */}
                {secondaryFeatures.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {secondaryFeatures.map((feature) => (
                      <div
                        key={feature.featureTitle}
                        className="bg-white/50 dark:bg-gray-800/50 border rounded-xl p-3 text-center shadow-sm"
                        style={{
                          borderColor: `${safeEvent.themeColors.primaryColor}20`,
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2"
                          style={{
                            backgroundColor: safeEvent.themeColors.primaryColor,
                          }}
                        >
                          {getFeatureIcon(feature.featureIcon)}
                        </div>
                        <h4 className="font-semibold text-white  dark:text-white text-xs mb-1">
                          {(() => {
                            switch (language) {
                              case "fr":
                                return (
                                  feature.featureTitle_fr ||
                                  feature.featureTitle
                                );
                              case "ar":
                                return (
                                  feature.featureTitle_ar ||
                                  feature.featureTitle
                                );
                              default:
                                return feature.featureTitle;
                            }
                          })()}
                        </h4>
                        {feature.featureValue && (
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: safeEvent.themeColors.primaryColor,
                            }}
                          >
                            {feature.featureValue}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Discount Products List */}
            {safeEvent.discountProducts &&
              safeEvent.discountProducts.length > 0 && (
                <div className="mb-4">
                  <div className="text-center mb-3 sm:mb-4">
                    <h3 className=" uppercase font-semibold text-white dark:text-white text-xs sm:text-sm md:text-base mb-1">
                      🛍️ {t("specialDiscountProducts")}
                    </h3>
                    <p className="lg:text-xs text-[10px] text-gray-200 dark:text-gray-200">
                      {t("addExclusiveItems")}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {safeEvent.discountProducts.map((discountProduct) => {
                      const product = discountProduct.product;
                      if (!product) return null;

                      let discountedPrice = product.price;
                      let discountPercentage = 0;

                      if (discountProduct.discountType === "percentage") {
                        const discountAmount =
                          (product.price * discountProduct.discountValue) / 100;
                        const maxDiscount =
                          discountProduct.maxDiscountAmount || discountAmount;
                        discountedPrice =
                          product.price - Math.min(discountAmount, maxDiscount);
                        discountPercentage = discountProduct.discountValue;
                      } else if (discountProduct.discountType === "fixed") {
                        discountedPrice =
                          product.price - discountProduct.discountValue;
                        discountPercentage = Math.round(
                          (discountProduct.discountValue / product.price) * 100
                        );
                      } else if (
                        discountProduct.discountType === "final_price"
                      ) {
                        discountedPrice = discountProduct.discountValue;
                        discountPercentage = Math.round(
                          ((product.price - discountProduct.discountValue) /
                            product.price) *
                            100
                        );
                      }

                      const firstImage =
                        discountProduct.customImage?.asset?.url ||
                        product.gallery?.[0]?.asset?.url;

                      return (
                        <div
                          key={product._id}
                          className="bg-gradient-to-r border rounded-2xl p-4 shadow-sm"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${safeEvent.themeColors.primaryColor}10, ${safeEvent.themeColors.secondaryColor}10)`,
                            borderColor: `${safeEvent.themeColors.primaryColor}30`,
                          }}
                        >
                          <div className="flex items-center gap-4">
                            {/* Product Image */}
                            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                              {firstImage ? (
                                <Image
                                  src={firstImage}
                                  alt={product.title}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-gray-200 text-xs">
                                    No Image
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 ">
                                <h4 className="font-semibold text-white dark:text-white text-xs sm:text-xs md:text-sm mb-1 line-clamp-2">
                                  {product.title}
                                </h4>
                                {discountPercentage > 0 && (
                                  <span
                                    className="text-xs font-semibold px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-white mb-5"
                                    style={{
                                      backgroundColor:
                                        safeEvent.themeColors.primaryColor,
                                    }}
                                  >
                                    -{discountPercentage}
                                    {t("percentOff")}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center  gap-2  mb-2">
                                <span className="text-sm sm:text-sm md:text-base font-bold text-white dark:text-white">
                                  {discountedPrice.toFixed(2)} {t("currency")}
                                </span>
                                {discountedPrice < product.price && (
                                  <span className="text-xs text-gray-200 dark:text-gray-200 line-through">
                                    {product.price.toFixed(2)} {t("currency")}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Add to Cart Button */}
                          <div className="flex items-center justify-center my-2">
                            <Button
                              onClick={() =>
                                addProductWithDiscount(discountProduct)
                              }
                              className=" uppercase px-4 sm:px-4 md:px-6  sm:py-1.5 py-1.5 lg:py-2 rounded-lg  font-semibold text-xs lg:text-sm sm:text-xs text-white shadow-lg flex-shrink-0"
                              style={{
                                backgroundColor:
                                  safeEvent.themeColors.primaryColor,
                                boxShadow: `0 4px 12px ${safeEvent.themeColors.primaryColor}40`,
                              }}
                            >
                              {t("addToCartSpecial")}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
