"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Clock, Tag, Truck, Gift, Star, Zap } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/translationContext";
import { urlFor } from "@/sanity/lib/image";

interface PopupTranslation {
  title: string;
  subtitle: string;
  ctaText: string;
  incentive?: string;
}

interface PopupData {
  _id: string;
  popupType: string;
  active: boolean;
  translations: {
    en: PopupTranslation;
    fr: PopupTranslation;
    ar: PopupTranslation;
  };
  design: {
    layoutType: string;
    showImage: boolean;
    backgroundImage?: {
      asset: {
        url: string;
      };
    };
    themeColors: {
      primaryColor: { hex: string };
      secondaryColor: { hex: string };
      backgroundColor: { hex: string };
    };
  };
  animation: {
    entranceAnimation: string;
    exitAnimation: string;
    duration: number;
    easing: string;
  };
  trigger: {
    triggerType: string;
    scrollPercentage?: number;
    delayMs?: number;
    cartThreshold?: number;
    maxDisplays: number;
    displayFrequency: string;
  };
  selectedProducts?: Array<{
    _id: string;
    title: string;
    gallery?: Array<{
      asset: {
        url: string;
      };
    }>;
    price?: number;
    slug?: {
      current: string;
    };
  }>;
  priority: number;
  targetAudience?: string[];
  createdAt?: string;
  internalNotes?: string;
}

interface ReusablePopupProps {
  popup: PopupData | null;
  isOpen: boolean;
  onClose: () => void;
  onCtaClick?: () => void;
  language?: "en" | "fr" | "ar"; // Optional language override for testing
}

export default function ReusablePopup({
  popup,
  isOpen,
  onClose,
  onCtaClick,
  language: propLanguage,
}: ReusablePopupProps) {
  const { language: contextLanguage } = useTranslation();
  const language = propLanguage || contextLanguage; // Use prop language if provided, otherwise use context
  const [hasAnimated, setHasAnimated] = useState(false);

  // Get current translation with fallbacks
  const getTranslation = (): PopupTranslation => {
    if (!popup) return { title: "", subtitle: "", ctaText: "" };
    return (
      popup.translations[language as keyof typeof popup.translations] ||
      popup.translations.en
    );
  };

  // Get popup type specific icon
  const getPopupTypeIcon = () => {
    if (!popup) return null;

    switch (popup.popupType) {
      case "exit_intent":
        return <Tag className="w-6 h-6" />;
      case "limited_time_offer":
        return <Clock className="w-6 h-6" />;
      case "free_shipping_threshold":
        return <Truck className="w-6 h-6" />;
      case "post_purchase_upsell":
        return <Gift className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  // Animation variants with enhanced options
  const getAnimationVariants = () => {
    if (!popup) return {};

    const { entranceAnimation, exitAnimation, duration, easing } =
      popup.animation;

    const entranceVariants = {
      fade_scale: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
      },
      slide_up: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
      },
      slide_down: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
      },
      bounce_in: {
        initial: { opacity: 0, scale: 0.3 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.3 },
      },
    };

    const exitVariants = {
      fade_out: { opacity: 0 },
      slide_out: { opacity: 0, y: 50 },
      scale_down: { opacity: 0, scale: 0.8 },
    };

    const selectedEntrance =
      entranceVariants[entranceAnimation as keyof typeof entranceVariants] ||
      entranceVariants.fade_scale;
    const selectedExit =
      exitVariants[exitAnimation as keyof typeof exitVariants] ||
      exitVariants.fade_out;

    return {
      initial: selectedEntrance.initial,
      animate: selectedEntrance.animate,
      exit: selectedExit,
      transition: {
        duration: duration / 1000,
        ease: easing === "spring" ? undefined : (easing as any),
        type: easing === "spring" ? ("spring" as const) : undefined,
      },
    };
  };

  // Enhanced layout classes with responsive design - smaller on large devices
  const getLayoutClasses = () => {
    if (!popup) return "";

    const { layoutType } = popup.design;

    switch (layoutType) {
      case "bottom_banner":
        return "-bottom-6 left-0 right-0 w-full max-w-none max-h-[60vh] lg:max-h-[60vh]  overflow-hidden";
      case "side_panel":
        return "-right-9 top-1/2 -translate-y-1/2 max-w-xs lg:max-w-sm w-full sm:w-auto max-h-[70vh] lg:max-h-[60vh] overflow-hidden";
      case "image_focus":
        return "-top-62 left-0 right-0 w-full max-w-none max-h-[60vh] lg:max-h-[60vh] overflow-hidden";
      case "product_grid":
        return "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-3xl lg:max-w-4xl max-h-[80vh] lg:max-h-[70vh] overflow-hidden";
      default: // center_modal
        return "  max-w-xs sm:max-w-sm lg:max-w-md max-h-[75vh] lg:max-h-[65vh] overflow-hidden";
    }
  };

  // Get responsive container classes - smaller padding on large devices, no scrolling
  const getContainerClasses = () => {
    if (!popup) return "p-3 sm:p-4 lg:p-5";

    const { layoutType } = popup.design;

    switch (layoutType) {
      case "bottom_banner":
        return "p-3 sm:p-4 lg:p-5 rounded-t-3xl flex flex-col";
      case "side_panel":
        return "p-3 sm:p-4 lg:p-5 rounded-l-3xl sm:rounded-3xl flex flex-col";
      case "image_focus":
        return "p-4 rounded-3xl flex flex-col"; // No padding for image focus
      case "product_grid":
        return "p-3 sm:p-4 lg:p-5 rounded-3xl flex flex-col";
      default: // center_modal
        return "p-3 sm:p-4 lg:p-5 rounded-3xl flex flex-col";
    }
  };

  // Sparkle effect for premium feel
  const SparkleEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-2 h-2 text-yellow-300" />
        </motion.div>
      ))}
    </div>
  );

  if (!isOpen || !popup) return null;

  const translation = getTranslation();
  const animationVariants = getAnimationVariants();
  const layoutClasses = getLayoutClasses();
  const containerClasses = getContainerClasses();

  // Safe color extraction with defaults
  const primaryColor =
    popup.design?.themeColors?.primaryColor?.hex || "#DC2626";
  const secondaryColor =
    popup.design?.themeColors?.secondaryColor?.hex || "#F59E0B";
  const backgroundColor =
    popup.design?.themeColors?.backgroundColor?.hex || "#000000";

  // Smart popup type logic with enhanced features
  const getPopupTypeConfig = () => {
    switch (popup.popupType) {
      case "exit_intent":
        return {
          urgencyLevel: "high",
          showCountdown: false,
          showProgress: false,
          icon: "🚪",
          headerText: "✨ Special Offer",
          ctaStyle: "urgent",
          accentColor: "#EF4444",
          sparkleEffect: false,
        };
      case "limited_time_offer":
        return {
          urgencyLevel: "high",
          showCountdown: true,
          showProgress: false,
          icon: "⏰",
          headerText: "🔥 Limited Time",
          ctaStyle: "promotional",
          accentColor: "#F59E0B",
          sparkleEffect: true,
        };
      case "free_shipping_threshold":
        return {
          urgencyLevel: "medium",
          showCountdown: false,
          showProgress: true,
          icon: "🚚",
          headerText: "📦 Almost There",
          ctaStyle: "progress",
          accentColor: "#10B981",
          sparkleEffect: false,
        };
      case "post_purchase_upsell":
        return {
          urgencyLevel: "low",
          showCountdown: false,
          showProgress: false,
          icon: "🛍️",
          headerText: "✨ Complete Your Look",
          ctaStyle: "recommendation",
          accentColor: "#8B5CF6",
          sparkleEffect: true,
        };
      default:
        return {
          urgencyLevel: "medium",
          showCountdown: false,
          showProgress: false,
          icon: "🎯",
          headerText: "💡 Special Offer",
          ctaStyle: "default",
          accentColor: primaryColor,
          sparkleEffect: false,
        };
    }
  };

  const popupConfig = getPopupTypeConfig();

  // Progress bar component for free shipping threshold
  const ProgressBar = ({
    current = 45,
    target = 75,
  }: {
    current?: number;
    target?: number;
  }) => {
    const percentage = Math.min((current / target) * 100, 100);
    const remaining = target - current;

    // Translated texts for progress bar
    const getProgressTranslations = () => {
      switch (language) {
        case "fr":
          return {
            progressToFreeShipping: "Progression vers la livraison gratuite",
            toGo: "à dépenser",
            currency: "DT",
          };
        case "ar":
          return {
            progressToFreeShipping: "التقدم نحو الشحن المجاني",
            toGo: "متبقي",
            currency: "دينار",
          };
        default:
          return {
            progressToFreeShipping: "Progress to Free Shipping",
            toGo: "to go",
            currency: "DT",
          };
      }
    };

    const progressTexts = getProgressTranslations();

    return (
      <motion.div
        className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-300">
            {progressTexts.progressToFreeShipping}
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: popupConfig.accentColor }}
          >
            {remaining.toFixed(2)} {progressTexts.currency} {progressTexts.toGo}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full"
            style={{ backgroundColor: popupConfig.accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>
            {current.toFixed(2)} {progressTexts.currency}
          </span>
          <span>
            {target.toFixed(2)} {progressTexts.currency}
          </span>
        </div>
      </motion.div>
    );
  };

  // Countdown timer for limited time offers
  const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // Translated texts for countdown timer
    const getCountdownTranslations = () => {
      switch (language) {
        case "fr":
          return {
            timeRemaining: "Temps restant",
            hours: "Heures",
            minutes: "Min",
            seconds: "Sec",
          };
        case "ar":
          return {
            timeRemaining: "الوقت المتبقي",
            hours: "ساعات",
            minutes: "دقائق",
            seconds: "ثواني",
          };
        default:
          return {
            timeRemaining: "Time Remaining",
            hours: "Hours",
            minutes: "Min",
            seconds: "Sec",
          };
      }
    };

    const countdownTexts = getCountdownTranslations();

    return (
      <motion.div
        className="mb-4 p-3 rounded-lg bg-gradient-to-r border"
        style={{
          background: `linear-gradient(to right, ${popupConfig.accentColor}20, ${secondaryColor}20)`,
          borderColor: `${popupConfig.accentColor}40`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock
            className="w-4 h-4"
            style={{ color: popupConfig.accentColor }}
          />
          <span className="text-xs font-semibold text-white">
            {countdownTexts.timeRemaining}
          </span>
        </div>
        <div className="flex justify-center gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {hours.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-300">{countdownTexts.hours}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-300">
              {countdownTexts.minutes}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-300">
              {countdownTexts.seconds}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Dynamic styling based on popup type
  const getPopupTypeStyles = () => {
    switch (popup.popupType) {
      case "exit_intent":
        return {
          accentColor: "#EF4444", // Red for urgency
          iconBg: "bg-red-100 dark:bg-red-900/30",
          iconColor: "text-red-600 dark:text-red-400",
        };
      case "limited_time_offer":
        return {
          accentColor: "#F59E0B", // Amber for time sensitivity
          iconBg: "bg-amber-100 dark:bg-amber-900/30",
          iconColor: "text-amber-600 dark:text-amber-400",
        };
      case "free_shipping_threshold":
        return {
          accentColor: "#10B981", // Green for shipping
          iconBg: "bg-green-100 dark:bg-green-900/30",
          iconColor: "text-green-600 dark:text-green-400",
        };
      case "post_purchase_upsell":
        return {
          accentColor: "#8B5CF6", // Purple for premium
          iconBg: "bg-purple-100 dark:bg-purple-900/30",
          iconColor: "text-purple-600 dark:text-purple-400",
        };
      default:
        return {
          accentColor: primaryColor,
          iconBg: "bg-gray-100 dark:bg-gray-900/30",
          iconColor: "text-gray-600 dark:text-gray-400",
        };
    }
  };

  const popupStyles = getPopupTypeStyles();

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed z-50 bg-black/50 backdrop-blur-sm ${
          popup?.design.layoutType === "bottom_banner"
            ? "inset-0 flex items-end justify-center pb-4"
            : popup?.design.layoutType === "side_panel"
              ? "inset-0 flex items-center justify-end pr-4"
              : "inset-0 p-4 flex items-center justify-center"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`relative w-full ${layoutClasses}`}
          {...animationVariants}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background with theme colors and layout-specific styling */}
          <div
            className={`relative backdrop-blur-xl shadow-2xl border border-white/30 overflow-hidden ${
              popup.design.layoutType === "bottom_banner"
                ? "bg-gradient-to-t rounded-t-3xl shadow-2xl"
                : popup.design.layoutType === "side_panel"
                  ? "bg-gradient-to-l rounded-l-3xl sm:rounded-3xl shadow-2xl"
                  : "bg-gradient-to-br rounded-3xl shadow-2xl"
            }`}
            style={{
              background: `linear-gradient(135deg, ${backgroundColor}98 0%, ${primaryColor}15 50%, ${backgroundColor}95 100%)`,
              borderColor: `${primaryColor}40`,
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px ${primaryColor}20`,
            }}
          >
            {/* Background Image */}
            {popup.design?.backgroundImage && (
              <div className="absolute inset-0">
                <Image
                  src={urlFor(popup.design.backgroundImage).url()}
                  alt="Background"
                  fill
                  className="object-cover opacity-20"
                />
              </div>
            )}

            {/* Smart Sparkle Effect based on popup config */}
            {popupConfig.sparkleEffect && <SparkleEffect />}

            {/* Dynamic gradient border based on popup type */}
            <div
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}, ${popupStyles.accentColor})`,
              }}
            />

            <div
              className={`relative ${containerClasses} min-h-0 flex flex-col`}
            >
              {/* Close Button - Position based on layout */}
              <motion.button
                onClick={onClose}
                className={`absolute w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-xl z-20 border border-white/20 ${
                  popup.design.layoutType === "bottom_banner"
                    ? "top-3 right-3"
                    : popup.design.layoutType === "side_panel"
                      ? "top-3 left-3"
                      : "top-3 right-3"
                }`}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Popup Type Icon Badge */}
              <div className="flex justify-center mb-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${popupStyles.iconBg} shadow-lg`}
                >
                  <div style={{ color: popupStyles.accentColor }}>
                    {getPopupTypeIcon()}
                  </div>
                </div>
              </div>

              {/* Selected Products Display - Show based on configuration */}
              {popup.design.showImage &&
                popup.selectedProducts &&
                popup.selectedProducts.length > 0 && (
                  <div className="mb-6 px-4">
                    <div className="text-center mb-4">
                      <h3 className="text-sm font-semibold text-gray-200 mb-3">
                        {(() => {
                          const getProductHeader = () => {
                            switch (language) {
                              case "fr":
                                return popup.popupType ===
                                  "post_purchase_upsell"
                                  ? "✨ Complétez votre look"
                                  : popup.popupType === "limited_time_offer"
                                    ? "🔥 Produits en vedette"
                                    : "🛍️ Recommandé pour vous";
                              case "ar":
                                return popup.popupType ===
                                  "post_purchase_upsell"
                                  ? "✨ أكمل إطلالتك"
                                  : popup.popupType === "limited_time_offer"
                                    ? "🔥 المنتجات المميزة"
                                    : "🛍️ موصى به لك";
                              default:
                                return popup.popupType ===
                                  "post_purchase_upsell"
                                  ? "✨ Complete Your Look"
                                  : popup.popupType === "limited_time_offer"
                                    ? "🔥 Featured Products"
                                    : "🛍️ Recommended for You";
                            }
                          };
                          return getProductHeader();
                        })()}
                      </h3>
                    </div>

                    {popup.selectedProducts.length === 1 ? (
                      // Single product - Compact horizontal card
                      <div className="bg-white/10 backdrop-blur-sm rounded-md p-2 border border-white/20 shadow-sm max-w-xs mx-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                popup.selectedProducts[0].gallery?.[0]?.asset
                                  ?.url || "/placeholder-product.jpg"
                              }
                              alt={popup.selectedProducts[0].title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white text-xs mb-0.5 line-clamp-2 leading-tight">
                              {popup.selectedProducts[0].title}
                            </h4>
                            {popup.selectedProducts[0].price && (
                              <p
                                className="text-sm font-bold mb-1"
                                style={{ color: primaryColor }}
                              >
                                {popup.selectedProducts[0].price.toFixed(2)} DT
                              </p>
                            )}
                            <button
                              className="w-full px-2 py-1 rounded font-medium text-xs shadow-sm hover:shadow-md transition-all duration-200"
                              style={{
                                backgroundColor: primaryColor,
                                boxShadow: `0 2px 8px ${primaryColor}40`,
                              }}
                              onClick={() => onCtaClick && onCtaClick()}
                            >
                              {(() => {
                                switch (language) {
                                  case "fr":
                                    return "Voir";
                                  case "ar":
                                    return "عرض";
                                  default:
                                    return "View";
                                }
                              })()}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Multiple products - Compact horizontal list layout
                      <div className="space-y-1.5 px-1 max-h-32 overflow-y-auto">
                        {popup.selectedProducts
                          .slice(0, 3)
                          .map((product, index) => (
                            <motion.div
                              key={product._id}
                              className="bg-white/10 backdrop-blur-sm rounded-md p-1.5 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                              whileHover={{ scale: 1.01, y: -0.5 }}
                              whileTap={{ scale: 0.99 }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.03,
                                type: "spring",
                                stiffness: 300,
                              }}
                              onClick={() => onCtaClick && onCtaClick()}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 relative rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={
                                      product.gallery?.[0]?.asset?.url ||
                                      "/placeholder-product.jpg"
                                    }
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-white text-xs line-clamp-1 leading-tight">
                                    {product.title}
                                  </h5>
                                  {product.price && (
                                    <span
                                      className="text-xs font-bold"
                                      style={{ color: primaryColor }}
                                    >
                                      {product.price.toFixed(0)}DT
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    )}

                    {popup.selectedProducts.length > 6 && (
                      <div className="text-center mt-3">
                        <p className="text-xs text-gray-400">
                          +{popup.selectedProducts.length - 6}{" "}
                          {(() => {
                            switch (language) {
                              case "fr":
                                return "produits supplémentaires disponibles";
                              case "ar":
                                return "منتجات إضافية متاحة";
                              default:
                                return "more products available";
                            }
                          })()}
                        </p>
                      </div>
                    )}
                  </div>
                )}

              {/* Content */}
              <div className="text-center space-y-3 lg:space-y-2">
                {/* Progress Bar for Free Shipping */}
                {popupConfig.showProgress && <ProgressBar />}

                {/* Countdown Timer for Limited Time Offers */}
                {popupConfig.showCountdown && <CountdownTimer />}

                {/* Title with enhanced styling - smaller on large devices */}
                <motion.h2
                  className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 lg:mb-3 leading-tight"
                  style={{
                    background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {translation.title}
                </motion.h2>

                {/* Subtitle with better typography - smaller on large devices */}
                <motion.p
                  className="text-gray-200 dark:text-gray-200 text-sm sm:text-base lg:text-base mb-4 lg:mb-5 leading-relaxed max-w-sm lg:max-w-md mx-auto"
                  dir={language === "ar" ? "rtl" : "ltr"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {translation.subtitle}
                </motion.p>

                {/* Incentive Badge - Enhanced */}
                {translation.incentive && (
                  <motion.div
                    className="mb-6 p-4 rounded-xl border-2 shadow-lg"
                    style={{
                      backgroundColor: `${secondaryColor}20`,
                      borderColor: `${primaryColor}40`,
                      boxShadow: `0 4px 20px ${primaryColor}20`,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Zap
                        className="w-3 h-3 lg:w-4 lg:h-4"
                        style={{ color: popupStyles.accentColor }}
                      />
                      <p
                        className="text-sm lg:text-base font-bold text-center"
                        style={{ color: primaryColor }}
                      >
                        {translation.incentive}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* CTA Button - Dynamic styling based on popup type */}
                <motion.button
                  onClick={onCtaClick}
                  className={`w-full px-4 lg:px-5 py-3 lg:py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm lg:text-base ${
                    popupConfig.ctaStyle === "urgent" ? "animate-pulse" : ""
                  }`}
                  style={{
                    backgroundColor:
                      popupConfig.ctaStyle === "urgent"
                        ? popupConfig.accentColor
                        : primaryColor,
                    boxShadow: `0 4px 20px ${popupConfig.ctaStyle === "urgent" ? popupConfig.accentColor : primaryColor}40`,
                  }}
                  whileHover={{
                    scale: popupConfig.urgencyLevel === "high" ? 1.08 : 1.05,
                    boxShadow: `0 8px 30px ${popupConfig.ctaStyle === "urgent" ? popupConfig.accentColor : primaryColor}60`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {popupConfig.ctaStyle === "urgent" && "🚨 "}
                  {translation.ctaText}
                  {popupConfig.ctaStyle === "progress" && " →"}
                </motion.button>

                {/* Dynamic footer text based on popup config */}
                <motion.p
                  className="text-xs text-gray-400 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {popupConfig.icon}{" "}
                  {(() => {
                    const getFooterMessage = () => {
                      switch (language) {
                        case "fr":
                          return popup.popupType === "limited_time_offer"
                            ? "Offre limitée dans le temps - Ne la manquez pas !"
                            : popup.popupType === "free_shipping_threshold"
                              ? "Livraison gratuite sur les commandes dépassant le seuil"
                              : popup.popupType === "post_purchase_upsell"
                                ? "Complétez votre achat avec ces recommandations"
                                : popup.popupType === "exit_intent"
                                  ? "Offre spéciale pour vous avant votre départ"
                                  : "Offre exclusive rien que pour vous";
                        case "ar":
                          return popup.popupType === "limited_time_offer"
                            ? "عرض محدود الوقت - لا تفوت الفرصة!"
                            : popup.popupType === "free_shipping_threshold"
                              ? "شحن مجاني للطلبات التي تتجاوز الحد"
                              : popup.popupType === "post_purchase_upsell"
                                ? "أكمل شراءك مع هذه التوصيات"
                                : popup.popupType === "exit_intent"
                                  ? "عرض خاص لك قبل مغادرتك"
                                  : "عرض حصري لك فقط";
                        default:
                          return popup.popupType === "limited_time_offer"
                            ? "Limited time offer - Don't miss out!"
                            : popup.popupType === "free_shipping_threshold"
                              ? "Free shipping on orders over threshold"
                              : popup.popupType === "post_purchase_upsell"
                                ? "Complete your purchase with these recommendations"
                                : popup.popupType === "exit_intent"
                                  ? "Special offer for you before you leave"
                                  : "Exclusive offer just for you";
                      }
                    };
                    return getFooterMessage();
                  })()}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
