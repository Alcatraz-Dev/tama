"use client";

import { useState } from "react";
import ReusablePopup from "./ReusablePopup";

// Simple test popup data
const testPopup = {
  _id: "quick-test",
  popupType: "exit_intent",
  active: true,
  translations: {
    en: {
      title: "Test Popup",
      subtitle: "This is a quick test of the reusable popup component with animations and styling.",
      ctaText: "Test CTA Button",
      incentive: "TEST20 - Test discount"
    },
    fr: {
      title: "Popup de Test",
      subtitle: "Ceci est un test rapide du composant popup réutilisable avec animations et style.",
      ctaText: "Bouton CTA de Test",
      incentive: "TEST20 - Remise de test"
    },
    ar: {
      title: "اختبار النوافذ المنبثقة",
      subtitle: "هذا اختبار سريع لمكون النوافذ المنبثقة القابل لإعادة الاستخدام مع الرسوم المتحركة والتصميم.",
      ctaText: "زر CTA للاختبار",
      incentive: "TEST20 - خصم تجريبي"
    }
  },
  design: {
    layoutType: "centered",
    showImage: false,
    themeColors: {
      primaryColor: { hex: "#DC2626" },
      secondaryColor: { hex: "#F59E0B" },
      backgroundColor: { hex: "#000000" }
    }
  },
  animation: {
    entranceAnimation: "fade_scale",
    exitAnimation: "fade_out",
    duration: 300,
    easing: "easeOut"
  },
  trigger: {
    triggerType: "exit_intent",
    maxDisplays: 3,
    displayFrequency: "once_per_session"
  },
  priority: 10,
  targetAudience: ["new_visitors"]
};

export default function PopupQuickTest() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCtaClick = () => {
    alert("CTA button clicked! Popup is working correctly.");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        style={{ fontSize: '14px' }}
      >
        🧪 Test Popup
      </button>

      {isOpen && (
        <ReusablePopup
          popup={testPopup}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );
}