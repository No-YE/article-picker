import 'reflect-metadata'
import './infrastructure/prisma/repository/index.js'
import { initialize } from './infrastructure/fastify/index.js'

initialize()
