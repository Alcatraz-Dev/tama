// /schemas/heroCard.ts
import { defineField, defineType } from "sanity";
import { TypeOutlineIcon } from "lucide-react";

export default defineType({
  name: "heroCard",
  title: "Hero Card",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Card Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cardType",
      title: "Card Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Card Content (for text card)",
      type: "text",
      hidden: ({ parent }) => parent?.cardType !== "text",
    }),
    defineField({
      name: "image",
      title: "Card Image (for image card)",
      type: "image",
      hidden: ({ parent }) => parent?.cardType !== "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      hidden: ({ parent }) => parent?.cardType !== "text",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      hidden: ({ parent }) => parent?.cardType !== "text",
    }),
    defineField({
      name: "withButton",
      title: "Show Button?",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => parent?.cardType !== "text",
    }),
    defineField({
      name: "withIcon",
      title: "Show Icon?",
      type: "boolean",
      initialValue: true,
      hidden: ({ parent }) => parent?.cardType !== "text",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the position of the card (1 = first, 5 = last)",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: "title",
      cardType: "cardType",
      media: "image",
    },
    prepare({ title, cardType, media }) {
      return {
        title: title || "Untitled Card",
        subtitle: cardType === "text" ? "Text Card" : "Image Card",
        media: cardType === "image" ? media : TypeOutlineIcon,
      };
    },
  },
});