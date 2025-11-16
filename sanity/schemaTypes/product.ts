import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title_fr",
      title: "Title (French)",
      type: "string",
    }),
    defineField({
      name: "title_ar",
      title: "Title (Arabic)",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
    }),
    defineField({
      name: "description_fr",
      title: "Description (French)",
      type: "text",
    }),
    defineField({
      name: "description_ar",
      title: "Description (Arabic)",
      type: "text",
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (r) => r.min(0),
    }),

    // ✅ Original Price (for discounts)
    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number",
      description: "Original price before discount (leave empty if no discount)",
      validation: (r) => r.min(0),
    }),

    // ✅ Product Media (Images + optional video)
    defineField({
      name: "gallery",
      title: "Product Media",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
        {
          type: "file",
          name: "video",
          title: "Video (optional)",
          options: {
            accept: "video/*",
          },
        },
      ],
    }),

    // ✅ Colors with preview
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [
        {
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
            ],
          },
        },
      ],
    }),

    // ✅ Sizes
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "XS" },
          { title: "S", value: "S" },
          { title: "M", value: "M" },
          { title: "L", value: "L" },
          { title: "XL", value: "XL" },
          { title: "XXL", value: "XXL" },
        ],
      },
    }),

    // ✅ Categories / Subcategories
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
    }),


    // ✅ Stock
    defineField({
      name: "inStock",
      type: "boolean",
      initialValue: true,
    }),

    // ✅ Materials
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Cotton", value: "Cotton" },
          { title: "Polyester", value: "Polyester" },
          { title: "Silk", value: "Silk" },
          { title: "Wool", value: "Wool" },
          { title: "Linen", value: "Linen" },
          { title: "Leather", value: "Leather" },
          { title: "Denim", value: "Denim" },
          { title: "Chiffon", value: "Chiffon" },
          { title: "Satin", value: "Satin" },
          { title: "Velvet", value: "Velvet" },
          { title: "Lace", value: "Lace" },
          { title: "Mesh", value: "Mesh" },
          { title: "Nylon", value: "Nylon" },
          { title: "Spandex", value: "Spandex" },
          { title: "Rayon", value: "Rayon" },
          { title: "Acrylic", value: "Acrylic" },
        ],
      },
      description: "Select materials used in the product",
    }),

    // ✅ Care Instructions
    defineField({
      name: "careInstructions",
      title: "Care Instructions",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Machine wash cold", value: "Machine wash cold" },
          { title: "Hand wash only", value: "Hand wash only" },
          { title: "Do not wash", value: "Do not wash" },
          { title: "Dry clean only", value: "Dry clean only" },
          { title: "Tumble dry low", value: "Tumble dry low" },
          { title: "Hang dry", value: "Hang dry" },
          { title: "Do not tumble dry", value: "Do not tumble dry" },
          { title: "Iron on low heat", value: "Iron on low heat" },
          { title: "Do not iron", value: "Do not iron" },
          { title: "Do not bleach", value: "Do not bleach" },
          { title: "Bleach when needed", value: "Bleach when needed" },
          { title: "Store in cool, dry place", value: "Store in cool, dry place" },
          { title: "Avoid direct sunlight", value: "Avoid direct sunlight" },
          { title: "Professional cleaning recommended", value: "Professional cleaning recommended" },
        ],
      },
      description: "Select care instructions for the product",
    }),

    // ✅ Product Details
    defineField({
      name: "productDetails",
      title: "Product Details",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              type: "string",
              title: "Label",
            },
            {
              name: "value",
              type: "string",
              title: "Value",
            },
          ],
        },
      ],
      description: "Additional product details like fit, style, etc.",
    }),

    // ✅ Shipping Info
    defineField({
      name: "shippingInfo",
      title: "Shipping Information",
      type: "string",
      options: {
        list: [
          { title: "Free shipping on orders over 100 DT", value: "Free shipping on orders over 100 DT. Standard delivery within 3-5 business days." },
          { title: "Express shipping available", value: "Express shipping available for 15 DT. Standard delivery within 3-5 business days." },
          { title: "International shipping available", value: "International shipping available. Delivery time 7-14 business days depending on location." },
          { title: "Local pickup available", value: "Local pickup available at our store. Free shipping on orders over 50 DT." },
          { title: "Same day delivery in Tunis", value: "Same day delivery available in Tunis for orders placed before 2 PM." },
          { title: "Premium shipping", value: "Premium shipping available for 25 DT. Guaranteed delivery within 2 business days." },
        ],
      },
      description: "Select shipping information for the product",
    }),

    // ✅ Return Policy
    defineField({
      name: "returnPolicy",
      title: "Return Policy",
      type: "string",
      options: {
        list: [
          { title: "30-day return policy", value: "30-day return policy. Items must be unused and in original packaging." },
          { title: "14-day return policy", value: "14-day return policy. Items must be unused and in original packaging." },
          { title: "7-day return policy", value: "7-day return policy. Items must be unused and in original packaging." },
          { title: "No returns on sale items", value: "No returns on sale items. Final sale items are not eligible for return." },
          { title: "Free returns and exchanges", value: "Free returns and exchanges within 30 days. Items must be unused and in original packaging." },
          { title: "Store credit only", value: "Returns accepted within 30 days for store credit only. Items must be unused and in original packaging." },
          { title: "No returns", value: "No returns accepted on this item. All sales are final." },
        ],
      },
      description: "Select return policy for the product",
    }),

    // ✅ Sale
    defineField({
      name: "onSale",
      title: "On Sale",
      type: "boolean",
      initialValue: false,
      description: "Is this product currently on sale?",
    }),

    // ✅ Popularity (for sorting)
    defineField({
      name: "popularity",
      title: "Popularity Score",
      type: "string",
      options: {
        list: [
          { title: "Very Low (0-20)", value: "1" },
          { title: "Low (21-40)", value: "2" },
          { title: "Medium (41-60)", value: "3" },
          { title: "High (61-80)", value: "4" },
          { title: "Very High (81-100)", value: "5" },
        ],
      },
      initialValue: "3",
      description: "Select popularity score for sorting (higher = more popular)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      gallery: "gallery",
    },
    prepare(selection) {
      const { title, gallery } = selection;
      // find the first item that is an image
      const imageItem = gallery?.find((item: any) => item._type === "image");
      return {
        title,
        media: imageItem,
      };
    },
  },
});
