// components/CategoryGrid.tsx
"use client";

import { getCategories } from "@/lib/useQuery";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/translationContext";

interface Category {
  _id: string;
  title: string;
  title_fr?: string;
  title_ar?: string;
  slug: {
    current: string;
  };
  imageUrl?: string;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const { t, language } = useTranslation();

  const getTranslatedField = (obj: any, field: string) => {
    if (language === 'en') return obj[field];
    return obj[`${field}_${language}`] || obj[field];
  };

  useEffect(() => {
    getCategories().then((data) => {
      console.log('Categories loaded:', data);
      setCategories(data);
    }).catch((error) => {
      console.error('Error loading categories:', error);
    });
  }, []);

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-black dark:text-white">
        {t('ourCategoryList')}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {categories.map((c: Category) => (
          <div
            key={c._id}
            onClick={() => {
              console.log('Category clicked:', c.slug.current);
              router.push(`/category/${c.slug.current}`);
            }}
            className="relative rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
          >
            {c.imageUrl && (
              <div className="relative aspect-square">
                <Image
                  src={c.imageUrl}
                  alt={getTranslatedField(c, 'title')}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay: always visible on small screens and below, hover on larger screens */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-lg sm:text-xl font-semibold drop-shadow-lg text-center px-2">
                    {getTranslatedField(c, 'title')}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}