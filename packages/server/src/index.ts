import 'reflect-metadata'
import './infrastructure/persistence'
import './infrastructure/service'
import { initialize } from './infrastructure/fastify'

export const viteNodeApp = initialize()
