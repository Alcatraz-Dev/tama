"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { CiMenuFries } from "react-icons/ci";
import Image from "next/image";
import Logo from "../public/tama.svg"
const links = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/lookbooks", label: "Lookbooks" },
];

export default function Navbar() {
  const { cartItems } = useCartStore();
  const [scrolled, setScrolled] = useState(false);

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
      className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${scrolled ? "shadow-md bg-white/70" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6 relative">
        {/* Hamburger menu */}
        <Button className="md:hidden hover:cursor-pointer w-8 h-8 ">
          <CiMenuFries className="w-3 h-3  hover:text-black" />
        </Button>

        {/* Center Logo */}
        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl tracking-wide font-indie-flower uppercase font-extrabold"
        >
          <Image
            src={Logo}
            alt="logo"
            className="md:w-[150px] md:h-[150px]  w-[100px] h-[100px]"

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
          <Link href="/cart" className={`relative  p-2 rounded-lg ${scrolled ? "bg-black" : " bg-white"}`}>
            <ShoppingBasket className={`w-5 h-5   ${scrolled ? " text-white hover:text-gray-700" : "text-gray-700 hover:text-black"}`} />
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.span
                  key={cartItems.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className={`absolute -top-2 -right-2  text-xs w-5 h-5 rounded-full flex items-center justify-center ${scrolled ? "bg-white text-black drop-shadow-2xl" : " bg-black text-white drop-shadow-2xl"}`}
                >
                  {cartItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}