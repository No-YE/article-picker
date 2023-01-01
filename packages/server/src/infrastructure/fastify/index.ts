import fastify from 'fastify'

export const initialize = async (): Promise<void> => {
  const server = fastify.default({ logger: true })

  await server.register(import('@fastify/formbody'))
  await server.register(import('@fastify/sensible'))
  await server.register(import('./plugin/cors.plugin.js'))
  await server.register(import('./plugin/passport.plugin.js'))
  await server.register(import('./plugin/support.plugin.js'))
  await server.register(import('./plugin/validator.plugin.js'))
  await server.register(import('./plugin/view.plugin.js'))

  await server.register(import('./routes/route.js'))

  server.listen({ host: '0.0.0.0', port: 4000 })
}
