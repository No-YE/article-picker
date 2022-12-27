import { FastifyPluginAsync } from 'fastify'
import fastifyPassport from '@fastify/passport'

const googleRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/signin', fastifyPassport.default.authenticate('google'))

  fastify.get(
    '/callback',
    { preValidation: fastifyPassport.default.authenticate('google', { failureMessage: true }) },
    async (request, reply) => {
      request.flash('info', 'You have been signed in.')
      reply.redirect('http://localhost:4000/articles/my')
    },
  )
}

export default googleRoute