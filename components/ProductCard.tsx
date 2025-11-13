// components/ProductCard.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  searchQuery?: string;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-black px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function ProductCard({
  product,
  searchQuery = "",
}: ProductCardProps) {
  const firstImage = product.gallery?.[0]?.asset?.url;
  const secondImage = product.gallery?.[1]?.asset?.url;
  const { addToCart } = useCartStore();
  const handleAdd = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      slug:
        typeof product.slug === "string" ? product.slug : product.slug?.current,
      price: product.price,
      gallery: product.gallery,
      color: "#fffff",
      size: "L",
      quantity: 1,
      inStock: product.inStock,
    });

    toast.success("Added to cart!", {
      description: `${1} ${product.title} added to your cart.`,
    });
  };
  return (
    <motion.div
      key={product._id}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative block rounded-t-3xl rounded-b-4xl overflow-hidden shadow-lg hover:shadow-elegant transition-all duration-300 bg-white cursor-pointer"
    >
      {/* Image wrapper */}
      <div className="relative w-full aspect-square rounded-t-3xl rounded-b-[50px] overflow-hidden max-h-[250px] sm:max-h-[350px]">
        {firstImage && (
          <>
            <Image
              src={firstImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-all duration-500 ${
                secondImage
                  ? "group-hover:opacity-0 group-hover:scale-105"
                  : "group-hover:scale-105"
              }`}
            />
            {secondImage && (
              <Image
                src={secondImage}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
            )}
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0  from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
          aria-label="Add to wishlist"
        >
          <svg
            className="w-4 h-4 text-black font-semibold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Details */}
      <div className="mt-4 mb-4 mx-4 sm:mx-5 flex flex-col items-center rounded-b-3xl text-black font-semibold drop-shadow-2xl z-10">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold line-clamp-2 text-center max-w-[90%] my-2 leading-tight">
          {highlightText(product.title, searchQuery)}
        </h3>
        <p className="text-black font-semibold text-xs sm:text-sm my-1 line-clamp-2 text-center leading-relaxed">
          {highlightText(product.description || "", searchQuery)}
        </p>

        <div className="flex items-center justify-between gap-2 mt-3 w-full px-2">
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-1 flex-wrap justify-start">
              {product.colors.slice(0, 4).map((color, i: number) => {
                const bgColor =
                  typeof color === "string"
                    ? color
                    : color.hex || color.value || "";
                const colorName =
                  typeof color === "string" ? color : color.name || bgColor;
                return (
                  <span
                    key={i}
                    title={colorName}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-black/50 shadow-sm transition-transform hover:scale-110"
                    style={{ backgroundColor: bgColor }}
                  />
                );
              })}
              {product.colors.length > 4 && (
                <span className="text-xs text-black font-semibold ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col items-end">
            <p className="text-sm sm:text-base lg:text-lg font-extrabold text-black">
              {product.price} DT
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs text-black font-semibold line-through">
                {product.originalPrice} DT
              </p>
            )}
          </div>
        </div>

        {/* Quick actions for mobile */}
        <div className="flex gap-2 mt-3 w-full px-2  ">
          <button
            className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer hover:bg-black/90 active:scale-95"
            onClick={handleAdd}
          >
            Quick Add
          </button>
          <button
            className="flex-1 border border-fashion-gold text-black py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer hover:bg-black hover:text-white active:scale-95"
            onClick={() =>
              (window.location.href = `/product/${typeof product.slug === "string" ? product.slug : product.slug?.current}`)
            }
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
