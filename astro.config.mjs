// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://codigosa.es',
  output: 'server',
  adapter: vercel(),
  integrations: [
    sitemap({ changefreq: 'daily', priority: 0.8 }),
  ],
});

