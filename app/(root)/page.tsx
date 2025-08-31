// app/page.tsx
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CollectionGrid from "@/components/CollectionGrid";
import SubcategoryGrid from "@/components/Subcategory";
import Banner from "@/components/Banner";
import SearchAndFilltring from "@/components/SearchAndFilteringWrapper";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <SubcategoryGrid />
      <ProductGrid />
      <Banner />
      <CollectionGrid />
   
    </>
  );
}
