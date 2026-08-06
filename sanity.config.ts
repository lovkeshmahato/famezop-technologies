"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset, apiVersion } from "./lib/sanity-client";

export default defineConfig({
  basePath: "/studio",
  name: "famezop-studio",
  title: "Famezop Technologies — Content Studio",
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool()],
});
