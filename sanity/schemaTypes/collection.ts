// studio/schemas/collection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "collection",
  title: "Collections",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
});