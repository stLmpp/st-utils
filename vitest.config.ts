import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
      include: ['src/**/*.ts'],
      all: true,
    },
    include: ['src/**/*.spec.ts'],
    globals: true,
    watch: false,
  },
});
