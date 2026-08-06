import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "client", title: "Client name", type: "string" }),
    defineField({ name: "industry", title: "Industry", type: "reference", to: [{ type: "industry" }] }),
    defineField({ name: "tech", title: "Technology tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "problem", title: "Problem", type: "text", rows: 4 }),
    defineField({ name: "solution", title: "Solution", type: "text", rows: 4 }),
    defineField({ name: "timeline", title: "Timeline", type: "string" }),
    defineField({
      name: "results",
      title: "Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Client testimonial",
      type: "object",
      fields: [
        { name: "quote", type: "text", title: "Quote", rows: 3 },
        { name: "author", type: "string", title: "Author" },
        { name: "role", type: "string", title: "Role" },
      ],
    }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
