import { defineField, defineType } from "sanity";

export default defineType({
  name: "specialEvent",
  title: "Special Events",
  type: "document",
  fields: [
    // Quick Setup - Event Template
    defineField({
      name: "eventTemplate",
      title: "🎯 Quick Setup - Choose Event Template",
      type: "string",
      options: {
        list: [
          { title: "🎄 Black Friday Sale", value: "black_friday" },
          { title: "🎅 Christmas Sale", value: "christmas" },
          { title: "🎊 New Year Sale", value: "new_year" },
          { title: "💝 Valentine's Day", value: "valentines" },
          { title: "🐰 Easter Sale", value: "easter" },
          { title: "☀️ Summer Sale", value: "summer" },
          { title: "🎒 Back to School", value: "back_to_school" },
          { title: "⚡ Flash Sale", value: "flash_sale" },
          { title: "🧹 Clearance Sale", value: "clearance" },
          { title: "🎉 Custom Event", value: "custom" },
        ],
      },
      initialValue: "black_friday",
      description:
        "Choose a pre-configured event template to auto-fill most settings",
    }),

    // Basic Event Information (auto-filled based on template)
    defineField({
      name: "eventName",
      title: "Event Name (English)",
      type: "string",
      validation: (r) => r.required(),
      description: "The name of the special event",
      initialValue: "Black Friday Sale",
    }),
    defineField({
      name: "eventName_fr",
      title: "Event Name (French)",
      type: "string",
      description: "French translation of the event name",
      initialValue: "Soldes du Black Friday",
    }),
    defineField({
      name: "eventName_ar",
      title: "Event Name (Arabic)",
      type: "string",
      description: "Arabic translation of the event name",
      initialValue: "تخفيضات الجمعة السوداء",
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Holiday Sale", value: "holiday_sale" },
          { title: "Seasonal Promotion", value: "seasonal" },
          { title: "Flash Sale", value: "flash_sale" },
          { title: "Clearance Sale", value: "clearance" },
          { title: "Custom Event", value: "custom" },
        ],
      },
      initialValue: "holiday_sale",
      hidden: true, // Auto-set based on template
    }),

    // Quick Theme Selector
    defineField({
      name: "themePreset",
      title: "🎨 Quick Theme - Choose Color Scheme",
      type: "string",
      options: {
        list: [
          { title: "🔴 Black Friday (Red & Black)", value: "black_friday" },
          { title: "🎄 Christmas (Red & Green)", value: "christmas" },
          { title: "🎊 New Year (Gold & Black)", value: "new_year" },
          { title: "💝 Valentine's (Pink & Red)", value: "valentines" },
          { title: "🐰 Easter (Pastel & Yellow)", value: "easter" },
          { title: "☀️ Summer (Blue & Yellow)", value: "summer" },
          { title: "📚 Back to School (Blue & White)", value: "school" },
          { title: "⚡ Flash Sale (Orange & Red)", value: "flash" },
          { title: "🧹 Clearance (Gray & Black)", value: "clearance" },
          { title: "🎯 Custom Colors", value: "custom" },
        ],
      },
      initialValue: "black_friday",
      description: "Choose a pre-designed color scheme for your event",
    }),

    defineField({
      name: "headline",
      title: "Headline (English)",
      type: "string",
      validation: (r) => r.required(),
      description: "Main headline for the popup",
      initialValue: "BLACK FRIDAY MADNESS!",
    }),
    defineField({
      name: "headline_fr",
      title: "Headline (French)",
      type: "string",
      description: "French translation of the headline",
      initialValue: "FOU DU BLACK FRIDAY!",
    }),
    defineField({
      name: "headline_ar",
      title: "Headline (Arabic)",
      type: "string",
      description: "Arabic translation of the headline",
      initialValue: "جنون الجمعة السوداء!",
    }),

    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      description: "Detailed description of the event",
      initialValue:
        "Massive savings on all products! Up to 70% off everything. Don't miss out on the biggest sale of the year!",
    }),
    defineField({
      name: "description_fr",
      title: "Description (French)",
      type: "text",
      description: "French translation of the description",
      initialValue:
        "Économies massives sur tous les produits ! Jusqu'à 70% de réduction sur tout. Ne manquez pas la plus grande vente de l'année !",
    }),
    defineField({
      name: "description_ar",
      title: "Description (Arabic)",
      type: "text",
      description: "Arabic translation of the description",
      initialValue:
        "توفيرات هائلة على جميع المنتجات! حتى 70% خصم على كل شيء. لا تفوت أكبر تخفيضات العام!",
    }),

    // Event Status and Timing
    defineField({
      name: "isActive",
      title: "Event Status",
      type: "string",
      options: {
        list: [
          { title: "Active - Live on website", value: "active" },
          { title: "Draft - Not visible", value: "draft" },
          { title: "Scheduled - Will activate later", value: "scheduled" },
          { title: "Expired - No longer active", value: "expired" },
        ],
      },
      initialValue: "active",
      description: "Current status of this special event",
    }),

    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (r) => r.required(),
      description: "When the event becomes active",
    }),

    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      validation: (r) => r.required(),
      description: "When the event expires",
    }),

    // Quick Features Setup
    defineField({
      name: "featuresTemplate",
      title: "⚡ Quick Features - Choose Feature Set",
      type: "string",
      options: {
        list: [
          {
            title: "🤑 Big Sale (70% off + Free Shipping + Bonus Points)",
            value: "big_sale",
          },
          {
            title: "🎁 Holiday Bundle (Discount + Gift + Free Shipping)",
            value: "holiday_bundle",
          },
          {
            title: "⚡ Flash Deal (High Discount + Limited Time)",
            value: "flash_deal",
          },
          {
            title: "🎯 Student Special (Discount + Free Shipping)",
            value: "student_special",
          },
          {
            title: "🧹 Clearance (Deep Discount + Free Shipping)",
            value: "clearance",
          },
          { title: "🎉 Custom Features", value: "custom" },
        ],
      },
      initialValue: "big_sale",
      description: "Choose a pre-configured set of features for your event",
    }),

    // Event Features (auto-populated based on template)
    defineField({
      name: "eventFeatures",
      title: "Event Features",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          fields: [
            defineField({
              name: "featureType",
              title: "Feature Type",
              type: "string",
              options: {
                list: [
                  { title: "Discount Offers", value: "discount_offers" },
                  { title: "Bonus Points", value: "bonus_points" },
                  { title: "Free Shipping", value: "free_shipping" },
                  { title: "Gift with Purchase", value: "gift_with_purchase" },
                  { title: "Flash Deals", value: "flash_deals" },
                ],
              },
              validation: (r) => r.required(),
              description: "Type of feature",
            }),

            defineField({
              name: "featureTitle",
              title: "Feature Title (English)",
              type: "string",
              validation: (r) => r.required(),
              description: "Title for this feature",
              initialValue: "Up to 70% Off",
            }),
            defineField({
              name: "featureTitle_fr",
              title: "Feature Title (French)",
              type: "string",
              description: "French translation",
              initialValue: "Jusqu'à 70% de réduction",
            }),
            defineField({
              name: "featureTitle_ar",
              title: "Feature Title (Arabic)",
              type: "string",
              description: "Arabic translation",
              initialValue: "خصم يصل إلى 70%",
            }),

            defineField({
              name: "featureDescription",
              title: "Feature Description (English)",
              type: "text",
              description: "Description of this feature",
              initialValue: "Massive discounts on all categories",
            }),
            defineField({
              name: "featureDescription_fr",
              title: "Feature Description (French)",
              type: "text",
              description: "French translation",
              initialValue: "Réductions massives sur toutes les catégories",
            }),
            defineField({
              name: "featureDescription_ar",
              title: "Feature Description (Arabic)",
              type: "text",
              description: "Arabic translation",
              initialValue: "خصومات هائلة على جميع الفئات",
            }),

            defineField({
              name: "featureValue",
              title: "Feature Value",
              type: "string",
              description: "Value (e.g., '70% OFF', 'FREE')",
              initialValue: "70% OFF",
            }),

            defineField({
              name: "featureIcon",
              title: "Feature Icon",
              type: "string",
              options: {
                list: [
                  { title: "🏷️ Discount Tag", value: "tag" },
                  { title: "🎁 Gift Box", value: "gift" },
                  { title: "✨ Sparkles", value: "sparkles" },
                  { title: "🚚 Truck (Shipping)", value: "truck" },
                  { title: "🏆 Trophy", value: "trophy" },
                  { title: "⭐ Star", value: "star" },
                  { title: "🔥 Fire (Hot Deal)", value: "fire" },
                  { title: "⏰ Clock", value: "clock" },
                ],
              },
              initialValue: "tag",
              description: "Icon to represent this feature",
            }),

            defineField({
              name: "isPrimary",
              title: "Primary Feature",
              type: "boolean",
              initialValue: true,
              description: "Mark as primary feature (will be highlighted)",
            }),
          ],
          preview: {
            select: {
              title: "featureTitle",
              type: "featureType",
              value: "featureValue",
              primary: "isPrimary",
            },
            prepare(selection) {
              const { title, type, value, primary } = selection;
              return {
                title: title || "Feature",
                subtitle: `${value || ""} ${primary ? "(Primary)" : ""}`,
              };
            },
          },
        },
      ],
      description: "Features and benefits of this special event",
      initialValue: [
        {
          _type: "feature",
          featureType: "discount_offers",
          featureTitle: "Up to 70% Off",
          featureTitle_fr: "Jusqu'à 70% de réduction",
          featureTitle_ar: "خصم يصل إلى 70%",
          featureDescription: "Massive discounts on all categories",
          featureDescription_fr:
            "Réductions massives sur toutes les catégories",
          featureDescription_ar: "خصومات هائلة على جميع الفئات",
          featureValue: "70% OFF",
          featureIcon: "tag",
          isPrimary: true,
        },
        {
          _type: "feature",
          featureType: "free_shipping",
          featureTitle: "Free Shipping",
          featureTitle_fr: "Livraison gratuite",
          featureTitle_ar: "شحن مجاني",
          featureDescription: "Free delivery on all orders over $50",
          featureDescription_fr:
            "Livraison gratuite sur toutes les commandes de plus de 50€",
          featureDescription_ar: "توصيل مجاني لجميع الطلبات فوق 50 دولار",
          featureValue: "FREE",
          featureIcon: "truck",
          isPrimary: true,
        },
        {
          _type: "feature",
          featureType: "bonus_points",
          featureTitle: "Double Points",
          featureTitle_fr: "Points doubles",
          featureTitle_ar: "نقاط مضاعفة",
          featureDescription: "Earn double loyalty points on all purchases",
          featureDescription_fr:
            "Gagnez des points de fidélité doubles sur tous les achats",
          featureDescription_ar: "اكسب نقاط ولاء مضاعفة على جميع المشتريات",
          featureValue: "2x Points",
          featureIcon: "star",
          isPrimary: false,
        },
      ],
    }),

    // Visual Design (auto-populated based on theme preset)
    defineField({
      name: "themeColors",
      title: "🎨 Custom Theme Colors",
      type: "object",
      fields: [
        defineField({
          name: "primaryColor",
          title: "Primary Color",
          type: "color",
          options: {
            disableAlpha: false, // allow transparency
            colorList: [
              "#FF6900",
              "#FCB900",
              "#7BDCB5",
              "#00D084",
              "#8ED1FC",
              "#0693E3",
              "#EB144C",
              "#F78DA7",
              "#9900EF",
              "#F59E0B",
              "#DC2626",
              "#000000",
            ],
          },
          // initialValue: { hex: "#DC2626" }, // Red for Black Friday
          description: "Main color for the event theme",
        }),
        defineField({
          name: "secondaryColor",
          title: "Secondary Color",
          type: "color",
          options: {
            disableAlpha: false, // allow transparency
            colorList: [
              "#FF6900",
              "#FCB900",
              "#7BDCB5",
              "#00D084",
              "#8ED1FC",
              "#0693E3",
              "#EB144C",
              "#F78DA7",
              "#9900EF",
              "#F59E0B",
              "#DC2626",
              "#000000",
            ],
          },
          // initialValue: { hex: "#F59E0B" }, // Amber
          description: "Secondary color for accents",
        }),
        defineField({
          name: "backgroundColor",
          title: "Background Color",
          type: "color",
          options: {
            disableAlpha: false, // allow transparency
            colorList: [
              "#FF6900",
              "#FCB900",
              "#7BDCB5",
              "#00D084",
              "#8ED1FC",
              "#0693E3",
              "#EB144C",
              "#F78DA7",
              "#9900EF",
              "#F59E0B",
              "#DC2626",
              "#000000",
            ],
          },
          // initialValue: { hex: "#000000" }, // Black
          description: "Background color for the popup",
        }),
      ],
      description:
        "Custom color scheme for the event popup (auto-set based on theme choice above, but can be customized)",
      hidden: false, // Show this section for custom colors
    }),

    // Advanced Settings (collapsible)
    defineField({
      name: "advancedSettings",
      title: "⚙️ Advanced Settings (Optional)",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "mainImage",
          title: "Main Image",
          type: "image",
          description: "Main promotional image for the event popup",
          options: {
            hotspot: true,
          },
        }),

        defineField({
          name: "backgroundPattern",
          title: "Background Pattern",
          type: "string",
          options: {
            list: [
              { title: "None", value: "none" },
              { title: "Snowflakes (Christmas)", value: "snowflakes" },
              { title: "Hearts (Valentine's)", value: "hearts" },
              { title: "Stars", value: "stars" },
              { title: "Fireworks", value: "fireworks" },
              { title: "Leaves (Autumn)", value: "leaves" },
              { title: "Flowers (Spring)", value: "flowers" },
            ],
          },
          initialValue: "none",
          description: "Animated background pattern for the event",
        }),

        defineField({
          name: "popupDelay",
          title: "Popup Delay",
          type: "number",
          initialValue: 10,
          description: "Seconds to wait before showing popup",
          validation: (r) => r.min(0).max(300),
        }),

        defineField({
          name: "scrollTrigger",
          title: "Scroll Trigger",
          type: "number",
          initialValue: 300,
          description: "Pixels to scroll before showing popup",
          validation: (r) => r.min(0),
        }),

        defineField({
          name: "maxDisplays",
          title: "Maximum Displays",
          type: "number",
          initialValue: 3,
          description: "How many times to show this popup per user session",
          validation: (r) => r.min(1).max(10),
        }),

        defineField({
          name: "priority",
          title: "Priority",
          type: "number",
          initialValue: 10,
          description:
            "Priority when multiple events are active (higher = more important)",
          validation: (r) => r.min(1).max(10),
        }),
      ],
    }),

    // Discount Products Setup
    defineField({
      name: "discountProducts",
      title: "🏷️ Discount Products - Select Products for Discount",
      type: "array",
      of: [
        {
          type: "object",
          name: "discountProduct",
          fields: [
            defineField({
              name: "product",
              title: "Select Product",
              type: "reference",
              to: [{ type: "product" }],
              validation: (r) => r.required(),
              description: "Choose a product to offer with discount",
            }),
            defineField({
              name: "discountType",
              title: "Discount Type",
              type: "string",
              options: {
                list: [
                  { title: "Percentage Off", value: "percentage" },
                  { title: "Fixed Amount Off", value: "fixed" },
                  { title: "Final Price", value: "final_price" },
                ],
              },
              initialValue: "percentage",
              description: "How to apply the discount",
            }),
            defineField({
              name: "discountValue",
              title: "Discount Value",
              type: "number",
              validation: (r) => r.required().min(0),
              description:
                "Percentage (e.g., 20), fixed amount (e.g., 10), or final price depending on type above",
            }),
            defineField({
              name: "maxDiscountAmount",
              title: "Max Discount Amount (Optional)",
              type: "number",
              description: "Maximum discount amount for percentage discounts",
            }),
            defineField({
              name: "customImage",
              title: "Custom Product Image (Optional)",
              type: "image",
              description:
                "Use a different image for this product in the popup",
            }),
          ],
          preview: {
            select: {
              title: "product",
              discountType: "discountType",
              discountValue: "discountValue",
            },
            prepare(selection) {
              const { title, discountType, discountValue } = selection;
              return {
                title: title?.title || "Product",
                subtitle: `${discountValue || 0}${discountType === "percentage" ? "%" : " DT"} off`,
              };
            },
          },
        },
      ],
      description: "Select products to offer with discount in this event popup",
    }),

    // Hidden system fields
    defineField({
      name: "eventId",
      title: "Event ID",
      type: "string",
      initialValue: () =>
        `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      readOnly: true,
      hidden: true,
    }),

    defineField({
      name: "trackingCode",
      title: "Tracking Code",
      type: "string",
      initialValue: () =>
        `track_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      readOnly: true,
      hidden: true,
    }),

    // Optional metadata (collapsed)
    defineField({
      name: "metadata",
      title: "📝 Optional Metadata",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "string" }],
          description: "Tags for organizing and filtering events",
          options: {
            layout: "tags",
          },
        }),

        defineField({
          name: "internalNotes",
          title: "Internal Notes",
          type: "text",
          description: "Notes for internal use only",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "eventName",
      template: "eventTemplate",
      theme: "themePreset",
      isActive: "isActive",
      startDate: "startDate",
      endDate: "endDate",
    },
    prepare(selection) {
      const { title, template, theme, isActive, startDate, endDate } =
        selection;
      const status = isActive === "active" ? "🟢 Active" : "⚪ Inactive";

      let subtitle = status;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();

        if (now < start) {
          subtitle += " • 📅 Upcoming";
        } else if (now > end) {
          subtitle += " • ⏰ Ended";
        } else {
          subtitle += " • 🔥 Live";
        }
      }

      // Add template/theme info
      if (template && template !== "custom") {
        const templateEmojis: Record<string, string> = {
          black_friday: "🎄",
          christmas: "🎅",
          new_year: "🎊",
          valentines: "💝",
          easter: "🐰",
          summer: "☀️",
          back_to_school: "🎒",
          flash_sale: "⚡",
          clearance: "🧹",
        };

        const templateEmoji = templateEmojis[template] || "🎯";
        subtitle += ` • ${templateEmoji} ${template.replace("_", " ")}`;
      }

      return {
        title: title || "Special Event",
        subtitle,
      };
    },
  },

  orderings: [
    {
      title: "Start Date",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
    {
      title: "Priority",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
    {
      title: "Newest First",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
