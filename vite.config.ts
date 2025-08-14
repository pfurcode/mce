// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import { resolve } from 'path'; // Import resolve from the 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  // Add the build configuration for multiple entry points
  build: {
    rollupOptions: {
      input: {
        // Define all HTML entry points
        main: resolve(process.cwd(), 'index.html'),
        options: resolve(process.cwd(), 'options.html'),
      },
    },
  },
});