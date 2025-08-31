"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} // replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}