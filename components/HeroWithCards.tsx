"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getHeroCards } from "@/lib/useQuery";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/translationContext";

interface Card {
  type: "text" | "image";
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  withButton?: boolean;
  withIcon?: boolean;
  icon?: React.ReactNode;
  image?: string;
  variant?: "large" | "small"; // top row large, bottom row small
}

export default function HeroWithCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const { t, language } = useTranslation();

  useEffect(() => {
    getHeroCards().then(setCards);
  }, []);

  function CardRenderer({ card }: { card: Card }) {
    const cardMotion = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    };

    if (card.type === "text") {
      return (
        <motion.div
          variants={cardMotion}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className={`flex flex-col justify-center bg-card text-black dark:text-white font-semibold rounded-4xl shadow-luxury ${
            card.variant === "large" ? "p-12 min-h-[300px] md:min-h-[400px]" : "p-8 min-h-[200px] md:min-h-[250px]"
          }`}
          whileHover={{ scale: 1.03 }}
        >
          {(language === 'en' ? card.title : (card[`title_${language}` as keyof typeof card] as string) || card.title) && (
            <h2
              className={` font-bold mb-3 text-black dark:text-white  ${
                card.variant === "large"
                  ? "text-3xl md:text-4xl"
                  : "text-2xl text-center max-w-[200px] mx-auto"
              }`}
            >
              {language === 'en' ? card.title : (card[`title_${language}` as keyof typeof card] as string) || card.title}
            </h2>
          )}

          {(language === 'en' ? card.subtitle : (card[`subtitle_${language}` as keyof typeof card] as string) || card.subtitle) && (
            <p className="text-black dark:text-gray-300 font-semibold/80 mb-4 mt-6 font-medium">
              {language === 'en' ? card.subtitle : (card[`subtitle_${language}` as keyof typeof card] as string) || card.subtitle}
            </p>
          )}

          {card.withButton && (language === 'en' ? card.buttonText : (card[`buttonText_${language}` as keyof typeof card] as string) || card.buttonText) && card.buttonLink && (
            <Link
              href={card.buttonLink}
              className={`flex gap-2  ${card.variant === "large" ? "mt-8" : "mt-4 flex items-center justify-center"}`}
            >
              <Button
                aria-label={language === 'en' ? card.buttonText : (card[`buttonText_${language}` as keyof typeof card] as string) || card.buttonText}
                className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full hover:bg-black/90 dark:hover:bg-gray-200 transition-all duration-300 hover:cursor-pointer font-semibold "
              >
                {language === 'en' ? card.buttonText : (card[`buttonText_${language}` as keyof typeof card] as string) || card.buttonText}
              </Button>

              {card.withIcon && (
                <Button className="inline-flex items-center gap-2  bg-black dark:bg-white text-white dark:text-black  px-4 py-3 rounded-full hover:bg-black/90 transition-all duration-300 -rotate-45 hover:rotate-0 hover:cursor-pointer ">
                  {card.icon ?? <ArrowRight className="w-4 h-4" />}
                </Button>
              )}
            </Link>
          )}

          {card.variant === "large" && (
            <>
              <h2 className={` font-bold mt-10 text-xl md:text-2xl max-w-xs text-black dark:text-white `}>
                {t('millionCustomers')}
              </h2>
              <div className="flex items-center justify-between mt-4">
                <p className="text-black dark:text-gray-300 font-semibold/70 text-xs md:text-sm mb-4 max-w-xs font-medium">
                  {t('trustedCustomers')}
                </p>
                <div className="flex -space-x-2 mt-16 md:mt-12">
                  <Avatar className="w-8 h-8 md:w-10 md:h-10 ring-2 ring-black/30 dark:ring-gray-600">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback className="bg-black dark:bg-gray-600 text-white">CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 md:w-10 md:h-10 ring-2 ring-black/30 dark:ring-gray-600">
                    <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                    <AvatarFallback className="bg-black dark:bg-gray-600 text-white">LR</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 md:w-10 md:h-10 ring-2 ring-black/30 dark:ring-gray-600">
                    <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                    <AvatarFallback className="bg-black dark:bg-gray-600 text-white">ER</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </>
          )}
        </motion.div>
      );
    }

    if (card.type === "image" && card.image) {
      return (
        <motion.div
          variants={cardMotion}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          className={`relative rounded-2xl overflow-hidden shadow-luxury ${
            card.variant === "large"
              ? "min-h-[300px] md:min-h-[400px]"
              : "min-h-[200px] md:min-h-[250px]"
          }`}
        >
          <Image
            src={card.image}
            alt={card.title ?? "Card image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-fashion-dark/20 to-transparent"></div>
        </motion.div>
      );
    }

    return null;
  }

  const displayCards = cards;

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Top Row (large cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AnimatePresence>
          {displayCards.slice(0, 2).map((card, idx) => (
            <CardRenderer key={idx} card={{ ...card, variant: "large" }} />
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Row (small cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayCards.slice(2, 5).map((card, idx) => (
            <CardRenderer key={idx} card={{ ...card, variant: "small" }} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}