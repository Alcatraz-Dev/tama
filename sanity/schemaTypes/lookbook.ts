// studio/schemas/lookbook.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "lookbook",
  title: "Style Story",
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
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .slice(0, 96)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Brief description of the lookbook",
    }),
    defineField({
      name: "stylingTips",
      type: "text",
      title: "Styling Tips",
      description: "Tips on how to style the look",
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
      description: "Lookbook theme or inspiration",
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Lookbook Images",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "products",
      title: "Products in this look",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
});