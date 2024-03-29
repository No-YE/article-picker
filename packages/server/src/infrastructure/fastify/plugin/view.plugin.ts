import fp from 'fastify-plugin'
import view, { type FastifyViewOptions } from '@fastify/view'
import ejs from 'ejs'
import { join } from 'path'

declare module 'fastify' {
  interface RouteSpecificOptions {
    layout?: string
  }

  interface FastifyReply {
    view<T extends { [key: string]: any; }>(
      _page: string, _data: T, _opts?: RouteSpecificOptions
    ): FastifyReply;
    view(_page: string, _data?: object, _opts?: RouteSpecificOptions): FastifyReply;
    partial: this['view']
    locals: { [key: string]: unknown; }
  }
}

const options: FastifyViewOptions = {
  engine: { ejs },
  root: join(appRoot, 'infrastructure', 'fastify', 'views'),
  layout: '_layout.ejs',
}
const partialOptions: FastifyViewOptions = {
  engine: { ejs },
  root: join(appRoot, 'infrastructure', 'fastify', 'views'),
  propertyName: 'partial',
}

export const viewPlugin = fp(async (fastify, _opts) => {
  fastify.addHook('preHandler', async (request, reply) => {
    // eslint-disable-next-line no-param-reassign
    reply.locals = {
      user: request.user,
      url: request.url,
      flash: reply.flash(),
    }
  })

  fastify.register(view, options)
  fastify.register(view, partialOptions)
})
