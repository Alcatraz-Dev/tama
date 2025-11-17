// studio/schemas/category.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
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

  ],
});
