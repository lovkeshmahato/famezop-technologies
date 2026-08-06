import { defineField, defineType } from "sanity";

export const seoFields = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "Open Graph image", type: "image", options: { hotspot: true } }),
  ],
});
