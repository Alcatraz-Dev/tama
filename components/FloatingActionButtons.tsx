"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Star, Plus, X, MessageSquare } from "lucide-react";
import { useTranslation } from "@/lib/translationContext";
import { useDiscountOfferPopup } from "./DiscountOfferPopup";
import { useSpinningWheelPopup } from "./SpinningWheel";
import { useSpecialEventPopup } from "./SpecialEventClient";
import { useChatWidget } from "./ChatWidget";
import DiscountOfferPopup from "./DiscountOfferPopup";
import SpinningWheelPopup from "./SpinningWheel";
import SpecialEventPopup from "./SpecialEventPopup";
import ChatWidget from "./ChatWidget";

export default function FloatingActionButtons() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useTranslation();

  // Get hooks for controlling popups
  const { hasActiveOffers, isOpen: discountOpen, openPopup: openDiscountPopup, closePopup: closeDiscountPopup } = useDiscountOfferPopup();
  const { hasSpinsAvailable, isOpen: spinOpen, openPopup: openSpinPopup, closePopup: closeSpinPopup } = useSpinningWheelPopup();
  const { hasActiveEvent, isOpen: specialOpen, openPopup: openSpecialPopup, closePopup: closeSpecialPopup, currentEvent } = useSpecialEventPopup();
  const { isOpen: chatOpen, openChat, closeChat: closeChatWidget } = useChatWidget();

  const availableButtons = [
    hasSpinsAvailable ? {
      id: 'spin' as const,
      icon: <Star className="w-5 h-5" />,
      label: t('spin'),
      color: 'from-purple-500 to-pink-500',
      action: openSpinPopup
    } : null,
    hasActiveOffers ? {
      id: 'discount' as const,
      icon: <Gift className="w-5 h-5" />,
      label: t('exclusiveDeal'),
      color: 'from-green-500 to-emerald-500',
      action: openDiscountPopup
    } : null,
    hasActiveEvent ? {
      id: 'special' as const,
      icon: <Sparkles className="w-5 h-5" />,
      label: t('specialEvent'),
      color: 'from-orange-500 to-red-500',
      action: openSpecialPopup
    } : null,
    {
      id: 'chat' as const,
      icon: <MessageSquare className="w-5 h-5" />,
      label: t('liveSupport'),
      color: 'from-gray-600 to-gray-800',
      action: openChat
    }
  ].filter((button): button is NonNullable<typeof button> => button !== null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // If no buttons are available, don't show anything
  if (availableButtons.length === 0) return null;

  return (
    <>
      {/* Main FAB Button */}
      <motion.button
        onClick={toggleExpanded}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white font-bold ${
          isExpanded ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isExpanded ? 45 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Expanded Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 flex flex-col gap-3"
          >
            {availableButtons.map((button, index) => (
              <motion.button
                key={button.id}
                onClick={() => {
                  button.action();
                  setIsExpanded(false);
                }}
                className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white bg-gradient-to-r ${button.color} relative group`}
                initial={{
                  opacity: 0,
                  scale: 0,
                  y: 20,
                  rotate: -180
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotate: 0
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  y: 20,
                  rotate: 180
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {button.icon}

                {/* Tooltip */}
                <motion.div
                  className={`absolute right-full ml-8 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50`}
                  initial={{ x: language === 'ar' ? 10 : -10 }}
                  whileHover={{ x: 0 }}
                >
                  {button.label}
                  <div className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 right-[-4px] `}></div>
                </motion.div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Include existing popup components */}
      <DiscountOfferPopup isOpen={discountOpen} onClose={closeDiscountPopup} />
      <SpinningWheelPopup isOpen={spinOpen} onClose={closeSpinPopup} />
      <SpecialEventPopup isOpen={specialOpen} onClose={closeSpecialPopup} event={currentEvent} />
      <ChatWidget isOpen={chatOpen} onClose={closeChatWidget} />
    </>
  );
}