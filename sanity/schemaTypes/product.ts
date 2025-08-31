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
