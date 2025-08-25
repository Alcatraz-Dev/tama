// studio/schemas/lookbook.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "lookbook",
  title: "Lookbook",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "products",
      title: "Products in this look",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
});