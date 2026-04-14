// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://duiftegelwerken.nl',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  security: {
    checkOrigin: false,
  },
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});