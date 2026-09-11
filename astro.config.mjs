import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Paginas con noindex: no pintan nada en el sitemap. Las legales salen de aqui
// hasta que DALSAT este constituida y tengan razon social y NIF.
const FUERA_DEL_SITEMAP = ['/404', '/gracias', '/aviso-legal', '/politica-privacidad'];

export default defineConfig({
  site: 'https://dalsats.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind(),
    // Sitemap generado en cada build, con las dos versiones de cada pagina
    // enlazadas por hreflang. Sustituye al public/sitemap.xml escrito a mano,
    // que solo tenia el castellano y fechas congeladas.
    sitemap({
      filter: (pagina) => {
        const camino = new URL(pagina).pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '') || '/';
        return !FUERA_DEL_SITEMAP.includes(camino);
      },
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en' },
      },
    }),
  ],
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
