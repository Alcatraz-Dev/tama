"use client";

import Link from "next/link";
import { ShoppingBasket, Heart, X } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/translationContext";

const links = [
  { href: "/products", key: "products" },
  { href: "/categories", key: "categories" },
  { href: "/collections", key: "collections" },
  { href: "/about", key: "about" },
  { href: "/lookbooks", key: "lookbooks" },
];

export default function Navbar() {
  const { cartItems } = useCartStore();
  const { wishlistItems } = useWishlistStore();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        scrolled ? "shadow-md bg-background/70" : "bg-transparent"
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
            src={mounted && theme === "dark" ? "/tama-light.svg" : "/tama.svg"}
            alt="Tama Logo"
            width={150}
            height={150}
            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]"
          />
        </Link>

        {/* Right side nav */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto">
          <nav className="hidden md:flex gap-6">
            {links.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className="text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white text-sm font-semibold transition"
                >
                  {t(link.key as any)}
                </Link>
              </motion.div>
            ))}
          </nav>

          <ThemeToggle />

          <LanguageSwitcher />

          {/* Wishlist */}
          <Link href="/wishlist" className="relative bg-card p-1 sm:p-2 rounded-md sm:rounded-lg">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-700 dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-400" />
            <AnimatePresence>
              {wishlistItems.length > 0 && (
                <motion.span
                  key={wishlistItems.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-red-500 text-white text-[9px] sm:text-xs w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center"
                >
                  {wishlistItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative bg-card p-1 sm:p-2 rounded-md sm:rounded-lg">
            <ShoppingBasket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white" />
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.span
                  key={cartItems.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-black dark:bg-gray-600 text-white text-[9px] sm:text-xs w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center"
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
            className="fixed left-0 top-0 w-80 h-screen bg-gradient-to-b from-background to-muted backdrop-blur-lg shadow-2xl z-70 md:hidden border-r border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <Image
                  src={mounted && theme === "dark" ? "/tama-light.svg" : "/tama.svg"}
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
                className="hover:bg-zinc-100 rounded-full p-2"
              >
                <X className="w-6 h-6 text-zinc-600" />
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
                      className="flex items-center space-x-3 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white text-lg font-medium transition-all duration-300 py-4 px-4 rounded-xl hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md group"
                    >
                      <span className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full group-hover:bg-black dark:group-hover:bg-white transition-colors"></span>
                      <span>{t(link.key as any)}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-100 dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                &copy; {new Date().getFullYear()} Tama Clothing. All rights
                reserved.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
