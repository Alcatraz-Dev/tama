import React from "react";
import SubHero from "./SubHero";
import { getCategories } from "@/lib/useQuery";

async function SearchAndFilltring() {
  const categories = await getCategories();
  return (
    <div className="mt-5">
      <SubHero categories={categories} />
    </div>
  );
}

export default SearchAndFilltring;
