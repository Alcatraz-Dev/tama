"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Star, Gift, Sparkles, Triangle } from "lucide-react";
import { useLoyaltyStore } from "@/store/loyalty";
import { useTranslation } from "@/lib/translationContext";
import { TranslationKey } from "@/lib/translations";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import ProductSelectionPopup from "./ProductSelectionPopup";

interface Segment {
  label: string;
  color: string;
  probability: number;
  points?: number;
  discountPercentage?: number;
  type: "points" | "discount" | "try_again" | "free_shipping";
}

interface SpinningWheelPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpinningWheelPopup({
  isOpen,
  onClose,
}: SpinningWheelPopupProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Segment | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(3);
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const { points, addSpinPoints, getTier } = useLoyaltyStore();
  const { language, t } = useTranslation();
  const { theme } = useTheme();

  const segments: Segment[] = [
    {
      label: t("25Points"),
      color: "#FF6B6B",
      probability: 0.2,
      points: 25,
      type: "points",
    },
    {
      label: t("freeShippingLabel"),
      color: "#4ECDC4",
      probability: 0.15,
      type: "free_shipping",
    },
    {
      label: t("tryAgain"),
      color: "#45B7D1",
      probability: 0.25,
      type: "try_again",
    },
    {
      label: t("10PercentOff"),
      color: "#FFA07A",
      probability: 0.15,
      discountPercentage: 10,
      type: "discount",
    },
    {
      label: t("50Points"),
      color: "#98D8C8",
      probability: 0.1,
      points: 50,
      type: "points",
    },
    {
      label: t("20PercentOff"),
      color: "#F7DC6F",
      probability: 0.08,
      discountPercentage: 20,
      type: "discount",
    },
    {
      label: t("noLuck"),
      color: "#BB8FCE",
      probability: 0.05,
      type: "try_again",
    },
    {
      label: t("15Points"),
      color: "#85C1E9",
      probability: 0.02,
      points: 15,
      type: "points",
    },
  ];

  // Handle responsive text positioning
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Reset spins daily and load from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem("spinResetDate");
    const savedSpins = localStorage.getItem("spinsLeft");

    if (lastReset !== today) {
      // New day - reset spins
      setSpinsLeft(3);
      localStorage.setItem("spinResetDate", today);
      localStorage.setItem("spinsLeft", "3");
    } else {
      // Same day - load remaining spins from localStorage
      const remainingSpins = savedSpins ? parseInt(savedSpins, 10) : 3;
      setSpinsLeft(remainingSpins);
    }
  }, []);

  // Save spins to localStorage
  useEffect(() => {
    localStorage.setItem("spinsLeft", spinsLeft.toString());
  }, [spinsLeft]);

  const spinWheel = () => {
    if (isSpinning || spinsLeft <= 0) return;

    setIsSpinning(true);
    setResult(null);

    // Calculate weighted random segment
    const random = Math.random();
    let cumulativeProbability = 0;
    let selectedSegmentIndex = 0;

    for (let i = 0; i < segments.length; i++) {
      cumulativeProbability += segments[i].probability;
      if (random <= cumulativeProbability) {
        selectedSegmentIndex = i;
        break;
      }
    }

    // Calculate rotation
    const segmentAngle = 360 / segments.length;
    const selectedAngle = selectedSegmentIndex * segmentAngle;
    const randomSpins = Math.floor(Math.random() * 5) + 5; // 5-10 full spins
    const totalRotation =
      randomSpins * 360 + (360 - selectedAngle - segmentAngle / 2);

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }

    // Set result after animation
    setTimeout(() => {
      const wonSegment = segments[selectedSegmentIndex];
      setResult(wonSegment);
      setSpinsLeft((prev) => prev - 1);

      // Handle different reward types
      if (wonSegment.points) {
        addSpinPoints(wonSegment.points, wonSegment.label);
        toast.success(
          `🎉 ${t("youWon")}: ${wonSegment.points} ${t("points")}!`,
          {
            description: t("pointsAdded"),
          }
        );
      } else if (wonSegment.discountPercentage) {
        setSelectedDiscount(wonSegment.discountPercentage);
        setShowProductSelection(true);
      } else if (wonSegment.type === "free_shipping") {
        toast.success(`🎉 ${t("youWon")}: ${wonSegment.label}!`, {
          description: t("freeShippingApplied"),
        });
      }

      setIsSpinning(false);
    }, 3000);
  };

  const handleProductSelectionComplete = () => {
    setShowProductSelection(false);
    setSelectedDiscount(0);
    toast.success(t("discountApplied"));
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "goldTier":
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case "silverTier":
        return <Star className="w-5 h-5 text-gray-400" />;
      case "bronzeTier":
        return <Star className="w-5 h-5 text-amber-600" />;
      default:
        return <Gift className="w-5 h-5 text-gray-500" />;
    }
  };

  const currentTier = getTier(points);

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modern glassmorphism background */}
            <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 via-orange-500 to-yellow-500 opacity-20 animate-pulse"></div>
              <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-gray-900/95"></div>

              <div className="relative p-4 sm:p-6 md:p-8 lg:p-6">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110 shadow-lg"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-4">
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
                    className="inline-block mb-3 sm:mb-4 lg:mb-2"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-ping"></div>
                    </div>
                  </motion.div>

                  <h2 className="text-2xl sm:text-3xl lg:text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2 leading-tight">
                    {t("spinTheWheel")}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-sm px-2">
                    {t("spinDescription")}
                  </p>
                </div>

                {/* User Status & Points */}
                <div className="flex flex-row justify-center items-center gap-2 sm:gap-3 lg:gap-2 mb-6 sm:mb-8 lg:mb-0 flex-wrap">
                  {/* Tier Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 px-3 sm:px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800/50 shadow-sm"
                  >
                    {getTierIcon(currentTier)}
                    <span className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-200 capitalize">
                      {t(currentTier as TranslationKey)}
                    </span>
                  </motion.div>

                  {/* Points Display */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                  >
                    <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-bold text-sm sm:text-base">
                      {points.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm opacity-90">
                      {t("points")}
                    </span>
                  </motion.div>

                  {/* Spins Left */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 text-white px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
                  >
                    <span className="font-bold text-sm sm:text-base">
                      🎯 {spinsLeft}
                    </span>
                    <span className="text-xs sm:text-sm opacity-90">
                      {t("spins")}
                    </span>
                  </motion.div>

                  {/* Triangle pointer fixed at top */}
                  <Triangle
                    className="absolute top-[285px] sm:top-[285px] md:top-[367px] lg:top-[294px] left-1/2 transform -translate-x-1/2 rotate-180 w-6 h-6 sm:w-8 sm:h-8 text-red-500 z-50"
                    fill="currentColor"
                  />
                </div>
                {/* Wheel Container */}
                <div
                  className="relative flex justify-center items-center mb-6 sm:mb-8 lg:mb-0 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
                  style={{ aspectRatio: "1" }}
                >
                  {/* Wheel */}
                  <motion.div
                    ref={wheelRef}
                    className="w-full h-full max-w-64 max-h-64 lg:max-w-80 lg:max-h-80 rounded-full border-4 border-white/50 dark:border-gray-700/50 relative overflow-hidden shadow-2xl"
                    style={{
                      background: `conic-gradient(${segments
                        .map(
                          (seg, i) =>
                            `${seg.color} ${i * (360 / segments.length)}deg ${(i + 1) * (360 / segments.length)}deg`
                        )
                        .join(", ")})`,
                      transition:
                        "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      boxShadow:
                        "0 25px 50px rgba(0,0,0,0.25), inset 0 0 30px rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Inner circle with modern design */}
                    <div className="absolute inset-4 bg-gradient-to-br from-gray-800/10 via-gray-900/30 to-gray-800/30 dark:from-gray-800/10 dark:via-gray-900/80 dark:to-gray-800/90 rounded-full flex items-center justify-center shadow-inner">
                      <div className="w-full h-full rounded-full border-2 border-gray-200/50 dark:border-gray-600/50 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Segment labels - positioned to rotate with the wheel */}
                    {segments.map((segment, index) => {
                      const angle = (index * 360) / segments.length;
                      const segmentAngle = 360 / segments.length;
                      const textAngle = angle + segmentAngle / 2;

                      // Text color based on theme: black in light mode, white in dark mode
                      const textColor =
                        theme === "dark" ? "#FFFFFF" : "#FFFFFF";

                      // Position text at segment angle - larger radius on large screens
                      const radius = isLargeScreen ? 85 : 75; // 85px on lg+, 75px on smaller screens
                      const radian = (textAngle * Math.PI) / 180;
                      const x = Math.sin(radian) * radius;
                      const y = -Math.cos(radian) * radius;

                      return (
                        <div
                          key={index}
                          className="absolute pointer-events-none"
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${textAngle + 90}deg)`,
                            zIndex: 10,
                          }}
                        >
                          <div
                            className="font-bold drop-shadow-lg text-center"
                            style={{
                              whiteSpace: "nowrap",
                              textShadow: `2px 2px 4px rgba(0,0,0,0.9)`,
                              fontSize: "clamp(6px, 1.5vw, 9px)",
                              color: textColor,
                              maxWidth: "50px",
                              lineHeight: "1.1",
                            }}
                          >
                            {segment.label}
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Spin Button */}
                <div className="text-center mb-4 sm:mb-6 lg:mb-0">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={spinWheel}
                    disabled={isSpinning || spinsLeft <= 0}
                    className={`relative px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl lg:text-lg transition-all duration-300 shadow-xl overflow-hidden ${
                      isSpinning || spinsLeft <= 0
                        ? "bg-gray-400 cursor-not-allowed text-gray-200"
                        : "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white shadow-purple-500/30"
                    }`}
                  >
                    {/* Animated background effect */}
                    {!(isSpinning || spinsLeft <= 0) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    )}

                    <span className="relative flex items-center justify-center gap-2 sm:gap-3">
                      {isSpinning ? (
                        <>
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            {t("spinning")}
                          </motion.span>
                        </>
                      ) : spinsLeft <= 0 ? (
                        <>
                          <span className="text-sm sm:text-base">
                            {t("noSpinsLeft")}
                          </span>
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-lg sm:text-xl"
                          >
                            🎯
                          </motion.span>
                          <span>{t("spin")}</span>
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>

                {/* Result */}
                <AnimatePresence>
                  {result && !showProductSelection && (
                    <motion.div
                      initial={{ scale: 0.8, y: 30, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.8, y: 30, opacity: 0 }}
                      transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 200,
                      }}
                      className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 border border-green-200/50 dark:border-green-700/50 rounded-2xl p-4 sm:p-6 lg:p-2 lg:my-2 text-center shadow-xl backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                        className="text-3xl sm:text-4xl lg:text-2xl mb-3 lg:mb-2"
                      >
                        🎉
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg sm:text-xl lg:text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
                      >
                        {t("youWon")}!
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-base sm:text-lg lg:text-sm font-semibold text-green-700 dark:text-green-300 mb-2"
                      >
                        {result.label}
                      </motion.p>

                      {result.points && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 }}
                          className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-800/50 px-3 py-1 lg:px-2 lg:py-1 rounded-full"
                        >
                          <span className="text-green-600 dark:text-green-400 font-bold">
                            +{result.points}
                          </span>
                          <span className="text-green-600 dark:text-green-400 text-sm">
                            {t("points")}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center mt-4 sm:mt-6 lg:mt-2"
                  dir={language === "ar" ? "rtl" : "ltr"}
                >
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm lg:text-xs flex items-center justify-center gap-2">
                    <span>{t("comeBackTomorrow")}</span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎁
                    </motion.span>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Product Selection Popup */}
      <ProductSelectionPopup
        isOpen={showProductSelection}
        discountPercentage={selectedDiscount}
        onClose={() => setShowProductSelection(false)}
        onComplete={handleProductSelectionComplete}
      />
    </>
  );
}

// Hook to manage popup state and triggers
export function useSpinningWheelPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSpinsAvailable, setHasSpinsAvailable] = useState<boolean | null>(null);

  // Function to check for available spins
  const checkSpinsAvailable = useCallback(() => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem("spinResetDate");
    const savedSpins = localStorage.getItem("spinsLeft");

    let spinsLeft = 0;
    if (lastReset !== today) {
      // New day - reset spins
      spinsLeft = 3;
      localStorage.setItem("spinResetDate", today);
      localStorage.setItem("spinsLeft", "3");
    } else {
      // Same day - load remaining spins from localStorage
      spinsLeft = savedSpins ? parseInt(savedSpins, 10) : 3;
    }

    const available = spinsLeft > 0;
    setHasSpinsAvailable(available);
    return available;
  }, []);

  useEffect(() => {
    // Check for available spins first
    const hasSpins = checkSpinsAvailable();
    if (!hasSpins) {
      console.log('useSpinningWheelPopup: No spins available, skipping popup');
      return;
    }

    // Show popup after 15 seconds or on scroll (300px)
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("spinningWheelShown");
      if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem("spinningWheelShown", "true");
      }
    }, 15000);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        const hasSeenPopup = sessionStorage.getItem("spinningWheelShown");
        if (!hasSeenPopup) {
          setIsOpen(true);
          sessionStorage.setItem("spinningWheelShown", "true");
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

  // Listen for localStorage changes to update spin availability
  useEffect(() => {
    const handleStorageChange = () => {
      checkSpinsAvailable();
    };

    // Check periodically for localStorage changes (since storage events don't fire for same-tab changes)
    const interval = setInterval(() => {
      checkSpinsAvailable();
    }, 1000); // Check every second

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkSpinsAvailable]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return { isOpen, openPopup, closePopup, hasSpinsAvailable };
}
