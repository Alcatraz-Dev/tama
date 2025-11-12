import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (r) => r.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "reviewText",
      title: "Review Text",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "reviewDate",
      title: "Review Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "verifiedPurchase",
      title: "Verified Purchase",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "customerName",
      subtitle: "reviewText",
      rating: "rating",
      productTitle: "product.title",
    },
    prepare(selection) {
      const { title, subtitle, rating, productTitle } = selection;
      return {
        title: `${title} - ${productTitle}`,
        subtitle: `${"⭐".repeat(rating)} ${subtitle?.slice(0, 50)}...`,
      };
    },
  },
});