import { defineField, defineType } from "sanity";

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "icon", title: "Icon key", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "challenges", title: "Challenges", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "solutions", title: "Our solutions", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
