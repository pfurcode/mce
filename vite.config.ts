// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        options: resolve(process.cwd(), 'options.html'),
        newtab: resolve(process.cwd(), 'newtab.html'), // Add this line
        sidepanel: resolve(process.cwd(), 'sidepanel.html'), // Add this line
      },
    },
  },
});