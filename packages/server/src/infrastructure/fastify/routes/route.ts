import { FastifyPluginAsync } from 'fastify'

const rootRoute: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async (_request, reply) => reply.view('root'))

  fastify.get('/me', async (request, reply) => {
    if (!request.user) {
      return reply.notFound()
    }

    return request.user
  })

  await fastify.register(import('./user/route.js'), { prefix: '/user' })
  await fastify.register(import('./articles/route.js'), { prefix: '/articles' })
}

export default rootRoute
