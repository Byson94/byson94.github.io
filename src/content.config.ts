import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
    })
})

export const collections = { blog }
