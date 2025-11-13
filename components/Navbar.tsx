"use client";

import Link from "next/link";
import { ShoppingBasket, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
const links = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/lookbooks", label: "Lookbooks" },
];

export default function Navbar() {
  const { cartItems } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 relative ${
        scrolled ? "shadow-md bg-white/70" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6 relative">
        {/* Hamburger menu */}
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden hover:cursor-pointer w-8 h-8 "
        >
          <CiMenuFries className="w-3 h-3  hover:text-black" />
        </Button>

        {/* Center Logo */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src="/tama.svg"
            alt="Tama Logo"
            width={150}
            height={150}
            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
          />
        </Link>

        {/* Right side nav */}
        <div className="flex items-center gap-6 ml-auto">
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-black text-sm font-semibold transition"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Cart */}
          <Link href="/cart" className="relative bg-white p-2 rounded-lg">
            <ShoppingBasket className="w-5 h-5 text-gray-700 hover:text-black" />
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.span
                  key={cartItems.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-60 bg-black/10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-0 top-0 w-80 h-screen bg-gradient-to-b from-white to-gray-50 backdrop-blur-lg shadow-2xl z-70 md:hidden border-r border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Image
                  src="/tama.svg"
                  alt="Tama Logo"
                  width={50}
                  height={50}
                  className="w-20 h-20"
                />
              </div>
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 rounded-full p-2"
              >
                <X className="w-6 h-6 text-gray-600" />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8">
              <div className="space-y-4">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-black text-lg font-medium transition-all duration-300 py-4 px-4 rounded-xl hover:bg-white hover:shadow-md group"
                    >
                      <span className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-black transition-colors"></span>
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">
                © {new Date().getFullYear()} Tama Shop
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
