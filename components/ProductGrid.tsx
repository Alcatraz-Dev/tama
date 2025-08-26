import { getProducts } from "@/lib/useQuery";
import Image from "next/image";
import Link from "next/link";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <section className="py-8 md:py-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 tracking-tight">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 md:px-12 z-20">
        {products.map((p: any) => (
          <Link
            key={p._id}
            href={`/product/${p.slug}`}
            className="group relative block rounded-t-3xl rounded-b-4xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-neutral-800 "
          >
            {/* Image Card */}
            <div className="relative w-full aspect-square rounded-t-3xl rounded-b-[50px] overflow-hidden max-h-[300px]">
              {p.gallery?.length > 0 && (
                <>
                  <Image
                    src={p.gallery[1]?.asset.url || p.gallery[0].asset.url} // second image on hover
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100 opacity-100"
                  />
                  {p.gallery[1] && (
                    <Image
                      src={p.gallery[0].asset.url}
                      alt={p.title}
                      fill
                      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    />
                  )}
                </>
              )}
            </div>

            {/* Details Overlay */}

            {/* <div className="absolute bottom-0 left-0 w-full p-2.5  bg-black/50  flex flex-col items-center rounded-b-3xl text-white drop-shadow-2xl z-10"> */}
            <div className="mt-5 mb-5 mx-5 flex flex-col items-center rounded-b-3xl text-white drop-shadow-2xl z-10 ">
              <h3 className="text-sm sm:text-base font-semibold line-clamp-1 text-center max-w-[80%] my-2">
                {p.title}
              </h3>

              {/* Colors */}
              {p.colors?.length > 0 && (
                <div className="flex items-center justify-between gap-2 mt-2 w-full px-2 ">
                  {/* Colors */}
                  <div className="flex gap-1 flex-wrap">
                    {p.colors.map((color: any, i: number) => {
                      const bgColor = color.hex || color.value || color;
                      return (
                        <span
                          key={i}
                          title={color.name || bgColor}
                          className="w-3 h-3 md:w-5 md:h-5 rounded-full border border-gray-200 shadow-sm"
                          style={{ backgroundColor: bgColor }}
                        />
                      );
                    })}
                  </div>

                  {/* Price */}
                  <p className="text-sm sm:text-base font-extrabold ">
                    {p.price} DT
                  </p>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
