import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "icon", title: "Icon key", type: "string", description: "Lucide icon name, e.g. 'code'" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "problem", title: "Problem it solves", type: "text", rows: 3 }),
    defineField({
      name: "included",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "process",
      title: "Our process for this service",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", type: "string", title: "Step" },
            { name: "description", type: "text", title: "Description", rows: 2 },
          ],
        },
      ],
    }),
    defineField({ name: "order", title: "Display order", type: "number" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
