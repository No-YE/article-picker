/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
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
  optimizeDeps: {
  },
})
