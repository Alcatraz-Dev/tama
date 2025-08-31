// app/page.tsx
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CollectionGrid from "@/components/CollectionGrid";
import SubcategoryGrid from "@/components/Subcategory";
import Banner from "@/components/Banner";
import SearchAndFilltring from "@/components/SearchAndFilltring";

export default async function HomePage() {
  return (
    <>
      <SearchAndFilltring />
      {/* Hero  */}
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
