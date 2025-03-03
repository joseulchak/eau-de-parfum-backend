import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/server.ts'],
  format: ['esm'],
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'node22',
  tsconfig: 'tsconfig.json',
});