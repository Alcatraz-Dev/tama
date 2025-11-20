// app/page.tsx
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CollectionGrid from "@/components/CollectionGrid";
import SubcategoryGrid from "@/components/Subcategory";
import AdsSlider from "@/components/AdsSlider";
import RecentlyViewed from "@/components/RecentlyViewed";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <SubcategoryGrid />
      <ProductGrid />
      <AdsSlider />
      <CollectionGrid />
      <RecentlyViewed />
    </>
  );
}
