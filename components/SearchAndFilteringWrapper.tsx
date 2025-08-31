import React from "react";
import SubHero from "./SubHero";
import { getCategories } from "@/lib/useQuery";
import CollectionGrid from "./CollectionGrid";
import Banner from "./Banner";
import ProductGrid from "./ProductGrid";
import SubcategoryGrid from "./Subcategory";
import Hero from "./Hero";

async function SearchAndFilltring() {
  const categories = await getCategories();
  return (
    <>
      {/* <div className="mt-5">
        <SubHero categories={categories} />
      </div> */}
      <div>
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
      </div>
    </>
  );
}

export default SearchAndFilltring;
