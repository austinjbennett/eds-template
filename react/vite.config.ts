import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Define block entries in one place for reuse
const blockEntries = {
  'budget-planner/budget-planner': resolve(__dirname, 'src/blocks/budget-planner/index.tsx'),
  'lead-funnel/lead-funnel': resolve(__dirname, 'src/blocks/lead-funnel/index.tsx'),
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
    cssCodeSplit: true,
    lib: {
      entry: blockEntries,
      formats: ['es'],
    },
    rolldownOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'shared/[name].js',
        assetFileNames: (assetInfo) => {
          const originalName = assetInfo.names?.[0] ?? assetInfo.name ?? '';
          if (originalName.endsWith('.css')) {
            if (originalName.includes('budget-planner')) {
              return 'budget-planner/budget-planner.css';
            }
            if (originalName.includes('lead-funnel')) {
              return 'lead-funnel/lead-funnel.css';
            }
            return 'shared/[name][extname]';
          }

          return 'assets/[name][extname]';
        },
      },
    },
  },
});
