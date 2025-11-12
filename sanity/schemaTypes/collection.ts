// studio/schemas/collection.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "collection",
  title: "Collections",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Brief description of the collection",
    }),
    defineField({
      name: "stylingTips",
      type: "text",
      title: "Styling Tips",
      description: "Tips on how to style items from this collection",
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