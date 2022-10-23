import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async (_request, _reply) => ({ root: true }))
  fastify.get('/me', async (request, reply) => {
    if (!request.user) {
      return reply.notFound()
    }

    return request.user
  })
}

export default root
