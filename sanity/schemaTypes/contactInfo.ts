import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "text",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      title: "address",
      subtitle: "phone",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: `Contact Info - ${title}`,
        subtitle: `Phone: ${subtitle}`,
      };
    },
  },
});