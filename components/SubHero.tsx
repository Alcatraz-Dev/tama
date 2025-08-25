"use client";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Category from "./Category";
import FillterDropdown from "./FillterDropdown";


 function SubHero({categories}: any) {
  const [selectedFilter, setSelectedFilter] = useState("");
  return (
    <div className="flex items-center justify-center flex-wrap gap-5 px-4 py-2 ">
      <SearchInput />
      <Category categories={categories} />
      <FillterDropdown
        options={["Price", "Date", "Rating"]}
        selected={selectedFilter || "Select Filter"}
        onSelect={setSelectedFilter}
      />
    </div>
  );
}

export default SubHero;
