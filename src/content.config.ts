import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    link: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, projects };
