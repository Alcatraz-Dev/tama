"use client";

import React, { useEffect } from "react";
import DiscountOfferPopup, { useDiscountOfferPopup } from "./DiscountOfferPopup";

export default function DiscountOfferClient() {
  const { isOpen, closePopup, openPopup } = useDiscountOfferPopup();

  // For testing: expose openPopup to window for console testing
  if (typeof window !== 'undefined') {
    (window as any).testDiscountPopup = openPopup;
    (window as any).debugDiscountPopup = () => {
      console.log('Discount popup debug:');
      console.log('- isOpen:', isOpen);
      console.log('- Session shown:', sessionStorage.getItem('discountOfferShown'));
      console.log('- Can open:', !sessionStorage.getItem('discountOfferShown'));
    };
  }

  return (
    <DiscountOfferPopup isOpen={isOpen} onClose={closePopup} />
  );
}