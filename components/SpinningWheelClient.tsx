"use client";

import React from "react";
import SpinningWheelPopup, { useSpinningWheelPopup } from "./SpinningWheel";
import { useTranslation } from "@/lib/translationContext";

export default function SpinningWheelClient() {
  const { isOpen, closePopup, openPopup, hasSpinsAvailable } = useSpinningWheelPopup();
  const { t, language } = useTranslation();

  return (
    <>
      <SpinningWheelPopup isOpen={isOpen} onClose={closePopup} />
      {hasSpinsAvailable === true && (
        <button
          onClick={openPopup}
          className={`fixed bottom-[115px]  ${language === 'ar' ? 'left-4' : 'right-4'} z-40 w-12 h-12 mx-4 rounded-full border-2 border-white/50 shadow-2xl hover:scale-110 transition-all flex items-center justify-center animate-spin lg:animate-none lg:hover:animate-spin bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500`}
          title="Spin the Wheel"
        >
          <span className="text-xs text-white font-bold">{t('spin')}</span>
        </button>
      )}
    </>
  );
}
