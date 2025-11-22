  "use client";

import { useState, useEffect, useCallback } from "react";
import SpecialEventPopup from "./SpecialEventPopup";

interface SpecialEvent {
  _id: string;
  eventName: string;
  eventName_fr?: string;
  eventName_ar?: string;
  eventType: string;
  headline: string;
  headline_fr?: string;
  headline_ar?: string;
  description?: string;
  description_fr?: string;
  description_ar?: string;
  startDate: string;
  endDate: string;
  eventFeatures?: any[];
  themeColors: {
    primaryColor: string | { hex: string };
    secondaryColor: string | { hex: string };
    backgroundColor: string | { hex: string };
  };
  discountProducts?: Array<{
    product: {
      _id: string;
      title: string;
      price: number;
      gallery?: Array<{
        asset: {
          url: string;
        };
      }>;
      slug: {
        current: string;
      };
    };
    discountType: string;
    discountValue: number;
    maxDiscountAmount?: number;
    customImage?: {
      asset: {
        url: string;
      };
    };
  }>;
  advancedSettings?: {
    popupDelay?: number;
    scrollTrigger?: number;
    maxDisplays?: number;
    priority?: number;
    mainImage?: {
      asset: {
        url: string;
      };
    };
    backgroundPattern?: string;
  };
  isActive?: string;
}

// Hook to manage special event popup state
export function useSpecialEventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<SpecialEvent | null>(null);
  const [hasActiveEvent, setHasActiveEvent] = useState(false);

  // Function to check for active special events
  const checkActiveEvents = useCallback(async () => {
    try {
      const query = `*[_type == "specialEvent"] {
        _id,
        eventName,
        eventName_fr,
        eventName_ar,
        eventType,
        headline,
        headline_fr,
        headline_ar,
        description,
        description_fr,
        description_ar,
        startDate,
        endDate,
        eventFeatures,
        themeColors,
        mainImage,
        backgroundPattern,
        discountProducts[] {
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
        },
        advancedSettings {
          popupDelay,
          scrollTrigger,
          maxDisplays,
          priority,
          mainImage,
          backgroundPattern,
        },
        isActive,
        priority,
        eventId,
        trackingCode,
        metadata,
        eventTemplate,
        themePreset,
        featuresTemplate
      } | order(priority desc, _createdAt desc)`;

      const response = await fetch(
        `/api/special-events?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.events && data.events.length > 0) {
        const now = new Date();

        // Find the highest priority active event
        const activeEvent = data.events.find((event: SpecialEvent) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          const isActive =
            event.isActive === "active" ||
            event.isActive === undefined ||
            event.isActive === null;
          const isValidDateRange = startDate <= now && endDate > now;
          return isActive && isValidDateRange;
        });

        if (activeEvent) {
          setCurrentEvent(activeEvent);
          setHasActiveEvent(true);
          return activeEvent;
        }
      }

      setCurrentEvent(null);
      setHasActiveEvent(false);
      return null;
    } catch (error) {
      console.error("Failed to check active special events:", error);
      setCurrentEvent(null);
      setHasActiveEvent(false);
      return null;
    }
  }, []);

  useEffect(() => {
    // Check for active events first
    checkActiveEvents().then((activeEvent) => {
      if (!activeEvent) {
        return;
      }

      const event = activeEvent as SpecialEvent;
      const advancedSettings = event.advancedSettings || {};
      const popupDelay = advancedSettings.popupDelay || 10; // Default 10 seconds
      const scrollTrigger = advancedSettings.scrollTrigger || 300; // Default 300px

      // Function to show popup
      const showPopup = () => {
        const hasSeenPopup = sessionStorage.getItem(
          `specialEventSeen_${event._id}`
        );
        const maxDisplays = advancedSettings.maxDisplays || 3;
        const currentDisplays = parseInt(
          sessionStorage.getItem(`specialEventDisplays_${event._id}`) || "0"
        );

        if (!hasSeenPopup || currentDisplays < maxDisplays) {
          setIsOpen(true);
          sessionStorage.setItem(`specialEventSeen_${event._id}`, "true");
          sessionStorage.setItem(
            `specialEventDisplays_${event._id}`,
            (currentDisplays + 1).toString()
          );
        }
      };

      // Set up popup triggers based on advanced settings
      const timer = setTimeout(() => {
        showPopup();
      }, popupDelay * 1000);

      const handleScroll = () => {
        if (window.scrollY > scrollTrigger) {
          showPopup();
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    });
  }, [checkActiveEvents]);

  // Listen for localStorage changes to update event availability
  useEffect(() => {
    const handleStorageChange = () => {
      checkActiveEvents();
    };

    // Check periodically for localStorage changes (since storage events don't fire for same-tab changes)
    const interval = setInterval(() => {
      checkActiveEvents();
    }, 1000); // Check every second

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkActiveEvents]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return { isOpen, openPopup, closePopup, hasActiveEvent, currentEvent };
}

export default function SpecialEventClient() {
  const { isOpen, closePopup, currentEvent } = useSpecialEventPopup();

  return (
    <SpecialEventPopup
      isOpen={isOpen}
      onClose={closePopup}
      event={currentEvent}
    />
  );
}
