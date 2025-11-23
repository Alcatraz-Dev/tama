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

export default function PopupManager() {
  const [activePopup, setActivePopup] = useState<PopupData | null>(null);
  const [shownPopups, setShownPopups] = useState<Set<string>>(new Set());
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Fetch active popups from Sanity
  useEffect(() => {
    const fetchActivePopups = async () => {
      try {
        const popups = await client.fetch(`
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

        // Get session storage for shown popups
        const sessionShown = new Set<string>(
          JSON.parse(sessionStorage.getItem('shownPopups') || '[]')
        );
        setShownPopups(sessionShown);

        // Find the highest priority popup that hasn't been shown
        const availablePopup = popups.find((popup: PopupData) => {
          const displayKey = `${popup._id}_${popup.trigger.displayFrequency}`;

          if (popup.trigger.displayFrequency === 'always') {
            return true;
          }

          if (popup.trigger.displayFrequency === 'once_per_session') {
            return !sessionShown.has(displayKey);
          }

          if (popup.trigger.displayFrequency === 'once_per_day') {
            const today = new Date().toDateString();
            return !sessionShown.has(`${displayKey}_${today}`);
          }

          return false;
        });

        if (availablePopup) {
          // Check if we should show based on trigger
          const shouldShow = checkTrigger(availablePopup.trigger);
          if (shouldShow) {
            setActivePopup(availablePopup);
          }
        }
      } catch (error) {
        console.error('Error fetching popups:', error);
      }
    };

    fetchActivePopups();
  }, []);

  // Scroll listener for scroll-based triggers
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercentage(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Time-based triggers
  useEffect(() => {
    if (!activePopup) return;

    if (activePopup.trigger.triggerType === 'time_delay' && activePopup.trigger.delayMs) {
      const timer = setTimeout(() => {
        setActivePopup(activePopup);
      }, activePopup.trigger.delayMs);

      return () => clearTimeout(timer);
    }
  }, [activePopup]);

  // Check if popup should be triggered
  const checkTrigger = (trigger: PopupData['trigger']): boolean => {
    switch (trigger.triggerType) {
      case 'scroll_percentage':
        return scrollPercentage >= (trigger.scrollPercentage || 0);

      case 'time_delay':
        // Handled in useEffect above
        return false;

      case 'exit_intent':
        // Would need mouse tracking - for now, trigger on scroll near bottom
        return scrollPercentage > 80;

      case 'cart_threshold':
        // Would need cart context - for now, return false
        return false;

      case 'purchase_complete':
        // Would need purchase tracking - for now, return false
        return false;

      case 'page_load':
      default:
        return true;
    }
  };

  const handleClose = () => {
    if (activePopup) {
      // Mark as shown
      const displayKey = `${activePopup._id}_${activePopup.trigger.displayFrequency}`;
      const newShown = new Set(shownPopups);
      newShown.add(displayKey);

      // Update session storage
      sessionStorage.setItem('shownPopups', JSON.stringify([...newShown]));
      setShownPopups(newShown);
    }
    setActivePopup(null);
  };

  const handleCtaClick = () => {
    // Handle CTA action based on popup type
    console.log('CTA clicked for popup:', activePopup?.popupType);

    // Close popup
    handleClose();

    // Add specific actions based on popup type
    switch (activePopup?.popupType) {
      case 'exit_intent':
        // Could redirect to cart or offer page
        break;
      case 'limited_time_offer':
        // Could redirect to sale page
        break;
      case 'free_shipping_threshold':
        // Could redirect to cart
        break;
      case 'post_purchase_upsell':
        // Could redirect to product page
        break;
    }
  };

  if (!activePopup) return null;

  return (
    <ReusablePopup
      popup={activePopup}
      isOpen={true}
      onClose={handleClose}
      onCtaClick={handleCtaClick}
    />
  );
}