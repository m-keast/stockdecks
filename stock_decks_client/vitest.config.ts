import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],          // resolves your @/* alias from tsconfig
  test: {
    environment: 'jsdom',              // gives tests window/localStorage
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.ts']
  },
});