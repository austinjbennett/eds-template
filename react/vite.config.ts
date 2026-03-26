import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        // Key name maps to dist/budget-planner/budget-planner.js
        'budget-planner/budget-planner': resolve(__dirname, 'src/blocks/budget-planner/index.tsx'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
        chunkFileNames: '_shared/[name]-[hash].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
});
