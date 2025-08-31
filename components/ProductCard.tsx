// components/ProductCard.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: any }) {
  const firstImage = product.gallery?.[0]?.asset?.url;
  const secondImage = product.gallery?.[1]?.asset?.url;

  return (
    <motion.div
      key={product._id}
      whileHover={{ scale: 1.05 }}
      className="group relative block rounded-t-3xl rounded-b-4xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-neutral-800"
    >
      {/* Image wrapper */}
      <div className="relative w-full aspect-square rounded-t-3xl rounded-b-[50px] overflow-hidden max-h-[300px]">
        {firstImage && (
          <>
            <Image
              src={firstImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={`object-cover transition-opacity duration-500 ${
                secondImage ? "group-hover:opacity-0" : ""
              }`}
            />
            {secondImage && (
              <Image
                src={secondImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </>
        )}
      </div>

      {/* Details */}
      <div className="mt-5 mb-5 mx-5 flex flex-col items-center rounded-b-3xl text-white drop-shadow-2xl z-10">
        <h3 className="text-sm sm:text-base font-semibold line-clamp-1 text-center max-w-[80%] my-2">
          {product.title}
        </h3>
        <p className="text-gray-300 text-sm my-1 line-clamp-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2 mt-2 w-full px-2">
          {product.colors?.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {product.colors.map((color: any, i: number) => {
                const bgColor = color.hex || color.value || color;
                return (
                  <span
                    key={i}
                    title={color.name || bgColor}
                    className="w-3 h-3 md:w-5 md:h-5 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: bgColor }}
                  />
                );
              })}
            </div>
          )}

          <p className="text-sm sm:text-base font-extrabold">
            {product.price} DT
          </p>
        </div>
      </div>
    </motion.div>
  );
}