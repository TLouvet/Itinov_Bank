/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
    exclude: ['*.js', '**/node_modules/**'],
    coverage: {
      exclude: ['**/node_modules/**', '*.js', '*.cjs', '**/types/*.ts', '**/*/*.keys.ts', 'src/ui/icons'],
    },
  },
});
