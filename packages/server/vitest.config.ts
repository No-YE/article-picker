import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      spec: resolve(__dirname, './spec'),
    },
  },
  plugins: [
    swc.vite(),
  ],
})
