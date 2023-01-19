import 'reflect-metadata'
import './infrastructure/persistence/index.js'
import { initialize } from './infrastructure/fastify/index.js'

export const viteNodeApp = initialize()
