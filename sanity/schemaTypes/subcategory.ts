// studio/schemas/subcategory.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "subcategory",
  title: "Subcategories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
    }),

  ],
});