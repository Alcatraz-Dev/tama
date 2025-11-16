// components/FeaturedProducts.tsx
"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/translationContext";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  slug?: { current: string };
  price?: number;
  imageUrl?: string;
  category?: { title: string };
};

const query = `
*[_type == "product"] | order(_createdAt desc)[0..3] {
  _id, title, price, slug,
  "imageUrl": image.asset->url,
  category->{title}
}
`;

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      const result: Product[] = await client.fetch(query);
      setProducts(result);
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12">
      <h2 className="mb-8 text-2xl font-semibold text-center">{t('featuredProducts')}</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <div key={p._id} className="rounded-xl border p-4 shadow-sm hover:shadow-lg transition">
            {p.imageUrl && (
              <div className="relative aspect-square mb-3">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p>{p.category?.title}</p>
            {typeof p.price === "number" && (
              <p className="text-gray-600">{p.price} kr</p>
            )}
            {p.slug?.current && (
              <Link
                href={`/product/${p.slug.current}`}
                className="mt-2 inline-block text-sm underline"
              >
                {t('viewDetails')}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href="/shop" className="inline-block px-6 py-2 bg-black text-white rounded-lg">
          {t('seeMoreProducts')}
        </Link>
      </div>
    </section>
  );
}