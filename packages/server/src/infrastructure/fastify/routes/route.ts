import { FastifyPluginAsync } from 'fastify'

const rootRoute: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    if (request.user) {
      return reply.redirect('/articles/my')
    }
    return reply.redirect('/articles/public')
  })

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
