import { FastifyPluginAsync } from 'fastify'
import googleRoute from './google/route'

const userRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/signout', (request, reply) => {
    request.logOut()
    request.flash('info', 'You have been signed out.')
    return reply.redirect('/')
  })

  await fastify.register(googleRoute, { prefix: '/google' })
}

export default userRoute
