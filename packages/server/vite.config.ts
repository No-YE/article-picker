import { resolve } from 'path'
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
// eslint-disable-next-line import/no-named-default
import { default as typescript } from '@rollup/plugin-typescript'

export default defineConfig({
  root: resolve(__dirname, './src'),
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  define: {
    appRoot: process.env.NODE_ENV === 'production' ? JSON.stringify(resolve(__dirname, './dist')) : JSON.stringify(resolve(__dirname, './src')),
  },
  build: {
    ssr: true,
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        dir: 'dist',
      },
    },
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './index.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
      swcOptions: {},
    }),
    typescript(),
  ],
})
