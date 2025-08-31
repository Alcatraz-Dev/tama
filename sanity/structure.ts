// deskStructure.ts
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("heroCard").title("Hero Cards"),
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("subcategory").title("Subcategories"),
      S.documentTypeListItem("collection").title("Collections"),
      S.documentTypeListItem("banner").title("Banners"),
      S.documentTypeListItem("lookbook").title("Lookbooks"),
      S.documentTypeListItem("order").title("Orders"),
      S.documentTypeListItem("socialLinks").title("Social Links"),
    ]);