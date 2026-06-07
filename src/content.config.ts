import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.string(),
    demo: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
