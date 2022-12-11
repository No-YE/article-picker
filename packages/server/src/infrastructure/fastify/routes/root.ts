import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async (_request, reply) => reply.view('root'))

  fastify.get('/me', async (request, reply) => {
    if (!request.user) {
      return reply.notFound()
    }

    return request.user
  })
}

export default root
