// studio/schemas/collection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "collection",
  title: "Collections",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required()
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
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      description: "Brief description of the collection",
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
      name: "stylingTips",
      title: "Styling Tips (English)",
      type: "text",
      description: "Tips on how to style items from this collection",
    }),
    defineField({
      name: "stylingTips_fr",
      title: "Styling Tips (French)",
      type: "text",
    }),
    defineField({
      name: "stylingTips_ar",
      title: "Styling Tips (Arabic)",
      type: "text",
    }),
    defineField({
      name: "season",
      type: "string",
      title: "Season",
      options: {
        list: [
          { title: "Spring", value: "spring" },
          { title: "Summer", value: "summer" },
          { title: "Fall", value: "fall" },
          { title: "Winter", value: "winter" },
        ],
      },
    }),
    defineField({
      name: "year",
      type: "number",
      title: "Year",
      description: "Collection year",
    }),
    defineField({
      name: "theme",
      type: "string",
      title: "Theme",
      description: "Collection theme or inspiration",
    }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
});