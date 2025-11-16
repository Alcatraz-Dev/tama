// components/ProductCard.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
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
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const firstImage = product.gallery?.[0]?.asset?.url;
  const secondImage = product.gallery?.[1]?.asset?.url;
  const { addToCart } = useCartStore();

  // Check if Quick Add should be disabled
  const isQuickAddDisabled =
    (product.colors && product.colors.length > 0 && !selectedColor) ||
    (product.sizes && product.sizes.length > 0 && !selectedSize);
  const handleAdd = () => {
    // Check if color selection is required but not selected
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color", {
        description: "Choose a color before adding to cart.",
      });
      return;
    }

    // Check if size selection is required but not selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", {
        description: "Choose a size before adding to cart.",
      });
      return;
    }

    const colorToUse = selectedColor || (
      product.colors && product.colors.length > 0
        ? typeof product.colors[0] === "string"
          ? product.colors[0]
          : product.colors[0].hex || product.colors[0].value || ""
        : undefined
    );

    const sizeToUse = selectedSize || (
      product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
    );

    addToCart({
      _id: product._id,
      title: product.title,
      slug:
        typeof product.slug === "string" ? product.slug : product.slug?.current,
      price: product.price,
      gallery: product.gallery,
      color: colorToUse,
      size: sizeToUse,
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
      className="group relative block rounded-t-3xl rounded-b-4xl overflow-hidden shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 bg-card shadow-luxury cursor-pointer"
    >
      {/* Image wrapper */}
      <div className="relative w-full aspect-square rounded-t-3xl rounded-b-[50px] overflow-hidden max-h-[250px] sm:max-h-[350px] bg-card shadow-luxury">
        {firstImage && (
          <>
            <Image
              src={firstImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-all duration-500 ${
                secondImage
                  ? "group-hover:opacity-0"
                  : ""
              }`}
            />
            {secondImage && (
              <Image
                src={secondImage}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-0 group-hover:opacity-100 transition-all duration-500"
              />
            )}
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0  from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/20 dark:bg-zinc-700/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 dark:hover:bg-zinc-600/50"
          aria-label="Add to wishlist"
        >
          <svg
            className="w-4 h-4 text-black dark:text-white font-semibold"
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
      <div className="mt-4 mb-4 mx-4 sm:mx-5 flex flex-col items-center rounded-b-3xl text-black dark:text-white font-semibold drop-shadow-2xl z-10 relative">
        {/* Stock Status - Top Right */}
        <div className="absolute top-0 right-0">
          <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${
            product.inStock
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-[10px]">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-base lg:text-lg font-semibold line-clamp-2 text-center max-w-[90%] mt-8 mb-2 leading-tight">
          {highlightText(product.title, searchQuery)}
        </h3>

        {/* Reviews */}
        {product.reviews && product.reviews.count > 0 && (
          <div className="flex items-center justify-center gap-1 mb-1">
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.reviews!.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-black dark:text-zinc-300 font-medium">
              ({product.reviews.count})
            </span>
          </div>
        )}

        <p className="text-black dark:text-zinc-300 font-semibold text-xs sm:text-sm my-1 line-clamp-2 text-center leading-relaxed">
          {highlightText(product.description || "", searchQuery)}
        </p>

        {/* Variants - inline with content */}
        {(product.colors && product.colors.length > 0) || (product.sizes && product.sizes.length > 0) ? (
          <div className="mt-1.5 space-y-1.5">
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center justify-start gap-2 bg-slate-200/50 dark:bg-gray-800/30 rounded-md py-1.5 px-2">
                <span className="text-[10px] font-semibold text-black dark:text-white tracking-wide">COLOR</span>
                <div className="flex gap-1 flex-wrap">
                  {product.colors.slice(0, 4).map((color, i: number) => {
                    const bgColor =
                      typeof color === "string"
                        ? color
                        : color.hex || color.value || "";
                    const colorName =
                      typeof color === "string" ? color : color.name || bgColor;
                    return (
                      <button
                        key={i}
                        title={colorName}
                        onClick={() => setSelectedColor(bgColor)}
                        className={`w-4 h-4 rounded-full border-2 shadow-sm transition-all duration-300 hover:scale-125 hover:shadow-lg ${
                          selectedColor === bgColor
                            ? "border-fashion-gold scale-105 shadow-lg ring-1 ring-fashion-gold/30"
                            : "border-white dark:border-zinc-600 hover:border-fashion-gold/50"
                        }`}
                        style={{ backgroundColor: bgColor }}
                      />
                    );
                  })}
                  {product.colors.length > 4 && (
                    <span className="text-xs text-black dark:text-white font-bold ml-1 self-center">
                      +{product.colors.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center justify-start gap-2 bg-slate-200/50 dark:bg-gray-800/30 rounded-md py-1.5 px-2">
                <span className="text-[10px] font-semibold text-black dark:text-white tracking-wide">SIZE</span>
                <div className="flex gap-1 flex-wrap">
                  {product.sizes.map((size: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2 py-0.5 border-2 rounded text-xs font-bold transition-all duration-300 hover:scale-105 text-[10px] ${
                        selectedSize === size
                          ? "bg-fashion-gold text-black border-fashion-gold shadow-lg scale-105"
                          : "border-zinc-300 dark:border-zinc-600 text-black dark:text-white bg-white dark:bg-zinc-900 hover:border-fashion-gold hover:bg-fashion-gold/10 dark:hover:bg-fashion-gold/20 hover:shadow-md"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Price Section */}
        <div className="flex items-center justify-center gap-3 mt-2 px-2">
          <div className="flex items-center gap-2">
            <p className="text-lg sm:text-xl lg:text-2xl font-extrabold text-black dark:text-white">
              {product.price} DT
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
                <p className="text-sm text-black dark:text-zinc-400 font-semibold line-through">
                  {product.originalPrice} DT
                </p>
              </>
            )}
          </div>
        </div>

        {/* Quick actions for mobile */}
        <div className="flex gap-2 mt-3 w-full px-2  ">
          <button
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all active:scale-95 ${
              isQuickAddDisabled
                ? "bg-zinc-400 dark:bg-zinc-600 text-zinc-200 dark:text-zinc-400 cursor-not-allowed opacity-60"
                : "bg-black dark:bg-white text-white dark:text-black cursor-pointer hover:bg-black/90 dark:hover:bg-zinc-200"
            }`}
            onClick={handleAdd}
            disabled={isQuickAddDisabled}
          >
            Quick Add
          </button>
          <button
            className="flex-1 border border-fashion-gold text-black dark:text-white py-2 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black active:scale-95"
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

