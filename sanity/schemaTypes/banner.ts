import { defineType } from "sanity";

export default defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "title",
      title: "Title (English)",
      type: "string",
    },
    {
      name: "title_fr",
      title: "Title (French)",
      type: "string",
    },
    {
      name: "title_ar",
      title: "Title (Arabic)",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle (English)",
      type: "string",
    },
    {
      name: "subtitle_fr",
      title: "Subtitle (French)",
      type: "string",
    },
    {
      name: "subtitle_ar",
      title: "Subtitle (Arabic)",
      type: "string",
    },
    {
      name: "buttonText",
      title: "Button Text (English)",
      type: "string",
    },
    {
      name: "buttonText_fr",
      title: "Button Text (French)",
      type: "string",
    },
    {
      name: "buttonText_ar",
      title: "Button Text (Arabic)",
      type: "string",
    },
    {
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    },
  ],
});