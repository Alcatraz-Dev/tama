import { defineField, defineType } from "sanity";

export default defineType({
  name: "popup",
  title: "Reusable Popups",
  type: "document",
  fields: [
    // Popup Type Selection
    defineField({
      name: "popupType",
      title: "Popup Type",
      type: "string",
      options: {
        list: [
          { title: "🚪 Exit-Intent Popup", value: "exit_intent" },
          { title: "⏰ Limited-Time Offer Popup", value: "limited_time_offer" },
          { title: "🚚 Free-Shipping Threshold Popup", value: "free_shipping_threshold" },
          { title: "🛍️ Post-Purchase Upsell Popup", value: "post_purchase_upsell" },
        ],
      },
      validation: (r) => r.required(),
      description: "Choose the type of popup to create",
    }),

    // Status
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Enable/disable this popup",
    }),

    // Translations Object
    defineField({
      name: "translations",
      title: "Content Translations",
      type: "object",
      fields: [
        // English
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "text",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "ctaText",
              title: "CTA Button Text",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "incentive",
              title: "Incentive (Optional)",
              type: "string",
              description: "Discount code, free shipping threshold, etc.",
            }),
          ],
        }),
        // French
        defineField({
          name: "fr",
          title: "French",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "text",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "ctaText",
              title: "CTA Button Text",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "incentive",
              title: "Incentive (Optional)",
              type: "string",
            }),
          ],
        }),
        // Arabic
        defineField({
          name: "ar",
          title: "Arabic",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "text",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "ctaText",
              title: "CTA Button Text",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "incentive",
              title: "Incentive (Optional)",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (r) => r.required(),
    }),

    // Design Configuration
    defineField({
      name: "design",
      title: "Design Settings",
      type: "object",
      fields: [
        defineField({
          name: "layoutType",
          title: "Layout Type",
          type: "string",
          options: {
            list: [
              { title: "🎯 Center Modal (Default)", value: "center_modal" },
              { title: "📱 Bottom Banner (Mobile-friendly)", value: "bottom_banner" },
              { title: "📋 Side Panel (Non-intrusive)", value: "side_panel" },
              { title: "🖼️ Image Focus (Hero style)", value: "image_focus" },
              { title: "📦 Product Grid (Multiple items)", value: "product_grid" },
            ],
          },
          initialValue: (context: any) => {
            const popupType = context?.parent?.popupType;
            switch (popupType) {
              case 'exit_intent': return 'center_modal';
              case 'limited_time_offer': return 'bottom_banner';
              case 'free_shipping_threshold': return 'side_panel';
              case 'post_purchase_upsell': return 'product_grid';
              default: return 'center_modal';
            }
          },
        }),
        defineField({
          name: "showImage",
          title: "Show Product Image",
          type: "boolean",
          initialValue: (context: any) => {
            const popupType = context?.parent?.popupType;
            // Show images by default for product-related popups
            return ['post_purchase_upsell', 'limited_time_offer'].includes(popupType);
          },
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "themeColors",
          title: "Theme Colors",
          type: "object",
          fields: [
            defineField({
              name: "primaryColor",
              title: "Primary Color",
              type: "color",
              options: {
                disableAlpha: false,
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
                  "#FFFFFF",
                ],
              },
              initialValue: { hex: "#DC2626" },
            }),
            defineField({
              name: "secondaryColor",
              title: "Secondary Color",
              type: "color",
              options: {
                disableAlpha: false,
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
                  "#FFFFFF",
                ],
              },
              initialValue: { hex: "#F59E0B" },
            }),
            defineField({
              name: "backgroundColor",
              title: "Background Color",
              type: "color",
              options: {
                disableAlpha: false,
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
                  "#FFFFFF",
                ],
              },
              initialValue: { hex: "#000000" },
            }),
          ],
        }),
      ],
    }),
  

    // Animation Configuration
    defineField({
      name: "animation",
      title: "Animation Settings",
      type: "object",
      fields: [
        defineField({
          name: "entranceAnimation",
          title: "Entrance Animation",
          type: "string",
          options: {
            list: [
              { title: "Fade In + Scale", value: "fade_scale" },
              { title: "Slide Up", value: "slide_up" },
              { title: "Slide Down", value: "slide_down" },
              { title: "Bounce In", value: "bounce_in" },
            ],
          },
          initialValue: "fade_scale",
        }),
        defineField({
          name: "exitAnimation",
          title: "Exit Animation",
          type: "string",
          options: {
            list: [
              { title: "Fade Out", value: "fade_out" },
              { title: "Slide Out", value: "slide_out" },
              { title: "Scale Down", value: "scale_down" },
            ],
          },
          initialValue: "fade_out",
        }),
        defineField({
          name: "duration",
          title: "Animation Duration (ms)",
          type: "number",
          initialValue: 300,
          validation: (r) => r.min(100).max(2000),
        }),
        defineField({
          name: "easing",
          title: "Easing Function",
          type: "string",
          options: {
            list: [
              { title: "Ease Out", value: "easeOut" },
              { title: "Ease In Out", value: "easeInOut" },
              { title: "Ease In", value: "easeIn" },
              { title: "Linear", value: "linear" },
            ],
          },
          initialValue: "easeOut",
        }),
      ],
      validation: (r) => r.required(),
    }),

    // Trigger Configuration
    defineField({
      name: "trigger",
      title: "Trigger Settings",
      type: "object",
      fields: [
        defineField({
          name: "triggerType",
          title: "Trigger Type",
          type: "string",
          options: {
            list: [
              { title: "Exit Intent", value: "exit_intent" },
              { title: "Scroll Percentage", value: "scroll_percentage" },
              { title: "Time Delay", value: "time_delay" },
              { title: "Page Load", value: "page_load" },
              { title: "Cart Threshold", value: "cart_threshold" },
              { title: "Purchase Complete", value: "purchase_complete" },
            ],
          },
          initialValue: (context: any) => {
            const popupType = context?.parent?.popupType;
            switch (popupType) {
              case 'exit_intent': return 'exit_intent';
              case 'limited_time_offer': return 'scroll_percentage';
              case 'free_shipping_threshold': return 'cart_threshold';
              case 'post_purchase_upsell': return 'purchase_complete';
              default: return 'page_load';
            }
          },
          validation: (r) => r.required(),
        }),
        defineField({
          name: "scrollPercentage",
          title: "Scroll Percentage (for scroll triggers)",
          type: "number",
          initialValue: (context: any) => {
            const popupType = context?.parent?.popupType;
            return popupType === 'limited_time_offer' ? 30 : 50;
          },
          validation: (r) => r.min(0).max(100),
          hidden: ({ parent }) => parent?.triggerType !== "scroll_percentage",
        }),
        defineField({
          name: "delayMs",
          title: "Delay (milliseconds)",
          type: "number",
          initialValue: 5000,
          validation: (r) => r.min(0),
          hidden: ({ parent }) => parent?.triggerType !== "time_delay",
        }),
        defineField({
          name: "cartThreshold",
          title: "Cart Value Threshold",
          type: "number",
          initialValue: (context: any) => {
            const popupType = context?.parent?.popupType;
            return popupType === 'free_shipping_threshold' ? 50 : 25;
          },
          validation: (r) => r.min(0),
          hidden: ({ parent }) => parent?.triggerType !== "cart_threshold",
        }),
        defineField({
          name: "maxDisplays",
          title: "Maximum Displays per Session",
          type: "number",
          initialValue: 3,
          validation: (r) => r.min(1).max(10),
        }),
        defineField({
          name: "displayFrequency",
          title: "Display Frequency",
          type: "string",
          options: {
            list: [
              { title: "Once per session", value: "once_per_session" },
              { title: "Once per day", value: "once_per_day" },
              { title: "Always show", value: "always" },
            ],
          },
          initialValue: "once_per_session",
        }),
      ],
      validation: (r) => r.required(),
    }),

    // Product Selection (for displaying products in popup)
    defineField({
      name: "selectedProducts",
      title: "Selected Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      description: "Select products to display in the popup",
      hidden: ({ document }) => !(document as any)?.design?.showImage,
      validation: (r) => r.max(6), // Limit to 6 products for performance
    }),

    // Metadata
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),

    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      initialValue: (context: any) => {
        const popupType = context?.parent?.popupType;
        switch (popupType) {
          case 'exit_intent': return 10; // Highest - last chance
          case 'post_purchase_upsell': return 8; // High - immediate opportunity
          case 'limited_time_offer': return 7; // Medium-high - time sensitive
          case 'free_shipping_threshold': return 6; // Medium - cart completion
          default: return 5;
        }
      },
      validation: (r) => r.min(1).max(10),
      description:
        "Higher priority popups show first when multiple are triggered",
    }),

    defineField({
      name: "targetAudience",
      title: "Target Audience",
      type: "array",
      of: [{ type: "string" }],
      initialValue: (context: any) => {
        const popupType = context?.parent?.popupType;
        switch (popupType) {
          case 'exit_intent':
            return ['new_visitors', 'cart_abandoners'];
          case 'limited_time_offer':
            return ['new_visitors', 'returning_customers'];
          case 'free_shipping_threshold':
            return ['cart_abandoners'];
          case 'post_purchase_upsell':
            return ['high_value_customers', 'returning_customers'];
          default:
            return ['new_visitors'];
        }
      },
      options: {
        list: [
          { title: "New Visitors", value: "new_visitors" },
          { title: "Returning Customers", value: "returning_customers" },
          { title: "Cart Abandoners", value: "cart_abandoners" },
          { title: "High-Value Customers", value: "high_value_customers" },
          { title: "Mobile Users", value: "mobile_users" },
        ],
      },
      description: "Target specific user segments",
    }),

    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      description: "Notes for internal use",
    }),
  ],

  preview: {
    select: {
      title: "translations.en.title",
      type: "popupType",
      active: "active",
      priority: "priority",
    },
    prepare(selection) {
      const { title, type, active, priority } = selection;
      const status = active ? "🟢 Active" : "⚪ Inactive";
      const typeLabels = {
        exit_intent: "Exit Intent",
        limited_time_offer: "Limited Time",
        free_shipping_threshold: "Free Shipping",
        post_purchase_upsell: "Post-Purchase",
      };

      return {
        title: title || "Untitled Popup",
        subtitle: `${status} • ${typeLabels[type as keyof typeof typeLabels] || type} • Priority: ${priority || 5}`,
      };
    },
  },

  orderings: [
    {
      title: "Priority (High to Low)",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
    {
      title: "Newest First",
      name: "createdDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Type",
      name: "typeAsc",
      by: [{ field: "popupType", direction: "asc" }],
    },
  ],
});
