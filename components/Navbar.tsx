"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useState, useEffect } from "react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { cartItems } = useCartStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // 👈 change bg after scrolling 20px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? " shadow-md backdrop-blur-sm bg-white/60" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Hamburger menu */}
        <button className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H7.5"
            />
          </svg>
        </button>

        {/* Small Logo */}
       <button className="md:flex hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H7.5"
            />
          </svg>
        </button>

        {/* Center Logo */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl tracking-wide font-indie-flower uppercase font-extrabold"
        >
          Tama
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-20 ml-auto">
          {/* Right side nav */}
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-black font-semibold transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <Link href="/cart" className="relative bg-white p-2 rounded-lg">
            <ShoppingBasket className="w-4 h-4 text-gray-700 hover:text-black" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}