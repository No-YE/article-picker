import { FastifyPluginAsync } from 'fastify'
import fastifyPassport from '@fastify/passport'
import { config } from '~/config.js'

const redirectUri = `${config.baseUrl}/articles/my`

const googleRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/signin', fastifyPassport.default.authenticate('google'))

  fastify.get(
    '/callback',
    { preValidation: fastifyPassport.default.authenticate('google', { failureMessage: true }) },
    async (request, reply) => {
      request.flash('info', 'You have been signed in.')
      reply.redirect(redirectUri)
    },
  )
}

export default googleRoute
