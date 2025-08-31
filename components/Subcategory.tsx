"use client";
import { getCategories, getSubHeroCards } from "@/lib/useQuery";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SubcategoryGrid() {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getCategories(3).then(setCategories);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-4xl  font-semibold text-center mb-8 px-10 capitalize flex justify-start">
        Our Category List
      </h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((sub: any, idx: number) => (
          <motion.div
            key={sub._id}
            variants={itemVariants}
            className={`
              group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition-transform duration-300
              hover:scale-105 cursor-pointer
              ${idx === categories.length - 3 ? "col-span-2 sm:col-span-2 md:col-span-1" : ""}
            `}
          >
            {/* Subcategory Image */}
            {sub.imageUrl && (
              <div className="relative aspect-square">
                <Image
                  src={sub.imageUrl}
                  alt={sub.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg md:text-xl font-semibold drop-shadow-2xl">
                {sub.title}
              </h3>
              <p className="text-sm md:text-base drop-shadow-2xl">
                {sub.productCount} items
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}