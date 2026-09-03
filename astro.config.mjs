import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://dalsats.com',
  output: 'static',
  adapter: vercel(),
  integrations: [react(), tailwind()],
});
