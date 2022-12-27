import { FastifyPluginAsync } from 'fastify'
import '../prisma/repository/index.js'

export type AppOptions = {
  // Place your custom options for app below here.
}

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  _opts,
): Promise<void> => {
  await fastify.register(import('@fastify/formbody'))
  await fastify.register(import('@fastify/sensible'))
  await fastify.register(import('./plugin/cors.plugin.js'))
  await fastify.register(import('./plugin/passport.plugin.js'))
  await fastify.register(import('./plugin/support.plugin.js'))
  await fastify.register(import('./plugin/validator.plugin.js'))
  await fastify.register(import('./plugin/view.plugin.js'))

  await fastify.register(import('./routes/route.js'))
}

export { app }
