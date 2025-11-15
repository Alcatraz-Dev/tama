"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getCollectionsLimit } from "@/lib/useQuery";
import { Category } from "@/lib/types";

export default function CollectionGrid() {
  const [collections, setCollections] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCollectionsLimit(5).then(setCollections);
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 tracking-tight mt-10 text-black dark:text-white">
        Our Featured Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
        {collections.map((c: Category, idx: number) => (
          <div
            key={c._id}
            onClick={() => router.push(`/collection/${c.slug}`)}
            className={`group relative rounded-xl overflow-hidden cursor-pointer ${
              idx === 1
                ? "h-[300px] md:h-[500px] md:row-span-2"
                : "h-[200px] sm:h-[240px]"
            } ${idx === 1 ? "sm:col-span-2 md:col-span-1" : ""}`}
          >
            {c.imageUrl && (
              <Image
                src={c.imageUrl}
                alt={c.title}
                width={500}
                height={500}
                className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                loading="lazy"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-black/10 dark:bg-black/50 flex items-center justify-between p-4 text-white">
              <h3 className="font-semibold drop-shadow">{c.title}</h3>

              <Button onClick={(e) => { e.stopPropagation(); router.push("/products"); }} className="inline-flex items-center justify-center bg-white dark:bg-gray-700 text-black dark:text-white w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-gray-600 transition-transform duration-300 -rotate-45 hover:rotate-0" aria-label={`View ${c.title}`}>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
