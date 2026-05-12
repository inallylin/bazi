import { defineConfig } from 'tsup';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  esbuildOptions(options) {
    // Map '@' prefix to the src directory so esbuild resolves @/foo → src/foo
    options.alias = {
      ...options.alias,
      '@': resolve(__dirname, 'src'),
    };
  },
});
