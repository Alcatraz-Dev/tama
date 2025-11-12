import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLookbook } from "@/lib/useQuery";
import { motion } from "framer-motion";

export default async function LookbooksPage() {
  const lookbooks = await getLookbook();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 ">Lookbooks</h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    
      >
        {lookbooks.map((lookbook: any) => (
          <div
            key={lookbook._id}
            className="relative bg-white group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 cursor-pointer"
          
          >
            {/* Image with gradient overlay */}
            {lookbook.images?.[0]?.asset?.url && (
              <div className="relative h-72 w-full">
                <Image
                  src={lookbook.images[0].asset.url}
                  alt={lookbook.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold mb-2">{lookbook.title}</h2>
              <p className="text-gray-500 mb-4 line-clamp-2">{lookbook.description}</p>

              {/* Related products */}
              <div className="flex flex-wrap gap-3">
                {lookbook.products?.map((product: any) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug.current}`}
                    className="flex items-center gap-2  rounded-lg p-2 hover:scale-105 transition"
                  >
                    {product.image && (
                      <div className="relative w-10 h-10 rounded overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-xs font-medium line-clamp-1">{product.title}</span>
                    <span className="text-xs text-gray-500">{product.price} DT</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}