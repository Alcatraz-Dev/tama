import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";


const query = `
*[_type == "collection"][0..4]{ // limit to max 5 items
  _id, title, "imageUrl": image.asset->url
}
`;

export default async function CollectionGrid() {
  const collections = await client.fetch(query);

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 tracking-tight mt-10">
        Our Featured Collections
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
        {collections.map((c: any, idx: number) => (
        
            <div
              key={c._id}
              className={`
              group relative rounded-xl overflow-hidden
              ${
                idx === 1
                  ? "h-[300px] md:h-[500px] md:row-span-2" // center card adaptive
                  : "h-[200px] sm:h-[240px]"
              }
              ${idx === 1 ? "sm:col-span-2 md:col-span-1" : ""}
            `}
            >
              {c.imageUrl && (
                <Image
                  src={c.imageUrl}
                  alt={c.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/10 flex items-center justify-between p-4 text-white">
                <h3 className="font-semibold drop-shadow">{c.title}</h3>

                <Link href="/" aria-label={`View ${c.title}`}>
                  <Button className="inline-flex items-center justify-center bg-white text-black w-8 h-8 rounded-full hover:bg-slate-100 transition-transform duration-300 -rotate-45 hover:rotate-0">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
        
        ))}
      </div>
    </section>
  );
}
