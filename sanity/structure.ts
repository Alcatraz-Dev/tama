// deskStructure.ts
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tama Shop CMS")
    .items([
      // Dashboard
      S.listItem()
        .title("📊 Dashboard")
        .child(
          S.list()
            .title("Dashboard Overview")
            .items([
              // Quick Stats
              S.listItem()
                .title("📈 Quick Stats")
                .child(
                  S.documentTypeList("product")
                    .title("All Products")
                    .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
                ),

              // Recent Content
              S.listItem()
                .title("📝 Recent Content")
                .child(
                  S.list()
                    .title("Recent Content")
                    .items([
                      S.documentTypeListItem("product").title("Latest Products"),
                      S.documentTypeListItem("ads").title("Recent Ads"),
                      S.documentTypeListItem("tamastories").title("New Stories"),
                      S.documentTypeListItem("order").title("Recent Orders"),
                    ])
                ),

              // Content Management Overview
              S.listItem()
                .title("🎯 Content Management")
                .child(
                  S.list()
                    .title("Content Management")
                    .items([
                      S.listItem()
                        .title("🛍️ Products & Inventory")
                        .child(
                          S.list()
                            .title("Products & Inventory")
                            .items([
                              S.documentTypeListItem("product").title("All Products"),
                              S.documentTypeListItem("category").title("Categories"),
                              S.documentTypeListItem("collection").title("Collections"),
                            ])
                        ),

                      S.listItem()
                        .title("📢 Marketing & Ads")
                        .child(
                          S.list()
                            .title("Marketing & Ads")
                            .items([
                              S.documentTypeListItem("heroCard").title("Hero Cards"),
                              S.documentTypeListItem("ads").title("Advertisements"),
                            ])
                        ),

                      S.listItem()
                        .title("📖 Content & Stories")
                        .child(
                          S.list()
                            .title("Content & Stories")
                            .items([
                              S.documentTypeListItem("tamastories").title("Tama Stories"),
                              S.documentTypeListItem("review").title("Customer Reviews"),
                            ])
                        ),

                      S.listItem()
                        .title("💰 Commerce & Orders")
                        .child(
                          S.list()
                            .title("Commerce & Orders")
                            .items([
                              S.documentTypeListItem("order").title("Orders"),
                              S.documentTypeListItem("contact").title("Contact Messages"),
                            ])
                        ),

                      S.listItem()
                        .title("⚙️ Settings & Config")
                        .child(
                          S.list()
                            .title("Settings & Config")
                            .items([
                              S.documentTypeListItem("socialLinks").title("Social Media"),
                              S.documentTypeListItem("contactInfo").title("Contact Info"),
                            ])
                        ),
                    ])
                ),
            ])
        ),

      // Homepage & Marketing
      S.listItem()
        .title("🏠 Homepage & Marketing")
        .child(
          S.list()
            .title("Homepage & Marketing")
            .items([
              S.documentTypeListItem("heroCard").title("Hero Cards"),
              S.documentTypeListItem("ads").title("Ads & Promotions"),
            ])
        ),

      // Products
      S.listItem()
        .title("🛍️ Products")
        .child(
          S.list()
            .title("Products")
            .items([
              S.documentTypeListItem("product").title("All Products"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("collection").title("Collections"),
            ])
        ),

      // Content & Stories
      S.listItem()
        .title("📖 Content & Stories")
        .child(
          S.list()
            .title("Content & Stories")
            .items([
              S.documentTypeListItem("tamastories").title("Tama Stories"),
              S.documentTypeListItem("review").title("Customer Reviews"),
            ])
        ),

      // Commerce & Orders
      S.listItem()
        .title("💰 Commerce & Orders")
        .child(
          S.list()
            .title("Commerce & Orders")
            .items([
              S.documentTypeListItem("order").title("Orders"),
              S.documentTypeListItem("contact").title("Contact Messages"),
            ])
        ),

      // Settings & Configuration
      S.listItem()
        .title("⚙️ Settings & Configuration")
        .child(
          S.list()
            .title("Settings & Configuration")
            .items([
              S.documentTypeListItem("socialLinks").title("Social Media Links"),
              S.documentTypeListItem("contactInfo").title("Contact Information"),
            ])
        ),
    ]);