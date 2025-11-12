"use client";
import { getSocialLinks, iconMap } from "@/lib/useQuery";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../public/tama.svg";
import Image from "next/image";
const footerLinks = {
  Company: [
    { name: "About", href: "/about" },
    { name: "Meet the Team", href: "#" },
    { name: "Careers", href: "#" },
  ],
  "Helpful Links": [
    { name: "Contact", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Live Chat", href: "#" },
  ],
  Legal: [
    { name: "Accessibility", href: "#" },
    { name: "Returns Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
  ],
};

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLinks() {
      const links = await getSocialLinks();
      setSocialLinks(links);
    }
    fetchLinks();
  }, []);

  return (
    <footer className="bg-white w-full max-w-7xl mx-auto px-6 py-12 rounded-3xl mb-6 shadow-luxury">
      <div className="mx-auto  space-y-10 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Logo + About */}
          <div>
            <Link
              href="/"
              className="flex items-center lg:justify-start justify-center mb-5"
            >
              <Image src={Logo} alt="Logo" width={150} height={150} />
            </Link>

            <p className="mt-4 max-w-xs text-black/80 text-sm leading-relaxed font-semibold flex items-center lg:justify-start justify-center lg:text-start text-center">
              Premium clothing brand for modern lifestyle. Crafted with passion,
              designed for comfort.
            </p>

            {/* Social Icons with animation */}
            <ul className="mt-10 flex gap-6 lg:justify-start justify-center items-center">
              {socialLinks.map((item, idx) => {
                const Icon = iconMap[item.icon?.toLowerCase()] || null;
                if (!Icon) return null;
                return (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black/60 hover:text-black transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      <Icon className="w-6 h-6" />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Dynamic Footer Links */}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-2 gap-8 md:items-center ">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="font-serif font-semibold text-white">{section}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-black/70 hover:text-black transition-colors font-semibold"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/30 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-black/60 font-semibold">
            &copy; {new Date().getFullYear()} Tama Clothing. All rights
            reserved.
          </p>
          <p className="text-xs text-black/60 mt-2 sm:mt-0 font-semibold">
            Made with ❤️ for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
