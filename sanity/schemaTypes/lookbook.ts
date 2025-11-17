// studio/schemas/lookbook.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "tamastories",
  title: "tamastories",
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
      title: "Description (English)",
      type: "text",
      description: "Brief description of the lookbook",
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
      title: "Styling Tips",
      type: "string",
      description: "Tips on how to style the look",
      options: {
        list: [
          { title: "Layer with a lightweight jacket for transitional weather", value: "layer_jacket" },
          { title: "Pair with neutral accessories to keep the focus on the outfit", value: "neutral_accessories" },
          { title: "Add a belt to define your waist and enhance the silhouette", value: "belt_waist" },
          { title: "Complete the look with comfortable yet stylish footwear", value: "comfortable_footwear" },
          { title: "Mix patterns carefully for a bold, fashion-forward statement", value: "mix_patterns" },
          { title: "Choose pieces that can transition from day to night effortlessly", value: "day_night_transition" },
          { title: "Incorporate metallic accents for a touch of glamour", value: "metallic_accents" },
          { title: "Opt for breathable fabrics perfect for all-day wear", value: "breathable_fabrics" },
          { title: "Balance fitted and relaxed pieces for optimal comfort and style", value: "fitted_relaxed_balance" },
          { title: "Add a scarf or shawl for an instant style upgrade", value: "scarf_shawl" },
        ],
      },
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
      type: "string",
      title: "Year",
      description: "Collection year",
      options: {
        list: [
          { title: "2024", value: "2024" },
          { title: "2025", value: "2025" },
          { title: "2026", value: "2026" },
          { title: "2027", value: "2027" },
          { title: "2028", value: "2028" },
          { title: "2029", value: "2029" },
          { title: "2030", value: "2030" },
        ],
      },
    }),
    defineField({
      name: "theme",
      type: "string",
      title: "Theme",
      description: "Lookbook theme or inspiration",
      options: {
        list: [
          { title: "Casual", value: "casual" },
          { title: "Elegant", value: "elegant" },
          { title: "Bohemian", value: "bohemian" },
          { title: "Minimalist", value: "minimalist" },
          { title: "Streetwear", value: "streetwear" },
          { title: "Vintage", value: "vintage" },
          { title: "Romantic", value: "romantic" },
          { title: "Athletic", value: "athletic" },
          { title: "Professional", value: "professional" },
          { title: "Festive", value: "festive" },
        ],
      },
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