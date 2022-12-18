import fp from 'fastify-plugin'
import view, { type FastifyViewOptions } from '@fastify/view'
import ejs from 'ejs'
import path from 'path'

declare module 'fastify' {
  interface RouteSpecificOptions {
    layout?: string
  }

  interface FastifyReply {
    view<T extends { [key: string]: any; }>(
      _page: string, _data: T, _opts?: RouteSpecificOptions
    ): FastifyReply;
    view(_page: string, _data?: object, _opts?: RouteSpecificOptions): FastifyReply;
    locals: { [key: string]: unknown; }
  }
}

const options: FastifyViewOptions = {
  engine: { ejs },
  root: path.join(__dirname, '../', 'views'),
  layout: '_layout.ejs',
}

export default fp(async (fastify, _opts) => {
  fastify.addHook('preHandler', async (request, reply) => {
    // eslint-disable-next-line no-param-reassign
    reply.locals = {
      user: request.user,
      flash: reply.flash(),
    }
  })
  fastify.register(view, options)
})
