"use client";

import React, { useEffect } from "react";
import SpinningWheelPopup, { useSpinningWheelPopup } from "./SpinningWheel";
import { useTranslation } from "@/lib/translationContext";

const segments = [
  { label: "25 Points", color: "#FF6B6B", probability: 0.20, points: 25, type: 'points' },
  { label: "Free Shipping", color: "#4ECDC4", probability: 0.15, type: 'free_shipping' },
  { label: "Try Again", color: "#45B7D1", probability: 0.25, type: 'try_again' },
  { label: "10% Off", color: "#FFA07A", probability: 0.15, discountPercentage: 10, type: 'discount' },
  { label: "50 Points", color: "#98D8C8", probability: 0.10, points: 50, type: 'points' },
  { label: "20% Off", color: "#F7DC6F", probability: 0.08, discountPercentage: 20, type: 'discount' },
  { label: "No Luck", color: "#BB8FCE", probability: 0.05, type: 'try_again' },
  { label: "15 Points", color: "#85C1E9", probability: 0.02, points: 15, type: 'points' },
];

export default function SpinningWheelClient() {
  const { isOpen, closePopup, openPopup } = useSpinningWheelPopup();
  const { t, language } = useTranslation();

  return (
    <>
      <SpinningWheelPopup isOpen={isOpen} onClose={closePopup} />
      <button
        onClick={openPopup}
        className={`fixed bottom-32 ${language === 'ar' ? 'left-4' : 'right-4'} z-40 w-12 h-12 mx-4 rounded-full border-2 border-white/50 shadow-2xl hover:scale-110 transition-all flex items-center justify-center animate-spin lg:animate-none lg:hover:animate-spin`}
        style={{
          background: `conic-gradient(${segments
            .map((seg, i) => `${seg.color} ${i * (360 / segments.length)}deg ${(i + 1) * (360 / segments.length)}deg`)
            .join(", ")})`,
        }}
        title="Spin the Wheel"
      >
        <span className="text-xs text-black font-bold">{t('spin')}</span>
      </button>
    </>
  );
}
