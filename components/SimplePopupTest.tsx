"use client";

import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import ReusablePopup from "./ReusablePopup";

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
  targetAudience: string[];
}

interface PopupTranslation {
  title: string;
  subtitle: string;
  ctaText: string;
  incentive?: string;
}

export default function SimplePopupTest() {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [selectedPopup, setSelectedPopup] = useState<PopupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "popup" && active == true] | order(priority desc) {
            _id,
            popupType,
            active,
            translations,
            design{
              layoutType,
              showImage,
              backgroundImage,
              themeColors
            },
            animation,
            trigger,
            selectedProducts[]->{
              _id,
              title,
              gallery[]{
                asset->{
                  url
                }
              },
              price,
              slug
            },
            priority,
            targetAudience,
            createdAt,
            internalNotes
          }
        `);
        console.log('Fetched popups:', data); // Debug log
        setPopups(data || []);
      } catch (error) {
        console.error('Error fetching popups:', error);
        setPopups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopups();
  }, []);

  const handleCtaClick = () => {
    alert(`CTA clicked for ${selectedPopup?.popupType} popup!`);
    setSelectedPopup(null);
  };

  if (loading) {
    return (
      <button
        className="fixed bottom-4 right-4 z-50 bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg font-bold text-lg cursor-not-allowed"
        disabled
      >
        ⏳ Loading...
      </button>
    );
  }

  if (popups.length === 0) {
    return (
      <button
        className="fixed bottom-4 right-4 z-50 bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg font-bold text-lg cursor-not-allowed"
        disabled
        title="Create popups in Sanity Studio first"
      >
        📝 No Popups
      </button>
    );
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setSelectedPopup(popups[0])} // Show highest priority popup
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors font-bold text-lg"
          style={{
            backgroundColor: '#2563EB',
            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)'
          }}
        >
          🎯 Test Popup ({popups.length})
        </button>

        {popups.length > 1 && (
          <select
            onChange={(e) => {
              const popup = popups.find(p => p._id === e.target.value);
              if (popup) setSelectedPopup(popup);
            }}
            className="bg-white border border-gray-300 rounded px-3 py-1 text-sm shadow-lg"
          >
            <option value="">Choose popup to test...</option>
            {popups.map((popup) => (
              <option key={popup._id} value={popup._id}>
                {popup.popupType.replace('_', ' ')} (Priority: {popup.priority})
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedPopup && (
        <ReusablePopup
          popup={selectedPopup}
          isOpen={true}
          onClose={() => setSelectedPopup(null)}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );
}