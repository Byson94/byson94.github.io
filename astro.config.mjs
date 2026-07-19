// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: 'solarized-light',
        dark: 'kanagawa-dragon',
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      entries: ['src/**/*']
    }
  }
});
