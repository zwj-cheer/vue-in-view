import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir: 'dist'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    dedupe: ['vue'],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vue-in-view',
      // formats: [
      //   'es',
      //   // Temporary disabled for UnoCSS issues:
      //   //   error during build:
      //   //   Error: [unocss] does not found CSS placeholder in the generated chunks
      //   'cjs',
      //   // Not needed for now
      //   // 'umd',
      // ],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
