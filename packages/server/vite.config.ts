import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
// eslint-disable-next-line import/no-named-default
import { default as typescript } from '@rollup/plugin-typescript'

export default defineConfig({
  root: './src',
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './src/index.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
      swcOptions: {},
    }),
    typescript(),
  ],
})
