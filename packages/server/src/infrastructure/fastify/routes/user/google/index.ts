import { FastifyPluginAsync } from 'fastify'
import fastifyPassport from '@fastify/passport'

const google: FastifyPluginAsync = async (fastify) => {
  fastify.get('/login', fastifyPassport.authenticate('google'))

  fastify.get(
    '/callback',
    { preValidation: fastifyPassport.authenticate('google', { failureMessage: true }) },
    async (request, reply) => {
      reply.redirect('http://localhost:4001/articles')
    },
  )
}

export default google
