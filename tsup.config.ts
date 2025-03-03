import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/server.ts'],
  format: ['cjs', 'esm'],
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'es2022',
  tsconfig: 'tsconfig.json',
});