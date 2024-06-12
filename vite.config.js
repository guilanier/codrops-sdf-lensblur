import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    glsl({
      exclude: undefined, // File paths/extensions to ignore
      include: /\.(glsl|wgsl|vert|frag|vs|fs)$/i, // File paths/extensions to import
      defaultExtension: 'glsl', // Shader suffix when no extension is specified
      warnDuplicatedImports: true, // Warn if the same chunk was imported multiple times
      compress: false, // Compress the resulting shader code
    })],
  root: '',
  base: './',
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
