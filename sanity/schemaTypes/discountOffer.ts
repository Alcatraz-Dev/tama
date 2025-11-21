import { defineField, defineType } from "sanity";

export default defineType({
  name: "discountOffer",
  title: "Discount Offers",
  type: "document",
  fields: [
    // Basic Offer Information
    defineField({
      name: "title",
      title: "Offer Title (English)",
      type: "string",
      validation: (r) => r.required(),
      description: "The main title for the discount offer"
    }),
    defineField({
      name: "title_fr",
      title: "Offer Title (French)",
      type: "string",
      description: "French translation of the offer title"
    }),
    defineField({
      name: "title_ar",
      title: "Offer Title (Arabic)",
      type: "string",
      description: "Arabic translation of the offer title"
    }),

    defineField({
      name: "description",
      title: "Offer Description (English)",
      type: "text",
      description: "Detailed description of the offer"
    }),
    defineField({
      name: "description_fr",
      title: "Offer Description (French)",
      type: "text",
      description: "French translation of the offer description"
    }),
    defineField({
      name: "description_ar",
      title: "Offer Description (Arabic)",
      type: "text",
      description: "Arabic translation of the offer description"
    }),

    // Offer Status and Timing
    defineField({
      name: "isActive",
      title: "Offer Status",
      type: "string",
      options: {
        list: [
          { title: "Active - Live on website", value: "active" },
          { title: "Draft - Not visible", value: "draft" },
          { title: "Scheduled - Will activate later", value: "scheduled" },
          { title: "Expired - No longer active", value: "expired" }
        ]
      },
      initialValue: "active",
      description: "Current status of this discount offer"
    }),

    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "When the offer becomes active"
    }),

    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "When the offer expires"
    }),

    defineField({
      name: "timeRemainingDisplay",
      title: "Time Remaining Display",
      type: "string",
      options: {
        list: [
          { title: "30 seconds (Testing)", value: "30s" },
          { title: "12 hours", value: "12h" },
          { title: "24 hours", value: "24h" },
          { title: "48 hours", value: "48h" },
          { title: "72 hours", value: "72h" },
          { title: "Custom", value: "custom" }
        ]
      },
      initialValue: "24h",
      description: "How to display the time remaining (for UI purposes)"
    }),

    // Offer ID and Eligibility
    defineField({
      name: "offerId",
      title: "Offer ID",
      type: "string",
      initialValue: () => `offer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      readOnly: true,
      description: "Auto-generated unique identifier for this offer"
    }),

    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "string",
      options: {
        list: [
          { title: "All Visitors", value: "all_users" },
          { title: "New Customers Only", value: "new_customers" },
          { title: "Returning Customers", value: "returning_customers" },
          { title: "Loyalty Program Members", value: "loyalty_members" },
          { title: "First-time Website Visitors", value: "first_time_visitors" }
        ]
      },
      initialValue: "all_users",
      description: "Who should see this discount offer"
    }),

    defineField({
      name: "minimumCartValue",
      title: "Minimum Cart Value",
      type: "number",
      description: "Minimum cart value required for eligibility (in DT)",
      validation: (r) => r.min(0)
    }),

    // Products in the Offer
    defineField({
      name: "featuredProducts",
      title: "Featured Products",
      type: "array",
      of: [
        {
          type: "object",
          name: "offerProduct",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (r) => r.required(),
              description: "Select the product for this offer"
            }),

            defineField({
              name: "discountType",
              title: "How to Apply Discount",
              type: "string",
              options: {
                list: [
                  { title: "Percentage Off (e.g., 20% off)", value: "percentage" },
                  { title: "Fixed Amount Off (e.g., 10 DT off)", value: "fixed" },
                  { title: "Set Final Price (e.g., sale for 50 DT)", value: "final_price" }
                ]
              },
              initialValue: "percentage",
              validation: (r) => r.required(),
              description: "Choose how the discount should be calculated"
            }),

            defineField({
              name: "discountValue",
              title: "Discount Value",
              type: "number",
              validation: (r) => r.required().min(0),
              description: "Percentage (0-100) or fixed amount in DT"
            }),

            defineField({
              name: "maxDiscountAmount",
              title: "Maximum Discount Amount",
              type: "number",
              description: "Maximum discount amount for percentage discounts (optional)",
              validation: (r) => r.min(0)
            }),

            defineField({
              name: "customImage",
              title: "Custom Product Image",
              type: "image",
              description: "Optional custom image for this offer (overrides product gallery)"
            }),

            defineField({
              name: "priority",
              title: "Display Priority",
              type: "number",
              initialValue: 1,
              description: "Higher numbers appear first (1-10)",
              validation: (r) => r.min(1).max(10)
            })
          ],
          preview: {
            select: {
              title: "product.title",
              discountType: "discountType",
              discountValue: "discountValue",
              media: "customImage"
            },
            prepare(selection) {
              const { title, discountType, discountValue, media } = selection;
              const discountText = discountType === 'percentage'
                ? `${discountValue}% off`
                : `${discountValue} DT off`;
              return {
                title: title || "Product",
                subtitle: discountText,
                media: media
              };
            }
          }
        }
      ],
      validation: (r) => r.min(1).max(6),
      description: "Add products to feature in this discount offer (1-6 products)"
    }),

    // Display Settings
    defineField({
      name: "priority",
      title: "Offer Priority",
      type: "string",
      options: {
        list: [
          { title: "High Priority (Show first)", value: "high" },
          { title: "Normal Priority (Default)", value: "normal" },
          { title: "Low Priority (Show last)", value: "low" }
        ]
      },
      initialValue: "normal",
      description: "Priority level for this offer when multiple offers are active"
    }),

    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 1,
      description: "Order in which offers are displayed (lower numbers first)",
      validation: (r) => r.min(1),
      hidden: true // Hide this since we use priority now
    }),

    defineField({
      name: "popupDelay",
      title: "When to Show Popup",
      type: "string",
      options: {
        list: [
          { title: "After 10 seconds", value: "10" },
          { title: "After 15 seconds", value: "15" },
          { title: "After 30 seconds (Recommended)", value: "30" },
          { title: "After 45 seconds", value: "45" },
          { title: "After 60 seconds", value: "60" }
        ]
      },
      initialValue: "30",
      description: "How long to wait before showing the discount popup"
    }),

    defineField({
      name: "scrollTrigger",
      title: "Alternative Trigger",
      type: "string",
      options: {
        list: [
          { title: "No scroll trigger (time only)", value: "0" },
          { title: "After scrolling 200 pixels", value: "200" },
          { title: "After scrolling 500 pixels (Recommended)", value: "500" },
          { title: "After scrolling 800 pixels", value: "800" },
          { title: "After scrolling 1000 pixels", value: "1000" }
        ]
      },
      initialValue: "500",
      description: "Show popup when user scrolls this distance (whichever comes first)"
    }),

    // Analytics and Tracking
    defineField({
      name: "trackingCode",
      title: "Tracking Code",
      type: "string",
      initialValue: () => `track_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      readOnly: true,
      description: "Auto-generated tracking code for analytics"
    }),

    defineField({
      name: "conversionGoal",
      title: "Conversion Goal",
      type: "string",
      options: {
        list: [
          { title: "Add to Cart", value: "add_to_cart" },
          { title: "Purchase", value: "purchase" },
          { title: "Newsletter Signup", value: "newsletter" },
          { title: "Account Creation", value: "account_creation" }
        ]
      },
      description: "Primary goal for this offer"
    }),

    // Additional Metadata
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Tags for organizing and filtering offers",
      options: {
        layout: "tags"
      }
    }),

    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description: "Notes for internal use only (not displayed to users)"
    })
  ],

  preview: {
    select: {
      title: "title",
      isActive: "isActive",
      endDate: "endDate",
      featuredProducts: "featuredProducts"
    },
    prepare(selection) {
      const { title, isActive, endDate, featuredProducts } = selection;
      const productCount = featuredProducts?.length || 0;
      const status = isActive ? "Active" : "Inactive";

      let subtitle = `${status} • ${productCount} product${productCount !== 1 ? 's' : ''}`;

      if (endDate) {
        const end = new Date(endDate);
        const now = new Date();
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
          subtitle += ` • Expires in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
        } else if (diffDays === 0) {
          subtitle += " • Expires today";
        } else {
          subtitle += " • Expired";
        }
      }

      return {
        title: title || "Untitled Offer",
        subtitle
      };
    }
  },

  orderings: [
    {
      title: "Display Order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }]
    },
    {
      title: "Newest First",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }]
    },
    {
      title: "Active First",
      name: "activeFirst",
      by: [{ field: "isActive", direction: "desc" }, { field: "_createdAt", direction: "desc" }]
    }
  ]
});