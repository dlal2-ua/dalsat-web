// Colecciones de contenido (Astro 5, content layer).
//
// blog: guias y articulos para /recursos (SEO de contenido). Un fichero .md
// por articulo en src/content/blog. `draft: true` (el valor por defecto) no se
// publica: ni pagina, ni listado, ni sitemap. Solo sale lo que alguien del
// equipo haya revisado y marcado como draft: false.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(160),
    date: z.coerce.date(),
    lang: z.enum(['es', 'en']).default('es'),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog };
