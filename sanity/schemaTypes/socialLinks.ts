// schemas/socialLinks.js
export default {
  name: "socialLinks",
  title: "Social Links",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Platform Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
      description: "The social media platform name, e.g., Facebook, Instagram"
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule: any) => Rule.required(),
      description: "The full URL to your social media page"
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Optional: icon name (use your frontend mapping to render icons)"
    }
  ],
};