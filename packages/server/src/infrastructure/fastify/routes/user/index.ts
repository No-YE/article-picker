import { FastifyPluginAsync } from 'fastify'

const google: FastifyPluginAsync = async (fastify) => {
  fastify.get('/signout', (request, reply) => {
    request.logOut()
    request.flash('info', 'You have been signed out.')
    return reply.redirect('/')
  })
}

export default google
