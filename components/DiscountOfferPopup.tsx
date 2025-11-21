"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Sparkles, Clock, Tag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { CartItem } from "@/store/cart";
import { useTranslation } from "@/lib/translationContext";
import { Product, DiscountOfferProduct } from "@/lib/types";

interface DiscountOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiscountOfferPopup({
  isOpen,
  onClose,
}: DiscountOfferPopupProps) {
  const [featuredProducts, setFeaturedProducts] = useState<DiscountOfferProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentOffer, setCurrentOffer] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { addToCart } = useCartStore();
  const { t, language } = useTranslation();

  useEffect(() => {
    console.log('DiscountOfferPopup: isOpen changed to', isOpen);
    if (isOpen) {
      console.log('DiscountOfferPopup: Fetching discount offers...');
      fetchActiveDiscountOffers();
    }
  }, [isOpen]);

  // Countdown timer effect
  useEffect(() => {
    if (!currentOffer || !isOpen) return;

    const displayType = currentOffer.timeRemainingDisplay;
    if (displayType === "custom") return; // No countdown for custom

    // Calculate remaining time based on offer start date and duration
    const now = new Date();
    const startDate = currentOffer.startDate ? new Date(currentOffer.startDate) : now;

    let durationMs = 0;
    switch (displayType) {
      case "30s":
        durationMs = 30 * 1000; // 30 seconds
        break;
      case "12h":
        durationMs = 12 * 60 * 60 * 1000; // 12 hours
        break;
      case "24h":
        durationMs = 24 * 60 * 60 * 1000; // 24 hours
        break;
      case "48h":
        durationMs = 48 * 60 * 60 * 1000; // 48 hours
        break;
      case "72h":
        durationMs = 72 * 60 * 60 * 1000; // 72 hours
        break;
      default:
        return;
    }

    const endTime = startDate.getTime() + durationMs;
    const remainingMs = Math.max(0, endTime - now.getTime());
    const remainingSeconds = Math.floor(remainingMs / 1000);

    setTimeRemaining(remainingSeconds);

    if (remainingSeconds > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentOffer, isOpen]);

  const fetchActiveDiscountOffers = async () => {
    try {
      setLoading(true);
      // Fetch active discount offers from Sanity with expanded product data
      const query = `*[_type == "discountOffer"] {
        ...,
        featuredProducts[] {
          ...,
          product-> {
            _id,
            title,
            price,
            gallery[] {
              ...,
              asset-> {
                url
              }
            },
            slug
          }
        }
      } | order(_createdAt desc)`;
      const response = await fetch(`/api/discount-offers?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      console.log('DiscountOfferPopup: API response received:', data);
      console.log('DiscountOfferPopup: Offers found:', data.offers?.length || 0);
      console.log('DiscountOfferPopup: Full response:', JSON.stringify(data, null, 2));

      if (data.offers && data.offers.length > 0) {
        // Find the first active offer that meets the criteria
        const now = new Date();
        const activeOffer = data.offers.find((offer: any) => {
          const isActive = offer.isActive === "active";
          const startDateValid = !offer.startDate || new Date(offer.startDate) <= now;
          const endDateValid = !offer.endDate || new Date(offer.endDate) > now;

          console.log('Checking offer:', offer.title, {
            isActive,
            startDateValid,
            endDateValid,
            startDate: offer.startDate,
            endDate: offer.endDate
          });

          return isActive && startDateValid && endDateValid;
        });

        if (activeOffer) {
          console.log('DiscountOfferPopup: Found active offer:', activeOffer.title);
          console.log('DiscountOfferPopup: Offer status:', activeOffer.isActive);
          console.log('DiscountOfferPopup: Start date:', activeOffer.startDate);
          console.log('DiscountOfferPopup: Featured products:', activeOffer.featuredProducts?.length || 0);
          console.log('DiscountOfferPopup: Featured products data:', activeOffer.featuredProducts);
          setCurrentOffer(activeOffer);
          console.log('DiscountOfferPopup: Setting current offer:', activeOffer);
          console.log('DiscountOfferPopup: Offer title:', activeOffer.title);
          console.log('DiscountOfferPopup: Offer description:', activeOffer.description);
        } else {
          console.log('DiscountOfferPopup: No offers meet active criteria, using fallback');
          // Fallback to featured products if no active offers
          const response = await fetch('/api/products?limit=6&featured=true');
          const fallbackData = await response.json();
          console.log('DiscountOfferPopup: Fallback products:', fallbackData.products?.length || 0);
          setFeaturedProducts(fallbackData.products || []);
          return; // Exit early, don't process further
        }

        // Update popup timing based on offer settings
        if (activeOffer.popupDelay) {
          const delayMs = parseInt(activeOffer.popupDelay) * 1000;
          // Could update timing here if needed
        }

        // Transform the offer data to match our component structure
        console.log('DiscountOfferPopup: Raw featuredProducts:', activeOffer.featuredProducts);
        const transformedProducts = activeOffer.featuredProducts?.map((item: any) => {
          console.log('DiscountOfferPopup: Processing item:', item);
          console.log('DiscountOfferPopup: Product data:', item.product);
          const product = item.product;
          if (!product) return null;

          let discountedPrice = product.price;
          let discountPercentage = 0;

          if (item.discountType === 'percentage') {
            const discountAmount = (product.price * item.discountValue) / 100;
            const maxDiscount = item.maxDiscountAmount || discountAmount;
            discountedPrice = product.price - Math.min(discountAmount, maxDiscount);
            discountPercentage = item.discountValue;
          } else if (item.discountType === 'fixed') {
            discountedPrice = product.price - item.discountValue;
            discountPercentage = Math.round((item.discountValue / product.price) * 100);
          } else if (item.discountType === 'final_price') {
            discountedPrice = item.discountValue;
            discountPercentage = Math.round(((product.price - item.discountValue) / product.price) * 100);
          }

          return {
            _id: product._id,
            title: product.title,
            price: product.price,
            discountedPrice: Math.max(0, discountedPrice), // Ensure price doesn't go negative
            discountPercentage: Math.max(0, discountPercentage), // Ensure percentage doesn't go negative
            gallery: item.customImage ? [{ asset: { url: item.customImage.asset.url } }] : product.gallery,
            slug: product.slug
          };
        }).filter(Boolean) || []; // Filter out null items

        console.log('DiscountOfferPopup: Transformed products:', transformedProducts);
        console.log('DiscountOfferPopup: First product gallery:', transformedProducts[0]?.gallery);
        setFeaturedProducts(transformedProducts);
      } else {
        console.log('DiscountOfferPopup: No active offers found, using fallback');
        // Fallback to featured products if no active offers
        const response = await fetch('/api/products?limit=6&featured=true');
        const data = await response.json();
        console.log('DiscountOfferPopup: Fallback products:', data.products?.length || 0);
        setFeaturedProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch discount offers:', error);
      // Fallback to featured products
      try {
        const response = await fetch('/api/products?limit=6&featured=true');
        const data = await response.json();
        setFeaturedProducts(data.products || []);
      } catch (fallbackError) {
        console.error('Fallback fetch also failed:', fallbackError);
        setFeaturedProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCartWithDiscount = (product: DiscountOfferProduct, discountPercentage: number = 20) => {
    const discountedPrice = product.discountedPrice || Math.round((product.price * (1 - discountPercentage / 100)) * 100) / 100;

    const cartItem: CartItem = {
      _id: product._id,
      title: product.title,
      slug: typeof product.slug === 'string' ? product.slug : product.slug?.current || '',
      price: discountedPrice,
      gallery: product.gallery,
      quantity: 1,
      inStock: true, // Assume in stock for discount offers
    };

    addToCart(cartItem);
  };

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return "00:00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modern glassmorphism background */}
          <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-20 animate-pulse"></div>
            <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95"></div>

            <div className="relative p-6 sm:p-8 lg:p-10">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110 shadow-lg"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-4 sm:mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="inline-block mb-3 sm:mb-4"
                >
                  <div className="relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-30 animate-ping"></div>
                  </div>
                </motion.div>

                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-3 leading-tight">
                  {(() => {
                    if (!currentOffer) return t("exclusiveDeal");
                    switch (language) {
                      case 'fr':
                        return currentOffer.title_fr || currentOffer.title;
                      case 'ar':
                        return currentOffer.title_ar || currentOffer.title;
                      default:
                        return currentOffer.title;
                    }
                  })()}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm lg:text-base xl:text-lg px-2 mb-4">
                  {(() => {
                    if (!currentOffer) return t("limitedTimeOffer");
                    switch (language) {
                      case 'fr':
                        return currentOffer.description_fr || currentOffer.description;
                      case 'ar':
                        return currentOffer.description_ar || currentOffer.description;
                      default:
                        return currentOffer.description;
                    }
                  })()}
                </p>

                {/* Countdown Timer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center gap-1 mt-3 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-3 py-3 rounded-full border border-orange-200 dark:border-orange-800/50"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                      {(() => {
                        const displayType = currentOffer?.timeRemainingDisplay;
                        switch (displayType) {
                          case "30s":
                            return t("offerEndsIn30Seconds");
                          case "12h":
                            return t("offerEndsIn12Hours");
                          case "24h":
                            return t("offerEndsIn24Hours");
                          case "48h":
                            return t("offerEndsIn48Hours");
                          case "72h":
                            return t("offerEndsIn72Hours");
                          case "custom":
                            return t("limitedTimeOfferText");
                          default:
                            return t("offerEndsSoon");
                        }
                      })()}
                    </span>
                  </div>

                  {/* Actual Countdown Timer */}
                  {timeRemaining > 0 && currentOffer?.timeRemainingDisplay !== "custom" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-orange-800 dark:text-orange-200 font-mono text-lg font-bold"
                    >
                      {formatTimeRemaining(timeRemaining)}
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Featured Products */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-4 xl:space-y-6 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-green-500 border-t-transparent rounded-full"
                    ></motion.div>
                  </div>
                ) : featuredProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <Tag className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {t("noOffersAvailable")}
                    </p>
                  </div>
                ) : (
                  featuredProducts.slice(0, 3).map((product, index) => {
                    const firstImage = product.gallery?.[0]?.asset?.url;
                    console.log('DiscountOfferPopup: Product image URL:', firstImage);
                    console.log('DiscountOfferPopup: Product gallery:', product.gallery);

                    return (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/50 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          {/* Product Image */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-inner flex-shrink-0">
                            {firstImage ? (
                              <Image
                                src={firstImage}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Tag className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm lg:text-base xl:text-lg mb-2 line-clamp-2 leading-tight">
                              {product.title}
                            </h3>

                            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 mb-3">
                              <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white">
                                {product.discountedPrice?.toFixed(2) || product.price} {t('currency') || 'DT'}
                              </span>
                              {product.discountedPrice && product.discountedPrice < product.price && (
                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                                  {product.price} {t('currency') || 'DT'}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                              <span className="text-xs font-semibold bg-green-100 dark:bg-green-800/50 text-green-700 dark:text-green-300 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded-full">
                                -{product.discountPercentage || 0}% OFF
                              </span>
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                {t("save")} {((product.price - (product.discountedPrice || product.price))).toFixed(2)} {t('currency') || 'DT'}
                              </span>
                            </div>
                          </div>

                          {/* Add to Cart Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCartWithDiscount(product, product.discountPercentage || 20)}
                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-200 flex-shrink-0"
                          >
                            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-4 sm:mt-6"
              >
                <p className="text-gray-500 dark:text-gray-400 text-xs flex items-center justify-center gap-2">
                  <span>{t("dontMissOut")}</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎁
                  </motion.span>
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="mt-3 px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-xl transition-all duration-200 font-medium border border-gray-200 dark:border-gray-600"
                >
                  {t("maybeLater")}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to manage popup state and triggers
export function useDiscountOfferPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('useDiscountOfferPopup: Hook initialized');
    // Show popup after 5 seconds or on scroll (200px) - for testing (change back to 30000 and 500 for production)
    const timer = setTimeout(() => {
      console.log('useDiscountOfferPopup: Timer triggered');
      const hasSeenDiscountPopup = sessionStorage.getItem("discountOfferShown");
      console.log('useDiscountOfferPopup: Has seen popup:', !!hasSeenDiscountPopup);
      if (!hasSeenDiscountPopup) {
        console.log('useDiscountOfferPopup: Opening popup');
        setIsOpen(true);
        sessionStorage.setItem("discountOfferShown", "true");
      }
    }, 5000); // 5 seconds for testing

    const handleScroll = () => {
      console.log('useDiscountOfferPopup: Scroll detected, Y:', window.scrollY);
      if (window.scrollY > 200) { // Reduced for testing (change back to 500 for production)
        console.log('useDiscountOfferPopup: Scroll threshold reached');
        const hasSeenDiscountPopup = sessionStorage.getItem("discountOfferShown");
        console.log('useDiscountOfferPopup: Has seen popup:', !!hasSeenDiscountPopup);
        if (!hasSeenDiscountPopup) {
          console.log('useDiscountOfferPopup: Opening popup via scroll');
          setIsOpen(true);
          sessionStorage.setItem("discountOfferShown", "true");
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return { isOpen, openPopup, closePopup };
}