"use client";
import { getSocialLinks, iconMap } from "@/lib/useQuery";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SocialLink } from "@/lib/types";
import { useTheme } from "next-themes";
import { useTranslation } from "@/lib/translationContext";
export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  const footerLinks = {
    [t('company')]: [
      { name: t('about'), href: "/about" },
      { name: t('meetTheTeam'), href: "#" },
      { name: t('careers'), href: "#" },
    ],
    [t('helpfulLinks')]: [
      { name: t('contact'), href: "#" },
      { name: t('faqs'), href: "#" },
      { name: t('liveChat'), href: "#" },
    ],
    [t('legal')]: [
      { name: t('accessibility'), href: "#" },
      { name: t('returnsPolicy'), href: "#" },
      { name: t('refundPolicy'), href: "#" },
      { name: t('termsAndConditions'), href: "#" },
    ],
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchLinks() {
      const links = await getSocialLinks();
      setSocialLinks(links);
    }
    fetchLinks();
  }, []);

  return (
    <footer className="bg-card w-full max-w-7xl mx-auto px-6 py-12 rounded-3xl mb-6 shadow-luxury">
      <div className="mx-auto  space-y-10 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Logo + About */}
          <div>
            <Link
              href="/"
              className="flex items-center lg:justify-start justify-center mb-5"
            >
              <Image src={mounted && theme === "dark" ? "/tama-light.svg" : "/tama.svg"} alt="Logo" width={130} height={130} />
            </Link>

            <p className="mt-4 max-w-xs text-black/80 dark:text-gray-300 text-sm leading-relaxed font-semibold flex items-center lg:justify-start justify-center lg:text-start text-center">
              {t('footerDescription')}
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
                      className="text-black/60 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      <span className="w-6 h-6">
                        <Icon />
                      </span>
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
                <p className="font-semibold text-black dark:text-white">{section}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-semibold"
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
        <div className="pt-6 border-t border-black/30 dark:border-gray-600 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-black/60 dark:text-gray-400 font-semibold">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-black/60 dark:text-gray-400 mt-2 sm:mt-0 font-semibold">
            {t('madeWithLove')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
