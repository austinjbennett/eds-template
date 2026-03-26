import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Define block entries in one place for reuse
const blockEntries = {
  'budget-planner/budget-planner': resolve(__dirname, 'src/blocks/budget-planner/index.tsx'),
  // Add more blocks here as needed:
  // 'product-filter/product-filter': resolve(__dirname, 'src/blocks/product-filter/index.tsx'),
};


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: blockEntries,
      formats: ['es'],
    },
    rolldownOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '_shared/[name]-[hash].js',
      },
    },
  },
});
