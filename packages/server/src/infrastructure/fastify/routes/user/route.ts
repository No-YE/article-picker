import { FastifyPluginAsync } from 'fastify'

const userRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/signout', (request, reply) => {
    request.logOut()
    request.flash('info', 'You have been signed out.')
    return reply.redirect('/')
  })

  await fastify.register(import('./google/route.js'), { prefix: '/google' })
}

export default userRoute
