import { getSubHeroCards } from "@/lib/useQuery";
import Image from "next/image";

export default async function SubcategoryGrid() {
  const subcategories = await getSubHeroCards();

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-8 px-10 capitalize flex justify-start">
        Our Category List
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {subcategories.map((sub: any, idx: number) => (
          <div
            key={sub._id}
            className={`
              group relative rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:cursor-pointer hover:scale-105 ease-in-out duration-300
              ${idx === subcategories.length - 3 ? "col-span-2 sm:col-span-2 md:col-span-1" : ""}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center p-2">
              <h3 className="text-lg md:text-xl font-semibold drop-shadow-2xl">{sub.title}</h3>
              <p className="text-sm md:text-base drop-shadow-2xl">{sub.productCount} items</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}