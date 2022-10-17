import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async (_request, _reply) => ({ root: true }))
  fastify.get('/me', async (request, reply) => {
    if (!request.user) {
      return reply.redirect('/user/google/login')
    }

    return `hello ${request.user.email}`
  })
}

export default root
