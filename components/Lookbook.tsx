// components/Lookbook.tsx
import { client } from "@/sanity/lib/client";
import Image from "next/image";

type Lookbook = {
  _id: string;
  title: string;
  mainImageUrl?: { asset: { url: string } };
  products: {
    _id: string;
    title: string;
    price: number;
    "imageUrl"?: string;
  }[];
};

const query = `
*[_type == "lookbook"][0]{
  _id, title,
  "mainImageUrl": mainImage.asset->url,
  products[]->{
    _id, title, price, "imageUrl": image.asset->url
  }
}
`;

export default async function Lookbook() {
  const look: Lookbook = await client.fetch(query);

  if (!look) return null;

  return (
    <section className="py-12">
      <h2 className="text-2xl font-semibold mb-8 text-center">{look.title}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {look.mainImageUrl && (
          <div className="relative w-full aspect-square rounded-xl overflow-hidden">
            <Image
              src={look.mainImageUrl.asset.url}
              alt={look.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <ul className="space-y-4">
            {look.products.map((p) => (
              <li
                key={p._id}
                className="flex items-center justify-between border-b pb-2"
              >
                <span className="font-medium">{p.title}</span>
                <span className="text-gray-600">${p.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}