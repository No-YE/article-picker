import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import { swc } from 'rollup-plugin-swc3'

export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  plugins: [
    swc({
      jsc: {
        parser: {
          syntax: 'typescript',
          dynamicImport: true,
          decorators: true,
        },
        transform: {
          decoratorMetadata: true,
        },
      },
    }),
  ],
  optimizeDeps: {
  },
  esbuild: false,
})
