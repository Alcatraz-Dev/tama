"use client";

import React from "react";
import DiscountOfferPopup, { useDiscountOfferPopup } from "./DiscountOfferPopup";
import { useTranslation } from "@/lib/translationContext";

export default function DiscountOfferClient() {
  const { isOpen, closePopup, openPopup, hasActiveOffers } = useDiscountOfferPopup();
  const { language } = useTranslation();
  // For testing: expose openPopup to window for console testing
  if (typeof window !== 'undefined') {
    (window as any).testDiscountPopup = openPopup;
    (window as any).debugDiscountPopup = () => {
      console.log('Discount popup debug:');
      console.log('- isOpen:', isOpen);
      console.log('- Session shown:', sessionStorage.getItem('discountOfferShown'));
      console.log('- Can open:', !sessionStorage.getItem('discountOfferShown'));
    };

    // Add a visible test element
    console.log('🟢 DiscountOfferClient component mounted');
  }

  return (
    <>
      {/* Invisible test element for debugging */}
      <div
        style={{ display: 'none' }}
        data-discount-popup="mounted"
        data-is-open={isOpen}
      />

      {/* Test button for manual popup trigger - only show when active offers exist */}
      {hasActiveOffers && (
        <button
          onClick={openPopup}
          className={`fixed bottom-20 ${language === 'ar' ? 'right-4 ' : 'left-4'} z-40 w-12 h-12 mx-4 rounded-full border-2 border-white/50 shadow-2xl hover:scale-110 transition-all flex items-center justify-center animate-bounce lg:animate-none lg:hover:animate-bounce bg-gradient-to-r from-green-500 to-emerald-500`}
          style={{
            background: `conic-gradient(from 45deg, #10b981, #059669, #047857, #065f46, #10b981)`,
          }}
          title="Test Discount Offer Popup"
        >
          <span className="text-xs text-white font-bold">💰</span>
        </button>
      )}

      <DiscountOfferPopup isOpen={isOpen} onClose={closePopup} />
    </>
  );
}