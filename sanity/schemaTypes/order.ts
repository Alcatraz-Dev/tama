// schemas/order.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "town",
      title: "Town",
      type: "string",
      options: {
        list: [
          { title: "Tunis", value: "Tunis" },
          { title: "Sfax", value: "Sfax" },
          { title: "Sousse", value: "Sousse" },
          { title: "Kairouan", value: "Kairouan" },
          { title: "Bizerte", value: "Bizerte" },
          { title: "Gabes", value: "Gabes" },
          { title: "Nabeul", value: "Nabeul" },
          { title: "Gafsa", value: "Gafsa" },
          { title: "Monastir", value: "Monastir" },
          { title: "Mahdia", value: "Mahdia" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // Multi-item array
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "orderItem",
          title: "Order Item",
          fields: [
            {
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required(),
            },
            { name: "selectedColor", title: "Selected Color", type: "string" },
            { name: "selectedSize", title: "Selected Size", type: "string" },
          ],
          preview: {
            select: {
              productTitle: "product.title", // title of the product
               productImage: "product.gallery.0.asset", // first image in product's gallery array
              quantity: "quantity",
              color: "selectedColor",
            },
            prepare({ productTitle, productImage, quantity, color }) {
              return {
                title: productTitle || "No product selected",
                subtitle: `Qty: ${quantity}${color ? `, Color: ${color}` : ""}`,
                media: productImage,
              };
            },
          },
        },
      ],
    }),

    defineField({ name: "subtotal", title: "Subtotal", type: "number" }),
    defineField({ name: "shippingFee", title: "Shipping Fee", type: "number" }),
    defineField({ name: "total", title: "Total", type: "number" }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});
