// components/CategoryGrid.tsx
import { client } from "@/sanity/lib/client";
import Image from "next/image";

const query = `
*[_type == "category"]{
  _id, title, "imageUrl": image.asset->url,
  
}
`;

export default async function CategoryGrid() {
  const categories = await client.fetch(query);

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold text-center mb-8">Our Category List</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {categories.map((c: any) => (
          <div
            key={c._id}
            className="group rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            {c.imageUrl && (
              <div className="relative aspect-square">
                <Image src={c.imageUrl} alt={c.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-3 text-center">
              <h3 className="text-lg font-medium">{c.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}