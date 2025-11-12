// components/CategoryGrid.tsx
import { getCategories } from "@/lib/useQuery";
import Image from "next/image";

export default async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
        Our Category List
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {categories.map((c: { _id: string; title: string; imageUrl?: string }) => (
          <div
            key={c._id}
            className="relative rounded-3xl overflow-hidden shadow-lg"
          >
            {c.imageUrl && (
              <div className="relative aspect-square">
                <Image
                  src={c.imageUrl}
                  alt={c.title}
                  fill
                  className="object-cover"
                />

                {/* Overlay always visible */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-lg sm:text-xl font-semibold drop-shadow-lg">
                    {c.title}
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