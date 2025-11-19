import { defineField, defineType } from "sanity";

export default defineType({
  name: "ads",
  title: "Ads",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (r) => r.required(),
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
    defineField({
      name: "media",
      title: "Ad Media",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
        {
          type: "file",
          title: "Video",
          options: {
            accept: "video/*",
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      description: "Select the product to advertise",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Is this ad currently active?",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "When should this ad start showing?",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "When should this ad stop showing?",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "position",
      title: "Ad Position",
      type: "string",
      options: {
        list: [
          { title: "Banner", value: "banner" },
          { title: "Sidebar", value: "sidebar" },
          { title: "Footer", value: "footer" },
          { title: "Popup", value: "popup" },
        ],
      },
      initialValue: "banner",
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "image",
      active: "active",
    },
    prepare(selection) {
      const { title, image, active } = selection;
      return {
        title: active ? title : `${title} (Inactive)`,
        media: image,
      };
    },
  },
});