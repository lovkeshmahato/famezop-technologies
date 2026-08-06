import { defineField, defineType } from "sanity";

export const job = defineType({
  name: "job",
  title: "Job Listing",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "employmentType", title: "Employment type", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "responsibilities", title: "Responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "requirements", title: "Requirements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "datePosted", title: "Date posted", type: "datetime" }),
    defineField({ name: "isOpen", title: "Currently open", type: "boolean", initialValue: true }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
