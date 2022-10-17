import { FastifyPluginAsync } from 'fastify'
import fastifyPassport from '@fastify/passport'

const google: FastifyPluginAsync = async (fastify) => {
  fastify.get('/login', fastifyPassport.authenticate('google'))

  fastify.get(
    '/callback',
    { preValidation: fastifyPassport.authenticate('google', { failureMessage: true }) },
    async (request, reply) => {
      // console.log(request)
      reply.redirect('/')
    },
  )
}

export default google
