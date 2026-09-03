import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://dalsats.com',
  output: 'static',
  adapter: vercel(),
  integrations: [react(), tailwind()],
  // Enrutado i18n nativo de Astro. Sin plugin: los que hay (astro-i18next,
  // astro-i18n) llevan anos sin mantenerse y ninguno traduce el contenido.
  // El castellano no lleva prefijo, asi que /servicios sigue siendo /servicios
  // y no se rompe ninguna URL indexada. El ingles va bajo /en.
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
