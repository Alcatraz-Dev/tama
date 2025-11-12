import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "price",
      type: "number",
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
      description: "List of materials used in the product",
    }),

    // ✅ Care Instructions
    defineField({
      name: "careInstructions",
      title: "Care Instructions",
      type: "array",
      of: [{ type: "string" }],
      description: "Care instructions for the product",
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
      type: "text",
      description: "Shipping and delivery information",
    }),

    // ✅ Return Policy
    defineField({
      name: "returnPolicy",
      title: "Return Policy",
      type: "text",
      description: "Return and exchange policy",
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
      type: "number",
      initialValue: 0,
      description: "Popularity score for sorting (higher = more popular)",
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
