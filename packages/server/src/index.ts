import 'reflect-metadata'
import './infrastructure/persistence/index.js'
import { initialize } from './infrastructure/fastify/index.js'

const app = await initialize()
export const viteNodeApp = app
