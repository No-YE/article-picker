import { FastifyPluginAsync } from 'fastify'
import userRoute from './user/route'
import articlesRoute from './articles/route'

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

  await fastify.register(userRoute, { prefix: '/user' })
  await fastify.register(articlesRoute, { prefix: '/articles' })
}

export default rootRoute
