"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductDetails({ product }: any) {
  const [selectedMedia, setSelectedMedia] = useState(product.gallery?.[0] || null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Build video URL from Sanity _ref
  const getVideoUrl = (media: any) => {
    if (!media?.asset?._ref) return null;
    const ref = media.asset._ref; // e.g. file-<hash>-mp4
    const hash = ref.replace("file-", "").replace("-mp4", "");
    return `${process.env.SANITY_FILES_URL}${hash}.mp4`;
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-6 sm:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
            {product.gallery?.map((media: any, i: number) => (
              <div
                key={i}
                onClick={() => setSelectedMedia(media)}
                className={`relative w-20 h-20 lg:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                  selectedMedia?._key === media._key
                    ? "border-black scale-105"
                    : "border-gray-200"
                }`}
              >
                {media._type === "image" ? (
                  <Image
                    src={media.asset.url}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <video
                    src={getVideoUrl(media) || ""}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controls={false} // thumbnails
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Media */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg">
            {selectedMedia?._type === "image" ? (
              <Image
                src={selectedMedia.asset.url}
                alt={product.title}
                fill
                className="object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
              />
            ) : selectedMedia?._type === "file" ? (
              <video
                src={getVideoUrl(selectedMedia) || ""}
                className="w-full h-full object-cover rounded-3xl"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : null}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold mt-2">{product.price} DT</p>

          {product.inStock ? (
            <span className="text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-red-600 font-medium">Out of Stock</span>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              {product.colors.map((color: any, i: number) => (
                <button
                  key={i}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.hex)}
                  className={`w-8 h-8 rounded-full border-2 shadow-sm transition-transform duration-300 ${
                    selectedColor === color.hex ? "border-black scale-110" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {product.sizes.map((size: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-transform duration-300 ${
                    selectedSize === size ? "bg-black text-white scale-105" : "border-gray-300 hover:bg-gray-100"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}