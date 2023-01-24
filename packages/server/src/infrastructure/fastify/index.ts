import fastify, { type FastifyInstance } from 'fastify'
import * as plugin from './plugin'
import route from './routes/route'

export const initialize = async (): Promise<FastifyInstance> => {
  const server = fastify({ logger: true })

  await server.register(import('@fastify/formbody'))
  await server.register(import('@fastify/sensible'))
  await server.register(plugin.corsPlugin)
  await server.register(plugin.passportPlugin)
  await server.register(plugin.supportPlugin)
  await server.register(plugin.validatorPlugin)
  await server.register(plugin.viewPlugin)

  await server.register(route)

  if (import.meta.env.PROD) {
    server.listen({ host: '0.0.0.0', port: 3000 })
  }

  return server
}
