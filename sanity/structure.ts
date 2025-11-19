// deskStructure.ts
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Hero Section
      S.listItem()
        .title("Hero Section")
        .child(
          S.list()
            .title("Hero Section")
            .items([
              S.documentTypeListItem("heroCard").title("Hero Cards"),
            ])
        ),

      // Products & Catalog
      S.listItem()
        .title("Products & Catalog")
        .child(
          S.list()
            .title("Products & Catalog")
            .items([
              S.documentTypeListItem("product").title("Products"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("collection").title("Collections"),
              S.documentTypeListItem("tamastories").title("Tama Stories"),
              S.documentTypeListItem("ads").title("Ads"),
              S.documentTypeListItem("review").title("Reviews"),
            ])
        ),

      // Orders & Customers
      S.listItem()
        .title("Orders & Customers")
        .child(
          S.list()
            .title("Orders & Customers")
            .items([
              S.documentTypeListItem("order").title("Orders"),
              S.documentTypeListItem("contact").title("Contact Messages"),
            ])
        ),

      // Settings / Other
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items([
              S.documentTypeListItem("socialLinks").title("Social Links"),
              S.documentTypeListItem("contactInfo").title("Contact Information"),
            ])
        ),
    ]);