// app/page.tsx
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import CollectionGrid from "@/components/CollectionGrid";
import SubHero from "@/components/SubHero";
import { client } from "@/sanity/lib/client";
import HeroWithCards from "@/components/HeroWithCards";
import SubcategoryGrid from "@/components/Subcategory";
import Banner from "@/components/Banner";
const query = `
*[_type == "category"]{
  _id, title, "imageUrl": image.asset->url
}
`;
export default async function HomePage() {
  const categories = await client.fetch(query);
  return (
    <>
      <div className="mt-5">
        <SubHero categories={categories} />
      </div>

      {/* <Hero /> */}
      <Hero />
      <SubcategoryGrid />
      {/* <CategoryGrid /> */}
      <ProductGrid />
      {/* Banner */}
      <div className="mx-5 md:mx-0">
        <Banner />
      </div>

      <CollectionGrid />
    </>
  );
}
