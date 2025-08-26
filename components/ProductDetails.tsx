// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { PlaySquare } from "lucide-react";
// import { Button } from "./ui/button";

// export function ProductDetails({ product }: any) {
//   const [selectedMedia, setSelectedMedia] = useState(
//     product.gallery?.[0] || null
//   );
//   const [selectedColor, setSelectedColor] = useState<string | null>(null);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   // Build video URL from Sanity _ref
//   const getVideoUrl = (media: any) => {
//     if (!media?.asset?._ref) return null;
//     const ref = media.asset._ref; // e.g. file-<hash>-mp4
//     const hash = ref.replace("file-", "").replace("-mp4", "");
//     return `${process.env.NEXT_PUBLIC_SANITY_ASSET_URL}/${hash}.mp4`;
//   };

//   const videoUrl = getVideoUrl(selectedMedia);

//   return (
//     <section className="max-w-7xl mx-auto py-12 px-4 sm:px-8 lg:px-12">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Gallery */}
//         <div className="flex flex-col lg:flex-row gap-4 w-full">
//           {/* Main Media */}
//           <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg">
//             {selectedMedia?._type === "image" ? (
//               <Image
//                 src={selectedMedia.asset.url}
//                 alt={product.title}
//                 fill
//                 className="object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
//               />
//             ) : videoUrl ? (
//               <video
//                 src={videoUrl}
//                 className="w-full h-full object-cover rounded-3xl"
//                 controls
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               />
//             ) : null}
//           </div>

//           {/* Thumbnails */}
//           <div className="lg:flex lg:flex-col gap-3">
//             {/* Mobile: grid under main image */}
//             <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3 justify-center lg:hidden">
//               {product.gallery?.map((media: any, i: number) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedMedia(media)}
//                   className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
//                     selectedMedia?._key === media._key
//                       ? "border-black scale-105 shadow-md"
//                       : "border-gray-200 hover:border-gray-400"
//                   }`}
//                 >
//                   {media._type === "image" ? (
//                     <Image
//                       src={media.asset.url}
//                       alt={product.title}
//                       fill
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full bg-gray-100">
//                       <PlaySquare className="w-6 h-6 text-gray-500" />
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Desktop: vertical thumbnails */}
//             <div className="hidden lg:flex lg:flex-col gap-3">
//               {product.gallery?.map((media: any, i: number) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedMedia(media)}
//                   className={`relative w-20 h-20 lg:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
//                     selectedMedia?._key === media._key
//                       ? "border-black scale-105 shadow-md"
//                       : "border-gray-200 hover:border-gray-400"
//                   }`}
//                 >
//                   {media._type === "image" ? (
//                     <Image
//                       src={media.asset.url}
//                       alt={product.title}
//                       fill
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-full h-full bg-gray-100">
//                       <PlaySquare className="w-6 h-6 text-gray-500" />
//                     </div>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="flex flex-col gap-6 bg-white p-6 rounded-3xl">
//           {/* Title */}
//           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
//             {product.title}
//           </h1>

//           {/* Description */}
//           <p className="text-gray-600 leading-relaxed">{product.description}</p>

//           {/* Price & Stock */}
//           <div className="flex items-center justify-between">
//             <p className="text-2xl font-semibold">{product.price} DT</p>
//             {product.inStock ? (
//               <span className="text-green-600 font-semibold">In Stock</span>
//             ) : (
//               <span className="text-red-600 font-semibold">Out of Stock</span>
//             )}
//           </div>

//           {/* Colors */}
//           {product.colors?.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-gray-700 mb-2">Colors</p>
//               <div className="flex items-center gap-3">
//                 {product.colors.map((color: any, i: number) => (
//                   <button
//                     key={i}
//                     style={{ backgroundColor: color.hex }}
//                     onClick={() => setSelectedColor(color.hex)}
//                     className={`w-9 h-9 rounded-full border-2 shadow-sm transition-all duration-300 ${
//                       selectedColor === color.hex
//                         ? "border-black scale-110"
//                         : "border-gray-300 hover:scale-105"
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Sizes */}
//           {product.sizes?.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-gray-700 mb-2">Sizes</p>
//               <div className="flex gap-2 flex-wrap">
//                 {product.sizes.map((size: string, i: number) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-300 ${
//                       selectedSize === size
//                         ? "bg-black text-white border-black scale-105"
//                         : "border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* CTA */}
//           <Button className="w-full rounded-lg hover:cursor-pointer">
//             Add to Cart
//           </Button>
//           {/* Shop Now CTA */}
//           <Button className="w-full rounded-lg hover:cursor-pointer">
//             Shop Now
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import { PlaySquare } from "lucide-react";
import { Button } from "./ui/button";

const tunisianTowns = [
  "Tunis",
  "Sfax",
  "Sousse",
  "Kairouan",
  "Bizerte",
  "Gabes",
  "Nabeul",
  "Gafsa",
  "Monastir",
  "Mahdia",
];

export function ProductDetails({ product }: any) {
  const [selectedMedia, setSelectedMedia] = useState(
    product.gallery?.[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const [showShopForm, setShowShopForm] = useState(false);

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");

  const getVideoUrl = (media: any) => {
    if (!media?.asset?._ref) return null;
    const ref = media.asset._ref;
    const hash = ref.replace("file-", "").replace("-mp4", "");
    return `${process.env.NEXT_PUBLIC_SANITY_ASSET_URL}/${hash}.mp4`;
  };

  const videoUrl = getVideoUrl(selectedMedia);

  const handleShopNow = () => setShowShopForm(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (send to API, etc.)
    console.log({ fullName, location, phone, town, product: product.title });
    alert("Order submitted!");
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-8 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-lg">
            {selectedMedia?._type === "image" ? (
              <Image
                src={selectedMedia.asset.url}
                alt={product.title}
                fill
                className="object-cover rounded-3xl transition-transform duration-500 hover:scale-105"
              />
            ) : videoUrl ? (
              <video
                src={videoUrl}
                className="w-full h-full object-cover rounded-3xl"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : null}
          </div>

          {/* Thumbnails */}
          <div className="lg:flex lg:flex-col gap-3">
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-3 justify-center lg:hidden">
              {product.gallery?.map((media: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedMedia(media)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedMedia?._key === media._key
                      ? "border-black scale-105 shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {media._type === "image" ? (
                    <Image
                      src={media.asset.url}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <PlaySquare className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex lg:flex-col gap-3">
              {product.gallery?.map((media: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedMedia(media)}
                  className={`relative w-20 h-20 lg:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedMedia?._key === media._key
                      ? "border-black scale-105 shadow-md"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {media._type === "image" ? (
                    <Image
                      src={media.asset.url}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <PlaySquare className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {product.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">{product.price} DT</p>
            {product.inStock ? (
              <span className="text-green-600 font-semibold">In Stock</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {product.colors?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Colors</p>
              <div className="flex items-center gap-3">
                {product.colors.map((color: any, i: number) => (
                  <button
                    key={i}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`w-9 h-9 rounded-full border-2 shadow-sm transition-all duration-300 ${
                      selectedColor === color.hex
                        ? "border-black scale-110"
                        : "border-gray-300 hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Sizes</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? "bg-black text-white border-black scale-105"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button className="w-full rounded-lg hover:cursor-pointer">
            Add to Cart
          </Button>

          {/* Shop Now / Cancel */}
          <Button
            className="w-full rounded-lg hover:cursor-pointer"
            onClick={() => setShowShopForm((prev) => !prev)}
          >
            {showShopForm ? "Cancel" : "Shop Now"}
          </Button>

          {/* Shop Form */}
          {showShopForm && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-4 p-4 border rounded-lg bg-gray-50"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <select
                value={town}
                onChange={(e) => setTown(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select Tunisian Town</option>
                {tunisianTowns.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              

              <Button type="submit" className="w-full rounded-lg">
                Submit Order
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
