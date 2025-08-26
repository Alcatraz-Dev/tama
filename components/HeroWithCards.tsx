"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getHeroCards } from "@/lib/useQuery";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    getHeroCards().then(setCards);
  }, []);
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Top Row (large cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {cards.slice(0, 2).map((card, idx) => (
          <CardRenderer key={idx} card={{ ...card, variant: "large" }} />
        ))}
      </div>

      {/* Bottom Row (small cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.slice(2, 5).map((card, idx) => (
          <CardRenderer key={idx} card={{ ...card, variant: "small" }} />
        ))}
      </div>
    </section>
  );
}

function CardRenderer({ card }: { card: Card }) {
  if (card.type === "text") {
    return (
      <div
        className={`flex flex-col justify-center bg-white dark:bg-neutral-900 rounded-4xl shadow-lg 
        ${card.variant === "large" ? "p-12 min-h-[300px] md:min-h-[400px]" : "p-8 min-h-[200px] md:min-h-[250px]"}`}
      >
        {card.title && (
          <h2
            className={`font-bold mb-3 ${
              card.variant === "large"
                ? "text-3xl md:text-4xl"
                : "text-2xl text-center max-w-[200px] mx-auto"
            }`}
          >
            {card.title}
          </h2>
        )}

        {card.subtitle && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 mt-6">
            {card.subtitle}
          </p>
        )}

        {card.withButton && card.buttonText && card.buttonLink && (
          <Link
            href={card.buttonLink}
            className={`flex gap-2  ${card.variant === "large" ? "mt-8" : "mt-4 flex items-center justify-center"}`}
          >
            <Button
              aria-label={card.buttonText}
              className="inline-flex items-center gap-2 bg-black text-white px-5 py-5 rounded-full hover:bg-neutral-800 transition hover:cursor-pointer "
            >
              {card.buttonText}
            </Button>

            {card.withIcon && (
              <Button className="inline-flex items-center gap-2 bg-black text-white px-4 py-5 rounded-full hover:bg-neutral-800 transition -rotate-45 hover:rotate-0 hover:cursor-pointer">
                {card.icon ?? <ArrowRight className="w-4 h-4" />}
              </Button>
            )}
          </Link>
        )}
        {card.variant === "large" && (
          <h2 className={`font-bold  mt-10 text-xl md:text-2xl max-w-xs `}>
            {" "}
            1.3 millon +
          </h2>
        )}
        {card.variant === "large" && (
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-xs md:text-sm dark:text-gray-300 mb-4  max-w-xs">
              Trusted by 1.3M+ customers worldwide, we’re the go-to destination
              for fashion lovers seeking style and confidence.
            </p>
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale mt-32 md:mt-16">
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (card.type === "image" && card.image) {
    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-lg ${
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
          className="object-cover "
        />
      </div>
    );
  }

  return null;
}
